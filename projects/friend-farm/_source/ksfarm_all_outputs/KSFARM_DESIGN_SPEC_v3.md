# KS팜 'AI 농사친구' — 디자인 시스템 사양서 (v3)

> **v3 변경 요약**: 1단계 감사(45개 화면) 기반 컴포넌트 표준화. CSS 변수·`.phone`·`.scroll`·`.appbar`·`.btn`·`.card`·`.chip`·`.footer` 표준 사양 확정. 누락 컴포넌트(`.input`/`.btn-line`/`.tag`) 정의 추가. 본 문서는 모든 화면이 따라야 할 **단일 기준 문서**다.
>
> v2와의 큰 변화: ① `.btn` height 52px 통일 ② `.btn-primary` 그라데이션 통일 ③ `.scroll` `overflow-x: hidden` 추가 ④ `.chip` 두 종류로 분리 ⑤ `.input`/`.btn-line`/`.tag` 표준 추가

---

## 0. 컨셉 한 줄
**"미니멀(토스급 명료함) 구조 + 어스톤(KS팜다운 따뜻함) 팔레트"**
— 정보는 명료하게, 색·질감은 농업/자연 정서에 맞게 따뜻하게. 장식은 "의미가 있을 때만".

플랫폼: 모바일 (세로, 약 390px 기준)

---

## 1. 컬러 토큰 (전 화면 동일)

```css
:root, .phone {
  /* 중립 */
  --bg:        #ECEAE0;   /* 앱 배경 (웜 리넨) */
  --card:      #FFFFFF;   /* 카드 */
  --ink:       #20251D;   /* 본문 진한 텍스트 */
  --ink-2:     #45493E;   /* 보조 텍스트 */
  --gray:      #76796C;   /* 캡션/뮤트 */
  --line:      rgba(48,42,30,.08);   /* ★ v3 표준 (v2의 .10 → .08) */

  /* 메인 (딥 틸-포레스트) */
  --green:     #1F4B3C;   /* 주 브랜드/CTA 단색 */
  --green-2:   #163729;   /* CTA 그라데이션 하단 */
  --green-soft:#E7EEE6;
  --sage:      #2F6150;   /* 보조 그린 */

  /* 어스 액센트 (의미 부여용) */
  --clay:      #B0612C;   /* 테라코타 — 경고/강조 */
  --gold:      #B08A3E;   /* 금색 — 라벨 */
  --field-bg:  #F4F4EF;   /* 입력 필드 배경 */

  /* 시세 등락 (농민 관점 반전) */
  --up:        #B0612C;   /* 가격 상승 = 농민에게 나쁨(아님)·소비자 관점 */
  --down:      #2F6150;   /* 가격 하락 = 농민에게 안 좋음(반전) */

  /* 둥글기·그림자 */
  --r-lg:      18px;
  --r-md:      14px;
  --shadow:    0 1px 2px rgba(36,30,18,.05);
}
```

**규칙:**
- 모든 화면의 `:root` 또는 `.phone` 블록에 위 토큰 전체 정의
- 컬러는 **반드시 토큰 변수로 참조**. 인라인 hex 코드 금지(예외: 그라데이션 stop color)

---

## 2. 폰 프레임 (`.phone`)

**역할:** 모바일 화면 전체를 감싸는 컨테이너.

```css
.phone {
  position: relative;
  width: min(390px, 100%);
  background: var(--bg);
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 18px 44px -12px rgba(40,34,22,.42);
  min-height: 860px;
  display: flex;
  flex-direction: column;
}
```

**예외 허용:**
- 온보딩 진입 화면(`onboarding_entry`)만 `background: linear-gradient(180deg, #1F4B3C 0%, #143028 100%)` (의도적)

---

## 3. 스크롤 영역 (`.scroll`)

**역할:** 앱바와 푸터 사이의 본문 스크롤 영역.

```css
.scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;       /* ★ v3 추가 (가로 스크롤 방지) */
  padding: 8px 20px 24px;   /* footer 있을 때 기본값 */
}
```

