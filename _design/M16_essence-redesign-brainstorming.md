# M16 — 하네스 구조 본질 재설계 (brainstorming 결정 종합)

> ⚠️ **PI-019 이전 기록 — 부분 superseded** (2026-05-07 갱신): 본 문서 §2 PM 의도 14건은 *PI-019 신설(P-NNN 폐기 + UI ID 단일 사용 A1 결정) 이전 기록*. 최신 의도는 `_design/M16_pm-intent-catalog.md` §2-3 PI-019 참조. 본 brainstorming 메타 design 자체는 보존 (진행 방향·M15 처리·Approach C 결정).
>
> 본 문서는 M16 진입 단계의 brainstorming 결정 종합. PM "전면 수정" 본질 지적(2026-05-07)에 따라 M14·M15 누적 + 격차 6 발견 + PM 의도 14건 통합으로 *하네스 구조 자체*를 재설계. 본 design doc은 *접근 방식 메타 design*이며, 실 재설계 spec/plan은 후속 작업(M16 단계별 분해)에서 별도 작성.

---

## 1. 진입 동기

### 1.1 M14 (d) 4중 신뢰성 보장 한계 (2026-05-06)

M14 신설 4중 보장 (도구 인지 사전 검증 / PM 지적 시 재인용 / 4블록 형식 / settings PreToolUse NOTICE)이 *spawn·헌법 시점*에만 발화. 시각화·진단·옵션 시점 미작동.

### 1.2 M15 격차 5건 발견 (2026-05-06)

멘사 v2 /kickoff 1회차 진행 중 §4 정의 위배 5건 누적:
1. 4명 동시 spawn 미작동 (워터폴화 회귀)
2. 묶음 broadcast 1회 (부분 broadcast 연속 흐름 미작동)
3. 자가점검을 후행 진입 게이트로 오용
4. 양방향 reply 미가동 (자율 결정 우회)
5. 1대1 1-hop reply 사고 (multi-hop 그래프 미인지)

→ M15 = 워크플로 본질 정정. Group A 적용 commit 완료(`8978063`). Group B 진행 중 격차 6 발견.

### 1.3 격차 6 발견 (2026-05-07)

M15 Group B 진행 중 PM 본질 지적 — "PRD = 요구사항정의서 아닌가? 그럼 상세 내용을 써야 되는게 아닌지". 현 prd-draft template = *비전 문서* 형식 → PRD 본질(요구사항 정의서) 미충족. 격차 4 (자율 결정 우회)의 *근본 원인*.

### 1.4 PM 본질 지적 — "전면 수정" (2026-05-07)

> "내 의도는 지금 설계된걸 전면 수정해야함, 본질적으로 내 의도가 잘 지정된 내용의 하네스 구조 설계가 되었으면 함"

→ M15 부분 갱신·옵션 분기 권장 철회. M15 자체도 본질 재설계 대상. 신규 sub-step M16 신설.

---

## 2. PM 의도 누적 (본 brainstorming 결과 — 14건)

본 brainstorming 진행 중 누적된 PM 본질 의도:

