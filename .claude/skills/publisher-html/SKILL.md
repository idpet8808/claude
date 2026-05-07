---
name: publisher-html
description: 퍼블리셔 MVP 모드 산출물 작성 Skill. UX-spec 화면 명세 (UI-{명칭}-{NN} 단위) 그대로 HTML 변환 + assets/ + README NA list. 퍼블리셔 에이전트가 호출. 출력 위치 고정 projects/<slug>/04-prototype-mvp/. 1 화면 = 1 HTML 파일 (pages/<UI-{명칭}-{NN}>.html). HTML 상단 주석 SSoT 형식 `<!-- UI-{명칭}-{NN} / → REQ-{도메인}-NNN-NN -->`. P-NNN 폐기 (M16 PI-019 A1).
---

# publisher-html — MVP 모드 Skill

## 본질

퍼블리셔(P owner)가 UX-spec 시각적 스켈레톤·Description을 *기준 SSOT*로 받아 HTML/CSS/JS 변환. *비주얼 디자인 시안 결정 X* (영역 침범). 1 화면(UI-{명칭}-{NN}) = 1 HTML 파일.

**M16 정합** (PI-019 A1):
- **P-NNN 폐기** — UI ID 단일 사용
- 파일명 = UI ID (M9 §1-2-2 갱신)
- HTML 상단 주석 = `<!-- UI-{명칭}-{NN} / → REQ-{도메인}-NNN-NN -->`

## 호출 주체

- `.claude/agents/publisher.md` (MVP 모드)

## 선행 조건

- `projects/<slug>/STATE.md` 존재
- `projects/<slug>/_broadcast.log` 생성됨
- `projects/<slug>/01-prd.md`, `02-tech-review.md`, `03-ux-spec.md` 모두 존재
- `04-prototype-mvp/` 미존재 (덮어쓰기 금지 — CLAUDE.md §9)

**선행 산출물 *완성* 사용 게이트** (CLAUDE.md §6-2):
- P가 03-ux-spec을 *완성된 산출물로 사용*하는 시점 게이트: 03 자가점검 자동 실패 0 + 통과율 ≥ 3/4 + §B error 0 + UI 확정 broadcast 수신
- **단 부분 broadcast/reply 흐름은 게이트 무관** — UX 부분 broadcast 받자마자 즉시 진행 (§4-0 (iv))
- assets/ 골격은 UI broadcast 무관 시작 가능 (§4-0 (v))

## §4-0 Mesh 5요소 정합 (M15 + M16)

- (i) **4명 동시 spawn 시작점**: publisher 동시 spawn. assets/ 골격 즉시 시작
- (ii) **부분 broadcast 연속 흐름**: HTML 작성 중 부분 확정 사건마다 즉시 발행
- (iii) **양방향 reply (multi-hop 시작점, 격차 5)**: UX 명세 모순·누락 발견 시 ux-planner reply / UX가 PRD 기인이면 multi-hop으로 service-planner까지 연쇄
- (iv) **자가점검 = 완성 검증**: 04-prototype-mvp/ 완성 시점 1회. 페이즈 1 마지막 단계
- (v) **모든 영역 병렬·유기**: assets/ 골격 → S 무관 선행 / reply 처리 중에도 다른 화면·assets·README 진행 계속

## 호출 절차

### 1. STATE.md + `_broadcast.log` + 01·02·03 first read

- STATE.md: 현재 단계·PM·오픈 이슈
- `_broadcast.log`: REQ/TR/UX 부분 broadcast 수신 사건 추적
- 01-prd.md:
  - §0 PM 원본 *그대로 참조* (변환·삭제 금지)
  - §B 요구사항 카탈로그 — REQ ID 식별 (HTML 매핑)
  - §C 표준 패턴 자율 적용 — 퍼블 자율 결정 시 service-planner에 broadcast/reply로 §C 기록 요청 (퍼블 직접 §C 수정 금지)
- 02-tech-review.md:
  - §3 아키텍처·기술 스택 — HTML 구조 정합
- 03-ux-spec.md:
  - §1 화면 목록 — 모든 UI-{명칭}-{NN} 식별 → 1:1 매핑 대상
  - §2 화면 명세 — 시각적 스켈레톤·Description·4상태 매핑

