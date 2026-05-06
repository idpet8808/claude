# M14 — 하네스 v1.1 정련 (시행착오 5건 기반 구조 설계 조정) 인수인계

> 다음 세션 시작 시 **이 파일 1개만 읽으면 재개 가능**.

---

## 직전까지 완료된 것 (M13 v1 종료)

본 세션(2026-05-06)에 M13 v1 brainstorming → spec → plan → 실행 → 실 프로젝트 적용까지 압축 완료.

| 항목 | 결과 |
|------|------|
| **M13 v1 통과 기준 (5건)** | 모두 충족 또는 부분 충족 (1·3·4·5 ✓, 2 부분) |
| **헌법 변경** | **0건** (충실도 ↑) |
| **시행착오 등록** | **5건** (`_FOLLOWUP.md` ② v1.1 이관) |
| **실 프로젝트 적용** | `mensa-ranking-challenge` (페이지 2종: P-001 S1 메인 + P-002 S4-A 배수 수열) |
| **노션 동기화** | 기존 페이지 연결 (page_id `356fd8b1-41f3-8095-9a28-cbbf2b7961ec`) |

### Commit 이력 (M13 v1)

```
3a70892 초기 세팅
da68d0f feat(M13-1): publisher(MVP) 에이전트 + Skill 신설 — Group A 종료
2629059 feat(M13-2): 헌법 재작성 + 아카이브·후속 이관 — Group B 종료
0264b4a feat(M13-3): 운영 도구 일괄 갱신 — Group C 부분 종료 (C1~C5)
863a7e5 chore(M13-v1): 외부 프로젝트 _backup 분리 + staging 잔재 82건 정리
fd1fa1f docs(M13-v1): 본 세션 종료 인수인계 — _design/M13_v1_resume.md 신설
c983f62 feat(M13-v1-end): C6~C10 완료 — 멘사 랭킹챌린지 실 적용 + M13 v1 종료
[다음] feat(M13-v1-add): S4-A 배수 수열 챌린지 풀이 페이지 추가 (P-002)
```

---

## M14 정련 스코프 — 시행착오 5건 우선 (가속안 (2) 정신)

PM 결정: **시행착오 5건만 우선 정련**. 페이즈 2 신설(퍼블 Production·백엔드·`/handoff`·API 정식화)은 **별도 milestone (M15+)** 으로 분리.

### 정련 대상 5건 (우선순위)

