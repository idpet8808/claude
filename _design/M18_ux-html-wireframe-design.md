# M18 — UX 시각적 스켈레톤 ASCII → HTML wireframe 전환 (Design Doc)

- **Sub-step**: M18
- **Date**: 2026-05-08
- **Origin Session**: 593bffc5-0ca3-4a4f-a22e-728f4ffb9e79 (M18 진입) → 본 세션 (재개)
- **Why**: 현재 ux-spec 시각적 스켈레톤 = ASCII/Unicode 박스 (`┌─┐`) low fidelity. PM 첨부 wireframe 이미지(회색 박스·placeholder·영역 번호·에러 상태) 수준은 ASCII로 표현 불가. ux-planner tools에 Write·Edit 보유 → HTML wireframe 직접 생성 가능. 색상·디자인 시안은 여전히 X (영역 침범 보존).
- **Status**: brainstorming 완료 → 본 design doc 작성 → spec 자기 검토 → PM 리뷰 → writing-plans 진입 예정

---

## 0. 영역 1~7 PM 결정 종합

| # | 영역 | 결정 |
|---|------|------|
| **1** | ux-planner ↔ publisher 관계 | 동일 HTML 파일 (1 화면 = 1 HTML, ux-planner 작성 → publisher CSS·JS 보강) |
| **2** | wireframe HTML 위치 | `04-prototype-mvp/pages/<UI-{명칭}-{NN}>.html` 직접 작성 (별도 wireframes/ 디렉토리 X) |
| **3** | 4상태 표현 | 정상 = HTML 시각 wireframe / 빈·에러·로딩 = `03-ux-spec.md` 텍스트 명세 (시각 wireframe 4 별도 X) |
| **4** | 영역 번호 표기 | 시각 원/박스 마커 (`<span class="area-num">N</span>`) — Description §N과 1:1 매핑 |
| **5** | HTML 상단 SSoT 주석 시점 | ux-planner가 wireframe 작성 시점부터 작성 (`<!-- UI-{명칭}-{NN} / → REQ-{도메인}-NNN-NN -->`). publisher는 검증·보강 |
| **6** | 03-ux-spec.md ↔ HTML 분담 | `03-ux-spec.md` = 메타 7 필드 + Description + 빈/에러/로딩 텍스트 / HTML = 정상 시각 wireframe만 + 영역 번호 마커 + 상단 SSoT 주석 |
| **7** | publisher 본질 변경 | "UX 명세 그대로 매핑" → "ux-planner HTML 골격 검토·CSS·JS·assets 보강". HTML 골격·영역 번호·시각 결정 = ux-planner 영역 보존 |

영역 1·2 결정은 M18 진입 세션(2026-05-08 1차)에서, 영역 3~7 결정은 본 세션(2026-05-08 재개)에서 PM 명시 승인.

---

## 1. 변경 대상 매핑

