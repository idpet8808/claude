# M15 — Mesh 본질 정정 (워터폴 회귀 근본 정정 설계)

> ⚠️ **아카이브 상태 (2026-05-07)** — M16 진입에 따라 본 design 문서는 `_design/_archive/M15/`로 이동. PM 본질 지적 ("전면 수정 + 본질 정합 하네스 구조 설계")으로 M15 자체도 본질 재설계 대상에 포함. M16 [3] 대조 단계에서 정합/부정합 검증 후 처리 예정.
>
> **적용분 추적**: M15 Group A 적용분(CLAUDE.md §4-0 + §4 본문 + §6 + §10 + §11)은 commit `8978063` 시점부터 *현행 코드* 그대로 보존. M15 Group B 진행 중 보류분(`.claude/commands/kickoff.md` 재작성 / `.claude/agents/{5개}.md` 보강 / `.claude/skills/prd-draft/SKILL.md` 보강)도 현행 코드 보존. M16 [3] 대조 단계에서 정합 검증 후 보존/갱신/폐기 결정.
>
> **M16 진입 design doc**: `_design/M16_essence-redesign-brainstorming.md` (2026-05-07 작성)
>
> ---
>
> 본 spec은 **하네스 자체 변경 SSoT**이다. M14 (d) 4중 신뢰성 보장 한계 발견 + 본 세션 멘사 v2 /kickoff 1회차 격차 5건 누적 → 헌법 §4·§6·§11 보강 + /kickoff Slash 전면 재작성 + 5 에이전트 정의 보강 + 6 Skill 절차 보강 + settings.json hook 신설 + M14 (d) 5차 보장 추가.

---

## 1. 배경

### 1.1 M14 (d) 4중 신뢰성 보장 신설 (2026-05-06)

본 세션 직전 M14에서 §4 워터폴화 회귀 패턴 방지를 위해 4중 보장 신설:

| 차 | 메커니즘 | 위치 | 발화 시점 |
|---|---|---|---|
| 1차 | 도구 인지 사전 검증 | CLAUDE.md §6-6 | spawn 시점 |
| 2차 | PM 지적 시 헌법 재인용 우선 (도구 변명 금지) | CLAUDE.md §10 | 헌법 변경 권장 시점 |
| 3차 | 헌법 변경 권장 4블록 형식 | CLAUDE.md §11 | 헌법 변경 권장 시점 |
| 4차 | settings.json PreToolUse hook (CLAUDE.md/AGENTS.md 수정 시 NOTICE) | settings.json | 헌법 파일 수정 시점 |

### 1.2 본 세션 멘사 v2 /kickoff 1회차 — 격차 5건 누적 발견

M14 (d) 4중 보장이 *spawn 시점·헌법 변경 시점·헌법 파일 수정 시점*에 한정 발화되어, **시각화·보고·진단·옵션·sub-step 진행 시점에는 미작동**. 본 세션 1회차 멘사 v2 /kickoff 진행 중 §4 정의 위배 5건 누적:

| # | §4 정의 | 본 세션 운영 | 발견 시점 |
|---|---|---|---|
| 1 | 4명 동시 draft Task 생성 + 4명 동시 spawn | TaskCreate 4건 + Agent spawn 1명만 | PM 1차 지적 |
| 2 | 부분 broadcast = 연속 흐름 (부분 확정 사건마다) | 묶음 broadcast 1회 (PRD 완성 시점에 WHY+1차 사용자+Must 5개 한 번에) | PM 2차 지적 |
| 3 | 자가점검 = 완성 검증 (후행 진입 트리거 X) | 자가점검을 후행 진입 게이트로 사고 ("자가점검 통과 게이트로만 적용"이라는 표현) | PM 3차 지적 |
| 4 | 양방향 reply = 후행이 선행 모순·누락 발견 시 reply 의무 | 후행이 명시 없는 항목을 자율 결정 (예: 기술검토자가 PRD에 언어 명시 없는데 Next.js 15 자율 결정) | PM 4차 지적 |
| 5 | 연쇄 reply = 그래프 (multi-hop, peer-to-peer, 모든 영역 병렬·유기) | 1대1 1-hop reply로 사고 ("발견자 → 선행 owner" 단순 모델) | PM 5차 지적 |

### 1.3 PM 지시 (2026-05-06)

> "전면 구조 설계를 다시 하더라도 의도대로 수정"

→ 본 sub-step = **M15 (별도 milestone)** 신설. 헌법·Skill·Slash·hook·settings 전반 정정.

### 1.4 멘사 처리 결정 (2026-05-06)

> 멘사 v2 전부 아카이브 + v3 슬러그로 백지 재진행 (M15 정의 검증)

---

## 2. 격차 5건 명시화 (PM과 합의 완료)

### 2.1 격차 1 — 4명 동시 spawn 미작동

**§4 [2] 정의**: "Mesh 분해 — 4명 *동시* draft Task 생성: 서비스기획자 / 기술검토자 / UX기획자 / 퍼블리셔. ※ draft = STATE.md 미기록"

**현재 /kickoff Slash command**: TaskCreate 4건은 동시 생성하나 Agent spawn은 [2]에서 서비스기획자 1명만 → [3]에서 기술검토자 → [4] UX기획자 → [5] 퍼블리셔 순차 호출.

**근본 원인**: /kickoff Slash command 자체가 §4를 *워터폴 다운그레이드*해서 운영하도록 정의됨.