| # | 카테고리 | PM 의도 |
|---|---------|---------|
| 1 | 산출물 본질 | PRD = 요구사항정의서 |
| 2 | 산출물 본질 | 본문 = BN시스템 16 필드 양식 (대분류·중분류·소분류·개발/패키지·구분·시스템명·업무영역명·요구사항 ID·요구사항명·요구사항 설명·세부내용 및 요건·제약사항 및 전제조건·유형·업무 담당자·출처·기타사항 — 필수 13 + NA 허용 3) |
| 3 | 매핑 SSoT | 요구사항 ID 통일. 영역 ID(TR/S/P-NNN)는 영역별 독립 시퀀스 그대로 |
| 4 | ID 체계 | 4 segment `REQ-{도메인 2~4글자}-{NNN}-{NN}` (업무영역명 약어 + 시퀀스 3자리 + 상세 2자리) |
| 5 | 산출물 본질 | 기능명세서 = 필요시 별도 산출물 (default 4종 유지) |
| 6 | PRD 본문 구조 | 단일 PRD + 대분류 그룹화 |
| 7 | PRD 본문 구조 | §0 PM 원본 + §A 비전 + §B 카탈로그(대분류 그룹) + §C 표준 패턴 + §D 오픈 이슈 + §E 자가 점검 |
| 8 | PRD 본문 구조 | 비전 = WHY + 페르소나만 (KPI 제거) |
| 9 | 의도 SSoT | PM 원본 보존 (의도 변질 방지 + 추적성). service-planner는 §0 변환·삭제 금지 |
| 10 | 자율 결정 영역 | 표준 패턴 자율 허용 (로그인·회원가입·비밀번호 reset·세션 관리·기본 CRUD UI·이메일 발송) |
| 11 | 자율 결정 영역 | 경계 사례 PRD 명시 의무 (SSO·결제·2FA·이미지 업로드) |
| 12 | 자율 결정 영역 | 특정 로직 PM 추가 질의 (결제 흐름·도메인 로직 등) |
| 13 | 자율 결정 영역 | 표준 패턴 §C 섹션 1줄 기록 (ID 부여 없음) |
| 14 | 하네스 구조 | 부분 패치 X, *전면 재설계*. PM 의도 정합 하네스 구조 |

> 본 14건은 *현재 시점 누적*. M16 진행 중 추가 의도 발견 시 본 카탈로그 갱신 (Approach C — 반복 누적 정신).

---

## 3. 재설계 절차 (5단계, Approach C)

```
[1] PM 의도 카탈로그 작성   ─ _design/M16_pm-intent-catalog.md
   ↓
[2] 기존 누적 확인           ─ _design/M16_existing-design-review.md
   ↓
[3] PM 의도 ↔ 기존 누적 대조 ─ 정합/부정합/누락/잉여 분류
   ↓
[4] 재설계 spec 작성         ─ _design/M16_essence-redesign-design.md
   ↓
[5] plan 작성                ─ _design/M16_essence-redesign-plan.md
   ↓
실 적용 (헌법·Skill·Slash·에이전트·산출물 갱신)
```

### Approach C — 단계별 순차 + 반복 누적 정신

- **기본 진행**: 1→2→3→4→5 단계별 순차 + 각 단계 PM 검토 게이트 명확
- **역행 갱신 허용**: 새 PM 의도 발견 시 1단계 마감 후에도 카탈로그 갱신 가능
- **역행 트리거**: PM 명시 ("추가 의도 발견" / 본질 지적 / 새 본질 결정 등)
- **무한 사이클 방지**: PM 마감 결정 시점에 종료

### 기존 누적 검토 깊이 (M16 [2] 단계)

전수 검토 + 카테고리별 정리:
- 산출물 본질 (PRD·TR·UX·P 정의)
- workflow (M14 Agent Teams + M15 5요소 + 격차 6)
- 헌법 §1~§13
- Skill (6건: prd-draft·tech-review·ux-spec·publisher-html·notion-sync·weekly-status)
- 에이전트 정의 (5건: service-planner·tech-reviewer·ux-planner·publisher·notion-manager)
- Slash command (kickoff 등)
- settings.json + hook
- 운영 시행착오 (`_FOLLOWUP.md` ①·②·③·④)
- 메모리 누적 PM 피드백 (`memory/*.md`)

### 검토 분류 (M16 [3] 단계)

| 분류 | 의미 | 처리 |
|------|------|------|
| **정합** | PM 의도와 기존 결정 일치 | 보존 |
| **부정합** | PM 의도와 기존 결정 충돌 | 결정 근거 평가 → 폐기/갱신 결정 |
| **누락** | PM 의도가 기존에 미반영 | 신설 |
| **잉여** | 기존 결정이 PM 의도와 무관·부담 | 폐기 검토 (단 결정 근거가 *다른 PM 의도* 정합이면 보존) |

기존 결정의 *근거*까지 검토 (결정만이 아니라 *왜* 그 결정이 내려졌는지) — 격차 6과 동일 패턴 회피.

