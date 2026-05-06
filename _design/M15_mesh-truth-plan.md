# M15 — Mesh 본질 정정 실행 plan

> 본 plan은 `_design/M15_mesh-truth-design.md` spec 기반. spec § 4 정정 설계 + § 5 적용 영향을 6 Group + 30 task로 분해. §4-0 (v) "모든 영역 병렬·유기" 정합 — Group A·B·C·D 병렬 진행, Group E·F는 게이트.

---

## 의존성 그래프

```
Group A (헌법 보강) ──┐
Group B (Slash·에이전트·Skill) ─┤
Group C (settings.json hook) ──┼──→ Group E (Codex Gate C) ──→ Group F (멘사 v3 검증)
Group D (멘사 v2 정리) ───────┘
```

- **A·B·C·D 병렬**: 4 Group 동시 진행 (서로 다른 파일·영역)
- **E 게이트**: A·B·C·D 모두 완료 후 변경 묶음으로 Codex Gate C advisory
- **F 게이트**: Gate C 통과 후 멘사 v3 신규 /kickoff로 검증

---

## Group A — 헌법 보강 (병렬, 5 task)

대상: `CLAUDE.md`

### A-1: §4-0 Mesh 본질 5요소 박스 신설

**위치**: §4 본문 첫 단락 직후 (현재 §4 제목 + "정본 참조" 단락 직후)

**내용**: spec § 4.1.1 박스 그대로 — 5요소 (i)~(v) 표 형식

**작업**: Edit 1건 (CLAUDE.md §4 첫 단락 직후 박스 추가)

### A-2: §4 [2]·[3]·[4] 본문 갱신

**위치**: §4 [2] Mesh 분해 + [3] 팀장 confirm + [4] 정식 산출물 작성

**내용**:
- [2]: TeamCreate + TaskCreate + Agent spawn 4명 동시 (spec § 4.1.2)
- [3]·[4] 통합: 단계 분리 폐지 (spec § 4.1.3)
- broadcast 원칙 단락 갱신: peer-to-peer + multi-hop 명시 (spec § 4.1.5)

**작업**: Edit 3건 (각 단계 본문)

### A-3: §6 영역 협업 의무 신설 + 게이트 표현 변경

**위치**: §6-2 선행 산출물 필수 + §6-4 영역 침범 금지

**내용**:
- §6-2: "선행 산출물 *완성* 사용 게이트"로 표현 변경 (spec § 4.2.2)
- §6-4: 협업 의무 신설 (spec § 4.2.1)

**작업**: Edit 2건

### A-4: §10 5차 보장 추가

**위치**: §10 "헌법 변경 시 절대 규칙" 단락 다음

**내용**: spec § 4.8 5차 보장 표 그대로

**작업**: Edit 1건 (§10 마지막에 5차 보장 단락 추가)

### A-5: §11 진행 상황 표 양식 + 4블록 적용 시점 확장

**위치**: §11 표준 출력 포맷

**내용**:
- 진행 상황 표 양식 신설 — "대기" 컬럼 금지 (spec § 4.3.1)
- 헌법 변경 4블록 적용 시점 확장 (spec § 4.3.2)

**작업**: Edit 2건

### Group A 검증

- CLAUDE.md 줄 수 ≤ 600줄 (현재 392 + 약 150 추가 예상)
- §4-0 + §6 협업 의무 + §10 5차 보장 + §11 양식 모두 추가 확인
- §4·§6 cross-ref 정합 확인 (§4-0 5요소 ↔ §6-4 영역 협업 의무)

---

## Group B — Slash + 에이전트 + Skill (병렬, 14 task)

### B-1: /kickoff Slash 전면 재작성

**대상**: `.claude/commands/kickoff.md`

**내용**: spec § 4.4 신규 절차 ([1] STATE / [2] TeamCreate+TaskCreate+spawn 4명 동시 / [3] 팀장 confirm / [4] 병렬 진행 / [5] 노션관리자 / [6] 사용자 보고)

**작업**: Write 1건 (전면 재작성)

### B-2~B-6: 5 에이전트 정의 보강

대상 파일 5건. 각 파일에 §1·§2·§7 보강:

- **B-2**: `.claude/agents/service-planner.md`
- **B-3**: `.claude/agents/tech-reviewer.md`
- **B-4**: `.claude/agents/ux-planner.md`
- **B-5**: `.claude/agents/publisher.md`
- **B-6**: `.claude/agents/notion-manager.md`

**보강 내용** (spec § 4.5):
- §1 first-read에 `_broadcast.log` + 다른 영역 산출물 부분 진행 시점 확인 추가
- §2 작업 절차에 Mesh 본질 5요소 명시 (broadcast 트리거 / reply 의무 / 자가점검 정의 / 병렬·유기)
- §7 안티 패턴에 4건 추가 (묶음 broadcast / 자율 결정 우회 / 자가점검 게이트 사고 / reply 받고 멈춤)

**작업**: Edit 각 3~5건 × 5 파일 = 약 20건

### B-7~B-12: 6 Skill 절차 보강

대상 Skill 6건:

- **B-7**: kickoff Skill (`.claude/skills/kickoff/SKILL.md`)
- **B-8**: prd-draft Skill
- **B-9**: tech-review Skill
- **B-10**: ux-spec Skill
- **B-11**: publisher-html Skill
- **B-12**: notion-sync Skill

**보강 내용** (spec § 4.6):
- broadcast 트리거 카탈로그 영역별 항목 (B-8·B-9·B-10·B-11)
- 자가점검 단계: "완성 검증 한정 — 후행 진입 게이트 X" 명시 (B-8~B-11)
- reply 의무 단계 추가 (B-8~B-11)
- B-7: 4명 동시 spawn 절차 명시
- B-12: 페이즈 1 종료 시점 1회 명시 (변경 없음 검증)

**작업**: Edit 각 1~3건 × 6 Skill = 약 12건

### B-13: broadcast 트리거 카탈로그 별도 문서 신설

**대상**: `_design/M15_broadcast-trigger-catalog.md` (신규)

**내용**: spec § 4.1.4 카탈로그 표 + 운영 가이드

**작업**: Write 1건

### B-14: §4 [4-12] broadcast 트리거 카탈로그 참조 1줄 추가

**대상**: `CLAUDE.md` §4

**내용**: §4 broadcast 원칙 단락에 "상세 카탈로그: `_design/M15_broadcast-trigger-catalog.md`" 1줄 추가

**작업**: Edit 1건

### Group B 검증

- 5 에이전트 정의 모두 §4-0 5요소 명시 확인
- 6 Skill 모두 broadcast 트리거 카탈로그 참조 또는 절차 명시 확인
- /kickoff Slash 절차가 spec § 4.4 정합 확인

---

## Group C — settings.json hook + JS (병렬, 3 task)

### C-1: PreToolUse hook check-mesh-spawn 신설

**대상**: `.claude/settings.json`

**내용**: spec § 4.7.1 hook 항목 추가

**작업**: Edit 1건 (hooks.PreToolUse 배열에 항목 추가)

### C-2: check-mesh-spawn.js 작성

**대상**: `.claude/hooks/check-mesh-spawn.js` (신규)

**내용**:
- Agent 도구 호출 메시지 분석
- TeamCreate 직후 같은 메시지/세션 내 Agent 호출 카운트
- 4명 미만 + team_name 있음 → NOTICE 출력
- exit code 0 (advisory only — 차단 X)

**작업**: Write 1건 (Node.js 스크립트, 약 50줄)

### C-3: hook 동작 테스트 (간단)

**대상**: 임시 테스트

**내용**:
- TeamCreate + Agent 1건 호출 → NOTICE 출력 확인
- TeamCreate + Agent 4건 동시 호출 → NOTICE 무발화 확인

**작업**: 수동 테스트 1회 (멘사 v3 진행 시 자연 검증 가능 — Group F에서 확인)

### Group C 검증

- settings.json hook 항목 추가 확인
- check-mesh-spawn.js 실행 가능 (node 권한 한계 시 NOTICE 미발화 — 운영 한계 인정. M14 동일 패턴)

---

## Group D — 멘사 v2 정리 (병렬, 4 task)

### D-1: projects/mensa-ranking-challenge-v2/ → _archive/v2/ 이동

**대상**: `projects/mensa-ranking-challenge-v2/` 전체

