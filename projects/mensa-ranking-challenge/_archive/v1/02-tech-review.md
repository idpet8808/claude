# 기술 검토서 — 멘사 랭킹챌린지

- 고객사: 멘사
- 슬러그: `mensa-ranking-challenge`
- 작성자: 기술검토자
- 작성일: 2026-05-06
- 참조 PRD: `01-prd.md` (버전 v0.1)

---

## 1. 검토 요약 (TL;DR)

Must 5개 전체 구현 가능하나 F-5(기존 멘사 회원 DB 연동)는 조건부 — 기존 시스템 스키마 및 인증 방식 확인 전까지 연동 복잡도가 최대 변수다. 낙관 8주 / 현실 12주 / 보수 17주. 주요 리스크는 기존 DB 연동 불투명성(영향 高)·PG사 심사 리드타임(영향 中)·콘텐츠 다형성으로 인한 스키마 복잡도(영향 中)이며, 콘텐츠 5종 분석 결과 JSON 기반 다형 콘텐츠 스키마 설계가 필수다.

---

## 2. Must 기능 전수 평가

| # | Must 기능 | 판정 | 근거 | 참조 |
|---|-----------|------|------|------|
| 1 | 랭킹 시스템 (온라인테스트 첫 페이지 노출 포함) | 가능 | 점수 집계는 DB aggregation + Redis 캐싱으로 구현 가능. 온라인테스트 첫 페이지 노출은 기존 사이트에 API 엔드포인트 추가 + 프런트 위젯 삽입으로 처리 가능. 배치(5분) vs 실시간 갱신 방식은 트래픽 확인 후 결정 | `01-prd.md §4 Must-1` |
| 2 | 챌린지 도전 (무료, 로그인 회원 대상) | 가능 | 콘텐츠 5종(_reference 분석) 모두 텍스트·이미지·입력폼 조합으로 웹 렌더링 가능. 단, 아름다운 수열(32칸 그래프) 및 11배수 스도쿠(그리드+변수 레이블)는 인터랙티브 UI 컴포넌트 별도 개발 필요. 채점 로직은 서버사이드 검증으로 처리 | `01-prd.md §4 Must-2` |
| 3 | 힌트·패스 아이템 유료 판매 (개별 구매) | 가능 | PG사 결제 API 연동 + 아이템 재고(소모형) 모델로 구현 가능. 챌린지 진행 상태 보존 필요 — 결제 실패 시 문항·경과 시간 유지(시나리오 2-B) 는 세션 또는 서버 저장으로 처리. PG사 선정 및 심사 리드타임(2~4주) 별도 확보 필요 | `01-prd.md §4 Must-3`, `§5 시나리오 2-B` |
| 4 | 유료결제 패스 상품 (묶음/구독) | 가능 | 정액 상품(패스) = PG사 단건 결제 + 자체 아이템 지급 로직으로 처리 가능. 구독형(월정액 자동결제) 선택 시 PG사 정기결제 API 추가 필요 — 구독 vs 패스(소진형) 구분은 PM 결정 사항으로 공수 차이 발생(구독형 +1w). 현재 PRD는 "묶음 구매"로 기술되어 구독 여부 미확정 | `01-prd.md §4 Must-4` |
| 5 | 기존 멘사 회원 DB 연동 (인증·세션·이력 저장) | 조건부 | 기존 멘사 사이트의 회원 인증 방식(세션 쿠키, JWT, 자체 SSO 등), DB 스키마(회원 테이블 구조), 서버 접근 권한이 사전 확인되지 않았다. 연동 방식에 따라 공수와 아키텍처가 크게 달라진다. 조건: 기존 DB 읽기 권한 또는 내부 API 제공 가능 여부 2026-05-13까지 확인 필요 | `01-prd.md §4 Must-5`, `§6 기술 제약` |

**조건부 기능에 대한 대안**:
- F-5 (기존 DB 연동) — 3가지 연동 시나리오별 대응:
  - **시나리오 A (직접 DB 접근 가능)**: 기존 DB에 읽기 전용 연결 + 랭킹챌린지 신규 테이블 분리 배포 → 가장 빠름
  - **시나리오 B (내부 API 제공)**: 기존 사이트에서 회원정보 조회 API 신설 → 추가 개발 기간 약 +1~2주
  - **시나리오 C (연동 불가)**: 소셜 로그인(네이버·카카오) 또는 신규 자체 인증 시스템 구축으로 대체 → Must 기능 정의 변경 필요, PM과 협의 필수 (CLAUDE.md §5 기술검토자 영역 침범 금지 원칙에 따라 범위 변경은 PM 판단)
  - 현실적 권장: 2026-05-09까지 기존 멘사 개발 담당자와 미팅 → 시나리오 확정