**변형 (의도에 따라):**
| 상황 | padding 권장 |
|---|---|
| footer 있는 화면 (기본) | `8px 20px 24px` |
| footer 없음, FAB 떠 있음 | `8px 20px 90px` |
| 앱바 없이 시작 (히어로 화면) | `22px 20px 24px` |
| 사진 슬라이더 등 풀너비 콘텐츠 있음 | `16px 20px 32px` |

**금지:**
- 좌우 padding을 22/24px로 다르게 하지 말 것 (기본 20px)
- `flex: 1; overflow-y: auto;` 누락 금지

---

## 4. 앱바 (`.appbar`)

**역할:** 상단 고정 영역 (뒤로가기·제목·우측 액션).

```css
.appbar {
  display: flex;
  align-items: center;
  padding: 4px 12px 0;
  flex-shrink: 0;   /* ★ v3 필수 (누락 시 스크롤 시 줄어듦) */
}
```

---

## 5. 푸터 (`.footer`)

**역할:** 하단 고정 액션 영역 (다음·확인 버튼 등).

```css
.footer {
  flex-shrink: 0;
  padding: 14px 20px calc(14px + env(safe-area-inset-bottom));
  background: var(--bg);
  border-top: 1px solid var(--line);
  display: flex;
  gap: 10px;
}
```

---

## 6. 버튼

### 6-1. 기본 (`.btn`)

```css
.btn {
  height: 52px;                /* ★ v3 표준 */
  border-radius: var(--r-md);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  border: 0;
  cursor: pointer;
}
```

### 6-2. 주요 CTA (`.btn-primary`) — ★ 그라데이션

```css
.btn-primary {
  background: linear-gradient(180deg, #2C6150 0%, var(--green) 52%, var(--green-2) 100%);
  color: #fff;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.22),
              0 2px 8px rgba(22,55,41,.18);
}
.btn-primary:disabled,
.btn-primary[aria-disabled="true"] {
  background: var(--field-bg);
  color: var(--gray);
  box-shadow: none;
}
```

### 6-3. 보조 (`.btn-line`)

```css
.btn-line {
  background: var(--card);
  color: var(--ink);
  border: 1px solid var(--line);
}
```

### 6-4. footer 안 버튼 (가로 분할)

```css
.footer .btn { flex: 1; }
.footer .btn.fixed { flex: 0 0 100px; }   /* "이전" 같이 좁은 버튼 */
```

---

## 7. 카드 (`.card`)

```css
.card {
  background: var(--card);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow);
  padding: 16px 17px;
  /* border 없음 — shadow만 사용 */
}
```

---

## 8. 칩 — 두 종류로 분리

### 8-1. 선택형 (`.chip-select`) — 작물·증상·옵션

큰 사이즈, 카드형. 선택 시 딥틸 테두리 + 배경 강조.

```css
.chip-select {
  padding: 13px 17px;
  border-radius: 13px;
  background: var(--card);
  box-shadow: var(--shadow);
  border: 1.5px solid transparent;
  font-size: 14.5px;
  font-weight: 700;
  color: var(--ink-2);
  cursor: pointer;
  transition: all .15s;
}
.chip-select.on {
  border-color: var(--green);
  background: var(--green-soft);
  color: var(--green-2);
}
```

### 8-2. 태그형 (`.chip-tag`) — 필터·키워드·카테고리

작은 사이즈, pill형.

```css
.chip-tag {
  height: 36px;
  padding: 0 15px;
  border-radius: 999px;
  background: var(--field-bg);
  color: var(--ink-2);
  font-size: 13.5px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 0;
  cursor: pointer;
}
.chip-tag.on {
  background: var(--green);
  color: #fff;
}
```

**구분 가이드:**
- "이 중에서 골라" → `.chip-select`
- "이 카테고리·필터로 보여" → `.chip-tag`

---

## 9. 입력 필드 (`.input`)