---

## 4. M15 처리

PM 결정 (2026-05-07):

- M15 자체도 본질 재설계 대상에 포함 (전면 재검토)
- M15 Group A 적용분 (`8978063` commit — §4-0 + §4 본문 + §6 + §10 + §11) = M16 [3] 대조 단계에서 정합/부정합 검증
- M15 Group B 진행 중 보류분:
  - B-1 (`.claude/commands/kickoff.md` 재작성)
  - B-2~B-6 (5 에이전트 보강 — service-planner / tech-reviewer / ux-planner / publisher / notion-manager)
  - B-8 (prd-draft Skill 보강)
  - = M16 [3]·[4] 단계에서 재정렬
- M15 spec/plan 본문은 M16 진행에 *기존 누적 자료*로 보존 (`_design/M15_*.md`)
- `_FOLLOWUP.md` ② "M15 plan B-7 경로 격차" 항목 = M16에서 재검토

M15 진행 자체는 *본질 정정 시도*로 가치 보존 — 기존 누적 SSoT 일부.

---

## 5. 다음 단계

본 design doc PM 검토 게이트 통과 후:

1. **writing-plans Skill 진입** — M16 [1]~[5] 단계를 plan으로 분해
2. plan 검토 → 실 작업 진입
3. M16 [1] PM 의도 카탈로그 작성부터 진행

후속 작업 산출물 (예상):
- `_design/M16_pm-intent-catalog.md`
- `_design/M16_existing-design-review.md`
- `_design/M16_essence-redesign-design.md`
- `_design/M16_essence-redesign-plan.md`
- 실 적용 변경 (CLAUDE.md / Skill / Slash / 에이전트 / settings·hook 등)

---

## 6. 본 design doc 자가 점검

- [x] PM 본질 지적 ("전면 수정") 정합
- [x] M15 부분 갱신·옵션 분기 권장 철회 명시
- [x] PM 의도 14건 누적 보존 (2026-05-07 brainstorming 결과)
- [x] 재설계 5단계 절차 + Approach C 명시
- [x] M15 처리 명시 (전면 재검토 대상)
- [x] 다음 단계 = writing-plans Skill
- [x] BN시스템 컨벤션 정합 (`_design/M16_*.md` 위치)

통과율: 7/7

---

## 부록 A — 본 brainstorming 진행 기록 (2026-05-07)

| 단계 | PM 결정 |
|------|---------|
| Q1 | 격차 6 본질 정의 — B (부분 정합 + 표준 패턴 자율 허용 추가) |
| Q2 | 표준 패턴 카탈로그 시점 — 즉시 카탈로그 + 경계 사례 PRD 명시 + 특정 로직 PM 질의 |
| Q3 | 산출물 구조 — C (단일 PRD + 대분류 그룹화) |
| 매핑 본질 | 모든 매핑 = 요구사항 ID. 영역 ID는 영역별 독립 그대로 |
| 기능명세서 | A (PRD = 요구사항정의서, 기능명세서 = 필요시 별도) |
| Q5 | ID 4 segment — A (업무영역명 약어), 시퀀스 3자리 + 상세 2자리 |
| Q6 | 비전 위치 — A (단일 PRD §A 머리, KPI 제거, PM 원본 보존 추가) |
| Q7 | 표준 패턴 ID 처리 — A (§C 섹션 1줄, ID 부여 없음) |
| 본질 정정 | 옵션 A·B·C(부분 갱신) 권장 철회 → 전면 재설계 |
| 진행 방향 | 권장안 정합 (PM 의도 카탈로그 우선 + M15 전면 재검토 대상 포함) |
| Approach | C (단계별 순차 + 반복 누적 정신) |

PM 본질 지적이 *brainstorming 진행 중 누적된 발견 패턴*으로, 격차는 모든 시점에 발현 가능함을 본 sub-step에서도 검증 (M15 §4-0 (v) "모든 영역 병렬·유기" 정신 정합).