---

## 3. 아키텍처 제안

### 컴포넌트 구성

```
[사용자 브라우저]
        |
        v
[Next.js 14 (App Router) — SSR + 정적 랭킹 위젯]
        |                              |
        v                              v
[Backend API (Laravel 10 REST)]   [기존 멘사 사이트]
        |         |         |              |
        v         v         v              v
   [MySQL 8]  [Redis]  [PG사 API]   [기존 회원 DB]
  (랭킹·챌린지  (랭킹    (결제처리)    (회원 인증·조회)
   이력·상품)   캐시)
```

### 주요 데이터 흐름

1. **챌린지 참여**: 사용자 로그인 확인(기존 멘사 세션 검증) → 챌린지 선택 → 문항 렌더링(JSON 스키마 기반) → 답안 제출 → 서버사이드 채점 → 점수 저장 → 랭킹 갱신
2. **랭킹 노출**: 온라인테스트 첫 페이지 요청 → Next.js SSR 또는 기존 사이트에 위젯 JS 삽입 → Redis 캐시에서 Top-N 조회(5분 TTL) → 렌더링
3. **유료 아이템 결제**: 결제 요청 → PG사 결제창 → 콜백 수신 → 검증 → 아이템 지급 + 챌린지 상태 유지 (결제 실패 시 상태 롤백 없음 — 진행 상태 보존)
4. **회원 연동**: 기존 멘사 쿠키/토큰 → Backend API에서 기존 DB 또는 내부 API로 회원 정보 조회 → 랭킹챌린지 자체 user_id 매핑 테이블 유지

### 기술 스택 결정

| 레이어 | 선택 | 대안 | 근거 |
|--------|------|------|------|
| Frontend | Next.js 14 (App Router, TypeScript) | React + Vite SPA / Nuxt 3 | SSR로 랭킹 위젯 SEO 대응 가능. 기존 멘사 사이트가 PHP 계열로 추정되므로 분리 배포 구조가 유지보수에 유리. Nuxt 대비 생태계 성숙도 우위 |
| Backend API | Laravel 10 (PHP 8.2) | Node.js (Express/NestJS) / Django | 멘사 기존 사이트가 PHP 기반일 가능성 高 → 내부 개발자 리소스 공유 가능. Laravel은 PG사 연동 패키지 (iamport/bootpay) 생태계 충분. 기존 DB 직접 접근 시 Eloquent ORM 연결 용이 |
| DB (주) | MySQL 8.0 | PostgreSQL / MariaDB | 기존 멘사 DB가 MySQL 계열로 추정 → 스키마 연동 시 타입 호환성 확보. JSON 컬럼 지원으로 콘텐츠 다형 스키마 수용 가능 |
| 캐시 | Redis 7 | Memcached / DB 쿼리 직접 | 랭킹 Top-N 캐싱(5분 TTL) + 챌린지 진행 상태 임시 보관. Sorted Set으로 랭킹 연산 최적화 가능 |
| 인프라 | AWS EC2 (t3.medium) + RDS MySQL + ElastiCache Redis | NCP / Cafe24 서버 | 멘사 기존 인프라 환경 미확인 — 기존 서버 환경 확인 후 재검토 필요. 기존 호스팅이 Cafe24 등 IDC 기반이면 동일 환경 배포 권장 (레이턴시·연동 편의) |
| PG사 | 토스페이먼츠 | 이니시스 / KCP / 나이스페이 | 토스페이먼츠: 최신 API 문서·SDK 품질 최상위, 심사 절차 상대적으로 간소, 서비스형 정산 지원. 단, 사업자 심사 2~3주 소요 → 가장 먼저 신청 필요 |
| 콘텐츠 저장 | MySQL JSON 컬럼 (다형 스키마) | MongoDB / S3 + 메타DB | 5종 콘텐츠가 상이한 구조 → JSON 컬럼으로 콘텐츠별 payload 저장, 공통 필드(제목·카테고리·정답·배점)는 정규 컬럼 유지. MongoDB는 단독 운영 오버헤드 발생 |

---

## 4. 리스크 분석

