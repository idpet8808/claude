# M16 — 하네스 구조 본질 재설계 진행 Plan (Meta Plan)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** PM 본질 의도 14건+ 정합으로 BN시스템 IT 기획팀 하네스 구조를 *전면 재설계*. 산출물 = M16 [1]~[5] 단계별 design doc + 최종 적용 plan(M16 [5] 자체가 적용 plan 산출).

**Architecture:** 5단계 순차 진행 (Approach C). 단계별 PM 검토 게이트 + 반복 누적 정신(역행 갱신 허용). M15 누적 SSoT(이미 `_archive/M15/`·`_archive/v2/` 보존)를 *기존 누적 검토* 자료로 참조. 본 plan = *진행 plan* (메타 plan). [5] 산출물 = *적용 plan* (실 코드 변경).

**Tech Stack:** Markdown 산출물 + Read·Edit·Write·Bash(`git mv`)·Glob·Grep tool. 코드 작업 X (문서 작업 위주). 검증 = 자가 점검 + PM 검토 게이트 (TDD 미적용 영역).

---

## ⚠️ 진행 방식 변경 (2026-05-07)

**배경**: Task 1 완료 후 Task 2·3·4 진행 중 *본질 우회 5회 누적* + *피상적 검토* 발견. 4 산출물(PRD/TR/UX/P) 동일 격차 검토 누락. PM이 짚어줘야만 격차 발견 패턴 반복.

**PM 결정 (2026-05-07)**: A (부분 폐기) + C (PM 능동 짚기 의존) 결합:
- Task 2·3·4 산출물 직접 삭제 완료
- Task 1 (PI 카탈로그) + brainstorming design doc 보존
- Task 2 재진행 시점부터 *내 자율 진행 정지* — PM이 본질 영역 직접 짚기
- 매 step PM 검토 통과 후 다음 진행 (자율로 다음 step 진행 X)

**진행 원칙**:
1. PM이 *Task별 본질 영역 명시* — 어떤 자료 / 어떤 격차 / 어떤 정정 방향
2. 짚어준 영역만 *정확히* 검토 + 자가 점검 + PM 보고
3. 본질 우회·일반화·과도한 확장 금지 — PM 짚는 영역 외 자율 결정 금지
4. 격차 발견 시 즉시 PM 보고 + PM 결정 대기 (Approach C 정합)
5. 4 산출물 (PRD/TR/UX/P) *동일 격차 통합 검토* 의무 — Task 2부터 적용

---

## File Structure

### 신규 산출물 (M16 진행 결과)

| Task | 산출물 | 본질 |
|------|--------|------|
| [1] | `_design/M16_pm-intent-catalog.md` | PM 의도 SSoT (PI-NNN 카탈로그) |
| [2] | `_design/M16_existing-design-review.md` | 기존 누적 6 카테고리 검토 결과 |
| [3] | `_design/M16_alignment-matrix.md` (또는 [2] 안에 통합 섹션) | PM 의도 ↔ 기존 누적 대조 매트릭스 (정합/부정합/누락/잉여 분류) |
| [4] | `_design/M16_essence-redesign-design.md` | 재설계 spec (PRD·TR·UX·P 본질 + workflow + 헌법·Skill·에이전트 정의 재설계) |
| [5] | `_design/M16_essence-redesign-plan.md` | *적용 plan* (실 변경 task + bite-sized step) |

### 수정 대상 ([5] 적용 plan에서 정의될 변경 묶음 — 본 진행 plan 범위 외)

[5] 산출물 적용 시점에 다음 영역이 갱신될 수 있음 (현재 식별된 후보):
- `CLAUDE.md` §1~§13 — 본질 정합 갱신
- `.claude/skills/{prd-draft, tech-review, ux-spec, publisher-html, notion-sync, weekly-status}/{SKILL, template, checklist}.md` (6 Skill)
- `.claude/agents/{service-planner, tech-reviewer, ux-planner, publisher, notion-manager}.md` (5 에이전트)
- `.claude/commands/kickoff.md` (+ 신설 Slash 가능성)
- `.claude/settings.json` + `.claude/hooks/`
- `_FOLLOWUP.md` 정리

