# 활성 프로젝트 인덱스

> 본 파일은 BN시스템 IT 기획팀 하네스의 **신규 프로젝트** 상태판이다.
> 기존 노션에서 진행 중인 프로젝트는 하네스 대상이 아니며, **신규 영업·기획 건만** `/kickoff`로 등록한다.
> M13 v1 정합 — 산출물 4종(01-prd / 02-tech-review / 03-ux-spec / 04-prototype-mvp), 4단계 (기획중 / MVP-구현중 / MVP-완료 / 종료).

## 활성 프로젝트 (0건)

> 현재 활성 프로젝트 없음 (M16 진행 중 — 하네스 구조 본질 재설계).

### 아카이브 (2건)

| 슬러그 | 위치 | 사유 |
|--------|------|------|
| `mensa-ranking-challenge` (v1) | `projects/mensa-ranking-challenge/_archive/v1/` | M14 멘사 v2 재진행 시점에 비교군 보존 (2026-05-06) |
| `mensa-ranking-challenge-v2` | `_archive/v2/mensa-ranking-challenge-v2/` | M16 진입에 따라 v2 산출물 보존 (2026-05-07). M15 정의 검증용으로 진행되었으나 격차 6 발견 후 M16 본질 재설계 진입 |

> 비고: 멘사 정식 재진행은 M16 적용 완료 후 신규 슬러그(v3 또는 다른 명칭)로 진행 — PM 결정 시점.

<!--
이후 신규 프로젝트가 등록되면 아래 형식으로 자동 갱신됨 (weekly-status Skill, /status 호출)

| 슬러그 | 프로젝트 | PM | 현재 단계 | 산출물 진행 | 자가점검 | 오픈이슈 | 마지막 갱신 | STATE |
|--------|----------|-----|----------|-----------|---------|---------|-----------|-------|
| `verihum-auth` | [Verihum] 사람 인증 | 신주한 | MVP-구현중 | ✓✓✓· | PRD 7/7, Tech 5/5, UX 4/4 | 2건 | 2026-05-XX | [열기](verihum-auth/STATE.md) |

산출물 진행 표기 (4슬롯): ✓ = 완료, · = 미완료
- 슬롯 1: 01-prd.md
- 슬롯 2: 02-tech-review.md
- 슬롯 3: 03-ux-spec.md
- 슬롯 4: 04-prototype-mvp/
-->

---

## 운영 원칙

- **신규 건만 등록**: 기존 노션 진행 프로젝트는 하네스 대상 아님 (노션관리자가 MCP로 직접 조회)
- **슬러그 규칙**: 영문 소문자 + 하이픈 (예: `verihum-auth`, `ksfarm-chatbot`)
- **진입점**: `/kickoff <고객사> <프로젝트명> [PM]` — 1~7단계 순차 (4명 운영 + 노션관리자 + 최종 보고)
- **현황 조회**: `/status` (`_INDEX.md` 자동 갱신)
- **노션 동기화**: `/sync-notion <파일경로>` (PM 명시 — settings ask 권한)
- **페이즈 2** (퍼블 Production · 백엔드 · `/handoff` · API 계약): v1 미정의 (CLAUDE.md §12). v1.1+ 신설 예정
- **시행착오 발견 시**: `_FOLLOWUP.md`에 즉시 등록 + 해당 프로젝트 STATE.md Decision Log 1줄 참조