| 파일/정의 | 변경 내용 | 영향 |
|----------|-----------|------|
| **CLAUDE.md §5 표준 디렉토리 구조** | `04-prototype-mvp/pages/` 주석 갱신 — "ux-planner 작성 + publisher CSS·JS 보강 (공동 소유)" | 헌법 갱신 |
| **CLAUDE.md §5 산출물 파일명** | `03-ux-spec.md` 옆 "+ `04-prototype-mvp/pages/*.html` (UX·publisher 공동 소유)" 명시 | 헌법 갱신 |
| **CLAUDE.md §6-4 영역 침범 금지** | publisher: "UX 명세 그대로 매핑" → "ux-planner HTML 골격·영역 번호·시각 결정 변경 X / 기술 보강 (CSS·JS·assets·README)" 갱신 | 헌법 갱신 |
| **CLAUDE.md §9 안티 패턴 (M18 신설)** | ❌ ASCII 박스 시각 스켈레톤 (M18 폐기) / ❌ publisher가 HTML 골격·영역 번호·시각 결정 / ❌ 03-ux-spec.md 시각 스켈레톤 본문 인라인 (HTML 링크만) | 헌법 §9 추가 |
| **`.claude/skills/ux-spec/SKILL.md`** | ① 시각 스켈레톤 = HTML wireframe (`04-prototype-mvp/pages/<UI>.html` 직접 작성) ② 영역 번호 마커 + 상단 SSoT 주석 ux-planner 책임 ③ 4상태 = 정상만 HTML, 나머지 03-ux-spec.md 텍스트 ④ 부분 broadcast 트리거 갱신 (HTML 파일 발급 사건 추가) ⑤ 영역 침범 갱신 | Skill 갱신 |
| **`.claude/skills/ux-spec/template.md`** | 시각 스켈레톤 ASCII 박스 → HTML wireframe 골격 양식 (영역 번호 마커 + placeholder 박스 + 상단 주석) | template 갱신 |
| **`.claude/skills/ux-spec/checklist.md`** | A-3 (4상태) 의미 갱신: 정상=HTML 시각, 빈/에러/로딩=03-ux-spec.md 텍스트. B-1 (시각 스켈레톤) 의미 갱신 = HTML wireframe 존재 | checklist 갱신 |
| **`.claude/skills/publisher-html/SKILL.md`** | ① 입력 = ux-planner 작성 HTML wireframe + 03-ux-spec.md 메타·Description·빈/에러/로딩 텍스트 ② 작업 = HTML 검토 + CSS class 연결 + JS hook + assets/tokens·css·js + README NA list ③ 영역 침범 갱신 (HTML 골격·영역 번호 결정 X — ux-planner 영역) | Skill 갱신 |
| **`.claude/skills/publisher-html/template.md`** | HTML 신규 작성 양식 → ux-planner HTML 검토·보강 양식. assets/css class 명명 규칙 정합 | template 갱신 |
| **`.claude/skills/publisher-html/checklist.md`** | F-* 정합 보존 (HTML 상단 주석 정규식·README NA list). 자동 실패 조건 갱신 (publisher가 HTML 골격 변경 X) | checklist 갱신 |
| **`.claude/agents/ux-planner.md`** | 작업 절차 §2 갱신 — HTML wireframe 작성 단계 신설. tools 변경 X (Write·Edit 보유) | 에이전트 정의 갱신 |
| **`.claude/agents/publisher.md`** | 작업 절차 갱신 — ux-planner HTML 검토·CSS·JS·assets·README. HTML 신규 작성 → 보강 본질 갱신 | 에이전트 정의 갱신 |

---

## 2. wireframe HTML 양식

`04-prototype-mvp/pages/<UI-{명칭}-{NN}>.html` 1 화면 = 1 파일. ux-planner 작성 골격 → publisher CSS·JS 보강.

### 2-1. 표준 골격 예시

```html
<!-- UI-C_join-02 / → REQ-USR-001-02, REQ-USR-001-03 -->
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>UI-C_join-02 — 크리에이터 정보 확인</title>
  <link rel="stylesheet" href="../assets/css/wireframe.css">
</head>
<body class="wireframe">

  <header class="page-header">
    <div class="logo">Workearn</div>
    <nav class="gnb"><a href="#">전체 강의</a> ...</nav>
    <div class="auth"><button>로그인</button> <button>회원가입</button></div>
  </header>

  <main class="page-main">
    <h1 class="page-title">
      <span class="area-num">2</span>
      파트너/크리에이터 지원 정보 확인
    </h1>
    <p class="page-guide">아래 정보를 확인하고 입력하시면 회원가입이 완료됩니다.</p>

    <section class="form-section" data-area="3">
      <span class="area-num">3</span>
      <div class="field">
        <label>아이디 *</label>
        <div class="placeholder input">아이디를 입력해주세요</div>
      </div>
      <!-- 3-2 ~ 3-7 동일 패턴 -->
    </section>

    <aside class="upload-section" data-area="4">
      <span class="area-num">4</span>
      <div class="field">
        <label>이력서</label>
        <div class="placeholder input large">첨부하기</div>
      </div>
    </aside>

    <footer class="action-section" data-area="5">
      <span class="area-num">5</span>
      <div class="placeholder checkbox">전체 알림설정</div>
      <button class="btn-primary">회원가입 완료</button>
      <button class="btn-secondary">가입 취소</button>
    </footer>
  </main>

</body>
</html>
```

