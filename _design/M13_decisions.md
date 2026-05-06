# M13 v1 Decision Log

> M13 v1 진행 중 PM 확정 결정 사항을 누적 기록. STATE.md Decision Log 패턴 정합.

---

## M13-① brainstorming 결정 (2026-05-06)

**근거**: spec `docs/superpowers/specs/2026-05-06-m13-v1-design.md` §6-1 / plan Task A1.

| # | 항목 | 결정 | 적용 위치 |
|---|------|------|----------|
| 1 | 퍼블리셔 자가 점검 항목 수 | **7항목** | `.claude/agents/publisher.md` §5 + `.claude/skills/publisher-html/checklist.md` |
| 2 | 통과 임계 | **6/7** (약 85%, CLAUDE.md §6 게이트 정합) | 동일 |
| 3 | MVP 단계 화면 수 | **UX기획자(03-ux-spec.md)에 정의된 화면 목록 그대로 매핑.** 퍼블리셔는 화면 가감 권한 없음 (CLAUDE.md §6 영역 침범 금지). 별도 상한 없음 | `publisher.md` §2 작업 절차 + §7 안티 패턴 |
| 4 | assets 변경 이력 위치 | **STATE.md Decision Log에 통합** (별도 CHANGELOG 파일 없음, 단순화) | `publisher.md` §4 + STATE.md 템플릿 |
| 5 | P-NNN 발급 시점 | **HTML 파일 생성 시** (사전 발급 단계 없음, 자연스러운 흐름) | `publisher.md` §2 작업 절차 + `publisher-html/SKILL.md` 절차 |

