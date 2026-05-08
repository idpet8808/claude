# M17 세션 종료 인수인계 (2026-05-08)

> 다음 세션 시작 시 **이 파일 1개만 읽으면 재개 가능**.

---

## 본 세션 종료 시점 (2026-05-08)

본 세션에 M17 — 6건 구조 격차 정정 sub-step 완료. PI-020~PI-025 정합 + Codex Gate C advisory 3차 통과 + PM 묶음 commit 결정. 다음 세션 진입 영역 = 멘사 v3 검증 또는 운영 정련.

---

## 본 세션 결과 종합

### M14·M15·M16·M17 진행 흐름

- **M14** (2026-05-06): §4-11 Agent Teams 적용 + (d) 4중 신뢰성 보장 신설 (`8c486e1`)
- **M15** (2026-05-06): Mesh 본질 정정 — §4-0 5요소 신설 (`8978063`)
- **M16** (2026-05-07): 하네스 구조 본질 재설계 — PRD 본질 정정 + UI ID 통합 + 자율 결정 영역 분류 (`ae2ba07`)
- **M17** (2026-05-08): 6건 구조 격차 정정 — PRD §B Use Case 분해 + brainstorming 자동 발화 + broadcast 양쪽 의무 + Teammate idle·정지 의무 통합 (M17 commit hash 진행 중)

### M17 진입 본질

M16 commit 직후 멘사 v2.0 검증 sub-step (2026-05-07)에서 **9건 격차** 발견. 그 중 6건이 *구조 영역* — 운영 정련만으로 정합 불가, 헌법·Skill·에이전트·settings.json 본질 보강 필요.

| # | 격차 | 본질 영역 |
|---|------|-----------|
| A | PRD §B 분해 깊이 미흡 | prd-draft Skill / checklist에 분해 깊이 가이드·자가점검 부재 |
| B | brainstorming 자동 호출 X | sub-step 진입 시 brainstorming hook 부재 (메모리만 존재, 실 발화 X) |
| C | broadcast 양쪽 의무 미발현 | SKILL.md / 에이전트 §2 "또는"으로 정의 (양쪽 의무 미명시) |
| D | idle self-stop 메커니즘 부재 | 에이전트 정의에 redundant peer message 자제 + silent idle 패턴 부재 |
| E (재정의) | Teammate 자동 재활성화 차단 | 작업 완료 후 자율 재시작 차단 메커니즘 부재 |
| F | stop signal 효과 한계 | controller stop 무시 + 작업 완성 자율 결정 |

**D·E·F 통합 본질** = **Teammate idle·정지 의무** (active work + idle·stop 양쪽 정의 본질).

---

## PM 의도 catalog (PI-020~PI-025)

상세는 `_design/M17_6deficits-brainstorming.md` 참조. 핵심 요약:

| PI | 카테고리 | 본질 |
|----|---------|------|
| PI-020 | PRD 본문 구조 | PRD §B NN 분해 단위 = Use Case (사용자/시스템 동작 단위, "...할 수 있어야 함") |
| PI-021 | PRD ↔ 기능명세서 분담 | 16 필드 *세부내용 및 요건* = 동작 흐름 + 비즈니스 룰 (입력·출력·예외 = 기능명세서 위임) |
| PI-022 | 영역 본질 차등 | brainstorming 영역별 차등 의무 (service / tech / ux 항상 / publisher 의무 X) |
| PI-023 | broadcast 본질 | broadcast 양쪽 의무 (SendMessage + `_broadcast.log` 동시 — 보완 메커니즘) |
| PI-024 | Teammate 자율 결정 | Teammate idle·정지 의무 통합 (D·E·F) — active work + idle·stop 양쪽 정의 |
| PI-025 | sub-step 진입 메커니즘 | brainstorming 자동 호출 메커니즘 (에이전트 §2 + Skill SKILL.md + 헌법 §3 + settings.json hook 4중 정합) |

---

## M17 변경 영역 (14 파일 + 자연 흡수)

| 영역 | 파일 |
|------|------|
| 헌법 | `CLAUDE.md` (§3·§4·§4-0 (v)·§6 침범 금지·§6-2 통과 게이트·§9 안티 패턴) |
| 4 Skill (10 파일) | `prd-draft` (SKILL.md + checklist.md + template.md) / `tech-review` / `ux-spec` / `publisher-html` (각 SKILL.md + checklist.md) |
| 4 에이전트 | `service-planner` / `tech-reviewer` / `ux-planner` / `publisher` |
| Slash | `kickoff.md` (자연 흡수 — 자동 실패 4 → 5 일관성) |
| settings.json | PreToolUse on Agent matcher hook 신설 (한글명 매처 + grep 패턴 강화) |
| 운영 시행착오 | `_FOLLOWUP.md` (③ M17 운영 검증 + idle/stop hook 보강 검토 + matcher 동작 검증 3건 등록) |
| M17 design doc | `M17_6deficits-brainstorming.md` + `M17_progress-plan.md` |

