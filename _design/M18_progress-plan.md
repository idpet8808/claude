# M18 — UX HTML wireframe 전환 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 헌법 §5·§6-4·§9 + ux-spec/publisher-html Skill 6 파일 + 에이전트 정의 2 파일을 갱신하여 UX 시각적 스켈레톤을 ASCII 박스 → HTML wireframe으로 전환. ux-planner가 `04-prototype-mvp/pages/<UI>.html` 직접 작성하고 publisher가 CSS·JS·assets·README로 보강하는 공동 소유 모델 도입.

**Architecture:** ux-planner = HTML 골격 작성 (영역 번호 마커·상단 SSoT 주석·placeholder 박스·class 명명) / publisher = 동일 HTML 검토 + 외부 CSS·JS 연결 + assets/tokens·css·js + README NA list. 03-ux-spec.md = 메타 7 필드·Description·빈/에러/로딩 텍스트 (HTML 시각 스켈레톤 본문 인라인 X — 링크만).

**Tech Stack:** 문서 변경 (Edit / Write 도구). 코드 implementation 아님 — TDD 대신 헌법 §11 4블록 형식 + Mesh 5요소 §4-0 자기 검증 + Codex Gate C advisory 적용.

**Source spec:** `_design/M18_ux-html-wireframe-design.md` (commit `5eb9d40`)

---

## File Structure

| # | 파일 | 변경 유형 | Task |
|---|------|-----------|------|
| 1 | `CLAUDE.md` | Modify (§5·§6-4·§9) | Task 1 |
| 2 | `.claude/skills/ux-spec/SKILL.md` | Modify | Task 2 |
| 3 | `.claude/skills/ux-spec/template.md` | Modify (§시각적 스켈레톤·§4상태) | Task 2 |
| 4 | `.claude/skills/ux-spec/checklist.md` | Modify (A-3·B-1) | Task 2 |
| 5 | `.claude/skills/publisher-html/SKILL.md` | Modify | Task 3 |
| 6 | `.claude/skills/publisher-html/template.md` | Modify | Task 3 |
| 7 | `.claude/skills/publisher-html/checklist.md` | Modify | Task 3 |
| 8 | `.claude/agents/ux-planner.md` | Modify (§2 작업 절차) | Task 4 |
| 9 | `.claude/agents/publisher.md` | Modify (§2 작업 절차) | Task 4 |
| 10 | `_design/M18_codex-gate-c-output.log` | Create | Task 5 |
| 11 | `C:\Users\BN211\.claude\projects\C--Users-BN211-Desktop-claude\memory\project_m18_ux_html_wireframe.md` + `MEMORY.md` | Modify | Task 6 |

---

## Task 1: CLAUDE.md 헌법 §5·§6-4·§9 갱신 (PM 명시 승인 필수)

**Files:**
- Modify: `CLAUDE.md` §5 표준 디렉토리 구조 + 산출물 파일명 / §6-4 영역 침범 금지 / §9 안티 패턴 (M18 신설)

### Step 1: §5 표준 디렉토리 구조 — 04-prototype-mvp/pages/ 주석 갱신

- [ ] 헌법 §5 ``# 4 단계 목록``의 표준 디렉토리 구조 코드 블록에서 다음 라인을 찾아 변경:

**Old:**
```
    └── 04-prototype-mvp/           # 퍼블리셔 (MVP 모드)
        ├── pages/<UI-{명칭}-{NN}>.html  # 1 화면 = 1 HTML 파일 (M16 — 파일명 = UI ID)
```

**New:**
```
    └── 04-prototype-mvp/           # UX·publisher 공동 소유 (M18 — ux-planner HTML 골격 작성 + publisher CSS·JS·assets 보강)
        ├── pages/<UI-{명칭}-{NN}>.html  # 1 화면 = 1 HTML 파일 (M16 — 파일명 = UI ID, M18 — wireframe 시각 스켈레톤 본질)
```

### Step 2: §5 산출물 파일명 — 공동 소유 명시

- [ ] 헌법 §5 "산출물 파일명" 항목에서 다음 라인을 찾아 변경:

**Old:**
```
- 페이즈 1 default 4종: `01-prd.md` / `02-tech-review.md` / `03-ux-spec.md` / `04-prototype-mvp/`
```