### 2. 폴더 골격 부트스트랩 (assets/ S 무관 선행 — §4-0 (v))

`template.md` 참조:
- `04-prototype-mvp/pages/`, `assets/{tokens, css, js}/`, `README.md` 생성
- assets/ tokens (color·spacing·typography) + css/base.css + js/main.js 작성

### 3. UX-spec 부분 broadcast 수신마다 해당 화면 HTML 부분 진행

#### 부분 broadcast 트리거 (HTML 작성 중 즉시 발행)

| 트리거 사건 | broadcast 대상 |
|-------------|----------------|
| assets 토큰 1개 확정 | (선행 영역 무관) |
| HTML 파일 1개 발급 (UI-{명칭}-{NN}) | UX |
| NA 발견 (UI ↔ REQ 매핑 누락) | REQ/UX |

#### 작성 시 본질 영역

- **화면 1:1 매핑** — 03-ux-spec §1의 모든 UI ID와 1:1 매핑 (누락·추가 0건)
- **파일명** — `pages/<UI-{명칭}-{NN}>.html` (UI ID 기반)
- **HTML 상단 주석 SSoT**:
  - REQ 매핑 화면: `<!-- UI-{명칭}-{NN} / → REQ-{도메인}-NNN-NN, REQ-{도메인}-NNN-NN -->`
    - 정규식: `^<!-- UI-[A-Za-z][A-Za-z0-9_]*-\d{2} / → REQ-[A-Z]{2,4}-\d{3}-\d{2}(, REQ-[A-Z]{2,4}-\d{3}-\d{2})* -->$`
  - **전역 화면 예외** (UX-spec에서 `→ 전역 공통`로 정의된 화면 — 헤더/푸터 등): `<!-- UI-{명칭}-{NN} / → 전역 -->`
    - 정규식: `^<!-- UI-[A-Za-z][A-Za-z0-9_]*-\d{2} / → 전역 -->$`
- **화면 콘텐츠** — UX-spec §2 시각적 스켈레톤·Description *그대로 매핑* (퍼블 자의 추가·변경 금지)
- **README 매핑 표** — Screen ID + 화면명 + REQ + pages/ 컬럼
- **NA list** — `- REQ-{도메인}-NNN-NN: 사유 1줄` 형식 (§3-3 I5)

### 4. UX-spec 명시 없음·모순 발견 시 reply 의무 (§4-0 (iii) — 격차 5 시작점)

- UX-spec §2에 *명시 없음* (예: 화면 그리드 사양·인터랙션 누락) 발견 시 자율 결정 금지
- `SendMessage`(ux-planner) reply 발행
- **격차 5 시작점 시나리오** (multi-hop):
  ```
  퍼블: UI-Member_Detail-03 그리드 사양 누락 → SendMessage(ux-planner) reply
     ↓
  UX: 03 확인 → PRD §B에 REQ-USR-005-01 N값 미정 발견
     → SendMessage(service-planner) reply
     ↓
  REQ: 자가점검 재발동 → broadcast(전체): "REQ-USR-005-01 N=Top 10 확정"
     ↓
  UX: 03 보강 → broadcast(P): "UI-Member_Detail-03 그리드 확정"
     ↓
  퍼블: HTML 진행 재개
  ```

### 5. 다른 영역 reply 수신 시 처리 (§4-0 (iii))

(페이즈 1 마지막이라 후행 reply 가능성 낮음. 단 PM·노션관리자 reply 가능)

### 6. checklist.md 로드 → 자가 점검 (§4-0 (iv) 완성 검증)

7항목 (M9 §10-2-2 + PI-019 정합):
- F-1·F-2·F-3 (UI ID 정합 — UX-spec 1:1 매핑)
- F-4·F-5·F-6 (HTML 상단 주석 정규식 정합)
- F-8 + README NA SSoT 예외
- M-b·M-c (orphan / 끊김 — UI + REQ 양쪽)
- M-e (NA → active 모순)
- H-1·H-2·H-5 (NA 휴리스틱)
- U-1~U-5 (범용)

