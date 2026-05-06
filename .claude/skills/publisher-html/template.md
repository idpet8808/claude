# publisher-html template — MVP 골격

본 template은 `projects/<slug>/04-prototype-mvp/` 디렉토리 부트스트랩용. M9-2-e 결정 정합.

## 디렉토리 구조

```
04-prototype-mvp/
├── pages/<slug>.html
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

## pages/<slug>.html 골격

```html
<!-- P-{NNN} / → REQ-{XXX}, REQ-{YYY} -->
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
  <!-- {화면 콘텐츠 — 03-ux-spec.md 화면 명세 그대로 매핑. 화면 가감 권한 없음} -->
  <script src="../assets/js/main.js"></script>
</body>
</html>
```

**핵심 규칙**:
- HTML 상단 주석은 **단일 진실 원천** (SSoT). 누락 시 자동 실패.
- 파일명 = slug만 (P-NNN 파일명 미포함, M9 §1-2-2)
- 화면 콘텐츠는 03-ux-spec.md 명세를 *그대로* 매핑 (퍼블리셔 자의 추가·변경 금지)

## README.md 골격

```markdown
# {프로젝트명} — MVP 프로토타입

## 화면 매핑 (P-NNN ↔ REQ)

| P-NNN | 화면명 | 매핑 REQ | pages/ |
|-------|--------|---------|--------|
| P-001 | {화면명} | REQ-XXX, REQ-YYY | pages/{slug}.html |

## [NOT APPLICABLE]

본 프로젝트에서 적용되지 않는 항목 (P 영역 NA SSoT 예외 §3-3 I5).
형식: `- REQ-NNN: 사유 1줄` (PRD REQ 실제 존재 검증 — F-8).

- REQ-XXX: {사유 1줄}
- REQ-YYY: {사유 1줄}

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

## 사용 흐름 (퍼블리셔 에이전트가 따름)

1. 03-ux-spec.md 화면 목록 read → 화면 수 N개 파악
2. 본 template로 골격 부트스트랩 (pages/N개·assets/·README.md)
3. assets/ S 무관 선행 작성 가능
4. S broadcast 수신 후 pages/<slug>.html 본격 작업
5. 각 HTML 파일 생성 시 P-NNN 발급 + 상단 주석
6. README.md 매핑 표 갱신
7. NA 항목 발견 시 NA list 추가
