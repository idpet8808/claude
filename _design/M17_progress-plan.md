# M17 — 6건 구조 격차 정정 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** M16 직후 멘사 v2.0 검증에서 발견된 6건 구조 격차(A~F)를 헌법·Skill·에이전트·settings.json 14 영역에 일괄 정정 적용

**Architecture:** 격차 A·B·C는 명문화 + 영역별 의무 갱신 / 격차 D·E·F는 §4-0 (v) 통합 보강 + 4 에이전트 §2 통합 명시 / 격차 B는 추가로 PreToolUse on Agent matcher hook 신설 (자동 발화 메커니즘). 14 영역 변경 → grep 자가검증 → Codex Gate C advisory → PM 묶음 commit 승인 → 세션 인수인계.

**Tech Stack:** Markdown (CLAUDE.md / `.claude/skills/*/SKILL.md` / `.claude/skills/*/checklist.md` / `.claude/agents/*.md`) + JSON (settings.json) + Claude Code hooks (PreToolUse matcher)

**Reference:** 변경 본문 잠정 정의 = `_design/M17_6deficits-brainstorming.md` §3~§5. plan 각 task는 design doc §4 격차별 정정 방향을 implementation step으로 분해.

---

## File Structure

### 변경 대상 14 영역

| # | 영역 | 파일 | 격차 | Task |
|---|------|------|------|------|
| 1~5 | 헌법 §3·§4·§4-0 (v)·§6·§9 (1 파일) | `CLAUDE.md` | B·C·D·E·F + 안티 패턴 | Task 1 |
| 6 | Skill prd-draft | `.claude/skills/prd-draft/SKILL.md` + `checklist.md` | A·B·C | Task 2 |
| 7 | Skill tech-review | `.claude/skills/tech-review/SKILL.md` + `checklist.md` | B·C | Task 3 |
| 8 | Skill ux-spec | `.claude/skills/ux-spec/SKILL.md` + `checklist.md` | B·C | Task 4 |
| 9 | Skill publisher-html | `.claude/skills/publisher-html/SKILL.md` + `checklist.md` | C | Task 5 |
| 10 | 에이전트 service-planner | `.claude/agents/service-planner.md` | A·B·C·D·E·F | Task 6 |
| 11 | 에이전트 tech-reviewer | `.claude/agents/tech-reviewer.md` | B·C·D·E·F | Task 7 |
| 12 | 에이전트 ux-planner | `.claude/agents/ux-planner.md` | B·C·D·E·F | Task 8 |
| 13 | 에이전트 publisher | `.claude/agents/publisher.md` | C·D·E·F | Task 9 |
| 14 | settings.json hooks (PreToolUse on Agent) | `.claude/settings.json` | B | Task 10 |
| — | grep 자가검증 + Codex Gate C advisory | (검증) | 전체 | Task 11 |
| — | M17 묶음 commit + `_FOLLOWUP.md` 갱신 + 세션 인수인계 | (마무리) | 전체 | Task 12 |

### 작업 원칙

- **commit은 Task 12 일괄** — task별 commit 금지 (헌법·Skill·에이전트가 *동시에 정합*해야 의미 있는 변경. 중간 commit = 부정합 상태)
- **§11 4블록 형식**: 헌법 변경 5건 (Task 1) + Skill 변경 4건 (Task 2~5) + 에이전트 정의 변경 4건 (Task 6~9) + settings.json 변경 (Task 10) — 각 영역에서 PM에게 변경 권장 시 4블록 형식 적용 (M14 §10 절대 규칙)
- **grep 검증** = TDD test 대체 — 각 변경 후 변경 키워드 존재 검증
- **PM 명시 승인 시점**: 헌법 변경 5건 시점 (Task 1 직전) + commit 시점 (Task 12)

---

## Task 1: 헌법 §3·§4·§4-0 (v)·§6·§9 일괄 갱신

**Files:**
- Modify: `CLAUDE.md`

**격차 매핑**: B(§3) / C(§4) / D·E·F(§4-0 (v) + §6) / 안티 패턴(§9)

**§11 4블록 형식 적용** — 본 task 진입 직전 PM에게 5건 변경 권장 (Task 1.0 step).

- [ ] **Step 1.0: PM 명시 승인 요청 (헌법 변경 5건)**

  PM에게 §11 4블록 형식 5건 보고:
  1. §3 ① "(자동)" → "(3 영역 자동 invoke / publisher 의무 X)" — 정당성: 격차 B (영역별 차등 의무 명문화)
  2. §4 broadcast 원칙 "또는" → "그리고 (양쪽 의무)" — 정당성: 격차 C (보완 메커니즘 양쪽 발현)
  3. §4-0 (v) "모든 영역 병렬·유기" 본문 보강 — 정당성: 격차 D·E·F 통합 (Teammate idle·정지 의무)
  4. §6 영역 침범 금지 추가 — 정당성: 격차 E (Teammate 자율 재활성화 차단)
  5. §9 안티 패턴 추가 (4종) — 정당성: 격차 C·D·E·F 위배 등재

  **PM 결정 대기 — 승인 시 Step 1.1 진행. 미승인 / 부분 승인 시 미승인 영역 제외.**

- [ ] **Step 1.1: §3 ① 표 정정**

  현재 위치: `CLAUDE.md` §3 "전역 작업 사이클" 표 본문 (Superpowers 행)

  변경:
  ```
  old:
  | **Superpowers** | Claude 내부 스킬 (프로세스) | 브레인스토밍·계획 수립·디버깅 등 — 자동 적용 |
  new:
  | **Superpowers** | Claude 내부 스킬 (프로세스) | 브레인스토밍 (service-planner / tech-reviewer / ux-planner spawn 시 자동 invoke / publisher 의무 X) · 계획 수립 · 디버깅 등 |
  ```

  또한 §3 "사이클 구조" ASCII 본문도 정정:
  ```
  old:
  ① Superpowers 브레인스토밍 (자동)
  new:
  ① Superpowers 브레인스토밍 (3 영역 자동 invoke / publisher 의무 X)
  ```