### 2-2. 핵심 양식 규칙

| 요소 | 규칙 |
|------|------|
| **상단 SSoT 주석** | `<!-- UI-{명칭}-{NN} / → REQ-{도메인}-NNN-NN -->` (최상단 1줄). ux-planner 발급. 정규식: `^<!-- UI-[A-Za-z][A-Za-z0-9_]*-\d{2} / → REQ-[A-Z]{2,4}-\d{3}-\d{2}(, REQ-[A-Z]{2,4}-\d{3}-\d{2})* -->$` |
| **전역 화면 예외** | `<!-- UI-Header_Footer-00 / → 전역 -->` 형식 |
| **영역 번호 마커** | `<span class="area-num">N</span>` — 03-ux-spec.md Description §N과 1:1 매핑 (자동 검증 대상) |
| **영역 컨테이너** | `<section data-area="N">` 또는 `<header><main><footer>` semantic. `data-area` 속성으로 영역 식별 |
| **placeholder 박스** | `<div class="placeholder input|checkbox|large">텍스트</div>` — 회색 박스 시각 어포던스 (publisher가 CSS로 회색 처리) |
| **Class 명명 규칙** | semantic class (`.page-header`·`.form-section`·`.btn-primary`). publisher가 CSS 연결 가능한 형태 |
| **시각만, 비주얼 시안 X** | 회색 박스 + 텍스트 라벨만. 색상·폰트·세부 디자인 결정 X (영역 침범) |

### 2-3. publisher 보강 영역

- `assets/css/wireframe.css` — `.placeholder`·`.area-num`·`.page-header` 등 회색 박스 스타일 정의
- `assets/css/base.css` — 레이아웃·폰트 기본
- `assets/js/main.js` — 필요 시 인터랙션 hook (`onclick` 등)
- 새 class 추가는 publisher 자유 (CSS 보강 본질). HTML 골격 변경 X (ux-planner 영역)

---

## 3. 03-ux-spec.md 마크다운 양식

`projects/<slug>/03-ux-spec.md` 1 파일에 모든 화면 명세. 화면별로 다음 5블록 반복.

### 3-1. 화면 명세 양식 예시

