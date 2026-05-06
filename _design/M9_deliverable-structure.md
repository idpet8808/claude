# M9 — 산출물(Deliverable) 생성 구조

**위치**: Mesh 하네스 설계 / M9 산출물 생성 구조

**스코프 확정일**: 2026-04-20

**포함 sub-step (5)**:
- ✅ **M9-1** 산출물 단위 정의 — 2026-04-20 확정
- ⏳ **M9-2** 생성 시점 + 트리거
- ⏳ **M9-3** 변경·버전 모델
- ⏳ **M9-4** 포맷 변환 파이프라인
- ⏳ **M9-5** 산출물 간 cross-ref

**제외 (추후 재논의)**: 템플릿·양식 표준화 / 산출물 네이밍 규칙 / 외부 아카이빙

**선행 확정**:
- M1 (2026-04-07): 팀 구성 5명 + 팀장, 역할-산출물 1:1
- M2-1-a 합의 1: Task ≠ 산출물
- M2-1-a 합의 2: owner 1 + collaborator N (N:1 기여 구조)
- M6 (2026-04-17): 파일/폴더 owner 정적 1:1 (`01-req.md` / `02-tech-review.md` / `03-ux-spec.md` / `04-prototype/`)

---

## 1. M9-1 — 산출물 단위 정의 (확정: 2026-04-20)

**결정**: 옵션 **A+ID** — 파일/폴더 = 산출물, REQ ID 체계 도입

### 1-1. 2축 분리

| 차원 | 결정 |
|------|------|
| **산출물 단위** (granularity) | 파일/폴더 (M6 shell 그대로) |
| **추적 단위** (tracking unit) | REQ ID 체계 (신설) |
| **Task ↔ 산출물 cardinality** | N:1 (여러 task가 한 산출물에 기여, 합의 2 정합) |

### 1-2. ID 네임스페이스 (잠정 — M9 외 재논의 가능)

| 네임스페이스 | 산출물 | 소유자 |
|--------------|--------|--------|
| `REQ-NNN` | `01-req.md` | 기획자 |
| `TR-NNN` | `02-tech-review.md` | 기술검토자 |
| `S-NNN` | `03-ux-spec.md` | UX설계자 |
| `P-NNN` | `04-prototype/` | 퍼블리셔 |

- **번호 체계**: 제로패딩 3자리(`001`~`999`), 프로젝트 단위 리셋
- **대응 규칙** (2026-04-21 M9-2 Gate A 1차 리뷰 반영, 옵션 A 채택):
  - REQ / TR / S / P는 **각 영역 독립 번호 시퀀스** (영역 간 NNN 공유 없음)
  - REQ ↔ TR·S·P는 **M:N 매핑** (한 후행 항목이 복수 REQ 커버 가능, 복수 후행 항목이 한 REQ 분산 커버 가능)
  - 매핑 단일 진실 원천(SSoT): **각 항목 헤더의 참조 주석** — `## TR-NNN (→ REQ-XXX, REQ-YYY)` / HTML `<!-- P-NNN / → REQ-XXX -->`
  - ~~"후행 ID는 REQ-NNN을 공유"~~ 1:1 NNN 공유 원칙은 **폐기**
- **잠정 경고**: 약어(`REQ`/`TR`/`S`/`P`)와 포맷은 **잠정 표기**. 추후 네이밍 규칙 재논의 시 변경될 수 있음. **변경 시 ID 마이그레이션은 M10 변경관리 영역**으로 이관 (본 M9 범위 밖). 잠정 상태에서 외부 시스템(노션·문서 툴) 하드코딩 의존 최소화 권장

### 1-2-1. 서픽스 의미 (범위 분할용만 허용)

| 상황 | 처리 | 예시 |
|------|------|------|
| 선행 REQ 1개 → 후행 산출물에서 **범위가 분할** | 서픽스 `a`, `b`, `c` 허용 | TR-007 → `TR-007a`(서버 분), `TR-007b`(클라이언트 분) |
| 동일 항목 **재작업**(수정·재논의) | 서픽스 **금지** — **동일 ID 재기재** + Decision Log에 재작업 근거 기록 | TR-007 그대로 유지, 본문 내용만 갱신 |
| 선행 REQ가 **폐기**되고 교체 항목 신설 | 신 ID 발급 (결번 허용) + Decision Log 연결 | REQ-007 폐기 → REQ-042 신설, "REQ-007 대체" 명시 |

- **원칙**: 서픽스는 **공간적 분할(scope split)** 표기 전용. **시간적 변경(version)**은 서픽스로 표현하지 않음. 시간 축은 M9-3(변경·버전 모델)에서 재정의

### 1-2-2. ID 수명주기

| 단계 | 규칙 |
|------|------|
| **발급** | PM이 안건 단위로 요구사항을 전달하면(§2-2 확정) 기획자가 `01-req.md` 작성 시 `max(NNN)+1`로 순차 부여. PM이 번호를 지정해 전달한 경우 해당 번호 존중(충돌 시 팀장 confirm 후 교정). 후행 ID(TR/S/P)는 **각 영역 owner가 자기 파일 내 `max(NNN)+1`로 독립 순차 부여** (2026-04-21 1차 리뷰 반영: NNN 공유 폐기). REQ 매핑은 항목 헤더 참조 주석으로 표기 |
| **재사용 금지** | 폐기된 ID는 **재할당 금지**. 과거 참조(Decision Log·cross-ref)와의 충돌 방지. **결번 허용** (예: REQ-005 폐기 → REQ-005는 영구 결번) |
| **폐기 표기** | 폐기 시 항목 자체 삭제 금지. 제목에 `[DEPRECATED]` 접두 + 폐기 사유·날짜·대체 ID 명시 (예: `## REQ-007 [DEPRECATED 2026-05-01 → REQ-042]`) |
| **오발급 교정** | ID 중복·순서 오류 등 오발급 발견 시: (1) 팀장 confirm (2) Decision Log에 교정 내역 기록 (3) 교정 전 ID는 결번 처리. 이미 외부(노션)에 동기화된 경우 교정 전 ID도 **결번 예약**으로 보존 |
| **상태 구분** | 활성(기본) / 폐기(`[DEPRECATED]`) 2단계. 드래프트·잠정 상태 구분은 M9-2(생성 트리거)에서 재정의 |

### 1-2-3. 산출물 owner 책임 범위

- M6 확정(파일/폴더 owner 정적 1:1)은 **파일 내 REQ 참조 관리 책임**까지 포함
  - owner는 자신의 파일 내 모든 항목이 올바른 REQ ID를 참조하는지 검증
  - 선행 REQ 변경·폐기 시 자기 파일의 참조 갱신 책임
  - collaborator(SendMessage 기여자)는 내용 기여만, **참조 정합성 최종 책임은 owner**
- **누락·깨진 참조 감지 메커니즘**: 본 M9-1 범위 밖 → **M9-5 cross-ref에서 정의** (통지 경로·감지 시점 포함)

### 1-3. 내용 구조 규약

**기획자 REQ (`01-req.md`)**:
```markdown
## REQ-001 — <제목>
- Must | Should | Could
- 근거: <사유>
- 성공 지표: <측정>
```

**후행 산출물 (TR / S / P)**:
```markdown
## TR-001 (→ REQ-007, REQ-012)
- <항목 상세>
```

- 모든 산출물 항목은 REQ ID 참조 **필수** (원칙). 참조 없는 항목은 `# 일반 사항` 섹션으로 분리
- 인라인 참조: 본문 중 `[REQ-007]` 형식으로 crossref
- **M:N 매핑 허용** (2026-04-21 반영) — 한 후행 항목이 여러 REQ 커버 가능, 한 REQ가 여러 후행 항목에 분산 커버 가능. 번호 시퀀스는 각 영역 독립
- **[NOT APPLICABLE] 면제 섹션** — 파일 하단 단일 섹션 `## [NOT APPLICABLE]`에 `- REQ-NNN — 사유 1줄` 형식으로 나열. 번호 미부여 (면제는 항목이 아님)

**"일반 사항" 섹션 사용 기준 (남용 방지)**:
- 허용: 프로젝트 초기 공통 원칙(용어 정의·전제 환경·범위 외 명시), REQ 미분류 후기 메모(회의 중 나온 보류 사항 등)
- **금지**: 기능 요건·품질 요건·제약 요건은 반드시 REQ ID를 부여. "일반 사항"에 기능을 몰아넣어 추적 회피하는 패턴 원천 차단
- owner가 판단 애매할 때: 팀장 confirm 후 REQ 부여 원칙 우선

### 1-4. Task ↔ REQ ID 연결

- Task description 필드에 REQ ID 포함 (예: "REQ-007 기술 검토")
- N:1 패턴: 같은 REQ-007에 대해 여러 Task 가능(owner 교체, 재오픈 등 — M2-3 이력으로 구분)
- REQ ID는 Task metadata가 아님 (primitive 강제 필드 아님) — description 규약

### 1-5. v2-candidates/ 처리

| 산출물 유형 | REQ ID 참조 | 근거 |
|-------------|-------------|------|
| **테스트 시나리오** | **필수** | 테스트 항목 ↔ REQ 매핑 없으면 커버리지 검증 불가 |
| **개발 전달 스펙** | **필수** | 개발자 구현 기준. REQ 미대응 기능 혼입 방지 |
| **회의록·논의 노트** | 권장 (필수 아님) | 결정 전 논의 단계. 정식 결정 시점에 REQ 연결 |
| **기타 보조 문서** (용어집·환경 메모 등) | 선택 | 내용 성격에 따라 판단 |

- **원칙**: 구현·검증에 직접 사용되는 산출물은 REQ 필수, 과정 기록은 권장
- v2에서 별도 네임스페이스 도입 시 M9 외 재논의
- **본 표는 v2-candidates/ 활성화 시점에 재확정**. 현재는 주 산출물(01-04) 확정에 집중

### 1-6. 결정 근거

| 비교 | B (원안, 논리 문서 묶음) | A+ID (채택) |
|------|--------------------------|-------------|
| 파일명 변경 시 cross-ref | 논리문서 ID 간접 참조 | REQ ID 직접 참조 |
| 항목 단위 추적 | 불가 (산출물 단위만) | 가능 (RM 표준) |
| 04-prototype/ 다파일 | 자연 (묶음) | M6 "폴더=산출물"로 흡수 |
| 매핑 레이어 추가 | 필요 | 불필요 |
| SI 업계 RM 관행 | 부분 정합 | 완전 정합 |

- **B 기각**: B가 추가하는 "논리 문서 레이어"는 파일 묶음 처리만 개선. PM 요구("관리번호 추적")는 B 자체로 달성 안 되며 어차피 ID 체계 별도 필요 → 레이어 없는 **A + ID**가 최소 복잡도로 목표 달성
- **C(산출물 entity 배제) 기각**: 노션 동기화·버전 기준점 상실
- **원안 A(ID 없음) 기각**: PM 명시 요구(관리번호 추적) 미충족

### 1-6-1. Codex Gate A 1차 리뷰 대응 (2026-04-20)

| Codex 지적 | 심각도 | 처리 | 반영 위치 |
|-----------|--------|------|-----------|
| #1 섹션 단위 책임자 모호 | 높음 | **부분 수용** — owner가 파일 내 REQ 참조 책임자 명시. 누락 감지 메커니즘은 M9-5 이관 선언 | §1-2-3 |
| #2 ID 수명주기 규칙 부재 | 높음 | **수용** — 재사용 금지·결번·폐기 표기·오발급 교정 규칙 신설 | §1-2-2 |
| #3 서픽스 의미 분기 불명 | 높음 | **수용** — 범위 분할용만 허용, 재작업은 동일 ID + Decision Log 명시 | §1-2-1 |
| #4 v2-candidates/ 경계 불명 | 중간 | **부분 수용** — 테스트/개발 스펙 = 필수, 회의록 = 권장으로 세분화 | §1-5 |
| #5 M6 파일 owner = 섹션 책임 미정 | 중간 | **기각** — M6 파일 owner 1:1 정의에 섹션 단위 책임이 포함됨이 자연 해석. 별도 명문화 시 중복. Codex가 섹션=파일보다 작은 단위로 오인 | Decision Log (본 섹션) |
| #6 잠정 네임스페이스의 기술 부채 | 중간 | **부분 수용** — 변경 시 마이그레이션 M10 이관 명시로 부채 가시화 | §1-2 |
| #7 합의 2 정합성 | 낮음 | **동의** — 이미 §1-1에서 N:1 cardinality 명시로 충족. 수정 불필요 | — |
| #8 "일반 사항" 남용 위험 | 낮음 | **수용** — 허용/금지 기준 1줄 규칙 추가 | §1-3 |

