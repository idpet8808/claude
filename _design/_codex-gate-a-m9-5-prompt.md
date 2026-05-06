역할: Codex Gate A 1차 리뷰어 (M9-5 cross-ref 검증). 성격: advisory (PM 수용/오버라이드 권한 보유).

## 리뷰 대상

`_design/M9_deliverable-structure.md` §9 전체 (M9-5-0/9-1/9-2/9-3/9-4 통합 카탈로그/9-5 불변식 I15~I20/9-6 후속 이관/9-7 최종 상태) + §1-7 정합 보강.

본 리뷰는 inline prompt 방식 (Windows WDAC 회피). 본문을 직접 embed.

## 결정 요지

M9-5는 REQ↔TR/S/P 매핑 일관성 검증·관측. M9-2/M9-3 누적 이관 6건 중 그룹 X(즉시 4건) 흡수 + 그룹 Y(파생물 종속 2건) 실수요 활성화 시 정의 보존.

**4 sub-step 확정**:
- M9-5-0: 등급 3단계(error/warning/info) + 트리거 하이브리드(변경 이벤트 즉시+세션 종료 전수) + `_broadcast.log` 단일 기록 + 자동 검출/팀장 broadcast owner 분리
- M9-5-a: 정적 grep 8 카테고리 (헤더·주석 매핑·ID 발급·suffix·상태·frontmatter·log·NA 사유 누락)
- M9-5-b: 매핑 그래프 순회 6패턴 (a orphan REQ / b orphan 후행 / c dangling / d deprecated 참조 / e NA→active / f 양방향 불일치)
- M9-5-c: 자동 휴리스틱 3건(H1 길이<20자 / H2 금지 키워드 / H5 새 NA 트리거) + 인간 판단 트리거(영역 owner→무응답 2턴=M4-2 E5→PM 회부)

**카탈로그 통합 §9-4** (단일 SSoT, 16건 entrypoint).

**불변식 신설** I15~I20.

## 리뷰 대상 본문 (inline embed)

### §1-7 정합 보강 부분
```
- ~~Cross-ref 파급 통지·누락 감지 경로 → M9-5~~ ✅ **M9-5 확정 (2026-05-04)** — §9 참조
```

### §9 전체

