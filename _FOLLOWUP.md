# 운영 정련·후속 이관 분류 (M13-② 산출물)

> M9 §10-4-3 누적 항목 + v1 운영 시행착오 발견 항목을 4 분류로 정리.
> v1 운영 중 새 항목 발견 시 즉시 본 파일에 등록 (Decision Log 동시 1줄 기록).
> 본 파일은 **루트** 위치로, 운영 등록 가시성을 우선한다 (`_design/`은 아카이브 성격으로 분리).

---

## ① Skill 흡수 (M13-③에서 처리)

각 Skill의 `checklist.md` / `template.md` / `SKILL.md`에 흡수.

- 자가 점검 8필드 양식 (M9 §9-4 F-7) — 각 Skill `checklist.md`에 표 형식 적용
- 범용 자가 점검 U-1~U-5 (M9 §10-2-2 line 1748~1754 정의 그대로) — 각 Skill `checklist.md`에 5항목 묶음
- 전 owner 공통 H-1·H-2·H-5 NA 휴리스틱 (M9 line 1744) — NA 항목 시 적용
- NA SSoT 예외 (§3-3 I5) — `publisher.md` 안티 패턴 + `publisher-html/checklist.md` 항목 4 (이미 반영 ✓)
- README NA list 형식 `- REQ-NNN: 사유 1줄` 강제 — `publisher-html/template.md` (이미 반영 ✓)
- ID 결번 허용 + Decision Log 기록 — 각 Skill checklist의 ID 정합 항목 (이미 publisher-html 반영 ✓)

## ② v1.1 이관

- **M10-I1~I4** (M9 §10-1)
  - I1: 네임스페이스 추가 시 §1-2 M:N 매핑 확장 모델
  - I2: 영역 분할 시 ID 충돌 (TR_BACKEND/TR_FRONTEND 등)
  - I3: 일괄 ID shift vs §1-2-2 재사용 금지 충돌
  - I4: ID 체계 확장 시 §9-4 카탈로그 정규식 일괄 갱신 절차
- **M11-I9** 재발동 상한·순환 detection 임계·메커니즘
- **M12 보류 이슈** (M9 §10-3)
  - I1: Teammate↔Teammate SendMessage 자동 기록
  - I3: 디버그 dump 부재
  - I5: 권고 3 β→α 자동 이관 가능성
  - I6: notion-sync 결과 충실도 검증
  - I8: P3 발동 지표 임계값 조정 절차 (팀장/owner 제안 → PM 승인)
- **페이즈 2 정의**
  - `/handoff` 명령 신설
  - 퍼블리셔 Production 모드 정의 (디자인 토큰·인터랙션 정식·API 연결)
  - 백엔드 에이전트 신설 (`.claude/agents/backend.md`)
  - 백엔드 Skill (`backend-impl` 또는 유사)
  - `04-prototype-prod/` 디렉토리 정의
  - `05-backend/` 디렉토리 정의
  - API 계약 정식화 (페이즈 1 `02-tech-review.md` 보강 vs 페이즈 2 진입 직후 정의 — 미정)
  - 페이즈 2 진입 게이트 (PM 명시 + 페이즈 1 산출물 4종 자가 점검 통과 등)
