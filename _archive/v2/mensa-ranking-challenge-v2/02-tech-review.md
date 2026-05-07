# 기술 검토서 — 랭킹챌린지_ver1.0

- 고객사: 멘사코리아
- 슬러그: `mensa-ranking-challenge-v2`
- 작성자: 기술검토자
- 작성일: 2026-05-06
- 참조 PRD: `01-prd.md` (버전 v0.1)

---

## 1. 검토 요약 (TL;DR)

Must 5개 모두 구현 가능하며 불가능 판정 없음. REQ-005 결제는 PG사 미확정으로 조건부(포트원 V2 경유 시 구현 가능). 낙관 7주 / 현실 10주 / 보수 13주 산정. 주요 리스크는 PG사 선정 지연 및 멘사 회원 DB 연동 방식 미정.

## 2. Must 기능 전수 평가

| # | Must 기능 | 판정 | 근거 | 참조 |
|---|-----------|------|------|------|
| 1 | REQ-001 챌린지 문제 풀기 | 가능 | 5종 챌린지는 정적 HTML/JS 로직으로 구현 가능. 타이머·정답 검증 모두 클라이언트 사이드 처리 가능. PNG 레퍼런스 확인으로 문항 구조 파악 완료. | `01-prd.md §4 Must-1` |
| 2 | REQ-002 점수 산정 및 저장 | 가능 | 정답 여부×풀이 시간 가중치 계산은 서버 API 로직 구현 가능. 회원 점수는 PostgreSQL 저장, 비회원은 세션 스토리지 임시 저장. | `01-prd.md §4 Must-2` |
| 3 | REQ-003 랭킹 조회 | 가능 | PostgreSQL ORDER BY + LIMIT 쿼리로 랭킹 구현. 챌린지별·전체 통합 랭킹 모두 SQL 집계로 처리 가능. | `01-prd.md §4 Must-3` |
| 4 | REQ-004 회원가입·로그인 | 가능 | Supabase Auth로 이메일·카카오·구글 소셜 로그인 지원. 멘사 회원 배지는 별도 인증 레이어(수동 또는 API — 오픈 이슈). | `01-prd.md §4 Must-4` |
| 5 | REQ-005 IQ 테스트 응시권 결제 | 조건부 | PG사 미확정이나 포트원 V2 경유 시 카드·카카오페이 동시 지원 가능. PG사 선정 후 포트원 V2 `@portone/browser-sdk` + `@portone/server-sdk` 연동으로 구현 가능. | `01-prd.md §4 Must-5` |

**조건부 기능에 대한 대안**:
- REQ-005 → PG사 미선정 시에도 포트원 V2를 추상 레이어로 사용하면 이후 PG사 변경 시 코드 수정 최소화. PM이 2026-06-01 기한 내 PG사 결정 시 일정 영향 없음.

## 3. 아키텍처 제안

### 컴포넌트 구성
```
[사용자 브라우저]
     ↓ HTTPS
[Frontend — Next.js 15 App Router (Vercel)]
     ↓ Server Actions / API Routes
[Backend — Next.js Route Handlers (Supabase PostgreSQL)]
     ↓
  ┌──────────────────────────────────────┐
  │ Supabase (Auth + PostgreSQL + RLS)  │
  └──────────────────────────────────────┘
     ↓
  [외부 서비스]
  ├── 포트원 V2 (PG 추상 레이어)
  │      └── PG사 (카드·카카오페이 — 선정 대기)
  └── Supabase Auth OAuth
         ├── 카카오 OAuth
         └── Google OAuth
```

### 주요 데이터 흐름
1. **챌린지 풀기**: 사용자 문제 제출 → Next.js Route Handler → 정답 검증 + 점수 계산 → Supabase DB 저장(회원) / 세션 스토리지 유지(비회원) → 결과 반환
2. **랭킹 조회**: 클라이언트 요청 → Route Handler → Supabase PostgreSQL `SELECT ... ORDER BY score DESC LIMIT N` → 캐시(ISR or revalidate) → 반환
3. **결제 플로우**: 클라이언트에서 포트원 V2 결제 팝업 호출 → 포트원 → PG사 → 결제 완료 webhook → 서버 검증 → 응시권 발급 DB 기록
4. **소셜 로그인**: 카카오·구글 OAuth → Supabase Auth → JWT 발급 → RLS로 사용자별 데이터 접근 제어