- [ ] **Step 1.2: §4 broadcast 원칙 정정**

  현재 위치: `CLAUDE.md` §4 "broadcast 원칙 (M9-2-c-4 + M15)" 영역

  변경:
  ```
  old (Mesh 분해 조항 직후 부분 broadcast 정의):
  발행 방식: `SendMessage`(broadcast) 또는 `_broadcast.log` 8필드 기록 (type=`broadcast`, owner=`REQ`, target=`PRD §N`)
  
  new:
  발행 방식: `SendMessage`(broadcast) **그리고** `_broadcast.log` 8필드 기록 — **양쪽 의무** (M17 PI-023 정합. 보완 메커니즘 — `_broadcast.log` = 영구 기록·M11 evidence·디버깅 추적 / SendMessage = 실시간 통지·peer reply trigger. 둘 중 한쪽만 = 영구 기록 누락 또는 실시간 통지 누락)
  ```

- [ ] **Step 1.3: §4-0 (v) 본문 보강 (D·E·F 통합)**

  현재 위치: `CLAUDE.md` §4-0 "Mesh 본질 5요소" 표 (v) 행

  변경:
  ```
  old:
  | (v) | **모든 영역 병렬·유기** | 각 영역은 자기 일 진행 계속. reply 흐름과 무관한 작업 멈춤 X. 진행 상황 표에 "대기" 컬럼 사용 금지 |
  
  new:
  | (v) | **모든 영역 병렬·유기 + Teammate idle·정지 의무 통합** | 각 영역은 자기 일 진행 계속. reply 흐름과 무관한 작업 멈춤 X. 진행 상황 표에 "대기" 컬럼 사용 금지. **idle·stop 본질 통합** (active work + idle·stop 양쪽 정의): (D) 작업 중 silent idle — redundant peer message 자제 (동일 broadcast 반복·ack/confirm 메아리·메아리 reply 0건) / (E) 작업 완료 후 자동 재활성화 X — 자기 영역 추가 작업·재시작 자율 결정 0건. controller·peer trigger만 활성화 / (F) controller stop signal 시 즉시 정지 — 작업 완성 자율 결정 X |
  ```

- [ ] **Step 1.4: §6 영역 침범 금지 추가 (E)**

  현재 위치: `CLAUDE.md` §6 "에이전트 호출 원칙" 4항목 "영역 침범 금지 + 영역 협업 의무" → "침범 금지" sub-list

  변경 — sub-list 끝에 항목 추가:
  ```
  add (sub-list 끝):
       - 모든 영역: **Teammate 자율 재활성화·자율 작업 진행 금지** (M17 PI-024 정합) — 작업 완료 후 controller·peer trigger 없이 자기 영역 자율 재시작·재진입 결정 X. controller stop signal 발행 시 즉시 정지
  ```

- [ ] **Step 1.5: §9 안티 패턴 추가 (4종)**

  현재 위치: `CLAUDE.md` §9 "안티 패턴 (하지 말 것)" 영역 끝 ("Mesh 본질 위배" sub-list 다음 또는 신설 sub-list)

  변경 — 신설 sub-list "**M17 본질 위배**" 추가:
  ```
  add (§9 끝):
  
  **M17 본질 위배 (M17 신설)**:
  - ❌ **broadcast 한쪽만 발행 금지** (PI-023 — 격차 C 회귀 방지) — `SendMessage` + `_broadcast.log` 양쪽 발행 필수. 한쪽만 = 영구 기록 누락 또는 실시간 통지 누락
  - ❌ **redundant peer message 발행 금지** (PI-024 — 격차 D 회귀 방지) — 동일 broadcast 반복·ack/confirm 메아리·의미 없는 reply
  - ❌ **Teammate 자동 재활성화 금지** (PI-024 — 격차 E 회귀 방지) — 작업 완료 후 controller·peer trigger 없이 자율 재시작
  - ❌ **controller stop signal 무시 금지** (PI-024 — 격차 F 회귀 방지) — 4 Teammate가 stop 받고도 작업 완성 자율 결정 X. 즉시 정지
  - ❌ **brainstorming 사전 호출 누락 금지** (PI-022 — 격차 B 회귀 방지) — service-planner / tech-reviewer / ux-planner spawn 시 brainstorming 자동 invoke 의무 위배
  - ❌ **PRD §B Use Case 단위 분해 깊이 미흡 금지** (PI-020 — 격차 A 회귀 방지) — NN 단위 사용자/시스템 동작 분해 0건 / NNN 단일 묶음
  - ❌ **PRD §B에 입력·출력·예외 로직 분해 금지** (PI-021 — 영역 침범) — 로직 분해는 기능명세서(FN-NNN, 01b) 위임
  ```

- [ ] **Step 1.6: grep 자가검증**

  ```bash
  grep -n "publisher 의무 X" CLAUDE.md
  grep -n "양쪽 의무" CLAUDE.md
  grep -n "Teammate idle·정지 의무 통합" CLAUDE.md
  grep -n "Teammate 자율 재활성화" CLAUDE.md
  grep -n "M17 본질 위배" CLAUDE.md
  ```
  
  Expected: 5개 grep 모두 line 번호 매칭 (각 변경 영역 1건 이상)

---

## Task 2: prd-draft Skill 갱신 (격차 A·B·C)

**Files:**
- Modify: `.claude/skills/prd-draft/SKILL.md`
- Modify: `.claude/skills/prd-draft/checklist.md`
- (template.md 변경 X — 16 필드 양식은 보존)

**격차 매핑**: A(NN 분해 단위 + 기능명세서 분담) · B(brainstorming 사전 의무) · C(broadcast 양쪽)