---

## Codex Gate C advisory 통과 진행 (3차)

| 회차 | Background ID | 발견 | 결과 |
|------|---------------|------|------|
| 1차 | a0dd6d3b9c1ecf9f3 | 5건 (높음 1 + 중간 2 + 낮음 2) | PM 전체 수용 → 정정 적용 |
| 2차 | a5f8d45281991154c | 3건 (높음 1 + 중간 2) — CLAUDE.md §6-2 본질 영역 발견 | PM 전체 수용 → 정정 적용 |
| 3차 | a5e39f0c76414dae6 | 3건 (중간 1 + 낮음 2) — owner enum + 변경 이력 | **판정: 통과** + PM 결정 → 모두 정정 후 commit |

3차 판정 근거: 본질 격차 정정 보존 영역 (Gap A·B·C·D·E·F + M16 PI-001~PI-019) 보존 확인 + 잔존 형식적 영역만 정정.

---

## M17 commit 본문 (예상)

```
feat(M17): 6건 구조 격차 정정 — PRD Use Case 분해 + brainstorming 자동 발화 + broadcast 양쪽 의무 + Teammate idle·정지 의무 통합

- PI-020~PI-025 6 본질 신규 (M16 PI-001~PI-019 누적)
- 14 영역 변경 + 자연 흡수 1건 (kickoff.md)
- 헌법 §3·§4·§4-0 (v)·§6·§6-2·§9 갱신
- 4 Skill (SKILL.md + checklist.md + template.md) 갱신
- 4 에이전트 정의 §2 갱신
- settings.json PreToolUse on Agent matcher hook 신설 (한글명 매처 + grep `\s*:\s*` 강화)
- _design/M17_6deficits-brainstorming.md (design doc) + M17_progress-plan.md (plan) + M17_session_resume.md (인수인계)
- _FOLLOWUP.md ③ M17 운영 검증 + idle/stop hook + matcher 동작 검증 등록
- 격차 A: PRD §B NN 분해 단위 = Use Case (PI-020·PI-021)
- 격차 B: brainstorming 영역별 차등 의무 + 자동 발화 메커니즘 (PI-022)
- 격차 C: broadcast 양쪽 의무 (PI-023)
- 격차 D·E·F: Teammate idle·정지 의무 통합 (PI-024)
- Codex Gate C advisory 3차 통과 (1차 5건 → 2차 3건 → 3차 통과)
```

---

## 다음 세션 진입 영역

### 1. 멘사 v3 검증 (PM 시점에 진행)

PM이 새 `/kickoff 멘사코리아 랭킹챌린지_ver3.0 신주한` 호출 시점에:

- M17 정의대로 6건 격차 정정 본질 검증:
  - **Gap A**: PRD §B에 Use Case 단위 NN 분해 발현 (예: 결제 = `REQ-PAY-001-01` 결제 / `-02` 결제 조회 / `-03` 결제 취소). 1 NNN에 여러 Use Case 묶음 0건
  - **Gap B**: service-planner / tech-reviewer / ux-planner spawn 시 brainstorming 자동 invoke. settings.json hook stderr REMINDER 발화 동작 확인. publisher 미발화 확인
  - **Gap C**: 부분 broadcast 시 SendMessage + `_broadcast.log` 양쪽 evidence 확보. checklist U-5 evidence 검증
  - **Gap D**: 작업 중 redundant peer message 0건 (동일 broadcast 반복·ack/confirm 메아리·메아리 reply)
  - **Gap E**: 작업 완료 후 Teammate 자동 재활성화 0건 (controller·peer trigger만 활성화)
  - **Gap F**: PM stop signal 발행 시 즉시 정지 (작업 완성 자율 결정 X)
- M16 정의 동시 검증 (격차 1·2·3·4·5·6·7 보존)

활성 프로젝트 슬러그 = `mensa-ranking-challenge-v3` (예상). v2.0은 `_archive/v2-0/`로 이동 (또는 비교군 보존).

### 2. 운영 정련 영역 (M17 진행 중 발견)

`_FOLLOWUP.md` ②·③에 등록:

- M17 idle·stop hook 보강 검토 (v1.1 이관 — Teammate 행동 의무 hook 강제 어려움)
- M17 PreToolUse on Agent matcher subagent_type 동작 검증 (멘사 v3 실 발화 확인)
- JSON 포맷 변화 시 grep 취약성 — v1.1+ jq·yq 도입 검토
- subagent 환경 settings.json `ask` 권한 자동 거부 격차 (M17 진행 중 Codex 2차 SendMessage resume 시 발현 — `_FOLLOWUP.md` ② 기존 등재 영역)

### 3. 페이즈 2 정의 (v1.1+ 이관 — 그대로)

`_FOLLOWUP.md` ②: `/handoff` 명령 / 퍼블 Production 모드 / 백엔드 영역 / `04-prototype-prod/` / `05-backend/` / API 계약 정식화 / 페이즈 2 진입 게이트

---

## 주의·제약 (다음 세션 시작 시)

1. **§4-0 (v) 본문 보강 정합** — *active work + idle·stop 양쪽 정의*. 진행 상황 표 작성 시 D·E·F 통합 본질 인지 (controller·Teammate 양쪽 자기 검증 trigger)
2. **PM 5차 보장** (M15) — 모든 시점 §4-0 자기 검증. M17 진입 후 5차 보장에 *idle·stop 의무 통합* 자연 흡수
3. **PM 능동 짚기 의존 패턴 보강** — M16 session_resume에 등재된 패턴이 M17 brainstorming hook 신설 + controller turn 자기 검증 강화로 정정됨. 다음 세션 진행 중 본 패턴 회귀 여부 추적
4. **격차 발견 시 즉시 PM 보고** — 자율 결정 0건. M16·M17 진행 중 본 패턴 정착
5. **commit은 PM 명시 승인 필수** (CLAUDE.md §10) — 본 M17 commit도 PM 명시 결정으로 진행
6. **Codex Gate C** — 1차 통과 패턴: 새 Agent spawn (codex:codex-rescue subagent_type)이 가장 안정. SendMessage resume은 Bash 권한 차단 발생 가능 (M17 2차 발현)
7. **owner enum 통일** — `REQ/TR/UX/P` (M16 + M17 강화 — template.md / checklist.md 예시 정정 완료)
8. **§6-2 통과 게이트** — PRD 자동 실패 0/5 (M17 — A-5 Use Case 분해 신설). M16의 0/4는 폐기

---

## 참조 파일

| 파일 | 용도 |
|------|------|
| `CLAUDE.md` | 헌법 SSoT — M17 갱신 (§3·§4·§4-0 (v)·§6·§6-2·§9) |
| `_design/M17_6deficits-brainstorming.md` | M17 brainstorming 결과 (PI-020~PI-025 + 격차 정정 방향) |
| `_design/M17_progress-plan.md` | M17 12 task plan |
| `_design/M16_pm-intent-catalog.md` | M16 PM 의도 카탈로그 (PI-001~PI-019) — SSoT 보존 |
| `_design/M16_session_resume.md` | M16 인수인계 (M17 진입 배경 참조) |
| `_FOLLOWUP.md` | 운영 시행착오 누적 (M17 진입에 따라 ③ 3건 신규 등록) |
| `.claude/skills/{prd-draft,tech-review,ux-spec,publisher-html}/` | 4 Skill (M17 갱신) |
| `.claude/agents/{service-planner,tech-reviewer,ux-planner,publisher}.md` | 4 에이전트 정의 (M17 §2 갱신) |
| `.claude/settings.json` | M17 PreToolUse on Agent matcher hook 신설 |
| `.claude/commands/kickoff.md` | M17 자연 흡수 (자동 실패 4→5 일관성) |

---

## 다음 세션 첫 메시지 제안

```
_design/M17_session_resume.md 읽고 멘사 v3 검증 또는 운영 정련 진입.
PM 결정에 따라 /kickoff 신규 슬러그 호출 또는 _FOLLOWUP.md 정련 진입.
```

---

## 세션 마무리 메모 (2026-05-08)

- 본 세션 = M17 진입 (6건 구조 격차 정정) → 14 영역 변경 + 자연 흡수 1건 → Codex Gate C 3차 advisory → PM 명시 commit 결정 → 묶음 commit
- 변경 묶음: 헌법 5 + Skill 10 + 에이전트 4 + Slash 1 + settings 1 + design doc 2 + 인수인계 1 + _FOLLOWUP 1 = 25 파일 (M16 40 파일 대비 작은 scope)
- M17 sub-step 종료. 멘사 v3는 PM 신호 받은 시점에 별도 진입
- 추정 다음 세션 = 멘사 v3 검증 + 신규 시행착오 발견 등록 (`_FOLLOWUP.md` ②·③)

**다음 세션 시작점**: `_design/M17_session_resume.md` 1 파일만 읽으면 즉시 재개 가능.
