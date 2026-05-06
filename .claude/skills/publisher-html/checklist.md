# publisher-html checklist (M11 v1 — M9 §10-2-2 정합)

본 checklist는 M9 §10-2-2 자가 점검 모델을 P 영역에 적용한 것이다. M9 §9-4 F-7 통합 8필드 형식 + Part 1 owner 자동 도출 + Part 2 범용 U-1~U-5 + 전 owner 공통 H 시리즈 정합.

---

## 자가 점검 결과 형식 — 8필드 (M9 §10-2-2 / §9-4 F-7 통합)

각 체크 항목을 다음 8필드로 `_broadcast.log`에 type=`self-check`로 기록:

| # | 필드 | 의미 |
|---|------|------|
| 1 | `type` | `self-check` (M11 자가 점검) |
| 2 | `timestamp` | 시점 |
| 3 | `owner` | `퍼블리셔` (P owner) |
| 4 | `target` | 영향 deliverable (`04-prototype-mvp/` 또는 P-NNN 단위) |
| 5 | `위반 항목 ID` | F-N / M-x / U-N / H-N (§9-4 카탈로그) |
| 6 | `result` | `pass` / `warning_only` / `error` |
| 7 | `사유` | 1~3 문장 |
| 8 | `evidence_ref` | U-5 evidence 참조 ID (grep·파일·라인) |

---

## 7항목 자가 점검 (M13-① 결정, 통과 6/7)

### Part 1 — P owner 자동 도출 (M9 §10-2-2 line 1743)

P owner = `F-1·F-2·F-3·F-4·F-5·F-6·F-8 (P 한정) + M-b·M-c·M-e + README NA SSoT 예외 (§3-3 I5)`

7항목 묶음:

- [ ] **항목 1: F-1·F-2·F-3 (P 한정 ID 정합)**
  - 모든 P-NNN이 영역별 독립 시퀀스 max(NNN)+1 따라 부여 (M10)
  - 중복 P-NNN 없음 / **재사용 없음** (불변식 I14, M9 §1-2-2)
  - 결번은 허용 — 폐기·오발급 교정의 결과인 경우 STATE.md Decision Log에 명시 기록 (M9 §1-2-2 정합)
  - evidence: `grep -h "<!-- P-" 04-prototype-mvp/pages/*.html | sort -u` + Decision Log

- [ ] **항목 2: F-4·F-5·F-6 (P 한정 헤더 정합)**
  - 모든 HTML 파일 상단에 `<!-- P-NNN / → REQ-XXX, REQ-YYY -->` 주석 존재
  - 형식 일치 (P-NNN ` / → ` REQ들, 쉼표·공백 구분)
  - evidence: `grep -L "^<!-- P-[0-9]\{3\} / → REQ-" 04-prototype-mvp/pages/*.html` → 누락 0

- [ ] **항목 3: F-8 + README NA SSoT 예외 (§3-3 I5)**
  - README.md `[NOT APPLICABLE]` 섹션 존재
  - NA 항목은 `- REQ-NNN: 사유 1줄` 형식 강제 (PRD REQ 실제 존재 검증)
  - NA 항목이 없으면 "해당 없음 — NA 항목 0건" 명시
  - evidence: `grep -A 100 "\[NOT APPLICABLE\]" 04-prototype-mvp/README.md` + PRD grep 결과

- [ ] **항목 4: M-b (P 출처) · M-c (P 끊김)**
  - REQ를 참조하지 않는 P-NNN 없음 (M-b orphan)
  - HTML 상단 주석이 가리키는 REQ-XXX가 `01-prd.md`에 실제 존재 (M-c 끊김)
  - evidence: HTML 주석 추출 → `01-prd.md` grep 일치

- [ ] **항목 5: M-e (NA → active 참조 모순)**
  - README NA 섹션의 REQ-NNN이 active 화면(`pages/`)을 참조하지 않음
  - 즉 동일 REQ가 NA 분류 + active 화면에 동시 매핑되지 않음
  - evidence: NA REQ 추출 → HTML 주석 매핑과 교차