**통과 기준**: 6/7 이상 + 자동 실패 0 → 페이즈 1 종료 (PM 노션 호출 결정).

**자동 실패 조건**:
- HTML 상단 주석 SSoT 누락 (UI ID 정규식 위배 포함)
- README NA list 형식 위반
- **P-NNN 사용** (M16 폐기)

### 7. STATE.md 갱신 (last write)

- 산출물 인덱스: `- [x] 04-prototype-mvp/ (YYYY-MM-DD)`
- Decision Log:
  - HTML 파일 신규 발급 — "UI-{명칭}-{NN} 매핑: REQ-{도메인}-NNN-NN"
  - assets/tokens 변경 — "tokens/<file> 변경: <변경 내용>"
  - README NA 항목 추가 — "P 영역 NA: REQ-{도메인}-NNN-NN, 사유: ..."
  - 표준 패턴 자율 결정 — service-planner reply 발행 + Decision Log 기록 (예: "(YYYY-MM-DD) 표준 패턴 자율 적용: 로그인 = 이메일/비밀번호 default — service-planner §C 기록 요청"). service-planner가 PRD §C 실제 작성
- 마지막 업데이트 갱신

## 출력 (산출물)

`projects/<slug>/04-prototype-mvp/` 전체:

```
04-prototype-mvp/
├── pages/
│   ├── UI-Header_Footer-00.html
│   ├── UI-Login-01.html
│   └── UI-{명칭}-{NN}.html
├── assets/{tokens, css, js}/
└── README.md
```

## 출력 경로

- `projects/<slug>/04-prototype-mvp/` (고정, 덮어쓰기 금지)
- 파일명 = UI ID (M9 §1-2-2 갱신)

## 완료 보고 형식 (CLAUDE.md §11 4블록)

```
[퍼블리셔] 완료
- 산출물: projects/<slug>/04-prototype-mvp/ (UI-{명칭}-{NN} N건 매핑, NA N건)
- 자가 점검: N/7 (자동 실패 0/3)
- 오픈 이슈: N건 (담당자·기한)
- 다음 권장: 노션관리자 호출 (PM 명시)
```

## 영역 침범 금지 (CLAUDE.md §6·§9)

- ❌ **P-NNN 사용** — M16 폐기 (PI-019 A1). UI ID 단일 사용
- ❌ **파일명 ID 미포함** (M9 §1-2-2 구 정책) — M16 갱신: 파일명 = UI ID 강제
- ❌ **HTML 상단 주석 SSoT 누락** — 자동 실패
- ❌ **README NA 형식 위반** — 자동 실패
- ❌ **화면 가감 결정** — UX 영역. 03-ux-spec §1 화면 목록 1:1 매핑
- ❌ **비주얼 디자인 시안 결정** — UX·디자이너 영역
- ❌ **PRD §0 PM 원본 변환·삭제** — service-planner 영역
- ❌ **선행 산출물(01·02·03) 수정** — 영역 침범
- ❌ **UX 명시 없음 자율 결정** — reply 의무 (격차 4·5 회귀 방지)
- ❌ **묶음 broadcast** — 부분 broadcast 연속 흐름 (§4-0 (ii))
- ❌ **노션 MCP 직접 호출** — 노션관리자 경유

## 참조 파일

- `template.md` — 04-prototype-mvp/ 골격 + UI ID 파일명 + HTML 상단 주석
- `checklist.md` — 7항목 + 8필드 + 자동 실패 조건
- `CLAUDE.md` §4-0 — Mesh 본질 5요소
- `CLAUDE.md` §6-2 — 선행 산출물 *완성* 사용 게이트
- `CLAUDE.md` §9 — 안티 패턴

## 변경 이력

- (2026-05-07) **M16 진입** — P-NNN 폐기 (PI-019 A1) + UI ID 단일 사용 + REQ 4 segment 매핑 + 파일명 UI ID 기반 (M9 §1-2-2 갱신) + 격차 5 시작점 multi-hop 시나리오 통합 (M15 B-5). PI-001~PI-019 정합.
- (이전) M9·M13 — P-NNN + slug 파일명 + 3자리 REQ (M16에서 폐기).