```markdown
## UI-C_join-02 — 크리에이터 정보 확인 (→ REQ-USR-001-02, REQ-USR-001-03)

### 메타
| 버전 | 화면명 | Screen ID | 이용자 | 작성인 | 작성일 | 페이지 경로 |
|------|--------|-----------|--------|--------|--------|------------|
| 1.0 | 크리에이터 정보 확인 | UI-C_join-02 | PC | 신주한 | 2026-05-08 | 메인>크리에이터 회원가입>크리에이터 회원가입 정보 확인 |

### 시각적 스켈레톤
→ `04-prototype-mvp/pages/UI-C_join-02.html`

### Description
| 영역 | 내용 |
|-----|------|
| **1** | **페이지 구성**<br>- 화면 경로: 메인>크리에이터 회원가입>크리에이터 회원가입 정보 확인<br>- 구성 영역: 상단 페이지 타이틀·안내 / 좌측 계정·기업 정보 / 우측 서류 업로드·상담 요청 / 하단 알림 설정·완료 버튼 |
| **2** | **페이지 타이틀 및 안내 문구 영역**<br>- 2-1. 페이지 타이틀: "기업 회원가입 정보 확인"<br>- 2-2. 안내 문구: "아래 정보를 확인하고 입력하시면 회원가입이 완료됩니다." |
| **3** | **계정 및 기업 정보 확인 영역**<br>- 3-1. 아이디: 입력 필드 / 텍스트 입력 / 필수 (*) / 중복 아이디 사용 불가<br>- 3-2. 비밀번호: 필수 (*) / 최소 8자<br>... (3-7까지) |
| **4** | **사업자 서류 업로드 및 도입 상담 요청 영역**<br>- 4-1. 이력서: 파일 업로드 / [첨부하기] 버튼 / 업로드 파일 노출<br>- 4-2. 파트너/크리에이터 지원 사유: 텍스트 영역 / 필수 (*) |
| **5** | **알림 설정 및 가입 완료 버튼 영역**<br>- 5-1. 전체 알림 설정: 체크박스 / 하위 알림 항목 전체 선택 / 기본값 선택 상태<br>- 5-2. [회원가입 완료] 버튼: 필수 정보 입력 시 활성화 / 검증 통과 시 가입 완료 페이지 이동<br>- 5-3. [가입 취소] 버튼: 회원가입 페이지로 이동 |

### 4상태 명세

**정상**: 시각적 스켈레톤 HTML 참조 (`04-prototype-mvp/pages/UI-C_join-02.html`)

**빈 상태**:
- 모든 입력 필드 placeholder 텍스트 노출 ("아이디를 입력해주세요" 등)
- 이력서 첨부: "첨부하기" 버튼만 노출, 파일명 미표시
- [회원가입 완료] 버튼 비활성 (disabled)

**에러 상태**:
- 필수 항목 미입력: 해당 필드 하단 빨강 텍스트 "필수 항목입니다"
- 비밀번호 8자 미만: "최소 8자 이상 입력하세요."
- 비밀번호 확인 불일치: "값이 일치하지 않습니다."
- 이메일 형식 오류: "이메일 형식이 올바르지 않습니다."
- 아이디 중복: "이미 사용 중인 아이디입니다."

**로딩 상태**:
- [회원가입 완료] 클릭 시: 버튼 텍스트 → "처리 중..." + 비활성화 + spinner
- 이력서 업로드 중: 첨부 영역 progress bar

### 인터랙션
- [회원가입 완료] 클릭 → POST /api/creator/signup → 성공 시 가입완료 페이지 이동
- [가입 취소] 클릭 → 회원가입 페이지(UI-Join-01)로 이동
- 이력서 [첨부하기] → 파일 선택 다이얼로그 → 업로드 후 파일명 노출

### 연결 페이지
- 이전: UI-C_join-01 (크리에이터 회원가입 진입)
- 다음(성공): UI-Join_Complete-01 (가입 완료)
- 다음(취소): UI-Join-01 (회원가입 메인)
```

### 3-2. 핵심 양식 규칙

| 블록 | 규칙 |
|------|------|
| **헤더** | `## UI-{명칭}-{NN} — 화면명 (→ REQ-{도메인}-NNN-NN, ...)` 형식. M:N 매핑 inline |
| **메타** | 마크다운 표 1개. 7 필드 고정 (버전·화면명·Screen ID·이용자·작성인·작성일·페이지 경로). 자동 실패 조건 A-1 |
| **시각적 스켈레톤** | HTML 파일 *링크만* (`→ 04-prototype-mvp/pages/<UI>.html`). 본문 인라인 X — 토큰 절약 |
| **Description** | 마크다운 표 (영역 번호 \| 내용). 영역 번호 = HTML `area-num` 마커와 1:1 매핑. 통과율 B-2 |
| **4상태 명세** | 정상 = HTML 링크 / 빈·에러·로딩 = 마크다운 텍스트 (리스트). 자동 실패 조건 A-3 (4상태 모두 정의) |
| **인터랙션·연결 페이지** | 마크다운 리스트 |

### 3-3. 현행 ASCII 박스 폐기 (M16 → M18 갱신)

- (구) 시각적 스켈레톤 = 마크다운 ASCII/Unicode 박스 (`┌─┐ ├─┤`)
- (신) 시각적 스켈레톤 = HTML 링크 + 영역 번호 마커 (HTML 안)

---

## 4. broadcast 트리거 + 자가 점검 갱신

### 4-1. ux-spec SKILL §3 부분 broadcast 트리거 갱신

| 트리거 사건 (M18 갱신) | broadcast 대상 | 변경 |
|---|---|---|
| 화면 1개 후보 (UI-{명칭}-{NN} 발급) | P | 보존 |
| 화면 1개 메타 7 필드 채움 | P | 보존 |
| ~~화면 1개 시각적 스켈레톤 작성 (ASCII)~~ | ~~P~~ | **폐기 (M18)** |
| **화면 1개 HTML wireframe 골격 작성** (`pages/<UI>.html` 발급 + 영역 번호 마커 + SSoT 주석) | **P** | **신설 (M18)** |
| 화면 1개 4상태 확정 (정상=HTML 시각, 빈/에러/로딩=마크다운 텍스트) | P | 의미 갱신 |
| 빈/에러/로딩 자동 실패 발견 | REQ/TR | 보존 |
| S 확정 (모든 화면 + 4상태 완료) | P | 보존 |

