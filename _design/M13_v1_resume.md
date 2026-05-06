# M13 v1 운영 사이클 검증 (C6~C10) 인수인계 (2026-05-06 세션 종료 스냅샷)

> 다음 세션 시작 시 **이 파일 1개만 읽으면 재개 가능**.

---

## 직전까지 완료된 것

M13 v1 = 3 sub-step (Group A 퍼블 신설 / Group B 헌법 재작성 / Group C 운영 도구 갱신·검증). **C6 진입 직전** 시점.

| Group | Commit | 산출물 | 상태 |
|-------|--------|--------|------|
| A 퍼블리셔 신설 | `da68d0f` | publisher.md (134줄) / publisher-html Skill 3 파일 / 정합 점검 메모 / M13_decisions.md | ✓ |
| B 헌법 재작성 | `2629059` | CLAUDE.md 392줄 (12 섹션) / AGENTS.md / _FOLLOWUP.md 95줄 / _design/ 트래킹 25 파일 / 임시 파일 11개 정리 | ✓ |
| C 부분 (C1~C5) | `0264b4a` | 4 에이전트 일괄 갱신 / 5 Skill 갱신 / 3 Slash 갱신 / projects/_INDEX.md | ✓ |
| **C 마무리 (C6~C10)** | (다음 세션) | 실 프로젝트 적용 + 부정 시나리오 + 시행착오 등록 + 종료 commit | ⏳ |

**누적 분량**: 약 30 파일 신설/갱신, 약 5,700 insertions, 4 commit (base + da68d0f + 2629059 + 0264b4a)

## 결정 사항 누적

`_design/M13_decisions.md` 참조 — M13-① 5 결정 + M13-② 3 결정 + M13-③ 3 결정 + Codex Gate B/C 처리 사유 모두 기록.

핵심:
- M13-① 퍼블 자가 점검 7항목 6/7, MVP 화면 = UX 명세 그대로, P-NNN HTML 생성 시 발급, assets 변경 이력 = STATE.md Decision Log 통합
- M13-② CLAUDE.md §3 70줄 유지, 객관 지표 4개 임계 = `_FOLLOWUP.md` ③ 보존, `_FOLLOWUP.md` 위치 = 루트
- M13-③ /kickoff 게이트 5→6 PM 명시 호출, **실 프로젝트 = PM이 제시할 실제 신규 고객사 프로젝트** (더미 X), 시행착오 minimum ≥ 1건

---

## 다음 재개 지점 — C6 실 프로젝트 적용

### PM이 제시할 정보 (다음 세션 시작 시)

1. **고객사명** (예: "Verihum")
2. **프로젝트명** (예: "사람 인증")
3. **PM** (선택)
4. **비즈니스 배경 (WHY)** — PRD §1 시작점
5. **1차 사용자** — 구체 1명 (나이·직업·맥락)
6. **성공 지표** — 측정 가능한 목표값 (숫자 + 측정 방법)

(1·2·3만 먼저 알려주면 `/kickoff` 후 서비스기획자가 4·5·6을 `AskUserQuestion`으로 묶어 질의)

### C6 정상 시나리오 8단계 (`/kickoff` 1~7단계)

1. `/kickoff <고객사> <프로젝트명> [PM]` → `projects/<slug>/` + STATE.md 초기화 (4단계 = `기획중`)
2. Mesh 분해 — 4명 동시 draft → 팀장 confirm
3. 서비스기획자 → `01-prd.md` + 부분 broadcast
4. 기술검토자 → `02-tech-review.md` (부분 broadcast 받자마자 외부 의존성 1차 가능)
5. UX기획자 → `03-ux-spec.md` (4상태 정상/빈/에러/로딩 자동 실패 조건) → **S 확정 broadcast 발행**
6. 퍼블리셔(MVP) → `04-prototype-mvp/{pages, assets, README.md}` (assets는 S 무관 선행 가능)
7. `/status` → `_INDEX.md` 갱신
8. `/sync-notion <slug>` → PM 승인 → 노션 PROJECT DB 등록

### C7 부정 시나리오 8건 검증

1. PRD 자가 점검 4/7 → 기술검토자 호출 거부
2. UX 명세 빈/에러/로딩 1개 누락 → 자동 실패
3. 퍼블리셔 03-ux-spec 수정 → 영역 침범 거부
4. 노션 API 2회 오류 → 재시도 중단 + 수동 개입
5. `.mcp.json` 수정 시도 → PreToolUse 훅 BLOCKED
6. 종료 단계 STATE.md 수정 → PM 명시 확인 필요
7. 서비스기획자 01-prd 수정 → broadcast 누락 → M9-5 cross-ref error → owner remediation
8. 자가 점검 3회 연속 미달 → 재시도 한계 + 사용자 재검토 요청

### C8~C10 종료 절차