```
## 9. M9-5 — Cross-ref 검증 (확정: 2026-05-04)

**스코프**: REQ↔TR/S/P 매핑 일관성 검증·관측. M9-2/M9-3 누적 이관 6건 중 그룹 X(즉시 필요) 4건을 본 sub-step에서 흡수, 그룹 Y(파생물 종속) 2건은 실수요 활성화 시 정의로 명시적 보존.

| sub-step | 주제 | 상태 |
|----------|------|------|
| M9-5-0 | 검증 모델 (prerequisite) | ✅ 2026-05-04 확정 |
| M9-5-a | 형식 위반 검증 (정적 grep) | ✅ 2026-05-04 확정 |
| M9-5-b | 매핑 통합 검증 (그래프 순회) | ✅ 2026-05-04 확정 |
| M9-5-c | NA 판정 검증 (자동 1차 + 인간 2차) | ✅ 2026-05-04 확정 |

### 9-0. 검증 모델 (prerequisite)

#### 9-0-1. 검증 등급 체계 (3단계)

| 등급 | 의미 | 처리 정책 |
| error | 매핑 모호성·SSoT 깨짐·모순 직접 발생. 후행 작업 차단 필요 | blocking + 팀장 broadcast (M3·M4-2 채널) |
| warning | 추적 정보 손실·인지 필요. 작업 진행 가능 | 팀장 broadcast (비강제) |
| info | 이력·관측·메타. 즉시 작업 영향 없음 | _broadcast.log log only (broadcast 안 함) |

Codex 리뷰 4단계와 분리 — Codex는 advisory 인간 리뷰, M9-5는 자동 검증.

#### 9-0-2. 트리거 시점 (하이브리드)
- 변경 이벤트 시 즉시 차이 검증 — M9-3-a closed 4종 발생 시 영향 항목만 검증
- 세션 종료 시 전수 검증 — M9-3-a closed set 우회 직접 편집도 catch
- 신규 메커니즘 0건

#### 9-0-3. 결과 기록 위치
_broadcast.log 단일. error/warning/info 모두 기록. error/warning은 추가로 팀장 broadcast.

#### 9-0-4. owner
- 검출: 자동 deterministic (grep / 파서 / 매핑 그래프 / 휴리스틱)
- broadcast 발행: 팀장 (M3 정합)
- 자동 실행 주체: 팀장 (broadcast 처리 시점 + 세션 정리 시점)
- 인간 판단 응답 (M9-5-c): 영역 owner 1차 + 무응답 2턴 = M4-2 E5 → 팀장 → PM 회부

### 9-1. M9-5-a 형식 위반 검증

8 카테고리:
1. 항목 헤더 패턴 - error
2. HTML 주석 매핑 형식 - error
3. ID 발급 규칙 - error
4. version suffix [vN] - warning
5. 상태 suffix [DEPRECATED]/[NOT APPLICABLE] - error
6. frontmatter (skeleton/active) - warning
7. _broadcast.log 6필드 - info
8. NA 사유 텍스트 누락 (M9-5-c 시나리오 1 흡수) - error

검증기: grep → 등급 매트릭스 → _broadcast.log + 등급별 broadcast.
예외: 인라인 `<!-- @suppress: pattern-N -->`. error(1·2·3·5·8) suppress 금지.

### 9-2. M9-5-b 매핑 통합 검증

매핑 그래프: 노드=항목 헤더, 엣지=주석 → REQ-XXX 참조, SSoT=각 영역 헤더 주석(I1).

6 패턴:
- a orphan REQ (warning)
- b orphan 후행 (error)
- c dangling reference (error)
- d deprecated → active 참조 (warning)
- e NA → active 참조 (error)
- f 양방향 set 불일치 (error)

단일 그래프 빌드 → 6패턴 동시 검출. 변경 이벤트 시 = 영향 노드만, 세션 종료 시 = 전체.
예외: 인라인 suppress. error(b·c·e·f) 금지. warning(a·d)는 의도적 backlog/정리 미완료 명시 가능.

### 9-3. M9-5-c NA 판정 검증

시나리오:
- 시나리오 2 (빈약 사유) — 자동 휴리스틱
- 시나리오 3 (NA 부적절) — 인간 판단
- 시나리오 1 = M9-5-a F-8 흡수
- 시나리오 4 = M9-5-b 패턴 e

자동 휴리스틱 (3건):
- H1 사유 길이 < 20자 (warning)
- H2 금지 키워드 (해당없음/필요없음/N/A/TBD/skip 등) (warning)
- H5 새 NA 표기 자동 트리거 (M9-3-a E-create + status=NA) (warning)

인간 판단 트리거:
1. 휴리스틱 매치 → 팀장 broadcast → 영역 owner 응답 요청
2. 영역 owner 응답: "적절" 통과 / "부적절" → 표기 제거 → M9-3-a E-modify 자동
3. 무응답 2턴 = M4-2 E5 → 팀장 broadcast → PM 회부

임계값 잠정: H1=20자, H2=7개 키워드. 운영 1~2개월 기반 정련 (M9-6 후속 이관).

### 9-4. 통합 카탈로그 (단일 SSoT)

**9-4-1 grep 패턴 (M9-5-a 8건)**:
- F-1 항목 헤더 (error)
- F-2 매핑 주석 (error)
- F-3 ID 발급 (error)
- F-4 version suffix (warning)
- F-5 상태 suffix (error)
- F-6 frontmatter (warning)
- F-7 broadcast log 형식 (info)
- F-8 NA 사유 누락 (error)

**9-4-2 매핑 그래프 패턴 (M9-5-b 6건)**:
- M-a~M-f (위 9-2 등급 매핑 동일)

**9-4-3 휴리스틱 (M9-5-c 3건)**:
- H-1 길이, H-2 금지 키워드, H-5 새 NA 트리거

총 16 entrypoint.

### 9-5. 불변식 (I15~I20 신설)

- I15: §9-4 단일 SSoT, 신규 카테고리 추가는 §9-4 표 행 추가로만
- I16: error는 blocking 발동, 인라인 suppress 적용 불가
- I17: 모든 결과 _broadcast.log 기록, error/warning만 broadcast (info는 log only)
- I18: 트리거 = 변경 이벤트 + 세션 종료만, 신규 트리거 신설 금지
- I19: NA 자동 휴리스틱은 인간 판단 회부를 트리거, 강제 결정권 없음 (영역 owner / 무응답 시 PM)
- I20: owner 분리 — 자동 검출 + 팀장 broadcast 발행. Teammate 직접 broadcast 금지

### 9-6. 후속 이관

- 그룹 Y P2 손실 금지 검증 → 실수요 활성화 시 (M9-4 P3 게이트)
- 그룹 Y 파생물 저장 위치·로그·삭제 권한 → 실수요 시
- 휴리스틱 임계값 정련 → 구현 단계 (운영 1~2개월)
- 카탈로그 신규 카테고리 추가 메커니즘 → M13 또는 운영 합의
- 등급별 통계·관측 → M12
- info 등급(F-7) 실 사용처 검증 → M12

### 9-7. 최종 상태
M9-5 확정 완료 (2026-05-04). M10 또는 가속안 (2)/(3) 진입 가능.
```