- [ ] **Step 2.1: SKILL.md §0 또는 §1.5에 brainstorming 사전 의무 명문화 (B)**

  변경 위치: SKILL.md "## 호출 절차" 직전에 새 sub-section 추가 또는 §1 STATE.md first read 직전에 §0.5 신설:

  ```markdown
  add (§1 직전):
  
  ## §0. 사전 호출 의무 (M17 PI-022 정합)
  
  service-planner spawn 직후 **자기 영역 산출물 작성 시작 전** 다음 의무:
  
  1. **superpowers:brainstorming 명시 invoke** (M17 격차 B 정정)
     - PM과 도메인·Use Case 카탈로그 시뮬레이션 ("이 도메인에서 사용자가 무엇을 *할 수 있어야* 하는가")
     - 종료 산출물 = "§B 등재 Use Case 카탈로그 목록" (대분류·NNN·NN 단위)
     - 본 카탈로그를 §B 16 필드 채우기 시작점으로 사용
  
  2. (skip 조건) PM 명시적 "건너뛰자" 지시 시만 생략. 그 외 매번 invoke (`feedback_brainstorm_first` 정합).
  ```

- [ ] **Step 2.2: SKILL.md §3 부분 broadcast 트리거 표 정정 (C)**

  변경 위치: SKILL.md "#### 부분 broadcast 트리거" 직후 발행 방식 정의

  변경:
  ```
  old:
  발행 방식: `SendMessage`(broadcast) 또는 `_broadcast.log` 8필드 기록 (type=`broadcast`, owner=`REQ`, target=`PRD §N`)
  
  new:
  발행 방식: `SendMessage`(broadcast) **+** `_broadcast.log` 8필드 기록 — **양쪽 의무** (M17 PI-023). 한쪽만 발행 = 안티 패턴 (CLAUDE.md §9 M17 본질 위배 정합).
  ```

- [ ] **Step 2.3: SKILL.md §3 작성 시 본질 영역 — NN 분해 단위 명시 (A)**

  변경 위치: SKILL.md "#### 작성 시 본질 영역" — "**§B 요구사항 카탈로그**" sub-list

  변경 (sub-list 첫 항목 추가 + 기존 보강):
  ```
  add (sub-list 첫 항목으로):
  
    - **NN 분해 단위 = Use Case (사용자/시스템 동작 단위)** — "...할 수 있어야 함" 단위 (M17 PI-020). 예: 결제 도메인에 *결제 / 결제 조회 / 결제 취소* = 3 NN. 1 NNN에 여러 Use Case 묶음 X
    - **세부내용 및 요건 필드 = 동작의 큰 흐름 + 비즈니스 룰** (M17 PI-021). 입력·출력·예외·정합성 룰 디테일은 *기능명세서 (FN-NNN, 01b-functional-spec.md, PI-005 옵션 산출물)* 위임. service-planner는 Use Case 단위 분해만, 로직 분해는 기능명세서 영역
  ```

- [ ] **Step 2.4: SKILL.md "## 영역 침범 금지" 항목 추가 (A)**

  변경 위치: SKILL.md "## 영역 침범 금지 (CLAUDE.md §6·§9)" sub-list 끝

  변경 (sub-list 끝에 추가):
  ```
  add:
  - ❌ **PRD §B에 입력·출력·예외 로직 분해 금지** (M17 PI-021 — 영역 침범) — 로직 분해는 *기능명세서 (FN-NNN, 01b-functional-spec.md)* 옵션 산출물 위임. 필요 시 controller 경유 PM 결정 후 기능명세서 진입 제안
  - ❌ **brainstorming 사전 호출 누락 금지** (M17 PI-022 — 격차 B 회귀 방지) — spawn 직후 superpowers:brainstorming 매번 invoke (PM "건너뛰자" 명시 외 생략 X)
  - ❌ **NN 분해 깊이 미흡 금지** (M17 PI-020 — 격차 A 회귀 방지) — Use Case 단위 분해 0건 / NNN 단일 묶음
  ```

- [ ] **Step 2.5: checklist.md A-2·A-3 자가점검 추가 (A)**

  변경 위치: checklist.md "### 자동 실패 조건 (4건...)" 다음에 신규 자동 실패 조건 추가, "통과율 산정 7항목" 보강

  변경 1 (자동 실패 4건 → 5건 확장):
  ```
  add (A-4 다음):
  
  #### A-5. §B Use Case 단위 NN 분해 깊이 (PI-020 — 격차 A 정정 핵심, M17 신설)
  
  - [ ] §B 모든 NNN이 *사용자/시스템 동작 단위 (Use Case)*로 분해됨
  - [ ] 1 NNN에 여러 Use Case 묶음 0건 (예: 결제 / 조회 / 취소가 같은 NNN에 묶이지 않음)
  - [ ] *세부내용 및 요건* 필드가 *동작의 큰 흐름 + 비즈니스 룰* 수준 (입력·출력·예외 디테일 0건 — 기능명세서 위임)
  - **실패 예**: REQ-PAY-001-01 단일 = "결제 (PG 연동)" 한 묶음. *결제 / 결제 조회 / 결제 취소* NN 미분해
  - **통과 예**: REQ-PAY-001-01 결제 / -02 결제 조회 / -03 결제 취소 (3 Use Case)
  - **자동 실패 사유**: 격차 A (PRD §B 분해 깊이 미흡) 회귀 방지. 후행 영역 자율 결정·자율 NN 분리 위임 차단
  ```

  변경 2 (통과 기준 갱신):
  ```
  edit (## §C 통합 통과 기준):
  
  old:
  §A 자동 실패 0 위배 + 통과율 ≥ 6/7 + §B error 0 → 후행 영역 *완성 산출물 사용 게이트* 통과
  
  new:
  §A 자동 실패 0/5 위배 + 통과율 ≥ 6/7 + §B error 0 → 후행 영역 *완성 산출물 사용 게이트* 통과
  ```

- [ ] **Step 2.6: checklist.md U-5 evidence 강화 (C)**

  변경 위치: checklist.md "### Part 2 — 범용 U-1~U-5"

  변경:
  ```
  edit (U-5):
  
  old:
  - [ ] **U-5**: 본 §B 결과를 `_broadcast.log`에 8필드 기록 (evidence)
  
  new:
  - [ ] **U-5**: 본 §B 결과를 `_broadcast.log`에 8필드 기록 + **broadcast 발행 시 SendMessage 동시 발행 evidence 확보** (M17 PI-023 — 격차 C 정정 — 양쪽 의무)
  ```