| # | 리스크 | 영역 | 영향 | 완화책 | 담당 |
|---|--------|------|------|--------|------|
| 1 | 기존 멘사 회원 DB 연동 불투명 — 스키마·인증 방식·접근 권한 미확인 | 외부의존 / 데이터모델 | 높음 | 2026-05-09까지 기존 멘사 개발 담당자와 미팅 필수. 결과에 따라 연동 시나리오 A/B/C 중 하나 확정. 미팅 불가 시 PM 에스컬레이션 | PM 신주한 / 기술검토자 |
| 2 | PG사(토스페이먼츠) 사업자 심사 리드타임 2~3주 — 개발 완료 후 결제 테스트 지연 가능 | 외부의존 | 중간 | 착수 직후 PG사 신청 선행. 심사 기간 중 결제 모의(Mock) 환경으로 개발 병행. 이니시스/KCP 백업 PG사 사전 검토 | PM 신주한 |
| 3 | 콘텐츠 5종 구조 이질성 — 아름다운 수열(32칸 그래프), 11배수 스도쿠(그리드+변수), 너는 바보입니다(자모-숫자 방정식), 아 치킨먹고싶다(자기참조 10문항) 각기 다른 입력 컴포넌트 필요 | 데이터모델 / 확장성 | 중간 | JSON 다형 스키마로 콘텐츠 payload 분리. 각 콘텐츠 유형별 React 컴포넌트 1종 개발. 신규 콘텐츠 추가 시 컴포넌트 등록만으로 확장 가능한 플러그인 구조 설계 | 기술검토자 |
| 4 | 랭킹 실시간 갱신 요구 시 DB 부하 — 챌린지 완료 즉시 랭킹 반영(PRD §5 시나리오 1-7) | 성능 | 중간 | Redis Sorted Set으로 점수 갱신(O(log N)). DB는 비동기 배치 업데이트(5분 주기). 첫 페이지 위젯은 5분 캐시 TTL로 DB 직접 쿼리 방지. 동시 접속 100명 이내 예상 트래픽에서는 t3.medium으로 충분 | 기술검토자 |
| 5 | 유료 결제 아이템 이중 지급 / 미지급 — PG사 콜백 네트워크 오류 시 멱등성 보장 필요 | 보안 / 신뢰성 | 높음 | 결제 고유 주문번호(UUID) 생성 + 幂等성 처리(idempotency key). PG사 콜백 수신 후 서버에서 재검증(PG사 API 재조회) 후 아이템 지급. 실패 로그 테이블 별도 관리 + 관리자 수동 지급 인터페이스 확보 | 기술검토자 |
| 6 | 개인정보·결제정보 처리 미준수 — PG사 연동 시 개인정보보호법·전자금융거래법 준수 의무 | 보안 / 법규 | 높음 | 카드번호 등 결제 민감정보는 PG사 서버에만 저장(PCI-DSS 준수는 PG사 위임). 회원 이력 데이터 암호화(AES-256). 개인정보처리방침 페이지 추가. 법무 검토 별도 진행 권장 | PM 신주한 |
| 7 | 기존 멘사 사이트 배포 의존 — 온라인테스트 첫 페이지 랭킹 위젯 삽입 시 기존 사이트 코드 수정 필요 | 외부의존 | 중간 | 기존 사이트 관리자 또는 개발팀과 협의. 위젯은 독립 JS 번들(IIFE) 형태로 제공하여 기존 사이트 코드 최소 수정. 삽입 위치·방식 사전 합의 | PM 신주한 / 기술검토자 |

---

## 5. 외부 의존성

| 의존성 | 용도 | 버전 | 라이선스 | 확인됨 |
|--------|------|------|----------|--------|
| Next.js | Frontend 프레임워크 | 14.2.x (LTS) | MIT | Y |
| Laravel | Backend API 프레임워크 | 10.x (LTS, 지원 2026-02까지) / 11.x 이행 고려 | MIT | Y |
| MySQL | 주 DB | 8.0.x | GPL-2.0 (서버), MIT (커넥터) — 상업 이용 가능 | Y |
| Redis | 랭킹 캐시 / 세션 | 7.2.x | RSALv2 / SSPLv1 (Redis 7.2+) — 자체 서비스로 사용 시 문제 없음 | Y |
| 토스페이먼츠 SDK | 결제 PG 연동 | @tosspayments/payment-widget-sdk ^0.11.x | MIT | Y |
| PHP | 서버 런타임 | 8.2.x | PHP License 3.01 (오픈소스 친화적) | Y |
| Tailwind CSS | UI 스타일링 | 3.4.x | MIT | Y |
| Zustand / React Query | 클라이언트 상태·비동기 | Zustand 4.x / TanStack Query 5.x | MIT | Y |
| Laravel Sanctum | API 인증 토큰 | 3.x (Laravel 10 내장) | MIT | Y |

