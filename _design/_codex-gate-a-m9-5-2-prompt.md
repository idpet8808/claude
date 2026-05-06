역할: Codex Gate A 2차 리뷰어 (M9-5 cross-ref 검증). 성격: advisory.

## 리뷰 대상

`_design/M9_deliverable-structure.md` §9 (1차 리뷰 (b)안 보강 후 버전). 1차에서 부분 반려 받은 후 PM 옵션 (b) — 높음+중간 6건 §9 보강 / 낮음 2건 §9-6 이관만 결정 — 반영분.

## 1차 리뷰 처리 요지

| # | 1차 발견 (심각도) | 처리 |
| 1 | 높음: H5 E-create 가정이 closed set 위반 | §9-3 H5 = **E-exempt 트리거**로 재정의 |
| 2 | 중간: impact set "인접 엣지만" 위험 | §9-0-2-1 신설 — old/new 노드 + reverse index + 과거 incident edge 명시 |
| 3 | 중간: PM 회부 경로 불명 | §9-0-4 PM 회부 경로 명시 — M4-3-2 T1 또는 세션 종료 보고 둘만 |
| 4 | 중간: README NA SSoT 누락 | §9-4-1 F-8에 P영역 README NA list 파싱 포함, 예외 처리 단락 신설 |
| 5 | 중간: F-3 grep 단독 불가 | §9-1 "정적 형식 검증(grep+parser)", §9-4-1 제목 변경, F-3 = parser+카운팅 |
| 6 | 중간: error blocking Task 효과 부재 | §9-0-5 신설 — M2-5 차단 / M2-6 차단 / remediation 허용 / clean evidence 포함 / 영향 범위 한정 |
| 7 | 낮음: H1/H2 "적절 통과" 기록 위치 | §9-6 이관만 (PM (b)안) |
| 8 | 낮음: H1/H2 임계값 조정 주체 | §9-6 이관만 |

## 리뷰 대상 본문 (보강 부분)

### §9-0-2-1 (신설)
```
변경 이벤트 시 "영향받는 항목" = 단순 인접 엣지만이 아니다. impact set:
1. old 노드 (변경 전 ID·상태)
2. new 노드 (변경 후 ID·상태)
3. 두 노드의 reverse index — 들어오는 엣지의 출처 모두
4. 과거 incident edge — 변경 이전 두 노드와 연결된 엣지

이로써 deprecated 전이 시 stale(M-d) / dangling(M-c) / orphan(M-a/M-b) / NA 정렬(M-e) 즉시 검출.
```

### §9-0-4 PM 회부 경로 (신설)
```
NA 무응답 2턴 시 PM 회부는 신규 trigger 신설 아님. 다음 둘 중 하나만:
- M4-3-2 T1 "팀장 판단 불가" hard trigger
- 세션 종료 시 팀장 보고(권고 3-c-3) 무응답 NA 누적 보고

closed trigger set 외부로 신규 push 경로 신설 금지.
```

### §9-0-5 error blocking Task 효과 (신설)
```
M9-5 error 검출 시 영향 deliverable 효과:
- M2-5 Task evidence 완료 승인: 차단
- M2-6 Gate B 진입: 차단
- M2-3 remediation Task in_progress: 허용
- clean M9-5 결과: evidence 포함

warning은 차단 효과 없음. info는 영향 없음.
범위: error 직접 가리키는 deliverable 한정 (Mesh 병목 회피).
```

### §9-1 헤더 변경
```
9-1. M9-5-a 형식 위반 검증 (정적 형식 검증: grep + parser)
검증 대상: 정적 형식 검증으로 결정 가능한 7개 카테고리. 대부분 grep 단독 가능, F-3은 parser+카운팅 필요.
```

### §9-3 H5 재정의
```
H5 NA 표기 변경 트리거 — M9-3-a E-exempt event 발생 시(항목 상태가 NA로 바뀌는 모든 경로) 자동 휴리스틱 재실행 + 인간 판단 회부

근거: E-create + status=NA는 closed 4종 위반. NA 상태로의 모든 전이는 정의상 E-exempt.
```

### §9-3 PM 회부 명시
```
무응답 2턴 = M4-2 E5 trigger → 팀장 broadcast → PM 회부 (closed trigger set 안에서만)
PM 회부 경로: §9-0-4 참조. M4-3-2 T1 또는 세션 종료 시 팀장 보고 둘 중 하나만 사용.
```

### §9-4-1 카탈로그 갱신
```
9-4-1 정적 형식 검증 카탈로그 (M9-5-a) — grep + parser

| ID | 카테고리 | 검증 방식 | 등급 |
| F-1 항목 헤더 | grep ^## (REQ|TR|S|P)-[0-9]{3} | error |
| F-2 매핑 주석 | grep <!--...→(REQ|TR|S|P)-[0-9]{3} | error |
| F-3 ID 발급 | parser + 카운팅 (영역 내 NNN 추출 → 정렬 → 중복/재사용/결번 검증) | error |
| F-4 version suffix | grep \[v[0-9]+\] | warning |
| F-5 상태 suffix | grep \[(DEPRECATED|NOT APPLICABLE)\] | error |
| F-6 frontmatter | grep ^status:\s*(skeleton|active) | warning |
| F-7 broadcast log | parser (6필드 행 형식) | info |
| F-8 NA 사유 누락 | grep + 인접 라인 검사 + P영역 README NA list 파싱 | error |

P영역 README NA SSoT 예외 처리: §3-3 I5 예외로 README 한정 SSoT (HTML 파일 부재). F-8과 M-e 그래프 빌드 입력에 README NA 섹션 list 파싱 포함.
```