**본 *진행 plan*은 Task 1~5만 정의**. 변경 묶음 정확한 step은 [5] 적용 plan에서 정의됨.

---

## Task 1: PM 의도 카탈로그 작성 (M16 [1])

**Files:**
- Create: `_design/M16_pm-intent-catalog.md`
- Reference: `_design/M16_essence-redesign-brainstorming.md` §2 (PM 의도 14건)
- Reference: `MEMORY.md` + `memory/feedback_*.md` + `memory/project_*.md` (PM 피드백 누적)

**목표**: PM 의도 14건 + 누적 PM 피드백 통합 정형화 카탈로그. SSoT 기준.

- [ ] **Step 1.1: brainstorming design doc §2 14건 정리**

`_design/M16_essence-redesign-brainstorming.md` §2 PM 의도 14건을 카탈로그 형식 변환. 각 의도마다 다음 6 필드:
- PI ID (`PI-001`~`PI-014`, PM Intent 영역별 시퀀스)
- 카테고리 (산출물 본질 / 매핑 SSoT / ID 체계 / PRD 본문 구조 / 자율 결정 영역 / 하네스 구조 등)
- PM 원문 (PM 발화 그대로 — §0 PM 원본 보존 정신 정합)
- 정형화 표현 (1~2 문장)
- 영향 영역 (CLAUDE.md §·Skill·에이전트·산출물 등)
- 검증 가능성 (산출물 형식 / 동작 검증 / PM 명시 결정 등)

- [ ] **Step 1.2: 메모리 누적 PM 피드백 식별**

`MEMORY.md` 인덱스 → `memory/feedback_*.md` + `memory/project_*.md` 전수 읽기:
- M9~M15 진행 중 누적된 PM 피드백 식별
- 본 brainstorming 14건과 *중복* 항목 = 통합 (PM 원문 추가)
- *추가* 항목 = 신규 ID 부여 (`PI-015`~)
- *부정합* 항목 (이전 결정 vs 본 brainstorming 격차) = Decision Log 기록 → 본 brainstorming 정의 우선

- [ ] **Step 1.3: 카탈로그 파일 작성**

`_design/M16_pm-intent-catalog.md` 생성. 구조:

```markdown
# M16 — PM 의도 카탈로그 (PI-NNN)

> 본 카탈로그는 BN시스템 IT 기획팀 하네스의 *PM 의도 SSoT*. M16 [2] 기존 누적 검토 + [3] 대조의 *기준*. Approach C 정신 정합 — 신규 의도 발견 시 본 카탈로그 갱신 (역행 갱신 허용).

## 작성 근거

- 본 brainstorming (`_design/M16_essence-redesign-brainstorming.md` §2 14건)
- 메모리 누적 PM 피드백 (`memory/feedback_*.md` + `memory/project_*.md`)

## 카탈로그

| PI ID | 카테고리 | PM 원문 | 정형화 표현 | 영향 영역 | 검증 가능성 |
|-------|---------|---------|-------------|-----------|-------------|
| PI-001 | 산출물 본질 | "PRD = 요구사항정의서 아닌가? 그럼 상세 내용을 써야 되는게 아닌지" | PRD 본질 = 요구사항 정의서 (비전 문서 아님). 본문에 요구사항 1건당 16 필드 상세 명세 | CLAUDE.md §5 산출물 정의 / Skill prd-draft / 에이전트 service-planner | 산출물 형식 검증 (BN 16 필드 필수 13 채움 + 자가 점검) |
| PI-002 | ... | ... | ... | ... | ... |
...

## 카탈로그 운영 원칙

- ID 결번 허용 (M10 §1-2-2 정합)
- 신규 발견 의도는 다음 시퀀스로 추가
- 폐기·변경 시 Decision Log 기록 (본 카탈로그 머리에 별도 섹션)
- 카탈로그가 SSoT — M16 spec/plan은 본 카탈로그를 참조

## Decision Log

- (2026-05-07) M16 [1] 진행 중 본 카탈로그 신설 — PM 본질 지적("전면 수정")으로 M16 진입에 따른 의도 정형화
```

- [ ] **Step 1.4: 자가 점검 (5 항목)**