## 리뷰 초점 (3축)

### 축 1 — sub-step 결정의 정합성 (필수)

M9-5-0 prerequisite와 M9-5-a/b/c가 일관되는가? 등급·트리거·owner·기록이 sub-step 간 모순 없는가?

- §9-0-1 등급 3단계가 §9-1·9-2·9-3 모두에 일관 적용되었나
- §9-0-2 트리거 하이브리드가 8 grep + 6 그래프 + 3 휴리스틱에 모두 결합 가능한가 (특히 변경 이벤트 시 "영향 항목만" 검증의 메커니즘이 매핑 그래프(b)에서 어떻게 동작?)
- §9-0-3 `_broadcast.log` 단일 기록이 16 entrypoint 모두에서 가능한가 (등급 필드 명시?)
- §9-0-4 owner — M9-5-c "인간 판단 응답" 부분이 자동 검출/팀장 broadcast 모델에 어떻게 끼워지나. NA owner의 "1차 응답 → 무응답 2턴 → PM 회부"가 M3 broadcast 채널 외 별도 메커니즘 신설 아닌지
- M9-5-a F-8(NA 사유 누락)과 M9-5-c 시나리오 1의 분리 정합성 — 동일 사고를 두 sub-step이 부분적으로 다루지 않는지
- M9-5-b e(NA→active 참조)와 M9-5-c 시나리오 4의 분리 정합성

### 축 2 — 통합 카탈로그(§9-4) 완전성

§9-4가 16 entrypoint 단일 SSoT (I15)인데, **누락·중복·모순**이 있는가?

- 누락: 기존 결정에서 등장한 형식 중 §9-4-1에 없는 것? (예: README 표 형식·Decision Log 형식 — 자유 텍스트라 grep 부적합 결정. 그러나 결정 명시 필요)
- 중복: F-5(상태 suffix)와 F-8(NA 사유 누락)이 NA 관련 검증을 중복 처리하지 않는지. F-5는 표기 자체, F-8은 사유 텍스트 — 분리 정당한지
- 중복: M-e(NA→active 참조)와 H-5(새 NA 트리거)가 NA 관련 검증 중복인지
- 모순: F-3 "ID 발급 규칙"의 grep 메커니즘이 모호함 — "영역 내 NNN 추출 + 중복·재사용·결번 검증"이 단순 grep으로 가능한가, 카운팅·정렬 필요 (구현 시 grep 외 로직 필요)
- 모순: H-1·H-2 잠정 임계값(20자·7키워드)이 "잠정" 명시되었으나 §9-4-3 표에는 임계값이 박혀 있음. 정련 시점·주체 명문화 필요?
- 휴리스틱 false positive 처리 — H-1·H-2 매치가 warning이지만 항목 인라인 suppress 가능 여부 §9-3에 명시 안 됨. M9-5-a/b의 suppress 정책이 M9-5-c에도 적용되나?