### 4-2. publisher-html SKILL §3 부분 broadcast 트리거 갱신

| 트리거 사건 (M18 갱신) | broadcast 대상 | 변경 |
|---|---|---|
| assets 토큰 1개 확정 | (선행 영역 무관) | 보존 |
| ~~HTML 파일 1개 발급 (UI-{명칭}-{NN})~~ | ~~UX~~ | **폐기 (M18 — ux-planner 영역 이관)** |
| **ux-planner HTML wireframe 1개 검토 완료 (CSS class 연결·SSoT 주석 검증·assets 토큰 매핑)** | **UX** | **신설 (M18)** |
| **HTML 보강 후 CSS·JS·assets 1 단위 확정** (publisher 보강 사건) | **(자체 진행)** | **신설** |
| NA 발견 (UI ↔ REQ 매핑 누락) | REQ/UX | 보존 |
| **ux-planner HTML 골격 모순·누락 발견** (영역 번호 누락·SSoT 주석 형식 위배 등) | **UX (reply)** | **신설 (격차 5 multi-hop 시작점)** |

### 4-3. ux-spec checklist 갱신

| 항목 | 의미 (M18) | 변경 |
|------|-----------|------|
| **A-1** 화면 메타 7 필드 누락 0건 | 03-ux-spec.md 마크다운 표 정합 | 보존 |
| **A-2** Screen ID 정규식 정합 | `^UI-[A-Za-z][A-Za-z0-9_]*-\d{2}$` | 보존 |
| **A-3** 4상태 모두 정의 | **정상=HTML 시각 + 빈/에러/로딩=03-ux-spec.md 텍스트, 4건 모두 정의** | **의미 갱신** |
| **B-1** 시각적 스켈레톤 와이어프레임 존재 | **HTML wireframe 파일 (`pages/<UI>.html`) 존재 + 영역 번호 마커 + SSoT 주석** | **의미 갱신 (ASCII 박스 폐기)** |
| **B-2** Description 영역 번호·동작·연결 정합 | **HTML `area-num` 마커와 .md Description §N 1:1 매핑** | 보강 |
| **B-3** 요구사항 ID 1:1 매핑 (PRD §B 전수) | 보존 | 보존 |
| **B-4** 기술검토 제약 처리 | 보존 | 보존 |

### 4-4. publisher-html checklist 갱신

| 항목 | 의미 (M18) | 변경 |
|------|-----------|------|
| **F-1·F-2·F-3** UI ID 정합 (UX 1:1 매핑) | 보존 | 보존 |
| **F-4·F-5·F-6** HTML 상단 주석 정규식 정합 | **publisher가 *검증* 본질로 갱신** (작성 = ux-planner) | 책임 이관 |
| **F-8** README NA SSoT 예외 | 보존 | 보존 |
| **M-b·M-c** orphan / 끊김 (UI + REQ 양쪽) | 보존 | 보존 |
| **M-e** NA → active 모순 | 보존 | 보존 |
| **신설 (M18)** ux-planner HTML 골격 *검증* 통과 (영역 번호 마커·SSoT 주석·class 명명) | **신설** | **신설** |
| **신설 (M18)** assets/css class ↔ HTML class 1:1 연결 | **신설** | **신설** |
| **자동 실패 조건 갱신**: ❌ HTML 골격 직접 변경 (영역 침범) | **신설** | **신설** |

---

## 5. 영향 범위 + 검증 + 진행 plan + 리스크

### 5-1. 헌법 (CLAUDE.md) 갱신 항목 (PM 명시 승인 필수 — §10)