- **type=broadcast 6필드 legacy 호환** (M9 line 1768) — 신규 8필드와 병존 vs 6필드 폐기 결정
- **헌법 Mesh + 부분 broadcast + 양방향 reply + S 무관 선행 영역 동시 정신 vs 실제 순차 진행 격차** (2026-05-06 M13 v1 C6 발견 — slug=`mensa-ranking-challenge`)
  - **현실 한계**: Claude Code Agent 도구 동기 호출 / `_broadcast.log` 파일 기반 메모 (실시간 채널 부재) / subagent task 종료 후 listening 불가 / 4 동시 호출 시 토큰 4배 + conflict 위험
  - **실제 진행**: Mesh 분해 단계 생략, 정식 산출물만 의존성 순서로 순차 (PRD → TR → S → P)
  - **v1.1+ 정련 방향**:
    - `superpowers:dispatching-parallel-agents` Skill 활용 (S 무관 영역 동시 호출)
    - SendMessage 기반 cross-Agent 통신 (양방향 reply 실 구현)
    - `_broadcast.log`를 실시간 채널로 변환 (파일 → in-memory 큐 또는 hook 기반)
    - 부분 broadcast trigger 조건 정형화 (예: WHY 확정 시점 = TR 외부 의존성 1차 시작 신호)
  - **참고**: M13 v1 = 운영 검증 정신 정합. 실 발견된 격차로 v1.1+ 정련
  - **2026-05-06 M14 부분 해결**: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` 활성화 + CLAUDE.md §4-11 Agent Teams 매핑 신설 (4명 Teammates + 노션관리자 별도). TeamCreate/TaskList 공유로 Mesh + 부분 broadcast 정신 환경 확보. 운영 검증은 다음 멘사 재진행 세션부터 (`mensa-ranking-challenge` 처음부터 재테스트)
- **기능명세서 별도 산출물 — *옵션 산출물 신설* (M16 갱신, PI-005)** (2026-05-06 M13 v1 발견 → 2026-05-07 M16에서 결정)
  - **2026-05-07 M16 결정**: **옵션 (a) 채택 + 옵션 산출물 분류** — `01b-functional-spec.md` (PRD 직후, TR 직전 위치). *필요시 작성* (PM 명시 또는 service-planner/tech-reviewer 판단 시 신설). default 페이즈 1 산출물 4종은 그대로 유지.
  - **본 항목 v1.1 이관 → v1 옵션 진입** (PI-005 정합)
  - **트리거 (v1 잠정)**:
    - (a) PM 명시적 "기능명세서 필요" 결정
    - (b) service-planner 또는 tech-reviewer가 PRD 작성 중 *기능 파생 명세 필요* 판단 → controller 경유 PM 질의 → PM 결정
  - **ID 체계**: `FN-NNN` 영역별 독립 시퀀스 (M10 정합), 매핑 형식 `FN-001 (→ REQ-USR-001-01)`
  - **신설 시 영향 영역** (페이즈 1 산출물 4종 → 5종):
    - 헌법 §5 산출물 정의 (M16에서 옵션 산출물 단서 추가 완료)
    - 신규 Skill `functional-spec` (필요 시 신설)
    - 신규 에이전트 `function-specifier` 또는 service-planner·tech-reviewer 영역 확장 결정
  - **현 격차 (참고)**: PRD §B 16 필드(M16) + TR §2 요구사항 ID 단위 평가에서 *기능 파생 명세*가 부족할 경우 본 옵션 산출물 진입
  - **운영 정련 영역**: 트리거 정형화·신설 빈도 추적 (`_FOLLOWUP.md` ③ 일부 이관)
- **세션 중 신설 에이전트 자동 인식 부재** (2026-05-06 M13 v1 C6 발견 — slug=`mensa-ranking-challenge`)
  - **현 격차**: `.claude/agents/publisher.md` 신설 후 본 세션에서 Agent tool로 호출 시 "Agent type '퍼블리셔' not found" 에러. Available agents = 본 세션 *시작 시점* 등록분만 (4 에이전트)
  - **Claude Code 동작**: subagent_type은 *세션 시작 시점*에 등록되며 세션 중 신설 파일은 *다음 세션부터* 인식
  - **임시 우회**: `general-purpose` Agent에 publisher 정의 위임 (publisher.md + publisher-html Skill을 Read하도록 prompt에 명시)
  - **v1.1+ 정련 옵션**:
    - 신규 에이전트 신설 후 *Claude Code 재시작 권고* 헌법 §6에 추가
    - 또는 Claude Code의 *동적 agent 등록* 메커니즘 확인 (있다면 활용)
    - kickoff 명령 또는 Skill 신설 시점 hook 활용 가능성
  - **참고**: 본 격차는 *Claude Code 도구 한계*. 헌법 변경 X — 운영 워크플로 보강만 필요
- **`_INDEX.md` 운영 원칙 vs 실 사례 격차** (2026-05-06 M13 v1 C6 발견 — slug=`mensa-ranking-challenge`)
  - **현 원칙**: `projects/_INDEX.md` "기존 노션 진행 프로젝트는 하네스 대상 아님 (노션관리자가 MCP로 직접 조회)"
  - **실 사례**: `/kickoff` 후 노션 동기화 시점에 *동일 프로젝트가 이미 노션에 등록*되어 있음 발견 (page_id `356fd8b1-41f3-8095-9a28-cbbf2b7961ec`, "멘사>랭킹 챌린지 프로젝트 진행", PM 신주한 일치)
  - **PM 결정**: 기존 페이지에 산출물 4종 연결 (예외 처리)
  - **v1.1+ 정련 옵션**:
    - (a) 원칙 강화: 노션에 이미 있는 프로젝트는 `/kickoff` 진입 시점에 *post-search 선행 검증* + 거부 또는 경고
    - (b) 원칙 완화: "기존 노션 페이지 있는 프로젝트도 하네스 적용 가능" 예외 명시 + 연결 절차 정형화
    - (c) 두 모드 분리: `/kickoff <slug>` (신규) vs `/kickoff-existing <page_id>` (기존 연결) 명령 분기
- **idle notification 의미 모호 — 진행 중·PM 응답 대기·차단 구분 불가** (2026-05-06 M14 멘사 v2 재진행 1회차 발견 — slug=`mensa-ranking-challenge-v2`)
  - **현 격차**: Agent Teams Teammate가 *PM 응답 대기*로 idle 상태일 때, 팀장(controller)에게 도착하는 `idle_notification`은 `idleReason: "available"` 1개만 — 진행 중 자율 작업 / PM AskUserQuestion 응답 대기 / 작업 차단 3가지 상태 구분 불가
  - **본 세션 발생 패턴**: service-planner spawn 직후 PM에게 8개 항목 AskUserQuestion 발화 → idle 알림 → 팀장이 "차단" 진단 → SendMessage로 상태 확인 → 또 idle → 팀장이 시행착오 #4 (subagent ask 권한 거부) *오진*. 실제로는 PM 응답 대기 중이었고, PM 답변 도착 후 PRD 7/7 정상 작성 완료
  - **영향**: 팀장 진단 오류 → 운영 옵션 제시(controller 직접 작성 등) 비효율적 → PM 시간 낭비. 시행착오 #4 재현 시도가 *오진* 가능성 상존
  - **임시 우회**: idle 1~2회는 *기다림*. SendMessage로 상태 명시 질의 시 응답 없으면 그제야 차단 의심
  - **v1.1+ 정련 옵션**:
    - (a) Teammate가 PM 인터뷰 발화 시점에 controller에게 SendMessage 1줄로 *상태 보고* 의무화 (정의 §2 절차에 추가)
    - (b) `idleReason` 확장 — `awaiting_user`·`blocked`·`available` 3종 분리 (Claude Code 도구 한계 — 자체 합의 불가능, 우회 패턴 필요)
    - (c) `_broadcast.log`에 self-check + state 이벤트 기록 의무화 (idle 시점 직전 활동 추적 가능)
- **팀장 controller 진행 상황 시각화 §4 워터폴화 회귀 패턴** (2026-05-06 M14 멘사 v2 재진행 1회차 발견 — slug=`mensa-ranking-challenge-v2`)
  - **현 격차**: 팀장이 PM에게 진행 상황 표를 그릴 때 [4] 정식 산출물 단계 4명을 *서비스기획자=진행 중 / 나머지 3명=대기*로 워터폴화 시각. §4 정의는 *부분 broadcast 받자마자 후행 부분 진행 가능* + *S 무관 영역 동시 선행 가능* 인데, 팀장 시각화는 `의존성 순서 = 워터폴 게이트`로 잘못 표현
  - **본 세션 발생 패턴**: service-planner spawn 후 → 팀장이 tech-reviewer/ux-planner/publisher spawn을 *PRD 완성까지 대기* → PM 지적("다 달라붙어야 할텐데") → 즉시 정정 + UX·퍼블 동시 spawn
  - **M14 4차 잘못 패턴 회귀**: M14 인수인계의 본 세션 누적 잘못 4차 (헌법 §4 다운그레이드 변명) 패턴이 *시각화 단계*에서 재발. M14 (d) 4중 신뢰성 보장 1차(도구 인지 사전 검증)는 *spawn 시점*에 한정 발화 — *시각화 단계*에 재발화 미작동
  - **영향**: PM 매번 지적 부담. 4명 동시 spawn 가능했음에도 순차 spawn으로 진행 시간 손실
  - **v1.1+ 정련 옵션**:
    - (a) `/kickoff` Slash command [2] Mesh 분해 단계에 "4 Teammate 동시 spawn" 명시 + Group A 패턴 강제
    - (b) 팀장 진행 상황 표 양식 표준화: "대기" 컬럼 폐지 → "진행 중 / 부분 진행 / 정식 진입 게이트 통과 / 완료" 4상태
    - (c) M14 (d) 1차 신뢰성 보장 발화 시점 확장 — spawn 시점 외 *시각화·보고 시점*에도 §4 부분 broadcast 정신 자동 검증 hook
    - (d) `_broadcast.log`에 *각 영역 진행 상태* 실시간 기록 → 팀장이 직접 표 그리는 대신 자동 시각화 (M9-5 cross-ref 자동 검증과 통합 가능)
- **M15 plan B-7 경로 격차 — kickoff Skill 미존재** (2026-05-07 M15 Group B 진행 중 발견)
  - **현 격차**: `_design/M15_mesh-truth-plan.md` B-7이 ".claude/skills/kickoff/SKILL.md" 보강 명시. 실제 파일 시스템에 해당 경로 부재. kickoff은 Slash command(`.claude/commands/kickoff.md`)로만 존재
  - **PM 결정 (2026-05-07)**: B-7 스킵. spec § 4.6.1 "kickoff Skill: §4.4 /kickoff Slash command 변경에 정합"은 *정합 확인 목적*이지 신설 명시 X. B-1에서 spec § 4.4 본문 그대로 적용 → spec § 4.6.1 정합 자동 충족
  - **v1.1+ 정련 옵션**:
    - (a) plan 작성 시 실제 파일 존재 여부 사전 검증 절차 추가
    - (b) Skill 정의가 Slash command와 동일 의미를 갖는 경우 SSoT 분리 정책 명시 (중복 금지)
- **Subagent 환경 settings.json `ask` 권한 자동 거부** (2026-05-06 M13 v1 C6 발견 — slug=`mensa-ranking-challenge`)
  - **현 격차**: 노션관리자 subagent에 위임된 `API-patch-page` 호출 시 settings.json `ask` 프롬프트가 PM에게 발화되지 않고 *자동 거부*됨. controller(팀장 Claude)에서만 ask 발화 → PM 승인 가능
  - **영향**: 노션 쓰기 작업 (`patch-page`·`patch-block-children`·`post-page` 등)을 노션관리자 subagent에 위임할 수 없음. controller가 직접 호출해야 PM 승인 발화
  - **임시 우회**: controller 직접 노션 MCP 호출 (CLAUDE.md §8 "노션 MCP는 노션관리자만" 안티 패턴 예외 처리 — 권한 한계로 인한 불가피한 예외)
  - **v1.1+ 정련 옵션**:
    - (a) 노션관리자 정의 §6에 "노션 쓰기는 controller 위임 호출" 명시
    - (b) Claude Code subagent 권한 정책 확인 — ask 발화 메커니즘 차이 분석
    - (c) `notion-sync` Skill 절차에 "controller에서 호출, subagent는 변환만" 단계 분리

## ③ 운영 정련 보존 (v1 운영 후 정련)

v1 운영 시행착오 누적 후 정련. 임계값·정책은 잠정값으로 시작.

- **M12 객관 지표 임계 4개** (M9 §10-3, M12-I8)
  - M9-5 cross-ref 검증 실패율 5%
  - 디버깅 30분 초과
  - `_broadcast.log` 10MB
  - PM 디버깅 회부 월 3회
- **M12-I4** `_broadcast.log` 회전 정책 (rotate size·주기·아카이브 위치)
- **M11 type=self-check vs H1/H2 silent 분리** (M9 §10-2-3 운영 정련 이관)
- **M11 50% impact set 포함 범위** — deprecated/NA/skeleton 포함 여부 (v1 잠정: 상태 무관 포함, skeleton 제외)
- **M11 재발동 카운팅 윈도우** — v1 잠정 "산출물 lifecycle/Gate B 시도 내" 해석
- **M9-5 휴리스틱 임계값 정련·조정 주체** (M10+ 이관)
- **H1/H2 false positive resolved marker** (M10+ 이관)
- **카탈로그 신규 카테고리 추가 메커니즘** (M13 또는 운영 — 영역 신설 절차 정형화 필요)
- **M11 자가 점검 evidence 형식 표준화** (구현 단계)
- **M11 owner별 자가 점검 운영 학습** (false positive·항목 정련)
- **M14 헌법 변경 4블록 형식 운영 검증** (2026-05-06 M14 신설) — §11 4블록 형식 + §6-6 도구 인지 사전 검증 + §10 헌법 변경 절대 규칙 + settings.json PreToolUse NOTICE hook. 본 세션 4차 잘못 패턴(자의적 헌법 다운그레이드/교체) 회귀 발생률 추적. 4블록 형식 누락·우회 사례 발견 시 본 항목 갱신
- **M14 Agent Teams 적용 운영 검증** (2026-05-06 M14 신설) — §4-11 매핑(4명 Teammates + 노션관리자 별도) 운영 시행착오 추적. TaskList 공유 부담·SendMessage 양방향 reply 실효성·draft↔정식 단계 전환 비용 등
- **M17 6건 격차 정정 운영 검증** (2026-05-08 M17 신설) — PI-020~PI-025 6 본질 정합 (Gap A PRD §B Use Case 분해 / B brainstorming 자동 발화 / C broadcast 양쪽 의무 / D·E·F Teammate idle·정지 의무 통합). 멘사 v3 검증 sub-step에서 6건 격차 해소 확인. 새 격차 발견 시 본 항목 갱신
- **M17 idle·stop hook 보강 검토** (2026-05-08 M17 신설 — v1.1 이관) — D·E·F 통합 정정이 명문화 + 에이전트 §2 명시로 적용됨. Teammate 행동 의무는 hook 강제 어려움 (Teammate 내부 결정 검증 불가). 운영 시행착오 누적 시 v1.1+ idle/stop hook 보강 검토 (`PostToolUse on Write/Edit` matcher — 산출물 작성 직후 stderr REMINDER 등)
- **M17 PreToolUse on Agent matcher subagent_type 동작 검증** (2026-05-08 M17 신설) — 한글명 매처 (`서비스기획자|기술검토자|UX기획자`) + grep 패턴 강화 (`\s*:\s*`) 적용. 멘사 v3 검증 시 실 발화 동작 확인. JSON 포맷 변화 시 grep 취약성은 v1.1+ jq·yq 등 구조 파싱 도입 검토 영역

- **M18 멘사 v3 시연 발견 시행착오 2건** (2026-05-08 신설 — slug=`mensa-ranking-challenge-v3`, M18 첫 적용 검증)
  - **(1) PI-002 후보 — §B 다건 묶음 broadcast 패턴**
    - **현상**: service-planner가 PRD §B 12 REQ를 1번 broadcast로 묶어서 발행 (§A WHY 단독 broadcast 1건 후 §B 전체 1건). 부분 broadcast = 연속 흐름 (§4-0 (ii)) 본질 X
    - **원인**: prd-draft SKILL.md §3 부분 broadcast 트리거 표에 "§B 1건 완성마다 broadcast" 명시되어 있으나, "§B 전체 완성 후 broadcast"가 *예시*인지 *필수*인지 모호. service-planner가 *완성 후 묶음 broadcast* 선택
    - **정련 방향**: prd-draft SKILL.md §3 트리거 카탈로그를 "필수" 명시 강화 (`§B 1건 완성마다 즉시 broadcast 필수, 묶음 X` 명시) + checklist에 "broadcast 발행 건수 ≥ 요구사항 건수 N" 정합 검증 항목 신설 가능성. 격차 2 회귀 방지 강화
    - **자가점검 통과는 정합** — broadcast 양식 위배만 발견, 산출물 본질 OK
  - **(2) PI-024 (D) 확정 — 4 agent confirm signal ack 메아리 패턴**
    - **현상**: 4 Teammate 중 3명 (service-planner / tech-reviewer / publisher) 모두 controller confirm signal 수신 시 *ack 메시지 발송* + idle 진입. 메시지 본문은 "이미 완료된 상태입니다"·"silent idle 유지" 등 정합 자체를 보고하는 메아리. 자기 모순 (silent idle 주장하면서 메시지 발송)
    - **원인**: 4 agent 정의 §2 작업 절차에 PI-024 (D)(E)(F) 명시되어 있으나, *spawn 직후 controller confirm signal 처리* 케이스가 모호. agent들이 confirm signal에 대한 응답 의무를 자율 결정으로 ack 메시지 발송
    - **정련 방향**: 4 agent 정의 §2 작업 절차 또는 4 SKILL.md에 **"controller confirm signal 수신 시 silent 작업 진입만 — ack 메시지 발송 X"** 명시 강화. 또는 §4-0 5요소에 "(D-1) confirm signal silent 처리" 신설 가능. 격차 D 회귀 방지 강화
    - **결과적으로 진행 흐름 자체는 정상** — controller가 메아리 메아리 회피 (M17 정합)하여 추가 reply 발송 X. 시연 가치 = 정확한 시행착오 사례 수집

  본 2건은 v1 운영 검증 가치 — 다음 sub-step에서 4 agent 정의 + Skill 정의 일괄 보강 필요

## ④ 폐기

- **2026-04-14 M4 Mesh 메시지 전달 프로토콜** (롤백, M9~M12 Mesh 모델로 대체)
- **R 모델 흔적** (2026-04-07 폐기, M9~M12 Mesh 모델로 대체) — 메모리 `project_harness_redesign.md`에 폐기 기록
- **M4 작업 잔재 11개 파일** (M13-② Task B6에서 git 정리)
  - `.tmp-codex-m4-4th.txt` / `-5th-prompt.txt` / `-5th-out.txt` / `-6th-prompt.txt` / `-6th-out.txt` / `-7th-prompt.txt` / `-7th-out.txt` (7개)
  - `.tmp-m4-rev5.md` / `-rev6.md` / `-rev7.md` (3개)
  - `.codex/config.toml.bak` (1개)

---

## 운영 등록 가이드 (v1 운영 중)

시행착오 발견 즉시 다음 절차:

1. **본 파일 해당 분류에 한 줄 추가**:
   ```
   - YYYY-MM-DD — <발견 사항> — 분류 근거 (slug=<slug>, 관련 §·라인)
   ```

2. **해당 프로젝트 STATE.md Decision Log에 1줄 기록** (참조 링크):
   ```
   - (YYYY-MM-DD) v1 운영 시행착오 발견 — _FOLLOWUP.md ① / ② / ③ 등록
   ```

3. **헌법 변경 필요 시**: 변경안 작성 → Gate C (Codex 안전 advisory) → PM confirm → CLAUDE.md/AGENTS.md 갱신.
   헌법 변경 불필요 시: Skill·template·checklist만 갱신 (Gate B 무관).

## v1 통과 기준 (spec §7-5)

- 시행착오 등록 ≥ 1건 (없으면 검증 부족 의심)
- 헌법 변경 0~3건 (다수 변경 시 M13 재검토 신호)