**작업**:
- `mkdir -p _archive/v2/`
- `mv projects/mensa-ranking-challenge-v2 _archive/v2/mensa-ranking-challenge-v2`
- 또는 `cp -r` + 원본 삭제 (안전한 패턴)

**작업**: Bash 1건

### D-2: _INDEX.md 갱신 (v2 행 처리)

**대상**: `projects/_INDEX.md`

**내용**:
- v2 행 제거 (또는 아카이브 비고 추가)
- 활성 프로젝트 (1건) → 활성 프로젝트 (1건 mensa-ranking-challenge v1만)
- 비고에 "v2 _archive/v2/ 이동 (M15 정의 검증 후 v3로 백지 재진행 예정 — PM 결정 2026-05-06)" 1줄

**작업**: Edit 1건

### D-3: TeamDelete mensa-ranking-challenge-v2

**대상**: Agent Teams 정리

**작업**:
- TeamDelete 도구 호출 (deferred — 로드 필요)
- `~/.claude/teams/mensa-ranking-challenge-v2/` 디렉토리 정리
- task 파일 4건 정리

**작업**: TeamDelete 1건

### D-4: STATE.md Decision Log 마무리 1줄

**대상**: `_archive/v2/mensa-ranking-challenge-v2/STATE.md`

**내용**: "(2026-05-06) M15 적용 위해 v2 아카이브 — PM 결정. v3 신규 /kickoff로 백지 재진행 예정"

**작업**: Edit 1건

### Group D 검증

- `_archive/v2/mensa-ranking-challenge-v2/`에 산출물 4종 보존 확인
- `projects/mensa-ranking-challenge-v2/` 부재 확인
- `_INDEX.md`에 v2 행 제거 확인
- TeamDelete 후 `~/.claude/teams/mensa-ranking-challenge-v2/` 부재 확인

---

## Group E — Codex Gate C advisory (게이트, 3 task)

### E-1: Gate C 입력 작성

**대상**: `_design/_codex-gate-c-m15-input.md` (신규)

**내용**:
- 변경 묶음 8건 요약 (CLAUDE.md / Slash / 5 에이전트 / 6 Skill / settings.json / hook / 카탈로그)
- 각 변경 정당성 (spec § 4 인용)
- Codex 리뷰 초점:
  - §4-0 5요소가 §4 본문 정의와 정합한지
  - /kickoff Slash 절차가 §4 정의와 정합한지
  - 5차 보장이 1~4차와 중복·누락 없는지
  - 영역 협업 의무가 §6 영역 침범 금지와 모순 없는지

**작업**: Write 1건

### E-2: Codex 호출

**대상**: Codex CLI

**작업**:
- `codex review` 명령 시도 (Bash node 권한 한계 시 PM 직접 통과 패턴)
- M14 동일 패턴: Bash node 권한 미해결 → PM 직접 advisory 통과

**작업**: 시도 1건 + PM 결정 대기

### E-3: PM 결정 (수용/오버라이드)

**대상**: Codex 결과 또는 Bash 한계 통보

**작업**:
- Codex 통과 시: 변경 적용 그대로 진행
- Codex 반려 시: 심각도 검토 → PM 결정 (수용/오버라이드/부분 반영)
- Bash 한계 시: PM 직접 advisory 통과 (M13·M14 동일)
- 결정 결과 Decision Log 기록 (`_archive/v2/.../STATE.md` 또는 `_design/M15_session_resume.md`)

**작업**: PM 결정 + Decision Log 기록 1건

### Group E 검증

- Codex 호출 결과 또는 PM advisory 통과 결정 확인
- 헌법 변경 5건 이내 확인 (§4-0 신설 + §4·§6·§10·§11 보강 = 5건. spec § 7 통과 기준)

---

## Group F — 멘사 v3 검증 (게이트, 7 task)

### F-1: 신규 /kickoff 진입

**작업**: `/kickoff 멘사코리아 랭킹챌린지_ver1.0 신주한` 명령 입력

**기대 결과**: M15 정의대로 [1]~[6] 진행

### F-2: 4명 동시 spawn 확인 (§4-0 (i))

