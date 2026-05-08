# M17 — 6건 구조 격차 정정 brainstorming (2026-05-08)

> **본 문서는 superpowers:brainstorming Skill 산출물** — design doc.
> sub-step 본질: M16 commit 후 멘사 v2.0 검증(2026-05-07)에서 발견된 9건 격차 중 *구조 영역 6건* 정정. 운영 정련만으로 정합 불가 — 헌법·Skill·에이전트 정의 본질 보강 필요.

---

## §1. 진입 배경

- M16 commit (`ae2ba07`, 2026-05-07): 하네스 구조 본질 재설계 — PRD 본질 정정 + UI ID 통합 + 자율 결정 영역 분류 (PI-001~PI-019)
- M16 직후 멘사 v2.0 검증 sub-step (slug=`mensa-ranking-challenge-v2-0`) 진행
- 검증 결과 9건 격차 발견 — 6건이 *구조 영역* (헌법·Skill·에이전트 정의 본질 격차)
- PM 진단 자료(이미지 표): "운영 정련만으로 정합 불가 — 헌법·Skill·에이전트 정의 본질 영역 보강 필요"
- 본 sub-step (M17) = 6건 구조 격차 정정 본질 진입

---

## §2. 6건 격차 본문 (PM 진단 표 정합)

| # | 격차 | 본질 영역 |
|---|------|-----------|
| A | PRD §B 분해 깊이 미흡 | prd-draft Skill / checklist에 분해 깊이 가이드·자가점검 부재 |
| B | brainstorming 자동 호출 X | sub-step 진입 시 brainstorming hook 부재. 메모리만 존재, 실 발화 메커니즘 X |
| C | broadcast 양쪽 의무 미발현 | SKILL.md / 에이전트 §2에 "`_broadcast.log` + SendMessage(team peers) 양쪽 의무" 명시 부족 |
| D | idle self-stop 메커니즘 부재 | 에이전트 정의에 "redundant peer message 자제 + silent idle" 패턴 부재 |
| E (재정의) | Teammate 자동 재활성화 차단 메커니즘 부재 | 작업 완료 후 자기 영역 자율 재시작·재진입 차단 명시 부재 |
| F | stop signal 효과 한계 | 4 Teammate가 controller stop 무시 + 작업 완성. Mesh 5요소 §4-0에 stop signal 즉시 정지 의무 부재 |

**D·E·F 통합 본질** = **Teammate idle·정지 의무**:

| 격차 | 시점 | Teammate 자율 결정 차단 본질 |
|------|------|-----------------------------|
| D | 작업 *중* | redundant peer message 자제 + silent idle |
| E | 작업 *완료 후* | 자동 재활성화 X (controller·peer trigger만 활성화) |
| F | controller *stop signal 시* | 즉시 정지 (작업 완성 자율 결정 X) |

---

## §3. PM 시각 본질 정정 (brainstorming 결과)

### 격차 A — PRD §B 분해 단위 본질

PM 본질: **"결제 / 결제 조회 / 결제 취소" 같은 사용자/시스템 동작 단위**. 입력·출력·예외·정합성 룰 같은 *로직 분해*는 **기능명세서(FN-NNN, 옵션 산출물 PI-005)** 영역.

| 산출물 | 분해 단위 | 예 (결제 도메인) |
|-------|---------|----------------|
| PRD §B NN | **사용자/시스템 동작 단위 = Use Case** ("...할 수 있어야 함") | 결제 / 결제 조회 / 결제 취소 (3 NN) |
| 기능명세서 (FN-NNN, 01b) | 동작 내부 로직 분해 = 입력·출력·예외·정합성 룰 | 결제 세션 생성→PG 콜백→DB 트랜잭션→실패 복구 등 |
| TR | 기술 구현 (스택·아키텍처·공수) | (별도) |

어제 v2.0 발현: 9 REQ 모두 NNN 단일, NN 미세 분해 0건. `REQ-PAY-001-01` = "결제" + "결제 조회" + "결제 취소"가 한 NNN에 묶임.

### 격차 B — brainstorming 영역별 차등 의무

PM 본질: **service-planner / tech-reviewer / ux-planner 항상 활성화**. publisher는 의무 X.

| 영역 | brainstorming 의무 | 근거 |
|------|------------------|------|
| service-planner | 항상 활성화 | 요구사항 본질 = PM과 도메인·Use Case 대화로 분해 깊이 확보 |
| tech-reviewer | 항상 활성화 | 아키텍처 옵션·기술 비교 탐색 |
| ux-planner | 항상 활성화 | 화면 설계 = 다양한 레이아웃·흐름 옵션 시뮬레이션 |
| publisher | 의무 X | UX 명세 그대로 매핑 (화면 가감 금지 — 영역 침범 안티 패턴) |

