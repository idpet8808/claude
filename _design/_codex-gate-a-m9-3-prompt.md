역할: Codex Gate A 1차 리뷰어 (M9-3 변경·버전 모델). 성격: advisory (PM 수용/오버라이드 권한 보유).

## 리뷰 대상

파일: `_design/M9_deliverable-structure.md`
범위: §6 전체(§6-0 / §6-1 / §6-2 / §6-3) + §7 M9-3 종합 (line 614~1249)

## M9-3 확정 요약 (리뷰 맥락)

PM β안 스코프 분해 — M9-3-0 lifecycle(prerequisite) + M9-3-a/c/d 3건 집중. (e) ID 마이그레이션은 M10 이관.

| sub-step | 핵심 결정 |
|----------|----------|
| §6-0 M9-3-0 | 2층 상태 모델: 파일 축(skeleton/active) + 항목 축(draft/confirmed/deprecated/not-applicable) |
| §6-1 M9-3-a | 이벤트 4 closed(E-modify/E-deprecate/E-exempt/E-restore) × action 6 closed(create/modify/deprecate/exempt/restore/keep). D 원리(전수 대응 + TR 선행 연쇄 병렬) 재사용. broadcast 메시지 형식 규약. |
| §6-2 M9-3-c | asset 차원 변경은 M4-2 8-event 확장 없이 항목 축 E-modify로 **우회**. README `## Asset 변경 이력` 5필드 섹션 신설 (README SSoT 겸임 예외 재사용) |
| §6-3 M9-3-d | suffix `[vN]` 간단 카운터 (action ∈ {modify, restore} → +1) / `STATE.md` Decision Log + `projects/<slug>/_broadcast.log` 하이브리드 / broadcast **6필드**(기존 5 + `reason` 필수) / Decision Log 승격 closed list 3종 |

신설 불변식: I8~I14 (§7-3). I1~I7은 불변 전제.

## 리뷰 초점 (4축)

### 축 1 — M9-3 내부 정합 (필수)

`§6-0` / `§6-1` / `§6-2` / `§6-3` 상호 간 모순 혹은 누락을 검증.

- 2층 상태 모델(파일 축·항목 축)이 이벤트(E-*)·action(create~keep) 경계와 정확히 맞물리는가
- asset 차원의 항목 축 E-modify 우회(§6-2-1)가 2층 모델·closed set 원칙에 상충하지 않는가
- Suffix 증감 규칙(action 기준)이 §6-1-4 "이벤트별 권장 매핑"과 충돌하지 않는가
- Broadcast 6필드(§6-3-4)가 §6-1-5 5필드 정의와 호환되는가 (`reason` 신설이 기존 의미 왜곡하지 않는가)
- Decision Log 승격 closed list 3종(§6-3-5)이 §2-4 기존 Decision Log 규약·§6-0 상태 모델과 충돌 없이 접목되는가

### 축 2 — 선행 M 확정과의 정합 (필수)

M9-3 결정이 **이미 확정된 선행 M**을 깨트리지 않았는지 검증.

- **M3** 팀장 단일 broadcast 창구 — `_broadcast.log` append·Decision Log 승격 모두 팀장 경유 명시되어 있는가
- **M4-2** 8-event closed set — `reason` 필드 추가가 "이벤트 확장 없음 + 메시지 필드 확장"으로 올바르게 경계 지어졌는가
- **M4-3-2-c** 5필드 통일 포맷 — 6필드 확장이 기존 5필드 의미 불변 보장하는가
- **M6** 파일 소유권 정적 1:1 — `_broadcast.log` 슬러그 공용 예외가 M6 원칙을 훼손하지 않고 **명시적 예외**로 처리되었는가
- **M9-1** REQ/TR/S/P 4 독립 시퀀스 — suffix `[vN]`이 ID 본체 변경 없음(§1-2-2) 보장하는가. "표시 레이어"와 "ID 구성 요소" 분리가 명확한가
- **M9-2 §3-3 I1~I7** — I8~I14 신설이 I1~I7과 상충하거나 중복 선언하지 않는가
- **CLAUDE.md §2-4** Decision Log 규약 — closed list 승격이 헌법 원칙 범위 안인가 (M13 이관 처리가 타당한가)

### 축 3 — 불변식(I8~I14) 운영 가능성

신설 불변식이 **실제 운영에서 검증·강제 가능한가**.

- I8 (suffix +1 규칙) — action 식별이 항상 일의적으로 결정되는가. action=keep vs modify 경계 불명 상황 있는가
- I9 (_broadcast.log append-only) — "수정 불가"에 대한 정정 절차 누락 여부 (오타·잘못된 submitter 등 현실적 교정 필요성)
- I10 (6필드 완전성) — `reason` 공란 금지 강제 수단이 설계에 있는가. 누가 검증하는가 (팀장? 자가 검증?)
- I11 (승격 closed list 3종) — "E-modify 중 후행 broadcast 파생" 판정이 **항상 일의적**인가. 경계 사례(후행 owner가 대응 필요 판단을 번복하는 경우 등)
- I12/I13 (이벤트·action closed set) — 현실 변경 유형을 **빠짐없이** 커버하는가. asset 외에 우회가 필요한 차원이 또 있는가
- I14 (ID 본체 불변) — suffix 표기가 ID의 "일부"로 오해될 여지 (grep 패턴·참조 주석 포맷에서)

### 축 4 — 스코프 외·후속 이관 타당성

§7-5 후속 이관 종합 목록이 **M9-3 본 결정과의 경계**를 올바르게 설정했는지.

- ID 마이그레이션 → M10 이관의 근거가 충분한가 (M9-3에서 해결 가능한 부분을 놓치지 않았는가)
- Cross-slug 변경 추적 → M9-5 이관이 현 M9-3 단일 슬러그 가정과 일관되는가
- Suffix 롤오버·`_broadcast.log` 회전·Timestamp 포맷 → "운영" 이관이 타당한가, 지금 최소 규약이라도 박아야 하는 건 없는가
- CLAUDE.md §2-4 문구 업데이트 → M13 이관이 안전한가 (M9-3 운영 중 헌법 불일치 위험)

## 출력 포맷 (엄수)

아래 4열 표로만 출력. 각 축별 최소 1행, 발견 없으면 "발견 없음" 행도 명시:

| 심각도 | 발견 | 근거 | 처리 권장 |
| --- | --- | --- | --- |
| 높음/중간/낮음/없음 | 한 문장 발견 내용 | 섹션·줄번호·선행 M 이슈 레퍼런스 | 통과 / 현 단계 수정 / M9-4+ 이관 / 수용(조치 불필요) |

표 외 간단한 총평 1~2 문단 허용 (선택).

**판정 라인 필수** (표 다음 줄): `판정: 통과 | 조건부 통과 | 부분 반려` 중 택1, 한 문장 근거 첨부.

## 리뷰 규칙

- advisory임을 전제로 PM이 기각 가능함을 인지한다
- 형식 트집(띄어쓰기·마침표)은 제외. 논리·구조·정합성에 집중
- "높음" 심각도는 구현 시 재작업이 필요한 수준에 한정
- 추측성 권고가 아닌 근거 있는 지적만
- Mesh 철학 재검토는 본 리뷰 대상 **아님** (M1~M8에서 이미 확정)
- PM이 M9-2 Gate A 2차에서 전면 수용한 M9-1/M9-2 결정(4 독립 시퀀스·M:N·헤더 주석 SSoT)은 **변경 대상 아님**