| # | 시행착오 | 우선도 | 영향 위치 (변경 후보) |
|---|---------|------|-----------------------|
| **1 (높음)** | 기능명세서 별도 산출물 신설 검토 (`_FOLLOWUP.md` #2) | **높음** (BN 실무 관행) | (a) `02b-functional-spec.md` 신설 (PRD↔TR 사이) / (b) PRD §4 강화 / (c) TR §2 확장 → 헌법·plan·Skill 변경 |
| **2 (높음)** | `_INDEX.md` 운영 원칙 vs 실 사례 격차 (#4) | **높음** (실 운영 빈번) | (a) 원칙 강화 — `/kickoff` 진입 시 post-search 선행 검증 / (b) 원칙 완화 — 예외 명시 / (c) 모드 분리 — `/kickoff-existing` 명령 신설 |
| **3 (중)** | 헌법 Mesh + 부분 broadcast 정신 vs 실제 순차 격차 (#1) | 중 (도구 한계) | `superpowers:dispatching-parallel-agents` Skill 활용 / SendMessage cross-Agent 통신 / `_broadcast.log` 실시간 채널 |
| **4 (중)** | Subagent 환경 ask 권한 자동 거부 (#5) | 중 (controller 우회 가능) | 노션관리자 §6에 "노션 쓰기는 controller 위임 호출" 명시 / `notion-sync` Skill 절차 분리 |
| **5 (중)** | 세션 중 신설 에이전트 자동 인식 부재 (#3) | 중 (Claude Code 한계) | 헌법 §6에 "신규 에이전트 신설 후 Claude Code 재시작 권고" 명시 |

---

## M14 작업 흐름 (M13과 동일 패턴)

```
M14 진입
  ↓
brainstorming Skill invoke (M sub-step 착수 시 매번 — 피드백 룰)
  ↓
정련 5건 우선순위 + 처리 방식 PM 결정
  ↓
spec 작성 (docs/superpowers/specs/2026-MM-DD-m14-design.md)
  ↓
plan 작성 (docs/superpowers/plans/2026-MM-DD-m14.md)
  ↓
실행 (Group A·B·C 패턴 — sub-step별)
  ↓
Codex Gate C (헌법·plan·Skill 변경 시 advisory)
  ↓
M14 종료 commit
```

---

## 시행착오 5건 — 정련 옵션 상세

### #1 (#2 in _FOLLOWUP) 기능명세서 별도 산출물 신설 검토 — 높음

| 옵션 | 의미 | 변경 범위 |
|------|------|---------|
| (a) `02b-functional-spec.md` 신설 | PRD↔TR 사이 단계 추가. owner = 서비스기획자 또는 신규 영역(FUNC) | 헌법 §1·§4·§5 + `/kickoff` + 신규 Skill `functional-spec` + 신규 에이전트(또는 서비스기획자 확장) |
| (b) PRD §4 대폭 강화 | REQ-NNN 카탈로그 + 기능별 흐름도·입출력·예외 | `prd-draft` Skill template 강화. 영역 확장 X |
| (c) TR §2 Must 전수 평가를 기능 명세로 확장 | 기능별 명세를 기술 검토자가 작성 | `tech-review` Skill 강화. PRD 변경 X |

**팀장 권장**: **(b) PRD 강화** — 영역 신설 회피, 헌법 변경 작음, 빠른 정련. (a)는 v2.0 후보로 미룸.

### #2 (#4 in _FOLLOWUP) `_INDEX.md` 원칙 vs 실 사례 격차 — 높음

| 옵션 | 의미 |
|------|------|
| (a) 원칙 강화 — `/kickoff` post-search 선행 + 매칭 시 거부/경고 | `/kickoff` Slash 변경 |
| **(b) 원칙 완화 — 예외 명시** ★ | `_INDEX.md` 운영 원칙에 "기존 노션 페이지 있는 프로젝트도 하네스 적용 가능 (post-search 선행 + PM 확인 절차)" 추가. 노션관리자 §5 절차 보강 |
| (c) 모드 분리 — `/kickoff-existing <page_id>` 신설 | Slash 신설 |

**팀장 권장**: **(b)** — 실 사례 정합 + 변경 작음.

### #3 (#1 in _FOLLOWUP) Mesh + 부분 broadcast 격차 — 중

| 옵션 | 의미 |
|------|------|
| (a) `superpowers:dispatching-parallel-agents` Skill 활용 | S 무관 영역 동시 호출 |
| (b) SendMessage 기반 cross-Agent 통신 | 양방향 reply 실 구현 |
| (c) `_broadcast.log` 실시간 채널 | 파일 → in-memory 큐 또는 hook |

**팀장 권장**: **(a) + (b) 조합** — Skill·도구 활용으로 헌법 변경 X.

### #4 (#5 in _FOLLOWUP) Subagent ask 권한 자동 거부 — 중

| 옵션 | 의미 |
|------|------|
| (a) 노션관리자 §6에 "노션 쓰기는 controller 위임 호출" 명시 | 정의 1단락 추가 |
| (b) `notion-sync` Skill 절차 분리 — controller 호출 / subagent 변환 | Skill 변경 |

**팀장 권장**: **(a) + (b)** — 두 위치 모두 명시.

### #5 (#3 in _FOLLOWUP) 세션 중 신설 에이전트 자동 인식 부재 — 중

| 옵션 | 의미 |
|------|------|
| (a) 헌법 §6 "신규 에이전트 신설 시 Claude Code 재시작 권고" 1단락 | 헌법 변경 작음 |
| (b) Claude Code 동적 agent 등록 메커니즘 확인 (가능하면 활용) | 도구 검증 작업 |

**팀장 권장**: **(a)** — 단순. (b)는 후속 검증.

---

## M14 v1 통과 기준 (제안)

1. 시행착오 5건 모두 정련 완료 (헌법·Skill·에이전트·Slash 갱신)
2. Codex Gate C advisory 통과 또는 PM 오버라이드 (Bash node 권한 한계 시 동일 패턴)
3. 신규 시행착오 ≥ 1건 등록 (M14 운영 검증)
4. M14 헌법 변경 0~5건 (다수 = 재검토 신호)
5. 실 프로젝트 1건에 정련 결과 적용 검증 (또는 mensa-ranking-challenge에 적용)

---

## 주의·제약 (다음 세션 시작 시)

1. **피드백 룰**: M sub-step 착수 시 매번 `superpowers:brainstorming` invoke
2. **Codex Gate C**: Bash node 권한 미해결 → PM 직접 통과 패턴 (M13 동일)
3. **선행 결정 침범 금지**: M1~M13 결정 변경 대상 X. M14는 *시행착오 정련*에 한정
4. **가속안 (2)**: 압축 진행. 5건을 한 번에 또는 우선순위별 sub-step 분해
5. **페이즈 2 (M15+)**: 본 M14에는 포함 X. 별도 milestone

---

## 참조 파일

| 파일 | 용도 |
|------|------|
| `CLAUDE.md` (392줄, 12 섹션) | 헌법 SSoT — M14에서 변경 대상 |
| `AGENTS.md` (~95줄) | Codex 정의 |
| `_FOLLOWUP.md` (~150줄) | 시행착오 5건 + 기존 v1.1 이관 + 운영 정련 + 폐기 |
| `_design/M13_decisions.md` (~150줄) | M13-① ② ③ 결정 + Gate B/C 처리 + C7~C10 |
| `_design/M9_deliverable-structure.md` (1985줄) | M1~M12 SSoT (변경 대상 X) |
| `_design/M13_resume.md` / `M13_v1_resume.md` | 이전 세션 인수인계 (참고용) |
| `projects/mensa-ranking-challenge/` | 실 프로젝트 적용 사례 — M14 적용 검증 후보 |

---

## 다음 세션 첫 메시지 제안

```
_design/M14_resume.md 읽고 M14 (시행착오 5건 정련) 진입.
스코프: 시행착오 5건 우선 정련 (페이즈 2 = M15+ 별도).
```

또는 특정 시행착오 우선:
```
_design/M14_resume.md 읽고 M14 진입. #1 기능명세서·#2 _INDEX 격차 두 건만 우선.
```

---

## 세션 마무리 메모 (2026-05-06)

- 본 세션에 **M13 v1 압축 완료** (brainstorming → spec → plan → 실행 → 실 프로젝트) + **멘사 랭킹챌린지 실 적용** + **S4-A 배수 수열 페이지 추가** + **시행착오 5건 등록**
- 누적 commit 8건 (3a70892 → S4-A 추가)
- 약 30+ 파일 신설/갱신, 약 8,000+ insertions
- M13 v1 = 종료. v1.1 정련(M14) = 다음 세션
- 추정 다음 세션 1~2 (시행착오 5건 우선순위에 따라)