**New:**
```
- 페이즈 1 default 4종: `01-prd.md` / `02-tech-review.md` / `03-ux-spec.md` / `04-prototype-mvp/` (M18 — `04-prototype-mvp/pages/*.html`은 UX·publisher 공동 소유. ux-planner가 HTML 골격·영역 번호·상단 SSoT 주석 작성, publisher가 CSS·JS·assets 보강)
```

### Step 3: §6-4 영역 침범 금지 — publisher 정의 갱신

- [ ] 헌법 §6-4 "침범 금지" 영역 침범 목록에서 다음 라인을 찾아 변경:

**Old:**
```
     - 퍼블리셔: **화면 가감 결정 금지** (UX 명세 그대로 매핑) · 비주얼 디자인 시안 결정 금지
```

**New:**
```
     - 퍼블리셔 (M18 갱신): **화면 가감 결정 금지** (UX 영역) · **HTML 골격·영역 번호·시각 결정 변경 금지** (ux-planner 영역 — ux-planner HTML wireframe을 *그대로* 검토·CSS·JS·assets 보강만) · 비주얼 디자인 시안 결정 금지 (디자이너 영역)
```

### Step 4: §9 안티 패턴 (M18 신설) — 3건 추가

- [ ] 헌법 §9 안티 패턴 마지막 (M17 본질 위배 블록 다음)에 새 블록 신설:

**New (insert after M17 본질 위배 블록):**
```markdown
**M18 본질 위배 (M18 신설)**:
- ❌ **시각적 스켈레톤 ASCII/Unicode 박스 작성 금지** (M18 폐기) — `┌─┐ ├─┤ └─┘` 마크다운 박스 시각 표현은 M16에서 도입했으나 PM 첨부 wireframe 이미지 수준 표현 불가 (회색 박스·placeholder·영역 번호·에러 상태). M18에서 HTML wireframe (`04-prototype-mvp/pages/<UI>.html`) 직접 작성으로 갱신
- ❌ **publisher가 HTML 골격·영역 번호·시각 결정 변경 금지** (M18 신설) — ux-planner가 작성한 HTML wireframe 그대로 보존. publisher는 CSS·JS·assets/tokens·README NA list만 보강 (영역 침범)
- ❌ **03-ux-spec.md 시각 스켈레톤 본문 인라인 금지** (M18 신설) — 03-ux-spec.md는 *시각 스켈레톤 HTML 링크만* (`→ 04-prototype-mvp/pages/<UI>.html`). 본문 인라인 = 토큰 ↑ + SSoT 분리 위반. 메타 7 필드·Description·빈/에러/로딩 텍스트는 03-ux-spec.md 보존
```

### Step 5: 4블록 형식 자기 검증 (헌법 §11 정합)

- [ ] 변경 §5·§6-4·§9 각각에 대해 다음 4블록 형식이 본 plan + design doc에 명시되어 있는지 확인:
  1. 원 § 정의 인용 (Step 1·2·3·4의 Old 블록)
  2. 변경 부분 (Step 1·2·3·4의 New 블록)
  3. 정당성 1줄 — `_design/M18_ux-html-wireframe-design.md` §0 영역 1~7 PM 결정 + §5-1 헌법 갱신 항목 정합
  4. PM 명시 승인 — `_design/M18_ux-html-wireframe-design.md` PM 승인 commit `5eb9d40` (본 세션)

### Step 6: Mesh 5요소 자기 검증 (헌법 §4-0 + §10 5차 보장)

- [ ] (i) 4명 동시 spawn — 본 변경은 운영 워크플로 정의 변경 (영향 0)
- [ ] (ii) 부분 broadcast = 연속 흐름 — 본 변경은 broadcast 양식 자체 변경 (Task 2·3에서 ux-spec/publisher SKILL §3 트리거 표 갱신 — 본질 보존)
- [ ] (iii) 양방향 reply = 그래프 — publisher → ux-planner reply 의무 신설 (M18 4-2 표 — 격차 5 multi-hop 시작점 보강)
- [ ] (iv) 자가점검 = 완성 검증 — A-3·B-1 의미 갱신 (Task 2-3에서 checklist 변경)
- [ ] (v) 모든 영역 병렬·유기 — 본 변경은 영역 병렬성 영향 0

### Step 7: Commit

- [ ] git status / git diff CLAUDE.md 확인
- [ ] commit:

```bash
git add CLAUDE.md
git commit -m "$(cat <<'EOF'
feat(M18): 헌법 §5·§6-4·§9 갱신 — UX HTML wireframe 전환

- §5 표준 디렉토리: 04-prototype-mvp/ UX·publisher 공동 소유 명시
- §5 산출물 파일명: pages/*.html 공동 소유 + ux-planner HTML 골격 + publisher 보강
- §6-4 영역 침범: publisher "UX 명세 그대로 매핑" → "HTML 골격·영역 번호·시각 결정 변경 금지"
- §9 안티 패턴 (M18 신설): ASCII 박스 폐기 / publisher HTML 골격 변경 X / 03-ux-spec.md 시각 인라인 X

Source: _design/M18_ux-html-wireframe-design.md (5eb9d40)
PM 명시 승인: 본 세션 영역 1~7 결정 종합
EOF
)"
```

- [ ] git log --oneline -1 — 최신 커밋 확인

---

## Task 2: ux-spec Skill 3 파일 갱신

**Files:**
- Modify: `.claude/skills/ux-spec/SKILL.md`
- Modify: `.claude/skills/ux-spec/template.md`
- Modify: `.claude/skills/ux-spec/checklist.md`

### Step 1: SKILL.md — 본질 갱신

- [ ] 다음 영역 변경:

**(a) 격차 7 정정 본질 블록 (line 12~15) — M18 갱신 추가:**

```markdown
**격차 7 정정 본질** (M16 → M18 갱신):
- 텍스트 명세만 (M9·M13) 폐기 — *시각적 스켈레톤 와이어프레임* 필수 (M16)
- BN 표준 Screen ID `UI-{명칭}-{NN}` (S-NNN 폐기, M16)
- 화면 메타 7 필드 + Description (영역별 번호 + 동작·연결, M16)
- **시각적 스켈레톤 = HTML wireframe** (`04-prototype-mvp/pages/<UI>.html` 직접 작성, M18 갱신 — ASCII/Unicode 박스 폐기)
- **4상태 표현**: 정상 = HTML 시각 / 빈·에러·로딩 = 03-ux-spec.md 텍스트 (M18 갱신)
```

**(b) §3 부분 broadcast 트리거 표 (line 60~71) — 갱신:**

기존 표를 다음으로 교체 (design doc §4-1 정합):

```markdown
| 트리거 사건 (M18 갱신) | broadcast 대상 |
|-------------|----------------|
| 화면 1개 후보 (UI-{명칭}-{NN} 발급) | P |
| 화면 1개 메타 7 필드 채움 | P |
| 화면 1개 HTML wireframe 골격 작성 (`pages/<UI>.html` 발급 + 영역 번호 마커 + 상단 SSoT 주석) | P |
| 화면 1개 4상태 확정 (정상=HTML 시각, 빈/에러/로딩=마크다운 텍스트) | P |
| 빈/에러/로딩 자동 실패 발견 | REQ/TR |
| S 확정 (모든 화면 + 4상태 완료) | P |
```

**(c) §3-2 작성 시 본질 영역 (line 75~85) — 시각적 스켈레톤 항목 갱신:**

```markdown
  - **시각적 스켈레톤** (통과율 B-1, M16 격차 7 정정 + M18 갱신):
    - **HTML wireframe** (`04-prototype-mvp/pages/<UI-{명칭}-{NN}>.html`) 직접 작성
    - 03-ux-spec.md 본문에는 *링크만* (`→ 04-prototype-mvp/pages/<UI>.html`). 본문 인라인 X (M18 안티 패턴)
    - HTML 양식: 상단 SSoT 주석 (`<!-- UI-{명칭}-{NN} / → REQ-{도메인}-NNN-NN -->`) + 영역 번호 마커 (`<span class="area-num">N</span>`) + placeholder 박스 (`<div class="placeholder">`) + class 명명
    - 비주얼 디자인 시안 X (색상·폰트·세부 X — 화면 *구조*만)
  - **4상태** (자동 실패 조건 A-3, M18 갱신): 정상 = HTML wireframe / 빈·에러·로딩 = 03-ux-spec.md 텍스트 명세 (1건 누락 시 자동 실패)
```

**(d) 영역 침범 금지 (line 160~171) — M18 신설 추가:**

기존 목록 끝에 추가:

```markdown
- ❌ **시각적 스켈레톤 ASCII/Unicode 박스 작성** (M18 폐기) — HTML wireframe 직접 작성으로 갱신
- ❌ **03-ux-spec.md 시각 스켈레톤 본문 인라인** (M18 — HTML 링크만)
- ❌ **HTML 골격에 색상·폰트·세부 디자인 시안 추가** (보존 — 비주얼 시안 X)
```

**(e) 변경 이력 (line 180~) — M18 항목 추가:**

```markdown
- (2026-05-08) **M18 진입** — UX 시각적 스켈레톤 ASCII → HTML wireframe 전환. `04-prototype-mvp/pages/<UI>.html` 직접 작성 (UX·publisher 공동 소유). 4상태 = 정상 HTML / 빈·에러·로딩 텍스트. 영역 1~7 PM 결정 종합 (`_design/M18_ux-html-wireframe-design.md` 참조).
```

### Step 2: template.md — 시각적 스켈레톤 + 4상태 양식 갱신

- [ ] line 30~31 (§2 화면 명세 안내) 변경:

**Old:**
```
> 각 화면 = 메타 7 필드 + 시각적 스켈레톤(마크다운 ASCII/Unicode 박스) + Description (영역별 번호 + 동작·연결 페이지) + 4상태 + 인터랙션.
```

**New:**
```
> 각 화면 = 메타 7 필드 + 시각적 스켈레톤(HTML wireframe 링크 — `04-prototype-mvp/pages/<UI>.html`) + Description (영역별 번호 + 동작·연결 페이지) + 4상태 (정상=HTML 시각, 빈/에러/로딩=텍스트) + 인터랙션. M18 갱신.
```

- [ ] UI-Header_Footer-00 시각적 스켈레톤 블록 (line 46~59) 갱신:

**Old:** (마크다운 ASCII 박스 코드 블록)

**New:**
```markdown
#### 시각적 스켈레톤 (HTML wireframe)

→ `04-prototype-mvp/pages/UI-Header_Footer-00.html`

(HTML 양식: 상단 SSoT 주석 `<!-- UI-Header_Footer-00 / → 전역 -->` + 영역 번호 마커 `<span class="area-num">1</span>` + placeholder 박스 + class 명명. ux-planner 작성, publisher CSS 보강. 본문 인라인 X — 링크만)
```

- [ ] UI-Header_Footer-00 4상태 블록 (line 82~95) 갱신 — M18 양식 정합:

**Old:**
```markdown
#### 4가지 상태 (모두 필수)

##### 정상 상태
- ...
##### 빈 상태 (Empty)
- ...
##### 에러 상태 (Error)
- ...
##### 로딩 상태 (Loading)
- ...
```

**New:**
```markdown
#### 4상태 명세 (모두 필수)

**정상**: 시각적 스켈레톤 HTML 참조 (`04-prototype-mvp/pages/UI-Header_Footer-00.html`)

**빈 상태**:
- N/A (전역 공통 화면 — Empty 적용 안 됨)

**에러 상태**:
- GNB API 실패 시: 캐시 메뉴 표시 + "메뉴 로드 실패" 토스트

**로딩 상태**:
- GNB·검색 자동완성 로딩: 스켈레톤 표시
```

- [ ] UI-{{명칭}}-{{NN}} 시각적 스켈레톤 블록 (line 119~128) 갱신:

**Old:**
```markdown
#### 시각적 스켈레톤
```
... (ASCII 박스)
```
```

**New:**
```markdown
#### 시각적 스켈레톤 (HTML wireframe)

→ `04-prototype-mvp/pages/UI-{{명칭}}-{{NN}}.html`
```

- [ ] UI-{{명칭}}-{{NN}} 4상태 블록 (line 136) 갱신:

**Old:**
```
#### 4상태 (정상/빈/에러/로딩)
... (UI-Header_Footer-00 형식 정합)
```

**New:**
```markdown
#### 4상태 명세 (모두 필수)

**정상**: 시각적 스켈레톤 HTML 참조 (`04-prototype-mvp/pages/UI-{{명칭}}-{{NN}}.html`)

**빈 상태**:
- {{빈 상태 정의}}

**에러 상태**:
- {{에러 상태 정의 — 필드별 에러 메시지·시스템 에러}}

**로딩 상태**:
- {{로딩 상태 정의 — spinner·progress bar·skeleton}}
```

- [ ] 변경 이력 (line 213~214) M18 추가:

```markdown
- (2026-05-08) v0.2 — M18 갱신: 시각적 스켈레톤 ASCII 박스 → HTML wireframe 링크. 4상태 정상=HTML, 빈/에러/로딩=텍스트.
```

### Step 3: checklist.md — A-3·B-1 의미 갱신

- [ ] A-3 블록 (line 28~31) 변경:

**Old:**
```markdown
#### A-3. 4상태 (정상/빈/에러/로딩) 모두 정의 (M9·M13 보존)

- [ ] 각 화면 섹션에 **정상 / 빈 / 에러 / 로딩** 4개 하위 상태 모두 존재
- **자동 실패 사유**: 화면 명세 본질. 누락 시 후행(퍼블) HTML 작업 불가능
```

**New:**
```markdown
#### A-3. 4상태 (정상/빈/에러/로딩) 모두 정의 (M9·M13 보존 + M18 갱신)

- [ ] 각 화면 섹션에 **정상 / 빈 / 에러 / 로딩** 4개 하위 상태 모두 정의
- **정상**: HTML wireframe (`04-prototype-mvp/pages/<UI>.html`) 시각 표현
- **빈/에러/로딩**: 03-ux-spec.md 텍스트 명세 (마크다운 리스트)
- **자동 실패 사유**: 화면 명세 본질. 누락 시 후행(퍼블) 작업 불가능
```

- [ ] B-1 블록 (line 37~41) 변경:

**Old:**
```markdown
#### B-1. 시각적 스켈레톤 와이어프레임 존재 (PI-019 — 격차 7 정정)

- [ ] 모든 화면이 마크다운 ASCII/Unicode 박스 형식 *시각적 스켈레톤* 포함
- 스켈레톤 = 화면 *구조* (블록·메뉴·인터랙션 위치). 비주얼 디자인 시안 X (색상·폰트·세부)
- 단순 텍스트 영역 구성 표만 = *부정합* (격차 7 회귀)
```

**New:**
```markdown
#### B-1. 시각적 스켈레톤 와이어프레임 존재 (M16 격차 7 정정 + M18 갱신)

- [ ] 모든 화면이 **HTML wireframe** (`04-prototype-mvp/pages/<UI-{명칭}-{NN}>.html`) 파일 존재
- [ ] HTML 상단 SSoT 주석 정합 (정규식: `^<!-- UI-[A-Za-z][A-Za-z0-9_]*-\d{2} / → REQ-[A-Z]{2,4}-\d{3}-\d{2}(, REQ-[A-Z]{2,4}-\d{3}-\d{2})* -->$` 또는 전역 `^<!-- UI-[A-Za-z][A-Za-z0-9_]*-\d{2} / → 전역 -->$`)
- [ ] 영역 번호 마커 `<span class="area-num">N</span>` 존재 + 03-ux-spec.md Description §N과 1:1 매핑
- 스켈레톤 = 화면 *구조* (블록·placeholder·영역 번호). 비주얼 디자인 시안 X (색상·폰트·세부)
- ASCII/Unicode 박스만 (HTML wireframe 부재) = *부정합* (M18 격차 회귀)
```

- [ ] B-2 블록 (line 43~47) 보강:

**Old:**
```markdown
#### B-2. Description (영역별 번호 + 동작·연결 페이지) 정합 — PI-019

- [ ] 시각적 스켈레톤의 영역별 번호 표시 (1, 2, ...)
- [ ] 각 번호별 *설명* + *구성 요소 정의* + *동작* + *연결 페이지* 명시
- 예: `[1] Header UI - 설명: ... / 구성: Logo·GNB·검색·로그인·회원가입 / 동작: 로고 클릭 시 / 이동`
```

**New:**
```markdown
#### B-2. Description (영역별 번호 + 동작·연결 페이지) 정합 — M16 PI-019 + M18 갱신

- [ ] 03-ux-spec.md Description = 마크다운 표 형식 (영역 번호 \| 내용)
- [ ] HTML wireframe `<span class="area-num">N</span>` 마커와 .md Description §N **1:1 매핑** (자동 검증 대상)
- [ ] 각 번호별 *설명* + *구성 요소 정의* + *동작* + *연결 페이지* 명시
- 예: `**3** \| **계정 및 기업 정보 확인 영역**<br>- 3-1. 아이디: 입력 필드 / 텍스트 입력 / 필수 (*) / 중복 아이디 사용 불가`
```

- [ ] 변경 이력 (line 127~128) M18 추가:

```markdown
- (2026-05-08) **M18 진입** — A-3 4상태 의미 갱신 (정상=HTML, 빈/에러/로딩=텍스트). B-1 시각 스켈레톤 의미 갱신 (HTML wireframe 파일 존재 + 상단 SSoT 주석 + 영역 번호 마커). B-2 1:1 매핑 검증 보강.
```

### Step 4: 자기 검증 (Mesh 5요소 + 4블록)

- [ ] Mesh 5요소 §4-0 위배 0건 확인
- [ ] 4블록 형식 (원 § 인용 + 변경 + 정당성 + PM 승인) 정합 확인
- [ ] design doc §4-1·§4-3 양식 정합 확인

### Step 5: Commit

- [ ] commit:

```bash
git add .claude/skills/ux-spec/
git commit -m "$(cat <<'EOF'
feat(M18): ux-spec Skill 3 파일 갱신 — HTML wireframe 양식 도입

- SKILL.md: 격차 7 정정 본질 + 부분 broadcast 트리거 + 영역 침범 (HTML wireframe 양식)
- template.md: 시각적 스켈레톤 ASCII 박스 → HTML 링크. 4상태 정상=HTML/빈에러로딩=텍스트
- checklist.md: A-3 의미 갱신 / B-1 HTML wireframe 검증 / B-2 1:1 매핑 보강

Source: _design/M18_ux-html-wireframe-design.md (5eb9d40) §1·§3·§4-1·§4-3
EOF
)"
```

---

## Task 3: publisher-html Skill 3 파일 갱신

**Files:**
- Modify: `.claude/skills/publisher-html/SKILL.md`
- Modify: `.claude/skills/publisher-html/template.md`
- Modify: `.claude/skills/publisher-html/checklist.md`

### Step 1: SKILL.md — 본질·작업·영역 침범 갱신

- [ ] **(a) 본질 블록 (line 8~15) 갱신:**

**Old:**
```markdown
## 본질

퍼블리셔(P owner)가 UX-spec 시각적 스켈레톤·Description을 *기준 SSOT*로 받아 HTML/CSS/JS 변환. *비주얼 디자인 시안 결정 X* (영역 침범). 1 화면(UI-{명칭}-{NN}) = 1 HTML 파일.

**M16 정합** (PI-019 A1):
- **P-NNN 폐기** — UI ID 단일 사용
- 파일명 = UI ID (M9 §1-2-2 갱신)
- HTML 상단 주석 = `<!-- UI-{명칭}-{NN} / → REQ-{도메인}-NNN-NN -->`
```

**New:**
```markdown
## 본질

퍼블리셔(P owner)가 ux-planner 작성 HTML wireframe + 03-ux-spec.md 메타·Description·빈/에러/로딩 텍스트를 *기준 SSOT*로 받아 **CSS·JS·assets 보강** (M18 갱신). HTML 골격·영역 번호·시각 결정은 ux-planner 영역 (보강 대상 X).

**M18 정합** (UX·publisher 공동 소유):
- ux-planner = HTML 골격 작성 (영역 번호 마커·상단 SSoT 주석·placeholder 박스·class 명명)
- publisher = 동일 HTML 검토 + 외부 CSS·JS 연결 + assets/{tokens, css, js}/ + README NA list
- HTML 신규 작성 X (ux-planner 영역) — *검토·보강* 본질
- 1 화면 = 1 HTML 파일 (`04-prototype-mvp/pages/<UI-{명칭}-{NN}>.html`)
- HTML 상단 주석 = `<!-- UI-{명칭}-{NN} / → REQ-{도메인}-NNN-NN -->` (ux-planner 작성, publisher 검증)
```

- [ ] **(b) §1 first read 블록 (line 43~) 갱신:**

03-ux-spec.md 항목에 다음 추가 (line 53~):

```markdown
- 03-ux-spec.md:
  - §1 화면 목록 — 모든 UI-{명칭}-{NN} 식별 → 1:1 매핑 대상
  - §2 화면 명세 — 메타 7 필드 + Description (영역 번호 1:1 매핑) + 빈/에러/로딩 텍스트
  - **시각적 스켈레톤은 HTML 링크만** (`04-prototype-mvp/pages/<UI>.html`) — ux-planner 작성 HTML 파일 직접 검토 (M18)
- 04-prototype-mvp/pages/*.html (M18 신설):
  - ux-planner 작성 HTML wireframe — *검토 대상*
  - 상단 SSoT 주석 검증 (정규식 정합)
  - 영역 번호 마커 `<span class="area-num">` 검증
  - class 명명 검증 → assets/css/wireframe.css 연결
```

- [ ] **(c) §2 폴더 골격 (line 57~62) 갱신:**

**Old:**
```markdown
### 2. 폴더 골격 부트스트랩 (assets/ S 무관 선행 — §4-0 (v))

`template.md` 참조:
- `04-prototype-mvp/pages/`, `assets/{tokens, css, js}/`, `README.md` 생성
- assets/ tokens (color·spacing·typography) + css/base.css + js/main.js 작성
```

**New:**
```markdown
### 2. 폴더 골격 부트스트랩 (assets/ S 무관 선행 — §4-0 (v))

`template.md` 참조:
- `04-prototype-mvp/assets/{tokens, css, js}/`, `README.md` 생성 (M18 갱신 — pages/ 디렉토리는 ux-planner가 HTML 작성하면서 생성)
- assets/ tokens (color·spacing·typography) + css/base.css + css/wireframe.css (M18 신설 — placeholder·area-num·page-* 스타일) + js/main.js 작성
- pages/ 디렉토리 진입 시점은 ux-planner의 첫 HTML wireframe 발급 broadcast 수신 후
```

- [ ] **(d) §3 부분 broadcast 트리거 표 (line 65~73) 갱신:**

기존 표를 다음으로 교체 (design doc §4-2 정합):

```markdown
| 트리거 사건 (M18 갱신) | broadcast 대상 |
|-------------|----------------|
| assets 토큰 1개 확정 | (선행 영역 무관) |
| ux-planner HTML wireframe 1개 검토 완료 (CSS class 연결·SSoT 주석 검증·assets 토큰 매핑) | UX |
| HTML 보강 후 CSS·JS·assets 1 단위 확정 (publisher 보강 사건) | (자체 진행) |
| NA 발견 (UI ↔ REQ 매핑 누락) | REQ/UX |
| ux-planner HTML 골격 모순·누락 발견 (영역 번호 누락·SSoT 주석 형식 위배 등) | UX (reply — 격차 5 multi-hop 시작점) |
```

- [ ] **(e) §3 작성 시 본질 영역 (line 76~87) 갱신:**

**Old:**
```markdown
#### 작성 시 본질 영역

- **화면 1:1 매핑** — 03-ux-spec §1의 모든 UI ID와 1:1 매핑 (누락·추가 0건)
- **파일명** — `pages/<UI-{명칭}-{NN}>.html` (UI ID 기반)
- **HTML 상단 주석 SSoT**:
  ...
- **화면 콘텐츠** — UX-spec §2 시각적 스켈레톤·Description *그대로 매핑* (퍼블 자의 추가·변경 금지)
- **README 매핑 표** — Screen ID + 화면명 + REQ + pages/ 컬럼
- **NA list** — `- REQ-{도메인}-NNN-NN: 사유 1줄` 형식 (§3-3 I5)
```

**New:**
```markdown
#### 작성 시 본질 영역 (M18 갱신)

- **화면 1:1 매핑 검증** — 03-ux-spec §1의 모든 UI ID ↔ pages/*.html 1:1 매핑 (ux-planner 작성분 검증)
- **파일명 검증** — `pages/<UI-{명칭}-{NN}>.html` (ux-planner 작성, publisher 검증)
- **HTML 상단 주석 SSoT 검증** (작성은 ux-planner, 검증은 publisher):
  - REQ 매핑: `<!-- UI-{명칭}-{NN} / → REQ-{도메인}-NNN-NN, REQ-{도메인}-NNN-NN -->`
  - 전역 화면: `<!-- UI-{명칭}-{NN} / → 전역 -->`
- **HTML 골격 변경 X** (M18 신설 — 영역 침범) — ux-planner 작성 wireframe 그대로 보존
- **CSS·JS·assets 보강** (M18 신설):
  - assets/css/wireframe.css — `.placeholder`·`.area-num`·`.page-header` 등 회색 박스 스타일
  - assets/css/base.css — 레이아웃·폰트 기본
  - assets/js/main.js — 인터랙션 hook (`onclick` 등 — 필요 시)
  - 새 class 추가는 publisher 자유 (CSS 정의 보강). HTML class 추가/삭제 X
- **README 매핑 표** — Screen ID + 화면명 + REQ + pages/ 컬럼
- **NA list** — `- REQ-{도메인}-NNN-NN: 사유 1줄` 형식 (§3-3 I5)
```

- [ ] **(f) 영역 침범 금지 (line 167~180) M18 신설 추가:**

기존 목록 끝(broadcast 한쪽만 발행 금지 다음)에 추가:

```markdown
- ❌ **HTML 골격 직접 변경** (M18 신설 — 영역 침범) — ux-planner 작성 HTML wireframe 그대로 보존. element 추가/삭제 X. class 추가/삭제 X. publisher는 CSS 정의 추가만 가능
- ❌ **영역 번호 마커 변경** (M18 신설 — 영역 침범) — `<span class="area-num">N</span>` 위치·번호 변경 X
- ❌ **상단 SSoT 주석 직접 수정** (M18 신설 — 작성은 ux-planner) — publisher는 검증·정규식 정합 확인만. 수정 발견 시 ux-planner reply
```

- [ ] **(g) 변경 이력 (line 191~) M18 추가:**

```markdown
- (2026-05-08) **M18 진입** — UX·publisher 공동 소유 모델 도입. ux-planner = HTML 골격 작성, publisher = CSS·JS·assets 보강. HTML 신규 작성 → 검토·보강 본질 갱신. assets/css/wireframe.css 신설 (placeholder·area-num·page-* 스타일). 영역 침범 강화 (HTML 골격·영역 번호·SSoT 주석 변경 X).
```

### Step 2: template.md — 검토·보강 양식 갱신

- [ ] template.md 파일 Read 후 다음 변경 항목 적용:
  - **(a) 디렉토리 골격 부트스트랩 시점** — pages/ 진입 = ux-planner HTML 발급 broadcast 수신 후 (이전: 부트스트랩 시 즉시 생성)
  - **(b) HTML 양식** — ux-planner 작성 wireframe 그대로 보존. publisher는 CSS class 정의·assets/ 작성 양식만 명시
  - **(c) assets/css/wireframe.css 양식 신설** — `.placeholder`·`.area-num`·`.page-header` CSS 스타일 예시 (회색 박스·번호 마커 시각)
  - **(d) README 매핑 표 양식 보존** — Screen ID + 화면명 + REQ + pages/ 컬럼
  - **(e) NA list 형식 보존** — `- REQ-{도메인}-NNN-NN: 사유 1줄`

(상세 변경 본문은 본 task Step 시작 시 template.md Read 결과에 따라 inline 수정 — design doc §2 wireframe HTML 양식 + §2-3 publisher 보강 영역 정합)

### Step 3: checklist.md — F-4·5·6 책임 이관 + 자동 실패 조건 신설

- [ ] checklist.md Read 후 다음 변경 항목 적용:
  - **(a) F-4·F-5·F-6** (HTML 상단 주석 정규식) — *검증* 본질 명시 (작성 = ux-planner, publisher는 검증)
  - **(b) 신설 항목 — ux-planner HTML 골격 검증** (영역 번호 마커·SSoT 주석·class 명명 정합)
  - **(c) 신설 항목 — assets/css class ↔ HTML class 1:1 연결** (orphan class 0건)
  - **(d) 자동 실패 조건 신설** — ❌ HTML 골격 직접 변경 (영역 침범)
  - **(e) 변경 이력 — M18 항목 추가**

### Step 4: 자기 검증 (Mesh 5요소 + 4블록)

- [ ] Mesh 5요소 §4-0 위배 0건 확인
- [ ] 4블록 형식 정합 확인
- [ ] design doc §4-2·§4-4 양식 정합 확인

### Step 5: Commit

- [ ] commit:

```bash
git add .claude/skills/publisher-html/
git commit -m "$(cat <<'EOF'
feat(M18): publisher-html Skill 3 파일 갱신 — HTML 검토·CSS·JS 보강 본질

- SKILL.md: 본질 갱신 (ux-planner HTML 검토 + CSS·JS·assets 보강) + 부분 broadcast 트리거 + 영역 침범 (HTML 골격·영역 번호·SSoT 주석 변경 X)
- template.md: HTML 신규 작성 → 검토·보강. assets/css/wireframe.css 신설
- checklist.md: F-4·5·6 책임 이관 (검증 본질) + 신설 항목 (ux-planner HTML 검증·class 1:1 연결)

Source: _design/M18_ux-html-wireframe-design.md (5eb9d40) §1·§4-2·§4-4
EOF
)"
```

---

## Task 4: 에이전트 정의 2 파일 갱신

**Files:**
- Modify: `.claude/agents/ux-planner.md`
- Modify: `.claude/agents/publisher.md`

### Step 1: ux-planner.md 작업 절차 §2 — HTML wireframe 작성 단계 신설

- [ ] ux-planner.md Read 후 다음 변경 적용:
  - **(a) §2 작업 절차** — "시각적 스켈레톤 작성" 단계에 *HTML wireframe 작성* 명시 (ux-spec/SKILL.md §3-2 (c) 정합)
  - **(b) 산출물 위치** — `04-prototype-mvp/pages/<UI>.html` 직접 작성 명시
  - **(c) 영역 침범 — 비주얼 디자인 시안 X 보존** (M18 갱신: HTML class 명명까지만, 색상·폰트 X)
  - **(d) tools 변경 X** (Write·Edit 보유 — M18 추가 변경 불필요)
  - **(e) 변경 이력 — M18 항목 추가**

### Step 2: publisher.md 작업 절차 — HTML 검토·보강 본질 갱신

- [ ] publisher.md Read 후 다음 변경 적용:
  - **(a) §2 작업 절차** — HTML 신규 작성 → ux-planner HTML 검토·CSS·JS·assets·README 보강 (publisher-html/SKILL.md §3 정합)
  - **(b) 영역 침범** — HTML 골격·영역 번호·SSoT 주석 변경 X (M18 신설)
  - **(c) 변경 이력 — M18 항목 추가**

### Step 3: 자기 검증 + Commit

- [ ] Mesh 5요소 §4-0 위배 0건 확인
- [ ] commit:

```bash
git add .claude/agents/ux-planner.md .claude/agents/publisher.md
git commit -m "$(cat <<'EOF'
feat(M18): 에이전트 정의 2 파일 갱신 — ux-planner HTML 작성 + publisher 검토·보강

- ux-planner.md: 작업 절차 §2 — 시각적 스켈레톤 = HTML wireframe 직접 작성 (04-prototype-mvp/pages/)
- publisher.md: 작업 절차 — HTML 신규 작성 → ux-planner HTML 검토 + CSS·JS·assets·README 보강

Source: _design/M18_ux-html-wireframe-design.md (5eb9d40) §1
EOF
)"
```

---

## Task 5: Codex Gate C invoke (advisory)

**Files:**
- Create: `_design/M18_codex-gate-c-output.log`

### Step 1: Codex 호출 (헌법 §3 게이트 C — 헌법·Skill·settings 변경 advisory)

- [ ] codex 명령으로 다음 변경 영역 advisory review 요청:

```
@_design/M18_ux-html-wireframe-design.md
@CLAUDE.md (변경 §5·§6-4·§9 — Task 1)
@.claude/skills/ux-spec/ (변경 3 파일 — Task 2)
@.claude/skills/publisher-html/ (변경 3 파일 — Task 3)
@.claude/agents/ux-planner.md @.claude/agents/publisher.md (변경 2 파일 — Task 4)

Review focus:
1. 영역 1~7 PM 결정의 헌법·Skill·agent 변경 정합성 (design doc §0 ↔ §1·§2·§3·§4 ↔ Task 1·2·3·4 적용 변경)
2. M16 (격차 7 정정) + M17 (PI-022·PI-023·PI-024) ↔ M18 충돌 0건 확인 (특히 broadcast 양쪽 의무·brainstorming 사전 호출·자동 재활성화 금지 정합)
3. 영역 침범 갱신 (publisher "UX 명세 그대로 매핑" → "HTML 골격 변경 X / CSS·JS·assets 보강만")의 격차 회귀 가능성
4. ASCII 박스 폐기에 따른 멘사 v2 (현재 활성 프로젝트, 미착수) 진입 시 시행착오 리스크
5. publisher가 HTML 골격 검토하다가 모순·누락 발견 시 reply 의무 (격차 5 multi-hop 시작점) 정합
```

- [ ] Codex 출력을 `_design/M18_codex-gate-c-output.log`에 저장

### Step 2: PM 검토 + Decision Log 기록

- [ ] Codex 출력의 심각도/발견/근거 표 형식 보고 (memory: feedback_review_table_format)
- [ ] PM 검토 → 채택·부분 채택·기각 결정
- [ ] 기각 시 Decision Log 기록 (헌법 §3 정합)
- [ ] 채택 시 추가 변경 사항을 Task 1~4에 반영 후 추가 commit

### Step 3: Commit

- [ ] commit:

```bash
git add _design/M18_codex-gate-c-output.log
git commit -m "$(cat <<'EOF'
docs(M18): Codex Gate C output — advisory review

Review focus: 영역 1~7 결정 정합성 / M16·M17 충돌 0건 / 영역 침범 회귀 가능성 / 멘사 v2 진입 리스크 / 격차 5 multi-hop 정합

PM 결정: (채택/부분/기각 + 사유)
EOF
)"
```

---

## Task 6: MEMORY.md + project_m18_* 갱신

**Files:**
- Modify: `C:\Users\BN211\.claude\projects\C--Users-BN211-Desktop-claude\memory\project_m18_ux_html_wireframe.md`
- Modify: `C:\Users\BN211\.claude\projects\C--Users-BN211-Desktop-claude\memory\MEMORY.md`

### Step 1: project_m18_ux_html_wireframe.md — 완료 상태 갱신

- [ ] 다음 항목 갱신:
  - **brainstorming 진행 상황** — 영역 1~7 모두 PM 결정 완료 (2026-05-08 재개 세션)
  - **다음 세션 재개 절차** 섹션 제거 → "**완료 상태**" 섹션으로 교체
  - **commit 참조** — design doc `5eb9d40` + Task 1~5 commit hash 추가
  - **에러 원인 (참고)** 보존 (회귀 시점 추적용)

### Step 2: MEMORY.md 갱신

- [ ] M18 entry 설명 갱신 — "(완료) 2026-05-08 — UX HTML wireframe 전환 완료. 영역 1~7 결정 + 헌법·Skill·agent 갱신 + Codex Gate C"

### Step 3: Commit X (메모리는 .git 추적 X — `C:\Users\BN211\.claude\` 경로)

- [ ] git add 대상 X (메모리 디렉토리는 본 프로젝트 git 추적 외부)

---

## Task 7: 최종 검증 + push (선택)

### Step 1: 전체 변경 git log 확인

- [ ] `git log --oneline -10` — Task 1~5 commit 확인 (5~7 commit 예상)
- [ ] `git diff main HEAD --stat` — 전체 변경 파일·라인 수 확인

### Step 2: Mesh 5요소 자기 검증 (전체 변경에 대해)

- [ ] (i) 4명 동시 spawn — 영향 0
- [ ] (ii) 부분 broadcast 연속 흐름 — ux-spec/publisher SKILL §3 트리거 표 갱신 정합
- [ ] (iii) 양방향 reply 그래프 — publisher → ux-planner reply 의무 신설 (M18 4-2 격차 5 시작점)
- [ ] (iv) 자가점검 = 완성 검증 — A-3·B-1 의미 갱신 정합
- [ ] (v) 모든 영역 병렬·유기 — 영향 0

### Step 3: 활성 프로젝트 진입 검증 (멘사 v2 — 미착수)

- [ ] `projects/mensa-ranking-challenge-v2-0/STATE.md` 현재 단계 = "기획중" / 산출물 진행 = `····` (미착수) 확인
- [ ] M18 적용 후 `/kickoff mensa-ranking-challenge-v2-0` 진입 시 ux-planner HTML wireframe 작성 양식 정합 확인 (검증만, 본 plan에서는 진입 X)

### Step 4: PM 보고 (CLAUDE.md §11 4블록)

- [ ] 다음 형식으로 PM 보고:

```
[M18] 완료
- 산출물: _design/M18_ux-html-wireframe-design.md (5eb9d40) + _design/M18_progress-plan.md + 변경 11 파일
- 자가 점검: Mesh 5요소 (i)~(v) 위배 0건 / Codex Gate C advisory (PM 검토 결과)
- 오픈 이슈: 0건
- 다음 권장: 멘사 v2 /kickoff 진입 시점 결정 (PM)
```

### Step 5: push (선택 — PM 명시 승인 필수)

- [ ] PM 명시 승인 후 `git push origin main` (헌법 §10 정합)

---

## Self-Review

### Spec Coverage 확인

| Spec 섹션 | 적용 Task |
|-----------|----------|
| §0 영역 1~7 결정 종합 | 전체 (Task 1~4) |
| §1 변경 대상 매핑 (11 항목) | Task 1·2·3·4 |
| §2 wireframe HTML 양식 | Task 2 (template.md) |
| §3 03-ux-spec.md 마크다운 양식 | Task 2 (template.md) |
| §4-1 ux-spec broadcast 트리거 | Task 2 (SKILL.md (b)) |
| §4-2 publisher broadcast 트리거 | Task 3 (SKILL.md (d)) |
| §4-3 ux-spec checklist (A-3·B-1·B-2) | Task 2 (checklist.md) |
| §4-4 publisher checklist | Task 3 (checklist.md) |
| §5-1 헌법 갱신 항목 | Task 1 |
| §5-2 검증 (Codex Gate C·4블록·Mesh 5요소) | Task 5·7 + 모든 task self-verify |
| §5-3 진행 plan 미리보기 | 본 plan 전체 |
| §5-4 리스크 + 트레이드오프 | Task 5 (Codex Gate C focus 4·5) |

**누락 0건**.

### Placeholder Scan

- "TBD/TODO/implement later/fill in details" 0건
- "Add appropriate error handling" / "handle edge cases" 0건
- 코드/변경 본문이 있는 단계는 모두 inline 명시 (template.md·checklist.md·agent 정의는 read 후 inline 적용 조건 명시)
- "Similar to Task N" 0건

**예외**: Task 2 Step 2 (template.md), Task 3 Step 2·3 (publisher template/checklist), Task 4 Step 1·2 (agent 정의)는 *Read 후 inline 적용*으로 표기 — 변경 항목 (a)·(b)·(c)... 형식으로 항목별 정의 명시. 이는 plan에 변경 본문 코드를 모두 inline으로 적으면 plan이 1500+ 줄로 비대해지는 것을 회피하는 trade-off. 항목 정의는 명확하므로 placeholder 아님.

### Type Consistency

- "HTML wireframe" 용어 일관 (HTML 와이어프레임·HTML 골격 등 혼용 X)
- "ux-planner" / "publisher" / "ux-spec" / "publisher-html" 명명 일관
- "04-prototype-mvp/pages/<UI-{명칭}-{NN}>.html" 경로 형식 일관
- "상단 SSoT 주석" 정규식 (`^<!-- UI-[A-Za-z][A-Za-z0-9_]*-\d{2} / → REQ-[A-Z]{2,4}-\d{3}-\d{2}(, REQ-[A-Z]{2,4}-\d{3}-\d{2})* -->$`) Task 1·2·3 모두 정합

**Type consistency: 통과**.

---

## Execution Handoff

Plan 작성 완료. 두 가지 실행 옵션:

### 1. Subagent-Driven (recommended)
- Task 1·2·3·4·5·6·7 각각을 fresh subagent로 dispatch
- Task 간 PM 검토 + 두 단계 review (subagent 결과 + integration)
- 빠른 iteration

### 2. Inline Execution
- 본 세션에서 task 순차 실행
- Task 단위로 PM checkpoint
- batch 실행

어느 접근을 선택하시겠습니까?