검증 항목:
- (a) 본 brainstorming 14건 + 메모리 추가 항목 모두 카탈로그 등록 ✓
- (b) ID 중복 0건 ✓
- (c) 카테고리별 정리 (산출물 본질·매핑·ID·PRD 본문·자율 결정·하네스 구조 등) ✓
- (d) 영향 영역 누락 0건 (각 항목당 최소 1 영역 명시) ✓
- (e) 검증 가능성 누락 0건 ✓

자가 점검 결과 카탈로그 머리 §자가 점검 섹션에 N/5 기록.

- [ ] **Step 1.5: PM 검토 게이트 — Task 1 완료 보고**

§11 4블록 형식:
```
[M16 Task 1] PM 의도 카탈로그 작성 완료
- 산출물: _design/M16_pm-intent-catalog.md
- 자가 점검: N/5
- 카탈로그 항목: PI-001~PI-NN (N건)
- 다음 권장: Task 2 (기존 누적 검토) 진입 또는 PM 추가 의도 발견 시 카탈로그 갱신
```

PM 검토 결과:
- (a) 승인 → Step 1.6 (commit) → Task 2 진입
- (b) 추가 의도 명시 → 카탈로그 갱신 (Step 1.3 재진입) → 재검토
- (c) 의도 표현 정정 → 정정 → 재검토

- [ ] **Step 1.6: 작업 단위 stage (commit은 plan 묶음 시점)**

PM 승인 시점에 *현재 작업 stage 보존*. 본 plan 전체 commit은 Task 5 완료 후 묶음 (PM 결정 (b) 정합).

stage 마커: 본 plan 머리 갱신 — "Task 1 ✓ PM 승인 (YYYY-MM-DD)"

---

## Task 2: 기존 누적 검토 (M16 [2]) — 재진행

**상태**: 1차 진행분 폐기 (2026-05-07 — 피상적 검토 사유). 재진행 진입 대기 (PM 본질 영역 짚기 대기).

**Files (재진행 시 신설)**:
- Create: `_design/M16_existing-design-review.md`

**대 단계 정의** (세부 step은 PM 짚는 영역 정합):

1. **4 산출물 통합 본질 검토 의무** (1차 진행분 누락 영역)
   - PRD: prd-draft template/checklist *본문* 모두 읽기
   - TR: tech-review template/checklist *본문* 모두 읽기
   - UX: ux-spec template/checklist *본문* 모두 읽기
   - P: publisher-html template/checklist *본문* 모두 읽기
   - = 4 산출물 *동일 격차* 시스템적 검토

2. **PM이 Task 2 진입 시점에 본질 영역 짚기**:
   - 어떤 자료를 어디까지 검토?
   - 어떤 격차에 집중?
   - 추가 PI 등록 영역?
   - PM 짚지 않은 영역 검토 X

3. **매 step PM 검토 통과 후 진행**:
   - step 단위 PM 보고
   - PM 본질 정정 발화 시 즉시 정정
   - 자율로 다음 step 진행 X

**Reference 자료** (PM 짚기 정합으로 활용):

| 카테고리 | 자료 |
|---------|------|
| (a) 산출물 본질 (4 산출물 통합) | `.claude/skills/{prd-draft, tech-review, ux-spec, publisher-html}/{SKILL.md, template.md, checklist.md}` 12 파일 + `_archive/v2/mensa-ranking-challenge-v2/{01-prd, 02-tech-review, 03-ux-spec}.md` + `04-prototype-mvp/README.md` |
| (b) workflow | `CLAUDE.md` §4·§4-0·§4-11 + `_design/M9_deliverable-structure.md` (≈1985줄) |
| (c) 헌법 | `CLAUDE.md` §1~§13 전수 |
| (d) Skill | 위 (a) 4건 + `.claude/skills/{notion-sync, weekly-status}/` 2건 |
| (e) 에이전트 | `.claude/agents/{service-planner, tech-reviewer, ux-planner, publisher, notion-manager}.md` 5건 + `.claude/commands/kickoff.md` |
| (f) 시행착오 | `_FOLLOWUP.md` 전체 + `_design/M14_session_resume.md` |

**목표**: 4 산출물 동일 격차 + 6 카테고리 검토 → 각 결정의 *근거 추출*. M16 [3] 대조의 입력 자료. **PM 짚기 정합으로 진행** — 자율 결정 X.