### 2.2 격차 2 — 부분 broadcast = 연속 흐름인데 묶음 broadcast 1회로 운영

**§4 broadcast 원칙 정의**: "부분 broadcast 허용: 선행 영역이 *일부 확정* → 후행 영역 부분 진행 시작 가능 (산출물 완성 대기 X)"

**부분 broadcast의 본질**: 부분 확정 사건이 *여러 번 발생* (WHY 확정 / 1차 사용자 확정 / Must 1개 확정 / Must 2개 확정 / ... / 기능 1개 확정). 매 사건마다 broadcast 발행.

**현재 운영**: 서비스기획자가 PRD 완성 시점에 *묶음 broadcast 1회* (WHY+1차 사용자+Must 5개 한 번에). 이는 *완성 broadcast*이지 *부분 broadcast*가 아님.

### 2.3 격차 3 — 자가점검을 후행 진입 트리거로 오용 (게이트 모델)

**§4·§6 자가점검 정의**: 자가점검은 *자기 산출물 완성 검증* (M11 v1 8필드). 산출물별 1회 (수정 시 재발동).

**§6 후행 진입 조건**: "기술검토자: 01-prd.md 존재 + PRD 자가 점검 ≥ 5/7" — 이건 *완성된 PRD를 사용하는 시점* 게이트이지 *후행 영역 spawn/진입* 게이트가 아님.

**현재 사고**: "자가점검 통과 게이트로 후행 진입" → *후행 영역이 진입할 때 선행 영역의 자가점검을 기다림* → 워터폴.

**올바른 모델**: 후행 영역은 *부분 broadcast마다* 즉시 진행. 자가점검은 *완성 산출물의 검증 도장*. 자가점검 통과 = 산출물 완성 신호이지 후행 게이트 트리거가 아님.

### 2.4 격차 4 — 양방향 reply 미가동 (자율 결정 우회)

**§4 양방향 reply 정의**: "후행 영역이 발견한 모순·누락 → 선행 영역 reply → 자가 점검 재발동"

**예시 시나리오**: 기술검토자가 PRD에 *프론트엔드 언어 명시 없음* 발견 → 서비스기획자에 reply (또는 PM 확인 경유) → 서비스기획자 자가점검 재발동 → PRD 보강 → broadcast 재발행 → 기술검토자 보강 영역 진행 재개.

**현재 운영**: 후행 영역이 모순·누락 발견 시 *자율 결정으로 우회*. 본 세션 멘사 v2:
- PRD에 프론트엔드 언어 명시 X → 기술검토자가 Next.js 15 *자율 결정*
- PRD에 백엔드 언어 명시 X → 기술검토자가 Supabase *자율 결정*
- PRD에 호스팅 환경 명시 X → 기술검토자가 Vercel *자율 결정*
- 양방향 reply 발행 0건. 서비스기획자 자가점검 재발동 0건.

→ §4 양방향 reply 운영 미가동 = 자율 결정으로 §6 영역 침범 발생 (기술검토자가 PRD 영역에 영향).

### 2.5 격차 5 — 연쇄 reply 미인지 (1대1 1-hop 사고)

**§4 Mesh 정의**: 4명이 *그래프* 구조로 연결. reply는 *peer-to-peer* + *multi-hop* + *모든 영역 병렬·유기*.

**연쇄 reply 시나리오** (PM 예시):
```
퍼블리셔: index.html 작성 중
  → UX 구조 없음 발견
  → SendMessage(ux-planner): "S-001 본문 영역 그리드 사양 누락"
        ↓
UX기획자: reply 받아 03-ux-spec.md 확인
  → PRD §4 Must 정의 모호 발견
  → SendMessage(service-planner): "REQ-003 랭킹 표시 N값 미정"
        ↓
서비스기획자: reply 받아 PRD 자가점검 재발동
  → PM 확인 또는 추정값 보강
  → broadcast(전체): "REQ-003 N=Top 10 확정"
        ↓
UX기획자: broadcast 받아 03 보강
  → broadcast(P): "S-001 그리드 사양 확정"
        ↓
퍼블리셔: broadcast 받아 index.html 진행 재개
```

이 모든 흐름이 *동시·병렬*. 다른 영역(예: 기술검토자)은 자기 일 진행 계속.

**현재 사고**: reply를 *1대1 1-hop*으로만 정의 ("발견자 → 선행 owner SendMessage"). multi-hop·그래프·병렬 본질 미인지.

---

## 3. 근본 원인 — 팀장 controller §4 Mesh 본질 인지 모델 부재

격차 5건 모두 같은 뿌리:

### 3.1 게이트 모델 ⇄ Mesh 모델 차이

| 항목 | 게이트 모델 (잘못) | Mesh 모델 (§4 정의) |
|------|-------------------|--------------------|
| 진입 | 선행 산출물 완성 + 자가점검 통과 → 후행 진입 | 4명 동시 진입 (시작점). 작업은 broadcast/reply 흐름으로 자체 진행 |
| broadcast | 산출물 완성 시 1회 발행 | 부분 확정 사건마다 연속 발행 |
| reply | 후행 → 선행 1대1 (1-hop) | 임의 영역 ↔ 임의 영역 peer-to-peer (multi-hop, 그래프) |
| 자가점검 | 후행 진입 트리거 게이트 | 산출물 완성 검증 도장 |
| 진행 | 순차 (의존성 = 워터폴) | 병렬·유기 (의존성 = *완성 시점* 자연 순서) |