```css
.input {
  width: 100%;
  height: 50px;
  padding: 0 14px;
  border: 0;
  border-radius: var(--r-md);
  background: var(--field-bg);
  font-size: 15px;
  color: var(--ink);
  font-weight: 500;
}
.input:focus {
  outline: 2px solid var(--green);
  outline-offset: -2px;
}
.input::placeholder {
  color: var(--gray);
}

/* textarea 변형 */
.input.textarea {
  height: auto;
  min-height: 120px;
  padding: 14px;
  line-height: 1.55;
  resize: vertical;
}
```

---

## 10. 작은 배지·태그 (`.tag`)

라벨·상태 표시용 (선택 불가).

```css
.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 6px;
  background: var(--green-soft);
  color: var(--green-2);
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.tag.clay   { background: rgba(176,97,44,.10);  color: var(--clay); }
.tag.gold   { background: rgba(176,138,62,.10); color: var(--gold); }
.tag.gray   { background: var(--field-bg);      color: var(--gray); }
```

---

## 11. 섹션 헤더 (`.sec` / `.sec-h`)

본문 안의 구획 헤더. 카드 없이 텍스트 흐름으로 쓸 때.

```css
.sec {
  padding: 22px 0 24px;
  border-top: 1px solid var(--line);
}
.sec:first-of-type {
  border-top: 0;
  padding-top: 6px;
}
.sec-h {
  font-size: 14.5px;
  font-weight: 800;
  color: var(--ink);
  margin: 0 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.sec-h .ic {
  width: 18px;
  height: 18px;
  color: var(--green);
  flex-shrink: 0;
}
.sec p {
  font-size: 14px;
  color: var(--ink-2);
  font-weight: 500;
  line-height: 1.65;
  margin: 0;
}
```

---

## 12. SVG 아이콘 표준

- 모든 아이콘은 `<defs><symbol>...` 정의 후 `<use href="#i-xxx"/>` 재사용
- 크기는 CSS `width`/`height`로 (font-size 사용 금지)
- 색상은 `currentColor` + `stroke="currentColor"` (CSS color 상속)
- 표준 viewBox: `0 0 24 24`, stroke-width 1.8~2.2

```html
<svg class="ic" width="18" height="18"><use href="#i-leaf"/></svg>
```

```css
.ic { width: 18px; height: 18px; flex-shrink: 0; }
```

---

## 13. 타이포그래피

```css
body, .phone {
  font-family: -apple-system, BlinkMacSystemFont, "Pretendard",
               "Noto Sans KR", "Apple SD Gothic Neo", sans-serif;
  word-break: keep-all;
  -webkit-font-smoothing: antialiased;
}
```

**계층:**
| 용도 | size | weight | color |
|---|---|---|---|
| 큰 제목 (h1) | 24px | 800 | var(--ink) |
| 화면 제목 (h2) | 18~20px | 800 | var(--ink) |
| 섹션 헤더 (.sec-h) | 14.5px | 800 | var(--ink) |
| 본문 (p) | 14px | 500 | var(--ink-2) |
| 캡션 | 12.5px | 600 | var(--gray) |
| 미세 배지 | 11.5px | 700 | varies |

`letter-spacing: -0.01em` 큰 텍스트에 권장.

---

## 14. 인터랙션 원칙

- 모든 hover/active는 짧고 부드럽게: `transition: all .15s;`
- 칩·버튼 active: `transform: scale(0.97)`
- 진행 인디케이터: 얇은 선(1.5px) + 채움 모션 (`transform: scaleX(...)`)
- 자동 다음 진행 ❌ → 명시적 "다음" 버튼 통일 ✓
- 페이지 진입 애니메이션: `rise` (10px 위→0, opacity 0→1, .35s)

---

## 15. 화면 구조 표준 패턴

### 풀 페이지 구조
```html
<div class="phone">
  <div class="appbar">...</div>           <!-- 24px 높이 시스템바 + 액션바 -->
  <div class="scroll">                     <!-- 본문 스크롤 -->
    ...
  </div>
  <div class="footer">                     <!-- 하단 고정 (필요 시) -->
    <button class="btn btn-primary">다음</button>
  </div>
</div>
```