- [ ] **Step 2.7: grep 자가검증**

  ```bash
  grep -n "사전 호출 의무" .claude/skills/prd-draft/SKILL.md
  grep -n "양쪽 의무" .claude/skills/prd-draft/SKILL.md
  grep -n "Use Case (사용자/시스템 동작 단위)" .claude/skills/prd-draft/SKILL.md
  grep -n "기능명세서.*FN-NNN.*위임" .claude/skills/prd-draft/SKILL.md
  grep -n "A-5" .claude/skills/prd-draft/checklist.md
  grep -n "PI-020" .claude/skills/prd-draft/SKILL.md .claude/skills/prd-draft/checklist.md
  ```

  Expected: 6개 grep 모두 line 매칭

---

## Task 3: tech-review Skill 갱신 (격차 B·C)

**Files:**
- Modify: `.claude/skills/tech-review/SKILL.md`
- Modify: `.claude/skills/tech-review/checklist.md`

**격차 매핑**: B(brainstorming 사전 의무 — 아키텍처 옵션 시뮬레이션) · C(broadcast 양쪽)

- [ ] **Step 3.1: SKILL.md §0 사전 호출 의무 명문화 (B)**

  변경 위치: SKILL.md "## 호출 절차" 직전

  변경 (Task 2.1 패턴 정합):
  ```
  add:
  
  ## §0. 사전 호출 의무 (M17 PI-022 정합)
  
  tech-reviewer spawn 직후 **자기 영역 산출물 작성 시작 전** 다음 의무:
  
  1. **superpowers:brainstorming 명시 invoke** (M17 격차 B 정정)
     - PRD §B 요구사항 ID별 *아키텍처 옵션 카탈로그* 시뮬레이션 (스택 후보·아키텍처 패턴·외부 의존성 비교)
     - 종료 산출물 = "TR-NNN별 평가 옵션 카탈로그"
     - 본 카탈로그를 §2 요구사항 전수 평가 시작점으로 사용
  
  2. (skip 조건) PM 명시적 "건너뛰자" 지시 시만 생략.
  ```

- [ ] **Step 3.2: SKILL.md broadcast 양쪽 의무 정정 (C)**

  변경 위치: SKILL.md broadcast 발행 방식 정의 (있는 곳)

  변경 (Task 2.2 패턴 정합 — "또는" → "+"):
  ```
  edit:
  발행 방식: `SendMessage`(broadcast) **+** `_broadcast.log` 8필드 기록 — **양쪽 의무** (M17 PI-023).
  ```

- [ ] **Step 3.3: SKILL.md "## 영역 침범 금지" 항목 추가 (B)**

  변경 (sub-list 끝에 추가):
  ```
  add:
  - ❌ **brainstorming 사전 호출 누락 금지** (M17 PI-022 — 격차 B 회귀 방지)
  ```

- [ ] **Step 3.4: checklist.md U-5 evidence 강화 (C)**

  Task 2.6 패턴 정합 — U-5 항목에 양쪽 발행 evidence 추가.

- [ ] **Step 3.5: grep 자가검증**

  ```bash
  grep -n "사전 호출 의무" .claude/skills/tech-review/SKILL.md
  grep -n "양쪽 의무" .claude/skills/tech-review/SKILL.md
  grep -n "PI-022\|PI-023" .claude/skills/tech-review/SKILL.md .claude/skills/tech-review/checklist.md
  ```

---

## Task 4: ux-spec Skill 갱신 (격차 B·C)

**Files:**
- Modify: `.claude/skills/ux-spec/SKILL.md`
- Modify: `.claude/skills/ux-spec/checklist.md`

**격차 매핑**: B(brainstorming 사전 의무 — 화면 옵션 시뮬레이션) · C(broadcast 양쪽)

- [ ] **Step 4.1: SKILL.md §0 사전 호출 의무 명문화 (B)**

  변경 (Task 2.1 패턴 정합):
  ```
  add:
  
  ## §0. 사전 호출 의무 (M17 PI-022 정합)
  
  ux-planner spawn 직후 **자기 영역 산출물 작성 시작 전** 다음 의무:
  
  1. **superpowers:brainstorming 명시 invoke** (M17 격차 B 정정)
     - PRD §B Use Case별 *화면 설계 옵션 카탈로그* 시뮬레이션 (레이아웃·흐름·상태 4종)
     - 종료 산출물 = "UI-{명칭}-{NN}별 화면 옵션 카탈로그 + 시각적 스켈레톤 후보"
     - 본 카탈로그를 화면 메타 7 필드 + 시각적 스켈레톤 + Description 작성 시작점으로 사용
  
  2. (skip 조건) PM 명시적 "건너뛰자" 지시 시만 생략.
  ```

- [ ] **Step 4.2: SKILL.md broadcast 양쪽 의무 정정 (C)**

  Task 2.2 패턴 정합.

- [ ] **Step 4.3: SKILL.md "## 영역 침범 금지" 항목 추가 (B)**

  Task 3.3 패턴 정합.

- [ ] **Step 4.4: checklist.md U-5 evidence 강화 (C)**

  Task 2.6 패턴 정합.

- [ ] **Step 4.5: grep 자가검증**

  ```bash
  grep -n "사전 호출 의무" .claude/skills/ux-spec/SKILL.md
  grep -n "양쪽 의무" .claude/skills/ux-spec/SKILL.md
  grep -n "PI-022\|PI-023" .claude/skills/ux-spec/SKILL.md .claude/skills/ux-spec/checklist.md
  ```

---

## Task 5: publisher-html Skill 갱신 (격차 C만)

**Files:**
- Modify: `.claude/skills/publisher-html/SKILL.md`
- Modify: `.claude/skills/publisher-html/checklist.md`

**격차 매핑**: C(broadcast 양쪽). brainstorming 의무 X (UX 명세 매핑 본질).