**기각 건(#5) 근거 (Decision Log)**:
- M6(2026-04-17)의 "파일/폴더 owner 정적 1:1"은 **파일 내부 모든 섹션**의 책임자를 owner로 본다는 뜻
- Codex는 "섹션별 다른 owner 가능성"을 우려했으나, M1~M6 합의상 섹션 단위 책임 분산은 없음 (collaborator는 SendMessage 기여만, owner 권한 분할 아님)
- §1-2-3에서 "파일 내 REQ 참조 관리 책임"을 명시함으로써 §5(기각)와 §1(수용) 사이 실질 갭 없음

### 1-6-2. Codex Gate A 2차 리뷰 대응 (2026-04-20)

**판정**: **통과** (1차 반려 → 2차 통과). 1차 지적 #1~#8은 본문 반영 및 기각 근거가 Codex 동의로 해소됨.

| # | 심각도 | 발견 | 근거 | 처리 |
|---|--------|------|------|------|
| 1 | 중간 | §1-7 "ID 재사용 여부 → M9-3" 문구가 §1-2-2 확정(재사용 금지·결번)과 충돌하여 운영 해석 혼선 유발 | §1-2-2에서 이미 재사용 금지·결번 허용·오발급 교정 전 ID 결번 예약 확정 | **수용** — §1-7 문구를 "항목 내용 변경 시 버전 표기·이력 기록 규칙"으로 대체. ID 수명주기 주제는 재논의 대상 아님을 명시 |

**최종 상태**: M9-1 확정 완료. Gate A 통과. M9-2 진입 가능.

### 1-7. 후속 미정 (M9-2~M9-5 이관)

- ~~REQ ID 부여 시점·주체 → M9-2~~ ✅ **M9-2-b 확정 (2026-04-20)** — §2-2 참조
- REQ **항목 내용 변경 시 버전 표기·이력 기록 규칙** → M9-3 (ID 재사용·결번·폐기 표기는 §1-2-2에서 이미 확정, 재논의 대상 아님)
- ~~포맷 변환(md→docx) 시 ID 보존 규칙 → M9-4~~ ✅ **M9-4 스킵 확정 (2026-04-24)** — §8 참조. 실수요 발생 시 M10+ 또는 별도 sub-step 신설로 이관
- ~~Cross-ref 파급 통지·누락 감지 경로 → M9-5~~ ✅ **M9-5 확정 (2026-05-04)** — §9 참조

---

## 2. M9-2 — 생성 시점 + 트리거 (진행 중)

**스코프**: 산출물 파일이 실체로 존재하기 시작하는 시점(when)과 그 시점을 발생시키는 이벤트(what)를 정의. 5 sub-step 순차 진행.

| sub-step | 주제 | 상태 |
|----------|------|------|
| M9-2-a | skeleton 생성 시점 | ✅ 2026-04-20 확정 |
| M9-2-b | REQ 번호 부여 메커닉 | ✅ 2026-04-20 확정 |
| M9-2-c | 후행 산출물(TR/S/P) 항목 추가 트리거 | ✅ 2026-04-21 확정 |
| M9-2-d | 산출물 최초 저장 시 팀장 confirm 여부 | ✅ 2026-04-21 확정 |
| M9-2-e | `04-prototype/` 폴더 내부 파일 생성 규칙 | ✅ 2026-04-21 확정 |

### 2-1. M9-2-a — skeleton 생성 시점 (확정: 2026-04-20)

**결정**: 옵션 **(1)** — `/kickoff` 시 4개 산출물 파일/폴더 **동시 skeleton 생성**

| 항목 | 규칙 |
|------|------|
| 생성 시점 | `/kickoff` 실행 시 |
| 생성 대상 | `01-req.md`, `02-tech-review.md`, `03-ux-spec.md`, `04-prototype/` 4개 동시 |
| skeleton 내용 | frontmatter + 빈 섹션 (실질 내용 없음) |
| `04-prototype/` | 빈 폴더 + `.gitkeep` 또는 `README.md` skeleton (구체 파일 규칙은 §2-5 M9-2-e) |

**결정 근거**:
- **Mesh N:1 기여 공간 사전 확보** — teammate가 SendMessage로 선제 기여하려면 목적지 파일이 이미 존재해야 함. Mesh 비동기성의 전제 조건
- **M6 · M8 정합** — `/kickoff` = 프로젝트 실체화 진입점(M8), 파일 owner 정적 1:1(M6)은 파일이 일찍 존재해야 자연
- **M2-1-a 합의 1 정합** — Task ≠ 산출물이므로 Task 없이도 파일 존재 가능해야 함

**기각 근거**:
- (2) 선행 완결 후 후행 생성 — Mesh 비동기 N:1 기여 공간 없음, `/kickoff` 의미 축소
- (3) REQ 부여 시점 동적 생성 — 후행 ID 사전 reserve 불가, Mesh 순서 의존성 강화
- (4) Task 착수 시 owner 생성 — M2-1-a 합의 1 위반, 동일 파일 중복 생성 경합

**보류 · 후속 이관**:
- "비어있는 파일" 상태 표기(`Status: skeleton` 등) → M9-3 변경·버전 모델에서 상태 모델 정의
- 운영 경험 기반 재조정 여지 보존 (PM 지시: "추후 사용하면서 디벨롭")

### 2-2. M9-2-b — REQ 번호 부여 메커닉 (확정: 2026-04-20)

**결정**: 옵션 **(2')** — PM은 **안건 단위로 요구사항만 전달**, 기획자가 번호 부여

| 축 | 결정 |
|----|------|
| **A. REQ 정의 주체** (scope ownership) | PM (도메인·비즈니스 오너) |
| **B. REQ 번호 부여 메커닉** (numbering) | 기획자 (`01-req.md` owner) |

**발급 규칙** (§1-2-2 발급 규칙과 정합):

| 대상 | 주체 | 시점 |
|------|------|------|
| REQ-NNN | 기획자 | `01-req.md` 신규 항목 작성 시 `max(NNN)+1` 순차 부여 |
| TR-NNN / S-NNN / P-NNN | 각 파일 owner (기술검토자 · UX설계자 · 퍼블리셔) | 자신의 파일에서 대응 항목 신설 시 `max(NNN)+1`로 **영역별 독립 순차 부여** (2026-04-21 1차 리뷰 반영). REQ 매핑은 항목 헤더 참조 주석 `(→ REQ-XXX, REQ-YYY)` 형식 — M:N 허용 |
| 팀장 사후 검증 | 팀장 | 선행→후행 진입 시점 + `/status` 실행 시 중복·결번 일괄 점검 |

**PM 번호 직접 지정 예외**:
- PM이 안건에 특정 번호를 지정해 전달한 경우 기획자는 해당 번호 존중
- 충돌 시 팀장 confirm 후 교정 (§1-2-2 오발급 교정 절차 활용)

**PM ↔ 기획자 소통 규약**:
- PM은 자연어로 안건 호칭 가능 (예: "로그인 기능 재검토") — 기획자가 해당 REQ-NNN 매핑
- PM이 번호 기준 소통을 원할 경우: `/status` 또는 기획자가 `01-req.md` 헤더 요약 제공

**결정 근거**:
- **PM 역할 정합** — PM은 scope 결정자, 번호 mechanic은 문서 owner 담당이 자연
- **M2-1-a 합의 2 정합** — `01-req.md` owner = 기획자 → 파일 내 구조(번호 포함) 관리 권한
- **실무 자연성** — PM이 REQ-NNN을 기억할 필요 없음, 기획자가 안건 ↔ 번호 매핑 담당
- **M1 역할 분리 정합** — "역할-산출물 1:1"에서 owner의 산출물 작성 권한에 번호 부여 자연 포함
- **§1-2-2 오발급 교정 절차 활용** — PM "안건 재설정" 지시 시 기획자가 `[DEPRECATED]` 처리 + 신 REQ 발급

**기각 근거**:
- (1') PM 직접 부여 — PM 번호 관리 부담, 프로젝트 중 신규 안건 추가 시 PM이 max+1 계산해야 함
- (3') 하이브리드 — 분기점 경계 명확화 부담 대비 실익 없음, (2') + PM 직접 지정 예외로 충분

**재프레임 기록** (PM 지적 반영):
- 최초 옵션 구성 (1)(2)(3)은 축 A가 "기획자/Task"인 것처럼 전제해서 PM 역할이 사라진 오류 포함
- PM 지적 ("각 안건을 REQ으로 보고 진행하면 되는 게 아닌가")으로 2축 분리 후 재프레임
- 축 A는 M8 · CLAUDE.md §2 정합으로 이미 PM 고정, 축 B만 M9-2-b 실제 질문으로 좁힘

### 2-3. M9-2-c — 후행 산출물 항목 추가 트리거 (진행 중)

**스코프**: 선행 REQ에 대응하는 후행 산출물(TR/S/P) 항목이 언제·어떻게 생성되는가. 4 차원(트리거 시점·전달 경로·의무성·병렬성)을 2 묶음으로 분할 진행.

#### 2-3-1. M9-2-c-1+c-2 — 트리거 시점 + 전달 경로 (확정: 2026-04-21)

**결정**: 옵션 **ζ 하이브리드** — Draft 선택적 SendMessage + 확정 의무 broadcast

**세부 규약**:

| 단계 | 트리거 | 전달 경로 | 의무성 | 목적 |
|------|--------|-----------|--------|------|
| **1. Draft 통보** | 기획자가 `01-req.md`에 REQ-NNN 항목 **최초 기록** | 기획자 → 관련 후행 owner(들)에게 **선택적** SendMessage (1:N, M3 정합). 또는 후행 owner의 `01-req.md` 자율 pull | 선택 (기획자 · 후행 owner 자율) | Mesh 조기 기여 공간 확보, draft 단계 선행 협업 |
| **2. 확정 broadcast** | 기획자가 해당 REQ에 **Must/Should/Could 판정** 기록 완료 | 팀장 broadcast (M3 broadcast 규칙 적용) | **필수** | 후행 owner의 공식 대응 착수 신호 |

**판정 완료 시점 정의**:
- 기획자가 `01-req.md` 내 REQ-NNN 항목의 Must/Should/Could 필드를 확정값으로 기록 + 커밋(또는 저장)한 순간
- 기획자가 팀장에게 "REQ-NNN 확정" SendMessage 전송 → 팀장이 broadcast 발행
- 세부 SendMessage 포맷은 M4-3-2-c 통일 포맷 5필드 재사용 (별도 포맷 신설 금지)

**결정 근거**:
- **Mesh 원칙 정합** — M2-1-a 합의 2(owner 1 + collaborator N via SendMessage)와 M9-2-a 결정(skeleton 사전 확보)은 draft 단계 협업 전제. β(확정만) 옵션은 이 전제 위반
- **M3 정합** — broadcast는 팀장 단일 창구(확정 시 의무), SendMessage는 1:N 허용(Draft 선택)
- **M4-2 closed set 보존** — 신규 이벤트(예: E9 REQ 확정) 추가 없이 기존 primitive(SendMessage + 팀장 broadcast)만 사용 → M4 안정성 유지
- **팀장 병목 회피** — 모든 REQ 수정마다 broadcast하면 권고 3(SendMessage 대기 시간) 악화. "확정" 시점만 개입 = 자연 배치
- **CLAUDE.md §4 Mesh 예외 정합** — "선행 → 후행 필수"는 정식 산출물 기준. Draft 단계 병행은 `§4 Mesh 분해 시 예외` 조항과 정합
- **관측성** — 확정 broadcast가 팀장 단일 창구로 모이므로 `/status` 집계 가능. Draft SendMessage는 선택적 조기 협업 경로

**기각 근거**:

| 옵션 | 기각 사유 |
|------|-----------|
| α 전변경 팀장 broadcast | 팀장 SendMessage 큐 대기 시간 폭증, 권고 3 악화 |
| β 확정 후 broadcast 단일 | Mesh draft 기여 차단 = M9-2-a 결정 의미 소실 |
| γ 기획자 직접 SendMessage 단일 | 팀장 관측성 상실, `/status` 집계 실패 |
| δ 자율 pull만 | 신호 없음 → 놓침 리스크, 확정 시점 무관측 |
| ε M4-2 E-이벤트 신설 구독 | closed set 8개 확장 부담 > 기대 이득 |

**후속 결정 (c-3/c-4)**:
- 확정 broadcast 수신 시 후행 owner의 **대응 의무 범위** (전수 / 선택 / 유형별) → M9-2-c-3
- TR/S/P **병렬 착수 가능 여부** → M9-2-c-4

#### 2-3-2. M9-2-c-3+c-4 — 의무성 + 병렬성 (확정: 2026-04-21)

**결정**: 옵션 **D** — 전수 대응 필수 + TR 선행 연쇄 병렬

**c-3 의무성 규약**:

| 상황 | 처리 |
|------|------|
| 일반 REQ-NNN | 모든 후행 owner(TR/S/P)가 해당 REQ를 **자기 영역에서 최소 1개 항목 매핑 참조** 필수 (M:N 허용 — 한 항목이 복수 REQ 커버 OK, 복수 항목이 한 REQ 분산 커버 OK) |
| 후행 영역 해당 없음 (예: 백엔드 성능 요건 → UX 무관) | 후행 owner가 자기 파일 하단 **`## [NOT APPLICABLE]` 전용 섹션**에 `- REQ-NNN — 사유 1줄` 기록. 번호 미부여 (면제는 항목이 아님) |
| 스킵 여부 판정 이의 | 팀장 confirm (§1-2-2 교정 절차 재사용) + Decision Log 기록 |

**c-4 병렬성 규약**:

| 단계 | 트리거 | 정식 착수 가능 owner |
|------|--------|---------------------|
| 1 | REQ 확정 broadcast (§2-3-1 ζ 단계 2) | TR owner만 |
| 2 | TR 확정 broadcast | S · P owner 동시 병렬 |

- **Draft 단계 조기 기여 유지** — §2-3-1 ζ 하이브리드로 S·P owner도 기획자 Draft SendMessage 수신 시점부터 준비 가능. 정식 착수 대기 중 idle 아님
- **P owner의 S 의존** — P는 S 완결 대기 안 함 (Figma 토큰·정적 자산 준비는 S 독립). 화면 구조 반영 세부는 §2-5 M9-2-e에서 정의

**결정 근거**:

| 기각 옵션 | 사유 |
|-----------|------|
| A 전수·순차 | TR 완결 대기 중 S·P idle → Mesh 비동기 원칙 파괴 |
| B 전수·완전 병렬 | TR "기술 불가" 확정 시 S·P 재작업 폭발 |
| C 유형별·순차 | Must/Should/Could는 REQ **중요도** 표기이지 "후행 대응 필요 여부"와 직교. Could 기능도 TR·S·P 대응 필요 → 과설계 |
| E 유형별·연쇄 | C + D 혼합, 복잡도 상승 대비 실익 없음 |
| F owner 자율 스킵·병렬 | REQ 커버리지 공백, 놓침 위험 |

**채택 근거**:
- **I1 전수 대응** — REQ는 전 기능 요건. 대응 누락 시 구현·검증 공백 발생
- **"해당 없음" 명시 예외** — 영역 무관 REQ는 스킵 아닌 명시적 기록으로 커버리지 집계 보존
- **P4 연쇄 병렬** — 기술 제약은 TR 확정 필수, 이후 설계·구현은 안전 병렬. SI 실무 공정 정합
- **Mesh 비동기성 유지** — Draft 단계 조기 참여 + 정식 착수 연쇄로 idle 최소화

**CLAUDE.md §4 재해석 (M13 이관)**:
- 기존 §4 "UX기획자: 01-req.md + 02-tech-review.md 둘 다 존재" 전제 유지
- "존재"의 의미를 **"TR 확정 broadcast 수신"** 시점으로 운영
- 문구 업데이트는 M13(헌법 재작성)에서 일괄 반영

**미해결 → 후속 이관**:
- REQ 확정 이후 내용 변경 시 후행 재작업 트리거 → **M9-3 변경·버전 모델**
- "해당 없음" 판정 오류 감지 메커니즘 → **M9-5 cross-ref**
- P의 S 의존 세부(화면 구조 반영 시점) → **§2-5 M9-2-e**

#### 2-3-3. M9-2-c 종합

**확정 결과**:
- c-1+c-2: ζ 하이브리드 (Draft 선택적 SendMessage + 확정 의무 broadcast)
- c-3+c-4: D (전수 대응 + TR 선행 연쇄 병렬)

**통합 흐름**:

```
① 기획자 REQ-NNN 기록 (01-req.md)
    ↓ (기획자 선택: SendMessage to 후행 owner / 후행 owner 자율 pull)
② 후행 owner Draft 참여 가능 (선택)
    ↓ (기획자 Must/Should/Could 판정 완료)
③ 팀장 REQ 확정 broadcast ← TR owner 정식 착수
    ↓ (기술검토자 TR-NNN 판정 완료)
④ 팀장 TR 확정 broadcast ← S·P owner 동시 정식 착수
```

### 2-4. M9-2-d — 산출물 최초 저장 시 팀장 confirm 여부 (확정: 2026-04-21)

**결정**: 옵션 **A** — 별도 게이트 없음 (기존 결정 체인으로 커버)

**"최초 저장" 정의**: skeleton 생성 이후 파일이 처음 실질 내용을 가지는 커밋 (= 기획자 REQ-001 첫 기록 또는 후행 owner 첫 대응 항목 기록 순간)

**기존 결정 체인 매핑**:

| 이벤트 | 담당 | 팀장 개입 | 커버 수단 |
|--------|------|-----------|----------|
| skeleton 생성 | `/kickoff` 자동 | 간접 | M9-2-a |
| REQ-NNN 부여 | 기획자 자율 | 없음 | M9-2-b + §1-2-2 (PM 번호 충돌 시만 confirm) |
| Draft 통보 | 기획자 선택 SendMessage | 없음 | M9-2-c-1+c-2 ζ 단계 1 |
| REQ 확정 broadcast | 팀장 | **직접 경유** | M9-2-c-1+c-2 ζ 단계 2 |
| Task 완료 | owner 자기 선언 + evidence | 팀장 경유 | M2-5 |
| 산출물 완료 | Gate B (Codex 선택) | 팀장 + 선택 Codex | M2-6 |

- "최초 저장" 시점은 위 체인의 **"REQ 부여"** 또는 **"확정 broadcast 이후 후행 착수"**와 동일 순간 → 별도 게이트 중복

**결정 근거**:

1. **체인 커버** — skeleton 자동 + REQ 자율 + 확정 broadcast(팀장 경유) + Gate B의 4단계 체인이 "최초 저장"을 암묵적으로 포함
2. **Mesh 원칙 정합** — 팀장 병목 회피(권고 3 SendMessage 대기 시간), Mesh 비동기 N:1 기여 전제 유지. 착수 전 confirm 대기는 Draft 단계 협업 지연
3. **완료 게이트(M2-5/M2-6)와의 구분** — 본 케이스는 skeleton 형식이 자동이고 REQ 규약(§1-3)이 명시되어 있어 형식 오류 가능성 낮음 → 시작 시점 게이트 실익 < 착수 지연 비용

**기각**:

| 옵션 | 기각 사유 |
|------|-----------|
| B 자가 점검 체크리스트 | 유효 개념이나 M11 품질 게이트 영역 침범 — 이관 |
| C 최초 저장 시 팀장 SendMessage 통지 | SendMessage 노이즈, M4-2 closed event set E8(Teammate 직접 호출)과 경계 모호 |
| D 팀장 confirm 필수 | M2-5/M2-6 중복 + 착수 지연 + Mesh 비동기성 파괴 |
| E 조건부 confirm | §1-2-2 발급 규칙 오발급 교정 절차에 이미 포함 — 재진술 |

**후속 이관**:

- 자가 점검 메커니즘 → **M11 자가 점검·품질 게이트**
- REQ 기록 형식 위반 감지 → **M9-5 cross-ref** (누락·깨진 참조 감지 경로)
- 첫 커밋 관측성 → `/status` 집계 (별도 이벤트 없이 **항목 헤더 존재**로 확인 — grep 패턴 `^## (REQ\|TR\|S\|P)-[0-9]+` + HTML 주석 `<!-- P-[0-9]+`. 파일 존재 ≠ 실질 기록. 2026-04-21 Gate A 2차 리뷰 반영)

### 2-5. M9-2-e — `04-prototype/` 폴더 내부 파일 생성 규칙 (확정: 2026-04-21)

**결정**: 옵션 **4** — 화면 단위 `pages/` + `assets/` 분리 + `README.md` 매핑

#### 폴더 구조

```
04-prototype/
├── README.md            # 매핑 표 = 2차 집계 (SSoT = 각 HTML 상단 주석) + [NOT APPLICABLE] 섹션만 SSoT 겸임
├── index.html           # 진입 허브 (화면 목록·네비게이션)
├── pages/               # 화면 단위 HTML
│   └── <slug>.html      # 예: login.html, dashboard.html
└── assets/              # 공통 자산
    ├── css/
    ├── js/
    └── tokens/          # Figma 디자인 토큰
```

#### 핵심 규약

| 항목 | 규칙 |
|------|------|
| **파일명** | `pages/<slug>.html` — **slug만**, P-NNN은 파일명에 포함 안 함 |
| **P 번호 부여** | 퍼블리셔가 화면 단위 `max(NNN)+1` **독립 순차 부여** (2026-04-21 1차 리뷰 반영: REQ-NNN과 무관) |
| **REQ 매핑 SSoT** | **HTML 파일 상단 주석** `<!-- P-NNN / → REQ-XXX, REQ-YYY -->` — **단일 진실 원천** |
| **README.md 역할** | HTML 주석 기반 **2차 집계표** (SSoT 아님). 갱신 책임: README는 주석에서 생성, **충돌 시 주석 우선** |
| **M:N 허용** | 한 화면이 여러 REQ 커버 가능, 한 REQ가 여러 화면 분산 커버 가능 (매핑 주석에 전부 명시) |
| **[NOT APPLICABLE] 처리** | `README.md` 하단 `## [NOT APPLICABLE]` 섹션에 `- REQ-NNN — 사유 1줄` 기록. **이 섹션만은 README가 SSoT 겸임** (HTML 파일 부재로 주석 기록 불가한 원천적 예외). 매핑 2차 집계 기능과는 섹션 단위 역할 분리 |
| **P의 S 의존 경계** | `assets/` 하위(tokens · 공통 CSS/JS)는 S 무관 선행 가능. `pages/<slug>.html` 구조 구현은 **S 확정 broadcast 수신 후** 정식 착수 (Draft 골격은 가능) |

#### 결정 근거

1. **파일명에 P-NNN 제외** — §1-2-2 재사용 금지·폐기 표기 규칙과 상충 방지. ID 폐기 시 파일명 변경 강제되면 외부 참조(링크·주석) 깨짐. ID-화면 매핑 SSoT가 HTML 상단 주석이므로 파일명 불변 + ID 변경 시 주석만 갱신 가능 (2026-04-21 Gate A 2차 리뷰 반영: 근거 문구 교체, README 표현 제거)
2. **`pages/` + `assets/` 분리** — 공통 자산(토큰·CSS·JS)과 화면 구현을 물리 분리해 S 의존성 구간 명확화
3. **M9-2-c-4 "P는 S 대기 안 함" 구체화** — 물리 분리로 "S 무관 영역(assets)"과 "S 의존 영역(pages)"이 폴더 경계로 표현됨
4. **BN시스템 기술 스택 정합** — HTML/CSS/Vanilla JS/jQuery는 화면 단위 HTML + 공통 assets 패턴이 자연
5. **관측성** — README.md 매핑 표가 `/status` 집계 · cross-ref(M9-5) 기준점

#### 기각

| 옵션 | 기각 사유 |
|------|-----------|
| 1 P-NNN 단일 파일 (flat) | 한 화면 여러 REQ 매핑 불가, HTML 실무 부적합 |
| 2 자유 구성 | 관측성 없음, `/status` 집계 실패, [NOT APPLICABLE] 기록 규약 부재 |
| 3 단일 진입점 + fragments | SPA 한정 패턴, 프로토타입은 보통 다화면 병렬 |
| 5 P-NNN 포함 파일명 | §1-2-2 재사용 금지·폐기 규칙과 파일명 변경 강제 충돌 → 외부 참조 깨짐 |
| 6 최소 표준 + 나머지 자유 | `pages/`·`assets/` 분리 없으면 S 의존 영역 구분 불가, M9-2-c-4 이관 건 미해결 |

#### 후속 이관 · 재논의

- **README.md 매핑 표 세부 포맷** (컬럼·예시) → M9 스코프 외 "템플릿·양식 표준화" (2026-04-20 M9 스코프 확정 시 제외)
- **깨진 매핑·누락 P-NNN 감지** → **M9-5 cross-ref**
- **Figma 토큰 갱신 트리거** → **M9-3 변경·버전 모델**
- **운영 경험 기반 재조정** — PM 지시("테스트하면서 업데이트 예정")로 실제 프로젝트 운영 후 재조정 여지 보존

---

## 3. M9-2 종합

### 3-1. 확정 요약

| sub-step | 결정 | 핵심 규약 |
|----------|------|----------|
| M9-2-a | (1) `/kickoff` 시 4 skeleton 동시 | 4 파일/폴더 자동 생성, Mesh N:1 기여 공간 사전 확보 |
| M9-2-b | (2') 기획자 번호 부여 | PM 안건 전달 → 기획자 `max(NNN)+1` 순차 부여, PM 번호 지정 예외 허용 |
| M9-2-c-1+c-2 | ζ 하이브리드 | Draft 선택적 SendMessage + 확정 의무 broadcast (Must/Should/Could 판정 시) |
| M9-2-c-3+c-4 | D 전수·연쇄 | 전수 대응 + [NOT APPLICABLE] 예외 / REQ 확정→TR only, TR 확정→S·P 병렬 |
| M9-2-d | A 별도 게이트 없음 | 기존 체인(a+b+c+M2-5+M2-6)으로 커버 |
| M9-2-e | 4 pages/+assets/+README | `pages/<slug>.html` + `assets/{css,js,tokens}/` + `README.md` 매핑 |

### 3-2. 통합 흐름 (End-to-End)

```
[/kickoff]
   │
   ├─ skeleton 4개 동시 생성 (M9-2-a)
   │   · 01-req.md / 02-tech-review.md / 03-ux-spec.md / 04-prototype/
   │
   └─ PM 안건 전달 (PMBrief)
       │
       ▼
[기획자]
   ├─ REQ-NNN 부여 (M9-2-b) + 01-req.md 기록
   │   · max(NNN)+1 순차 / PM 번호 지정 시 존중
   │
   ├─ Draft 통보 (M9-2-c-1+c-2 ζ 단계 1, 선택)
   │   · 후행 owner(들)에게 SendMessage (1:N) or 후행 owner pull
   │
   └─ Must/Should/Could 판정 완료 → 팀장에게 "확정" SendMessage
       │
       ▼
[팀장]
   │
   └─ REQ 확정 broadcast (M9-2-c-1+c-2 ζ 단계 2, 의무)
       │
       ▼
[기술검토자 (TR owner)] ← 정식 착수 (M9-2-c-4 연쇄 단계 1)
   │
   ├─ TR-NNN 항목 작성 (§1-3 규약 / [NOT APPLICABLE] 예외 허용)
   │
   └─ 판정 완료 → 팀장 "TR 확정" SendMessage
       │
       ▼
[팀장]
   │
   └─ TR 확정 broadcast
       │
       ▼
[UX설계자 (S owner) · 퍼블리셔 (P owner)] ← 동시 병렬 착수 (M9-2-c-4 연쇄 단계 2)
   │
   ├─ S owner: 03-ux-spec.md에 S-NNN 항목 작성
   │
   └─ P owner (M9-2-e):
       ├─ assets/ 작업 (S 무관 선행 가능)
       └─ pages/<slug>.html 구조 구현 (S-NNN 확정 후)
```

### 3-3. 불변식 (2026-04-21 Gate A 1차 리뷰 반영: I1·I2·I5 교체, I7 신설)

| # | 불변식 |
|---|--------|
| 1 | 모든 REQ-NNN은 **TR·S·P 각 영역에서 최소 1개 항목 매핑 참조** 필수, 영역 무관 시 자기 파일의 `## [NOT APPLICABLE]` 섹션에 명시 (M:N 전제). P영역의 "자기 파일" = `04-prototype/README.md` (HTML 파일 부재로 해당 섹션만 README가 SSoT 겸임) |
| 2 | 확정 broadcast 없이는 후행 owner 정식 착수 불가. **"정식 착수 = broadcast 수신 이후 작성물"**, **"Draft = broadcast 미수신 상태의 모든 작성물"** (경계 정의 명시) |
| 3 | TR 확정 없이 S · P 정식 착수 불가 (연쇄 병렬 전제) |
| 4 | 파일명에 P-NNN 포함 금지 — ID 변경 시 외부 참조 깨짐 방지 |
| 5 | 매핑 SSoT = **각 항목 헤더의 참조 주석** (`## TR-NNN (→ REQ-XXX)` / HTML `<!-- P-NNN / → REQ-XXX -->`). README·STATE는 **2차 집계** (충돌 시 헤더 주석 우선). **예외**: P영역의 `[NOT APPLICABLE]` 섹션은 HTML 파일 부재로 주석 기록 불가 → `04-prototype/README.md`의 해당 섹션이 SSoT 역할 겸임 (매핑 집계 기능과 섹션 단위 역할 분리) |
| 6 | 팀장 단일 broadcast 창구 — 후행 트리거의 의무 경로는 팀장만 |
| 7 | **REQ·TR·S·P 번호는 4개 독립 시퀀스** — 영역 간 NNN 공유 없음. 각 owner가 자기 영역 `max(NNN)+1` 부여 |

### 3-4. 외부 이슈 연동

| 참조 | 본 M9-2 결정 영향 |
|------|------------------|
| M2-5 Task 완료 evidence | 확정 broadcast 이후 owner 작업 완료 선언 시 적용 |
| M2-6 Gate B | 산출물 완료 시점 팀장 + 선택 Codex 리뷰 (본 M9-2는 착수 단계) |
| M3 broadcast 규칙 | 팀장 단일 broadcast 창구 재사용 |
| M4-2 closed event set (8개) | 신규 이벤트 추가 없음, 기존 primitive(SendMessage + broadcast)만 사용 |
| M4-3-2-c 통일 포맷 5필드 | Draft SendMessage · 확정 broadcast 포맷 재사용 |
| 권고 3 SendMessage 대기 시간 | 확정 broadcast 이외 이벤트 최소화로 병목 회피 |
| CLAUDE.md §4 "선행→후행 필수" | §4의 **"선행 존재"** = **"확정 broadcast 수신 이후의 실질 기록"**. `/kickoff`가 생성하는 skeleton 자체는 "존재"에 해당하지 않음 (2026-04-21 1차 리뷰 반영). 헌법 문구 교체는 M13 이관 |

### 3-5. 후속 이관 종합

| 항목 | 이관 대상 |
|------|-----------|
| skeleton 상태 표기 (`Status: skeleton` 등) | M9-3 변경·버전 모델 |
| REQ 확정 이후 내용 변경 시 후행 재작업 트리거 | M9-3 |
| Figma 토큰 갱신 트리거 | M9-3 |
| 자가 점검 체크리스트 | M11 자가 점검·품질 게이트 |
| `[NOT APPLICABLE]` 판정 오류 감지 | M9-5 cross-ref |
| REQ 기록 형식 위반 감지 | M9-5 cross-ref |
| 깨진 매핑·누락 P-NNN 감지 | M9-5 cross-ref |
| `/status` 항목 헤더·매핑 집계 | 집계 기준 = **항목 헤더 존재** (파일 존재 아님 — 2026-04-21 1차 리뷰 반영). grep 패턴 `^## (REQ\|TR\|S\|P)-[0-9]+` + HTML 주석 `<!-- P-[0-9]+`. M12 관측성에서 일괄 구현 |
| CLAUDE.md §4 문구 업데이트 | M13 헌법 재작성 |
| README.md 매핑 표 세부 포맷 | M9 스코프 외 "템플릿·양식 표준화" |

### 3-6. 다음 단계

**M9-3 착수** — 변경·버전 모델. Gate A 2차 **조건부 통과** + 중간 3건 문구 정합 반영 완료(§5 참조) → 통과 전환.

---

## 4. M9-2 Codex Gate A 1차 리뷰 대응 (2026-04-21)

**판정**: **부분 반려** (높음 1 / 중간 3 / 낮음 1 / 없음 1) → PM 전면 수용 → 회귀 + 수정 반영 완료.

| # | 심각도 | 축 | 발견 | 처리 | 반영 위치 |
|---|--------|-----|------|------|-----------|
| 1 | 높음 | 내부모순 | P-NNN = REQ-NNN 동일 공유(§1-2)와 한 화면 M:N REQ 커버(§2-5) 양립 불가 | **수용 (옵션 A — 근본 해결)** — TR/S/P 전부 독립 시퀀스 + M:N 매핑 + 항목 헤더 SSoT로 전면 재정의 | §1-2 / §1-3 / §2-2 / §2-3-2 / §2-5 / §3-3 I1·I5·I7 |
| 2 | 중간 | 내부모순 | Draft/정식/첫 대응/Draft 골격 경계 미정의 | **수용** — §3-3 I2에 "정식 = broadcast 수신 이후, Draft = 미수신 상태" 경계 정의 명시 | §3-3 I2 |
| 3 | 중간 | 선행정합 | CLAUDE.md §4 "선행→후행 필수"를 "TR 확정 broadcast"로 재해석하나 skeleton이 /kickoff 시 이미 생성되어 헌법 문구와 즉시 충돌 | **수용** — §3-4에 "§4 선행 존재 = broadcast 수신 이후 실질 기록, skeleton 자체는 해당 안 함" 주석 명시. 헌법 문구 교체는 M13 이관 유지 | §3-4 |
| 4 | 낮음 | 불변식 | I5 README SSoT 선언 + HTML 주석에도 매핑 복제 → 충돌 시 우선순위·갱신 책임 미정 | **수용** — §2-5에서 README 역할을 "2차 집계, 충돌 시 주석 우선"으로 재정의. I5 자체를 "각 항목 헤더 주석 = SSoT"로 교체 | §2-5 / §3-3 I5 |
| 5 | 중간 | 이관경계 | 첫 커밋 관측성을 /status·M12로 이관하며 "파일 존재로 확인" 근거 제시 → skeleton 선생성과 상충 | **수용** — §3-5에서 집계 근거를 "파일 존재"→"**항목 헤더 존재**"로 교체 (grep 패턴 명시). 이관 대상은 M12 유지 | §3-5 |
| 6 | 없음 | Mesh 철학 | 발견 없음 | **수용 (조치 불필요)** | — |

**회귀 대상 sub-step**: M9-1 §1-2 (대응 규칙) + M9-2-b (발급 메커닉) + M9-2-c-3 (의무성 규약) + M9-2-e (04-prototype 구조) + §3-3 불변식.

**근본 변경 요약**:
1. TR/S/P NNN 공유 → **4개 독립 시퀀스**
2. REQ ↔ TR·S·P **M:N 매핑**
3. 매핑 SSoT = **각 항목 헤더 참조 주석** (분산)
4. README = **2차 집계** (갱신은 주석 기반)
5. `[NOT APPLICABLE]` = **전용 섹션** (파일 하단 단일 앵커)

**Decision Log**: Codex는 advisory, PM 전면 수용 결정. 근본 층위(옵션 A)로 회귀해 TR/S에서도 동일 패턴 재폭발 차단.

---

## 5. M9-2 Codex Gate A 2차 리뷰 대응 (2026-04-21)

**판정**: **조건부 통과** (중간 3 / 없음 3) → PM A안 전건 수용 → 문구 정합 수정 반영 → 통과 전환.

| # | 심각도 | 축 | 발견 | 처리 | 반영 위치 |
|---|--------|-----|------|------|-----------|
| 1 | 없음 | 축1 해소 | 1차 높음(P-NNN 모순)·중간(Draft 경계·§4 재해석) 핵심 해소 | **통과** | — |
| 2 | 중간 | 축1 잔여 | §2-5 폴더 구조 주석·결정 근거 일부가 README를 SSoT처럼 서술 | **수용** — 폴더 구조 주석 "2차 집계 + NOT APPLICABLE 섹션 한정 SSoT 겸임"으로 교체 + 결정 근거 1번 "HTML 주석 SSoT"로 표현 교체 | §2-5 폴더 구조 / §2-5 결정 근거 1 |
| 3 | 중간 | 축1 잔여 | §2-4 후속 이관 "파일 존재 여부"가 §3-5 "항목 헤더 존재"와 문서 내 불일치 | **수용** — §2-4 항목을 "항목 헤더 존재 + grep 패턴"으로 교체, 파일 존재 ≠ 실질 기록 명시 | §2-4 후속 이관 |
| 4 | 중간 | 축2 신규 | P영역 `[NOT APPLICABLE]`가 README에만 기록 → 매핑 SSoT(HTML 주석) 원칙과 예외 케이스 원천이 이원화 | **수용 (예외 명문화)** — README의 `[NOT APPLICABLE]` 섹션만 SSoT 겸임으로 명시. 이유: HTML 파일 부재로 주석 기록 원천 불가. 매핑 2차 집계와 섹션 단위 역할 분리 | §2-5 `[NOT APPLICABLE] 처리` 행 / §3-3 I1·I5 예외 |
| 5 | 없음 | 축2 호환 | ID 수명주기(재사용 금지·결번·폐기·오발급 교정) 규칙이 4개 독립 시퀀스로 바뀐 뒤에도 각 영역 독립 적용에 해석 충돌 없음 | **통과** | — |
| 6 | 없음 | 축3 외곽 | PM scope 결정권·팀장 단일 broadcast·M2-5·M2-6·파일 owner 1:1·8-event closed set 등 선행 M 외곽 유지 | **통과** | — |

**Decision Log**:
- Codex는 advisory, PM A안(전건 수용) 결정
- 중간 3건 모두 **문구·위치 정합** 수정으로 브레인스토밍 회귀 불필요
- #4 축2 신규 리스크는 구조 변경이 아닌 **예외 명문화**로 해소: `[NOT APPLICABLE]`은 HTML 파일 부재가 원천이므로 주석 SSoT 원칙의 원천적 예외 → README의 해당 섹션만 SSoT 역할 겸임 (매핑 집계 기능과는 역할 분리)
- 2차 반영 후 3차 리뷰 추가 호출 불필요 (문구 정합 수정 범위 내, 구조 변경 아님)

**최종 상태**: M9-2 확정 완료. Gate A 조건부 통과 → 반영 완료로 **통과 전환**. **M9-3 착수 가능**.

---

## 6. M9-3 — 변경·버전 모델 (확정: 2026-04-22, Codex Gate A 2차 통과)

**스코프 분해**: PM β안 확정 (2026-04-22) — M9-3-0 lifecycle(prerequisite) + M9-3-a/c/d 3건 집중 + (e) ID 마이그레이션은 M10 이관.

| sub-step | 주제 | 상태 |
|----------|------|------|
| M9-3-0 | lifecycle 상태 모델 (변경 모델의 prerequisite) | ✅ 2026-04-22 확정 |
| M9-3-a | REQ 확정 이후 내용 변경 시 후행 재작업 트리거 | ✅ 2026-04-22 확정 |
| M9-3-c | Figma 토큰 갱신 트리거 (asset 차원 변경) | ✅ 2026-04-22 확정 |
| M9-3-d | 항목 내용 변경 버전 표기 + 상태 전이 이력 기록 | ✅ 2026-04-22 확정 |

### 6-0. M9-3-0 — lifecycle 상태 모델 (확정: 2026-04-22)

**결정**: 2층 상태 모델 (파일 축 + 항목 축), 기존 설계 흩어진 상태 언급을 변경 모델 입력으로 통일 규약화.

#### 6-0-1. 2층 상태 모델

| 축 | 대상 | 존재 위치 |
|----|------|----------|
| 파일 축 | `01-req.md`, `02-tech-review.md`, `03-screen-spec.md`, `04-prototype/` (폴더 단위) | 각 파일 frontmatter |
| 항목 축 | REQ-NNN, TR-NNN, S-NNN, P-NNN 각 항목 | 항목 헤더 suffix |

#### 6-0-2. 파일 축 상태값

| 상태 | 의미 | 진입 트리거 |
|------|------|-----------|
| `skeleton` | 항목 0개, `/kickoff` 직후 초기 상태 | `/kickoff` 자동 |
| `active` | 항목 ≥1개, 실질 내용 존재 | 최초 항목 등록 순간 (§2-4 "최초 저장" 정의 재사용) 자동 |

- 전이: `skeleton → active` 1방향, 1회. 역방향 없음
- `04-prototype/` 폴더 단위는 `04-prototype/README.md`의 frontmatter `status` 필드로 표현 (skeleton = 빈 폴더 + README skeleton / active = `pages/` 또는 `assets/` 하위 파일 ≥1개)

#### 6-0-3. 항목 축 상태값

| 상태 | 의미 | 정의 출처 |
|------|------|----------|
| `draft` | broadcast 미수신 상태의 모든 항목 작성물 | §2-3-1 ζ 경계 정의 |
| `confirmed` | Must/Should/Could 판정 + 팀장 broadcast 수신 (후행 축의 경우 각 축 판정 broadcast) | §2-3-1 ζ 단계 2 |
| `deprecated` | 항목 폐기, ID 결번 예약 | §1-2-2 ID 수명주기 |
| `not-applicable` | 후행 축 대응 불필요 판정 (후행 축 항목 전용) | §2-3-2 전수 대응 예외 |

**상태 전이 유효 쌍**:

| 전이 | 허용 | 조건 |
|------|------|------|
| `draft → confirmed` | ✅ | 판정 broadcast 수신 |
| `confirmed → deprecated` | ✅ | 폐기 결정 (팀장 confirm + Decision Log) |
| `confirmed → not-applicable` | ✅ (후행 축만) | 후행 대응 불필요 판정 |
| `deprecated → confirmed` | ✅ | 복원 (팀장 confirm + Decision Log) |
| `not-applicable → confirmed` | ✅ | 대응 필요로 재판정 |
| `confirmed → draft` | **불허** | 내용 변경은 버전 표기로 처리 (M9-3-d) — 상태 되돌림 아님 |
| `draft → deprecated` | ✅ (제한적) | draft 상태 폐기 (예: 오발급 교정 중 결번) |

#### 6-0-4. 변경 이벤트 경계 (하이브리드)

§2-3-1 ζ 하이브리드 원리 재사용: Draft 비공식 / Confirmed 이후 정식.

| 이벤트 구분 | 대상 상태 변화 | 경로 | 후행 영향 |
|-----------|-------------|------|---------|
| 비공식 변경 | `draft` 상태 항목 내용 수정 | SendMessage 선택 (§2-3-1 ζ 단계 1) | 없음 (정식 착수 전) |
| **정식 변경 이벤트** | `confirmed` 항목 내용 변경 | broadcast 재발행 | 후행 재작업 (M9-3-a에서 정의) |
| **정식 변경 이벤트** | `confirmed → deprecated` | broadcast | 후행 제거 (M9-3-a) |
| **정식 변경 이벤트** | `confirmed → not-applicable` | broadcast | 후행 제거 (M9-3-a) |
| **정식 변경 이벤트** | `deprecated/not-applicable → confirmed` | broadcast | 후행 재작업·복원 (M9-3-a) |

#### 6-0-5. 표기 규약

**파일 frontmatter**:
```yaml
---
status: skeleton   # 또는 active
---
```

**항목 헤더 suffix**:
- `draft`·`confirmed`: **무표기** (기본값, broadcast 관측 경로로 판정)
- `deprecated`: `### REQ-001 [DEPRECATED]`
- `not-applicable`: `### TR-001 [NOT APPLICABLE]`

**상태 판정 경로**:

| 상태 | 판정 방법 |
|------|---------|
| 파일 축 | frontmatter `status` 필드 조회 |
| 항목 draft/confirmed | 팀장 broadcast 이력 조회 (§2-3-1 ζ) |
| 항목 deprecated/not-applicable | 헤더 suffix 조회 |

#### 6-0-6. 결정 근거

1. **기존 설계 흩어진 상태 언급을 규약화** — §1-2-2 `[DEPRECATED]`, §2-1 "Status: skeleton 등", §2-3-1 Draft/확정, §2-3-2 `[NOT APPLICABLE]`을 신규 primitive 추가 없이 통합
2. **2층 구조의 인과적 필연성** — (a) confirmed 항목 내용 변경 = 항목 축 전이, (c) Figma 토큰 갱신 = 파일(assets) 축 전이. 단축만 사용 시 한쪽을 표현 불가
3. **YAGNI 제약 준수** — 파일 축 2개/항목 축 4개. `archived`·`frozen`·`under-review` 등은 변경 모델 입력으로 쓰이지 않음 (PM 제약 "변경 모델에 필요한 만큼만")
4. **ζ 하이브리드 원리 확장** — M9-2-c 확정 원리(Draft SendMessage 선택 / Confirmed broadcast 의무)를 변경 이벤트 경계로 그대로 이관. 팀장 병목 회피 + Mesh 비동기성 유지
5. **표기 최소화** — confirmed(다수)는 무표기, 예외 상태만 suffix. §1-2-2·§2-3-2 기존 패턴과 정합

#### 6-0-7. 기각 옵션

| 옵션 | 기각 근거 |
|------|---------|
| Q2-1 A (파일 단위만) | draft/confirmed 경계(§2-3-1)를 파일 단위로 표현 불가 |
| Q2-1 B (항목 단위만) | skeleton(빈 파일) 상태 표현 위치 없음 |
| Q2-2 B/C (파일 축 archived/deprecated 추가) | M5·STATE.md 프로젝트 종료 단계와 층위 중복 |
| Q2-3 B (not-applicable을 deprecated에 통합) | 의미 구분(대응 불필요 vs 폐기) 소실, §2-3-2 전수 대응 원칙 해석 모호 |
| Q2-3 C (frozen/under-review 추가) | 변경 모델 입력으로 쓰이지 않음, YAGNI 위반 |
| Q2-3 D (사용 여부 별도 축) | 관리 부담 2배, 상호 배타 상태를 인위 분리 |
| Q2-4 A (엄격) | draft 비공식 변경 채널 차단 → Mesh 조기 협업 공간 소실 |
| Q2-4 B (포괄) | draft 수정마다 broadcast = 팀장 병목, §2-3-1 β 기각 논리 재적용 |
| Q2-5 A (confirmed도 suffix) | 다수 상태에 매번 suffix = 가독성 하락, 기존 운용과 불일치 |
| Q2-5 B (metadata 필드) | 수동 기재 부담, Mesh 속도 저해 |

#### 6-0-8. 스코프 외 (후속 sub-step 이관)

| 이관 주제 | 이관처 |
|----------|-------|
| confirmed 항목 내용 변경 시 버전 suffix 규약 | M9-3-d |
| 상태 전이 이력 기록 방식 (누가·언제·왜) | M9-3-d |
| 후행 재작업 절차 (E-modify/E-deprecate 시 TR/S/P owner 행동) | M9-3-a |
| Figma 토큰 버전 표기 (assets 차원) | M9-3-c |
| ID 마이그레이션 (ID 체계 자체 변경) | M10 이관 (β 확정) |

#### 6-0-9. 기존 확정과의 정합

| 선행 확정 | M9-3-0 정합 |
|----------|-----------|
| §1-2-2 `[DEPRECATED]` | 항목 축 `deprecated` 상태 표기로 흡수 |
| §2-1 "Status: skeleton 등" 주석 | 파일 축 `skeleton` 상태로 규약화 |
| §2-3-1 ζ 하이브리드 | 변경 이벤트 경계 원리로 재사용 |
| §2-3-2 `[NOT APPLICABLE]` | 항목 축 `not-applicable` 상태 표기로 흡수 |
| §2-4 "최초 저장" 정의 | 파일 축 `skeleton → active` 전이 트리거로 재사용 |
| M2/M4 primitive (SendMessage · broadcast) | 신규 primitive 없음 |

### 6-1. M9-3-a — 변경 이벤트 후행 재작업 트리거 절차 (확정: 2026-04-22)

**결정**: M9-2-c D(전수 대응 + 연쇄 병렬) 원리를 변경 이벤트에 재사용 + 6 action closed set + 이벤트별 권장 매핑(비강제) + 팀장 broadcast 표준 메시지 형식.

#### 6-1-1. 대응 의무성 (M9-2-c D 원리 재사용)

- 변경 이벤트 broadcast 수신 시 후행 owner는 **관련 매핑 항목 전수 검토** 필수
- `[NOT APPLICABLE]` 섹션 항목도 재검토 대상
- 검토 결과 "변경 불요"(`keep`) 판정 시 `_broadcast.log`에 reason 기록 후 유지 (Decision Log 승격은 §6-3-5 closed list에 한정)
- 근거: M9-2-c I1(대응 누락 시 공백) 원리 재적용. 변경 누락 = **drift**

#### 6-1-2. 연쇄 구조 (M9-2-c c-4 재사용)

```
REQ E-event broadcast
    ↓ TR owner 매핑 항목 전수 검토
    ├─ TR 변경 없음: keep + `_broadcast.log`(reason 필수) → [연쇄 종료]
    ├─ TR 변경 발생: modify / deprecate / exempt / restore / create
    │       ↓ 자체 TR E-event broadcast (팀장 경유)
    │       └─ S · P owner 매핑 항목 전수 검토 (동시 병렬)
    │               ├─ 변경 없음: keep + `_broadcast.log`(reason 필수)
    │               └─ 변경 발생: 6 action 중 선택
```

- 단계 1: REQ E-event broadcast → TR owner만 정식 착수
- 단계 2: TR 자체 변경 발생 시 TR E-event broadcast → S · P owner 동시 병렬
- 연쇄 중단 조건: 현 축 `keep` 판정 시 하위 broadcast 없음 = 하위 owner unaffected

#### 6-1-3. 공통 Action 집합 (closed set, 6개)

| action | 의미 | 상태 전이 |
|--------|------|---------|
| `modify` | 매핑 항목 내용 업데이트 (버전 bump — M9-3-d) | confirmed 유지 |
| `deprecate` | 매핑 항목 폐기 | confirmed → deprecated |
| `exempt` | 매핑 항목 대응 불필요 전이 (후행 축만) | confirmed → not-applicable |
| `restore` | 폐기/면제 해제 | deprecated/not-applicable → confirmed |
| `create` | 기존 매핑 없던 신규 항목 생성 | (new) → draft 또는 confirmed |
| `keep` | 변경 불요 판정 | 상태 유지 + `_broadcast.log`(reason 필수) |

**후행 action = 새 이벤트 유발**:
- `modify`/`deprecate`/`exempt`/`restore` → 자체 E-event broadcast (연쇄 단계 +1)
- `create` → M9-2-c 최초 추가 트리거로 회귀 (신규 ID 부여 + 확정 broadcast, 별도 E-event 아님)
- `keep` → broadcast 없음 (연쇄 종료)

#### 6-1-4. 이벤트별 권장 매핑 (비강제)

| 선행 이벤트 | 권장 action | 비권장이나 허용 (`_broadcast.log` reason 필수) |
|-----------|------------|-----------------------------------|
| **E-modify**(X) | `modify` / `keep` | `deprecate` / `exempt` (변경으로 무관해진 경우) |
| **E-deprecate**(X) | `deprecate` / `keep`(M:N 부분 유지) | `modify` (부분 재작성 후 유지) |
| **E-exempt**(X) | 후행 축 자기 관점 재판정 — `modify` / `keep` / `exempt` | `deprecate` |
| **E-restore**(X) | `restore` / `create`(영구 결번이었음) / `keep` | `modify` |

#### 6-1-5. Broadcast 발행 절차 + 메시지 형식

**발행 절차** (M3 정합):
1. 변경 수행 owner → 팀장에게 **`E-event` SendMessage** — 필수 입력: `type` / `target` / `state`(from → to) / `summary` / `submitter` / **`reason`**
2. 팀장이 수신 내용을 **broadcast**로 변환 발행 (단일 창구 유지, 6필드 완전성 확인 후 발행)
3. 관련 후행 owner 수신 → 6-1-4 권장 매핑 참조하여 action 선택
4. 후행 owner가 비권장 action 선택 시 `_broadcast.log` reason에 근거 명기 (Decision Log 승격 해당 시 §6-3-5 규약 추가 적용)

**`reason` 입력 강제** (Codex Gate A 1차 #3 반영):
- owner → 팀장 SendMessage에서 `reason` 공란·생략 시 팀장은 **broadcast 발행을 보류**하고 owner에게 `reason` 요청 SendMessage 회송
- owner가 `reason` 포함 재SendMessage 도달할 때까지 연쇄 진입 없음 (후행 owner 미통지)
- `reason` 강제의 관측 지점 = 팀장 broadcast 발행 직전 게이트. 자가 기록·owner 자율 검증에 의존하지 않음
- 회송 횟수는 운영 규칙(이관)이나 **동일 E-event에 대해 2회 회송까지는 지연 허용**, 그 이상은 PM 에스컬레이션 (CLAUDE.md §10 블로커 규칙 적용)

**메시지 표준 필드** (6필드 모두 필수, §6-3-4와 동일):

```
# <type>
- target: <ID>
- state: <from_state> → <to_state>
- summary: <변경 요약 1줄>
- submitter: <실변경 owner>
- reason: <왜 — 1~2줄>
```

**예시**:

```
# E-modify
- target: REQ-005
- state: confirmed → confirmed (내용 변경)
- summary: 인증 플로우에 SMS 2FA 추가
- submitter: 기획자
- reason: 고객사 보안팀 요구로 2단계 인증 의무화

# E-deprecate
- target: REQ-012
- state: confirmed → deprecated
- summary: REQ-008과 중복 통합
- submitter: 기획자
- reason: 범위 축소 — REQ-008이 REQ-012 기능 전체 포함

# E-exempt
- target: TR-003
- state: confirmed → not-applicable
- summary: 플랫폼 기본 지원, 별도 구현 불요
- submitter: 기술검토자
- reason: iOS 15+ 기본 API 제공, 구현 공수 제거

# E-restore
- target: TR-007
- state: deprecated → confirmed
- summary: 기술 환경 변경으로 재검토 후 복원
- submitter: 기술검토자
- reason: 벤더 정책 변경으로 원래 방식 재가용
```

#### 6-1-6. 결정 근거

1. **M9-2-c 원리 재사용** — D(전수 대응) + c-4(연쇄 병렬)을 그대로 확장. primitive 최소화, 학습 부담 최소
2. **6 action closed set** — M4 원칙 정합. 관측·집계 가능
3. **권장 비강제 매핑** — M:N 매핑·도메인 편차 고려. 엄격 매핑은 과규정으로 drift 유발
4. **연쇄 자연 중단** — TR·S·P 각 단계에서 `keep` 다수면 하위 unaffected. Mesh idle 회피 + 낭비 차단
5. **broadcast 팀장 단일 창구** — M3 primitive 재사용, 관측성 집중
6. **메시지 최소 충족 필드** — Git(diff) + `_broadcast.log`(reason) + Decision Log(§6-3-5 승격분)와 역할 분리. 중복 저장 회피

#### 6-1-7. 기각 옵션

| 옵션 | 기각 근거 |
|------|---------|
| Q3-1 B (선택 대응) | drift 발생 = 설계 정합성 붕괴, 장기 누적 리스크 |
| Q3-1 C (타입별 차등 의무성) | 모든 타입이 본질적으로 매핑 검토 필요, 차등 실익 없음 |
| Q3-2 B (완전 동시 병렬) | M9-2-c B 기각 근거 재적용 — TR "변경 불요" 판정 시 S·P 재작업 폭발 |
| Q3-2 C (타입별 차등 연쇄) | E-deprecate M:N 매핑 부분 유지 판단은 TR 선행 필수 |
| Q3-3 A (엄격 매핑) | 실제 M:N + 도메인 편차로 과규정, 엣지 케이스마다 규약 업데이트 |
| Q3-3 B (자유 규약) | 의도 관측성↓, 집계 어려움 |
| Q3-4 A (최소 형식) | 파일 재탐색 비용 = Mesh 비동기 속도 저하 |
| Q3-4 C (상세 형식) | Git + Decision Log와 역할 중복 |

#### 6-1-8. 스코프 외 (후속 이관)

| 이관 주제 | 이관처 |
|----------|-------|
| 변경된 항목의 버전 suffix 규약 (예: `### REQ-005 [v2]`) | M9-3-d |
| 상태 전이 이력 기록 방식 (누가·언제·왜) | M9-3-d |
| Figma 토큰 갱신 (assets 차원 변경) | M9-3-c |
| "변경 불요" 판정 오류 감지 메커니즘 | M9-5 cross-ref |
| 연쇄 대기 시간 한도 (SLA) | 운영 규칙, M9 스코프 외 |

#### 6-1-9. 기존 확정과의 정합

| 선행 확정 | M9-3-a 정합 |
|----------|-----------|
| M3 broadcast 팀장 단일 창구 | broadcast 발행 절차 그대로 재사용 |
| M4-2 closed set 이벤트 primitive | E-event 4종은 기존 broadcast/SendMessage primitive 재사용 (신규 primitive 없음) |
| M9-2-c c-3 전수 대응 원리 | 변경 의무성으로 재사용 (I1 근거 재적용) |
| M9-2-c c-4 연쇄 병렬 | REQ → TR only → S·P 병렬 연쇄 그대로 |
| M9-3-0 상태 전이 유효 쌍 | action → 상태 전이 매핑 정합 (confirmed → draft 불허 원칙 유지) |
| M9-3-0 `[NOT APPLICABLE]` 재검토 | 대응 의무성 범위에 포함 (전수 검토 대상) |

### 6-2. M9-3-c — Figma 토큰 갱신 트리거 (asset 차원 변경) (확정: 2026-04-22)

**결정**: asset 차원 변경은 **이벤트 체계 외** 처리하되, 구조 변경 판정 시 **항목 축 E-modify로 우회**하여 기존 §6-1 연쇄 구조를 작동시킨다.

#### 6-2-1. 이벤트 체계 연결 방식

| 케이스 | 처리 |
|--------|------|
| asset 파일 갱신 자체 | E-event 아님 (assets owner 자율 갱신) |
| **값 업데이트** 판정 | README 이력 섹션 기록 후 종료 (후속 없음) |
| **구조 변경** 판정 (영향 항목 `confirmed`) | 해당 항목 owner(S/P)가 자기 항목 **E-modify 발행** → §6-1 연쇄 진입 |
| **구조 변경** 판정 (영향 항목 `draft`) | 해당 항목 owner에게 P owner SendMessage 통지 → 항목 owner가 Draft에 asset 변경 반영 후 **정식 확정 broadcast에 포함**. 별도 E-modify 미발행 (Draft는 broadcast 대상 아님 — §3-3 I2) |
| **구조 변경** 판정 (영향 대상 **미생성** = 파일·ID 부재) | 현 시점 대응 불가. `_broadcast.log`에 `deferred: target not yet active` 메모 entry만 append → target 생성 시점에 P owner가 해당 owner에 SendMessage로 사후 통지, 해당 owner가 자기 최초 확정 broadcast에 asset 사항 반영 |

- M4-2 closed set 유지 (신규 이벤트 타입·target 스키마 없음)
- §2-5 "assets/ 하위는 S 무관 선행 가능" 경계(= 구현 세부 계층) 보존
- `deferred` 메모 entry 최소 4필드: `type: deferred-asset-structural` / `target: <미생성 예상 ID 또는 영역 태그>` / `summary: <변경 내용 1줄>` / `reason: <target 미생성 이유 · 예정 시점>`. 6필드 broadcast와 구분되는 별도 entry 유형 (I10 `reason` 필수 원칙은 유지)

#### 6-2-2. asset 갱신 주체

- **기본**: P owner(퍼블리셔)가 `04-prototype/assets/` 하위 갱신 책임 (M6 파일 소유권 정합)
- **예외**: 디자이너 레포 접근 시 직접 commit 허용, 단 **변경 이력 기록 책임은 반드시 P owner**
- 갱신(commit) 주체와 기록 주체 분리 허용. 기록 주체는 단일(P owner)

#### 6-2-3. 후행 영향 평가

**판정 주체**: P owner 자가 판정 (갱신·commit 시점 동시 수행)

**판정 기준 가이드**:

| 판정 | 기준 |
|------|------|
| **값 업데이트** | CSS 변수 값·hex·숫자만 변경, 변수명/key/스키마 불변 |
| **구조 변경** | 변수명 rename, 토큰 추가/삭제, JSON 키 스키마 변경, 계층 재구성 |
| **팀장 confirm 대기** | 애매한 경우 (예: 토큰 그룹명 변경으로 의미는 같으나 참조 경로 변경) |

**불확실 케이스**: 팀장 confirm (§1-2-2 오발급 교정, §2-3-2 [NOT APPLICABLE] 이의 패턴 재사용)
**판정 오류 감지**: M9-5 cross-ref 영역 (본 스코프 외 이관)

#### 6-2-4. Asset 변경 이력 섹션 형식

**위치**: `04-prototype/README.md` 하단, 기존 `## [NOT APPLICABLE]` 섹션과 병렬.

**엔트리 5필드 형식**:

```markdown
## Asset 변경 이력

- YYYY-MM-DD — <파일 경로> — <요약 1줄>
  - 갱신자: <이름/역할>
  - 판정: 값 업데이트 | 구조 변경 | 팀장 confirm 대기
  - 후속 action: 없음 | E-modify(<항목 ID 나열>) 발행 [완료|예정] | ...
```

**예시**:

```markdown
- 2026-04-22 — assets/tokens/colors.css — primary color hex 변경 (#0066FF → #1A7FFF)
  - 갱신자: P owner (홍길동)
  - 판정: 값 업데이트
  - 후속 action: 없음 (CSS 변수 참조로 자동 반영)

- 2026-04-25 — assets/tokens/spacing.css — spacing 변수명 체계 개편
  - 갱신자: P owner (홍길동)
  - 판정: 구조 변경
  - 후속 action: E-modify(P-003, P-007) 발행 완료

- 2026-04-27 — assets/tokens/typography.json — 토큰 그룹 rename (display → heading)
  - 갱신자: 디자이너 (김철수, 직접 commit) / 기록자: P owner (홍길동)
  - 판정: 팀장 confirm 대기
  - 후속 action: 팀장 판정 후 결정
```

#### 6-2-5. 통합 흐름

```
디자이너 Figma에서 토큰 변경
    ↓
P owner가 assets/<tokens|css|js>/<file> 로컬 갱신 + commit
  (또는 예외: 디자이너 직접 commit)
    ↓
P owner가 영향 판정 수행
    ├─ 값 업데이트 → README 이력 섹션 기록 → 종료
    ├─ 구조 변경 → README 이력 기록 + 영향 항목 상태 분기
    │       ├─ confirmed: 영향 항목 owner에 SendMessage → owner가 E-modify 발행 (§6-1 연쇄 진입)
    │       │       ↓
    │       │       기존 §6-1 후행 재작업 트리거 절차로 처리
    │       ├─ draft: 영향 항목 owner에 SendMessage → owner가 Draft에 반영 후 정식 확정 broadcast에 포함 (별도 E-modify 없음)
    │       └─ 미생성(파일·ID 부재): `_broadcast.log`에 `deferred: target not yet active` entry append → target 생성 시 P owner가 해당 owner에 사후 SendMessage → 해당 owner가 최초 확정 broadcast에 asset 사항 반영
    └─ 팀장 confirm 대기 → SendMessage to 팀장 → 팀장 판정 후 위 분기
```

#### 6-2-6. 결정 근거

1. **primitive 최소화** — 신규 이벤트 타입·target 스키마 변경 없음. M4-2 closed set 유지 → Codex Gate A 노출 부담 감소
2. **asset = 구현 세부 경계 보존** — §2-5 "S 무관 선행 가능" 원칙 일관성 유지
3. **갱신 빈도 부담 완화** — Figma iteration으로 빈번할 수 있는 토큰 갱신을 이벤트 체계 편입 시 매번 broadcast → Mesh 피로 유발
4. **관측성 최소 보장** — README 이력 섹션으로 "언제·무엇·판정·후속"을 1 place에 집약
5. **기존 패턴 재사용** — §2-3-2 [NOT APPLICABLE] 섹션, §2-5 README SSoT 겸임 등 기존 구조화 패턴 정합
6. **판정 오류 감지는 M9-5로 이관** — 전수 검증은 별도 주제, 본 스코프는 "정상 판정" 절차 확립에 집중

#### 6-2-7. 기각 옵션

| 옵션 | 기각 근거 |
|------|---------|
| Q4-1 A (E-modify target 다형화) | §1-2 ID 체계와 target 스키마 의미 혼란, 규약 복잡도↑ |
| Q4-1 B (신규 E-asset-update) | closed set 확장, 학습 부담 + Codex 재노출 |
| Q4-1 D (tokens만 비대칭 이벤트화) | tokens/CSS/JS 경계 규약 예외 증가 |
| Q4-2 B (디자이너 직접 commit 표준) | M6 정적 owner 원칙 파괴, 디자이너 하네스 학습 부담 |
| Q4-2 C (PR + 리뷰 루프) | Mesh 속도 저하, 토큰 갱신 빈도 고려 시 마찰 누적 |
| Q4-3 B (후행 owner 전수 검토) | 매 갱신마다 여러 owner 반응 강제, M9-2-c B 기각 논리 동형 |
| Q4-3 C (팀장 broadcast 중재) | 팀장 병목, 권고 3 SendMessage 대기 시간 악화 |
| Q4-4 A (최소 3필드) | 판정 결과 누락 → 후행 owner 재파싱 비용 |
| Q4-4 C (상세 표) | diff는 Git에, 외부 링크는 관리 범위 외 → 중복·과부담 |

#### 6-2-8. 스코프 외 (후속 이관)

| 이관 주제 | 이관처 |
|----------|-------|
| 토큰 파일 내부 구조 규약 (표준 스키마) | M9 스코프 외 (템플릿·양식 표준화) |
| 판정 오류 감지 (값 업데이트로 기록했는데 실제 구조 변경) | M9-5 cross-ref |
| Git commit 메시지 규약 (`[tokens] ...`) | 운영 규칙, M9 스코프 외 |
| 디자이너 ↔ 하네스 인터페이스 자동화 (Figma API 연동) | 미래 이슈, M9 스코프 외 |

#### 6-2-9. 기존 확정과의 정합

| 선행 확정 | M9-3-c 정합 |
|----------|-----------|
| M4-2 8-event closed set | 신규 이벤트 타입 없음 (영향 없음) |
| M6 파일 소유권 정적 1:1 | P owner가 `04-prototype/` 전체 + `assets/` 하위 주관 |
| §1-2 ID 체계 | target 스키마 변경 없음, asset에 ID 부여 없음 |
| §2-5 assets/ S 무관 선행 원칙 | "구현 세부 계층" 경계 보존 |
| §2-5 README SSoT 겸임 예외 패턴 | Asset 변경 이력 섹션도 동일 패턴 (README 직접 기록) |
| §6-1 연쇄 구조 | 구조 변경 판정 시 항목 축 E-modify로 우회 → 기존 §6-1 진입 |
| §1-2-2 오발급 교정 절차 | 불확실 판정 시 팀장 confirm 패턴 재사용 |
| §3-3 I2 Draft 경계 | 영향 항목 `draft` 상태 시 E-modify 미발행, Draft 내부 반영 경로로 연결 (I2 "Draft = broadcast 미수신 상태의 모든 작성물" 원칙 준수, Codex Gate A 1차 #4 반영) |
| §6-3 `_broadcast.log` | `deferred-asset-structural` entry는 6필드 broadcast와 구분되는 별도 유형, 최소 4필드(type/target/summary/reason)로 append. target 활성화 시점에 P owner 사후 SendMessage로 연결 (Codex Gate A 1차 #4 반영) |

### 6-3. M9-3-d — 항목 내용 변경 버전 표기 + 상태 전이 이력 기록 (확정: 2026-04-22)

**주제**: §6-1-8에서 이관된 두 건만 다룸 — (1) 버전 suffix 규약, (2) 상태 전이 이력(누가·언제·왜) 기록 방식. M9-3의 마지막 sub-step.

#### 6-3-1. 버전 suffix 규약

- **도입 O** — 형식: `### REQ-001 [v2]` (제목 뒤 대괄호 + 정수 카운터)
- **초기 상태**: 신규 `create` 항목은 suffix 생략 (암묵적 v1)
- **첫 변경 시**: `[v2]` 최초 부여 → 이후 변경마다 +1 (`[v3]`, `[v4]`, ...)
- **표기 위치**: 항목 heading 끝 (ID 뒤 공백 1칸 + `[vN]`)
- **목적**: 리뷰 시 "이 항목 몇 번 바뀌었는지" 시각적 즉시 인지. 변경 **추적성** 자체는 `_broadcast.log`와 Git이 담당 (suffix는 보조 신호)

#### 6-3-2. Suffix 증감 규칙 (§6-1-3 action 6개와 교차)

Suffix 증감은 **action 기준**으로 결정 (이벤트 기준 아님 — action이 실제 내용 변경 여부를 표현):

| Action | Suffix 증감 | 근거 |
|--------|------------|------|
| `create` | suffix 없음 (암묵 v1) | 최초 등록, 변경 이력 없음 |
| `modify` | **+1** | 내용 변경 발생 |
| `deprecate` | 미증가 | 상태(to_deprecated)만 변경, 내용 불변 |
| `exempt` | 미증가 | 상태(to_not_applicable)만 변경, 내용 불변 |
| `restore` | **+1** | 복구는 '이전 내용으로 되돌림'이나 이력상 변경 1회로 간주 |
| `keep` | 미증가 | 현상 유지, 변경 없음 |

규칙 요약: **action ∈ {modify, restore} → suffix +1, 그 외 → 미증가**.

#### 6-3-3. 이력 저장소 구조 (하이브리드)

두 저장소의 역할 분리:

| 저장소 | 대상 | 위치 | 형식 |
|-------|------|------|------|
| **STATE.md Decision Log** | 중대 전이 (6-3-5 closed list) | `projects/<slug>/STATE.md` | §2-4 Decision Log 형식 |
| **`_broadcast.log`** | **전수 이벤트 로그** (broadcast entry + `keep` 기록 + `deferred-asset-structural` entry 통합 append) | `projects/<slug>/_broadcast.log` | append-only, entry 유형별 필드 구성 상이 (아래 유형 표 참조) |

**`_broadcast.log` 파일 계약 (Codex Gate A 2차 #1 반영)**:
- **역할 정의 (단일 문장)**: `_broadcast.log`는 broadcast **전용** 파일이 아닌, **항목·자산 변경 이력을 한 곳에 모으는 이벤트 로그**이다. M9-3 범위에서 파생되는 모든 변경 기록이 이 파일로 수렴한다.
- **entry 유형 분류**:

| entry 유형 | 필드 구성 | 발생 조건 |
|-----------|----------|---------|
| **broadcast** | 6필드 (§6-3-4 / §6-1-5 형식) | 팀장이 E-event broadcast 발행 시 append |
| **keep 기록** | 최소 4필드: `type: keep` / `target: <ID>` / `summary: <검토 결과>` / `reason: <변경 불요 근거>` | 후행 owner가 전수 검토 후 `keep` 판정 시 (broadcast 미발행, 로그만 append) |
| **deferred-asset-structural** | 최소 4필드: `type: deferred-asset-structural` / `target: <미생성 예상 ID 또는 영역 태그>` / `summary: <변경 내용 1줄>` / `reason: <target 미생성 이유 · 예정 시점>` | §6-2-1 asset 구조 변경 영향 대상이 미생성 상태 시 P owner가 append |

- **`reason` 필드는 모든 유형에서 필수** (I10 원칙 일관 적용)
- **중복 기록 없음**: Decision Log로 승격(§6-3-5) 되는 경우에도 `_broadcast.log` entry는 단일. 승격은 "참조 관계"이지 복제가 아님
- **소유권**: 세 유형 중 broadcast·keep 기록은 팀장 append (M3 단일 창구), `deferred-asset-structural`은 P owner 직접 append (§6-2 asset 영역 자율성 보존). **M6 정적 1:1 소유권의 명시적 예외 2건** — (i) `_broadcast.log` 슬러그 공용 · (ii) P owner `deferred` entry append 권한
- **append-only**: 시간순 append, 과거 entry 수정 금지. 정정 필요 시 새 entry 추가 (`type: correction` + 기존 entry 타임스탬프 참조)

#### 6-3-4. Broadcast 메시지 6필드 확장

§6-1-5 5필드 → **6필드**로 확장 (`reason` 필수 신설):

```
# <type>                                # E-modify | E-deprecate | E-exempt | E-restore
- target: <ID>                          # REQ-005 등 (suffix 제외, ID 본체만)
- state: <from_state> → <to_state>      # 항목 축 상태 전이 (§6-0-3)
- summary: <1줄 요약>                    # 무엇이 바뀌었는지
- submitter: <실변경 owner>               # S/P/TR owner
- reason: <1~2줄>                        # 왜 바뀌었는지 (신설, 필수)
```

- **reason 필수 이유**: `submitter`(누가) + timestamp(언제, 파일 append로 자동 기록) + `summary`(무엇)만으로는 **"왜"** 가 유실됨. 미래 회귀·진단 시 의도 복원 불가
- **`_broadcast.log` entry 구분**: 블록 간 `---` 구분선 + append 시점 timestamp header (`## 2026-04-22T14:30` 형식, 팀장 append 시 자동 기록)

#### 6-3-5. Decision Log 추가 승격 closed list

**단일 원칙**: 모든 변경 이벤트(`keep` 포함)는 예외 없이 `_broadcast.log`에 전수 기록. STATE.md Decision Log는 아래 3건에 한해 **추가로** 병기 승격:

| 승격 조건 | 근거 |
|----------|------|
| **E-deprecate** (임의) | 요구사항·설계 폐기는 프로젝트 범위 축소 — §2-4 "범위 변경" 해당 |
| **E-restore** (임의) | 복구는 이전 폐기/예외 결정의 **번복** — 이중 의사결정 기록 필요 |
| **E-modify 중 후행 broadcast 파생분** | 후행 산출물 항목 추가·수정을 유발 = §2-4 "선행 산출물 수정" 해당 |

- **닫힌 목록**: 위 3건 외는 `_broadcast.log` 단독 기록. PM 재량 승격 금지 (M4-2 closed set 원칙 정합)
- **E-modify 중 단일 파일 내부 수정**: 후행 broadcast 미발행 시 승격 제외. `_broadcast.log` 단독 기록
- **`keep` / 비권장 action**: 전수 기록은 `_broadcast.log`가 담당. Decision Log 승격 대상 아님 (위 3건 외이므로 자동 제외)
- **경계 사례 해소 (Codex Gate A 1차 반영, 2026-04-22)**: "E-modify 중 후행 broadcast 파생분" 판정 시점은 **본 E-modify 연쇄가 최종 종료된 시점**. 후행 owner가 전수 검토 후 **1명 이상 non-keep action** 수행 시 파생 성립. 모두 `keep`이면 파생 없음 — 본 E-modify도 `_broadcast.log` 단독 기록

#### 6-3-6. 통합 이력 조회 흐름

| 조회 목적 | 1차 소스 | 보조 |
|----------|---------|------|
| 특정 항목의 현재 버전 | 산출물 파일 heading `[vN]` | — |
| 전체 변경 이력 (시간순) | `_broadcast.log` | Git log |
| 중대 결정 요약 | `STATE.md` Decision Log | `_broadcast.log` 원본 entry |
| 특정 항목의 변경 횟수 | `[vN]` suffix에서 바로 읽음 (N-1회) | `_broadcast.log` grep `target: REQ-005` |
| 코드 수준 diff | Git blame / log | — |

원칙: 상위 계층(suffix → Decision Log → broadcast.log → Git)으로 갈수록 **세밀함 증가, 서술 감소**.

#### 6-3-7. 결정 근거

- **B 간단 카운터 (Q5-1)**: YAGNI 정합 (semver는 major/minor 판정 기준 부재로 과잉), 시각적 즉시성 확보. A 불도입은 리뷰 시 수동 대조 부담 발생
- **A 하이브리드 (Q5-2)**: §2-4 "중대 결정만" 원칙 유지 + 전수 이력 확보. B(Decision Log 단일화)는 §2-4 기준 희석, C(파일 내 섹션)는 cross-file 추적 불가, D(CHANGELOG)는 `_broadcast.log`와 중복
- **A reason 필수 + closed list 승격 (Q5-3)**: M4-2 closed set 원칙 정합, 인적 판단 의존 제거. B(PM 판단)는 일관성 약화, C(reason 선택)는 중대 외 로그의 "왜" 유실

#### 6-3-8. 기각 옵션

| 기각 | 선택지 | 기각 사유 |
|-----|-------|---------|
| Q5-1 A | Suffix 불도입 | Git·broadcast 이력만으로는 리뷰 중 "변경 빈도" 시각적 인지 불가. 리뷰 효율 저하 |
| Q5-1 C | semver `[v2.1]` / 날짜 suffix | major/minor 판정 기준 부재 → 규칙 모호, 관리 부담 |
| Q5-2 B | Decision Log 단일화 | §2-4 "중대 결정만" 규약 희석, Decision Log 비대, 가독성 저하 |
| Q5-2 C | 파일 내 "변경 이력" 섹션 | 파일당 섹션 유지보수 부담, 교차 이벤트(한 broadcast가 여러 파일 영향) 분산 기록 |
| Q5-2 D | `CHANGELOG.md` 별도 파일 | `_broadcast.log`와 역할 중복, 수작업 부담, 파일 수 증가 |
| Q5-3 B | reason 필수 + 승격은 PM 판단 | 인적 판단 의존 → 프로젝트 간 일관성 저하 |
| Q5-3 C | reason 선택 | 중대 외 변경의 "왜" 유실 → 미래 진단 불가 |

#### 6-3-9. 스코프 외 (후속 이관) + 기존 확정과의 정합

**스코프 외 이관**

| 이관 주제 | 이관처 |
|----------|-------|
| Suffix 대형 번호(`[v99]` 초과) 롤오버 정책 | M9 외 (운영 규칙) |
| `_broadcast.log` 자동 회전 / archive | M9 외 (운영 규칙) |
| Decision Log 장기 보존 · 아카이빙 | M9 외 (운영 규칙) |
| Cross-slug 변경 추적 (프로젝트 간 의존) | M9-5 cross-ref |
| Timestamp 포맷 표준화 (ISO 8601 / 로컬) | M9 외 (운영 세부) |

**기존 확정과의 정합**

| 선행 확정 | M9-3-d 정합 |
|----------|-----------|
| M3 broadcast 팀장 단일 창구 | `_broadcast.log`·Decision Log 모두 팀장 append (lock 보장) |
| M4-2 8-event closed set | `reason` 추가는 메시지 필드 확장, 이벤트 종류 증가 아님 |
| M6 파일 소유권 정적 1:1 | `_broadcast.log`는 슬러그 단위 공용, 팀장 소유 (예외 명시) |
| §1-2-2 ID 수명주기 | ID 본체 불변 유지, suffix는 ID의 **표시 레이어**이지 ID 일부 아님 |
| §2-4 Decision Log 규약 | 중대 결정만 기록 원칙 유지, closed list로 "중대" 기준 구체화 |
| §6-0 상태 모델 | 상태 전이(deprecate/exempt)는 suffix 미증가, 내용 변경만 suffix 증가 — 2층 모델 정합 |
| §6-1-3 6 action closed set | action이 suffix 증감의 판정 기준 (재사용) |
| §6-1-5 broadcast 5필드 | 6필드로 확장 (reason 신설), 기존 5필드 의미 불변 |
| §6-2-4 Asset 변경 이력 섹션 | README 직접 기록 vs `_broadcast.log` 누적 — 두 패턴 공존, asset은 SSoT 겸임 예외 유지 |

---

## 7. M9-3 종합

### 7-1. 확정 요약

| sub-step | 결정 | 핵심 규약 |
|----------|------|----------|
| M9-3-0 | 2층 상태 모델 | 파일 축(skeleton / active) + 항목 축(draft / confirmed / deprecated / not-applicable) |
| M9-3-a | 이벤트 4 closed × action 6 closed + D 전수·연쇄 병렬 | E-modify / E-deprecate / E-exempt / E-restore × {create, modify, deprecate, exempt, restore, keep} / REQ→TR only, TR→S·P 병렬 |
| M9-3-c | asset 차원 E-modify 우회 + README Asset 변경 이력 | M4-2 8-event 확장 없이 항목 축 이벤트로 흡수 / Asset 변경 이력 섹션 5필드 |
| M9-3-d | suffix `[vN]` 간단 카운터 + Decision Log·`_broadcast.log` 하이브리드 + broadcast 6필드(reason 필수) | action ∈ {modify, restore} → +1 / 승격 closed list 3종 / 6필드 완전성 강제 |

### 7-2. 통합 흐름 (End-to-End)

```
[변경 요구 발생]
   │
   ├─ 차원 판정
   │   · 본문(REQ/TR/S/P 항목 내용)      → 항목 축 이벤트로 직행
   │   · asset(토큰·CSS·JS 등)           → 항목 축 E-modify로 우회 (§6-2-1)
   │
   ▼
[owner] 이벤트 타입 판정 (closed 4종)
   · E-modify / E-deprecate / E-exempt / E-restore
   │
   ▼
[owner] action 선택 (closed 6종)
   · create / modify / deprecate / exempt / restore / keep
   · action ∈ {modify, restore} → 항목 heading suffix +1 (§6-3-2)
   │
   ▼
[owner] 팀장에게 "변경 확정" SendMessage (reason 포함)
   │
   ▼
[팀장] broadcast 6필드 발행 (§6-3-4)
   · type / target / state / summary / submitter / reason
   │
   ├─ `_broadcast.log` entry append (전수, append-only)
   │
   └─ 승격 조건 충족 시 STATE.md Decision Log 병기 (§6-3-5)
       · E-deprecate (임의) / E-restore (임의)
       · E-modify 중 후행 broadcast를 파생시키는 건
   │
   ▼
[후행 owner] 전수 대응 (§6-1-2 연쇄 구조)
   · REQ 변경 → TR only 착수 / TR 변경 → S · P 병렬 착수
   · 영역 무관 판정 시 action=exempt (항목 축) 또는 `[NOT APPLICABLE]` 유지
   │
   ▼
[후행 owner] 각 영역 action 수행 → 팀장 "확정" SendMessage
   │
   ▼
[팀장] 후행 broadcast 재발행 → 이력 연쇄 누적
```

### 7-3. 불변식 (I1~I7 불변 전제, I8~I14 신설)

기존 M9-2 §3-3의 I1~I7은 불변. M9-3에서 신설:

| # | 불변식 |
|---|--------|
| 8 | 모든 내용 변경(action ∈ {modify, restore})은 **항목 heading suffix `[vN]` +1** 수반. 상태만 변경(deprecate / exempt / keep) 시 suffix 불변 |
| 9 | 모든 **이벤트 처리 결과**(E-event broadcast · `keep` 판정 · `deferred-asset-structural`)는 `projects/<slug>/_broadcast.log`에 **entry 1건** 기록 필수. `_broadcast.log`는 **이벤트 로그**로 정의됨 (§6-3-3, Codex Gate A 2차 #1 반영). 누락 금지, 과거 entry 수정 금지 (append-only, 정정은 `type: correction` 신규 entry로) |
| 10 | Broadcast 유형 entry는 **6필드 완전성** 필수 — `type / target / state / summary / submitter / reason`. 1개라도 공란인 entry 발행 금지. **강제 게이트** = 팀장 broadcast 발행 직전 검증 (§6-1-5). 비-broadcast entry 유형(§6-3-3 `keep` 기록·`deferred-asset-structural`)은 각 최소 4필드. **`reason` 필드는 모든 유형에서 필수** (유형 무관 일관 적용) |
| 11 | Decision Log 승격은 **closed list 3종만** — {E-deprecate(임의), E-restore(임의), E-modify 중 후행 broadcast 파생}. PM 재량 승격 금지 |
| 12 | 이벤트 타입 **closed set 4종** 외 추가 금지 (E-modify / E-deprecate / E-exempt / E-restore). asset 차원 변경은 항목 축 E-modify로 우회 (§6-2-1) |
| 13 | Action **closed set 6종** 외 사용 금지 (create / modify / deprecate / exempt / restore / keep) |
| 14 | 항목 ID(REQ/TR/S/P-NNN)는 변경 이벤트 전 과정 **불변** — suffix `[vN]`은 표시 레이어이지 ID 구성 요소 아님 (§1-2-2 + §6-3-9 재확인) |

### 7-4. 외부 이슈 연동

| 참조 | 본 M9-3 결정 영향 |
|------|------------------|
| M3 broadcast 규칙 | 팀장 단일 창구 유지 (`_broadcast.log` broadcast·keep entry append·Decision Log 승격 모두 팀장). `_broadcast.log` `deferred-asset-structural` entry는 P owner 직접 append — §6-2 asset 자율성 보존 범위 내 **명시적 예외** |
| M4-2 8-event closed set | 이벤트 타입 추가 없음 (asset 우회, `deferred`는 log entry 유형이지 event 유형 아님). `reason` 추가는 **메시지 필드 확장** — closed event set 원칙 준수 |
| M4-3-2-c 통일 포맷 5필드 | broadcast 유형 entry는 **6필드로 확장** (reason 신설), 기존 5필드 의미 불변 |
| M6 파일 소유권 정적 1:1 | **명시적 예외 2건**: (i) `_broadcast.log` 슬러그 공용·팀장 주관(+ P owner deferred entry append 허용) · (ii) `STATE.md Decision Log` 섹션도 팀장 append 공용 (STATE.md 자체는 각 owner 자유 편집 가능하나 Decision Log 섹션만 팀장 단일 창구). 두 예외 모두 M3 broadcast 단일 창구 원칙의 파일 단위 구현 |
| §2-4 Decision Log 규약 | "중대" 기준을 closed list 3종으로 구체화, 인적 판단 의존 제거 |
| §2-5 assets/ README SSoT 겸임 | asset 변경 이력 패턴 재사용 (§6-2-4), 예외 범위 확장 없음 |
| CLAUDE.md §2-4 문구 | 본 M9-3 결정으로 세부 기준 확정 — 헌법 문구 업데이트는 **M13 이관** |
| **CLAUDE.md §7** "선행 산출물 수정 시 Decision Log 필수" | **관계 명시 (Codex Gate A 2차 #3 반영)**: 본 §6-3-3·§6-3-5는 CLAUDE.md §7의 **하위 레벨 세부 운영 기준**으로, 헌법 규칙을 **축소하지 않고 구체화**한다. 헌법이 요구하는 "기록 의무"는 `_broadcast.log` 전수 append로 **더 엄격하게** 만족되며(헌법은 중대 변경만 요구, M9-3은 변경 불요 판정까지 포함), 그중 중대분만 §6-3-5 closed list로 Decision Log 병기 승격한다. 따라서 헌법과 본 M9-3 간에는 **적용 범위 축소 관계 아닌 상세화 관계**. 헌법 문구 교체는 **M13 이관** (표면 표현 일치 목적) |

### 7-5. 후속 이관 종합

| 항목 | 이관 대상 |
|------|---------|
| ID 체계 자체 변경 · 마이그레이션 | M10 |
| Suffix 대형 번호(`[v99]` 초과) 롤오버 정책 | M9 외 (운영) |
| `_broadcast.log` 자동 회전 · archive | M9 외 (운영) |
| Decision Log 장기 보존 · 아카이빙 | M9 외 (운영) |
| Timestamp 포맷 표준화 (ISO 8601 / 로컬) | M9 외 (운영 세부) |
| Cross-slug 변경 추적 (프로젝트 간 의존) | M9-5 cross-ref |
| 토큰 파일 내부 구조 규약 (표준 스키마) | M9 외 (템플릿·양식 표준화) |
| 판정 오류 감지 (값 업데이트로 기록했는데 실제 구조 변경) | M9-5 cross-ref |
| Git commit 메시지 규약 (`[tokens] ...`) | 운영 규칙, M9 외 |
| 디자이너 ↔ 하네스 인터페이스 자동화 (Figma API 연동) | 미래 이슈, M9 외 |
| CLAUDE.md §2-4 Decision Log 문구 업데이트 | M13 헌법 재작성 |

### 7-6. 다음 단계

**Codex Gate A 진입·통과 완료** (2026-04-22):
- **1차**: 부분 반려 (높음 1 / 중간 3 / 없음 1) → PM 전면 수용 → 회귀 반영 4건(§6-1 규약 단일화·CLAUDE.md §7 해석·reason 입력 게이트·asset draft/미생성 분기)
- **2차**: 통과 (높음 0 / 중간 2 / 낮음 1 / 없음 2) → PM A안 선택 → 중간 2건 문구 정합 반영 (§6-3-3 `_broadcast.log` 이벤트 로그 재정의 · §7-4 CLAUDE.md §7 구체화 관계 명시) → **M9-3 최종 확정**
- 낮음 1건(M6 예외 대칭 표현 보강)은 Codex 권고대로 **M9-4+ 이관**

**M9-3 확정 완료** → **M9-4 착수** 대기.

산출물:
- 설계문서: `_design/M9_deliverable-structure.md` (확정 버전)
- 1차 리뷰: `_design/_codex-gate-a-m9-3-prompt.md` · `_design/_codex-gate-a-m9-3-output.log`
- 2차 리뷰: `_design/_codex-gate-a-m9-3-2-prompt.md` · `_design/_codex-gate-a-m9-3-2-output.log`

---

## 8. M9-4 — 포맷 변환 파이프라인 (스코프 아웃 결정: 2026-04-24)

### 8-1. 스코프 결정

**판정**: M9-4 **전면 스킵**. 실수요 발생 시 M10+ 또는 별도 sub-step 신설에서 재논의.

**원 계획 (2026-04-20 M9 로드맵)**: md→docx/pdf/hwpx 등 포맷 변환 파이프라인 + ID 보존 규칙 정의 (§1-7 "포맷 변환(md→docx) 시 ID 보존 규칙 → M9-4").

**재검토 (2026-04-24 M9-4 브레인스토밍)**:
- PM이 docx/pdf/hwpx를 스코프 밖으로 제외, md→html로 축소 (Q1)
- 그러나 html 소비처 분석 결과 **실수요 없음** 판정:

| 후보 소비처 | 대체 경로 | 판정 |
|------------|----------|------|
| 사내 브라우저 미리보기 | VS Code md 프리뷰 / GitHub 렌더링 / 노션 뷰 | **대체 충분** |
| M9-5 cross-ref 감지 입력 | md 직접 파싱(정규식/파서) | **html 경유 불필요** |
| 노션 프리뷰 | `notion-sync` Skill(기존) | **기존 경로 존재** |
| 외부 공유 | M9-4 스코프 밖 제외(Q1) | — |

**결정 근거**:
1. **YAGNI** — 실수요 없는 파이프라인은 현 시점 부채화
2. **대체 경로 전방위 존재** — 미리보기·cross-ref 모두 md 직접 처리로 해결
3. **미래 확장성 훼손 없음** — md canonical 정책 자체가 모든 미래 포맷에 열려 있음
4. **M9-5 선결 조건 아님** — cross-ref 감지는 md 직접 파싱으로 구현. M9-4 우회해도 무방. 단 html 앵커 부재로 **브라우저 기반 시각 감지 · 앵커 기반 deep-link · DOM 트리 순회 같은 html 의존 기능은 M9-5 비스코프**이며, PM이 이 제약을 인지·수용함 (2026-05-04 Gate A 1차 리뷰 반영)
5. **원 로드맵 전제 소멸** — docx/pdf/hwpx 스코프 축소 시점에 M9-4의 원 동인 소멸

### 8-2. 포맷 변환 시 원칙 (미래 실수요 대비 명문화)

실수요 발생 시 즉흥 대응을 피하기 위해 최소 원칙만 명시. 본 3개 원칙은 **M9-4 스킵의 결과물**이며, 미래 어떤 포맷이 실수요로 등장하든 공통 적용된다.

| # | 원칙 |
|---|------|
| **P1** | **md는 canonical(원본), 모든 파생 포맷은 derived**. 편집은 md에만. 파생물 직접 편집 금지 |
| **P2** | **변환 시 M9-1 ID · M9-3 suffix `[vN]` · 상태(`[DEPRECATED]` / `[NOT APPLICABLE]`) 표기 전량 보존 필수**. 보존 기법(앵커·data 속성·메타 파일 등)은 실수요 시 포맷별 재논의, 단 **손실 금지 원칙은 불변** |
| **P3** | **파이프라인 정의는 실수요 발생 시점에 별도 sub-step 또는 M10+에서 재논의**. 본 M9-4에서는 정의하지 않음. **재개 조건**: ① owner 또는 PM이 명시적 실수요(고객 납품 요청·외부 공유 의무·규정 요구 등)를 식별하고 ② **PM이 재개 승인**한 시점에 한해 본 M9-4 스킵 해제. owner 단독 판단으로 재개 금지 — owner는 실수요를 PM에게 보고할 수 있을 뿐, 스킵 해제 권한은 PM 전속 (2026-05-04 Gate A 1차 리뷰 반영) |

### 8-3. 후속 이관

| 항목 | 이관 대상 |
|------|---------|
| md→docx/pdf/hwpx 파이프라인 정의 | 실수요 발생 시 M10+ 또는 별도 sub-step 신설 |
| 포맷 변환 시 ID 보존 세부 기법 | 포맷 선정 후 재논의 |
| M6 예외 대칭 표현 보강 (M9-3 Gate A 2차 낮음 이관분 — 당초 "M9-4+ 이관") | **M13 헌법 재작성**으로 재이관 (M9-4 스킵에 따른 자연 이관) |
| P2 "손실 금지" 원칙의 검증 주체·검증 시점·검증 증거 정의 | **M9-5 cross-ref**에 흡수 (실수요 시 함께 결정. 2026-05-04 Gate A 1차 리뷰 반영) |
| 파생물 저장 위치·재생성 로그·삭제 권한 | **M9-5 cross-ref** 또는 실수요 재개 시점에 함께 결정 (P1 "파생물 직접 편집 금지"의 운영 규칙 연결. 2026-05-04 Gate A 1차 리뷰 반영) |

### 8-4. 다음 단계

- ~~**Codex Gate A 리뷰**: advisory 성격 — 스킵 결정의 타당성과 P1~P3 원칙 누락 여부 점검 (inline prompt 방식, Windows WDAC `0x8009001d` 회피)~~ ✅ **2026-05-04 1차 통과** (§8-5 참조)
- **Gate A 통과 후**: M9-5 cross-ref 착수 가능

**산출물**:
- 설계문서: `_design/M9_deliverable-structure.md` (본 §8 추가 버전 + §8-5 보강)
- Codex Gate A 1차: `_design/_codex-gate-a-m9-4-prompt.md` · `_design/_codex-gate-a-m9-4-output.log`

### 8-5. Codex Gate A 1차 리뷰 대응 (2026-05-04)

**판정**: **통과** (높음 0 / 중간 2 / 낮음 2 / 없음 3). 스킵 결정 자체 반려 근거 없음. 중간 2건 §8 본문 보강, 낮음 2건 §8-3 후속 이관 표 추가로 처리. **PM "옵션 a 전건 수용" 결정.**

| # | 심각도 | 발견 | 처리 |
|---|--------|------|------|
| 1 | 중간 | M9-5가 HTML 앵커·브라우저 기반 시각 감지 없이 md 직접 파싱만으로 진행된다는 제약 수용이 §8-1에 충분히 명시되어 있지 않음 | **수용** — §8-1 결정근거 4 보강 (브라우저 기반 시각 감지·앵커 deep-link·DOM 순회는 M9-5 비스코프, PM 인지·수용 명문화) |
| 2 | 중간 | "실수요 발생 시 재논의"의 재개 조건과 승인 주체가 비어 있어 향후 docx/pdf/hwpx 또는 외부 공유 요청 발생 시 M9-4 스킵 범위가 다시 흔들릴 수 있음 | **수용** — §8-2 P3 보강 (재개 조건 ①실수요 식별 ②PM 승인 2단계, owner 단독 재개 금지 명문화) |
| 3 | 낮음 | P2 "손실 금지" 원칙은 타당하나 검증 주체·시점·증거 정의 연결 문장 부재 | **M9-5 이관** — §8-3 후속 이관 표에 "P2 손실 금지 검증 주체·시점·증거 → M9-5 cross-ref" 행 추가 |
| 4 | 낮음 | 파생물 저장 위치·재생성 로그·삭제 권한은 미래 실수요 재개 시 함께 결정할 항목 | **M9-5 이관** — §8-3 후속 이관 표에 "파생물 저장 위치·재생성 로그·삭제 권한 → M9-5 또는 실수요 재개 시점" 행 추가 |
| 5~7 | 없음 | 스킵 결정 5근거 정합 / 선행 M(M1·M2-5·M2-6·M6) 무충돌 / §1-7 표기 패턴 정합 + I14 강화 무충돌 | **수용(조치 불필요)** — 통과 추인으로 해석 |

**Codex 총평**: "높음 없음, 중간 2건으로 스킵 결정 자체는 유지 가능하며 두 중간 사항은 §8에 한두 문장 보강하면 M9-5 착수 리스크가 낮아진다."

**2차 리뷰 판단**: 본 보강은 모두 **본문 한두 문장 추가** 범위로 구조 변경 없음. M9-2 1차→2차 패턴(높음 발견 후 근본 회귀)과 다름. 2차 리뷰 추가 호출 **불필요** — M9-4 확정 처리.

### 8-6. 최종 상태

**M9-4 확정 완료** (2026-05-04). M9-5 cross-ref 착수 가능.

**확정 산출물**:
- 설계문서: `_design/M9_deliverable-structure.md` §8 (본 보강 버전)
- 1차 리뷰: `_design/_codex-gate-a-m9-4-prompt.md` · `_design/_codex-gate-a-m9-4-output.log`

---

## 9. M9-5 — Cross-ref 검증 (확정: 2026-05-04)

**스코프**: REQ↔TR/S/P 매핑 일관성 검증·관측. M9-2/M9-3 누적 이관 6건 중 그룹 X(즉시 필요) 4건을 본 sub-step에서 흡수, 그룹 Y(파생물 종속) 2건은 실수요 활성화 시 정의로 명시적 보존.

| sub-step | 주제 | 상태 |
|----------|------|------|
| M9-5-0 | 검증 모델 (prerequisite) | ✅ 2026-05-04 확정 |
| M9-5-a | 형식 위반 검증 (정적 형식 검증: grep + parser) | ✅ 2026-05-04 확정 |
| M9-5-b | 매핑 통합 검증 (그래프 순회) | ✅ 2026-05-04 확정 |
| M9-5-c | NA 판정 검증 (자동 1차 + 인간 2차) | ✅ 2026-05-04 확정 |

### 9-0. 검증 모델 (prerequisite)

M9-5-a/b/c가 공통 재사용하는 등급 체계·트리거·기록·owner 모델.

#### 9-0-1. 검증 등급 체계 (3단계)

| 등급 | 의미 | 처리 정책 |
|------|------|----------|
| **error** | 매핑 모호성·SSoT 깨짐·모순 직접 발생. 후행 작업 차단 필요 | **blocking** + 팀장 broadcast (M3·M4-2 채널) |
| **warning** | 추적 정보 손실·인지 필요. 작업 진행 가능 | 팀장 broadcast (비강제) |
| **info** | 이력·관측·메타. 즉시 작업 영향 없음 | `_broadcast.log` log only (broadcast 안 함) |

**Codex 리뷰 4단계(높음/중간/낮음/없음)와 분리** — Codex는 advisory 인간 리뷰, M9-5는 자동 검증. 의미가 다른 두 체계를 같은 어휘로 묶지 않음 (역할 분리).

#### 9-0-2. 트리거 시점 (하이브리드)

- **변경 이벤트 시 즉시 차이 검증** — M9-3-a closed **4종 event(modify/deprecate/exempt/restore)** 발생 시 영향받는 항목 검증. 결함을 발생 직후 발견 → 후행 산출물 오염 차단
- **세션 종료 시 전수 검증** — 모든 매핑 일관성 재확인. M9-3-a closed set 우회한 직접 편집도 catch
- 기존 인프라 재사용: M9-3-a broadcast 채널 + 권고 3-c-3 세션 종료 시점 둘 다 이미 확정. 신규 메커니즘 0건

#### 9-0-2-1. 변경 이벤트 시 impact set 정의 (2026-05-04 1차 리뷰 반영)

"영향받는 항목" = 단순 인접 엣지만이 아니다. 삭제·rename·상태변경 시 과거 매핑·orphan 전이 누락 위험.

**impact set** = 다음을 모두 포함:
1. **old 노드** (변경 전 ID·상태)
2. **new 노드** (변경 후 ID·상태)
3. **두 노드의 reverse index** — 들어오는 엣지의 출처 모두 (예: REQ-001 deprecated 시 REQ-001을 참조하던 모든 TR/S/P 노드)
4. **과거 incident edge** — 변경 이전에 두 노드와 연결돼 있던 엣지 (rename 시 과거 ID가 갖던 엣지 포함)

**bulk 변경**(여러 노드 동시 변경)의 경우 **개별 impact set의 합집합**으로 처리한다 (2026-05-04 3차 리뷰 advisory 반영).

이로써 deprecated 전이 시 stale 참조(M-d) / dangling(M-c) / orphan(M-a/M-b) / NA 정렬(M-e)이 즉시 검출.

#### 9-0-3. 결과 기록 위치

**`_broadcast.log` 단일** (M9-3 인프라 재사용, 신규 파일 0건).

- error/warning/info 모두 `_broadcast.log`에 기록 (등급 필드 포함)
- error/warning은 추가로 팀장 broadcast 발행
- 등급별 필터·통계는 log grep으로 처리 (M12 관측성 단계에서 일괄 구현)

#### 9-0-4. owner

| 역할 | 주체 |
|------|------|
| **검출** | 자동 deterministic 로직 (정적 형식 검증 / 파서 / 매핑 그래프 순회 / 휴리스틱) |
| **broadcast 발행** | 팀장 (M3 정합 — Teammate broadcast 금지) |
| **자동 실행 주체** | 팀장 (broadcast 처리 시점 + 세션 정리 시점) |
| **인간 판단 응답** (M9-5-c 한정) | 영역 owner 1차 + 무응답 2턴 = M4-2 E5 → 팀장 → PM 회부 |

**PM 회부의 경로 명시** (2026-05-04 1차 리뷰 반영): NA 무응답 2턴 시 PM 회부는 **신규 trigger 신설 아님**. 다음 두 경로 중 하나만 사용:
- **M4-3-2 T1 "팀장 판단 불가"** hard trigger 발동 (기존 closed set 안)
- 또는 **세션 종료 시 팀장 보고**(권고 3-c-3 패턴)에 무응답 NA 누적 보고로 PM 응답 받음

closed trigger set 외부로의 신규 push 경로 신설 금지.

#### 9-0-5. error blocking의 Task 상태 효과 (2026-05-04 1차 리뷰 반영)

M9-5 error 등급 검출 시 영향받는 deliverable에 대한 효과:

| 항목 | 효과 |
|------|------|
| **M2-5 Task evidence 완료 승인** | **차단** (error 해소 전까지 evidence 미승인) |
| **M2-6 Gate B 진입** | **차단** (산출물 게이트 진입 불가) |
| **M2-3 remediation Task** (error 해결 작업) | `in_progress` **허용** — error 해소 자체는 작업 진행 가능 |
| **clean M9-5 결과** | 영향 deliverable의 **evidence에 포함** (검증 통과 증빙) |

**warning은 차단 효과 없음** — broadcast 인지 후 작업 진행 가능. **info는 영향 없음** (log only).

**범위**: blocking은 **error 검출이 직접 가리키는 deliverable**에 한정. 다른 deliverable의 작업 흐름은 영향 없음 (Mesh 병목 회피).

**매핑 위반 시 차단 대상 매핑** (2026-05-04 2차 리뷰 반영):

| 패턴 | 차단 대상 | 근거 |
|------|----------|------|
| **M-b** orphan 후행 | **후행(TR/S/P) deliverable** (출처 불명 항목을 가진 측) | 후행이 어떤 REQ를 다루는지 불명 → 후행이 책임 |
| **M-c** dangling reference | **참조 source deliverable** (없는 ID를 참조하는 측) | 깨진 매핑은 참조 발행 측이 정정해야 함 |
| **M-e** NA → active 참조 | **참조 source deliverable** (active 후행) | NA 표기 측은 정상, 참조 측이 잘못됨 |
| **M-f** 양방향 set 불일치 | **양쪽** deliverable | 매핑 SSoT가 양방향 모두에 존재, 누락 측을 특정 못 함 → 양쪽 차단 후 정정 |
| **F-1·F-2·F-3·F-5·F-8** 형식 위반 | **위반 항목이 속한 deliverable** | 위반 항목 owner 측이 형식 책임 |

### 9-1. M9-5-a — 형식 위반 검증 (정적 형식 검증: grep + parser)

**검증 대상**: 정적 형식 검증으로 결정 가능한 7개 카테고리. 대부분 grep 단독으로 가능하나 **F-3은 parser+카운팅 필요** (2026-05-04 1차 리뷰 반영).

| # | 카테고리 | 등급 | 출처 |
|---|---------|------|------|
| 1 | 항목 헤더 패턴 (`^## (REQ\|TR\|S\|P)-[0-9]+`) | **error** | M9-2-a, §3-3 I7 |
| 2 | HTML 주석 매핑 형식 (`<!-- ... → REQ-XXX -->`) | **error** | M9-2-e, §1-2-2 |
| 3 | ID 발급 규칙 (영역별 순차·재사용 금지·중복 금지) | **error** | §1-2-2 |
| 4 | suffix `[vN]` 표기 | warning | M9-3-d |
| 5 | 상태 suffix (`[DEPRECATED]` / `[NOT APPLICABLE]`) | **error** | M9-3-0 |
| 6 | frontmatter 형식 (skeleton/active) | warning | M9-3-0 |
| 7 | `_broadcast.log` 6필드 형식 | info | M9-3-d |

**8 — `[NOT APPLICABLE]` 사유 텍스트 누락** (M9-5-c 시나리오 1 흡수): error / `[NOT APPLICABLE]` 직후 라인이 비어있거나 공백 only면 위반.

**검증기 동작**:
1. 각 카테고리별 grep 패턴 실행 (변경 이벤트 시 = 영향 파일만 / 세션 종료 시 = 전수)
2. 매칭 시 등급 매트릭스(9-0-1) 발동
3. `_broadcast.log` 기록 + 등급별 broadcast (9-0-3)

**예외 처리**: 항목 인라인 suppress
```html
<!-- @suppress: pattern-N -->
```
- 검증기는 직전 행 체크로 skip
- HTML 주석이라 정상 렌더 시 invisible
- **error 카테고리(1·2·3·5·8)는 suppress 금지** — 매핑 무결성·상태 인지·NA 사유는 사고 방지가 우선

### 9-2. M9-5-b — 매핑 통합 검증 (그래프 순회)

**검증 대상**: 매핑 그래프 위에서 6개 패턴.

**그래프 빌드**:
- 노드: 항목 헤더 (`REQ-NNN`, `TR-NNN`, `S-NNN`, `P-NNN`)
- 엣지: 헤더 직후 HTML 주석의 `→ REQ-XXX` 참조
- SSoT: 각 영역 헤더 주석 (§3-3 I1)

| 패턴 | 의미 | 등급 |
|------|------|------|
| **a** orphan REQ | REQ-NNN을 어떤 후행도 참조 안 함 (의도적 backlog 가능성) | warning |
| **b** orphan 후행 | TR/S/P-NNN이 REQ 참조 없음 (출처 불명) | **error** |
| **c** dangling reference | 참조한 REQ-NNN 헤더 부재 (rename 후 미정리) | **error** |
| **d** deprecated → active 참조 | active 후행이 deprecated REQ 참조 (stale) | warning |
| **e** NA → active 참조 | active 후행이 NA REQ 참조 (의미 모순) | **error** |
| **f** 양방향 set 불일치 | REQ→후행 set과 후행→REQ set 일치 안 함 (단방향 누락) | **error** |

**검증기 동작**:
1. 변경 이벤트 시 = **§9-0-2-1 impact set**(old 노드 + new 노드 + 두 노드 reverse index + 과거 incident edge)에 대해 부분 재검증 / 세션 종료 시 = 전체 그래프 빌드 + a~f 전수 (2026-05-04 2차 리뷰 반영: "인접 엣지만" 단어 폐기, impact set 정의로 통일)
2. 단일 그래프 순회로 6패턴 모두 검출 (orphan = 진입 차수 0 / dangling = 엣지 타겟 노드 부재 / 양방향 = 두 방향 set diff)
3. 등급 매트릭스 발동 → `_broadcast.log` + 팀장 broadcast

**예외 처리**: M9-5-a와 동일 인라인 suppress, error(b·c·e·f) 금지. warning(a·d) 항목 인라인 suppress 활용 (의도적 backlog REQ, 정리 미완료 deprecated 참조에 명시).

### 9-3. M9-5-c — NA 판정 검증 (자동 1차 + 인간 2차)

**검증 시나리오**:
- 시나리오 2: 사유 텍스트는 있으나 빈약·모호 ("해당없음", "필요없음") — **자동 휴리스틱**
- 시나리오 3: 사유는 적절해 보이나 NA 판정 자체가 부적절 — **인간 판단**
- 시나리오 1(사유 누락) = M9-5-a 카테고리 8로 흡수
- 시나리오 4(NA → active 참조) = M9-5-b 패턴 e

**자동 휴리스틱 카테고리** (3건):

| # | 휴리스틱 | 검출 방식 | 등급 |
|---|---------|----------|------|
| H1 | 사유 길이 임계 (예: 20자 미만) | 문자 카운트 | warning |
| H2 | 금지 키워드 ("해당없음", "필요없음", "N/A", "TBD", "skip" 등) | 정규식 매치 | warning |
| H5 | **NA 표기 변경 트리거** — M9-3-a **E-exempt** event 발생 시(항목 상태가 NA로 바뀌는 모든 경로) 자동 휴리스틱 재실행 + 인간 판단 회부 | 변경 이벤트 hook (closed 4종 안) | warning |

**H5 재정의 근거** (2026-05-04 1차 리뷰 반영): `E-create + status=NA`는 M9-3-a closed 4종 event(modify/deprecate/exempt/restore)를 위반. NA 상태로의 모든 전이는 정의상 **E-exempt** 이벤트이므로 H5는 E-exempt 트리거로 재정의. 새 항목이 처음부터 NA로 추가되는 경우도 항목 신설 후 exempt 처리 = E-exempt 이벤트.

**인간 판단 트리거 owner**:
1. 휴리스틱 매치 시 팀장 broadcast → **영역 owner**(NA 표기 주체) "적절성 확인" 응답 요청
2. 영역 owner 응답: "적절" 통과 / "부적절" → 표기 제거 → M9-3-a E-modify 자동 처리
3. 무응답 2턴 = **M4-2 E5** trigger → 팀장 broadcast → **PM 회부** (closed trigger set 안에서만)

**PM 회부 경로** (2026-05-04 1차 리뷰 반영): §9-0-4 PM 회부 경로 명시 참조. 신규 trigger 신설 아님 — **M4-3-2 T1 "팀장 판단 불가"** 또는 **세션 종료 시 팀장 보고**(권고 3-c-3) 둘 중 하나만 사용.

**인간 판단 결과 처리**:
- "적절" → 다음 검증 시 silent (재트리거 없음)
- "부적절" → 표기 제거 → 변경 이벤트로 자동 처리. 재검증 불필요
- 무응답 2턴 → PM 회부 (action 결정 PM 권한)

**임계값 잠정**:
- H1 길이 임계 = **20자** (구현 시 운영 기반 재조정 가능)
- H2 금지 키워드 = 7개 초기 (운영 시 추가)

### 9-4. 통합 카탈로그 (단일 SSoT)

M9-5-a/b/c가 모두 본 §9-4에 통합 카탈로그로 모임 (단일 SSoT, I15). 운영자가 "어떤 위반들이 검증되는가"를 한 곳에서 확인. (2026-05-04 2차 리뷰 반영: §9-7 오참조 정정)

#### 9-4-1. 정적 형식 검증 카탈로그 (M9-5-a) — grep + parser

| ID | 카테고리 | 검증 방식 | 등급 |
|----|---------|----------|------|
| F-1 | 항목 헤더 | grep `^## (REQ\|TR\|S\|P)-[0-9]{3}` | error |
| F-2 | 매핑 주석 | grep `<!--[^-]*?(→\|->)\s*(REQ\|TR\|S\|P)-[0-9]{3}` | error |
| F-3 | ID 발급 (중복·재사용·결번) | **parser + 카운팅** — 영역 내 NNN 전수 추출 → 정렬 → 중복/재사용/결번 검증 (grep 단독 불가, 2026-05-04 1차 리뷰 반영) | error |
| F-4 | version suffix | grep `\[v[0-9]+\]` | warning |
| F-5 | 상태 suffix | grep `\[(DEPRECATED\|NOT APPLICABLE)\]` | error |
| F-6 | frontmatter | grep `^status:\s*(skeleton\|active)` | warning |
| F-7 | broadcast log | parser (8필드 행 형식 검증 — type/timestamp/owner/target/항목ID/result/사유/evidence_ref). **분기 규칙** (2026-05-04 3차 리뷰 반영, M9-3 broadcast 6필드 backward compat): **type=`broadcast`**(M9-3 변경 이벤트) = legacy 6필드 entry 허용 + 누락 필드 자동 매핑(target=broadcast 대상 / result=`confirmed` / evidence_ref=null) / **type=`self-check`**(M11 자가 점검) = 8필드 강제 (모든 필드 필수). 2026-05-04 신규 entry는 type 명시 강제, 그 이전 legacy entry는 type 미명시 시 `broadcast`로 간주. **신규 entry type 누락 시** = **F-7 format violation 판정** (info 등급 검출), **자동 broadcast 매핑 금지** (2026-05-04 4차 리뷰 반영 — parser 계약 완결) | info |
| F-8 | NA 사유 누락 | grep + 인접 라인 검사 `\[NOT APPLICABLE\]\s*\n\s*\n` **+ P영역의 README NA list 파싱** (2026-05-04 1차 리뷰 반영) | error |

**P영역 README NA SSoT 예외 처리** (2026-05-04 1차 리뷰 반영): P영역 `[NOT APPLICABLE]`은 §3-3 I5 예외로 README 한정 SSoT (HTML 파일 부재). 따라서 F-8(NA 사유 누락)과 M-e(NA→active 참조) 그래프 빌드 입력에 **README의 NA 섹션 list 파싱이 포함**된다. P영역 NA 항목은 HTML 파일이 없으므로 README NA 섹션이 입력 단일 소스.

**구체 정규식·파서 사양은 구현 시 정련** — 본 표는 카탈로그 entrypoint.

#### 9-4-2. 매핑 그래프 패턴 (M9-5-b)

| ID | 패턴 | 검출 | 등급 |
|----|------|------|------|
| M-a | orphan REQ | 진입 차수 0 (REQ → x) | warning |
| M-b | orphan 후행 | 진출 차수 0 (TR/S/P → REQ 참조 없음) | error |
| M-c | dangling reference | 엣지 타겟 노드 부재 | error |
| M-d | deprecated 참조 | active source → status=deprecated target | warning |
| M-e | NA → active 참조 | active source → status=NA target | error |
| M-f | 양방향 불일치 | REQ→후행 set ≠ 후행→REQ set | error |

#### 9-4-3. 휴리스틱 카탈로그 (M9-5-c)

| ID | 휴리스틱 | 임계 | 등급 |
|----|---------|------|------|
| H-1 | 사유 길이 임계 | < 20자 | warning |
| H-2 | 금지 키워드 | regex (해당없음\|필요없음\|N/A\|TBD\|skip\|없음\|미해당) | warning |
| H-5 | NA 표기 변경 트리거 | M9-3-a **E-exempt** event (항목 상태가 NA로 바뀌는 모든 경로) | warning |

### 9-5. 불변식 (I15~I20 신설, I1~I14 불변 전제)

| ID | 불변식 |
|----|-------|
| **I15** | M9-5-a/b/c는 §9-4 통합 카탈로그를 단일 SSoT로 한다. 신규 카테고리 추가는 §9-4의 표 행 추가로만 이뤄진다 |
| **I16** | error 등급 위반은 후행 작업 차단(blocking)을 발동한다. 항목 인라인 suppress는 error에 적용 불가 |
| **I17** | M9-5 검증 결과는 모두 `_broadcast.log`에 기록된다. error/warning만 추가로 팀장 broadcast 발행한다 (info는 log only) |
| **I18** | M9-5 검증 트리거는 변경 이벤트(M9-3-a closed 4종) + 세션 종료 시점만 사용한다. 별도 트리거 신설 금지 |
| **I19** | NA 판정의 자동 휴리스틱 결과는 인간 판단(영역 owner 1차) 회부를 트리거하되, 강제 결정 권한이 없다. 결정은 영역 owner / 무응답 시 PM에 위임 |
| **I20** | M9-5의 owner는 자동 검출(deterministic 로직) + 팀장 broadcast 발행으로 분리된다. Teammate가 직접 broadcast 발행 금지 (M3 정합) |

### 9-6. 후속 이관

| 항목 | 이관 대상 | 사유 |
|------|---------|------|
| **그룹 Y — P2 손실 금지 검증 주체·시점·증거 정의** | 실수요 활성화 시 정의 (M9-4 P3 게이트 통과 후) | 파생물 부재 시 무쟁점, M9-4 스킵에 따라 dormant |
| **그룹 Y — 파생물 저장 위치·재생성 로그·삭제 권한** | 실수요 활성화 시 정의 | 동상 |
| 휴리스틱 임계값(H1 = 20자, H2 키워드 7개) 정련 | 구현 단계 (운영 1~2개월 기반) | 초기 임계는 잠정, 실측 후 조정 |
| **휴리스틱 임계값 조정 주체·승인 경로 명문화** (2026-05-04 1차 리뷰 낮음 #2) | M10+ 이관 — 운영 1~2개월 후 팀장 제안/PM 승인 등 조정 경로만 명문화 | 임계값 자체는 운영 정련, 조정 절차는 후속 |
| **H1/H2 false positive "적절 통과" 기록·재트리거 방지 메커니즘** (2026-05-04 1차 리뷰 낮음 #1, 2차 리뷰 재지적 후 M10+ 확정) | **M10+ 이관** — 구현 시 `_broadcast.log` resolved marker 또는 항목 인라인 suppress 둘 중 하나로 채택, 임계값 조정 절차와 함께 명문화 | 2차 리뷰 Codex 권고 = M10+ 이관. 1차 PM (b)안 후속 처리 결정에 정합 |
| 카탈로그 신규 카테고리 추가 메커니즘 | M13 헌법 재작성 또는 운영 합의 | YAGNI — 현재 7+6+3=16건으로 시작 |
| 등급별 통계·관측 (`/status` 집계) | M12 관측성 | 검증 정의(M9-5)와 관측 구현(M12) 분리 |
| `_broadcast.log` 형식 위반(F-7) info 처리의 실 사용처 검증 | M12 운영 시 재평가 | info 등급의 첫 사용처, 실효성은 운영 후 판단 |

### 9-7. 1차 리뷰 보강 완료 스냅샷 (2026-05-04, 2차 리뷰 진입 직전)

**M9-5 1차 리뷰 보강 완료** (2026-05-04). 2차 Codex Gate A 리뷰 진행 중.

**확정 산출물**:
- 설계문서: `_design/M9_deliverable-structure.md` §9 (1차 리뷰 (b)안 보강 버전)
- 통합 카탈로그: §9-4 (16개 검증 entrypoint, F-3 parser·F-8 README 파싱 추가)
- 불변식 신설: I15~I20 (I1~I14 불변)
- 후속 이관: 그룹 Y 2건(실수요 시) + 운영 정련 5건 + 1차 리뷰 낮음 2건

### 9-8. Codex Gate A 1차 리뷰 대응 (2026-05-04)

**판정**: **부분 반려** (높음 1 / 중간 5 / 낮음 2 / 없음 1). PM "옵션 (b) 높음+중간 6건 §9 보강 / 낮음 2건 §9-6 이관만 / 2차 리뷰" 결정.

| # | 심각도 | 발견 | 처리 |
|---|--------|------|------|
| 1 | 높음 | H5 `E-create + status=NA`가 M9-3 closed 4종 event(modify/deprecate/exempt/restore) 외 신규 event 가정 → I18 위반 | **수용** — §9-3 H5 정의를 **E-exempt 트리거**로 재정의. 새 NA 항목도 항목 신설 후 exempt 처리 = E-exempt 이벤트로 흡수. closed set 안에서 운영 |
| 2 | 중간 | 변경 이벤트 시 "인접 엣지만" 재검증으로 삭제·rename·상태변경의 과거 incoming edge·dangling·orphan 전이 누락 위험 | **수용** — §9-0-2-1 신설. impact set = old 노드 + new 노드 + 두 노드 reverse index + 과거 incident edge 명시 |
| 3 | 중간 | NA 인간 판단 PM 회부가 M4-3-2 T1/T2/T3 closed set 어디 매핑인지 불명 | **수용** — §9-0-4 PM 회부 경로 명시 신설. M4-3-2 T1 "팀장 판단 불가" 또는 세션 종료 시 팀장 보고(권고 3-c-3) 둘만 사용. 신규 trigger 신설 금지 |
| 4 | 중간 | P영역 README NA SSoT 예외가 §9-4 카탈로그·그래프 입력에 명시 누락 | **수용** — §9-4-1 F-8 검증 방식에 README NA list 파싱 추가, P영역 NA SSoT 예외 처리 단락 신설 |
| 5 | 중간 | F-3 ID 발급 규칙은 grep 단독 불가 (카운팅·정렬 필요)인데 grep 카탈로그로 분류 | **수용** — §9-1 헤더 "정적 grep" → "정적 형식 검증 (grep + parser)", §9-4-1 제목 변경, F-3 검증 방식 = parser+카운팅 명시 |
| 6 | 중간 | M9-5 error blocking이 M2-3·M2-5·M2-6에 주는 효과 명시 부재 | **수용** — §9-0-5 신설. M2-5 evidence 완료 차단 / M2-6 Gate B 진입 차단 / remediation in_progress 허용 / clean 결과 evidence 포함 / blocking 범위 = 직접 영향 deliverable 한정 |
| 7 | 낮음 | H1/H2 "적절 통과" 기록 위치 불명 → 반복 warning 가능성 | **§9-6 이관만** — PM (b)안에 따라 §9-3 본문 보강 보류. 운영 정련 시 `_broadcast.log` resolved marker 또는 인라인 suppress 둘 중 채택 |
| 8 | 낮음 | H1/H2 임계값 정련의 조정 주체·승인 경로 명시 부재 | **§9-6 이관만** — M10+ 이관, 팀장 제안/PM 승인 경로 후속 명문화 |
| 9 | 없음 | F-8↔시나리오 1, M-e↔시나리오 4 흡수 관계 정합 | **수용(조치 불필요)** — 통과 추인 |

**수용 6건 / 이관 2건 / 통과 1건**.

### 9-8-1. Codex Gate A 2차 리뷰 대응 (2026-05-04)

**판정**: **부분 반려** (높음 1 / 중간 2 / 낮음 4 / 없음 4). PM "옵션 (a) 전건 수용 + 3차 리뷰" 결정.

| # | 심각도 | 발견 | 처리 |
|---|--------|------|------|
| 1 | 높음 | §9-3 본문 H5는 E-exempt로 정정됐으나 §9-4-3 H-5 행이 여전히 `E-create + status=NA` — 단일 SSoT(I15)에 1차 결함 잔존 | **수용** — §9-4-3 H-5 행 갱신 (E-exempt 트리거로) |
| 2 | 중간 | §9-2 검증기 동작이 "인접 엣지만 재검증"으로 §9-0-2-1 impact set과 충돌 | **수용** — §9-2 검증기 동작 1번을 §9-0-2-1 impact set 참조로 통일 |
| 3 | 중간 | error blocking 범위 "직접 가리키는 deliverable"가 매핑 위반(M-b/M-c/M-e/M-f) 시 source/target/양쪽 중 어디인지 불명 | **수용** — §9-0-5에 매핑 위반 차단 대상 매트릭스 추가 (M-b 후행 / M-c source / M-e source / M-f 양쪽 / 형식위반 항목 owner) |
| 4 | 낮음 | §9 상단 sub-step 표 "정적 grep" 라벨 잔존 | **수용** — 표 라벨 변경 |
| 5 | 낮음 | §9-4 도입문 "§9-7" 잘못된 참조 | **수용** — §9-4 자체 참조로 정정 |
| 6 | 낮음 | §9-7·§9-9 "최종 상태" 제목 중복 | **수용** — §9-7 "1차 보강 스냅샷", §9-9 "최종 확정 (3차 통과 후)"로 차별화 |
| 7 | 낮음 | H1/H2 "적절 통과" silent 처리 메커니즘 미정 → 반복 warning 위험 | **수용** — §9-6 표 행을 운영 정련에서 **M10+ 이관**으로 변경 (Codex 권고 채택) |
| 8~11 | 없음 | PM 회부 경로 / README NA P한정 / §9-0-2-1 번호 / 임계값 조정 M10+ | **수용(조치 불필요)** — 통과 추인 |

**수용 7건 / 통과 4건**.

**3차 리뷰 진입**: PM 결정 (a)안에 따라 7건 전건 갱신 후 3차 advisory 리뷰 호출.

### 9-8-2. Codex Gate A 3차 리뷰 대응 (2026-05-04)

**판정**: **통과** (없음 3 / 낮음 1). 2차 부분 반려 7건 전부 정합 반영 확인.

| # | 심각도 | 발견 | 처리 |
|---|--------|------|------|
| 1~3 | 없음 | 축1·축2·축3 모두 통과 추인 | 통과 |
| 4 | 낮음 | bulk 변경 시 impact set 합집합 처리 한 줄 보강 권고 (확정 결함 아님) | **수용** — §9-0-2-1에 한 줄 추가 |

**Codex 총평**: "M9-5는 확정으로 진행 가능한 수준. 잔여 사항은 구현 단계 advisory 보강."

PM "권장 패키지 (α) + (2)" 결정 → 한 줄 보강 후 M9-5 확정 + 가속안 (2) 진입.

### 9-9. M9-5 최종 확정 (2026-05-04)

**M9-5 확정 완료**. Codex Gate A 1차(부분 반려) → 2차(부분 반려) → 3차(통과). PM (b)안·(a)안 경로로 핵심 결함 해소.

**확정 산출물**:
- 설계문서: `_design/M9_deliverable-structure.md` §9 전체 (9-0/9-1/9-2/9-3/9-4 통합 카탈로그/9-5 불변식 I15~I20/9-6 후속 이관/9-7 1차 보강 스냅샷/9-8 1차 대응/9-8-1 2차 대응/9-8-2 3차 대응/9-9 최종 확정)
- 통합 카탈로그: §9-4 (16 entrypoint, F-3 parser·F-8 README 파싱·H-5 E-exempt)
- 불변식: I15~I20 (I1~I14 불변)
- 리뷰 산출물: 1차 prompt+output / 2차 prompt+output / 3차 output (3 round 리뷰 이력)
- 후속 이관: 그룹 Y 2건(실수요 시) + 운영 정련 2건 + M10+ 이관 2건

**다음 단계**: PM "권장 패키지" 결정에 따라 **가속안 (2) — M10~M12 압축 통합 brainstorming + M13/구현 병행** 진입.

---

## 10. M10·M11·M12 통합 — 가속안 (2) 압축 결정 (2026-05-04)

**스코프**: PM 가속안 (2) 합의 후 통합 brainstorming. 옵션 β 채택 — **M11만 v1 결정** / M10·M12는 **§9-4 P3 패턴**(실수요 시 PM 승인 게이트) 적용.

### 10-0. 옵션 β 채택 근거

| M | v1 결정 여부 | 근거 |
|---|------------|------|
| M10 ID 변경 마이그레이션 | **§9-4 P3 패턴** (v1 비스코프) | 영역·체계 메타 변경은 5명 teammate 안정 구조에서 v1 운영 시 발생 가능성 거의 0. §1-2-2(항목 단위 ID 발급)로 일상 운영 충분 |
| M11 자가 점검·품질 게이트 | **v1 결정** | 게이트 없으면 결함 운영 진입. R 모델 라운드 폐기 후 Mesh 게이트 미정 → v1 직접 영향 |
| M12 관측성·디버깅 | **§9-4 P3 패턴** (v1 비스코프) | `_broadcast.log` + STATE.md + 권고 3 메트릭 + `/status` Skill 인프라 누적. v1 추가 결정 가치 낮음 |

### 10-1. M10 — §9-4 P3 패턴 적용 (v1 비스코프)

**판정**: M10 **전면 보류**. 실수요 발생 시 PM 승인 후 별도 sub-step에서 정의.

**원칙 (M9-4 P3 미러)**:
- v1에서 정의 안 함
- 발생 시 owner 또는 PM이 **명시적 실수요(영역 추가 결정·ID 체계 한계 도달 등) 식별** + **PM 재개 승인** 후 sub-step 신설
- owner 단독 마이그레이션 금지

**M10 보류 이슈 카탈로그** (회귀 시점 참고용):

| ID | 잠재 이슈 | 발동 시나리오 |
|----|---------|-------------|
| M10-I1 | 네임스페이스 추가 시 §1-2 M:N 매핑 확장 모델 미정 | 신규 영역(예: D=디자인) 추가 시 REQ↔TR/S/P/D M:N 일관성 |
| M10-I2 | 영역 분할 시 기존 ID 체계 충돌 | TR을 TR_BACKEND/TR_FRONTEND로 분할 시 TR-NNN 어느 분할로 |
| M10-I3 | 일괄 ID shift vs §1-2-2 "재사용 금지" 충돌 | REQ-001~099 → 101~199 shift 시 결번·재사용 정책 |
| M10-I4 | ID 체계 확장 시 §9-4 카탈로그(F-1·F-2·F-5) 정규식 일괄 갱신 절차 | NNN→NNNN 확장 시 grep 패턴 마이그레이션·기존 산출물 일괄 정정 |

### 10-2. M11 — 자가 점검·품질 게이트 (v1 확정)

**판정**: **β 산출물 게이트형 채택**. owner가 산출물의 품질을 자기 확인하는 1차 게이트. M2-6 Gate B 진입 직전에 1회 발동, M9-5 자동 검증과 분리(자동 vs owner 판단), Codex advisory와도 분리.

#### 10-2-1. 자가 점검 모델 (3 차원)

| 차원 | 결정 |
|------|------|
| **A 발동 시점** | 산출물 owner가 "산출물 완성"으로 판단 후 **M2-6 Gate B 진입 신청 직전** 1회 |
| **B 점검 형식** | **§9-4 owner 영역 자동 도출** + **범용 체크 5개** |
| **C 결과 처리** | 등급별 분기 (아래 표) |

#### 10-2-2. 점검 항목 카탈로그

**Part 1 — owner 영역 자동 도출 (§9-4 카탈로그 기반)**:

각 owner는 §9-4의 자기 영역에 해당하는 entrypoint를 자동 점검 항목으로 도출. 별도 카탈로그 신설 안 함.

| owner | 자동 도출 항목 |
|-------|--------------|
| **기획자** (REQ owner) | F-1·F-2·F-3·F-4·F-5·F-6·F-8 (REQ 한정) + M-a (REQ orphan) + M-d (REQ deprecated 참조) |
| **기술검토자** (TR owner) | F-1·F-2·F-3·F-4·F-5·F-6·F-8 (TR 한정) + M-b·M-c·M-e (TR 출처·끊김·NA 모순) |
| **UX설계자** (S owner) | F-1·F-2·F-3·F-4·F-5·F-6·F-8 (S 한정) + M-b·M-c·M-e (S 출처·끊김·NA 모순) |
| **퍼블리셔** (P owner) | F-1·F-2·F-3·F-4·F-5·F-6·F-8 (P 한정) + M-b·M-c·M-e (P 출처·끊김·NA 모순) + README NA SSoT 예외 (§3-3 I5) |
| **전 owner 공통** (2026-05-04 1차 리뷰 반영) | **H-1·H-2·H-5 (NA 휴리스틱)** — 자기 영역의 NA 항목에 대해 모든 owner가 적용. NA 항목이 없으면 N/A |

**Part 2 — 범용 체크 5개 (산출물 유형 무관)**:

| # | 체크 항목 | 검증 방식 |
|---|---------|----------|
| **U-1** | M9-5 자동 검증 통과 — `_broadcast.log`에 영향 deliverable의 error 0건 | 자동 (log grep) |
| **U-2** | Decision Log 변경 사항 반영 — 산출물 변경분의 STATE.md 기록 완료 | 수동 (owner 확인) |
| **U-3** | 후행 영역 owner 통지 — M9-2-c 확정 broadcast 발행 완료. **모든 owner에 적용** — 후행 영역 없는 경우(예: 퍼블리셔 — 최종 산출물) **N/A 명시** (2026-05-04 1차 리뷰 반영) | 수동 (owner 확인) |
| **U-4** | 노션 동기화 대상 결정 — PM 승인 필요 시 확인 (CLAUDE.md §10) | 수동 (owner 확인) |
| **U-5** | evidence 첨부 — Gate B 진입 시 자가 점검 결과 evidence 제출 | 자동 (`_broadcast.log` 자가 점검 기록) |

#### 10-2-3. 결과 처리 매트릭스

| 점검 결과 | 처리 |
|----------|------|
| **전체 통과** (error 0 / warning 0) | `_broadcast.log`에 자가 점검 통과 기록 → **Gate B 진입 허용** |
| **error 항목 존재** (영역별 자동 도출에서 error / U-1 자동 검증 미통과) | 영향 deliverable에 **remediation Task in_progress 신설** (§9-0-5 정합) → **Gate B 차단** |
| **warning만 존재** (영역별 warning / U-2~U-4 수동 미확인 항목) | owner가 명시 기록 후 **통과 가능** — `_broadcast.log`에 **8필드 형식**(아래 단락 참조)으로 type=`self-check` 기록 필수 (2026-05-04 3차 리뷰 반영: 6필드 → 8필드 정합) |
| **U-5 evidence 미첨부** | Gate B 입력 부족 → **Gate B 진입 차단** (자가 점검 자체 미실행) |
| **자가 점검 자체 무응답** — owner가 Gate B 진입 신청 안 함 | **무응답 감지 기준** (2026-05-04 2차·3차 리뷰 반영): 산출물 owner가 명시한 **"산출물 완료 대표 Task"의 M2-5 evidence completed 신호 후 2턴** 내 Gate B 진입 신청 없으면 무응답으로 간주 (M3 broadcast 무응답 2턴 패턴 정합). 다중 Task 산출물의 경우 owner가 산출물 lifecycle 시작 시 대표 Task를 1개 지정. **대표 Task 기록 위치 = STATE.md 산출물 인덱스의 인접 표기**(예: `01-prd.md (대표 Task: T-NNN)`) — 단일 SSoT (2026-05-04 4차 리뷰 반영). **M4-2 E5 무응답 패턴 준용** — 팀장 broadcast → owner 응답 요청 → 추가 2턴 무응답 시 PM 회부 (§9-0-4 PM 회부 경로) |

**`_broadcast.log` 자가 점검 기록 형식 (§9-4 F-7 통합 정합)** — 8필드 (2026-05-04 2차 리뷰 반영, F-7 parser와 통일):

기존 §9-4 F-7 `_broadcast.log` 6필드(broadcast 이벤트용)에 **자가 점검 식별 필드 2개 추가**하여 통합 형식 운영:

| 필드 | 의미 |
|------|------|
| 1. **type** | `broadcast` (변경 이벤트) / `self-check` (자가 점검) — F-7 parser가 자동 분기 |
| 2. timestamp | 시점 |
| 3. owner | 영역 |
| 4. **target** | 영향 deliverable (M11 한정) / broadcast 대상 (변경 이벤트) |
| 5. 위반 항목 ID 또는 broadcast 종류 | F-N / M-x / U-N / H-N (M11) / E-modify·E-deprecate·E-exempt·E-restore (M9-3-a) |
| 6. **result** | `pass` / `warning_only` / `error` (M11 한정) / `confirmed` (broadcast) |
| 7. 사유 또는 broadcast 본문 | 1~3 문장 |
| 8. **evidence_ref** | M11 U-5 evidence 참조 ID (M11 한정) / broadcast 미사용 |

**M11 warning만 통과 시**: 위 8필드에 result=`warning_only`로 기록 + 사유 + 완화책 + Gate B 진입 결정을 사유 필드에 포함 (예: "warning 3건 — 사유: ... / 완화책: ... / Gate B 진입").

**§9-4 F-7 카탈로그 갱신 필요**: 기존 6필드 → 8필드로 확장. type=self-check 분기 명시.

**M9-5/M11 blocking 중첩 시 처리** (2026-05-04 1차 리뷰 반영):
M9-5 자동 검증 error와 M11 자가 점검 error가 동일 deliverable에 중첩 발동 시 **단일 remediation Task로 통합**. 먼저 발동한 blocking이 우선이며, 후행 발동은 동일 Task에 흡수 (Task 신설 중복 방지).

#### 10-2-4. 다른 게이트와의 관계

| 게이트 | 성격 | M11 자가 점검과의 관계 |
|--------|------|---------------------|
| M2-5 Task evidence | Task 단위 증빙 | 자가 점검 결과가 **산출물 완료 Task의 evidence에 자동 포함** (Gate B 직전이라 Task 완료와 결합) |
| M2-6 Gate B | 산출물 게이트 (선택적 승인 + Codex) | **M11은 Gate B 진입 신청 시 항상 강제 적용** (2026-05-04 1차 리뷰 반영). Gate B 자체의 "선택적 승인"(M2-6)은 자가 점검 통과 **이후의** 결정 영역 — 자가 점검은 Gate B 진입 전제 조건으로 강제, Gate B 승인 자체는 선택적 |
| M9-5 자동 검증 | 자동 deterministic | M11은 owner 수동 판단. M9-5 결과(`_broadcast.log` error)는 M11 U-1로 자동 흡수. 양 게이트 blocking 중첩 시 §10-2-3 단일 Task 통합 적용 |
| Codex Gate A·B | advisory | 별개 — Codex는 외부 advisory, M11은 owner 자기 책임 |

#### 10-2-5. 발동 빈도 (Mesh 병목 회피)

- **산출물 단위 1회 (기본 규칙)**: 한 산출물의 lifecycle에서 Gate B 진입 시 1회만 발동
- **변경 이벤트 시 재발동 안 함**: M9-3-a 변경 이벤트는 M9-5 자동 검증이 처리, M11 자가 점검은 산출물 완성 시점만
- **세션 종료 시 재발동 안 함**: M9-5 전수 검증과 다름
- **재발동 예외 #1 — error remediation 회복 경로** (2026-05-04 2차 리뷰 반영, **Gate B 영구 차단 결함 회피**):
  - M11 error 발동 → remediation Task **completed 전이 시점**에 자가 점검 **재발동 자동 허용**
  - 재발동 결과는 §10-2-3 결과 처리 매트릭스 동일 적용 (전체 통과 → Gate B 진입 / 새 error → 새 remediation Task / warning만 → 통과)
  - 1회 규칙의 명시적 예외 — Gate B 회복을 보장하는 핵심 경로
  - **재발동 상한·순환 detection** (2026-05-04 3차 리뷰 반영, 무한 루프 방지):
    - **동일 deliverable + 동일 위반 항목 ID** 조합으로 재발동 **2회 초과** 시 자동 재발동 중단 + **PM 회부** (§9-0-4 PM 회부 경로 — M4-3-2 T1 또는 세션 종료 보고)
    - 횟수는 `_broadcast.log` 8필드 entry에서 `target` + `위반 항목 ID` 조합 카운팅으로 산출
    - 상한 임계(2회) v1 잠정값. 운영 정련은 **M11-I9 후속 이관** (재발동 상한·순환 detection 임계·세부 메커니즘)
- **재발동 예외 #2 — 큰 변경 시 PM 재판단** (2026-05-04 1차 리뷰 반영):
  - M9-3-a impact set이 산출물 전체 항목 **노드(헤더 카운트) 기준 50% 이상**에 영향 미치는 변경 발생 시 **PM이 재판단**하여 M11 재발동 결정 (2026-05-04 2차 리뷰 반영: 분모·분자 = 항목 노드 헤더 카운트 기준 명시)
  - 그 외 변경은 M9-5 자동 검증이 변경분 처리 → M11 재발동 면제
  - 50% 임계 + 노드 카운트 기준은 v1 잠정값, 운영 정련 (M11 후속 이관)

### 10-3. M12 — §9-4 P3 패턴 적용 (v1 비스코프)

**판정**: M12 **전면 보류**. 운영 결과 추가 관측 필요성 발생 시 PM 승인 후 sub-step 신설.

**원칙 (M9-4 P3 미러)**:
- v1에서 추가 관측 정의 안 함
- 기존 누적 인프라(`_broadcast.log` / STATE.md Decision Log / 권고 3 메트릭 / `/status` Skill / TaskList primitive)로 시작
- 운영 1~2개월 후 owner 또는 팀장이 **부족 항목 식별** + **PM 승인** 후 sub-step 신설

**P3 발동 기준 — 객관 지표** (2026-05-04 1차 리뷰 반영, dormant 위험 회피):

다음 중 **하나 이상** 충족 시 M12 P3 게이트 발동 검토:

| 지표 | 임계값 (잠정) | 측정 방식 |
|------|------------|----------|
| **M9-5 검증 실패율** | 전체 검증 트리거 중 **error 발생 비율 5% 이상** 운영 1개월 누적 | `_broadcast.log` grep 집계 |
| **디버깅 시간** | 결함 1건 평균 추적 시간 **30분 초과** 운영 1개월 누적 (메시지 로그 수동 grep 의존도 ↑) | 권고 3 β 패턴 수동 기록 |
| **`_broadcast.log` 비대화** | 단일 파일 크기 **10MB 초과** 또는 라인 수 **5만 초과** | 운영 자동 측정 |
| **PM 디버깅 회부 빈도** | M4-2 E5 무응답 패턴 외 **PM 직접 디버깅 요청 월 3회 이상** | STATE.md Decision Log |

지표 임계값은 v1 잠정값. 운영 후 정련 (M12-I8 후속 이관 — 임계값 조정 주체·승인 경로).

owner 단독 재개 금지 — 지표 충족 시 owner는 PM에게 보고할 수 있을 뿐, 발동 결정은 PM 전속.

**M12 보류 이슈 카탈로그** (회귀 시점 참고용):

| ID | 잠재 이슈 | 발동 시나리오 |
|----|---------|-------------|
| M12-I1 | Teammate↔Teammate SendMessage 자동 기록 메커니즘 부재 | 디버깅 시 메시지 흐름 추적 어려움 (수동 grep 의존) |
| M12-I2 | M9-5 검증 통계(등급별/카테고리별 추세) 부재 | 휴리스틱 임계값(H1·H2) 정련 근거 데이터 부족 |
| M12-I3 | 디버그용 메시지 dump 명령 부재 | 결함 발생 시 즉시 메시지·상태 조회 도구 부재 |
| M12-I4 | `_broadcast.log`·STATE.md 비대화 시 회전·압축 정책 부재 | 운영 1년 후 단일 파일 크기 폭발 시 가독성·성능 저하 |
| M12-I5 | 권고 3 β 메트릭(수동 기록) → 자동 기록(α) 이관 가능성 | primitive 자동 계측 가능성 확인 후 수동→자동 전환 결정 |
| M12-I6 | 노션 동기화 결과 충실도 검증 메커니즘 부재 | `notion-sync` Skill 결과의 누락·오업로드 감지 |
| M12-I7 | M11 자가 점검 결과 통계 누적 메커니즘 (M11 결정 후 재평가) | M11 v1 결정 시 결과 기록 방식과 연동 결정 필요 |
| M12-I8 | M12 P3 발동 지표 임계값 **조정 주체·승인 경로** (2026-05-04 1차 리뷰 반영) | 임계값 자체는 §10-3 본문 SSoT (단일 출처). M12-I8은 **조정 절차만**: **팀장 또는 owner 제안 → PM 승인 전속 → §10-3 본문 sub-step 갱신 반영** (2026-05-04 3차 리뷰 반영) |

### 10-4. 종합 정리 (M10·M11·M12 통합)

#### 10-4-1. 확정 요약표

| M | 결정 | 근거 |
|---|------|------|
| **M10** | §9-4 P3 패턴 (v1 비스코프) | 영역·체계 메타 변경은 v1 발동 가능성 거의 0. §1-2-2 항목 단위 ID 발급으로 일상 운영 충분 |
| **M11** | β 산출물 게이트형 (v1 확정) | M2-6 Gate B 진입 직전 1회 / §9-4 owner 영역 자동 도출 + 범용 5개(U-1~U-5) / error blocking·warning 기록 통과 |
| **M12** | §9-4 P3 패턴 (v1 비스코프) | `_broadcast.log` + STATE.md + 권고 3 메트릭 + `/status` Skill + TaskList primitive 인프라 누적. v1 추가 결정 가치 낮음 |

#### 10-4-2. 불변식 (I21~I24 신설, I1~I20 불변 전제)

| ID | 불변식 |
|----|-------|
| **I21** | M11 자가 점검은 **M2-6 Gate B 진입 직전 1회**만 발동한다. 변경 이벤트 시·세션 종료 시 재발동 금지(M9-5 자동 검증과 분리) |
| **I22** | M11 자가 점검 항목은 **§9-4 카탈로그 owner 영역 자동 도출 + 범용 5개(U-1~U-5)**로 고정한다. owner별 별도 카탈로그 신설 금지 |
| **I23** | M11 결과의 error는 **§9-0-5 blocking 효과와 동일**하게 영향 deliverable의 Gate B 진입을 차단하고 remediation Task를 신설한다. warning은 owner 명시 후 통과 가능 |
| **I24** | M10·M12 보류는 **§9-4 P3 패턴 동일 게이트**(① 실수요 식별 ② PM 승인)에 종속된다. owner 단독 재개 금지 |

#### 10-4-3. 후속 이관

| 항목 | 이관 대상 | 사유 |
|------|---------|------|
| M10 보류 이슈 카탈로그 4건 (M10-I1~I4) | 실수요 활성화 시 sub-step 신설 | 회귀 시점 빠른 컨텍스트 복원용 보존 |
| M12 보류 이슈 카탈로그 7건 (M12-I1~I7) | 운영 1~2개월 후 부족 항목 식별 + PM 승인 후 sub-step | 동상 |
| M11 owner별 자가 점검 운영 학습 (false positive·항목 정련) | M13 헌법 재작성 또는 운영 합의 | v1 카탈로그(§9-4 + U-1~U-5)는 잠정, 실측 후 조정 |
| M11 evidence 형식 표준화 (`_broadcast.log` 자가 점검 기록 form) | 구현 단계 (CLAUDE.md 재작성과 함께) | 형식 자체는 운영 시 정련 |
| **M11-I9 재발동 상한·순환 detection 임계·메커니즘** (2026-05-04 3차 리뷰 반영) | 운영 1~2개월 후 정련 | v1 임계 2회는 잠정. 동일 deliverable+동일 위반 ID 카운팅 외 추가 detection 메커니즘 후속 결정 |
| **type=`self-check` vs H1/H2 silent 처리(§9-6 M10+ 이관) 운영 분리** (2026-05-04 3차 리뷰 반영, 낮음 #5) | 운영 정련 | self-check는 Gate B evidence 기록 한정, H1/H2 silent는 §9-6 M10+ 이관 유지 |
| **50% impact set 기준의 deprecated/NA/skeleton 포함 여부 정의** (2026-05-04 3차 리뷰 반영, 낮음 #7) | 운영 정련 | v1 잠정: 해당 산출물 내 실제 항목 헤더, 상태 무관 포함, skeleton 제외 (운영 후 정련) |
| **재발동 카운팅 윈도우 명시** (2026-05-04 4차 리뷰 반영, 낮음 #1) | 운영 정련 | v1 잠정: "해당 산출물 lifecycle/Gate B 시도 내" 한정 해석. 운영 후 윈도우 정의 명문화 |
| **§10-4-3 후속 이관 표 자체의 정리 체크포인트** (2026-05-04 4차 리뷰 반영, 낮음 #4) | M13 헌법 재작성 시 일괄 정리 | 후속 이관 항목 누적 → M13 단계에서 정리·반영·잔여 이관 분류 |

#### 10-4-4. 다음 단계

- ~~**Codex Gate A 1차 통합 리뷰** (M10 + M11 + M12 묶음 advisory)~~ ✅ **2026-05-04 조건부 통과** (§10-5 참조)
- **2차 리뷰** 진행 중 (PM 옵션 (a) 전건 수용 — 중간 5 + 낮음 3 본문 보강)
- **Gate A 최종 통과 후**: M13 헌법 재작성 + 구현 단계 (CLAUDE.md/에이전트/Skills/Commands) 병행 진입

### 10-5. Codex Gate A 1차 통합 리뷰 대응 (2026-05-04)

**판정**: **조건부 통과** (높음 0 / 중간 5 / 낮음 3 / 없음 3). M11 v1 확정·M10/M12 P3 적용 자체는 정당, 운영 규칙 빈칸 보강 필요. PM "옵션 (a) 전건 수용" 결정.

| # | 심각도 | 발견 | 처리 |
|---|--------|------|------|
| 1 | 중간 | M2-6 Gate B "선택적 승인" vs M11 강제 발동 정합 모호 | **수용** — §10-2-4 M2-6 행에 "M11은 Gate B 진입 신청 시 항상 강제 적용, Gate B 승인 자체는 자가 점검 통과 이후 결정 영역" 명시 |
| 2 | 중간 | H-1·H-2·H-5(NA 휴리스틱)가 기획자(REQ)만 매핑 — 다른 owner의 NA 검증 누락 | **수용** — §10-2-2 Part 1에 "전 owner 공통" 행 신설, H-1·H-2·H-5를 모든 owner의 자기 영역 NA 항목에 적용 |
| 3 | 중간 | warning 통과 시 `_broadcast.log` 기록 형식·필드 미명세 | **수용** — §10-2-3에 **6필드 형식** 명세 (시점/owner/위반항목ID/사유/완화책/Gate B 진입 결정) |
| 4 | 중간 | 자가 점검 자체 무응답(owner가 Gate B 신청 안 함) 처리 부재 | **수용** — §10-2-3 결과 처리 매트릭스에 "M4-2 E5 무응답 패턴 준용 → 팀장 broadcast → 무응답 2턴 시 PM 회부" 추가 |
| 5 | 중간 | M12 P3 발동 기준 "추가 관측 부족"이 owner 주관 — dormant 위험 | **수용** — §10-3에 **객관 지표 4개** 추가 (M9-5 검증 실패율 5% / 디버깅 30분 / `_broadcast.log` 10MB / PM 디버깅 회부 월 3회). 임계값 정련은 M12-I8 신설로 후속 이관 |
| 6 | 낮음 | M9-5/M11 blocking 중첩 시 우선순위 미명시 | **수용** — §10-2-3에 "단일 remediation Task 통합, 먼저 발동한 blocking 우선" 명시 |
| 7 | 낮음 | "산출물 단위 1회" 큰 변경 후 재실행 면제 근거 부재 | **수용** — §10-2-5에 "M9-3-a impact set이 산출물 50% 이상 영향 시 PM 재판단" 면제 예외 추가 (50% 임계는 잠정, 운영 정련) |
| 8 | 낮음 | U-3 후행 통지 적용 범위 불명 | **수용** — §10-2-2 Part 2 U-3에 "모든 owner에 적용, 후행 영역 없는 경우(예: 퍼블리셔) N/A 명시" 추가 |
| 9~11 | 없음 | M10/M12 P3 정합 / I22↔I15 정합 / M12 I7 보류 정합 | **수용(조치 불필요)** — 통과 추인 |

**수용 8건 / 통과 3건**.

**Codex 총평**: "5개 중간 항목을 현 단계 수정하면 Gate B 진입 요건이 충족된다."

### 10-5-1. Codex Gate A 2차 통합 리뷰 대응 (2026-05-04)

**판정**: **부분 반려** (높음 1 / 중간 2 / 낮음 2 / 없음 2). PM "(a) 전건 수용" 결정.

| # | 심각도 | 발견 | 처리 |
|---|--------|------|------|
| 1 | **높음** | M11 error remediation 완료 후 clean evidence로 Gate B 차단 해제 재시도 경로 부재 — "산출물 단위 1회" 규칙과 충돌 → Gate B 영구 차단 결함 | **수용** — §10-2-5에 **재발동 예외 #1** 신설: error 발동 → remediation Task completed 전이 시 자가 점검 자동 재발동. 1회 규칙의 명시적 예외 |
| 2 | 중간 | 자가 점검 무응답 감지 기준 ("산출물 완성 후 정해진 시점") 불명확 | **수용** — §10-2-3 무응답 행에 **M2-5 Task completed 신호 후 2턴** 명시 (M3 broadcast 무응답 패턴 정합) |
| 3 | 중간 | M11 warning 6필드가 §9-4 F-7 `_broadcast.log` parser와 type/target/result/evidence_ref 미정합 | **수용** — §10-2-3 6필드 → **8필드**로 확장 (type=`broadcast`/`self-check` 분기 + target + result + evidence_ref). §9-4 F-7 카탈로그도 8필드로 갱신 |
| 4 | 낮음 | M12 지표 임계값이 §10-3·M12-I8에 중복 기재 → 동기화 부담 | **수용** — M12-I8에서 임계값 명시 제거, **조정 절차만** 보존. §10-3 본문이 SSoT |
| 5 | 낮음 | 50% impact set 분모·분자 기준 불명 (항목 노드 vs edge) | **수용** — §10-2-5 재발동 예외 #2에 "**항목 노드 헤더 카운트 기준**" 명시 (v1 잠정, 운영 정련) |
| 6~7 | 없음 | Gate B 선택성/H-1·H-2·H-5 전 owner/U-3 전 owner/blocking 단일 Task 통합 의도대로 반영 / M12 OR 결합은 PM 전속 결정 잠금으로 과민 발동 결함 아님 | **수용(조치 불필요)** — 통과 추인 |

**수용 5건 / 통과 2건**.

**Codex 총평**: "M11은 error remediation 후 다시 clean evidence를 만드는 해제 경로가 빠져 있어, 이 한 줄이 없으면 Gate B가 정상적으로 회복되지 못한다."

**3차 리뷰 진입**: PM (a)안 결정 — 5건 전건 보강 후 advisory 검증.

### 10-5-2. Codex Gate A 3차 통합 리뷰 대응 (2026-05-04)

**판정**: **조건부 통과** (높음 0 / 중간 4 / 낮음 3 / 없음 1). PM "(c) Codex 권고 그대로 + 4차 리뷰" 결정.

| # | 심각도 | 발견 | 처리 |
|---|--------|------|------|
| 1 | 중간 | error 재발동 후 동일 위반 반복 시 상한·순환 감지 부재 → remediation 무한 루프 위험 | **수용** — §10-2-5 재발동 예외 #1에 **재발동 상한·순환 detection** 추가 (동일 deliverable+동일 위반 2회 초과 시 PM 회부, M11-I9 후속 이관) |
| 2 | 중간 | 무응답 기준 다중 Task 산출물에서 어느 Task 기준인지 불명 | **수용** — §10-2-3 무응답 행에 "산출물 lifecycle 시작 시 owner가 **대표 Task 1개 지정**, 그 Task의 completed 후 2턴" 명시 |
| 3 | 중간 | §10-2-3 매트릭스 warning 행에 "6필드" 표현 잔존 | **수용** — 8필드 형식 정합으로 정정 |
| 4 | 중간 | F-7 8필드 변경의 backward compat 미정 | **수용** — §9-4 F-7에 **분기 규칙** 명시 (type=`broadcast`는 legacy 6필드 허용 + 자동 매핑 / type=`self-check`는 8필드 강제 / 신규 entry는 type 명시 강제 / legacy 미명시는 broadcast 간주) |
| 5 | 낮음 | type=self-check vs H1/H2 silent 혼동 가능 | **§10-4-3 운영 정련 이관** — self-check는 Gate B evidence 한정, H1/H2 silent는 §9-6 M10+ 유지 |
| 6 | 낮음 | M12-I8 조정 절차 주체·승인 약함 | **수용** — M12-I8에 "팀장/owner 제안 → PM 승인 전속 → §10-3 본문 갱신" 한 줄 추가 |
| 7 | 낮음 | 50% impact set deprecated/NA/skeleton 포함 여부 | **§10-4-3 운영 정련 이관** — v1 잠정: 상태 무관 포함, skeleton 제외 |
| 8 | 없음 | M10·M12 P3 + M11 v1 + Gate B 회복 = 운영 시작 가능 수준 | 통과 |

**수용 5건 (본문) / 운영 정련 이관 2건 / 통과 1건**.

**Codex 총평**: "2차 핵심 높음 결함은 해소. `_broadcast.log` 6필드/8필드 전환 규칙과 M11 재발동 상한은 문장으로 닫아야."

**4차 리뷰 진입**: PM (c)안 결정 — Codex 권고 정확 반영, 선행 결정(M9-3 6필드) 정합 영역(#4) 안전 확인.

### 10-5-3. Codex Gate A 4차 통합 리뷰 대응 (2026-05-04)

**판정**: **통과** (낮음 4 / 없음 4). PM "(b) 권장 옵션 — Codex 권고 정확" 결정.

| # | 심각도 | 발견 | 처리 |
|---|--------|------|------|
| 1 | 낮음 | 재발동 카운팅 윈도우 미명시 | **§10-4-3 운영 정련 이관** — v1 잠정 "산출물 lifecycle/Gate B 시도 내" 해석 |
| 2 | 낮음 | 대표 Task 기록 위치 SSoT 미고정 | **수용** — §10-2-3 무응답 행에 "STATE.md 산출물 인덱스 인접 표기" 명시 |
| 3 | 낮음 | 신규 entry type 누락 시 parser 처리 미명시 | **수용** — §9-4 F-7에 "format violation 판정 + 자동 broadcast 매핑 금지" 명시 |
| 4 | 낮음 | §10-4-3 후속 이관 누적 → 정리 체크포인트 | **§10-4-3 운영 정련 이관** — M13 헌법 재작성 시 일괄 정리 |
| 5~8 | 없음 | F-7 evidence_ref 분기 / M12-I8 SSoT / 재발동 흐름 충돌 없음 / v1 구조 결함 없음 | **수용(조치 불필요)** — 통과 추인 |

**수용 본문 2건 / 운영 정련 이관 2건 / 통과 4건**.

**Codex 총평**: "3차 중간 결함은 본문 정합 기준 해소. 재발동 회복 경로·무한 루프 상한·6필드/8필드 backward compat·M12-I8 SSoT 분리가 v1 운영 시작 가능 수준까지 닫혔다. 잔여 advisory는 운영 차단 요소 아니며 M13/구현 단계에서 2~3줄 정리 가능."

**5차 리뷰 불필요**: 잔여 advisory 모두 낮음 + 운영 정련 또는 본문 한 줄 보강. 판정 통과 그대로 M10·M11·M12 확정.

### 10-6. M10·M11·M12 최종 확정 (2026-05-04)

**M10·M11·M12 확정 완료**. Codex Gate A 4 round (1차 조건부→2차 부분반려→3차 조건부→4차 통과). PM (a)→(a)→(c)→(b) 경로로 핵심 결함 모두 해소.

**확정 산출물**:
- 설계문서: `_design/M9_deliverable-structure.md` §10 전체 (10-0 β 근거 / 10-1 M10 P3 + 보류 이슈 4건 / 10-2 M11 v1 모델·카탈로그·결과 처리·게이트 관계·발동 빈도 / 10-3 M12 P3 + 객관 지표 4개 + 보류 이슈 8건 / 10-4 종합 정리 + 불변식 I21~I24 + 후속 이관 / 10-5 1·2·3차 리뷰 대응 / 10-6 최종 확정)
- 통합 카탈로그: §9-4 F-7 8필드 분기 갱신 (M9-5 자동 검증 + M11 자가 점검 통합 SSoT)
- 불변식: I21~I24 (I1~I20 불변)
- 리뷰 산출물: 1차 prompt+output / 2차 prompt+output / 3차 output / 4차 output (4 round 리뷰 이력)
- 보류 이슈 카탈로그: M10 4건(M10-I1~I4) + M12 8건(M12-I1~I8) + M11 후속 이관 4건(M11-I9 포함)

**다음 단계**: **M13 헌법 재작성 + 구현 단계 병행**
- CLAUDE.md 재작성 (M1~M12 결정 반영, R 모델 흔적 폐기)
- 에이전트 정의 갱신 (5명 teammate · M11 자가 점검 룰 · M9-5 검증 룰)
- Skills 갱신 (`prd-draft`/`tech-review`/`ux-spec`/`notion-sync`/`weekly-status`/`kickoff`/`status`/`sync-notion` 모두 신규 결정 반영)
- Slash commands 갱신
- 실 프로젝트 1건 적용 검증 (가속안 (2) 정신)
