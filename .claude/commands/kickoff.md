---
description: 신규 프로젝트를 §4 Mesh 5요소 정합으로 착수. [1] 슬러그·STATE → [2] TeamCreate + 4명 동시 spawn → [3] 팀장 confirm 정식 진입 신호 → [4] 병렬 진행 (부분 broadcast + 양방향 reply multi-hop + 자가점검 완성 검증 + 모든 영역 병렬·유기) → [5] 노션관리자 (PM 명시) → [6] 사용자 보고.
argument-hint: <고객사> <프로젝트명> [PM]
---

# /kickoff — 신규 프로젝트 착수 (M15 Mesh 모델)

신규 프로젝트 1건을 §4 Mesh 5요소 정합으로 착수한다 (CLAUDE.md §4-0). 4명 동시 spawn + 부분 broadcast 연속 흐름 + 양방향 reply multi-hop + 자가점검 완성 검증 + 모든 영역 병렬·유기.

## 인자
- `$1` 고객사명 (필수)
- `$2` 프로젝트명 (필수)
- `$3` PM (선택, 미지정 시 사용자에게 질의)

## 절차 (팀장 Claude가 수행, [1]~[6])

### [1] 슬러그·STATE 초기화

1. 고객사·프로젝트명으로 **슬러그 생성** (영문 소문자 + 하이픈, CLAUDE.md §5)
   - 예: "BNSYSTEM / Verihum 사람 인증" → `verihum-auth`
   - 슬러그 충돌 시 접미사 `-v2` 등으로 구분
2. `projects/<slug>/` 디렉토리 생성
3. `projects/<slug>/STATE.md` 초기화 (CLAUDE.md §5 필수 필드 모두 포함)
   - 고객사, 슬러그, Notion Page ID(미등록), PM, 현재 단계(`기획중`), 마지막 업데이트(오늘)
   - 산출물 인덱스 4개 빈 체크박스 (01-prd / 02-tech-review / 03-ux-spec / 04-prototype-mvp/)
   - Decision Log: "`/kickoff`로 착수 (YYYY-MM-DD)"
4. `projects/_INDEX.md`에 신규 행 추가 또는 `weekly-status` Skill 호출로 재생성
5. `projects/<slug>/_broadcast.log` 빈 파일 생성 (broadcast/reply 흐름 추적용)

### [2] Mesh 분해 — TeamCreate + 4명 동시 spawn (§4-0 (i))

**한 메시지 내 다음 모두 동시 실행** (parallel tool calls):

1. **TeamCreate** `<slug>` (Agent Teams 활성화 — `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`)
2. **TaskCreate 4건 동시** — 4 영역 draft Task (각 영역 sub-task 후보)
   - `service-planner-draft` / `tech-reviewer-draft` / `ux-planner-draft` / `publisher-draft`
3. **Agent spawn 4명 동시 (병렬)**:
   - `subagent_type=서비스기획자`, `team_name=<slug>`, `name=service-planner`
   - `subagent_type=기술검토자`, `team_name=<slug>`, `name=tech-reviewer`
   - `subagent_type=UX기획자`, `team_name=<slug>`, `name=ux-planner`
   - `subagent_type=퍼블리셔`, `team_name=<slug>`, `name=publisher`
   - 각 Agent prompt에 §4-0 5요소 + 자기 영역 작업 절차 + slug + 비즈니스 배경 명시
4. **PM 비즈니스 배경 입력** — service-planner에 `SendMessage`로 전달 (또는 service-planner가 `AskUserQuestion`으로 자율 인터뷰)

**금지**:
- ❌ 1명만 spawn 후 후행 순차 호출 (격차 1 — 워터폴 회귀)
- ❌ TaskCreate만 동시 + Agent spawn 순차 (4명 동시 spawn 미작동)

**검증** (settings.json `check-mesh-spawn` hook):
- 한 메시지 내 Agent 호출이 4명 미만 + team_name 있음 → NOTICE
- "§4-0 (i) — 4명 동시 spawn 미작동 의심"