**검증**:
- 한 메시지 내 TeamCreate + TaskCreate 4건 + Agent spawn 4건 모두 호출 확인
- check-mesh-spawn hook NOTICE 미발화 확인 (4명 정상 spawn)

### F-3: 부분 broadcast 연속 흐름 확인 (§4-0 (ii))

**검증**:
- `projects/mensa-ranking-challenge-v3/_broadcast.log` 추적
- 영역당 broadcast 3건 이상 발행 확인 (예: 서비스기획자 — WHY 확정 / 1차 사용자 확정 / Must 1개 확정 / Must 2개 확정 / ...)
- 묶음 broadcast (산출물 완성 시점에만 1회) 0건 확인

### F-4: reply multi-hop 확인 (§4-0 (iii))

**검증**:
- reply 발행 1건 이상 확인 (예: 기술검토자가 PRD 명시 없음 발견 → 서비스기획자 reply)
- multi-hop 사례 1건 이상 확인 (예: 퍼블리셔 → UX기획자 → 서비스기획자 연쇄)
- 자율 결정 우회 0건 (모든 명시 없는 항목은 reply로 처리)

### F-5: 자가점검 = 완성 검증 한정 확인 (§4-0 (iv))

**검증**:
- 후행 영역이 부분 broadcast 받자마자 진행 시작 (자가점검 게이트 X)
- 자가점검은 산출물 완성 시점에만 1회 (수정 시 재발동)
- 진행 상황 표에 "후행 진입 대기" 컬럼 0건

### F-6: 모든 영역 병렬·유기 확인 (§4-0 (v))

**검증**:
- 진행 상황 표 §11 양식 적용 (대기 컬럼 0회)
- 4 Teammate 동시 in_progress 시점 1회 이상 (TaskList 캡처)
- reply 흐름 처리 시 다른 영역 자기 일 진행 계속 확인

### F-7: 신규 시행착오 ≥ 1건 등록 (운영 검증 정신)

**대상**: `_FOLLOWUP.md` ②

**작업**: M15 적용 후 발견된 시행착오 1건 이상 등록 (없으면 검증 부족 의심)

### Group F 검증 — M15 통과 기준 (spec § 7)

| 기준 | 통과 조건 |
|------|---------|
| 격차 5건 정정 | A·B·C·D 모두 적용 완료 |
| 멘사 v3 검증 | F-2~F-6 모두 통과 |
| Gate C | E 통과 |
| 신규 시행착오 | F-7 1건 이상 |
| 헌법 변경 ≤ 5건 | A 5건 (§4-0 + §4·§6·§10·§11) — 정확 5건 |
| 본 sub-step 진행 자체 §4-0 적용 | spec/plan 동시 작성 + reply 즉시 + 진단 표 §11 양식 — 본 plan 작성 시점에 부분 적용 (Group A·B·C·D 병렬) |

---

## 실행 우선순위 + 시간 추정

| Group | 우선 | 추정 시간 | 의존 |
|-------|------|---------|------|
| A | 1 | 30분 | (없음) |
| B | 1 | 60분 | (없음) |
| C | 1 | 20분 | (없음) |
| D | 1 | 10분 | (없음) |
| E | 2 | 15분 | A·B·C·D 완료 |
| F | 3 | 60분 | E 통과 |

**총 추정**: 약 3.5시간 (Group A·B·C·D 병렬 진행 시 가장 긴 B 60분 + E 15분 + F 60분 = 약 2.5시간)

**병렬 효율**: A·B·C·D 4 Group 병렬 진행 → 순차 대비 약 60% 시간 절감.

---

## 중단 조건

- PM 명시 정지
- Codex Gate C 심각도 "높음" 1건 이상 + PM 오버라이드 거부
- 멘사 v3 검증 F-2 (4명 동시 spawn) 미통과 → spec/plan 자체 재검토 (M15 재진입)
- 도구 한계로 30분 이상 차단 → PM 보고 + 옵션 제시 (M14 동일 패턴)

---

## 다음 액션 (PM 검토 통과 후)

본 plan PM 검토 통과 즉시 실행 진입:
1. Group A·B·C·D 병렬 시작 (한 메시지 내 다수 도구 호출)
2. Group E·F 게이트 진입
3. 본 sub-step 종료 commit + `_design/M15_session_resume.md` 인수인계 작성
