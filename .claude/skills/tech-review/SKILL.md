---
name: tech-review
description: 기술 검토서 작성 Skill. 기술검토자가 PRD §B 요구사항 카탈로그를 읽고 요구사항 ID 단위 기술 평가·아키텍처·공수를 검토할 때 호출. 출력은 projects/<slug>/02-tech-review.md 경로에 생성. 본문은 §1 TL;DR + §2 요구사항 전수 평가 + §3 아키텍처 + §4 리스크 + §5 외부 의존성 + §6 공수 3시나리오 + §7 미해결 이슈 + 자가 점검(§A 5항목 + §B M11 v1 cross-ref). PRD(01-prd.md) 선행 필수.
---

# tech-review — 기술 검토서 작성 Skill

## 본질

기술검토자(TR owner)가 PRD §B 요구사항 카탈로그를 *기준 SSOT*로 받아 요구사항 ID 단위 기술 평가. *Must 기능 단위 평가* (M9·M13) 폐기 — *요구사항 ID 1:1 매핑* 본질 (M16).

## 언제 쓰나

- 기술검토자가 `/kickoff` [4] 병렬 진행 단계에서 자기 영역 검토서를 작성할 때 (4명 동시 spawn 시작점부터)
- **선행 조건**: `projects/<slug>/STATE.md` 존재 + `projects/<slug>/_broadcast.log` 생성됨

**선행 산출물 *완성* 사용 게이트** (CLAUDE.md §6-2 정합):
- TR이 PRD를 *완성된 산출물로 사용*하는 시점 게이트: PRD §A 자동 실패 0 + 통과율 ≥ 6/7 + §B error 0
- **단 부분 broadcast/reply 흐름은 게이트 무관** — PRD 부분 broadcast 받자마자 즉시 진행 (§4-0 (iv))
- 통과율 미달 + 완성 단계 → *완성 산출물 사용 거부* + service-planner reply (자가점검 재발동)

## §4-0 Mesh 5요소 정합 (M15 보존)

본 Skill은 §4-0 5요소를 따른다:

- (i) **4명 동시 spawn 시작점**: /kickoff [2]에서 tech-reviewer 동시 spawn. 본 Skill은 spawn 직후부터 호출 가능
- (ii) **부분 broadcast 연속 흐름**: 검토 중 부분 확정 사건마다 즉시 발행 (묶음 broadcast 금지)
- (iii) **양방향 reply**: PRD 모순·누락 발견 시 자율 결정 금지 — service-planner reply 의무 (격차 4 정정)
- (iv) **자가점검 = 완성 검증**: 검토서 완성 시점 1회. 후행 영역(UX·P) 진입 트리거 *아님*
- (v) **모든 영역 병렬·유기**: reply 처리 중에도 자기 영역 다른 작업 진행 계속

## 호출 절차

### 1. STATE.md + `_broadcast.log` + 01-prd.md first read (CLAUDE.md §6)

- STATE.md: 현재 단계·PM·오픈 이슈 파악
- `_broadcast.log`: PRD 부분 broadcast 수신 사건 추적 → PRD 부분 진행 가능 시점부터 자기 작업 시작
- 01-prd.md:
  - §0 PM 원본 *그대로 참조* (변환·삭제 금지 — service-planner 영역)
  - §A 비전 (WHY + 1차 사용자) — 기술 평가 컨텍스트
  - §B 요구사항 카탈로그 — 모든 REQ ID 식별 → §2 평가 1:1 매핑 대상
  - §C 표준 패턴 자율 적용 기록 — TR 자율 결정 시 service-planner에 broadcast/reply로 §C 기록 요청 (TR 직접 §C 수정 금지)
  - §D 오픈 이슈 / §E 자가점검 — PRD 통과 여부 확인

### 2. template.md 로드 → 7 섹션 작성 (부분 broadcast 연속 흐름)

#### 부분 broadcast 트리거 (검토 중 즉시 발행)

| 트리거 사건 | broadcast 대상 |
|-------------|----------------|
| 외부 의존성 후보 1차 식별 | UX·P |
| 기술 스택 1개 확정 | UX·P |
| 공수 1차 시나리오 | REQ |
| 요구사항 1건 기술 가능성 평가 (TR-NNN 발급) | REQ·UX |

발행 방식: `SendMessage`(broadcast) 또는 `_broadcast.log` 8필드 기록 (type=`broadcast`, owner=`TR`, target=`02-tech-review.md §N`)

#### 작성 시 본질 영역

