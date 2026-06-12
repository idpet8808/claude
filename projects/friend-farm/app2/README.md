# 농사친구 (KS팜) — 정적 HTML 프로토타입 (app2)

모바일 앱(390px 프레임) 정적 프로토타입. **45개 화면**, 공통 요소(헤더/앱바/아이콘)를 **단일 소스**로 관리하도록 재구성했습니다.
개발자가 **PHP로 변환**하기 쉽도록, 공통부는 한 곳에서 생성되어 모든 페이지에 동일하게 들어갑니다 (→ PHP `include` 한 줄로 치환 가능).

---

## 1. 빠른 시작

```bash
# 정적 HTML 재생성 (_src → 루트 *.html). node 외 의존성 0.
node build.js

# 로컬 확인 (아이콘 스프라이트가 인라인 주입이라 file:// 도 동작하나, http 권장)
npx http-server -p 8080    # 또는 아무 정적 서버
```

빌드 결과물(`*.html`, `css/`, `js/`, `img/`)만 있으면 그대로 브라우저에서 동작합니다. **빌드물이 곧 산출물**입니다.

---

## 2. 폴더 구조

```
app2/
├── *.html, <도메인>/*.html   ← 빌드 결과물 (45개, 이게 산출물)
├── css/                       ← 공통 + 페이지별 CSS (43개)
│   ├── common.css             ·  디자인 토큰 + .phone 프레임 + .ic 아이콘 사이징
│   ├── components.css         ·  status-bar / appbar / 버튼 등 공통 컴포넌트
│   └── <page>.css             ·  페이지별 스타일
├── js/                        ← 페이지별 동작 JS (7개. 공통 동작 없음)
├── img/
│   └── icons.svg              ← ★ 단일 아이콘 스프라이트 (104 심볼, 28KB)
└── _src/                      ← 소스 (빌드 입력)
    ├── layout.html            ← ★ 공통 셸 (head + status-bar + appbar 틀)
    └── pages/<경로>.html      ← 페이지별 (선두 <!--META {json}--> + 본문)
```

빌드/QA 스크립트 (`*.js`)는 §6 참조.

---

## 3. ★ 공통화 핵심 — PHP 변환 가이드

정적 HTML이라 공통부가 각 페이지에 **인라인**되어 있지만, 전부 **한 소스에서 생성**된 것입니다.
PHP 변환 시 아래 3개를 `include`로 빼면 단일 소스가 유지됩니다.

| 정적 HTML의 블록 | 소스 | PHP 변환 |
|------------------|------|----------|
| `<div class="status-bar">…</div>` | `_src/layout.html` + `build.js` `statusBar()` | `include 'partials/status-bar.php'` |
| `<div class="appbar">…</div>` | `build.js` `appBar()` | `include 'partials/appbar.php'` (인자: 제목·뒤로·메뉴·우측액션) |
| `<svg …><defs><symbol>…</svg>` (아이콘 스프라이트) | `img/icons.svg` 에서 **그 페이지가 쓰는 심볼만** 주입 | `include 'partials/sprite.php'` (전체 1회) 또는 `<use href="sprite.svg#id">` |

### 아이콘 처리 (중요)
- 아이콘은 `<svg class="ic"><use href="#i-아이콘"/></svg>` 형태, **내부 참조**(`#id`)를 씁니다.
- 빌드가 각 페이지에 **그 페이지가 실제 쓰는 심볼만** `<defs>`로 인라인 주입합니다.
- ⚠️ **외부 참조(`<use href="icons.svg#id">`)로 바꾸면 `stroke="currentColor"` 아이콘 색이 사라집니다** (외부 SVG는 host의 currentColor 미상속). PHP로 옮길 때도 스프라이트를 **문서 안에 인라인**하거나(권장), 색을 쓰는 아이콘은 내부 참조를 유지하세요.

### 경로 토큰 `{{A}}`
- `_src` 의 자산 경로는 `{{A}}css/…` 처럼 토큰으로 쓰고, 빌드가 페이지 깊이에 맞춰 `../` 개수를 채웁니다 (루트=``, 1뎁스=`../`).
- PHP에서는 `<base>` 또는 절대경로(`/css/…`)로 바꾸면 `{{A}}` 불필요.

### 앱바 메뉴(햄버거) 규칙
- 기본: 앱바 우측에 햄버거(`menu.html` 진입). 하단탭 5개(홈/AI상담/진단/일지/MY)는 home에만.
- 햄버거 **제외** 페이지: 상세(`*-detail`)·진단결과·약관/개인정보/위치 뷰어·인증(`auth/`). (`_src/pages` META의 `"menu":false` 또는 raw 페이지 자체 구조)

---

## 4. 페이지 소스 형식 (`_src/pages/*.html`)

표준 페이지는 **META 주석 + 본문**만 있으면 됩니다. 공통 셸은 빌드가 입힙니다.

```html
<!--META {"title":"공지사항","back":"home.html","menu":true,"css":"notice.css"} -->
<div class="list"> … 본문만 … </div>
```

META 필드: `title`(앱바 제목) · `back`(뒤로 링크, 루트 기준) · `menu`(햄버거 bool) · `right`(우측 액션 raw HTML) · `css`(페이지 CSS 파일) · `js`(페이지 JS) · `appbar:false`(앱바 생략) · `layout:"raw"`(공통 셸 미적용, 전체 커스텀).

`raw` 페이지(10개): index·home·menu·dialogs·진단 위저드(input/followup/loading)·pwchange·검색바 2종. 구조가 표준 셸과 달라 통째로 보존.

---

## 5. 예외 1건 — diagnose-result

`diagnose/diagnose-result.html` 은 **자체 완결** 페이지입니다 (인라인 `<style>` + 자체 아이콘 defs + base64 데모 사진 내장).
공통 css/스프라이트를 쓰지 않고 **원본 그대로** 둡니다. PHP 변환 시 이 페이지만 별도 취급하세요. (나머지 44개는 공통 셸 사용)

---

## 6. 스크립트

| 스크립트 | 용도 | 개발자 필요? |
|----------|------|-------------|
| `build.js` | `_src` → 정적 HTML 45개 생성 | ✅ 빌드 |
| `build-sprite.js` | `img/icons.svg` 재조립 (아이콘 추가 시) | 아이콘 변경 시 |
| `verify.js` | 전 페이지 링크/자산 존재 검증 | QA |
| `check-symbols.js` | 아이콘 참조(#id) 누락 검증 | QA |
| `migrate.js` / `migrate-specials.js` | 구버전(`../app/`) → `_src` 1회 변환 | ❌ (이력 보존용) |

---

## 7. QA 결과 (최종)

- 링크/자산 **0 missing** · 가로 오버플로 **전 45p 0** · 아이콘 심볼 **104개 전부 존재**
- 실제 브라우저(headless chromium) 시각 확인 24p (전 아키타입 + 재사용 CSS·외부 JS·차트·verbatim)
- 발견·수정: diagnose-result 인라인 스타일 유실(→ verbatim 복원), expert-write 칩 스타일 유실(→ 전용 CSS 분리)