### 입력형 화면 (다음 버튼 있음)
- `appbar` (뒤로가기·제목·진행바)
- `scroll` (질문·옵션)
- `footer` (이전·다음)

### 정보형 화면 (스크롤만)
- `appbar` (뒤로가기·제목·우측 액션)
- `scroll` (콘텐츠, 하단 padding 여유)

---

## 16. 사용 금지 / 회피 패턴

- ❌ 카드 4개 이상 연속 — 가독성 떨어짐 (`.sec` 텍스트 흐름 권장)
- ❌ 아이콘 폰트 사이즈로 크기 조절 (SVG는 width/height)
- ❌ 그림자 진하게 — `var(--shadow)` 미니멀하게
- ❌ 진하지 않은 회색 텍스트(`#999` 등)를 본문에 — 가독성·접근성
- ❌ 인라인 hex 컬러 코드 — 토큰 변수 사용
- ❌ 자동 다음 진행 — 다음 버튼 통일

---

## 17. 360px 작은 화면 안전망 (필수)

모든 `_hybrid.html`은 `</style>` 직전에 다음 CSS를 포함:

```css
/* === 360px safety net (v3) === */
.phone img, .phone svg { max-width: 100%; height: auto; }
.phone { word-break: keep-all; overflow-wrap: break-word; }
```

**역할:**
- 이미지·SVG가 부모 너비 초과해 가로 스크롤 만들지 않음
- 긴 한국어 단어가 폭 좁은 영역에서 강제로 분리 가능

**`.phone` 컨테이너 너비:** `width: min(390px, 100%)` 표준 사용으로 360px 화면에선 자연스럽게 100% 너비로 작동.

**여전히 깨지는 경우 (수동 확인):**
- 가로 정렬 요소가 `flex-wrap: nowrap` 강제 (`flex-wrap: wrap` 또는 `min-width: 0` 추가)
- 절대값 width 사용 (반응형 단위로 변경)
- 큰 `min-width` 사용 (제거 또는 줄임)

---

## 18. 모달 / 바텀시트 표준

두 가지 패턴을 의도적으로 구분해 사용한다. 토스·당근 패턴.

### 18-1. 사용 가이드

| 상황 | 패턴 | 클래스 |
|---|---|---|
| 선택지 많음 (작물·옵션) | 바텀시트 | `.sheet` |
| 검색 + 긴 리스트 | 풀 바텀시트 | `.sheet.full` |
| 확인 / 안내 (1-2 버튼) | 중앙 모달 | `.modal` |
| 알림 (자동 닫힘) | 중앙 모달 | `.modal` |

❌ **금지**: `.dialog` 클래스 사용 금지 (`.modal`로 통일 권장. 기존 화면은 유지)

---

### 18-2. 바텀시트 (`.sheet`)

위로 슬라이드 올라오는 시트. 손가락이 닿기 쉬운 위치에 옵션·검색 표시.

```css
.sheet {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  background: var(--card);
  border-radius: 22px 22px 0 0;
  padding: 8px 22px calc(24px + env(safe-area-inset-bottom));
  transform: translateY(100%);
  transition: transform .28s cubic-bezier(.32,.72,0,1);
  z-index: 30;
  max-height: 80%;
  overflow-y: auto;
}
.sheet.on { transform: translateY(0); }

/* 풀 시트 (검색·긴 리스트용) */
.sheet.full {
  height: 72%;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.sheet.full .sheet-head { padding: 14px 22px 12px; flex-shrink: 0; }
.sheet.full .sheet-body { flex: 1; overflow-y: auto; padding: 0 22px 22px; }

/* 시트 손잡이 (grip) */
.sheet-grip {
  width: 36px; height: 4px;
  border-radius: 2px;
  background: rgba(48,42,30,.15);
  margin: 6px auto 12px;
}

/* 시트 제목 */
.sheet-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--ink);
  margin: 0 0 14px;
}
```