- **§1 TL;DR**: "요구사항 N건 중 M건 가능" 표현 (Must 기능 X)
- **§2 요구사항 전수 평가**:
  - 표 행 = PRD §B 카탈로그 모든 REQ ID 1:1 매핑 (누락·추가 0건, 자동 실패 조건)
  - TR-NNN 영역별 독립 시퀀스 (M10 정합)
  - 표 행 형식 (7열, template 정합): `| {#} | TR-NNN | REQ-{도메인}-NNN-NN | {요구사항명} | {판정} | {근거·공수} | 01-prd.md §B-N REQ-{도메인}-NNN-NN |` (표 외 별도 헤더 부재)
  - 참조 형식: `01-prd.md §B-N REQ-{도메인}-NNN-NN`
  - 정규식 정합: `^REQ-[A-Z]{2,4}-\d{3}-\d{2}$`
- **§3 아키텍처 + 기술 스택 결정**:
  - 표준 패턴 영역(JWT 세션 / RDB CRUD 등) → 자율 결정 OK + service-planner reply로 §C 기록 요청 (TR 직접 §C 수정 X)
  - 경계 사례 영역(SSO·결제·2FA·이미지 업로드 등) → PRD §B 인용 의무. 미명시 시 reply 발행
- **§4 리스크 분석**: 성능·보안·확장성·외부 의존성·데이터 모델 5축
- **§5 외부 의존성**: 버전·라이선스·확인 Y/N
- **§6 공수 3시나리오**: 낙관 / 현실 / 보수 (단계 단위 — 설계/개발/테스트/배포)
- **§7 미해결 이슈**: 담당자·기한 필수

### 3. 기술 스택 결정 경계 (M16 — PI-010·PI-011·PI-012 정합)

**기본값 = TR 산출물 결정 영역** (CLAUDE.md §6 영역 침범 정합 — service-planner는 기술 스택 결정 X / TR이 결정):

| 영역 | TR 처리 |
|------|---------|
| **PRD §B 명시 사항** (PM이 직접 명시한 스택·언어·인프라) | TR 인용 + 검토 (자율 결정 X) |
| **PRD 명시 없음 + 표준 패턴** (JWT 세션·RDB CRUD 등 *프로젝트 무관 관행*) | TR 자율 결정 + Decision Log + service-planner reply로 §C 기록 요청 |
| **PRD 명시 없음 + 일반 기술 스택** (FE 프레임워크·BE 언어·호스팅·DB 등 *프로젝트 차별점 X*) | TR 자율 제안 + 대안 명시 + Decision Log (격차 4 회귀 방지 — *PRD 명시 사항이 있으면 그것 우선*) |
| **PRD 명시 없음 + 경계 사례** (SSO·결제·2FA·이미지 업로드 등) | **자율 결정 절대 금지** — service-planner reply 발행 (PI-011, 격차 4 정정 핵심) |
| **PRD 명시 없음 + 특정 로직** (결제 흐름·도메인 로직) | controller 경유 PM `AskUserQuestion` 또는 service-planner reply (PI-012) |

**격차 4 사례 회귀 방지 영역**:
- 격차 4 사례 (Next.js·Supabase·Vercel 자율 결정 ❌)는 *경계 사례*가 아닌 *일반 기술 스택*이지만, 멘사 v2 PM 의도 = SSO·결제·2FA가 PRD에 명시되어 있고 그 *연관 인프라*가 미명시였던 경우. 즉 *경계 사례 연관 인프라*는 reply 의무 (PG사 결정 시 백엔드 환경도 영향)
- 일반 기술 스택은 TR 자율 제안 + Decision Log이 본질. 단 PM 명시 사항 없는 *비표준 결정* 시 reply 발행이 안전

**판단 결정 트리**:
```
PRD §B 명시 → TR 인용
PRD §B 미명시 + 표준 패턴 → 자율 + §C 기록 요청
PRD §B 미명시 + 일반 기술 스택 → 자율 제안 + Decision Log
PRD §B 미명시 + 경계 사례 → reply 의무 (자율 금지)
PRD §B 미명시 + 특정 로직 → PM 추가 질의
```

### 4. 특정 로직 발견 시 PM 추가 질의 (PI-012)

- 결제 흐름 (결제 수단·환불 정책·정기 결제)
- 도메인 로직 (랭킹 산정·매칭 알고리즘 등)
- 비표준 비즈니스 로직

→ controller 경유 PM `AskUserQuestion` 또는 즉시 reply (service-planner) → PM 결정 → PRD §B 명시.

### 5. 다른 영역 reply 수신 시 처리 (§4-0 (iii))