### 축 3 — 선행 M 정합

M1~M9-4 + 권고 3 + 불변식 I1~I14 정합 확인:

- **M1** (역할 5명): M9-5 검출 owner = 자동, broadcast = 팀장. 영역 owner(NA 응답)·PM 회부도 기존 역할 내. 추가 역할 없음 — 정합?
- **M2-3 Task 상태 전이**: M9-5 "blocking"의 의미 — Task의 어떤 상태가 차단되나? completed 차단? in_progress 차단? §9-1 error 발동 시 후행 Task 어디서 멈추는지 명시 부재
- **M2-5 Task evidence**: M9-5 검증 결과가 evidence에 포함? 별도? §9-3에 명시 부재
- **M2-6 Gate B**: M9-5 검증과 Gate B의 관계 — Gate B는 산출물 게이트, M9-5는 cross-ref. 둘 다 advisory? 또는 M9-5 error는 Gate B blocking 근거?
- **M3 broadcast 채널**: §9-0-4 "팀장 broadcast"가 M3의 broadcast 채널만 사용하는지, M9-5 전용 추가 채널 신설은 아닌지
- **M4-2 closed event 8개**: M9-5의 변경 이벤트 트리거가 E2(Draft 교차검증완료)·E3(Task 완료)에 한정되나, 또는 M9-3-a 변경 이벤트(modify/deprecate/exempt/restore/create)도 별개로 동작하나. 두 이벤트 체계의 관계 명시 부재
- **M4-3-2-d PM 회부**: §9-3 무응답 2턴 PM 회부가 M4-3-2-d 정합이라고 했는데, M4-3-2-d의 PM 응답 메커니즘(α·γ+필드·ζ)이 M9-5 NA 판정에 정확히 어떻게 매핑되나
- **권고 3 (팀장 SendMessage 큐)**: M9-5 검증 결과 broadcast가 팀장 SendMessage 큐 가중치를 늘리는지. 자동 trigger의 부산물이 권고 3 임계(평균 5분/최대 30분)에 영향?
- **I7** (헤더 grep 패턴): F-1과 일치. I15가 I7을 강화하는 형태인지, 별도인지
- **I8~I14** (M9-3 신설): I17·I18이 I8~I14와 충돌하지 않는지

## 출력 포맷 (엄수)

| 심각도 | 발견 | 근거 | 처리 권장 |
| --- | --- | --- | --- |
| 높음/중간/낮음/없음 | 한 문장 발견 | 섹션·줄번호·선행 M 레퍼런스 | 통과 / 현 단계 수정 / M10+ 이관 / 수용(조치 불필요) |

각 축별 최소 1행. 표 외 간단한 총평 1~2 문단 허용 (선택).

**판정 라인 필수**: `판정: 통과 | 조건부 통과 | 부분 반려` 한 문장 근거 첨부.

## 리뷰 규칙

- advisory임을 전제로 PM이 기각 가능
- 형식 트집 제외, 논리·구조·정합성에 집중
- "높음" 심각도 = 구현 시 재작업 필요한 수준 (sub-step 결정 자체 회귀)
- 추측성 권고 아닌 근거 있는 지적만
- M1~M9-4 + 불변식 I1~I14는 변경 대상 아님. 상충 시 M9-5 스코프 조정 방향
- "M9-5가 X도 다뤘어야 한다"류 스코프 확장 주장은 그룹 Y(파생물 종속) 스킵 결정 정합성과 함께 검토
- Mesh 철학 재검토는 본 리뷰 대상 아님