- [ ] **Step 5.1: SKILL.md broadcast 양쪽 의무 정정 (C)**

  Task 2.2 패턴 정합.

- [ ] **Step 5.2: SKILL.md "## 영역 침범 금지" 항목 추가**

  ```
  add:
  - ❌ **broadcast 한쪽만 발행 금지** (M17 PI-023 — 격차 C 회귀 방지)
  ```

  ⚠ brainstorming 사전 의무 항목 *추가 X* (publisher 영역 본질 — UX 명세 그대로 매핑).

- [ ] **Step 5.3: checklist.md U-5 evidence 강화 (C)**

  Task 2.6 패턴 정합.

- [ ] **Step 5.4: grep 자가검증**

  ```bash
  grep -n "양쪽 의무" .claude/skills/publisher-html/SKILL.md
  grep -n "PI-023" .claude/skills/publisher-html/SKILL.md .claude/skills/publisher-html/checklist.md
  ```

---

## Task 6: 에이전트 service-planner 갱신 (격차 A·B·C·D·E·F)

**Files:**
- Modify: `.claude/agents/service-planner.md`

**격차 매핑**: A(NN 분해 단위 명시) · B(brainstorming 사전 의무) · C(broadcast 양쪽) · D·E·F(idle·정지 의무 통합)

- [ ] **Step 6.1: 현재 §2 작업 절차 Read**

  Read `.claude/agents/service-planner.md`

- [ ] **Step 6.2: §2 작업 절차 첫 단계에 brainstorming 사전 의무 명시 (B)**

  변경 (§2 작업 절차 첫 step 추가):
  ```
  add (§2 첫 step):
  
  ### Step 0. 사전 호출 (M17 PI-022 정합 — 격차 B)
  
  spawn 직후 *자기 영역 산출물 작성 시작 전* `superpowers:brainstorming` 명시 invoke. 종료 산출물(§B 등재 Use Case 카탈로그 목록)을 prd-draft Skill 입력으로 사용. PM "건너뛰자" 명시 외 매번 invoke 의무.
  ```

- [ ] **Step 6.3: §2 작업 절차에 broadcast 양쪽 의무 명시 (C)**

  변경 (§2 broadcast 발행 영역):
  ```
  edit:
  
  broadcast 발행 시: `SendMessage`(broadcast) **+** `_broadcast.log` 8필드 기록 — **양쪽 의무** (M17 PI-023). 한쪽만 발행 = 안티 패턴 (CLAUDE.md §9 M17 본질 위배).
  ```

- [ ] **Step 6.4: §2 작업 절차에 idle·정지 의무 통합 명시 (D·E·F)**

  변경 (§2 끝 또는 별도 sub-section 신설):
  ```
  add (§2 끝):
  
  ### Step N. Teammate idle·정지 의무 (M17 PI-024 정합 — 격차 D·E·F 통합)
  
  본 에이전트는 다음 시점 의무 (active work + idle·stop 양쪽):
  
  - **(D) 작업 중 silent idle**: 자기 영역 처리 trigger 없을 때 silent 대기. redundant peer message 자제 (동일 broadcast 반복·ack/confirm 메아리·메아리 reply 0건). idle 진입 시 controller에게 *상태 1줄* SendMessage 단발 (peer에게는 발행 X)
  - **(E) 작업 완료 후 자동 재활성화 X**: 산출물 자가점검 통과 + STATE.md last-write 후 silent idle 진입. 자기 영역 추가 작업·재시작·재진입 *자율 결정 0건*. controller가 SendMessage(re-activate) 또는 부분 broadcast 발행 시에만 활성화
  - **(F) controller stop signal 시 즉시 정지**: SendMessage(stop) 또는 PM 명시 stop 신호 수신 시 *작업 완성 자율 결정 X*. 즉시 정지 + STATE.md 현 상태 last-write
  ```

- [ ] **Step 6.5: §2 작업 절차에 NN 분해 단위 명시 (A)**

  변경 (§2 PRD 작성 영역):
  ```
  add (§2 PRD 작성 step):
  
  - PRD §B NN 분해 단위 = **Use Case (사용자/시스템 동작 단위)** (M17 PI-020). 1 NNN에 여러 Use Case 묶음 X. 입력·출력·예외 분해 필요 시 *기능명세서 (FN-NNN, 01b)* 옵션 산출물 진입 제안 (PI-021)
  ```

- [ ] **Step 6.6: grep 자가검증**

  ```bash
  grep -n "Step 0. 사전 호출" .claude/agents/service-planner.md
  grep -n "양쪽 의무" .claude/agents/service-planner.md
  grep -n "Teammate idle·정지 의무" .claude/agents/service-planner.md
  grep -n "Use Case (사용자/시스템 동작 단위)" .claude/agents/service-planner.md
  grep -n "PI-020\|PI-021\|PI-022\|PI-023\|PI-024" .claude/agents/service-planner.md
  ```

---

## Task 7: 에이전트 tech-reviewer 갱신 (격차 B·C·D·E·F)

**Files:**
- Modify: `.claude/agents/tech-reviewer.md`

**격차 매핑**: B · C · D·E·F. (격차 A는 service-planner 영역)

- [ ] **Step 7.1: 현재 §2 Read**

- [ ] **Step 7.2: §2 첫 step에 brainstorming 사전 의무 명시 (B)**

  Task 6.2 패턴 정합 — "아키텍처 옵션 카탈로그 시뮬레이션" 본질로 작성.

- [ ] **Step 7.3: §2에 broadcast 양쪽 의무 명시 (C)**

  Task 6.3 패턴 정합.

- [ ] **Step 7.4: §2 끝에 idle·정지 의무 통합 명시 (D·E·F)**

  Task 6.4 패턴 정합.

- [ ] **Step 7.5: grep 자가검증**

  ```bash
  grep -n "Step 0. 사전 호출" .claude/agents/tech-reviewer.md
  grep -n "양쪽 의무" .claude/agents/tech-reviewer.md
  grep -n "Teammate idle·정지 의무" .claude/agents/tech-reviewer.md
  grep -n "PI-022\|PI-023\|PI-024" .claude/agents/tech-reviewer.md
  ```