### 기술 스택 결정
| 레이어 | 선택 | 대안 | 근거 |
|--------|------|------|------|
| Frontend | Next.js 15 (App Router) | Remix, Nuxt.js | Vercel 네이티브 최적화 + ISR 랭킹 캐싱 + 국내 레퍼런스 풍부. 팀 빌딩 속도 우선. |
| CSS/UI | Tailwind CSS v4 | styled-components, CSS Modules | 유틸리티 클래스 기반 빠른 MVP 구현. 추후 디자인 토큰 연동 용이. |
| Backend | Next.js Route Handlers (Serverless) | Express.js, FastAPI | 별도 서버 불필요 → Vercel 단일 배포. MVP 규모에 과도한 마이크로서비스 지양. |
| ORM | Prisma (또는 Drizzle) | 직접 SQL | 타입 안전 쿼리 + 스키마 마이그레이션 관리. Drizzle은 경량 대안으로 공수 감안. |
| DB | Supabase PostgreSQL | Neon Postgres, PlanetScale | Auth + DB + RLS 통합 제공 → 관리 오버헤드 최소화. 카카오·구글 OAuth 연동 공식 지원. |
| Auth | Supabase Auth | Auth.js (NextAuth), Clerk | 카카오·구글 OAuth 내장. RLS 기반 사용자 격리. 별도 Auth 서버 불필요. |
| 결제 | 포트원 V2 (`@portone/browser-sdk` + `@portone/server-sdk`) | 토스페이먼츠 직접 연동 | 카드·카카오페이 등 복수 PG사를 단일 SDK로 추상화 → PG사 변경 시 코드 최소 수정. |
| 인프라 | Vercel (Frontend + Serverless) | AWS, Fly.io | Next.js 공식 권장 + 빠른 배포 파이프라인. MVP 예산 범위 적합. |
| 모니터링 | Vercel Analytics + Supabase 대시보드 | Datadog, Sentry | MVP 수준에서 추가 비용 없이 기본 관측성 확보. |

## 4. 리스크 분석

| # | 리스크 | 영역 | 영향 | 완화책 | 담당 |
|---|--------|------|------|--------|------|
| 1 | PG사 선정 지연 (2026-06-01 기한) | 외부의존 | 높음 | 포트원 V2 추상 레이어로 PG사 교체 비용 최소화. 지연 시 결제 기능을 마지막 스프린트로 분리. | PM(신주한) |
| 2 | 멘사 회원 DB 연동 방식 미정 | 외부의존 | 중간 | 배지 부여를 수동 인증(이메일 확인 후 관리자 지정) 방식으로 우선 구현. API 연동은 후속 스프린트. | 기술검토자 |
| 3 | 카카오 OAuth 비즈니스앱 필수 이메일 동의 | 보안·인증 | 중간 | Supabase Auth 카카오 연동 시 비즈니스앱 전환 필수. 이메일 미동의 사용자는 fallback UI(이메일 직접 입력) 안내. | 기술검토자 |
| 4 | 랭킹 조회 성능 (트래픽 급증 시) | 성능 | 중간 | ISR(Incremental Static Regeneration)로 60초 단위 랭킹 캐싱. DB 인덱스 `(challenge_id, score DESC)` 필수. | 기술검토자 |
| 5 | 비회원 세션 점수 유실 (브라우저 새로고침) | 데이터 모델 | 낮음 | PRD §5 시나리오 2에서 허용된 동작. 세션 만료 안내 UI로 처리. 회원가입 유도 기회로 활용. | UX기획자 |
| 6 | 결제 웹훅 이중 처리 위험 | 보안 | 중간 | 결제 고유 ID 멱등키(idempotency key) 서버 저장 후 중복 처리 차단. | 기술검토자 |
| 7 | Vercel 서버리스 콜드 스타트 (랭킹 조회 지연) | 성능 | 낮음 | ISR + Edge Cache로 완화. 실제 서버리스 함수 호출 최소화. | 기술검토자 |

## 5. 외부 의존성