### 3.2 §4 Mesh 본질 5요소 (M15에서 명시화)

| # | 요소 | 정의 | 적용 시점 |
|---|---|---|---|
| (i) | **4명 동시 spawn** | 페이즈 1 진입 시점에 4 Teammate 동시 활성화 (시작점) | /kickoff [2] |
| (ii) | **부분 broadcast = 연속 흐름** | 부분 확정 사건마다 즉시 broadcast 발행 (묶음 X) | 작업 진행 중 매 부분 확정 |
| (iii) | **양방향 reply = 그래프** | 임의 영역 ↔ 임의 영역 peer-to-peer + multi-hop. 자율 결정 우회 금지 | 모순·누락 발견 시점 |
| (iv) | **자가점검 = 완성 검증** | 산출물 완성 시 1회 (수정 시 재발동). 후행 진입 게이트 아님 | 산출물 완성·수정 시점 |
| (v) | **모든 영역 병렬·유기** | 각 영역은 자기 일 진행 계속. reply 흐름과 무관한 작업 멈춤 X | 항상 |

### 3.3 인지 모델 격차의 시점별 발현

| 시점 | 격차 발현 |
|---|---|
| spawn | 격차 1 (4명 동시 spawn 미작동) |
| 작업 중 부분 확정 | 격차 2 (묶음 broadcast로 다운그레이드) |
| 시각화·보고 | 격차 3 (게이트 모델 표현) |
| 모순·누락 발견 | 격차 4 (자율 결정 우회) |
| reply 정의 | 격차 5 (1대1 1-hop 사고) |

→ 격차는 *모든 시점*에 발현 가능. M14 (d) 4중 보장 = spawn·헌법 시점만 커버 → **모든 시점 커버하는 5차 보장 필요**.

---

## 4. 정정 설계

### 4.1 헌법 §4 보강 (Mesh 본질 5요소 명시)

**현재 §4** (요약):
- [1] 슬러그·STATE 초기화
- [2] Mesh 분해 — 4명 동시 draft Task 생성
- [3] 팀장 confirm
- [4] 정식 산출물 작성 (의존성 순서 + 부분 broadcast + 양방향 reply)
- broadcast 원칙: 부분 broadcast / 양방향 reply
- 병렬 허용

**M15 보강안**:

#### 4.1.1 §4 본문 Mesh 본질 5요소 명시 박스 신설

§4 첫 단락 직후에 신설:

```markdown
### 4-0. Mesh 본질 5요소 (운영 표준)

본 §4 워크플로의 5요소는 모든 시점·모든 영역·모든 도구에 적용된다. 위배 시 §11 4블록 형식 자체 검증 + Codex Gate C advisory 발동.

| # | 요소 | 정의 |
|---|---|---|
| (i) | **4명 동시 spawn** | TeamCreate + TaskCreate 4건 + Agent spawn 4명을 [2] 시점에 동시 실행. 후행 spawn 단계 폐지 |
| (ii) | **부분 broadcast = 연속 흐름** | 부분 확정 사건(WHY/페르소나/Must 1개/기능 1개 등)마다 즉시 broadcast 발행. 묶음 broadcast 금지 |
| (iii) | **양방향 reply = 그래프** | 임의 영역 ↔ 임의 영역 SendMessage peer-to-peer + multi-hop. 후행이 선행 모순·누락 발견 시 *자율 결정 금지* — reply 의무 |
| (iv) | **자가점검 = 완성 검증** | 산출물 완성·수정 시 1회. 후행 영역 진입 게이트 아님. 후행은 부분 broadcast마다 즉시 진행 |
| (v) | **모든 영역 병렬·유기** | 각 영역은 자기 일 진행 계속. reply 흐름과 무관한 작업 멈춤 X. 진행 상황 표에 "대기" 컬럼 사용 금지 |

위 5요소가 §4 정의 본질이며, 격차 발생 시 본 5요소를 기준으로 자기 검증한다.
```

#### 4.1.2 §4 [2] Mesh 분해 단계 본문 강화

**현재**:
```
[2] Mesh 분해 — 4명 동시 draft Task 생성:
   서비스기획자 / 기술검토자 / UX기획자 / 퍼블리셔
   ※ draft = STATE.md 미기록 (정식 산출물 아님)
```

**M15**:
```
[2] Mesh 분해 — TeamCreate + 4명 동시 spawn (§4-0 (i) 정합):
   - TeamCreate <slug>
   - TaskCreate 4건 (각 영역 draft Task)
   - Agent spawn 4명 동시 (서비스기획자 / 기술검토자 / UX기획자 / 퍼블리셔)
   ※ 4명은 동시 시작점. 후행 spawn 단계 폐지
   ※ draft = STATE.md 미기록 (정식 산출물 진입 게이트는 [3] 팀장 confirm)
```

#### 4.1.3 §4 [3]·[4] 통합 — 단계 분리 폐지

**현재**: [3] 팀장 confirm → [4] 정식 산출물 작성 (의존성 순서)