- [ ] **Step 2.1: (a) 산출물 본질 검토**

검토 항목:
- 현 PRD 7 섹션 정의 (WHY·페르소나·성공 지표·MoSCoW·시나리오·제약·오픈 이슈) ↔ 본질 = 요구사항 정의서. 격차 인식
- 현 TR template 7 섹션 (TL;DR·Must 전수·아키텍처·리스크·외부 의존·공수·오픈 이슈) ↔ 요구사항 ID 단위 평가 정합 여부
- 현 UX template 6 섹션 (화면 목록·화면 명세·공통 컴포넌트·네비·접근성·오픈 이슈) ↔ 화면 ↔ 요구사항 ID 매핑 정합
- 현 P (퍼블리셔) 골격 (pages/·assets/·README.md) ↔ P-NNN ↔ REQ ID 매핑 정합

각 산출물 정의의 *결정 근거*까지 식별 (M9·M11·M13 어디서 결정?).

- [ ] **Step 2.2: (b) workflow 검토**

검토 항목:
- §4-0 Mesh 5요소 (M15 적용분, `8978063` commit) — 5요소 정의 + 근거
- §4 [1]~[5] 단계 (M15 적용분) — 단계 정의 + Mesh 본질 정합
- §4-11 Agent Teams 매핑 (M14 적용분)
- M9 §10-2-2 자가 점검 8필드 + M11 v1
- M9 §9-4 cross-ref 카탈로그 (F-1~F-8 + M-a~M-e)

- [ ] **Step 2.3: (c) 헌법 §1~§13 전수 검토**

§1 팀 구성 → §13 Skill routing까지 13 §. 각 §의 *결정 근거* + *PM 의도 정합 후보 검증*. 표 형식 정리.

- [ ] **Step 2.4: (d) Skill 6건 검토**

각 Skill의 SKILL.md + template.md + checklist.md 본문 검토. Skill 본질 vs PM 의도 정합 여부.

- [ ] **Step 2.5: (e) 에이전트 5건 + Slash 검토**

각 에이전트 정의 (M15 B-2~B-6 보강분 포함) + kickoff Slash (M15 B-1 재작성분) 검토.

- [ ] **Step 2.6: (f) 시행착오 검토**

`_FOLLOWUP.md` 4 분류 + `_design/M14_session_resume.md`:
- ① Skill 흡수 → M16 [3] 대조 시 PM 의도 정합 검증
- ② v1.1 이관 → 현재 시점 적용 여부 재평가 (격차 6 정정으로 일부 항목 v1 진입 가능성)
- ③ 운영 정련 → 임계값 조정 가능성
- ④ 폐기 → 폐기 결정 정합 검증

- [ ] **Step 2.7: 검토 결과 통합 → `_design/M16_existing-design-review.md` 작성**

구조:
```markdown
# M16 — 기존 누적 검토

> 본 검토는 M16 [2] 단계 산출물. 6 카테고리 전수 검토 결과 + 각 결정의 *근거* 추출. M16 [3] 대조 입력 자료.

## (a) 산출물 본질
| 항목 | 현 정의 | 결정 근거 (M-시리즈 출처) |
|------|---------|--------------------------|
| PRD 7 섹션 | ... | M9 §1·§3 / M13 ... |
| ... | ... | ... |

## (b) workflow
... (동일 표 형식) ...

## (c) 헌법 §1~§13
... (각 § 별 표) ...

## (d) Skill 6건
... ...

## (e) 에이전트 5건 + Slash
... ...

## (f) 시행착오
... ...

## 결정 근거 분류

| 근거 유형 | 의미 | 처리 (M16 [3]) |
|-----------|------|----------------|
| PM 명시 결정 | PM이 직접 결정한 항목 | 보존 (PM 의도 정합 우선) |
| M-시리즈 누적 결정 | 운영 정련 결과 | M16 [3] 대조 시 정합 검증 |
| 외부 제약 (도구·실무 관행) | 현 도구 한계로 결정 | M16 [3] 대조 시 정합 검증 |
| 잠정값 | v1 잠정, 운영 정련 후 정련 | 본 시점 정련 가능 여부 검토 |
```

- [ ] **Step 2.8: 자가 점검 (4 항목)**

