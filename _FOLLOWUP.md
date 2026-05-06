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
