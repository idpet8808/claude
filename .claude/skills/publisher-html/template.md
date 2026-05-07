# publisher-html template — MVP 골격 (M16 — PI-019 A1 정합)

본 template은 `projects/<slug>/04-prototype-mvp/` 디렉토리 부트스트랩용. **P-NNN 폐기 + UI ID 단일 사용** (PI-019 A1 결정).

## 디렉토리 구조

```
04-prototype-mvp/
├── pages/
│   ├── UI-Header_Footer-00.html
│   ├── UI-Login-01.html
│   ├── UI-Member_List-02.html
│   └── UI-{명칭}-{NN}.html
├── assets/
│   ├── tokens/
│   │   ├── colors.css
│   │   ├── spacing.css
│   │   └── typography.css
│   ├── css/
│   │   └── base.css
│   └── js/
│       └── main.js
└── README.md
```

**파일명 규칙** (M9 §1-2-2 갱신, PI-019 정합):
- `pages/<UI-{명칭}-{NN}>.html` — 1 화면 = 1 HTML 파일
- UI ID 정규식: `^UI-[A-Za-z][A-Za-z0-9_]*-\d{2}$`
- 03-ux-spec.md `§1 화면 목록`의 UI ID와 1:1 매핑

## pages/{UI ID}.html 골격

```html
<!-- UI-{명칭}-{NN} / → REQ-{도메인}-NNN-NN, REQ-{도메인}-NNN-NN -->
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{화면명}</title>
  <link rel="stylesheet" href="../assets/tokens/colors.css">
  <link rel="stylesheet" href="../assets/tokens/spacing.css">
  <link rel="stylesheet" href="../assets/tokens/typography.css">
  <link rel="stylesheet" href="../assets/css/base.css">
</head>
<body>
  <!-- {화면 콘텐츠 — 03-ux-spec.md UI-{명칭}-{NN} 시각적 스켈레톤 + Description 그대로 매핑. 화면 가감 권한 없음} -->
  <script src="../assets/js/main.js"></script>
</body>
</html>
```

**예시**:
```html
<!-- UI-Login-01 / → REQ-USR-001-01, REQ-USR-002-01 -->
<!DOCTYPE html>
<html lang="ko">
...
```

**핵심 규칙**:
- HTML 상단 주석은 **단일 진실 원천** (SSoT). 누락 시 자동 실패 (PI-019 정합)
- **REQ 매핑 화면 정규식**: `^<!-- UI-[A-Za-z][A-Za-z0-9_]*-\d{2} / → REQ-[A-Z]{2,4}-\d{3}-\d{2}(, REQ-[A-Z]{2,4}-\d{3}-\d{2})* -->$`
- **전역 화면 예외** (UX-spec `→ 전역 공통` 정합): `<!-- UI-{명칭}-{NN} / → 전역 -->` (예: `<!-- UI-Header_Footer-00 / → 전역 -->`)
- 파일명 = UI ID (M9 §1-2-2 갱신, PI-019)
- **P-NNN 사용 금지** (M16 폐기)
- 화면 콘텐츠는 03-ux-spec.md 시각적 스켈레톤·Description을 *그대로* 매핑 (퍼블리셔 자의 추가·변경 금지 — 화면 가감 권한 없음)

## README.md 골격

```markdown
# {프로젝트명} — MVP 프로토타입

## 화면 매핑 (UI ID ↔ REQ)

| Screen ID | 화면명 | 매핑 REQ | pages/ |
|-----------|--------|----------|--------|
| UI-Header_Footer-00 | 헤더 및 푸터 | (전역 — REQ 무관) | pages/UI-Header_Footer-00.html |
| UI-Login-01 | 로그인 | REQ-USR-001-01, REQ-USR-002-01 | pages/UI-Login-01.html |
| UI-{명칭}-{NN} | {화면명} | REQ-{도메인}-NNN-NN | pages/UI-{명칭}-{NN}.html |

## [NOT APPLICABLE]

본 프로젝트에서 적용되지 않는 항목 (P 영역 NA SSoT 예외 §3-3 I5).
형식: `- REQ-{도메인}-NNN-NN: 사유 1줄` (PRD §B REQ 실제 존재 검증 — F-8).

- REQ-{도메인}-NNN-NN: {사유 1줄}
- REQ-{도메인}-NNN-NN: {사유 1줄}

(NA 항목이 없으면 위 라인 대신 "해당 없음 — NA 항목 0건"으로 명시)
```

## 디자인 토큰 골격 (assets/tokens/)

### colors.css
```css
:root {
  --color-primary: #000000;
  --color-secondary: #666666;
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-border: #e5e5e5;
}
```

### spacing.css
```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 32px;
  --space-xl: 64px;
}
```

### typography.css
```css
:root {
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 24px;
  --font-size-xl: 32px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --line-height-base: 1.5;
}
```

### css/base.css (공통 CSS)
```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size-md);
  line-height: var(--line-height-base);
  color: var(--color-text);
  background: var(--color-bg);
}
```

### js/main.js (공통 JS)
```javascript
// MVP 프로토타입 공통 스크립트 — 시연용 mock 인터랙션만
// 실제 API 연결은 v1.1 Production 모드에서 정식화

document.addEventListener('DOMContentLoaded', () => {
  console.log('MVP prototype loaded');
});
```

## 사용 흐름 (퍼블리셔 에이전트가 따름 — M16 정합)

1. 03-ux-spec.md `§1 화면 목록` read → 모든 UI-{명칭}-{NN} 식별 (1:1 매핑 대상)
2. 본 template로 골격 부트스트랩 (assets/ + README.md)
3. assets/ S 무관 선행 작성 가능 (§4-0 (v))
4. 03-ux-spec.md `§2 화면 명세` 부분 broadcast 받자마자 해당 화면 HTML 부분 진행 (§4-0 (ii))
5. 각 HTML 파일 = `pages/<UI-{명칭}-{NN}>.html` 형식 + 상단 주석 `<!-- UI-{명칭}-{NN} / → REQ-{도메인}-NNN-NN -->`
6. README.md 매핑 표 갱신 (Screen ID + REQ + pages/)
7. NA 항목 발견 시 NA list 추가 (REQ-{도메인}-NNN-NN 형식)

## 변경 이력

- (2026-05-07) **M16 진입** — P-NNN 폐기 (PI-019 A1) + UI ID 단일 사용 + 파일명 UI ID 기반 + REQ 4 segment 매핑. 격차 7 정정.
- (이전) M9·M13 — P-NNN + slug 파일명 + 3자리 REQ (M16에서 폐기).