**M15**:
```
[3] 팀장 confirm — 4 draft Task 통합 검토 + 정식 산출물 진입 신호
   - 표준 4종 매핑 정합 / 의존성 자연 순서 정합 / 부분 broadcast 트리거 카탈로그 정합 확인
   - confirm 통과 시 4 Teammate에 broadcast(start_signal)
   ※ 후행 spawn 게이트가 아님 (이미 [2]에서 spawn 완료)

[4] 정식 산출물 진행 (병렬 + Mesh 5요소)
   - 4 Teammate가 자기 영역 산출물 작성 (병렬·유기 진행)
   - 부분 broadcast 연속 흐름 (§4-0 (ii)) — 부분 확정 사건마다 즉시 발행
   - 양방향 reply (§4-0 (iii)) — peer-to-peer multi-hop, 자율 결정 금지
   - 자가점검 (§4-0 (iv)) — 각 산출물 완성 시점 1회 (수정 시 재발동)
   - 모든 영역 병렬·유기 (§4-0 (v)) — reply 흐름과 무관한 작업 진행 계속
   - 의존성 순서: 산출물 *완성 시점*에 자연 순서 (PRD → Tech → UX → MVP). 진행은 동시
```

#### 4.1.4 §4 broadcast 트리거 카탈로그 (영역별)

`_design/M9_deliverable-structure.md` 또는 `_broadcast.log` 양식에 추가:

```markdown
### Broadcast 트리거 카탈로그 (영역별)

| Owner | 트리거 사건 | broadcast 대상 |
|-------|------------|---------------|
| REQ (서비스기획자) | WHY 확정 | 전체 (TR/S/P) |
|  | 1차 사용자 확정 | 전체 |
|  | 성공 지표 확정 | 전체 |
|  | Must 1개 확정 (REQ-NNN) | 전체 |
|  | Should/Could/Won't 확정 | 전체 |
|  | 시나리오 확정 | TR/S |
| TR (기술검토자) | 외부 의존성 후보 1차 | S/P |
|  | 기술 스택 1개 확정 | S/P |
|  | 공수 1차 시나리오 | REQ |
|  | Must 1개 기술 가능성 평가 | REQ/S |
| S (UX기획자) | 화면 1개 후보 | P |
|  | 화면 1개 4상태 확정 | P |
|  | S 확정 (모든 화면) | P |
|  | 빈/에러/로딩 자동 실패 발견 | REQ/TR |
| P (퍼블리셔) | assets 토큰 1개 확정 | (선행 영역 무관) |
|  | P-NNN 발급 | S |
|  | NA 발견 (REQ ↔ S ↔ P 매핑 누락) | REQ/S |

각 트리거는 즉시 발행. 묶음 발행 금지.
```

#### 4.1.5 §4 reply 정의 — peer-to-peer + multi-hop

§4 broadcast 원칙 단락 갱신:

```markdown
### broadcast 원칙 (M15 보강)

- **부분 broadcast 허용**: 부분 확정 사건마다 즉시 발행 (§4-0 (ii) + 트리거 카탈로그)
- **양방향 reply**: peer-to-peer + multi-hop. 임의 영역(서비스/기술/UX/퍼블) ↔ 임의 영역. 자율 결정 우회 금지 (§4-0 (iii))
  - 발견 시점: 후행이 선행 산출물에서 명시 없음 / 모순 / 누락 발견
  - 의무: 자율 결정 금지. SendMessage(선행 owner)로 reply 발행
  - 효과: 선행 owner 자가점검 재발동 (M11) → 보강 → broadcast 재발행
  - 연쇄: reply 받은 영역도 또 다른 영역에 reply 가능 (multi-hop)
- **broadcast 로그**: `_broadcast.log` (회전 정책 v1.1 — `_FOLLOWUP.md` ③)
```

### 4.2 헌법 §6 보강

#### 4.2.1 영역 침범 금지 + 영역 협업 의무 신설

**현재 §6-4**: "영역 침범 금지" — 자기 영역만 작업

**M15 보강**:

```markdown
4. **영역 침범 금지 + 영역 협업 의무 (Mesh 본질 §4-0 (iii))**:
   - 침범 금지 (그대로 유지):
     - 서비스기획자: UX 세부 결정·기술 스택 결정 금지
     - 기술검토자: 제품 기능 범위 축소/확장 금지
     - UX기획자: 기술 스택 선정·비주얼 시안 생성 금지
     - 퍼블리셔: 화면 가감 결정 금지 / 비주얼 디자인 시안 결정 금지
     - 노션관리자: 산출물 내용 편집 금지
   - **협업 의무 (M15 신설)**:
     - 후행 영역이 선행 산출물에서 *명시 없음 / 모순 / 누락* 발견 시 **자율 결정 금지** — reply 발행 의무
     - reply 경로: SendMessage(선행 owner) peer-to-peer. controller 경유 PM 확인 우회 가능 (§10 ask 권한 한계 시)
     - reply 받은 owner는 자가점검 재발동 (M11) + 보강 + broadcast
     - 모든 영역의 산출물 파일 직접 수정 금지 (reply만 발행)
```

#### 4.2.2 후행 진입 게이트 → 산출물 사용 게이트로 표현 변경

**현재 §6-2**: "선행 산출물 필수 — 기술검토자: 01-prd.md 존재 + PRD 자가 점검 ≥ 5/7"

**M15**:

```markdown
2. **선행 산출물 *완성* 사용 게이트** (§4-0 (iv) 정합):
   - 기술검토자가 PRD를 *완성된 산출물로 사용*하는 시점: PRD 자가점검 ≥ 5/7
   - UX기획자가 PRD/Tech를 *완성된 산출물로 사용*하는 시점: 각 자가점검 통과
   - 퍼블리셔가 03을 *완성된 산출물로 사용*하는 시점: 03 자가점검 + S 확정 broadcast
   - **단 부분 broadcast/reply 흐름은 게이트 무관**. 4 Teammate는 [2] spawn 시점부터 진행. 부분 broadcast마다 후행이 부분 진행 가능
   - 자가점검 미통과 산출물은 *완성 산출물로 사용 거부*. 단 후행 영역의 *진입* 거부가 아님 (Mesh 모델)
```

(표현 변경: "선행 산출물 필수" / "후행 진입 거부" → "산출물 완성 사용 게이트" / "완성 산출물 사용 거부")

### 4.3 헌법 §11 보강

#### 4.3.1 진행 상황 표 양식 표준화

§11 표준 출력 포맷에 신설:

```markdown
### 진행 상황 표 양식 (§4-0 (v) 정합)

팀장 → 사용자 진행 상황 표 작성 시 *반드시* 다음 양식 적용:

| Teammate | 상태 | 자가점검 | broadcast/reply 활동 | 비고 |
|----------|------|---------|--------------------|------|
| (영역) | 진행 중 / 부분 진행 / 완성 / 보류 | (있으면 N/M) | 발행/수신 카운트 | (텍스트) |

상태 정의:
- **진행 중**: 자기 영역 작업 활성화 (broadcast/reply 흐름 활성화)
- **부분 진행**: 일부 영역만 부분 작업 (예: 퍼블리셔 assets만)
- **완성**: 자가점검 통과 (수정 시 *진행 중* 회귀)
- **보류**: PM 명시 정지 또는 차단

**금지 컬럼/표현**:
- "대기" 컬럼 (워터폴 시각)
- "선행 완료 후 진입" 표현 (§4-0 (iv) 위배)
- "후행 진입 게이트" 표현 (§4-0 (iv) 위배)
```

#### 4.3.2 헌법 변경 4블록 형식 적용 시점 확장

§11 "헌법 변경 권장 시 4블록 고정" 단락 갱신:

```markdown
### 헌법 변경 권장 시 4블록 고정 (M15 적용 시점 확장)

본 4블록 형식은 다음 모든 시점에 적용:
- 헌법 변경 권장 시점 (M14 기존)
- 진행 상황 시각화·표 작성 시점 (M15)
- 옵션 제시 시점 (M15)
- 진단·옵션 평가 시점 (M15)
- spawn·broadcast·reply 운영 시점 (M15)

```
1. 원 § 정의 인용 (변경 대상 본문)
2. 변경 부분 (어디를 어떻게)
3. 정당성 1줄 (왜 — 도구 한계 변명 금지)
4. PM 명시 승인 요청 (자의적 적용 금지)
```

위 4블록 누락 시 PM 즉시 지적 권한 행사. 팀장 자체 검증으로도 적용.
```

### 4.4 /kickoff Slash command 전면 재작성

**현재 `.claude/commands/kickoff.md`** (요약):
```
[1] 슬러그·STATE 초기화
[2] 서비스기획자 호출
[3] 기술검토자 호출 — 전제: PRD §A 6/7
[4] UX기획자 호출 — 전제: 01·02 모두
[5] 퍼블리셔 호출 — 전제: 01·02·03 모두
[6] 노션관리자 호출
[7] 사용자 보고
```

**M15 신규**:

```markdown
# /kickoff — 신규 프로젝트 착수 (M15 Mesh 모델)

신규 프로젝트 1건을 §4 Mesh 5요소 정합으로 착수. 4명 동시 spawn + 부분 broadcast 연속 흐름 + 양방향 reply multi-hop + 자가점검 완성 검증 + 모든 영역 병렬·유기.

## 인자
- $1: 고객사명 (필수)
- $2: 프로젝트명 (필수)
- $3: PM (선택)

## 절차

### [1] 슬러그·STATE 초기화

(M14 기존 절차 그대로)

1. 슬러그 생성 (영문 소문자 + 하이픈)
2. `projects/<slug>/` 디렉토리 생성
3. `projects/<slug>/STATE.md` 초기화 (CLAUDE.md §5 필수 필드)
4. `projects/_INDEX.md` 갱신

### [2] Mesh 분해 — TeamCreate + 4명 동시 spawn (§4-0 (i))

1. **TeamCreate** `<slug>` (Agent Teams 활성화)
2. **TaskCreate 4건 동시** — 4 영역 draft Task
3. **Agent spawn 4명 동시 (병렬)**:
   - 서비스기획자 (subagent_type=서비스기획자, team_name=<slug>, name=service-planner)
   - 기술검토자 (subagent_type=기술검토자, team_name=<slug>, name=tech-reviewer)
   - UX기획자 (subagent_type=UX기획자, team_name=<slug>, name=ux-planner)
   - 퍼블리셔 (subagent_type=퍼블리셔, team_name=<slug>, name=publisher)
   - 4 Agent 호출은 *한 메시지 내 4 도구 호출* parallel 실행
   - 각 Agent prompt에 §4-0 5요소 + 자기 영역 작업 절차 명시
4. **PM 비즈니스 배경 입력** — 서비스기획자에 SendMessage로 전달 (또는 PM 자율 인터뷰 — service-planner가 AskUserQuestion 발화)

※ 후행 spawn 단계 [3]~[5] 폐지 (§4-0 (i) 정합)

### [3] 팀장 confirm — 정식 산출물 진입 신호

1. 4 Teammate spawn 완료 + draft Task 생성 확인
2. 표준 4종 매핑·의존성 자연 순서·broadcast 트리거 카탈로그 정합 확인
3. confirm 통과 시 4 Teammate에 broadcast(start_signal) 발행
   - "정식 산출물 작성 진입. §4-0 5요소 적용. 자가점검 = 완성 검증 한정"

※ 후행 진입 게이트 아님 (이미 [2]에서 4명 spawn)

### [4] 병렬 진행 — Mesh 흐름 (§4-0 (ii)~(v))

1. 4 Teammate가 자기 영역 산출물 작성 (병렬)
2. **부분 broadcast 연속 흐름** (§4-0 (ii)):
   - 각 Teammate는 broadcast 트리거 카탈로그(§4-1.4) 참조
   - 부분 확정 사건마다 SendMessage(전체) 또는 `_broadcast.log` 기록
   - 묶음 broadcast 금지
3. **양방향 reply multi-hop** (§4-0 (iii)):
   - 후행 영역이 선행 산출물에서 모순·누락 발견 시 자율 결정 금지
   - SendMessage(선행 owner) reply 발행 의무
   - 선행 owner는 자가점검 재발동 (M11) + 보강 + broadcast 재발행
   - 연쇄 reply (multi-hop) 가능
4. **자가점검 = 완성 검증** (§4-0 (iv)):
   - 각 Teammate는 자기 산출물 *완성 시점* 자가점검 1회
   - 수정 시 재발동
   - 후행 영역 진입 트리거 X
5. **모든 영역 병렬·유기** (§4-0 (v)):
   - 각 Teammate는 자기 일 계속
   - reply 흐름과 무관한 작업 멈춤 X

팀장 controller 역할:
- 진행 상황 표 §11 양식 적용 (대기 컬럼 금지)
- broadcast/reply 흐름 모니터링 (`_broadcast.log` 추적)
- 자가점검 결과 수집 (각 산출물 완성 시점)
- PM 보고 (4 산출물 모두 완성 + 자가점검 통과 시점 1회)

### [5] 노션관리자 호출 (PM 명시)

(M14 기존 절차 그대로)

1. 4 산출물 모두 완성 + 자가점검 통과 확인
2. PM 명시 호출 시점에 노션관리자 spawn (Agent 직접 호출, Teammate 외)
3. notion-sync Skill 실행

### [6] 사용자 보고 (§11 4블록)

(M14 기존 절차 그대로)

```
[팀장] 신규 프로젝트 착수 완료
- 산출물: projects/<slug>/{01-prd.md, 02-tech-review.md, 03-ux-spec.md, 04-prototype-mvp/}
- 자가 점검 요약: PRD N/7 / Tech N/5 / UX N/4 / P N/7
- 오픈 이슈: N건
- 다음 권장: 노션 페이지 확인 / 페이즈 2 진입 시점 PM 결정
```

## 게이트 (M15)

| 게이트 | 시점 | 조건 | 미달 시 |
|--------|------|------|--------|
| [2] Mesh 분해 | 4명 동시 spawn 완료 | TeamCreate + TaskCreate 4건 + Agent spawn 4명 모두 성공 | spawn 실패 시 재시도 또는 PM 보고 |
| [3] 팀장 confirm | 정식 산출물 진입 신호 | 4 draft Task + 매핑·트리거 정합 확인 | confirm 미통과 시 spawn 1회 재시도 |
| [4] 병렬 진행 | 4 산출물 완성 자가점검 | 각 산출물 자가점검 통과 + broadcast/reply 흐름 정상 | 자가점검 미통과 시 재발동 (M11) |
| [5] 노션관리자 | PM 명시 호출 | 4 산출물 완성 + PM 결정 | PM 보류 시 [5] 생략 |

## 중단 조건

(M14 기존)

## 주의

- **§4-0 5요소 위반 시 §11 4블록 자체 검증 + Codex Gate C advisory 발동**
- 진행 상황 표는 §11 양식 적용 (대기 컬럼 금지)
- 본 Slash command 변경 시 Gate C 발동 대상 (CLAUDE.md §13)
```

### 4.5 5 에이전트 정의 보강 (서비스기획자/기술검토자/UX기획자/퍼블리셔/노션관리자)

각 `.claude/agents/<agent>.md`에 다음 절차 보강:

#### 4.5.1 §1 입력 컨텍스트 — first-read 추가

```markdown
**반드시 읽어야 할 파일** (first read):
- (기존 항목 그대로)
- 새로 추가: `projects/<slug>/_broadcast.log` (broadcast/reply 흐름 추적)
- 새로 추가: 다른 영역 산출물 — *부분 진행 가능 시점 확인*
```

#### 4.5.2 §2 작업 절차 — Mesh 본질 5요소 명시

