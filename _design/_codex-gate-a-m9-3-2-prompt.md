역할: Codex Gate A 2차 리뷰어 (M9-3 변경·버전 모델). 성격: advisory (PM 수용/오버라이드 권한 보유).

## 리뷰 대상

파일: `_design/M9_deliverable-structure.md`
범위: §6 전체(§6-0 / §6-1 / §6-2 / §6-3) + §7 M9-3 종합 (line 614~1269)

## 1차 리뷰(2026-04-22) 지적 → 반영 요약 (재검증 대상)

PM 전면 수용 → 회귀 반영 완료.

| # | 1차 심각도 | 1차 지적 | 반영 조치 |
|---|-----------|---------|----------|
| 1 | 높음 | §6-1 `keep`/비권장 action에 "Decision Log 기록" 요구 vs §6-3-5 "승격 closed list 3종만" 규약이 문서 내부에서 충돌 | §6-1 전역 "Decision Log 기록"을 "**`_broadcast.log` 기록(reason 필수)**"으로 교체. §6-3-5 제목을 "**Decision Log 추가 승격 closed list**"로 재표기 + "단일 원칙: 전수 `_broadcast.log`, 3건만 Decision Log 추가 병기" 서문 신설. `keep`/비권장 action이 자동 제외임을 명시 |
| 2 | 중간 | closed list 3종 승격이 CLAUDE.md §7 "선행 산출물 수정 시 Decision Log 기록" 헌법 규칙과 불일치 → M13 이전 운영 기준 이중화 | §7-4 외부 이슈 연동에 "**CLAUDE.md §7**: '선행 산출물 수정 → Decision Log 필수' 규칙을 M9-3 운영 해석상 '`_broadcast.log` 전수 기록 + §6-3-5 승격 조건 충족 시 Decision Log 추가 기록'으로 해석. 기록 누락 없음 보장. 헌법 문구 교체는 M13 이관" 신설 |
| 3 | 중간 | I10 `reason` 필수는 broadcast 출력에만 정의 — owner→팀장 SendMessage 최소 입력 계약·반려 절차 공백 | §6-1-5 발행 절차 step 1에 6필드 필수 입력 명시. "`reason` 입력 강제" 소절 신설: 팀장이 공란 수신 시 **broadcast 발행 보류 + owner에게 reason 요청 회송**, 재수신까지 연쇄 진입 없음. 2회 초과 회송은 CLAUDE.md §10 블로커 에스컬레이션. §6-1-5 메시지 예시 4종도 reason 필드 포함 6필드로 갱신. I10 불변식 문구에 "강제 게이트 = 팀장 발행 직전 검증" 명시 |
| 4 | 중간 | asset 구조 변경 우회가 영향 항목 owner E-modify 발행 전제 — 대상이 `draft` 또는 미생성이면 처리 경로 공백 (§2-5 assets/ 선행 허용과 충돌) | §6-2-1 케이스 표에 3분기 추가: (a) confirmed → E-modify 발행(기존), (b) draft → owner에 SendMessage → Draft 내부 반영 후 정식 확정 broadcast에 포함(별도 E-modify 없음, §3-3 I2 Draft 경계 준수), (c) 미생성 → `_broadcast.log`에 `deferred-asset-structural` entry append(최소 4필드) + target 활성화 시 P owner 사후 SendMessage. §6-2-5 통합 흐름에도 동일 분기 반영. §6-2-9 정합에 I2 Draft 경계·deferred entry 두 행 추가. I10 예외 명시 |

## 2차 리뷰 초점 (3축)

### 축 1 — 1차 지적 해소 검증 (필수)

각 건별로 실제 본문에서 해결됐는지, 해결 과정에서 **새로운 내부 모순**이 발생하지 않았는지 검증.

- #1: §6-1과 §6-3-5 간 규약 이중화가 실제로 소거됐는가. `_broadcast.log`·Decision Log 역할이 한 문장으로 정의 가능한가
- #2: CLAUDE.md §7 해석 문구가 헌법을 "바꾼 것"으로 해석될 여지가 있는가 (advisory 해석 범위 내인지)
- #3: `reason` 공란 시 팀장 게이트가 진짜로 닫혔는가. 회송 루프 무한 방지 장치(2회 초과 → PM 에스컬레이션)가 실제 CLAUDE.md §10과 연결되는가
- #4: draft/미생성 분기 3종이 실제로 전수 커버인가. 예외(파일 존재하지만 skeleton 단계 — §3-3 I2 경계) 누락 없는가