| 헌법 § | 변경 |
|--------|------|
| **§5 표준 디렉토리 구조** | `04-prototype-mvp/pages/` 주석 갱신 — "ux-planner 작성 + publisher CSS·JS 보강 (공동 소유)" |
| **§5 산출물 파일명** | `03-ux-spec.md` 옆에 "+ `04-prototype-mvp/pages/*.html` (UX·publisher 공동 소유)" 명시 |
| **§6-4 영역 침범 금지** | publisher: ❌ "UX 명세 그대로 매핑" → ❌ "ux-planner HTML 골격·영역 번호·시각 결정 변경" 갱신. ✅ "기술 보강 (CSS·JS·assets·README)" 신설 |
| **§9 안티 패턴 (M18 신설)** | ❌ ASCII 박스 시각 스켈레톤 (M18 폐기) / ❌ publisher가 HTML 골격·영역 번호·시각 결정 / ❌ 03-ux-spec.md 시각 스켈레톤 본문 인라인 (HTML 링크만) |

### 5-2. 검증 방법 (Codex Gate C — advisory)

M18 적용 후 검증 단계:

1. **Codex Gate C** (헌법·Skill·settings 변경 advisory) — 변경안 commit 전 invoke
2. **자기 검증 4블록** (§11 헌법 변경 4블록 형식) — 각 변경 § 단위로 (a) 원 § 인용 (b) 변경 부분 (c) 정당성 (d) PM 명시 승인
3. **Mesh 5요소 자기 검증** (§4-0 + §10 5차 보장) — M18 변경이 (i)~(v) 위배 0건인지
4. **활성 프로젝트 진입 검증** — `projects/mensa-ranking-challenge-v2-0/` 기획중 단계 진입 시 ux-planner HTML wireframe 작성 양식 정합 확인

### 5-3. M18 진행 plan (writing-plans 단계 미리보기)

writing-plans Skill에서 다음을 단계화 예정:

| 단계 | 산출물 | 검증 |
|------|--------|------|
| ① _design/M18_ux-html-wireframe-design.md 작성 + commit (현 단계) | M18 design doc | spec 자기 검토 (placeholder/모순/스코프/모호성) |
| ② CLAUDE.md §5·§6-4·§9 변경 (M18 영역) | 헌법 갱신 | 4블록 형식 + PM 승인 |
| ③ ux-spec SKILL/template/checklist 갱신 | 3 파일 갱신 | 자기 검증 |
| ④ publisher-html SKILL/template/checklist 갱신 | 3 파일 갱신 | 자기 검증 |
| ⑤ ux-planner.md / publisher.md 작업 절차 갱신 | 2 파일 갱신 | 자기 검증 |
| ⑥ Codex Gate C invoke (advisory) | Codex 출력 | PM 검토 + Decision Log |
| ⑦ MEMORY.md `project_m18_*` 갱신 (완료 상태) | 메모리 갱신 | — |
| ⑧ commit (`feat(M18): UX HTML wireframe 전환 — ASCII 박스 폐기`) | git commit | git log 확인 |

### 5-4. 리스크 + 트레이드오프

| 리스크 | 완화 |
|--------|------|
| 멘사 프로젝트 진입 시 ux-planner HTML wireframe 양식 시행착오 | 본 design doc §2에 양식 규칙 명시 + checklist A-1·A-2·A-3 자동 검증 |
| publisher 책임 이관 (HTML 작성 → 검토) 혼동 | SKILL.md §3 부분 broadcast 트리거 표 + 영역 침범 갱신 명시 / template.md 작업 절차 갱신 |
| 03-ux-spec.md 토큰 ↑ 가능성 (Description 표 형식) | 마크다운 표 사용 + 시각 스켈레톤 본문 인라인 X (HTML 링크만) → 옵션 1·2 대비 토큰 ↓ |
| ux-planner가 비주얼 시안 영역 침범 가능성 | template.md 양식에 "회색 박스 placeholder + class 명명만, 색상·폰트 X" 명시 + checklist 보강 |

---

## 변경 이력

- (2026-05-08, M18 진입 세션) 영역 1·2 PM 결정 + brainstorming 도중 API 400 세션 중단
- (2026-05-08, M18 재개 세션) 영역 3~7 PM 결정 + 본 design doc 작성
