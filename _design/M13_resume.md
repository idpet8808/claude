# M13 헌법 재작성 + 구현 단계 병행 인수인계 (2026-05-04 세션 종료 스냅샷)

다음 세션 시작 시 이 파일 1개만 읽으면 재개 가능.

---

## 직전까지 완료된 것 (2026-05-04 세션)

오늘 1세션에서 **M9-5 + M10·M11·M12 모두 확정**. 가속안 (2) 정신으로 압축 진행, 4 round Codex Gate A 통과.

### 완료 요약

| M | 결정 | Codex round |
|---|------|------------|
| **M9-5 cross-ref** | 4 sub-step 확정 (M9-5-0/a/b/c) + §9-4 통합 카탈로그 16 entrypoint + 불변식 I15~I20 | 1차 부분반려 → 2차 부분반려 → 3차 통과 |
| **M10 ID 변경 마이그레이션** | §9-4 P3 패턴 (v1 비스코프) + 보류 이슈 4건 (M10-I1~I4) | M10·M11·M12 통합 4 round 일부 |
| **M11 자가 점검·품질 게이트** | v1 확정 — 산출물 게이트형 (Gate B 진입 직전 1회 / §9-4 owner 영역 자동 도출 + 범용 5개 U-1~U-5 / 재발동 예외 #1·#2 / 8필드 정합) | 통합 1차 조건부 → 2차 부분반려 → 3차 조건부 → 4차 통과 |
| **M12 관측성·디버깅** | §9-4 P3 패턴 + 객관 지표 4개 + 보류 이슈 8건 (M12-I1~I8) | 통합 4 round 일부 |
| **§9-4 F-7** | 8필드 분기 갱신 (type=broadcast legacy 6필드 허용 / type=self-check 8필드 강제) | M11 통합 보강 |
| **불변식 신설** | I15~I20 (M9-5) + I21~I24 (M10·M11·M12) | I1~I14 불변 |

### 가속안 합의 (2026-05-04)

- PM "권장 패키지 (α 한 줄 보강 + (2) 압축안)" 채택
- (2) M10~M12 압축 + M13/구현 병행 = 약 1~1.5주 추정 → 오늘 M10·M11·M12 1세션에 압축 완료
- (3) placeholder 안은 비권장 결정 (이슈 7건 + R1~R7 완화 규칙 분석)
- 맥스 플랜 업그레이드 컨텍스트 인지

---

## 내일 재개 지점 — **M13 헌법 재작성 + 구현 단계 병행**

### 가속안 (2) 마지막 단계

| 작업 | 대상 |
|------|------|
| **CLAUDE.md 재작성 (δ 분리 정리 — 헌법 요약)** | M1~M12 결정의 **운영 규칙·헌법 수준 요약**으로 신규 작성, 약 300~500줄 목표. R 모델 흔적 폐기. 신규 합류자가 CLAUDE.md만 읽으면 운영 가능한 수준 |
| **`_design/M9_deliverable-structure.md` 아카이브 분리 (δ)** | 현 1900줄 그대로 보존 = **상세 결정 이력 아카이브**. 회귀 시점·논거 확인 시에만 참조. CLAUDE.md에서 "상세 근거는 본 파일 참조" 링크 |
| **§10-4-3 후속 이관 표 일괄 정리** | M9-5/M10/M11/M12 후속 이관 누적 항목 분류: ① M13 헌법 흡수 / ② 구현 단계 흡수 / ③ 운영 정련 보존 / ④ 폐기 |
| **AGENTS.md 갱신** | 필요 시 Codex 리뷰 전담 엔진 정의 (이미 4-10 갱신됨, M1~M12 정합 점검) |
| **에이전트 정의 갱신** | 5명 teammate (기획자·기술검토자·UX설계자·퍼블리셔·노션관리자) + M11 자가 점검 룰 + M9-5 검증 룰 |
| **Skills 갱신** | `prd-draft`·`tech-review`·`ux-spec`·`notion-sync`·`weekly-status`·`kickoff`·`status`·`sync-notion` 모두 신규 결정 반영 |
| **Slash commands 갱신** | `/kickoff`·`/status`·`/sync-notion` 동작 갱신 |
| **검증** | 실 프로젝트 1건 적용 (운영 시행착오 → 운영 정련 항목 회귀) |

**δ 분리 정리 결정 근거** (2026-05-04 PM 확인): 1900줄 단일 파일은 신규 합류자 인지 부하·Read tool 한도(25k 토큰)·변경 충돌 위험. M13 = 헌법 신설 단계가 자연 분리 시점. β·γ 즉시 분리는 가속 충돌·정합 재검증 부담으로 비권장.

### 시작 시 진행 순서 (예상)

```
팀장 → M13 진입 옵션 제시
   ↓
PM 결정 (3 옵션):
   (a) M13 brainstorming 먼저 (헌법 재작성 결정만) → 그 후 구현
   (b) 병행 진입 (M13 결정 + CLAUDE.md/에이전트/Skills 동시 갱신, 가속안 (2) 정신)
   (c) M13 brainstorming 후 sub-step 별로 구현 분기
   ↓
선택된 흐름 진행
   ↓
brainstorming Skill invoke (M13 새 sub-step 진입 시 매번)
   ↓
Q1 펼침 → PM 응답 → 확정 (반복)
   ↓
§11 (또는 별도) 종합 정리
   ↓
Codex Gate A inline prompt + plugin subagent
   ↓
PM 판정 반영 → 통과 → M13 확정
   ↓
구현 단계 (병행 시 동시 / 순차 시 후속)
```

### 팀장 잠정 권고 (PM 확정 필요)

**(b) 병행 진입** — 이유:
1. 가속안 (2) 합의 정합
2. M13 결정이 CLAUDE.md/에이전트/Skills와 직결 (헌법은 운영 도구의 정의)
3. 결정과 구현이 분리되면 결정-구현 간 정합 검증 부담 ↑

단, M13 brainstorming 개시 시 sub-step 분해(스코프 결정)부터 진행. 구현은 결정된 sub-step별로 즉시 반영.

---

## 발견 사항 — 퍼블리셔 누락 (2026-05-04 세션 종료 시 발견, M13 진입 시 신규 작성 필수)

**M1(2026-04-07) 결정 = 5명 teammate** (기획자·기술검토자·UX설계자·**퍼블리셔**·노션관리자). 그러나 현재 하네스 파일 시스템에는 **퍼블리셔 정의·Skill이 누락**되어 있음.

### 누락 파일

| 누락 파일 | 작성 내용 |
|----------|---------|
| `.claude/agents/publisher.md` | 퍼블리셔 에이전트 정의 — P 영역 owner, Figma 토큰 추출 + 디자인 토큰 + HTML 프로토타입 구현, README NA SSoT 예외(§3-3 I5) 처리 |
| `.claude/skills/publisher-html/SKILL.md` (가칭) | 퍼블리셔 산출물 관련 Skill — P-NNN ID 발급·매핑 주석·pages/ + assets/ 폴더 구조(M9-2-e)·README 매핑 표·NA list 파싱 |

### 검토 필요 항목

- 기존 4개 에이전트 정의(`service-planner.md`/`tech-reviewer.md`/`ux-planner.md`/`notion-manager.md`)와 **인터페이스 일관성**
- M9-2-e 결정 (P 영역 폴더 구조 = `pages/<slug>.html` + `assets/{css,js,tokens}/` + `README.md`) 정합 반영
- M9-5-c NA 판정 검증의 P 영역 한정 SSoT 예외(§3-3 I5) 처리 룰
- M11 자가 점검 시 P 영역 owner = 퍼블리셔 명시 (§10-2-2 Part 1 표 정합)

### 재발 방지

M13 진입 직후 **5명 teammate 정의 정합성 점검**을 첫 작업으로 배치. CLAUDE.md 재작성 전에 누락 파일 신설 → 헌법 작성 시 5명 모두 반영 보장.

---

## 주의·제약 (내일 재시작 시 준수)

1. **피드백 규칙**: M 이슈·sub-step 착수 시 **매번** `superpowers:brainstorming` invoke (`feedback_brainstorm_first.md`)
2. **Codex Gate A**: 설계 확정 후 1회 호출 필수. **inline prompt 방식** + **plugin subagent 경유** (Windows WDAC `0x8009001d` 회피)
3. **리뷰 결과 표 포맷**: 심각도 / 발견 / 근거 / 처리 4열 고정 (2026-04-15 PM 지시)
4. **advisory 원칙**: Codex는 조언, PM이 수용/오버라이드 최종 결정 (`feedback_codex_advisory.md`)
5. **선행 확정 침범 금지**: M1~M12 모든 결정은 M13에서 **변경 대상 아님**. 상충 시 PM 판단으로 M13 스코프 조정. M13은 "M1~M12를 헌법 문서로 정형화"가 핵심
6. **노션 쓰기 작업**: PM 매번 명시 승인 필요 (CLAUDE.md §10)
7. **운영 정련 후속 이관 항목 누적 정리**: M13 헌법 재작성 시 §10-4-3 후속 이관 표 일괄 정리 체크포인트 (2026-05-04 4차 리뷰 advisory)

---

## 보류·이관 항목 카탈로그 (M13 시 참고용)

### M9-5 후속 이관 (§9-6)
- 그룹 Y 2건 (P2 손실 금지 검증 + 파생물 저장 위치/로그/삭제 권한) — 실수요 활성화 시
- 휴리스틱 임계값 정련·조정 주체 (M10+ 이관)
- H1/H2 false positive resolved marker (M10+ 이관)
- 카탈로그 신규 카테고리 추가 메커니즘 (M13 또는 운영)
- 등급별 통계·관측 (M12 이관 → 결국 P3 패턴)
- info 등급 실 사용처 검증 (M12 → P3)

### M10 보류 이슈 (§10-1)
- M10-I1 네임스페이스 추가 시 §1-2 M:N 매핑 확장
- M10-I2 영역 분할 시 ID 충돌
- M10-I3 일괄 ID shift vs §1-2-2 재사용 금지
- M10-I4 ID 체계 확장 시 §9-4 카탈로그 정규식 일괄 갱신

### M11 후속 이관 (§10-4-3)
- M11 owner별 자가 점검 운영 학습 (false positive·항목 정련)
- M11 evidence 형식 표준화 (구현 단계)
- M11-I9 재발동 상한·순환 detection 임계·메커니즘
- type=self-check vs H1/H2 silent 분리 (운영 정련)
- 50% impact set deprecated/NA/skeleton 포함 (운영 정련)
- 재발동 카운팅 윈도우 명시 (운영 정련)
- §10-4-3 후속 이관 표 자체의 정리 체크포인트 (M13)

### M12 보류 이슈 (§10-3)
- M12-I1 Teammate↔Teammate SendMessage 자동 기록
- M12-I2 M9-5 검증 통계 부재 → 임계값 정련 데이터 부족
- M12-I3 디버그 dump 부재
- M12-I4 `_broadcast.log`·STATE.md 비대화 회전 정책
- M12-I5 권고 3 β→α 자동 이관 가능성
- M12-I6 `notion-sync` 결과 충실도 검증
- M12-I7 M11 자가 점검 결과 통계 누적
- M12-I8 P3 발동 지표 임계값 조정 절차 (팀장/owner 제안 → PM 승인)

---

## 저장 상태 (2026-05-04 세션 종료 시점)

- **디스크 저장**: 모두 완료
- **git 추적**: `_design/` 디렉토리는 여전히 **untracked** (git add 미실행). PM 지시 시 commit 처리
- **노션 동기화**: 미실행 (M9-5 + M10·M11·M12 설계는 내부 작업물이라 노션 업로드 불필요할 수 있음 — PM 판단)
- **메모리 갱신**: 완료 (`project_harness_mesh_design.md` 논의 로그·다음 액션 동기화)

---

## 참조 파일 (디스크 경로)

| 파일 | 크기/줄수 | 용도 |
|------|----------|------|
| `_design/M9_deliverable-structure.md` | 약 1900줄 | 설계문서 본체 (M1~M12 확정 전체) |
| `_design/_codex-gate-a-m9-5-prompt.md` · `-output.log` | — | M9-5 1차 리뷰 |
| `_design/_codex-gate-a-m9-5-2-prompt.md` · `-output.log` | — | M9-5 2차 리뷰 |
| `_design/_codex-gate-a-m9-5-3-output.log` | — | M9-5 3차 리뷰 |
| `_design/_codex-gate-a-m10-12-output.log` | — | M10·M11·M12 통합 1차 리뷰 |
| `_design/_codex-gate-a-m10-12-2-output.log` | — | M10·M11·M12 통합 2차 리뷰 |
| `_design/_codex-gate-a-m10-12-3-output.log` | — | M10·M11·M12 통합 3차 리뷰 |
| `_design/_codex-gate-a-m10-12-4-output.log` | — | M10·M11·M12 통합 4차 리뷰 |
| `_design/M9-4_resume.md` | 4KB | 이전 세션 인수인계 (참고용) |
| `_design/M9-3_resume.md` | 4KB | 이전 세션 인수인계 (참고용) |
| `memory/project_harness_mesh_design.md` | 약 1400줄+ | 메모리 로그 (M1~M12 결정 누적) |
| `CLAUDE.md` | (현재) | M13 재작성 대상 |
| `AGENTS.md` | (현재) | M13 정합 점검 대상 |

---

## 내일 첫 메시지 제안

> `_design/M13_resume.md` 읽고 M13 + 구현 병행 착수.

이 한 줄이면 팀장이 본 파일 읽고 M13 진입 옵션 (a)/(b)/(c) 제시로 진입.

---

## 세션 마무리 메모

- 오늘 1세션에 **M9-5 + M10·M11·M12** 압축 완료 → 가속안 (2) 1.5주 추정 대비 **약 0.7세션** (M9-5 약 4시간 + M10·M11·M12 약 3시간 추정)
- 맥스 플랜 효과 = 토큰 부족 없이 한 세션 장시간 운영 가능
- 4 round Codex Gate A 회귀 사이클이 길었으나 모두 본문 정합 보강 범위라 회귀 비용 작았음
- M13 + 구현 병행이 마지막 단계 — 추정 0.5~1세션 소요 (CLAUDE.md/Skills 분량에 따라)