### [3] 팀장 confirm — 정식 산출물 진입 신호

1. 4 Teammate spawn 완료 + draft Task 4건 생성 확인
2. 표준 4종 매핑·의존성 자연 순서·broadcast 트리거 (각 Skill·에이전트 §2 작업 절차 inline) 정합 확인
3. confirm 통과 시 4 Teammate에 `SendMessage` broadcast(start_signal) 발행:
   - "정식 산출물 작성 진입. §4-0 5요소 적용. 자가점검 = 완성 검증 한정. 부분 broadcast 연속 흐름. reply multi-hop"

**※ 후행 진입 게이트 아님** — 이미 [2]에서 4명 spawn 완료. confirm은 *정식 산출물 진입 신호* (draft → 정식 전환 신호).

### [4] 병렬 진행 — Mesh 흐름 (§4-0 (ii)~(v))

4 Teammate가 자기 영역 산출물 작성 (병렬·유기). 팀장 controller는 흐름 모니터링.

#### [4-a] 부분 broadcast 연속 흐름 (§4-0 (ii))

- 각 Teammate는 자기 Skill SKILL.md·에이전트 정의 §2 작업 절차 inline broadcast 트리거 카탈로그 참조
- 부분 확정 사건마다 *즉시* 발행 — `SendMessage` broadcast 또는 `_broadcast.log` 기록
- 영역별 트리거 예시 (M16 정합):
  - REQ: §0 PM 원본 1줄 / §A WHY / §A 1차 사용자 / §B 16 필드 일부 채움 / §B 요구사항 1건 완성 (REQ-{도메인}-NNN-NN) / §C 표준 패턴 자율 결정 / §D 오픈 이슈
  - TR: 외부 의존성 후보 1차 / 기술 스택 1개 확정 / 공수 1차 시나리오 / 요구사항 1건 평가 (TR-NNN ↔ REQ-{도메인}-NNN-NN)
  - UX: 화면 1개 후보 (UI-{명칭}-{NN}) / 메타 7 필드 채움 / 시각적 스켈레톤 작성 / 4상태 확정 / 빈·에러·로딩 자동 실패 발견
  - P: assets 토큰 1개 확정 / HTML 파일 1개 발급 (`pages/<UI-{명칭}-{NN}>.html`) / NA 발견 (UI ↔ REQ 매핑 누락)
- ❌ **묶음 broadcast 금지** (산출물 완성 시점에 1회 발행 = 격차 2 회귀)
- ❌ **KPI(성공 지표) broadcast** — PRD 본질 X (PI-008)
- ❌ **S-NNN / P-NNN 매핑 표시** — M16 폐기. UI-{명칭}-{NN} 단일 (PI-019 A1)

#### [4-b] 양방향 reply multi-hop (§4-0 (iii))

- 후행 영역이 선행 산출물에서 *명시 없음 / 모순 / 누락* 발견 시 **자율 결정 금지**
- `SendMessage`(선행 owner) reply 발행 — peer-to-peer
- controller 경유 PM 확인 우회 가능 (§10 ask 권한 한계 시)
- reply 받은 owner: 자가점검 재발동 (M11) → 보강 → broadcast 재발행
- **연쇄 reply (multi-hop) 가능**: A → B → C → D 그래프 흐름 허용

예시 시나리오 (M16 정합):
```
퍼블리셔 → ux-planner: "UI-Member_Detail-03 본문 그리드 사양 누락"
   ↓
UX기획자 → service-planner: "REQ-USR-005-01 랭킹 표시 N값 미정"
   ↓
서비스기획자: PRD 자가점검 재발동 → "REQ-USR-005-01 N=Top 10 확정" broadcast
   ↓
UX기획자: 03 보강 → "UI-Member_Detail-03 그리드 확정" broadcast(P)
   ↓
퍼블리셔: pages/UI-Member_Detail-03.html 진행 재개
```