- **C8 Codex Gate B advisory**: Bash node 권한 미해결 → **PM 직접 통과** (Group A·B 동일 패턴, advisory 정신, `_design/M13_decisions.md` 사유 기록)
- **C9 시행착오 등록**: ≥ 1건 발견 시 `_FOLLOWUP.md` ① / ② / ③ / ④ 분류 + 해당 STATE.md Decision Log 1줄 참조
- **C10 commit**: Group C 마무리 commit + M13 v1 종료 보고

### v1 통과 기준 (spec §7-5)

1. 실 프로젝트 1건이 `/kickoff` → 노션 동기화까지 완주 (정상 8)
2. 부정 시나리오 8건 모두 의도대로 차단·에스컬레이션
3. Gate B 산출물 4종 advisory 통과 또는 PM 오버라이드 (Decision Log 기록)
4. `_FOLLOWUP.md` 시행착오 ≥ 1건 등록
5. 헌법 변경 0~3건 (다수 = M13 재검토 신호)

---

## 주의·제약 (다음 세션 시작 시 준수)

1. **피드백 룰**: M 이슈·sub-step 착수 시 매번 `superpowers:brainstorming` invoke (`feedback_brainstorm_first.md`). 단 C6는 *sub-step이 아니라 실행*이라 brainstorming 불필요. C6 진입 시 바로 `/kickoff` 시작 가능
2. **Codex Gate**: Bash node 권한 미해결 → PM 직접 통과 패턴 적용 (advisory 정신, CLAUDE.md §3)
3. **노션 쓰기**: settings.json `ask` 권한 자동 발화 (CLAUDE.md §10) — 5단계 게이트는 PM 명시 호출
4. **시행착오 발견 즉시**: `_FOLLOWUP.md` 분류 등록 + STATE.md Decision Log 1줄 참조
5. **가속안 (2) 정신**: 압축 진행. 사용자 가속 결정 시 분리하지 말고 일괄 처리
6. **선행 확정 침범 금지**: M1~M13 모든 결정은 v1 운영 중 *변경 대상 아님*. 시행착오 발견 시 `_FOLLOWUP.md`에 등록하고 v1.1+에서 정련

---

## 참조 파일 (디스크 경로)

| 파일 | 줄수 | 용도 |
|------|------|------|
| `CLAUDE.md` | 392 | M13 v1 헌법 (12 섹션, M1~M12 정형화) |
| `AGENTS.md` | ~95 | Codex 정의 (advisory 게이트) |
| `_FOLLOWUP.md` | 95 | 운영 정련·후속 이관 4 분류 (① Skill 흡수 / ② v1.1 / ③ 운영 정련 / ④ 폐기) |
| `_design/M13_decisions.md` | ~80 | M13-① ② ③ 결정 + Gate B/C 처리 사유 |
| `_design/M13_publisher_integration.md` | 87 | Group C 갱신 대상 식별 메모 |
| `_design/M9_deliverable-structure.md` | 1985 | M1~M12 결정 본체 (상세 근거 SSoT) |
| `_design/M13_resume.md` | 199 | M13 진입 시점 인수인계 (참고) |
| `docs/superpowers/specs/2026-05-06-m13-v1-design.md` | ~380 | M13 v1 spec |
| `docs/superpowers/plans/2026-05-06-m13-v1.md` | ~950 | M13 v1 구현 plan |
| `projects/_INDEX.md` | 38 | 활성 프로젝트 인덱스 (현재 비어있음) |
| `.claude/agents/{서비스기획자, 기술검토자, UX기획자, 퍼블리셔, 노션관리자}.md` | 각 ~120 | 5명 에이전트 정의 |
| `.claude/skills/{prd-draft, tech-review, ux-spec, publisher-html, notion-sync, weekly-status}/` | — | 6 Skill |
| `.claude/commands/{kickoff, status, sync-notion}.md` | — | 3 Slash 명령 |

---

## 다음 세션 첫 메시지 제안

> `_design/M13_v1_resume.md` 읽고 M13 v1 C6 (실 프로젝트 적용) 재개. 실 프로젝트 정보: **<고객사>** / **<프로젝트명>** / [PM] + 비즈니스 배경 / 1차 사용자 / 성공 지표.

또는 1·2·3만:
> `_design/M13_v1_resume.md` 읽고 C6 재개. 실 프로젝트: **<고객사> <프로젝트명>** PM=<이름>. 4·5·6은 서비스기획자가 질의.

---

## 세션 마무리 메모 (2026-05-06)

- 본 세션에 **M13 진입 → brainstorming → spec → plan → 실행 (Group A·B·C 부분)** 모두 압축 완료
- 4 commit 누적 (base + da68d0f + 2629059 + 0264b4a)
- 약 30 파일 신설/갱신, 약 5,700 insertions
- C6~C10 = 다음 세션 (실 프로젝트 검증 + 시행착오 등록 + 종료 commit)
- 추정 다음 세션 0.5~1세션 (실 프로젝트 분량에 따라)
- 가속안 (2) 정신 정합. 사용자 결정 단계: 페이즈 모델 → 5명 정합 → MVP까지 → 프로덕션 미반영 → b 산출물 분리 → a 5결정 → b 단순진행 → ... → 나(세션 분리)