### 축 2 — 회귀가 도입한 신규 결함

반영 과정에서 **새로 생긴** 리스크:

- `_broadcast.log` 파일 위치(`projects/<slug>/_broadcast.log`)가 `.gitignore` 대상인지 버전 관리 대상인지 불명 — 이력 영속성 리스크
- `deferred-asset-structural` entry는 broadcast 아님에도 `_broadcast.log`에 공존 — 파일이 "broadcast 전용"이 아닌 "이벤트 로그"로 역할 확장되는 것이 기존 §6-3-3 정의와 일치하는가
- 팀장의 "reason 회송 게이트" 부담이 팀장 병목을 심화시키지 않는가 (권고 3 SendMessage 대기 시간 악화 가능성)
- §6-1-5 예시 reason 내용(예: "고객사 보안팀 요구")이 실제 BN시스템 프로젝트 도메인에 적합한 예인가, 또는 설계문서 범용성 훼손 여지

### 축 3 — 선행 M 정합 (변동 없는 외부 결정 재확인)

1차 리뷰 이후 변경된 본문이 **기존 확정 M 결정**을 깨트리지 않았는지:

- M1 (역할 5명·산출물 1:1)
- M2-5 Task 완료 evidence, M2-6 Gate B
- M3 팀장 단일 broadcast 창구 — `reason` 회송 게이트가 M3 primitive 확장인지 원리 재사용인지
- M4-2 8-event closed set — `deferred-asset-structural`이 신규 event로 해석될 여지 (명시적으로 "broadcast 아님"이어야)
- M4-3-2-c 5필드 통일 포맷 — 6필드 확장이 M9-2 반영 시점과 일관되게 처리되었는지
- M6 파일 소유권 정적 1:1 — `_broadcast.log`·Decision Log 공용 예외가 **명시적 예외 2건**으로 문서화되었는지
- M9-1·M9-2 §3-3 I1~I7 — 회귀로 훼손된 것 없는지 (특히 I2 Draft 경계를 #4가 실제로 준수)
- CLAUDE.md §2(PM=scope 결정자)·§3(Gate A/B/C)·§4(선행→후행)·§7(Decision Log)·§10(블로커) — 본 M9-3 회귀가 헌법 범위를 초과하지 않음

## 출력 포맷 (엄수)

아래 4열 표로만 출력. 각 축별 최소 1행, 발견 없으면 "발견 없음" 행도 명시:

| 심각도 | 발견 | 근거 | 처리 권장 |
| --- | --- | --- | --- |
| 높음/중간/낮음/없음 | 한 문장 발견 내용 | 섹션·줄번호·선행 M 이슈 레퍼런스 | 통과 / 현 단계 수정 / M9-4+ 이관 / 수용(조치 불필요) |

표 외 간단한 총평 1~2 문단 허용 (선택).

**판정 라인 필수** (표 다음 줄): `판정: 통과 | 조건부 통과 | 부분 반려` 중 택1, 한 문장 근거 첨부.

## 리뷰 규칙

- advisory임을 전제로 PM이 기각 가능함을 인지한다
- 형식 트집(띄어쓰기·마침표)은 제외. 논리·구조·정합성 · 1차 지적 해소 여부에 집중
- "높음" 심각도는 구현 시 재작업이 필요한 수준에 한정 (1차 지적 해소 실패도 높음에 해당)
- 추측성 권고가 아닌 근거 있는 지적만
- Mesh 철학 재검토는 본 2차 대상 **아님** (M1~M8에서 이미 확정, M9-2 Gate A 2차에서도 재검토 아님 처리)
- PM이 M9-1·M9-2 Gate A 2차에서 전면 수용한 M9-1/M9-2 결정(4 독립 시퀀스·M:N·헤더 주석 SSoT 등)은 **변경 대상 아님**
