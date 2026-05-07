# publisher-html checklist (M16 — PI-001~PI-019 정합, M11 v1 + M9 §10-2-2 정합)

본 checklist는 M9 §10-2-2 자가 점검 모델을 P 영역에 적용. M16 진입에 따라 **P-NNN 폐기 + UI ID 단일 사용** (PI-019 A1 결정).

---

## 자가 점검 결과 형식 — 8필드 (M9 §10-2-2 / §9-4 F-7 통합)

각 체크 항목을 다음 8필드로 `_broadcast.log`에 type=`self-check`로 기록:

| # | 필드 | 의미 |
|---|------|------|
| 1 | `type` | `self-check` (M11 자가 점검) |
| 2 | `timestamp` | 시점 |
| 3 | `owner` | `P` (M16 owner enum) |
| 4 | `target` | 영향 deliverable (`04-prototype-mvp/` 또는 UI-{명칭}-{NN} 단위) |
| 5 | `위반 항목 ID` | F-N / M-x / U-N / H-N (§9-4 카탈로그) |
| 6 | `result` | `pass` / `warning_only` / `error` |
| 7 | `사유` | 1~3 문장 |
| 8 | `evidence_ref` | U-5 evidence 참조 ID (grep·파일·라인) |

---

## 7항목 자가 점검 (통과 6/7)

### Part 1 — P owner 자동 도출 (PI-019 정합 갱신)

P owner 본질 = `1 화면(UI-{명칭}-{NN}) = 1 HTML 파일 (pages/<UI-{명칭}-{NN}>.html)` + UI ↔ REQ 매핑 + README NA SSoT 예외 (§3-3 I5)

7항목 묶음:

- [ ] **항목 1: F-1·F-2·F-3 (UI ID 정합 — UX-spec 매핑)**
  - 모든 HTML 파일이 03-ux-spec.md `§1 화면 목록`의 UI ID와 **1:1 매핑** (누락·추가 0건)
  - UI ID 정규식 정합: `^UI-[A-Za-z][A-Za-z0-9_]*-\d{2}$` (PI-019)
  - 파일명 정합: `pages/<UI-{명칭}-{NN}>.html` (UI ID 기반 파일명 — M9 §1-2-2 갱신)
  - **P-NNN 사용 금지** (M16 폐기)
  - evidence: `ls 04-prototype-mvp/pages/` + UX-spec §1 비교

- [ ] **항목 2: F-4·F-5·F-6 (HTML 상단 주석 헤더 정합)**
  - 모든 HTML 파일 상단에 UI ID 주석 존재
  - **REQ 매핑 형식** (일반 화면): `<!-- UI-{명칭}-{NN} / → REQ-{도메인}-NNN-NN, REQ-{도메인}-NNN-NN -->`
    - 정규식: `^<!-- UI-[A-Za-z][A-Za-z0-9_]*-\d{2} / → REQ-[A-Z]{2,4}-\d{3}-\d{2}(, REQ-[A-Z]{2,4}-\d{3}-\d{2})* -->$`
  - **전역 화면 형식** (REQ 무관 전역 공통 — 헤더/푸터/공통 레이아웃 등): `<!-- UI-{명칭}-{NN} / → 전역 -->`
    - 정규식: `^<!-- UI-[A-Za-z][A-Za-z0-9_]*-\d{2} / → 전역 -->$`
    - 예: `<!-- UI-Header_Footer-00 / → 전역 -->`
  - evidence: `grep -L "^<!-- UI-" 04-prototype-mvp/pages/*.html` → 누락 0

- [ ] **항목 3: F-8 + README NA SSoT 예외 (§3-3 I5)**
  - README.md `[NOT APPLICABLE]` 섹션 존재
  - NA 항목은 `- REQ-{도메인}-NNN-NN: 사유 1줄` 형식 강제 (PRD §B REQ 실제 존재 검증)
  - NA 항목이 없으면 "해당 없음 — NA 항목 0건" 명시
  - evidence: `grep -A 100 "\[NOT APPLICABLE\]" 04-prototype-mvp/README.md` + PRD §B grep

- [ ] **항목 4: M-b (P 출처) · M-c (P 끊김)**
  - **REQ 매핑 화면**: REQ를 참조하지 않는 HTML 파일 없음 (M-b orphan). 단 *전역 화면*(헤더/푸터 등 `→ 전역` 주석)은 예외
  - HTML 상단 주석이 가리키는 UI ID가 `03-ux-spec.md §1 화면 목록`에 실제 존재 (M-c 끊김 — UI 매핑, 전역 포함)
  - HTML 상단 주석이 가리키는 REQ ID가 `01-prd.md §B 카탈로그`에 실제 존재 (M-c 끊김 — REQ 매핑, 전역 화면 N/A)
  - evidence: HTML 주석 추출 → UX-spec + PRD §B grep 일치