**근거 (#3 핵심)**: M9 결정 정합 — P 영역 owner는 S 영역(UX) 결과를 *받아 구현*하는 역할이지 화면 *기획*하는 역할 아님. "핵심 기능만"이라는 표현은 퍼블리셔 자의 판단을 함의 → 영역 침범. UX기획자가 03-ux-spec.md에 정의한 화면 목록을 *그대로* 매핑.

---

## M13-① Codex Gate B 처리 (2026-05-06)

| 시점 | 사항 |
|------|------|
| 1차 리뷰 | Codex Gate B advisory — **반려** (높음 2건·중간 2건·낮음 1건). M9 §10-2-2 8필드·U-1~U-5 형식 어긋남, "gap 0" ID 검증 충돌, NA list 형식·완료 보고·메모 단계 모순 |
| 수정 | 5건 모두 수용. publisher.md / checklist.md / template.md / M13_publisher_integration.md 4 파일 정정 |
| 2차 리뷰 시도 | Codex agent 재호출했으나 `Bash(node:*)` 권한 부재로 codex-companion.mjs 실행 실패 |
| **PM 결정** | **재리뷰 skip + PM 직접 검토 통과**. 사유: ① 5건 수정이 모두 M9 §10-2-2/§1-2-2/§11 SSoT 정정으로 명확 ② Codex는 advisory이지 blocking 아님 (CLAUDE.md §3) ③ Bash node 권한 추가 = settings 변경 = Gate C 발동 대상이므로 M13-② Group B에서 묶어 처리 ④ 가속안 (2) 정신 정합 |
| Group A 종료 | publisher 신설 + Skills 3 파일 + 정합 점검 메모 = Group A 산출물 5건 PM 통과 |

---

## M13-② brainstorming 결정 (2026-05-06)

| # | 항목 | 결정 | 근거 |
|---|------|------|------|
| 1 | **CLAUDE.md §3 분량 70줄 적정성** | **70줄 유지**. AGENTS.md(호출 형식·판정 기준)와 분리 정합. §3은 *원칙·게이트 정의* 한정. advisory 정신 반복 강조는 정합성 우선 | spec §8 / AGENTS.md 분담 |
| 2 | **§7 객관 지표 4개 임계** (5% / 30분 / 10MB / 월 3회) | **`_FOLLOWUP.md` ③ 운영 정련 보존**. 헌법은 *지표 존재·정련 위치*만 1단락 명시. 임계는 v1 운영 후 정련 (M12-I8 정합). v1 헌법 박으면 회귀 부담 ↑ | M12-I8 / 가속안 (2) |
| 3 | **`_FOLLOWUP.md` 위치** | **루트 (`/_FOLLOWUP.md`)**. *운영 등록 파일* 성격이라 가시성 ↑. `_design/`은 *아카이브* 성격으로 분리. spec §F-5 권장 정합. SessionStart 훅 cat 가능 | spec §F-5 / 디렉토리 의미 분리 |

---

## M13-② Codex Gate C 처리 (2026-05-06)

| 시점 | 사항 |
|------|------|
| Gate C 시도 | Codex agent 호출 시도했으나 `Bash(node:*)` 권한 부재로 codex-companion.mjs 실행 실패 (Group A Gate B와 동일 패턴) |
| **PM 결정** | **Gate C skip + PM 직접 통과**. 사유: ① CLAUDE.md 392줄 / AGENTS.md 변경 없음 / _FOLLOWUP.md 95줄 모두 spec §8·M13-② 결정 정합 ② Codex는 advisory이지 blocking 아님 (CLAUDE.md §3) ③ Bash node 권한 추가는 settings 변경 = Gate C 자체 발동 대상으로 역설 ④ 가속안 (2) 정신 |
| 후속 | v1 운영 시행착오 발견 시 `_FOLLOWUP.md`에 등록 → 헌법 변경 필요 시 다시 Gate C 발동 (그때 Bash node 권한 또는 다른 수단 결정) |

---

## M13-② B6 임시 파일 정리 (2026-05-06)

`_FOLLOWUP.md` ④ 폐기 분류에 등록된 11개 파일 git working tree 정리:

- `.tmp-codex-m4-{4th, 5th-prompt, 5th-out, 6th-prompt, 6th-out, 7th-prompt, 7th-out}.txt` (7개)
- `.tmp-m4-rev{5, 6, 7}.md` (3개)
- `.codex/config.toml.bak` (1개)

근거: 2026-04-14 M4 Mesh 메시지 전달 프로토콜 롤백 잔재. M9~M12 Mesh 모델로 대체 완료. 모두 untracked 상태였으므로 git 이력 영향 없음.

---

## M13-③ brainstorming 결정 (2026-05-06)

| # | 항목 | 결정 | 근거 |
|---|------|------|------|
| 1 | **`/kickoff` 게이트 5→6 (퍼블 → 노션) 호출 방식** | **PM 명시 호출** | 노션 쓰기는 settings.json `ask` 권한이라 어차피 PM 발화. 자동 호출 = 흐름 자동성과 노션 ask가 충돌. CLAUDE.md §10 정합 |
| 2 | **실 프로젝트 1건 적용 종류** | **PM이 제시할 실제 프로젝트로 진행** (더미 슬러그 X) | PM 명시 결정. 더미 검증보다 실 적용 우선. 시행착오 발견 시 즉시 `_FOLLOWUP.md` 등록 |
| 3 | **시행착오 등록 minimum** | **≥ 1건 (spec §7-5 그대로)** | minimum이지 maximum 아님. 5건 강제 = 인위적 등록 위험 |

---

## M13-③ C7 부정 시나리오 시뮬 (2026-05-06)

C6 정상 시나리오 8단계 통과 후 C7 부정 시나리오 8건 중 **2건 시뮬 검증 + 6건 헌법·Skill 정의 정합 확인** (가속안 (2)).

### 시뮬 검증 (2건 — 텍스트 시뮬, 실 발생 X)

| # | 시나리오 | 검증 결과 |
|---|---------|---------|
| 1 | PRD §A 4/7 → 기술검토자 호출 시도 | 본 사례는 §A 7/7로 통과. **반대 케이스 시뮬**: tech-reviewer.md §1 선행 조건 ("§A ≥ 5/7 + §B error 0") + §6 차단 보고 형식 (호출 거부 + 옵션 3가지) 정합. 실 발생 시 자동 차단 작동 가정 가능 |
| 2 | UX 4상태 누락 → 자동 실패 | 본 사례 4상태 누락 0건. **반대 케이스 시뮬**: ux-spec/checklist.md §A 항목 2 "누락 시 통과율 무관 자동 실패" 정합. 실 발생 시 즉시 재작성 작동 가정 가능 |

### 헌법·Skill 정의 정합 확인 (6건 — 본 운영에서 발생 안 함, 정의 검증)

| # | 시나리오 | 정의 위치 (헌법·Skill) |
|---|---------|---------------------|
| 3 | 퍼블리셔 03-ux-spec 수정 → 영역 침범 거부 | `publisher.md` §7 안티 패턴 + CLAUDE.md §6 영역 침범 금지 |
| 4 | 노션 API 2회 오류 → 재시도 중단 | `notion-manager.md` §7 + CLAUDE.md §10 재시도 한계 |
| 5 | `.mcp.json` 수정 시도 → PreToolUse 훅 BLOCKED | `settings.json` deny + PreToolUse hook + CLAUDE.md §10 |
| 6 | 종료 단계 STATE.md 수정 → PM 명시 확인 | CLAUDE.md §10 사용자 확인 필수 |
| 7 | 서비스기획자 01-prd 수정 → broadcast 누락 → cross-ref error | `service-planner.md` §7 + M9-5 cross-ref + M11 자가 점검 재발동 |
| 8 | 자가 점검 3회 연속 미달 → 재시도 한계 | CLAUDE.md §10 + 각 Skill checklist |

**판정**: spec §7-5 통과 기준 #2 *부분 충족* (8건 모두 헌법·Skill 정의에 명시되어 있고, 2건은 시뮬 검증으로 작동 정합 확인). 실 부정 케이스 발생 시 즉시 작동 가정.

---

## M13-③ C8 Codex Gate B 처리 (2026-05-06)

| 시점 | 사항 |
|------|------|
| Gate B 시도 | C6 산출물 4종 (01·02·03·04-mvp) advisory 리뷰 시도. Bash node 권한 부재로 Codex CLI 실행 불가 (Group A·B와 동일 패턴) |
| **PM 결정** | **Gate B skip + PM 직접 통과**. 사유: ① 산출물 4종 모두 자가 점검 만점 통과 (PRD 7/7 + TR 5/5 + UX 4/4 + 퍼블 7/7, §B error 0건) ② 시행착오 5건 _FOLLOWUP.md 등록으로 v1 운영 검증 정신 충족 ③ Codex는 advisory (CLAUDE.md §3) ④ 가속안 (2) 정신. 동일 패턴 Group A·B Gate B/C 처리 |

---

## M13-③ C9 시행착오 등록 결과 (2026-05-06)

`_FOLLOWUP.md` ② v1.1 이관 분류에 5건 등록 완료 (spec §7-5 #4 minimum ≥ 1건 초과 충족):

1. 헌법 Mesh + 부분 broadcast + 양방향 reply 정신 vs 실제 순차 진행 격차
2. 기능명세서 별도 산출물 신설 검토 (PRD §4 + TR §2 분산)
3. 세션 중 신설 에이전트 자동 인식 부재 (퍼블리셔 신설 후 본 세션 미인식)
4. `_INDEX.md` 운영 원칙 vs 실 사례 격차 (기존 노션 페이지 있는 프로젝트 적용)
5. Subagent 환경 settings.json `ask` 권한 자동 거부 (노션 쓰기 controller 직접 호출 필요)

모두 v1.1+ 정련 후보. v1 헌법 변경 0건 (spec §7-5 #5 충족).

---

## M13-③ C10 Group C 마무리 — M13 v1 종료 (2026-05-06)

**v1 통과 기준 5건 (spec §7-5)**:

| # | 기준 | 결과 |
|---|------|------|
| 1 | 실 프로젝트 1건 /kickoff → 노션 완주 | ✓ 충족 (`mensa-ranking-challenge` 8단계 완주) |
| 2 | 부정 시나리오 8건 차단 | ⚠ 부분 충족 (2건 시뮬 검증 + 6건 정의 정합 확인) |
| 3 | Gate B advisory 통과 또는 PM 오버라이드 | ✓ 충족 (PM 직접 통과 — Bash node 권한 한계, 동일 패턴) |
| 4 | `_FOLLOWUP.md` 시행착오 ≥ 1건 | ✓ 충족 (5건 등록) |
| 5 | 헌법 변경 0~3건 | ✓ 충족 (0건) |

**M13 v1 = 종료**. v1.1+에서 시행착오 5건 정련 + 페이즈 2 (퍼블 Production · 백엔드 · `/handoff` · API 정식화) 신설.

---

## PM 오버라이드·Codex 기각 사례

(발생 시 사유·감수 리스크와 함께 기록)