이 흐름 진행 중 다른 영역(예: 기술검토자)은 자기 일 진행 *계속*.

#### [4-c] 자가점검 = 완성 검증 (§4-0 (iv))

- 각 Teammate는 자기 산출물 *완성 시점* 자가점검 1회 (수정 시 재발동)
- 8필드 형식 (M11 v1) — `_broadcast.log` 기록 (`type=self-check`)
- 통과율 산정 (M16 정합):
  - **PRD**: §A 자동 실패 5건 (§0 PM 원본·16 필드 13 필수·REQ ID 정규식·경계 사례 명시·Use Case NN 분해 — M17 A-5 신설) + 통과율 7건 (6/7 이상)
  - **TR**: §A 5항목 (요구사항 ID 단위 평가·리스크 완화책·공수 3시나리오·외부 의존성·REQ 4 segment 인용)
  - **UX**: §A 자동 실패 3건 (메타 7 필드·UI ID 정규식·4상태) + 통과율 4건 (스켈레톤·Description·요구사항 ID 매핑·기술 제약)
  - **P**: 7항목 + 자동 실패 3건 (HTML 상단 주석·NA 형식·P-NNN 사용)
- ❌ **자가점검을 후행 진입 게이트로 사고 금지** (격차 3 회귀)
- 후행 영역은 *부분 broadcast마다* 진입 — 자가점검 통과 대기 X

**선행 산출물 *완성* 사용 게이트** (§6-2):
- 후행이 선행 산출물을 *완성된 산출물로 사용*하는 시점에만 자가점검 통과 필요
- 부분 broadcast로 부분 진행은 게이트 무관

#### [4-d] 모든 영역 병렬·유기 (§4-0 (v))

- 각 Teammate는 자기 일 진행 *계속*
- reply 흐름과 무관한 작업 멈춤 X
- reply 의존 부분만 플레이스홀더 마킹 + 보류, 다른 부분은 진행
- 진행 상황 표 §11 양식 적용 — **"대기" 컬럼 금지** / "선행 완료 후 진입" 표현 금지

#### 팀장 controller 역할

- 진행 상황 표 §11 양식 적용 (대기 컬럼 금지)
- broadcast/reply 흐름 모니터링 (`_broadcast.log` 추적)
- 자가점검 결과 수집 (각 산출물 완성 시점)
- §4-0 5요소 위배 감지 시 §11 4블록 자체 검증 → PM 확인
- PM 보고: 4 산출물 모두 완성 + 자가점검 통과 시점 1회

### [5] 노션관리자 호출 (PM 명시)

- **PM 명시 호출** — 자동 호출 아님. 노션 쓰기 settings.json `ask` 권한 발화 (CLAUDE.md §10)
- 4 산출물 모두 완성 + 자가점검 통과 확인 후 진행
- Agent: `노션관리자` (페이즈 외부 공통 도구, Teammate 외 — Agent 직접 호출)
- 작업: 4개 산출물을 노션에 새 프로젝트 페이지로 등록
  - `API-post-page`로 PROJECT DB 하위에 신규 페이지 생성
  - `API-patch-block-children`으로 산출물 블록 추가:
    - 01·02·03 → paragraph + bulleted_list_item 변환
    - 04-prototype-mvp/README.md → 노션 본문 / pages·assets → 외부 링크 (블록 변환 불가)
- STATE.md의 `Notion Page ID` 필드 업데이트
- 완료 후 노션 자가 점검 6/7 확인

### [6] 사용자 보고 (§11 4블록)

CLAUDE.md §11 표준 출력 4블록 준수:

```
[팀장] 신규 프로젝트 착수 완료
- 산출물: projects/<slug>/{01-prd.md, 02-tech-review.md, 03-ux-spec.md, 04-prototype-mvp/}
- 자가 점검 요약 (M16):
  - PRD: 자동 실패 N/5 + 통과율 N/7 (M17 — A-5 Use Case 분해 신설)
  - Tech: §A N/5
  - UX: 자동 실패 N/3 + 통과율 N/4
  - P: N/7 (자동 실패 N/3)
- 오픈 이슈: N건 (담당자·기한)
- 다음 권장: 노션 페이지 확인 / 페이즈 2 진입 시점 PM 결정
```