- [ ] **항목 5: M-e (NA → active 참조 모순)**
  - README NA 섹션의 REQ가 active HTML 파일에서 매핑되지 않음
  - 즉 동일 REQ가 NA 분류 + active 화면에 동시 매핑되지 않음
  - evidence: NA REQ 추출 → HTML 주석 매핑과 교차

### 전 owner 공통 (M9 line 1744)

- [ ] **항목 6: H-1·H-2·H-5 (NA 휴리스틱)**
  - 자기 영역(P)의 NA 항목에 대해 H-1·H-2·H-5 적용
  - NA 항목이 없으면 **N/A 명시** (UI ↔ REQ 매핑 100% + NA 0건일 때)
  - evidence: NA 항목 수 + 휴리스틱 실행 결과

### Part 2 — 범용 U-1~U-5 (M9 §10-2-2 line 1748~1754, 정의 그대로)

- [ ] **항목 7: U-1·U-2·U-3·U-4·U-5 묶음**
  - **U-1**: M9-5 자동 검증 통과 — `_broadcast.log`에 영향 deliverable의 error 0건 (자동 / log grep)
  - **U-2**: Decision Log 변경 사항 반영 — assets 토큰 변경·NA 항목 추가 등 STATE.md 기록 완료
  - **U-3**: 후행 영역 owner 통지 — **퍼블리셔는 페이즈 1 마지막 → N/A 명시** (M9 §10-2-2 line 1752)
  - **U-4**: 노션 동기화 대상 결정 — PM 승인 필요 시 확인 (CLAUDE.md §10) (수동)
  - **U-5**: evidence 첨부 — 본 자가 점검 결과 자체를 `_broadcast.log`에 8필드로 기록 (자동)

---

## 통과 기준

**6/7 이상** (약 85%, CLAUDE.md §6-2 게이트 정합).

⚠️ **자가점검 통과 = 완성 검증** (§4-0 (iv)). 페이즈 1 마지막 단계 — 노션관리자 호출은 PM 명시 결정.

## 결과 처리 매트릭스 (M9 §10-2-3 정합)

| 결과 | 처리 |
|------|------|
| **전체 통과** (error 0 / warning 0) | `_broadcast.log` 기록 → 페이즈 1 종료 (PM 노션 호출 결정) |
| **error 항목 존재** (Part 1 또는 U-1 미통과) | remediation Task in_progress 신설 → 재작성 |
| **warning_only** (U-2~U-4 수동 미확인) | owner 명시 기록 후 통과 |
| **U-5 evidence 미첨부** | 입력 부족 → 차단 |

## 자동 실패 조건

다음 발생 시 통과율 무관 자동 실패 → 재작성 1회:

1. **HTML 상단 주석 SSoT 누락** (항목 2 / F-4 강제) — UI ID 형식 정규식 위배 포함
2. **README NA list 형식 위반** — NA 항목 존재인데 `- REQ-{도메인}-NNN-NN: 사유` 형식 미준수 (항목 3 / F-8 + §3-3 I5 강제)
3. **P-NNN 사용** — M16 폐기 (PI-019 A1 결정). UI ID 단일 사용 강제

## 결과 보고 양식 (8필드 통합)

```
[퍼블리셔 자가 점검 — YYYY-MM-DD]

| type | timestamp | owner | target | 위반 항목 ID | result | 사유 | evidence_ref |
|------|-----------|-------|--------|------------|--------|------|--------------|
| self-check | 2026-MM-DD | 퍼블리셔 | 04-prototype-mvp/ | F-1·F-2·F-3 | pass | UI ID 정규식 정합 / 1:1 매핑 / 결번 N건 (DL 기록) | grep:pages/*.html + UX-spec §1 |
| self-check | ... | ... | ... | F-4·F-5·F-6 | pass | UI ID 형식 누락 0 | grep:HTML 상단 |
| ... | ... | ... | ... | F-8 / NA SSoT | pass | NA N건 (REQ-{도메인}-NNN-NN 형식) | grep:README NA |
| self-check | ... | ... | ... | M-b·M-c | pass | orphan 0 / 끊김 0 (UI + REQ 양쪽) | grep:UI 매핑 + REQ 매핑 |
| self-check | ... | ... | ... | M-e | pass | NA↔active 모순 0 | grep:NA REQ vs HTML 주석 |
| self-check | ... | ... | ... | H-1·H-2·H-5 | pass / N/A | NA 항목 N건 / 0건 | NA list |
| self-check | ... | ... | ... | U-1·U-2·U-3·U-4·U-5 | pass | U-3=N/A (퍼블 후행 없음) | _broadcast.log |

통과율: N/7
```

---

## 변경 이력

- (2026-05-07) **M16 진입** — P-NNN 폐기 (PI-019 A1 결정) + UI ID 단일 사용 + REQ 4 segment 매핑 + 파일명 UI ID 기반 (M9 §1-2-2 갱신). 격차 7 정정.
- (이전) M9·M11·M13 — P-NNN 영역별 독립 시퀀스 + 3자리 REQ 매핑 (M16에서 폐기).