- (a) 6 카테고리 전수 검토 ✓
- (b) 각 항목 *결정 근거* 명시 ✓
- (c) 결정 근거 분류 (PM 명시/M-시리즈/외부 제약/잠정값) 모두 적용 ✓
- (d) 누락 영역 0건 (자료 위치별 검증) ✓

- [ ] **Step 2.9: PM 검토 게이트**

§11 4블록 + 검토 결과 옵션 3가지 (승인 / 추가 검토 영역 명시 / 정정).

- [ ] **Step 2.10: 작업 단위 stage**

본 plan 머리 갱신 — "Task 2 ✓ PM 승인 (YYYY-MM-DD)"

---

## Task 3: PM 의도 ↔ 기존 누적 대조 (M16 [3])

**Files:**
- 입력: `_design/M16_pm-intent-catalog.md` + `_design/M16_existing-design-review.md`
- Create: `_design/M16_alignment-matrix.md` (또는 `_design/M16_existing-design-review.md` 안 §대조 매트릭스 섹션 통합)

**목표**: PM 의도 ↔ 기존 누적 대조 → 정합/부정합/누락/잉여 4 분류. M16 [4] 재설계 spec의 입력.

- [ ] **Step 3.1: 대조 매트릭스 작성**

표 형식:

| PI ID | PM 의도 | 기존 누적 (관련 항목) | 분류 | 처리 권장 |
|-------|---------|---------------------|------|-----------|
| PI-001 | PRD = 요구사항 정의서 | 현 PRD 7 섹션 (비전 문서 형식) — M9 §1 결정 | **부정합** | 재설계 (PRD 본문 = 16 필드 카탈로그) |
| PI-002 | BN 16 필드 양식 | 부재 | **누락** | 신설 (PRD template 신설) |
| ... | ... | ... | ... | ... |

각 PI ID마다 1행 (또는 다수 행 — 영향 영역 다수 시).

- [ ] **Step 3.2: 정합 분류 (보존 결정)**

PM 의도와 기존 결정이 *일치*하는 항목. 보존. 대조 매트릭스 §A.

- [ ] **Step 3.3: 부정합 분류 (재설계 결정)**

PM 의도와 기존 결정이 *충돌*하는 항목:
- (i) 결정 근거가 *다른 PM 의도* 정합인 경우 → 재검증 (PM 결정 우선순위 평가)
- (ii) 결정 근거가 *외부 제약*인 경우 → 외부 제약 현황 재평가 (도구 한계 해소 여부)
- (iii) 결정 근거가 *M-시리즈 누적*인 경우 → 폐기/갱신 결정

대조 매트릭스 §B.

- [ ] **Step 3.4: 누락 분류 (신설 결정)**

PM 의도가 기존에 *미반영*인 항목. 신설 — Task 4 재설계 spec에서 정의. 대조 매트릭스 §C.

- [ ] **Step 3.5: 잉여 분류 (폐기 검토)**

기존 결정이 PM 의도와 *무관·부담*인 항목:
- 결정 근거가 *다른 PM 의도* 정합 → 보존 (잉여로 보였으나 실은 정합)
- 결정 근거가 부재·약함 → 폐기 검토 (PM 명시 결정 필요)

대조 매트릭스 §D.

- [ ] **Step 3.6: M15 적용분 정합 검증 (특화 처리)**

M15 commit `8978063` 적용분 (CLAUDE.md §4-0 + §4 본문 + §6 + §10 + §11) + Group B 보류분 (Slash 재작성 + 5 에이전트 보강 + prd-draft Skill 보강) 정합 검증:
- 정합 → 보존
- 부정합 → 갱신/폐기 (Task 4·5에서 변경 정의)

대조 매트릭스 별도 섹션 §E (M15 적용분 검증).

- [ ] **Step 3.7: 자가 점검 (5 항목)**

- (a) 모든 PI ID 대조 ✓
- (b) 4 분류 (정합/부정합/누락/잉여) 모두 등장 ✓
- (c) M15 적용분 정합 검증 ✓
- (d) 결정 근거 추적 가능 ✓
- (e) Task 4 입력으로 사용 가능 (모호 0건) ✓