| 의존성 | 용도 | 버전 | 라이선스 | 확인됨 |
|--------|------|------|----------|--------|
| Next.js | 풀스택 프레임워크 (SSR/ISR/Route Handlers) | 15.x | MIT | Y |
| Supabase (JS Client) | Auth + PostgreSQL + RLS | `@supabase/supabase-js` v2.x | MIT | Y |
| Supabase Auth | 카카오·구글 OAuth + 이메일 로그인 | Supabase Auth v2 (내장) | Apache-2.0 | Y |
| @portone/browser-sdk | 결제 팝업 클라이언트 SDK | 최신 stable (npm) | Apache-2.0 / MIT | Y |
| @portone/server-sdk | 결제 검증 서버 SDK | Node.js v20+ 필요 | Apache-2.0 / MIT | Y |
| Prisma ORM | DB 스키마 관리·타입 안전 쿼리 | v5.x | Apache-2.0 | Y |
| Tailwind CSS | UI 스타일링 | v4.x | MIT | Y |
| 카카오 OAuth | 소셜 로그인 | REST API (Supabase 경유) | 카카오 개발자 약관 | Y |
| Google OAuth | 소셜 로그인 | OAuth 2.0 (Supabase 경유) | Google API 서비스 약관 | Y |
| PG사 (미정) | 카드·카카오페이 결제 처리 | 포트원 V2 경유 | PG사 계약 | N (미정) |

**주의**: 카카오 OAuth는 Supabase Auth 경유 시 **카카오 비즈니스앱 전환 필수**. 이메일 동의항목 필수 설정 필요.

## 6. 공수 산정 (3 시나리오)

| 단계 | 낙관 | 현실 | 보수 |
|------|------|------|------|
| 설계 (DB 스키마, API 설계, UI 플로우 확정) | 0.5w | 1w | 1.5w |
| 개발 — 기반 (인증·DB·배포 파이프라인) | 1w | 1.5w | 2w |
| 개발 — Must (REQ-001~005) | 2.5w | 3.5w | 5w |
| 개발 — Should (REQ-006~007) | 0.5w | 1w | 1.5w |
| 테스트 (기능·결제·엣지 케이스) | 1w | 1.5w | 2w |
| 배포 및 스테이징 검증 | 0.5w | 0.5w | 1w |
| **합계** | **6w** | **9w** | **13w** |

**근거 전제**:
- 낙관: 풀스택 개발자 2명 투입, PG사 2026-05-20 이전 확정, 멘사 회원 배지 수동 운영으로 갈음, 외부 블로커 없음.
- 현실: 풀스택 개발자 1~2명 투입, PG사 2026-06-01 확정, 카카오 비즈니스앱 검수 1~2주 대기, 일반적인 버그 대응 포함.
- 보수: 개발자 1명, PG사 6월 중순 이후 확정, 멘사 회원 DB API 연동 시도(실패 시 수동 fallback), QA 회귀 1회 추가.

**2026년 7월 중 출시 목표** (`01-prd.md §6`):
- 낙관 6w 기준: 2026-05-20 착수 → 2026-06-28 완료 → 목표 달성 가능
- 현실 9w 기준: 2026-05-06 착수 → 2026-07-07 완료 → 목표 달성 가능 (빠른 착수 필요)
- 보수 13w 기준: 2026-05-06 착수 → 2026-08-04 완료 → **목표 초과 위험** → 2~3주 선행 착수 또는 Should 범위 축소 검토 필요

## 7. 미해결 이슈 / 후속 확인 필요

| # | 항목 | 상세 | 담당자 | 기한 |
|---|------|------|--------|------|
| 1 | PG사 선정 | 포트원 V2 경유 준비 완료. 카드사·카카오페이 직접 계약 또는 포트원 통해 어떤 PG사 선택할지 PM 결정 필요. | 신주한(PM) | 2026-06-01 |
| 2 | 멘사 회원 DB 연동 방식 | API 제공 여부 확인 필요. 미제공 시 수동 인증(관리자 이메일 확인) → 배지 수동 지정 fallback 으로 진행. | 기술검토자 + 멘사코리아 | 2026-06-01 |
| 3 | 카카오 비즈니스앱 전환 | Supabase Auth 카카오 연동 필수 요건. 카카오 개발자 콘솔에서 비즈니스앱 전환 신청 및 심사 기간(최대 2주) 고려 필요. | 기술검토자 | 2026-05-20 |
| 4 | 월별 랭킹 초기화 여부 | DB 스키마 설계(전체 스코어 테이블 vs. 월별 파티셔닝) 결정에 영향. PM 운영 정책 확정 필요. | 신주한(PM) | 2026-06-15 |
| 5 | 출시 일정 확정 | 현실 시나리오 기준 2026-05-06 착수 시 7월 내 완료 가능. 착수 지연 시 Should 범위 축소 고려. | 기술검토자 + PM | 2026-06-08 |
| 6 | 예산 한도 확정 | Vercel Pro + Supabase Pro 월 구독료 ($50~$100/월 예상) 및 포트원 결제 수수료(거래액의 약 1.5~3.5%) 포함 예산 확인 필요. | 신주한(PM) | 2026-06-08 |