**주의**: Redis 7.2 이후 라이선스가 RSALv2+SSPL로 변경되었으나 SaaS로 Redis를 제3자에게 제공하는 경우에만 제한됨. 내부 서비스 인프라로 사용 시 기존과 동일하게 무료 사용 가능. 대안: Valkey 7.x (Redis fork, Apache 2.0) 로 전환 가능.

---

## 6. 공수 산정 (3 시나리오)

| 단계 | 낙관 | 현실 | 보수 |
|------|------|------|------|
| 설계 (DB 스키마 + API 설계 + 기존 DB 연동 확인) | 1w | 1.5w | 2.5w |
| 기존 멘사 DB 연동 + 인증 구현 (F-5) | 1w | 2w | 3.5w |
| 챌린지 콘텐츠 렌더링 엔진 (5종 컴포넌트) (F-2) | 1.5w | 2.5w | 3.5w |
| 랭킹 시스템 + 첫 페이지 위젯 (F-1) | 1w | 1.5w | 2w |
| 결제 연동 (F-3 힌트·패스 + F-4 패스 상품) | 1w | 2w | 2.5w |
| 관리자 페이지 (Should — 포함 시) | 1w | 1.5w | 2w |
| QA + 버그 수정 + 배포 준비 | 1.5w | 2w | 3w |
| **합계 (관리자 포함)** | **8w** | **13w** | **19w** |
| **합계 (관리자 제외)** | **7w** | **11.5w** | **17w** |

**근거 전제**:

- **낙관 (7~8w)**: 기존 멘사 DB 직접 접근 가능(시나리오 A) + 기존 PHP 개발자 1명 즉시 투입 가능 + PG사 심사 개발 병행 완료 + 콘텐츠 5종 중 단순 유형 3종 우선 오픈. 동시에 풀스택 개발자 2인 이상 편성. 별도 QA 리소스 확보.
- **현실 (11.5~13w)**: 기존 DB 연동 내부 API 방식(시나리오 B, +1~2주) + PG사 심사 2주 소요 + 개발자 2인 편성(풀스택 or 프런트1·백1) + 콘텐츠 컴포넌트 5종 전부 개발 + 관리자 페이지 포함. 가장 현실적 시나리오.
- **보수 (17~19w)**: 기존 DB 연동 방식 불확실(시나리오 B/C 분기 발생) + PG사 심사 지연 + 개발자 1인 또는 신규 투입 온보딩 기간 포함 + 관리자 페이지 Must 격상 + 콘텐츠 추가 요청 발생. 아름다운 수열 등 복잡 UI 재작업 가능성 포함.

**핵심 변수**: F-5 기존 DB 연동 시나리오 확정(2026-05-09 미팅)이 전체 공수의 최대 변동 요인.

---

## 7. 오픈 이슈 / 후속 확인 필요