UX·P가 TR 산출물 모순·누락 발견하여 reply 발행한 경우:
- 자가점검 재발동 → 보강 → broadcast 재발행
- 자기 영역 다른 작업은 진행 계속 (§4-0 (v))

### 6. checklist.md 로드 → 자가 점검 (§4-0 (iv) 완성 검증 한정)

#### §A 산출물 품질 5항목 (4/5 이상 통과)

1. 요구사항 ID 단위 전수 평가 (PRD §B 카탈로그 1:1 매핑)
2. 리스크별 완화책 + 담당자
3. 공수 3시나리오 수치화
4. 외부 의존성 (버전·라이선스·확인 Y/N)
5. REQ ID 4 segment 인용 (`01-prd.md §B-N REQ-{도메인}-NNN-NN`)

#### §B M11 v1 cross-ref (8필드 형식, M9 §10-2-2 + 정규식 4 segment 갱신)

- F-1~F-8 ID·헤더·NA / M-b·M-c·M-e 매핑 / H-1·H-2·H-5 휴리스틱 / U-1~U-5 범용

**통과 기준**: §A 4/5 이상 + §B error 0 → 후행 영역(UX·P) *완성 산출물 사용 게이트* 통과.

⚠️ **자가점검 통과는 *완성 신호*이지 후행 영역 진입 트리거 아님** — 후행은 부분 broadcast마다 즉시 진행 (§4-0 (iv)).

### 7. STATE.md 갱신 (last write 원칙)

- 산출물 인덱스: `- [x] 02-tech-review.md (YYYY-MM-DD)`
- Decision Log: "기술 스택 결정: <스택명> — 근거: ..." / "표준 패턴 자율 결정: <영역> default" (PRD §C 기록과 정합)
- 미해결 이슈: 리스크 + 담당자 + 기한 등록
- 마지막 업데이트 갱신

## 웹 조사 권한

- `WebFetch`, `WebSearch`는 **기술 조사용**만 사용 (라이브러리 버전·성능 벤치마크·보안 취약점)
- 일반 검색 금지 (CLAUDE.md §8)
- 호출 시 `ask` 승인 프롬프트 발화

## 출력 경로

- `projects/<slug>/02-tech-review.md` (고정)
- 다른 경로 출력 금지

## 완료 보고 형식 (CLAUDE.md §11 4블록)

```
[기술검토자] 완료
- 산출물: projects/<slug>/02-tech-review.md
- 자가 점검: §A N/5 + §B error N건
- 오픈 이슈: N건 (리스크·담당자·기한)
- 다음 권장: 후행 영역(UX·P) *완성 산출물 사용 게이트* 통과 — 후행 진행 중
```

## 영역 침범 금지 (CLAUDE.md §6·§9)

- ❌ PRD §0 PM 원본 *변환·삭제* (service-planner 영역)
- ❌ PRD §B *Must 기능 단위* 평가 (M9·M13 폐기) — *요구사항 ID 단위* 평가만
- ❌ PRD 명시 없음 발견 시 *자율 결정 우회* (격차 4 사례: Next.js·Supabase·Vercel 자율 결정 ❌)
- ❌ 경계 사례(SSO·결제·2FA·이미지 업로드) 자율 결정 — 반드시 PRD §B 인용
- ❌ 특정 로직(결제·도메인 로직) PM 질의 우회
- ❌ 묶음 broadcast (검토서 완성 시점 1회 발행 = 격차 2 회귀)
- ❌ 섹션 단위 인용 (`01-prd.md §N`) — REQ ID 4 segment 단위 인용만

## 참조 파일

- `template.md` — 7 섹션 + 요구사항 ID 1:1 매핑 표
- `checklist.md` — §A 5항목 + §B M11 v1 cross-ref (정규식 4 segment 갱신)
- `CLAUDE.md` §4-0 — Mesh 본질 5요소
- `CLAUDE.md` §6-2 — 선행 산출물 *완성* 사용 게이트

## v1 미정의

- API 계약 정식화는 v1.1 이관 (`_FOLLOWUP.md` ②). v1에서는 mock 명세만 검토서에 포함 가능.

## 변경 이력

- (2026-05-07) **M16 진입** — 요구사항 ID 단위 전수 평가 (Must 기능 폐기) + REQ ID 4 segment 인용 + 표준 패턴/경계 사례/특정 로직 처리. 격차 6 (PRD 본질) + 격차 4 (자율 결정 우회) 정정. M15 B-3 (.claude/agents/tech-reviewer.md 보강분) 정합.
- (이전) M9·M13 — Must 기능 전수 평가 + 섹션 단위 인용 (M16에서 폐기).