---

## Task 8: 에이전트 ux-planner 갱신 (격차 B·C·D·E·F)

**Files:**
- Modify: `.claude/agents/ux-planner.md`

**격차 매핑**: B · C · D·E·F.

- [ ] **Step 8.1: 현재 §2 Read**

- [ ] **Step 8.2: §2 첫 step에 brainstorming 사전 의무 명시 (B)**

  Task 6.2 패턴 정합 — "화면 설계 옵션 카탈로그 + 시각적 스켈레톤 후보 시뮬레이션" 본질로 작성.

- [ ] **Step 8.3: §2에 broadcast 양쪽 의무 명시 (C)**

  Task 6.3 패턴 정합.

- [ ] **Step 8.4: §2 끝에 idle·정지 의무 통합 명시 (D·E·F)**

  Task 6.4 패턴 정합.

- [ ] **Step 8.5: grep 자가검증**

  ```bash
  grep -n "Step 0. 사전 호출" .claude/agents/ux-planner.md
  grep -n "양쪽 의무" .claude/agents/ux-planner.md
  grep -n "Teammate idle·정지 의무" .claude/agents/ux-planner.md
  grep -n "PI-022\|PI-023\|PI-024" .claude/agents/ux-planner.md
  ```

---

## Task 9: 에이전트 publisher 갱신 (격차 C·D·E·F)

**Files:**
- Modify: `.claude/agents/publisher.md`

**격차 매핑**: C · D·E·F. brainstorming 사전 의무 X (UX 명세 매핑 본질).

- [ ] **Step 9.1: 현재 §2 Read**

- [ ] **Step 9.2: §2에 broadcast 양쪽 의무 명시 (C)**

  Task 6.3 패턴 정합.

- [ ] **Step 9.3: §2 끝에 idle·정지 의무 통합 명시 (D·E·F)**

  Task 6.4 패턴 정합.

  ⚠ brainstorming 사전 의무 step *추가 X* (Skill SKILL.md §0 — UX 명세 매핑 본질). publisher 정의 §1에 "brainstorming 의무 X — UX 명세 그대로 매핑" 명시 보강 (영역 본질 명문화).

- [ ] **Step 9.4: §2에 brainstorming 의무 X 명시**

  변경 (§2 또는 §1):
  ```
  add:
  
  ⚠ **brainstorming 의무 X** (M17 PI-022 — 영역 본질) — publisher는 UX 명세 그대로 HTML 매핑. 화면 가감·옵션 탐색 자율 결정 X (영역 침범 안티 패턴). brainstorming 발화는 controller·UX 영역.
  ```

- [ ] **Step 9.5: grep 자가검증**

  ```bash
  grep -n "양쪽 의무" .claude/agents/publisher.md
  grep -n "Teammate idle·정지 의무" .claude/agents/publisher.md
  grep -n "brainstorming 의무 X" .claude/agents/publisher.md
  grep -n "PI-022\|PI-023\|PI-024" .claude/agents/publisher.md
  ```

---

## Task 10: settings.json hooks 갱신 (격차 B)

**Files:**
- Modify: `.claude/settings.json`

**격차 매핑**: B(PreToolUse on Agent matcher hook 신설 — 자동 발화 메커니즘)

- [ ] **Step 10.1: Claude Code hooks 스펙 검증 (subagent_type matcher 가능 여부)**

  ⚠ design doc §9 ambiguity 항목 — 본 step에서 결정.
  
  Read `.claude/settings.json` `hooks` 영역.
  
  Claude Code hooks docs 확인 (가능 경로):
  - WebFetch `https://code.claude.com/docs/ko/hooks` (또는 영문)
  
  검증 결과 분기:
  - **(a) subagent_type matcher 가능**: matcher 직접 사용 (예: `"matcher": "Agent:service-planner"`)
  - **(b) 불가능**: matcher = `Agent`로 두고 hook 내부 stdin 입력 검사로 분기 (shell command가 환경변수 또는 stdin에서 subagent_type 파싱)

- [ ] **Step 10.2: PreToolUse on Agent matcher hook 추가**

  분기 (a) 결정 시 변경:
  ```json
  add (settings.json hooks.PreToolUse 배열에 신규 객체):
  
  {
    "matcher": "Agent",
    "hooks": [
      {
        "type": "command",
        "command": "grep -qE '\"subagent_type\"\\s*:\\s*\"(서비스기획자|기술검토자|UX기획자)\"' && { echo 'REMINDER: 본 Agent spawn은 sub-step 진입 신호 — 사전 superpowers:brainstorming invoke 의무 (M17 PI-022·PI-025 / feedback_brainstorm_first 정합). 퍼블리셔 제외.' >&2; exit 0; } || exit 0"
      }
    ]
  }
  ```

  분기 (b) 결정 시: 동일 명령 (이미 stdin 검사 패턴). subagent_type 파싱이 stdin or env 둘 다 가능하면 grep 명령은 동일.

- [ ] **Step 10.3: settings.json JSON 검증**

  ```bash
  python -c "import json; json.load(open('.claude/settings.json'))"
  ```
  
  또는 (Windows PowerShell):
  ```powershell
  Get-Content .claude/settings.json | ConvertFrom-Json | Out-Null
  ```
  
  Expected: 에러 없음 (유효 JSON)

- [ ] **Step 10.4: hook 동작 manual 검증**

  Agent spawn 시 stderr REMINDER 발화 확인:
  - service-planner / tech-reviewer / ux-planner Agent spawn 시: stderr에 REMINDER 표시
  - publisher Agent spawn 시: REMINDER 미표시
  
  (실 검증은 멘사 v3 sub-step에서)

- [ ] **Step 10.5: grep 자가검증**

  ```bash
  grep -n "REMINDER.*M17 PI-022·PI-025" .claude/settings.json
  grep -n "서비스기획자\|기술검토자\|UX기획자" .claude/settings.json
  ```