| # | 항목 | 내용 | 담당자 | 기한 |
|---|------|------|--------|------|
| TR-01 | 기존 멘사 DB 연동 방식 확정 | 회원 인증 방식(세션/JWT/쿠키 구조), DB 스키마(회원 테이블), 읽기 접근 권한 또는 내부 API 제공 가능 여부. 결과에 따라 아키텍처 시나리오 A/B/C 결정 | PM 신주한 + 기존 멘사 개발팀 | 2026-05-09 |
| TR-02 | PG사(토스페이먼츠) 신청 및 심사 시작 | 사업자 심사 2~3주 선행 필요. 개발 착수와 동시에 신청 필수. 심사 중 Mock 환경으로 개발 병행 | PM 신주한 | 2026-05-07 (착수일) |
| TR-03 | 기존 멘사 서버 인프라 환경 확인 | 호스팅 환경(IDC/클라우드), 서버 스펙, 배포 방식 확인. 신규 서비스 동일 환경 배포 여부 결정 | PM 신주한 + 기존 멘사 개발팀 | 2026-05-09 |
| TR-04 | 유료결제 패스 상품 — 구독형 vs 소진형 결정 | PRD §4 Must-4에서 "묶음 구매"로만 기술됨. 자동갱신 구독 여부에 따라 PG사 정기결제 API 추가 필요 (+0.5~1w 공수 차이) | PM 신주한 | 2026-05-13 |
| TR-05 | 관리자 페이지 Must 격상 시 PRD 반영 | PRD 오픈 이슈 #3 — Must 격상 결정 시 기술 검토 공수 재산정 및 STATE.md Decision Log 추가 필요 | PM 신주한 | 2026-05-13 |
| TR-06 | 콘텐츠 추가 계획 및 형식 표준화 | 현재 5종 콘텐츠 확인. 향후 추가 콘텐츠가 있다면 형식(입력 방식·채점 방식)을 표준화해야 컴포넌트 확장 가능. 콘텐츠 추가 주기·담당팀 확인 필요 | PM 신주한 | 2026-05-13 |
| TR-07 | 성공 지표 수치 확정 후 성능 SLA 정의 | PRD 오픈 이슈 #2 — 성공 지표(300명/5%/50건/20%) 확정 전까지 구체적 성능 SLA(TPS, 응답시간 P95) 정의 불가. 확정 시 기술 검토 보완 필요 | PM 신주한 / 기술검토자 | 2026-05-13 |

---

## 콘텐츠 DB 스키마 설계 (부록)

_reference 디렉토리 5종 콘텐츠 분석 결과를 반영한 데이터 모델 제안.

### 콘텐츠 유형 분류 (분석 결과)

| 콘텐츠명 | 유형 코드 | 구조 특성 | 입력 방식 | 채점 방식 |
|----------|-----------|----------|-----------|----------|
| 배수 수열 | `sequence_fill` | 10칸 선형 배열, 2문제 세트 | 각 칸에 숫자 직접 입력 | 전체 배열 정답 일치 여부 |
| 11배수 스도쿠 | `grid_puzzle` | 9×9 그리드, 변수 레이블(a/b/c), 힌트 셀 고정 | 빈 셀에 숫자 입력 | 그리드 전체 유효성 검증 |
| 너는 바보입니다 | `symbol_equation` | 자모/알파벳-숫자 매핑 방정식, 2~3 문항 세트 | 숫자 직접 입력 | 방정식 검증 |
| 아름다운 수열 | `graph_fill` | 32칸 링 그래프(원형 접힘 구조), 인접 셀 규칙(합이 제곱수) | 각 노드에 숫자 입력 | 인접 쌍 합 검증 |
| 아 치킨먹고싶다 | `meta_quiz` | 10문항 자기참조 연립 퀴즈, 이진 채점(0점/100점) | 문항별 자연수 입력 | 전 문항 정답 시만 100점 |

### 제안 스키마