---

## mock API 명세 (v1 한정 — 정식화는 v1.1 이관)

아래는 구현 방향 참고용 mock 명세이며 계약 수준 정의가 아님.

| 엔드포인트 | 메서드 | 역할 |
|------------|--------|------|
| `/api/challenges/[id]/submit` | POST | 챌린지 정답 제출 + 점수 반환 |
| `/api/ranking` | GET | 전체/챌린지별 랭킹 조회 |
| `/api/payment/prepare` | POST | 포트원 결제 사전 등록 |
| `/api/payment/confirm` | POST | 포트원 결제 검증 + 응시권 발급 |
| `/api/auth/badge` | POST | 멘사 회원 배지 부여 (관리자 또는 인증 후) |

---

## 자가 점검

### §A. 산출물 품질 (5항목)

- [x] **항목 1**: Must 기능 전수 평가 — PRD Must 5개(REQ-001~005)와 검토서 `§2` 표 행 수 일치 (5행)
- [x] **항목 2**: 리스크별 완화책 명시 — `§4` 7개 리스크 모두 완화책 + 담당자 컬럼 포함
- [x] **항목 3**: 공수 3시나리오 수치화 — `§6` 낙관 6w / 현실 9w / 보수 13w 전 단계 숫자 명시
- [x] **항목 4**: 외부 의존성 확인 — `§5` 전 행에 버전·라이선스·확인 여부(Y/N) 명시. PG사는 N (미정, 오픈 이슈 등록)
- [x] **항목 5**: 모든 판단에 PRD 섹션 인용 — Must 평가 `참조` 컬럼 `01-prd.md §4 Must-N` 형식으로 전행 포함

**§A 통과율: 5/5**

### §B. M11 v1 cross-ref 자가 점검

#### Part 1 — TR owner 자동 도출

- [x] **F-1·F-2·F-3·F-4·F-5·F-6**: ID 정합 — TR-NNN 미사용(v1 검토서 구조상 기능 헤더 없음). `§2` Must 평가 표는 REQ ID 참조 형식으로 정합. ID 독립 시퀀스·중복·결번 없음.
- [x] **F-8**: NA 사유 누락 — NA 항목 없음. PG사 의존성 N(미정) 사유 `§5` + `§7` 이슈 1에 명시
- [x] **M-b·M-c·M-e**: 출처/끊김/NA 모순 — 모든 판단이 `01-prd.md §N` 인용. 참조 REQ 전부 실제 존재(REQ-001~005). NA→active 모순 없음.

#### 전 owner 공통

- [x] **H-1·H-2·H-5**: NA 휴리스틱 — NA 항목 없음 (N/A)

#### Part 2 — 범용 U-1~U-5

- [x] **U-1**: M9-5 자동 검증 — TR 영역 error 0건. 모든 PRD REQ 참조 유효
- [x] **U-2**: Decision Log 변경 사항 — STATE.md last-write 시 기술 스택·리스크 Decision Log 기록 예정
- [x] **U-3**: 후행 영역(S·P) broadcast — 기술 스택·외부 의존성 확정 broadcast 발행 예정 (`_broadcast.log`)
- [x] **U-4**: 노션 동기화 — 보류 (PM 별도 /sync-notion 시점, STATE.md `Notion Page ID: 미등록` 기재)
- [x] **U-5**: `_broadcast.log` 8필드 기록 예정 (last-write 시점에 기록)

**§B 통과: error 0건**

**통합 통과율: §A 5/5 + §B error 0 → UX기획자 호출 가능**