---

## Task 11: 일괄 grep 자가검증 + Codex Gate C advisory

**Files:**
- (검증)

- [ ] **Step 11.1: 14 영역 변경 누적 grep 자가검증**

  ```bash
  # PI 등재 검증 (M17 PI-020~PI-025 6건)
  grep -rn "PI-020\|PI-021\|PI-022\|PI-023\|PI-024\|PI-025" CLAUDE.md .claude/skills/ .claude/agents/ .claude/settings.json
  
  # 격차별 본질 키워드 검증
  grep -rn "Use Case (사용자/시스템 동작 단위)" CLAUDE.md .claude/skills/ .claude/agents/  # 격차 A
  grep -rn "사전 호출 의무" .claude/skills/ .claude/agents/  # 격차 B
  grep -rn "양쪽 의무" CLAUDE.md .claude/skills/ .claude/agents/  # 격차 C
  grep -rn "Teammate idle·정지 의무" CLAUDE.md .claude/agents/  # 격차 D·E·F
  grep -rn "M17 본질 위배" CLAUDE.md  # 안티 패턴
  ```
  
  Expected: 모든 grep 매칭 (각 격차별 1건 이상). 매칭 0건 발견 시 해당 task 회귀.

- [ ] **Step 11.2: 헌법 §11 4블록 형식 적용 영역 검증**

  M14 정합 — 헌법 변경 5건이 §11 4블록 형식으로 PM에게 보고되었는지 (Step 1.0 완료) 확인.
  
  Task 1.0 step의 PM 승인 evidence 기록 (Decision Log 또는 _broadcast.log).

- [ ] **Step 11.3: Codex Gate C advisory 호출**

  Codex 호출:
  ```
  /codex:rescue (또는 직접 codex 호출)
  
  맥락 3~5줄:
  - 대상: M17 6건 구조 격차 정정 (PRD §B Use Case 분해 / brainstorming 자동 발화 / broadcast 양쪽 의무 / Teammate idle·정지 의무 통합)
  - 핵심 제약: §10 절대 규칙 — 헌법 §·Skills·settings.json 변경 PM 명시 승인 필수. M14 §11 4블록 형식 적용
  - 리뷰 초점: 격차 A·B·C·D·E·F 정정이 헌법·Skill·에이전트·settings.json 14 영역에 일관 적용되었는가, M16 PI-001~PI-019 정합 보존되었는가
  - 변경 영역: CLAUDE.md / 4 Skill SKILL.md + checklist.md / 4 에이전트 정의 / settings.json
  - 참고: _design/M17_6deficits-brainstorming.md (design doc) + _design/M17_progress-plan.md (본 plan)
  ```

  Codex advisory 결과 분기:
  - **통과**: Step 11.4 진행
  - **반려 (높음 1건 이상)**: PM에게 보고 → 수용·오버라이드·부분 반영 결정 (PI-015 정합)

- [ ] **Step 11.4: PM에게 Codex advisory 결과 보고 + commit 승인 요청**

  표 형식 보고 (memory `feedback_review_table_format.md` 정합):
  
  | 심각도 | 발견 | 근거 | 처리 |
  |--------|------|------|------|
  | 높음 | (있으면) | (Codex 인용) | 수용/오버라이드/부분 |
  | 중간 | ... | ... | ... |
  | 낮음 | ... | ... | ... |
  
  PM 결정 대기.

---

## Task 12: M17 묶음 commit + `_FOLLOWUP.md` 갱신 + 세션 인수인계

**Files:**
- Modify: `_FOLLOWUP.md`
- Create: `_design/M17_session_resume.md`
- (commit)

- [ ] **Step 12.1: `_FOLLOWUP.md` 갱신**

  변경 (③ 운영 정련 보존 또는 ② v1.1 이관에 등록):
  
  ```
  add (③ 운영 정련 보존):
  - **M17 6건 격차 정정 운영 검증** (2026-05-08 M17 신설) — PI-020~PI-025 6 본질 정합. 멘사 v3 검증 sub-step에서 6건 격차 해소 확인. 새 격차 발견 시 본 항목 갱신
  - **M17 idle·stop hook 보강 검토** (2026-05-08 M17 신설 — v1.1 이관) — D·E·F 통합 정정이 명문화 + 에이전트 §2 명시로 적용됨. Teammate 행동 의무는 hook 강제 어려움 (Teammate 내부 결정 검증 불가). 운영 시행착오 누적 시 v1.1+ idle/stop hook 보강 검토
  - **M17 PreToolUse on Agent matcher subagent_type 동작 검증** (2026-05-08 M17 신설) — Task 10.4 manual 검증 결과 기록 + 멘사 v3 검증 시 실 발화 검증
  ```

- [ ] **Step 12.2: `_design/M17_session_resume.md` 작성**

  M16 session_resume 패턴 정합 (`_design/M16_session_resume.md` 참조).
  
  구조:
  - §1 본 세션 종료 시점
  - §2 본 세션 결과 종합 (M17 진행 흐름·격차 정정 영역)
  - §3 PM 의도 catalog (PI-020~PI-025)
  - §4 M17 변경 영역 (14 파일)
  - §5 Codex Gate C advisory 통과 진행
  - §6 다음 세션 진입 영역 (멘사 v3 검증 / 운영 정련)
  - §7 주의·제약
  - §8 참조 파일
  - §9 다음 세션 첫 메시지 제안

- [ ] **Step 12.3: STATE.md 갱신 (멘사 v2.0)**

  변경 (`projects/mensa-ranking-challenge-v2-0/STATE.md` Decision Log 추가):
  ```
  add:
  - (2026-05-08) M17 6건 격차 정정 진행 — _design/M17_6deficits-brainstorming.md + M17_progress-plan.md. v2.0 산출물은 비교군으로 보존 (_archive 예정). 멘사 v3 신규 sub-step에서 격차 해소 검증
  ```