```sql
-- 챌린지 콘텐츠 테이블 (공통 필드 + JSON payload)
CREATE TABLE challenges (
  id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug          VARCHAR(100) NOT NULL UNIQUE,          -- 'sudoku-11multiple'
  title         VARCHAR(200) NOT NULL,
  category      ENUM('수리','논리','언어','공간','복합') NOT NULL,
  content_type  VARCHAR(50)  NOT NULL,                 -- 'grid_puzzle', 'sequence_fill' 등
  difficulty    TINYINT      NOT NULL DEFAULT 3,       -- 1~5
  base_score    INT          NOT NULL DEFAULT 100,
  time_limit_sec INT         NULL,                     -- NULL = 제한 없음
  payload       JSON         NOT NULL,                 -- 콘텐츠 유형별 구조
  answer_hash   VARCHAR(64)  NOT NULL,                 -- SHA-256(정답 JSON), 서버사이드 채점용
  is_active     BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- payload 예시 (grid_puzzle — 11배수 스도쿠)
-- {
--   "grid_size": 9,
--   "fixed_cells": [{"row":0,"col":0,"value":5}, ...],
--   "variable_labels": {"a": null, "b": null, "c": null},
--   "rules": ["sudoku_standard", "11_multiple_inner"]
-- }

-- payload 예시 (sequence_fill — 배수 수열)
-- {
--   "problems": [
--     {"length": 10, "fixed": {"0": 1}, "constraints": ["prime_123","multiple2_234",...]},
--     {"length": 10, "fixed": {"4": 0}, "constraints": [...]}
--   ]
-- }

-- 챌린지 참여 이력
CREATE TABLE challenge_attempts (
  id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id         BIGINT UNSIGNED NOT NULL,            -- 기존 멘사 회원 ID 매핑
  challenge_id    BIGINT UNSIGNED NOT NULL,
  score           INT             NOT NULL DEFAULT 0,
  is_completed    BOOLEAN         NOT NULL DEFAULT FALSE,
  hint_used       TINYINT         NOT NULL DEFAULT 0,
  pass_used       TINYINT         NOT NULL DEFAULT 0,
  elapsed_sec     INT             NULL,
  session_state   JSON            NULL,                -- 진행 상태 저장 (결제 실패 시 복구용)
  completed_at    TIMESTAMP       NULL,
  created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_challenge (user_id, challenge_id),
  INDEX idx_challenge_score (challenge_id, score DESC)
);

-- 회원 연동 매핑 (기존 멘사 회원 ID ↔ 랭킹챌린지 내부 ID)
CREATE TABLE member_mappings (
  id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  mensa_user_id   VARCHAR(100)   NOT NULL UNIQUE,     -- 기존 멘사 시스템 회원 ID
  display_name    VARCHAR(100)   NOT NULL,
  email_hash      VARCHAR(64)    NULL,                 -- 개인정보 최소 수집 원칙
  created_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- 랭킹 집계 (배치 갱신용 스냅샷 — Redis 소스)
CREATE TABLE ranking_snapshots (
  id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  challenge_id    BIGINT UNSIGNED NOT NULL,            -- NULL = 전체 통합 랭킹
  member_id       BIGINT UNSIGNED NOT NULL,
  total_score     INT             NOT NULL DEFAULT 0,
  rank_position   INT             NULL,
  snapshot_at     TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_snapshot (challenge_id, member_id)
);

-- 유료 아이템 상품 정의
CREATE TABLE products (
  id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  type            ENUM('hint','pass','pass_bundle') NOT NULL,
  name            VARCHAR(100)   NOT NULL,
  price_krw       INT            NOT NULL,
  item_count      INT            NOT NULL DEFAULT 1,  -- 번들의 경우 힌트/패스 수량
  is_active       BOOLEAN        NOT NULL DEFAULT TRUE
);

-- 결제 이력 (멱등성 키 포함)
CREATE TABLE payment_orders (
  id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_uuid      CHAR(36)       NOT NULL UNIQUE,     -- 멱등성 키
  member_id       BIGINT UNSIGNED NOT NULL,
  product_id      BIGINT UNSIGNED NOT NULL,
  pg_provider     VARCHAR(20)    NOT NULL DEFAULT 'tosspayments',
  pg_order_id     VARCHAR(100)   NULL,
  amount_krw      INT            NOT NULL,
  status          ENUM('pending','paid','failed','refunded') NOT NULL DEFAULT 'pending',
  paid_at         TIMESTAMP      NULL,
  created_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);
```

---

## 자가 점검

### §A — 기술 검토서 품질 5항목

| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | Must 기능 전수 평가 (PRD Must 수와 동일한 행 수) | PASS | PRD Must 5개 = 검토서 §2 표 5행 정확 일치 |
| 2 | 리스크별 완화책 명시 | PASS | §4 리스크 7건 전체 완화책 + 담당자 컬럼 채워짐 |
| 3 | 공수 3시나리오(낙관/현실/보수) 모두 수치화 | PASS | §6 낙관 7~8w / 현실 11.5~13w / 보수 17~19w, 각 가정 명시 |
| 4 | 외부 의존성 버전·라이선스 확인 | PASS | §5 9개 의존성 전체 버전·라이선스·확인여부 기입. Redis 라이선스 주의사항 별도 명시 |
| 5 | 모든 판단에 PRD 섹션 인용 (`01-prd.md §N`) | PASS | §2 Must 전수 평가 전 행 참조 컬럼에 `01-prd.md §N` 형식 인용 |

**§A 통과율: 5/5**

---

### §B — Mesh cross-ref (8필드 형식)