```markdown
**Mesh 분해 단계** (§4-0):
- /kickoff [2] 시점에 동시 spawn (4명 동시 시작점)
- 자기 영역 sub-task draft 생성 → 팀장 confirm 대기

**부분 broadcast 발행 시점** (§4-0 (ii) + broadcast 트리거 카탈로그):
- 부분 확정 사건마다 *즉시* 발행 (묶음 X)
- 영역별 트리거 카탈로그 참조

**양방향 reply** (§4-0 (iii)):
- 발견 시점: 선행 산출물 모순·누락 / 다른 영역 broadcast 받은 후 자기 영역 모순 발견
- 의무: 자율 결정 금지 — SendMessage(선행/peer owner) reply 발행
- 연쇄: reply 받은 영역도 또 다른 영역에 reply 가능 (multi-hop)
- 수신 시 처리: 자가점검 재발동 (M11) + 보강 + broadcast 재발행

**자가점검** (§4-0 (iv)):
- 자기 산출물 *완성 시점* 1회 (수정 시 재발동)
- 후행 영역 진입 트리거 X
- 8필드 형식 (M11 v1) — `_broadcast.log` 기록

**모든 영역 병렬·유기** (§4-0 (v)):
- reply 흐름 처리는 자기 작업과 *병렬* (자기 일 계속)
- reply 의존 부분만 플레이스홀더 마킹 + 보류
```

#### 4.5.3 §7 안티 패턴 보강

각 에이전트 정의 §7에 신설:

```markdown
- ❌ **묶음 broadcast** — 부분 확정 사건마다 즉시 발행 (§4-0 (ii))
- ❌ **자율 결정 우회** — 선행 산출물 모순·누락 발견 시 자율 결정 금지, reply 의무 (§4-0 (iii))
- ❌ **자가점검을 후행 진입 게이트로 사고** — 자가점검 = 완성 검증 한정 (§4-0 (iv))
- ❌ **reply 받고 자기 일 멈춤** — reply 처리는 병렬·유기 (§4-0 (v))
```

### 4.6 6 Skill 절차 보강 (kickoff/prd-draft/tech-review/ux-spec/publisher-html/notion-sync)

#### 4.6.1 kickoff Skill

§4.4 /kickoff Slash command 변경에 정합 (4명 동시 spawn 명시).

#### 4.6.2 prd-draft / tech-review / ux-spec / publisher-html

각 Skill SKILL.md (또는 정의 파일)에:
- broadcast 트리거 카탈로그 영역별 항목 명시 (§4.1.4)
- 자가점검 단계에 "완성 검증 한정 — 후행 진입 게이트 X" 명시
- reply 의무 단계 추가 (선행 산출물 모순·누락 발견 시 SendMessage)

#### 4.6.3 notion-sync Skill

§4.5 노션관리자 보강에 정합 (페이즈 1 종료 시점 1회 — 변경 없음).

### 4.7 settings.json hook 신설

#### 4.7.1 PreToolUse hook — Agent spawn 시 4명 미만 NOTICE

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "match": "Agent",
        "command": "node .claude/hooks/check-mesh-spawn.js",
        "description": "Mesh 5요소 (i) — Agent spawn 시 한 메시지 내 4 도구 호출 확인. 1명 spawn 시 NOTICE"
      }
    ]
  }
}
```

`check-mesh-spawn.js` 로직:
- 한 메시지 내 Agent 도구 호출 카운트
- TeamCreate 직후 1 메시지 내 Agent 호출이 4명 미만 + team_name 있음 → NOTICE
- "§4-0 (i) — 4명 동시 spawn 미작동 의심. 추가 Agent 호출 필요"

#### 4.7.2 PostToolUse hook (선택) — broadcast 후 idle 1분 초과 NOTICE

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "match": "SendMessage",
        "command": "node .claude/hooks/check-broadcast-idle.js",
        "description": "broadcast 발행 후 후행 영역 idle 1분 초과 시 NOTICE"
      }
    ]
  }
}
```

`check-broadcast-idle.js` 로직:
- SendMessage 메시지 내용에 broadcast 마커 포함 시
- 1분 후 후행 영역 task status 확인
- 진행 변화 없으면 NOTICE — "§4-0 (ii)·(v) — 부분 broadcast 후 후행 진행 미발현"

(7.2는 v1.1+ 이관 후보 — 본 M15에는 7.1만 신설)

### 4.8 M14 (d) 4중 보장 → 5차 신설

CLAUDE.md §10 또는 §11에 5차 보장 추가:

```markdown
### M15 (d) 5차 신뢰성 보장 — Mesh 본질 자기 검증

| 차 | 메커니즘 | 위치 | 발화 시점 |
|---|---|---|---|
| 1차 | 도구 인지 사전 검증 (M14) | CLAUDE.md §6-6 | spawn 시점 |
| 2차 | PM 지적 시 헌법 재인용 (M14) | CLAUDE.md §10 | 헌법 변경 권장 시점 |
| 3차 | 헌법 변경 4블록 형식 (M14) | CLAUDE.md §11 | 헌법 변경 권장 시점 |
| 4차 | settings.json PreToolUse NOTICE (M14) | settings.json | 헌법 파일 수정 시점 |
| **5차** | **Mesh 본질 5요소 자기 검증 (M15)** | CLAUDE.md §4-0 + §11 양식 + §10 절대 규칙 | **모든 시점** (spawn / 작업 / 시각화 / 보고 / 진단 / 옵션 / 표 / reply / broadcast) |

5차 보장 발화 절차:
- 모든 시점에 §4-0 5요소를 자기 검증
- 위배 발견 시 §11 4블록 자체 검증 → PM 확인 → Codex Gate C advisory
- 시각화·보고 시점에 "대기" / "선행 완료 후 진입" / "게이트 통과 후 후행" 등 표현 사용 즉시 자기 검증
```