### 전 owner 공통 (M9 line 1744)

- [ ] **항목 6: H-1·H-2·H-5 (NA 휴리스틱)**
  - 자기 영역(P)의 NA 항목에 대해 H-1·H-2·H-5 적용
  - NA 항목이 없으면 **N/A 명시** (P-NNN 매핑 100% + NA 0건일 때)
  - evidence: NA 항목 수 + 휴리스틱 실행 결과

### Part 2 — 범용 U-1~U-5 (M9 §10-2-2 line 1748~1754, 정의 그대로)

- [ ] **항목 7: U-1·U-2·U-3·U-4·U-5 묶음**
  - **U-1**: M9-5 자동 검증 통과 — `_broadcast.log`에 영향 deliverable의 error 0건 (자동 / log grep)
  - **U-2**: Decision Log 변경 사항 반영 — 산출물 변경분의 STATE.md 기록 완료 (수동 / owner 확인)
  - **U-3**: 후행 영역 owner 통지 — **퍼블리셔는 페이즈 1 마지막 → N/A 명시** (M9 §10-2-2 line 1752)
  - **U-4**: 노션 동기화 대상 결정 — PM 승인 필요 시 확인 (CLAUDE.md §10) (수동)
  - **U-5**: evidence 첨부 — 본 자가 점검 결과 자체를 `_broadcast.log`에 8필드로 기록 (자동)

---

## 통과 기준

**6/7 이상** (약 85%, CLAUDE.md §6 게이트 정합).

## 결과 처리 매트릭스 (M9 §10-2-3 정합)

| 결과 | 처리 |
|------|------|
| **전체 통과** (error 0 / warning 0) | `_broadcast.log` 기록 → Gate B 진입 허용 |
| **error 항목 존재** (Part 1 또는 U-1 미통과) | remediation Task in_progress 신설 (§9-0-5 정합) → Gate B 차단 |
| **warning_only** (U-2~U-4 수동 미확인) | owner 명시 기록 후 통과 — 8필드 result=`warning_only` + 사유·완화책·Gate B 진입 결정 |
| **U-5 evidence 미첨부** | Gate B 입력 부족 → 차단 |

## 자동 실패 조건

다음 발생 시 통과율 무관 자동 실패 → 재작성 1회:

1. **HTML 상단 주석 SSoT 누락** (항목 2 / F-4 강제)
2. **README NA list 형식 위반** — NA 항목 존재인데 `- REQ-NNN: 사유` 형식 미준수 (항목 3 / F-8 + §3-3 I5 강제)

## 결과 보고 양식 (8필드 통합)

```
[퍼블리셔 자가 점검 — YYYY-MM-DD]

| type | timestamp | owner | target | 위반 항목 ID | result | 사유 | evidence_ref |
|------|-----------|-------|--------|------------|--------|------|--------------|
| self-check | 2026-MM-DD | 퍼블리셔 | 04-prototype-mvp/ | F-1·F-2·F-3 | pass | 중복 0 / 재사용 0 / 결번 N건 (DL 기록) | grep:pages/*.html |
| self-check | ... | ... | ... | F-4·F-5·F-6 | pass | 누락 0 | grep:HTML 상단 |
| ... | ... | ... | ... | F-8 / NA SSoT | pass | NA N건 (REQ-XXX 형식) | grep:README NA |
| self-check | ... | ... | ... | M-b·M-c | pass | orphan 0 / 끊김 0 | grep:REQ 매핑 |
| self-check | ... | ... | ... | M-e | pass | NA↔active 모순 0 | grep:NA REQ vs HTML 주석 |
| self-check | ... | ... | ... | H-1·H-2·H-5 | pass / N/A | NA 항목 N건 / 0건 | NA list |
| self-check | ... | ... | ... | U-1·U-2·U-3·U-4·U-5 | pass | U-3=N/A (퍼블 후행 없음) | _broadcast.log |

통과율: N/7
```