- [ ] **Step 3.8: PM 검토 게이트 + 작업 단위 stage**

---

## Task 4: 재설계 spec 작성 (M16 [4])

**Files:**
- Create: `_design/M16_essence-redesign-design.md`
- 입력: Task 3 대조 매트릭스

**목표**: PM 의도 정합 *하네스 구조 본질* spec. M16 [5] 적용 plan의 입력.

- [ ] **Step 4.1: spec 머리 (배경·목표·범위)**

섹션:
- §1 배경 (M14·M15 누적 + 격차 6 + PM 본질 지적)
- §2 목표 (PM 의도 14건+ 정합 하네스 구조)
- §3 범위 (포함/제외 영역)

- [ ] **Step 4.2: §4 산출물 본질 재설계**

PM 의도 PI-001~PI-009·PI-013 정합:
- PRD 본질 = 요구사항 정의서 (§0 PM 원본 + §A 비전 + §B 카탈로그 + §C 표준 패턴 + §D 오픈 이슈 + §E 자가 점검)
- TR 본질 (요구사항 ID 단위 평가 정합)
- UX 본질 (화면 ↔ REQ ID 매핑 + 화면 단위 구조)
- P 본질 (P-NNN ↔ REQ ID + HTML 상단 주석 SSoT 갱신)
- 기능명세서 (필요시 별도 산출물 — `01b-functional-spec.md` 옵션)

- [ ] **Step 4.3: §5 ID 체계 재정의**

PI-004 정합:
- REQ: `REQ-{도메인 2~4글자}-{NNN}-{NN}` 4 segment
- TR/S/P: 영역별 독립 시퀀스 그대로
- 매핑 SSoT = REQ ID
- M9 §9-4 cross-ref 정규식 갱신 (`^REQ-[A-Z]{2,4}-\d{3}-\d{2}$`)
- M10 §1-2-2 결번 허용·재사용 금지 정신 보존

- [ ] **Step 4.4: §6 자율 결정 영역 정의**

PI-010·PI-011·PI-012·PI-013 정합:
- 표준 패턴 자율 허용 (로그인·회원가입·세션·CRUD UI·이메일 발송) — §C 섹션 1줄 기록
- 경계 사례 PRD 명시 의무 (SSO·결제·2FA·이미지 업로드)
- 특정 로직 PM 추가 질의 (결제 흐름·도메인 로직)

- [ ] **Step 4.5: §7 workflow 재설계**

M14 Agent Teams + M15 Mesh 5요소 + 격차 6 정정 통합:
- 4명 동시 spawn (M15 §4-0 (i))
- 부분 broadcast 연속 흐름 (§4-0 (ii))
- 양방향 reply multi-hop (§4-0 (iii))
- 자가 점검 = 완성 검증 (§4-0 (iv))
- 모든 영역 병렬·유기 (§4-0 (v))
- 격차 6 정정 — PRD 자체가 4 에이전트 기준 SSoT (자율 결정 우회 근본 정정)

- [ ] **Step 4.6: §8 헌법 §1~§13 재정렬**

기존 §1~§13 정합 검증 (Task 3 §C 누락·§D 잉여 처리). 갱신/신설/폐기 결정.

- [ ] **Step 4.7: §9 Skill 6건 재설계**

각 Skill SKILL.md + template.md + checklist.md 본질 재설계. 특히 prd-draft (격차 6 정정 핵심).

- [ ] **Step 4.8: §10 에이전트 5건 + Slash 재설계**

각 에이전트 정의 + kickoff Slash 본질 재설계.

- [ ] **Step 4.9: §11 settings·hook 재설계**

PreToolUse hook + 권한 정책 정합 검증.

- [ ] **Step 4.10: §12 통과 기준 + 검증 시나리오**

- 통과 기준 — Task 3 분류 4 카테고리 모두 처리 + PM 의도 14건+ 모두 spec 반영
- 검증 시나리오 — M16 적용 후 신규 /kickoff 진행 시 PM 의도 정합 검증 가능 항목

- [ ] **Step 4.11: 자가 점검 (6 항목)**