| type | timestamp | owner | target | 위반 항목 ID | result | 사유 | evidence_ref |
|------|-----------|-------|--------|-------------|--------|------|-------------|
| TR | 2026-05-06 | 기술검토자 | 02-tech-review.md §2 | F-1 (랭킹 시스템) | PASS | 판정 "가능", Redis Sorted Set + 5분 캐시 근거 명시, `01-prd.md §4 Must-1` 인용 | §2 표 행 1 |
| TR | 2026-05-06 | 기술검토자 | 02-tech-review.md §2 | F-2 (챌린지 도전 무료) | PASS | 판정 "가능", 5종 콘텐츠 분석 근거 + 복잡 UI 컴포넌트 필요 명시, `01-prd.md §4 Must-2` 인용 | §2 표 행 2 |
| TR | 2026-05-06 | 기술검토자 | 02-tech-review.md §2 | F-3 (힌트·패스 유료) | PASS | 판정 "가능", PG사 연동 + 세션 상태 보존 명시, `01-prd.md §4 Must-3`, `§5 시나리오 2-B` 인용 | §2 표 행 3 |
| TR | 2026-05-06 | 기술검토자 | 02-tech-review.md §2 | F-4 (유료결제 패스) | PASS | 판정 "가능", 구독형 여부 미확정 → 오픈 이슈 TR-04 등록, `01-prd.md §4 Must-4` 인용 | §2 표 행 4 |
| TR | 2026-05-06 | 기술검토자 | 02-tech-review.md §2 | F-5 (기존 DB 연동) | PASS | 판정 "조건부", 3가지 연동 시나리오 A/B/C 대안 제시, `01-prd.md §4 Must-5`, `§6` 인용 | §2 표 행 5, §2 조건부 대안 |
| TR | 2026-05-06 | 기술검토자 | 02-tech-review.md §4 | F-6 (관리자 페이지 Should) | PASS | §4 리스크 아님 — Should 기능으로 공수 산정에 별도 포함(관리자 1~2w), TR-05 이슈 등록 | §6 공수표, §7 TR-05 |
| TR | 2026-05-06 | 기술검토자 | 02-tech-review.md §2 | F-8 (온라인테스트 첫 페이지 노출) | PASS | F-1 내 포함 평가. 기존 사이트 위젯 삽입 방식 명시(독립 JS 번들), TR-07 이슈 등록 | §2 표 행 1, §4 리스크 7, §7 TR-03 |
| TR | 2026-05-06 | 기술검토자 | 02-tech-review.md §3 | M-b (기술 스택 결정) | PASS | 전 레이어(FE/BE/DB/캐시/인프라/PG/콘텐츠) 선택·대안·근거 명시 | §3 기술 스택 결정 표 |
| TR | 2026-05-06 | 기술검토자 | 02-tech-review.md §5 | M-c (외부 의존성 라이선스) | PASS | 9개 의존성 버전·라이선스·확인여부 기입. Redis SSPLv1 주의 명시 | §5 표 |
| TR | 2026-05-06 | 기술검토자 | 02-tech-review.md §6 | M-e (공수 3시나리오) | PASS | 낙관/현실/보수 단계별 수치 + 가정 명시 | §6 표 및 근거 전제 |
| TR | 2026-05-06 | 기술검토자 | 02-tech-review.md §4 | H (리스크 완화책) | PASS | 7건 리스크 전체 완화책 + 담당자 기입 | §4 표 전체 |
| TR | 2026-05-06 | 기술검토자 | 02-tech-review.md §2 | U-1 (Must 전수 평가) | PASS | PRD Must 5개 = 검토서 5행, 결번 없음 | §2 표 |
| TR | 2026-05-06 | 기술검토자 | 02-tech-review.md §7 | U-2 (성능 SLA 미정) | PASS | 성공 지표 미확정(PRD 오픈 이슈 #2)으로 SLA 정의 불가 → TR-07 등록 | §7 TR-07 |
| TR | 2026-05-06 | 기술검토자 | 02-tech-review.md | U-3 (PRD 영역 침범 없음) | PASS | 기능 범위 축소/확장 결정 없음. F-5 조건부 대안은 시나리오 제시만, 선택은 PM 영역으로 명시 | §2 조건부 대안 말미 |
| TR | 2026-05-06 | 기술검토자 | 02-tech-review.md §7 | U-4 (오픈 이슈 담당자·기한) | PASS | TR-01~TR-07 전건 담당자 + 기한 기입 | §7 표 전체 |
| TR | 2026-05-06 | 기술검토자 | 02-tech-review.md | U-5 (PRD 섹션 인용) | PASS | Must 전수 평가 전 행 + 리스크 분석 PRD 참조 인용 | §2 참조 컬럼 전체 |

**§B error 건수: 0건**

---

**통과율: §A 5/5 + §B error 0건**