- [ ] **Step 12.4: PM 명시 commit 승인 요청 (CLAUDE.md §10)**

  PM에게 commit 메시지 안 제시:
  ```
  feat(M17): 6건 구조 격차 정정 — PRD Use Case 분해 + brainstorming 자동 발화 + broadcast 양쪽 의무 + Teammate idle·정지 의무 통합
  
  - PI-020~PI-025 6 본질 신규 (M16 PI-001~PI-019 누적)
  - 헌법 §3·§4·§4-0 (v)·§6·§9 갱신
  - 4 Skill (SKILL.md + checklist.md) 갱신
  - 4 에이전트 정의 §2 갱신
  - settings.json PreToolUse on Agent matcher hook 신설
  - _design/M17_6deficits-brainstorming.md (design doc) + M17_progress-plan.md (plan) + M17_session_resume.md (인수인계)
  - _FOLLOWUP.md ③ M17 운영 검증 등록
  - 격차 A: PRD §B NN 분해 단위 = Use Case (PI-020·PI-021)
  - 격차 B: brainstorming 영역별 차등 의무 + 자동 발화 메커니즘 (PI-022)
  - 격차 C: broadcast 양쪽 의무 (PI-023)
  - 격차 D·E·F: Teammate idle·정지 의무 통합 (PI-024)
  ```

  PM 결정 대기.

- [ ] **Step 12.5: 묶음 commit 실행 (PM 승인 후)**

  ```bash
  git add CLAUDE.md
  git add .claude/skills/prd-draft/SKILL.md .claude/skills/prd-draft/checklist.md
  git add .claude/skills/tech-review/SKILL.md .claude/skills/tech-review/checklist.md
  git add .claude/skills/ux-spec/SKILL.md .claude/skills/ux-spec/checklist.md
  git add .claude/skills/publisher-html/SKILL.md .claude/skills/publisher-html/checklist.md
  git add .claude/agents/service-planner.md .claude/agents/tech-reviewer.md .claude/agents/ux-planner.md .claude/agents/publisher.md
  git add .claude/settings.json
  git add _design/M17_6deficits-brainstorming.md _design/M17_progress-plan.md _design/M17_session_resume.md
  git add _FOLLOWUP.md
  git add projects/mensa-ranking-challenge-v2-0/STATE.md
  
  git commit -m "$(cat <<'EOF'
  feat(M17): 6건 구조 격차 정정 — PRD Use Case 분해 + brainstorming 자동 발화 + broadcast 양쪽 의무 + Teammate idle·정지 의무 통합
  
  - PI-020~PI-025 6 본질 신규
  - 14 영역 변경: 헌법 5 + Skill 4 + 에이전트 4 + settings.json 1
  
  Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
  EOF
  )"
  ```

  Expected: commit 성공.

- [ ] **Step 12.6: git status 확인 + 세션 종료**

  ```bash
  git status
  git log --oneline -5
  ```

  Expected:
  - working tree clean
  - 최신 commit = M17

---

## Self-Review

### 1. Spec coverage

| Spec 영역 (design doc §) | Plan task |
|----|----|
| §3 격차 A 본질 + §4 정정 (a)~(f) | Task 2 (Skill) + Task 6 (에이전트) — Use Case 단위 분해 + 기능명세서 분담 |
| §3 격차 B 본질 + §4 정정 (a)~(e) | Task 1.1 (헌법 §3) + Task 2~4 (3 Skill SKILL.md §0) + Task 6~8 (3 에이전트 §2) + Task 10 (settings.json hook) — 4중 정합 |
| §3 격차 C 본질 + §4 정정 (a)~(e) | Task 1.2 (헌법 §4) + Task 2~5 (4 Skill SKILL.md + checklist U-5) + Task 6~9 (4 에이전트 §2) + Task 1.5 (안티 패턴) |
| §3 격차 D·E·F 본질 + §4 정정 (a)~(e) | Task 1.3 (헌법 §4-0 (v)) + Task 1.4 (헌법 §6) + Task 1.5 (안티 패턴) + Task 6~9 (4 에이전트 §2) — 통합 적용 |
| §5 변경 영역 카탈로그 14건 | Task 1~10 (영역별 1:1 매핑) |
| §6 PI-020~PI-025 catalog | 모든 Task의 변경 본문에 PI 인용 |
| §7 검증 경로 (멘사 v3) | 본 plan scope 외 — 별도 sub-step |
| §8 §11 4블록 형식 | Task 1.0 (PM 명시 승인 step) |

**Spec 누락 0건** — 격차별 정정 방향이 모든 task에 매핑.

### 2. Placeholder scan

- "TBD"·"TODO"·"implement later" 등 placeholder 0건
- "Add appropriate error handling" 등 모호 표현 0건
- 각 step에 변경 위치·본문·grep 검증 명시
- ⚠ Task 10.1 hooks 스펙 검증은 *동적 분기*이지만 placeholder 아님 (분기 처리 명시)

### 3. Type consistency

- "Use Case (사용자/시스템 동작 단위)" 본질 표현이 Task 2.3·2.4·2.5 (Skill) + Task 6.5 (에이전트) 일관 적용
- "Teammate idle·정지 의무" 본질이 Task 1.3 (§4-0 (v)) + Task 6.4·7.4·8.4·9.3 (4 에이전트) 일관 적용
- "양쪽 의무" 본질이 Task 1.2 (§4) + Task 2.2·3.2·4.2·5.1 (4 Skill) + Task 6.3·7.3·8.3·9.2 (4 에이전트) 일관 적용
- PI 번호 (PI-020~PI-025) 일관 인용 (Task 11.1 grep 검증으로 cross-check)

**일관성 OK** — 모든 task의 본질 표현·PI 번호 매칭.

---

## Execution Handoff

**Plan complete and saved to `_design/M17_progress-plan.md`. Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** — execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**

(PM 결정 대기)

---

## 변경 이력

- (2026-05-08) M17 plan 작성 완료. 12 task 분해 (Task 1~12). M14·M16 정합. PM 명시 승인 후 execution 진입.