- (a) PM 의도 14건+ 모두 spec 반영 ✓
- (b) Task 3 4 분류 모두 처리 ✓
- (c) 산출물·workflow·헌법·Skill·에이전트·Slash·settings 7 영역 재설계 ✓
- (d) M15 적용분 정합 처리 (보존/갱신/폐기 명시) ✓
- (e) 검증 시나리오 ≥ 3건 ✓
- (f) 모호·placeholder 0건 ✓

- [ ] **Step 4.12: PM 검토 게이트 + 작업 단위 stage**

---

## Task 5: 적용 plan 작성 (M16 [5])

**Files:**
- Create: `_design/M16_essence-redesign-plan.md`
- 입력: Task 4 재설계 spec

**목표**: M16 [4] 재설계 spec → 실 변경 작업 plan (bite-sized step).

- [ ] **Step 5.1: plan 머리 (Goal·Architecture·Tech Stack)**

writing-plans Skill 정신 정합 헤더. *적용 plan*은 *진행 plan*과 다름 — 코드 변경 작업.

- [ ] **Step 5.2: 변경 묶음 식별**

Task 4 spec → 변경 영역 매트릭스:
- 헌법 변경 N건
- Skill 갱신 N건
- 에이전트 정의 갱신 N건
- Slash 갱신 N건
- 산출물 template/checklist 갱신 N건
- settings·hook 변경 N건
- 신설 산출물 (필요시 — 기능명세서 등) N건

- [ ] **Step 5.3: Group 분해**

병렬 가능 영역 + 의존성 영역 분리:
- Group A: 헌법 본문 갱신 (단일 파일 — 직렬)
- Group B: Skill·에이전트 정의 갱신 (병렬 가능)
- Group C: Slash·settings·hook (병렬 가능)
- Group D: 산출물 template/checklist (병렬 가능)
- Group E: Codex Gate C advisory (안전 게이트)
- Group F: 검증 시나리오 (예: 신규 /kickoff 진행)

- [ ] **Step 5.4: 각 Group의 task + step 정의 (bite-sized)**

각 변경마다 writing-plans Skill 정신 정합:
- Files (Create/Modify/Test 명시)
- Step (작성 → 검증 → 자가 점검 → commit) 4~6 단계
- 코드 step은 *완전한 코드* 명시 (placeholder 금지)

- [ ] **Step 5.5: 통과 기준 + 검증 시나리오**

- 모든 변경 묶음 적용 완료
- Codex Gate C advisory 통과 또는 PM 오버라이드
- 신규 시행착오 ≥ 1건 등록 (`_FOLLOWUP.md` ②)
- 검증 시나리오 (신규 /kickoff) 통과

- [ ] **Step 5.6: 자가 점검 (5 항목)**

- (a) Task 4 spec 모든 변경 항목 → plan 변환 ✓
- (b) bite-sized step (각 step 2~5 분 단위) ✓
- (c) placeholder 0건 ✓
- (d) Files 경로 정확 ✓
- (e) 의존성·병렬 가능성 명시 ✓

- [ ] **Step 5.7: PM 검토 게이트**

§11 4블록 + 옵션:
- (a) 승인 → Task 5 산출물 = M16 *적용 plan* → 적용 진입 (별도 sub-step)
- (b) 정정 → plan 갱신 → 재검토

- [ ] **Step 5.8: 묶음 commit (M16 진행 plan + 5 Task 산출물 모두)**

PM 결정 (b) 정합 — Task 1~5 + 본 진행 plan + brainstorming design doc + 아카이브 작업 모두 묶음 commit:

```bash
git add -A  # 모든 변경 (수정 + 신규 + 이동)
git commit -m "feat(M16): 하네스 구조 본질 재설계 진입 — brainstorming + 5단계 진행 plan + 아카이브 (M15 design + 멘사 v2)

- _design/M16_essence-redesign-brainstorming.md 신설 (접근 방식 메타 design)
- _design/M16_progress-plan.md 신설 (5단계 진행 plan)
- _design/M16_pm-intent-catalog.md 신설 (PM 의도 SSoT)
- _design/M16_existing-design-review.md 신설 (6 카테고리 검토)
- _design/M16_alignment-matrix.md 신설 (정합/부정합/누락/잉여 분류)
- _design/M16_essence-redesign-design.md 신설 (재설계 spec)
- _design/M16_essence-redesign-plan.md 신설 (적용 plan)
- _design/_archive/M15/ 이동 (M15 design 3건)
- _archive/v2/mensa-ranking-challenge-v2/ 이동 (멘사 v2 11 파일)
- projects/_INDEX.md 갱신 (활성 0건 + 아카이브 2건 표)
- _FOLLOWUP.md ② 격차 항목 추가

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## 통과 기준 (M16 진행 plan 전체)

- [ ] Task 1 PM 의도 카탈로그 PI-NN건+ 등록
- [ ] Task 2 기존 누적 6 카테고리 전수 검토
- [ ] Task 3 대조 분류 (정합/부정합/누락/잉여) + M15 적용분 정합 검증
- [ ] Task 4 재설계 spec PM 승인
- [ ] Task 5 적용 plan PM 승인
- [ ] 모든 Task PM 검토 게이트 통과
- [ ] 신규 시행착오 ≥ 1건 등록 (`_FOLLOWUP.md` ②)
- [ ] M16 진행 plan + 산출물 묶음 commit (Task 5.8)

## 중단 조건

- PM 명시 정지
- Task 진행 중 본질 격차 추가 발견 시 — Approach C 정신 정합으로 *역행 갱신*:
  - PI 카탈로그 갱신 → Task 2 영향 영역 재검토 → ... → 진행 plan 자체도 갱신 가능
  - 무한 사이클 방지: PM 마감 결정 시점에 종료
- 도구 한계로 30분 이상 차단 → PM 보고 + 옵션 제시 (M14 동일 패턴)

## 다음 단계 (Task 5 완료 후)

Task 5 산출물 = `_design/M16_essence-redesign-plan.md` (*적용 plan*).

본 plan은 *진행 plan*이고, [5] 산출물 plan은 *적용 plan*. 적용 plan 진행은 별도 sub-step:

1. M16 적용 plan PM 승인 (Task 5.7)
2. 묶음 commit (Task 5.8)
3. 적용 plan 진입 — Group A·B·C·D 적용 + Group E (Gate C) + Group F (검증)
4. 적용 plan 완료 후 — 신규 슬러그(멘사 v3 등)로 검증 운영
5. M16 종료 + 인수인계 (`_design/M16_session_resume.md`)

---

## Self-Review (writing-plans Skill 정합)

### 1. Spec coverage

`_design/M16_essence-redesign-brainstorming.md` 모든 §:
- §1 진입 동기 → Task 4 §1 (배경) 매핑 ✓
- §2 PM 의도 14건 → Task 1 (PM 의도 카탈로그) 입력 ✓
- §3 재설계 절차 5단계 → Task 1~5 매핑 ✓
- §4 M15 처리 → Task 3 Step 3.6 (M15 적용분 정합 검증) ✓
- §5 다음 단계 → 본 progress-plan = §5 진입 결과 ✓
- §6 자가 점검 → Task 1~5 각 자가 점검 step 매핑 ✓

격차 0건.

### 2. Placeholder scan

스캔 결과:
- "TBD" 0건 ✓
- "TODO" 0건 ✓
- "implement later" 0건 ✓
- "Add appropriate ..." 0건 ✓
- "Similar to Task N" 0건 ✓
- 각 Task의 step에 *행동 명시* + *검증 방법* + *PM 게이트* + *stage 마커* ✓

단 본 plan은 *문서 작성 plan*이므로 코드 step의 *완전한 코드* 강제는 부분 적용. 대신 *각 산출물의 정확한 구조*를 step에 명시 (예: 카탈로그 6 필드, 대조 매트릭스 5 컬럼).

### 3. Type consistency

- PI ID 형식 `PI-NNN` 일관 ✓
- Task ID `Task 1`~`Task 5` 일관 ✓
- 산출물 경로 `_design/M16_*.md` 일관 ✓
- M15 적용분 commit `8978063` 일관 ✓
- 자가 점검 항목 수 (Task 1=5, Task 2=4, Task 3=5, Task 4=6, Task 5=5) 일관성 — Task별 작업 복잡도에 따라 다름 ✓

격차 0건.

### Self-Review 결과

✓ Spec coverage 통과
✓ Placeholder scan 통과
✓ Type consistency 통과

진행 가능 — PM 검토 게이트 진입.