어제 v2.0 발현: service-planner spawn 직후 PRD 작성 진입 — brainstorming 자동 호출 X. PM이 `feedback_brainstorm_first` 위배 직접 지적 후에야 발견 (M16 session_resume "PM 능동 짚기 의존 패턴" 정합).

### 격차 C — broadcast 양쪽 의무 (OR → AND)

현재 정의 = "`SendMessage`(broadcast) **또는** `_broadcast.log` 8필드 기록" (CLAUDE.md §4 + 4 Skill).

PM 본질: **양쪽 의무**. `_broadcast.log`와 SendMessage는 **목적이 다른 보완 메커니즘**:
- `_broadcast.log` = **영구 기록** (M11 evidence·M9-5 cross-ref·디버깅 추적)
- SendMessage = **실시간 통지** (peer Teammate 즉시 reply 발행 trigger)

"또는"으로 정의되어 둘 중 하나만 발행 → *영구 기록 누락* 또는 *실시간 통지 누락*.

### 격차 D·E·F — Teammate idle·정지 의무 통합

PM 본질 (E 답변): "작업 완료 이후만 자동으로 에이전트들이 켜지지 않았으면". 즉 **Teammate 자율 결정으로 idle·정지·재활성화 결정 차단**.

§4-0 5요소 (i)~(v)는 *active work*만 정의. **idle·stop 본질 정의 0건** = 본 격차 6건 중 절반(D·E·F)의 근본 원인.

---

## §4. 격차별 정정 방향 (잠정 확정)

### 격차 A — PRD §B 분해 깊이 (a~f)

- (a) prd-draft SKILL.md에 **"NN 분해 단위 = Use Case (사용자/시스템 동작 단위, '...할 수 있어야 함')"** 본질 명시
- (b) 16 필드 *세부내용 및 요건* 필드 본질 명시 = **동작의 큰 흐름 + 비즈니스 룰** (입력·출력·예외 디테일은 기능명세서 위임)
- (c) checklist에 자가점검 추가 — *"각 NNN 내 Use Case 분리 확인"* (예: 결제/조회/취소가 1 NN에 묶이지 않았는가)
- (d) prd-draft Skill 진입 시 **brainstorming hook 활성화** + 종료 산출물 = "§B 등재 Use Case 카탈로그 목록" (격차 B와 통합)
- (e) **영역 침범 안티 패턴 추가** — service-planner는 *Use Case 단위 NN 분해*만, 입력·출력·예외 분해 필요 시 = 기능명세서 옵션 산출물 진입 제안 (PI-005 정합)
- (f) prd-draft SKILL.md / 에이전트 정의에 **PRD ↔ 기능명세서 분담 명시**

### 격차 B — brainstorming 영역별 차등 의무 (a~e)

- (a) **service-planner / tech-reviewer / ux-planner 에이전트 정의** §2 작업 절차 첫 단계에 의무 명시:
  > "spawn 직후 *자기 영역 산출물 작성 시작 전*에 superpowers:brainstorming 명시 invoke. 종료 산출물(Use Case 카탈로그 / 아키텍처 옵션 카탈로그 / 화면 옵션 카탈로그)을 자기 영역 Skill 입력으로 사용."
- (b) **prd-draft / tech-review / ux-spec Skill SKILL.md** §0 또는 §1.5에 brainstorming 사전 호출 의무 명문화
- (c) **CLAUDE.md §3 ①** "(자동)" 정정 → "(service-planner / tech-reviewer / ux-planner spawn 시 *자동 invoke*. publisher는 의무 X)"
- (d) **settings.json PreToolUse on Agent matcher** — 3 영역 subagent_type 매칭 시 stderr REMINDER 발화 (자동 trigger)
  - ⚠ matcher가 subagent_type까지 매칭 가능한지 hooks 스펙 검증 필요. 안 되면 hook 내부 stdin 입력 검사로 분기
- (e) publisher는 의무 X — 명시 (UX 명세 매핑 본질)

### 격차 C — broadcast 양쪽 의무 (a~e)

- (a) **CLAUDE.md §4 broadcast 원칙** "또는" → **"그리고 (양쪽 의무)"** 정정
- (b) **4 Skill SKILL.md** 부분 broadcast 트리거 표 정정 (양쪽 발행 명시)
- (c) **4 에이전트 정의 §2 작업 절차**에 양쪽 의무 명시 추가
- (d) **checklist self-check U-5 (evidence)** 강화 — "본 broadcast가 SendMessage + `_broadcast.log` 양쪽 발행 evidence 확보" 항목 명문화
- (e) **CLAUDE.md §9 안티 패턴** 추가 — "broadcast 한쪽만 발행 (영구 기록 누락 또는 실시간 통지 누락)" 등재

