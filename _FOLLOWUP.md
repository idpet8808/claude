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
- **기능명세서 별도 산출물 신설 검토** (2026-05-06 M13 v1 C6 발견 — slug=`mensa-ranking-challenge`)
  - **현 격차**: PRD §4 (기능 범위 MoSCoW) + TR §2 (Must 전수 평가)에 분산. **기능별 흐름도·입출력·예외 처리·정합성 룰 부재**
  - **BN시스템 실무 관행**: 별도 기능명세서 작성 표준
  - **v1.1+ 정련 옵션**:
    - (a) `02b-functional-spec.md` 신설 (PRD↔TR 사이 단계) — 영역 owner = 서비스기획자 또는 TR-FUNC owner 신설
    - (b) PRD §4 대폭 강화 (REQ-NNN 카탈로그 + 기능별 상세 명세)
    - (c) TR §2 Must 전수 평가를 기능별 명세로 확장
  - **헌법·plan·Skill 변경 수반** = Gate C 발동 대상
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