### §9-6 후속 이관 추가 행
```
| H1/H2 "적절 통과" 기록·재트리거 방지 메커니즘 (1차 리뷰 낮음 #1) | 운영 정련 (구현 시 _broadcast.log resolved marker 또는 인라인 suppress 채택) | PM (b)안으로 §9-3 본문 보강 보류, 후속 처리. 2차 리뷰 재지적 가능성 인지 |
| 휴리스틱 임계값 조정 주체·승인 경로 명문화 (1차 리뷰 낮음 #2) | M10+ 이관 — 팀장 제안/PM 승인 경로 명문화 | 임계값 자체는 운영 정련, 조정 절차는 후속 |
```

### §9-8 1차 리뷰 대응 섹션 (신설)
처리 결과표 포함. 수용 6건 / 이관 2건 / 통과 1건.

## 리뷰 초점 (3축)

### 축 1 — 1차 부분 반려 사유 해소 검증 (필수)

**높음 #1 (H5)** 및 **중간 #2~6** 보강이 **선행 결정 위반 없이** 정확히 반영되었는가?

- §9-3 H5 = E-exempt 트리거 재정의가 M9-3-a closed 4종 event(modify/deprecate/exempt/restore)와 정합? "새 항목이 처음부터 NA로 추가" 케이스가 E-exempt에 정확히 포함되는지 (M9-3 정의 재확인)
- §9-0-2-1 impact set 정의가 "old + new + reverse index + 과거 incident edge"로 충분한가. **rename**의 경우 old ID에 들어오던 엣지를 new ID로 마이그레이션하는 정의가 누락 위험. **bulk 변경**(여러 노드 동시 변경) 시 impact set 합집합 처리 명시 필요?
- §9-0-4 PM 회부 경로 "M4-3-2 T1 또는 세션 종료 보고"가 M4-3-2 closed set 정의와 정확히 매핑? T1은 "팀장 자기 선언", T2는 "M2-6 반려 2회 누적", T3는 "권고 3 Y(30분)" — NA 무응답이 T1 "팀장 판단 불가"로 분류되는 게 의미상 맞는지
- §9-4-1 F-8 README NA list 파싱 추가가 P영역 외 영역(REQ·TR·S)에는 적용 안 됨을 명시? P영역 한정인지 모든 영역인지 모호 가능
- §9-0-5 blocking 범위 "error 직접 가리키는 deliverable 한정"이 매핑 그래프 위반(M-b/M-c/M-e/M-f) 시 어느 deliverable로 해석되는가. 예: M-c(dangling) 위반 시 source 노드 deliverable인가, target deliverable인가, 양쪽인가
- §9-1 "정적 형식 검증(grep+parser)" 변경이 §9-4-1 제목·F-3 행만 갱신되고 §9-4 헤더("16건 entrypoint")의 분류 표기와 정합?

### 축 2 — 1차 보강 외 신규 결함

1차 리뷰 후 §9 보강 과정에서 **새로 도입된 모순·정합 위반**이 있는가?

- §9-0-2-1과 §9-0-2의 관계 명확? "9-0-2-1"이 "9-0-2"의 sub-section 인지, 별도 섹션인지 번호 체계
- §9-3 H5 재정의가 §9-4-3 휴리스틱 카탈로그 표 H-5 행과 정합? 본문은 E-exempt로 변경, 카탈로그 표는 미갱신 가능성
- §9-8 1차 리뷰 대응 섹션과 §9-7 최종 상태(1차 리뷰 보강 완료 시점) / §9-9 최종 상태(2차 리뷰 통과 시 갱신 예정) 3 섹션 배열이 PM·운영자에게 혼란 위험? §9-7과 §9-9 통합 또는 명확 분리 필요?
- §9-6 후속 이관 표에 1차 리뷰 낮음 2건 추가됐는데 행 순서가 그룹 Y > 휴리스틱 임계값 > 새 행 2개로 정렬 — 가독성·일관성

### 축 3 — 잔여 1차 낮음 2건 이관 처리의 정당성

PM이 (b)안으로 낮음 2건은 §9-6 이관만 했음. Codex 1차는 #7을 "현 단계 수정" 권고. 이 오버라이드의 영향:

- 낮음 #7 (H1/H2 "적절 통과" 기록 부재)는 운영 시 동일 항목이 매번 warning broadcast → 노이즈 누적 → 무시 학습 → dormant 위험. 1차 권고("warning 휴리스틱 한정 suppress 또는 resolved marker")가 §9-3 본문에 들어가지 않은 채 §9-6 운영 정련에 묶임. 본 결정의 위험 수준은 advisory로 인정 가능한가, 아니면 2차 리뷰에서 재지적 정당한가
- 낮음 #8 (임계값 조정 주체)은 M10+ 이관이 자연 — 권고 그대로

## 출력 포맷 (엄수)

| 심각도 | 발견 | 근거 | 처리 권장 |
| --- | --- | --- | --- |
| 높음/중간/낮음/없음 | 한 문장 발견 | 섹션·줄번호·선행 M 레퍼런스 | 통과 / 현 단계 수정 / M10+ 이관 / 수용 |

각 축별 최소 1행. 총평 1~2 문단 선택.

**판정 라인 필수**: `판정: 통과 | 조건부 통과 | 부분 반려` 한 문장 근거.

## 리뷰 규칙

- advisory임을 전제로 PM 기각 가능
- 형식 트집 제외
- "높음" = 1차 보강이 실제로 결함 해소하지 못한 수준
- 1차에서 이미 처리된 사항은 재지적 안 함 (정합성만 확인)
- M1~M9-4 + I1~I14는 변경 대상 아님
- PM (b)안 결정(낮음 2건 이관)은 advisory로 존중. 단 위험 수준이 "높음" 이상이면 명시 가능