진행 상황 표 §11 양식 (대기 컬럼 금지):

| Teammate | 상태 | 자가 점검 | broadcast/reply | 비고 |
|----------|------|---------|-----------------|------|
| 서비스기획자 | 완성 | N/7 | 발행 X / 수신 Y | (텍스트) |
| 기술검토자 | 완성 | N/5 | 발행 X / 수신 Y | (텍스트) |
| UX기획자 | 완성 | N/4 | 발행 X / 수신 Y | (텍스트) |
| 퍼블리셔 | 완성 | N/7 | 발행 X / 수신 Y | (텍스트) |

## 게이트 (M15)

| 게이트 | 시점 | 조건 | 미달 시 |
|--------|------|------|--------|
| [2] Mesh 분해 | 4명 동시 spawn 완료 | TeamCreate + TaskCreate 4건 + Agent spawn 4명 모두 성공 (한 메시지 내) | spawn 실패 시 재시도 또는 PM 보고. `check-mesh-spawn` hook NOTICE 발화 시 즉시 재시도 |
| [3] 팀장 confirm | 정식 산출물 진입 신호 | 4 draft Task + 매핑·트리거 정합 확인 | confirm 미통과 시 spawn 1회 재시도 |
| [4] 병렬 진행 | 4 산출물 완성 자가점검 | 각 산출물 자가점검 통과 + broadcast/reply 흐름 정상 (`_broadcast.log` 추적) | 자가점검 미통과 시 재발동 (M11). 재시도 3회 연속 미달 시 PM 보고 (§10) |
| [4] 산출물 *사용* 게이트 | 후행이 선행을 완성 산출물로 사용하는 시점 | PRD 자동 실패 0/5 + 통과율 ≥ 6/7 (M17 — A-5 Use Case 분해 신설) / Tech §A ≥ 4/5 / UX 자동 실패 0/3 + 통과율 ≥ 3/4 + UI 확정 broadcast | 부분 broadcast/reply 흐름은 게이트 무관 (§4-0 (iv)) |
| [5] 노션관리자 | PM 명시 호출 | 4 산출물 완성 + PM 결정 | PM 보류 시 [5] 생략 |

**자가점검 게이트는 후행 영역 *진입* 게이트가 아님** — 산출물 *완성 사용 시점* 게이트 (§4-0 (iv) + §6-2).

## 중단 조건

- 사용자가 중단 요청
- 자가 점검 3회 연속 미달 (CLAUDE.md §10 재시도 한계)
- 노션 API 오류 2회 이상
- 고객사·프로젝트명이 비어있거나 불명확
- `check-mesh-spawn` hook NOTICE 누적 + spawn 재시도 미통과
- reply 재발동 N회 초과 (M11-I9 상한 — v1.1 이관 후 적용)

## 주의

- **§4-0 5요소 위반 시 §11 4블록 자체 검증 + Codex Gate C advisory 발동** (§10 5차 보장)
- 진행 상황 표는 §11 양식 적용 — **"대기" 컬럼 금지** / "선행 완료 후 진입" 표현 금지 (§4-0 (v) 위배)
- 사용자 질의는 가능한 한 한 번에 묶어서 (`AskUserQuestion`)
- 중간 산출물을 사용자에게 모두 보여주지 말고 **요약+링크**만 (CLAUDE.md §11)
- 각 Teammate의 개별 완료 보고는 팀장이 내부 수집, 사용자에게는 [6] 최종 보고만 전달
- 페이즈 2 (`/handoff`·퍼블 Production·백엔드) 진입은 v1 미정의 — v1.1+ 신설 (CLAUDE.md §12)
- 본 Slash command 변경 시 Codex Gate C 발동 대상 (§3)