### 격차 D·E·F — Teammate idle·정지 의무 통합 (a~e)

- (a) **CLAUDE.md §4-0 (v) 본문 보강** — "모든 영역 병렬·유기"에 D·E·F 통합 본질 추가:
  > "각 영역은 자기 일 진행 계속. **Teammate idle·정지 의무 통합** (active work + idle·stop 양쪽 정의):
  > - **D — 작업 중**: silent idle. redundant peer message 자제 (동일 broadcast 반복·ack/confirm 메아리·메아리 reply 0건)
  > - **E — 작업 완료 후**: 자동 재활성화 X. 자기 영역 추가 작업·재시작 자율 결정 0건. controller·peer trigger만 활성화
  > - **F — controller stop signal 시**: 즉시 정지. 작업 완성 자율 결정 X"
- (b) **4 에이전트 정의 §2 작업 절차** — D·E·F 세 시점 통합 명시 (단계별 의무)
- (c) **CLAUDE.md §6 영역 침범 금지** 추가 — "Teammate 자율 재활성화·자율 작업 진행" (작업 완료 후 controller·peer trigger 없이 자기 영역 자율 재시작 결정 차단)
- (d) **CLAUDE.md §9 안티 패턴** 등재 — 3종:
  - "redundant peer message 발행 (동일 broadcast 반복·ack/confirm 메아리·의미 없는 reply)"
  - "Teammate 자동 재활성화 (작업 완료 후 자율 재시작)"
  - "controller stop signal 무시 + 작업 완성 (자율 결정)"
- (e) **운영 후 hook 보강 검토** — `_FOLLOWUP.md` ②에 등록 (v1.1+ idle/stop hook 검토)

---

## §5. 변경 영역 카탈로그 (M17 적용 영역)

| # | 영역 | 파일 | 변경 본질 | 격차 |
|---|------|------|----------|------|
| 1 | 헌법 §3 ① | `CLAUDE.md` | "(자동)" → "(3 영역 자동 invoke / publisher 의무 X)" | B |
| 2 | 헌법 §4 broadcast 원칙 | `CLAUDE.md` | "또는" → "그리고 (양쪽 의무)" | C |
| 3 | 헌법 §4-0 (v) | `CLAUDE.md` | idle·정지 의무 통합 보강 | D·E·F |
| 4 | 헌법 §6 | `CLAUDE.md` | "Teammate 자율 재활성화" 영역 침범 금지 추가 | E |
| 5 | 헌법 §9 | `CLAUDE.md` | 안티 패턴 4종 추가 (broadcast 한쪽 / redundant peer / 자동 재활성화 / stop 무시) | C·D·E·F |
| 6 | Skill prd-draft | SKILL.md / checklist.md / template.md | NN 분해 단위 + brainstorming 사전 의무 + broadcast 양쪽 + 기능명세서 분담 | A·B·C |
| 7 | Skill tech-review | SKILL.md / checklist.md | brainstorming 사전 의무 + broadcast 양쪽 | B·C |
| 8 | Skill ux-spec | SKILL.md / checklist.md | brainstorming 사전 의무 + broadcast 양쪽 | B·C |
| 9 | Skill publisher-html | SKILL.md / checklist.md | broadcast 양쪽 (brainstorming 의무 X) | C |
| 10 | 에이전트 service-planner.md | §2 작업 절차 | brainstorming 사전 + broadcast 양쪽 + idle·정지 의무 | A·B·C·D·E·F |
| 11 | 에이전트 tech-reviewer.md | §2 작업 절차 | brainstorming 사전 + broadcast 양쪽 + idle·정지 의무 | B·C·D·E·F |
| 12 | 에이전트 ux-planner.md | §2 작업 절차 | brainstorming 사전 + broadcast 양쪽 + idle·정지 의무 | B·C·D·E·F |
| 13 | 에이전트 publisher.md | §2 작업 절차 | broadcast 양쪽 + idle·정지 의무 (brainstorming 의무 X) | C·D·E·F |
| 14 | settings.json | hooks | PreToolUse on Agent matcher (3 영역 brainstorming reminder) | B |

---

## §6. PM 의도 catalog 갱신 (PI-020~PI-025 신규)

M16의 PI-001~PI-019 누적 + 본 sub-step에서 신규 6건:

| PI | 카테고리 | 본질 |
|----|---------|------|
| PI-020 | PRD 본문 구조 | PRD §B NN 분해 단위 = Use Case (사용자/시스템 동작 단위, "...할 수 있어야 함") |
| PI-021 | PRD ↔ 기능명세서 분담 | 16 필드 *세부내용 및 요건* = 동작 흐름 + 비즈니스 룰 (입력·출력·예외 디테일은 기능명세서 위임) |
| PI-022 | 영역 본질 차등 | brainstorming 영역별 차등 의무 (service / tech / ux 항상 활성화 / publisher 의무 X) |
| PI-023 | broadcast 본질 | broadcast 양쪽 의무 (SendMessage + `_broadcast.log` 동시 — 보완 메커니즘) |
| PI-024 | Teammate 자율 결정 | Teammate idle·정지 의무 통합 (D·E·F) — active work + idle·stop 양쪽 정의 |
| PI-025 | sub-step 진입 메커니즘 | brainstorming 자동 호출 메커니즘 (에이전트 정의 §2 + Skill SKILL.md + 헌법 §3 + settings.json hook 4중 정합) |

---

## §7. 검증 경로

- **M17 commit** → **멘사 v3 신규 진입** (별도 슬러그) — v2.0 _archive 이동
- 6건 격차 해소 확인:
  - A: PRD §B에 Use Case NN 분해 발현
  - B: service-planner / tech-reviewer / ux-planner spawn 시 brainstorming 자동 invoke
  - C: 부분 broadcast 시 SendMessage + `_broadcast.log` 양쪽 evidence 확보
  - D: 작업 중 redundant peer message 0건
  - E: 작업 완료 후 Teammate 자동 재활성화 0건
  - F: PM stop signal 발행 시 즉시 정지
- 새 격차 발견 시 `_FOLLOWUP.md` 등록 (M9~M12 운영 정련 정신 정합)

---

## §8. §11 헌법 변경 4블록 형식 적용 (변경 권장 영역)

본 design doc 자체는 brainstorming 산출물이지만, §5 변경 영역 카탈로그의 **헌법 변경 5건 (#1~#5)** 은 §11 헌법 변경 4블록 형식 적용 대상. writing-plans 단계에서 각 변경 영역에 대해 4블록 형식 작성:

```
1. 원 § 정의 인용 (변경 대상 본문)
2. 변경 부분 (어디를 어떻게)
3. 정당성 1줄 (왜 — 도구 한계 변명 금지)
4. PM 명시 승인 요청 (자의적 적용 금지)
```

§10 절대 규칙: 헌법 §·Skills·settings.json 본문 수정은 PM 명시 승인 필수.

---

## §9. spec self-review

### 1. Placeholder scan
- TBD·TODO·미완 항목 0건. 6건 격차 정정 방향 모두 잠정 확정 (PM 의도 정합 OK).

### 2. Internal consistency
- §3 PM 시각 본질과 §4 정정 방향이 정합 (격차별 PM 답변 직접 인용).
- §4 격차별 정정 방향과 §5 변경 영역 카탈로그가 정합 (각 격차의 (a)~(f) 모두 §5에 매핑).
- 격차 A의 (d) brainstorming hook 활성화는 격차 B 의존 — §4에서 "(격차 B와 통합)" 명시로 정합.
- D·E·F 통합 정정이 §4-0 (v) 본문 보강 1건으로 통합되어 변경 분산 X.

### 3. Scope check
- 6건 격차 묶음 sub-step (M17) — 단일 plan으로 진입 가능 scope.
- 변경 영역 14건 (헌법 5 + Skill 4 + 에이전트 4 + settings 1) — M16 (40 파일) 대비 작은 scope.
- 실 검증은 별도 sub-step (멘사 v3) — 본 plan scope 외.

### 4. Ambiguity check
- "subagent_type까지 매처 매칭 가능 여부" (§4 격차 B (d)) — writing-plans 단계에서 hooks 스펙 검증 후 결정 (안 되면 hook 내부 stdin 분기).
- 그 외 모호성 없음 — PM 결정한 옵션·본질 명확.

---

## §10. 다음 단계

1. **PM 리뷰 게이트** — 본 design doc 검토 후 변경 요청 또는 승인
2. **(승인 후) writing-plans skill 호출** → `_design/M17_progress-plan.md` 작성
3. **구현 진입** — 14건 변경 영역 일괄 적용 (헌법 → Skill → 에이전트 → settings.json 순)
4. **Codex Gate C advisory** — 헌법·Skill·settings 변경 안전 검토 (PI-015 정합 advisory)
5. **PM commit 승인** → 묶음 commit
6. **세션 종료 인수인계** — `_design/M17_session_resume.md`
7. **멘사 v3 검증 sub-step 진입** (별도 PM 신호 시점)

---

## §11. 변경 이력

- (2026-05-08) M17 brainstorming 진입 — 6건 격차 PM 본질 진단 + 정정 방향 잠정 확정. PM 의도 catalog PI-020~PI-025 신규.