**오버레이 (배경 어둠):**
```css
.sheet-scrim {
  position: absolute;
  inset: 0;
  background: rgba(24,20,12,.45);
  z-index: 20;
  opacity: 0;
  visibility: hidden;
  transition: opacity .28s ease, visibility .28s ease;
}
.sheet-scrim.on { opacity: 1; visibility: visible; }
```

**HTML 패턴:**
```html
<div class="sheet-scrim" id="scrim"></div>
<div class="sheet" id="sheet">
  <div class="sheet-grip"></div>
  <h3 class="sheet-title">작물 선택</h3>
  <!-- 콘텐츠 -->
</div>
```

---

### 18-3. 중앙 모달 (`.modal`)

화면 중앙에 뜨는 작은 다이얼로그. 확인·안내·간단 입력.

```css
.modal-scrim {
  position: absolute;
  inset: 0;
  background: rgba(24,20,12,.5);
  z-index: 30;
  display: grid;
  place-items: center;
  padding: 0 28px;
  opacity: 0;
  visibility: hidden;
  transition: opacity .28s ease, visibility .28s ease;
}
.modal-scrim.on { opacity: 1; visibility: visible; }

.modal {
  width: 100%;
  max-width: 320px;
  background: var(--card);
  border-radius: 22px;
  padding: 28px 24px 20px;
  text-align: center;
  transform: scale(.92);
  transition: transform .28s cubic-bezier(.22,1,.36,1);
  box-shadow: 0 18px 40px -10px rgba(36,30,18,.4);
}
.modal-scrim.on .modal { transform: scale(1); }

.modal-ic {
  width: 56px; height: 56px;
  margin: 0 auto 14px;
  border-radius: 50%;
  background: var(--green-soft);
  color: var(--green);
  display: grid;
  place-items: center;
}
.modal-ic svg { width: 28px; height: 28px; }

.modal-title {
  font-size: 17px;
  font-weight: 800;
  color: var(--ink);
  margin: 0 0 8px;
}

.modal-desc {
  font-size: 14px;
  color: var(--ink-2);
  line-height: 1.5;
  margin: 0 0 22px;
}

.modal-actions {
  display: flex;
  gap: 8px;
}
.modal-actions .btn { flex: 1; height: 46px; font-size: 14.5px; }
```

**HTML 패턴:**
```html
<div class="modal-scrim" id="scrim">
  <div class="modal">
    <div class="modal-ic"><svg>...</svg></div>
    <h3 class="modal-title">회원 탈퇴 확인</h3>
    <p class="modal-desc">정말 탈퇴하시겠어요?</p>
    <div class="modal-actions">
      <button class="btn btn-line">취소</button>
      <button class="btn btn-primary">탈퇴</button>
    </div>
  </div>
</div>
```

---

### 18-4. 공통 인터랙션 원칙

- 진입: 시트는 `translateY(100% → 0)`, 모달은 `scale(.92 → 1)`
- 시간: `.28s cubic-bezier(.32,.72,0,1)` (자연스러운 감속)
- 오버레이 색: `rgba(24,20,12,.45~.5)` (모달은 더 어둡게)
- 닫기:
  - 시트: 시트 외부 탭 OR 위로 슬라이드 (선택)
  - 모달: 버튼 탭 OR 시각 외부 탭 (선택)
- ESC 키는 데스크탑에선 닫기 동작 (선택 구현)

---

## 부록: 변경 이력

| 버전 | 날짜 | 핵심 변경 |
|---|---|---|
| v1 | 초기 | 기본 토큰·홈 화면 기준 |
| v2 | 메인 홈 고도화 세션 | 히어로·시세·피드 칩·전문가 톤 |
| **v3** | 2026-05-29 | **45개 화면 감사 기반 컴포넌트 표준화. 1단계: AUDIT_SUMMARY.md 참조** |