---

## 5. 정정 적용 영향

### 5.1 멘사 v2 처리 (PM 결정)

- `projects/mensa-ranking-challenge-v2/`를 `_archive/v2/`로 이동
- `projects/_INDEX.md`에서 v2 행 제거 또는 아카이브 표시
- v3 슬러그 `mensa-ranking-challenge-v3` 신규 /kickoff (M15 정의 적용 검증)

### 5.2 운영 시행착오 등록 (`_FOLLOWUP.md` ②)

격차 5건 중 1·2번은 M14 본 세션에서 이미 등록 완료. 3·4·5번 추가 등록.

### 5.3 멘사 v3 검증 시나리오

M15 정의대로 /kickoff 1회 정상 진행 시 다음 항목 확인:

| 검증 항목 | 통과 조건 |
|----------|---------|
| (i) 4명 동시 spawn | TeamCreate + TaskCreate 4건 + Agent spawn 4명을 한 메시지 내 동시 호출 |
| (ii) 부분 broadcast 연속 흐름 | `_broadcast.log`에 영역당 broadcast 3건 이상 발행 (묶음 X) |
| (iii) reply multi-hop | reply 발행 1건 이상 + multi-hop 사례 1건 이상 |
| (iv) 자가점검 완성 검증 한정 | 후행 영역이 부분 broadcast마다 진행 (자가점검 게이트 X) |
| (v) 모든 영역 병렬·유기 | 진행 상황 표 "대기" 컬럼 0회 사용 + 자기 일 멈춤 0회 |

---

## 6. Codex Gate C 발동 사항 (advisory)

| 변경 | Gate C |
|------|--------|
| CLAUDE.md §4 본문 (§4-0 신설 + §4 [2]·[3]·[4] 본문) | 발동 |
| CLAUDE.md §6 (영역 협업 의무 신설 + 게이트 표현 변경) | 발동 |
| CLAUDE.md §11 (진행 상황 표 양식 + 4블록 적용 시점 확장) | 발동 |
| CLAUDE.md §10 (5차 보장 추가) | 발동 |
| `.claude/commands/kickoff.md` 전면 재작성 | 발동 |
| 5 에이전트 정의 보강 | 발동 |
| 6 Skill 정의 보강 | 발동 |
| settings.json hook 신설 | 발동 |

Codex Gate C advisory 통과 또는 PM 오버라이드. PM 오버라이드 시 근거 Decision Log 기록.

---

## 7. 통과 기준

| 기준 | 조건 |
|------|------|
| 격차 5건 정정 | 헌법·Slash·에이전트·Skill·hook 모두 적용 완료 |
| 멘사 v3 /kickoff 검증 | §5.3 5요소 모두 통과 |
| Codex Gate C | advisory 통과 또는 PM 오버라이드 (근거 Decision Log) |
| 신규 시행착오 등록 | ≥ 1건 (운영 검증 정신) |
| 헌법 변경 ≤ 5건 | 다수 변경 시 M16 재검토 신호 (§5 §6 §10 §11 + §4-0 신설 — 5건 정확) |
| 본 sub-step 진행 자체에 §4-0 5요소 적용 | spec/plan 동시 작성 + reply 즉시 + 진단 표 §11 양식 적용 |

---

## 부록 A — 본 세션 격차 발현 trace

| 격차 | 발현 시점 | PM 지적 시점 | 정정 시점 |
|------|----------|------------|---------|
| 1 | service-planner spawn 후 후행 미spawn | "다 달라붙어야 할텐데" | UX·퍼블 추가 spawn |
| 2 | PRD 완성 시점 묶음 broadcast | (M15 진단 단계에서 발견) | M15 정의 |
| 3 | "자가점검 통과 게이트로만 적용" 표현 | "자가점검 통과하는 게 여러 개일 텐데, 그럼 너는 또 자가점검 최종 통과 시에 broadcast 할 거 같은데" | M15 정의 |
| 4 | 기술검토자 자율 결정 (Next.js 등) | "사용 언어 명시 안 되어 있다 → 멈춰서 확인해야 하는 거 아닌가" | M15 정의 |
| 5 | "1대1 1-hop reply" 사고 | "퍼블 → UX → PRD 연쇄, 유기적·병렬" | M15 정의 |

본 trace는 §4-0 5요소가 *모든 시점*에 발현 가능함의 증거. M14 (d) 4중 보장이 *spawn·헌법 시점*만 커버한 한계 = 5차 보장 신설 정당성.

---

## 부록 B — 다음 단계 (plan 작성 → 실행)

본 spec PM 검토 통과 후 `_design/M15_mesh-truth-plan.md` 작성:
- Group A — 헌법 §4·§6·§10·§11 보강 (병렬 가능)
- Group B — /kickoff Slash 전면 재작성 + 5 에이전트 정의 보강 + 6 Skill 보강 (병렬 가능)
- Group C — settings.json hook 신설 + check-mesh-spawn.js 작성
- Group D — 멘사 v2 _archive 이동 + _INDEX 갱신
- Group E — Codex Gate C advisory
- Group F — 멘사 v3 /kickoff 검증 진행

Group A·B·C는 §4-0 (v) 정합 병렬 진행. Group D는 Group A·B 적용 후. Group E는 모든 변경 후. Group F는 Gate C 통과 후.
