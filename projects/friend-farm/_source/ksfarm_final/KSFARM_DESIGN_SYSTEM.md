# KS팜 'AI 농사친구' — 디자인 시스템

> **이 문서의 위치**: 45개 화면 분석에서 **실제로 거의 모든 화면이 같은 값을 쓰는 것**만 모은 디자인 시스템. 화면마다 의도적으로 다르게 정한 것(버튼 크기, 여백, scroll padding 등)은 포함하지 않는다.
>
> **사용 원칙**: 새 화면 만들 때 토큰과 기본 컴포넌트만 따르되, **레이아웃·여백·세부 사이즈는 화면 의도에 맞춰 자유롭게**. 기존 화면을 사후 통일하지 않는다.

---

## 0. 컨셉

**"미니멀(토스급 명료함) 구조 + 어스톤(KS팜다운 따뜻함) 팔레트"**

플랫폼: 모바일 (세로, ~390px 기준).

---

## 1. 컬러 토큰 (45/45 화면 공통)

```css
:root, .phone {
  /* 중립 */
  --bg:        #ECEAE0;   /* 앱 배경 */
  --card:      #FFFFFF;
  --ink:       #20251D;   /* 본문 진한 텍스트 */
  --ink-2:     #45493E;   /* 보조 텍스트 */
  --gray:      #76796C;   /* 캡션·뮤트 */

  /* 메인 (딥틸-포레스트) */
  --green:     #1F4B3C;   /* 주 브랜드/CTA */
  --green-soft:#E7EEE6;

  /* 어스 액센트 */
  --clay:      #B0612C;   /* 테라코타 — 강조/경고 */
  --gold:      #B08A3E;   /* 골드 — 라벨 */
  --field-bg:  #F4F4EF;   /* 입력 필드 배경 */
  --sage:      #2F6150;   /* 보조 그린 */

  /* 둥글기 */
  --r-lg:      18px;
  --r-md:      14px;
}
```

**`--line` (구분선)는 화면별로 다름** — `.06` / `.08` / `.10` / `.12` 4가지 값을 화면 의도에 맞춰 사용. 기본 권장 `rgba(48,42,30,.10)` (가장 많이 쓰임), 더 연한 구분 필요할 땐 `.08`, 더 진한 강조엔 `.12`.

```css
--line: rgba(48,42,30,.10);   /* 화면 의도에 맞춰 .06~.12 사용 */
```

---

## 2. 컬러 사용 원칙

| 용도 | 변수 |
|---|---|
| 앱 전체 배경 | `--bg` |
| 카드·시트·모달 배경 | `--card` |
| 본문 진한 텍스트 (h1/h2/강조) | `--ink` |
| 본문 회색 (설명·보조) | `--ink-2` |
| 캡션·날짜·뮤트 | `--gray` |
| 주요 CTA·강조 | `--green` |
| 그린 배경 (선택·뱃지) | `--green-soft` |
| 경고·테라코타 강조 | `--clay` |
| 라벨·금색 | `--gold` |
| 입력 필드 배경 | `--field-bg` |

---

## 3. 타이포그래피

```css
font-family: -apple-system, BlinkMacSystemFont, "Pretendard",
             "Noto Sans KR", "Apple SD Gothic Neo", sans-serif;
word-break: keep-all;
-webkit-font-smoothing: antialiased;
```

큰 텍스트에는 `letter-spacing: -0.01em` 권장.

---

## 4. 폰 프레임 (`.phone`) — 공통 속성만

거의 모든 화면이 공유하는 속성:

```css
.phone {
  width: min(390px, 100%);
  background: var(--bg);
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 18px 44px -12px rgba(40,34,22,.42);
  display: flex;
  flex-direction: column;
}
```

**화면 의도에 맞춰 자유롭게:**
- `min-height` — 화면 콘텐츠 양에 따라 800~900px 자유 (데스크탑 미리보기용일 뿐, 실제 디바이스 무관)
- `position`, `border`, 추가 그림자 등 — 화면 특성에 따라
- 온보딩 진입 같은 특수 화면은 그라데이션 배경 등 자유

---

## 5. 앱바 (`.appbar`) — 공통

```css
.appbar {
  display: flex;
  align-items: center;
  padding: 4px 12px 0;
}
```

`flex-shrink: 0` 추가는 선택(스크롤 길어질 화면에서 권장).

---

## 6. 푸터 (`.footer`) — 공통 (사용하는 화면만)

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

## 7. 버튼 — 화면별 의도 존중

기본 원칙만 공유, **세부 크기는 화면에 맞춰** 정함:

```css
/* 공통 원칙 */
.btn {
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: var(--green);   /* 단색 기본 */
  color: #fff;
}
```

**자유롭게 조정:**
- `height`: 48~54px (CTA 비중에 따라)
- `border-radius`: 14~15px
- `font-size`: 14.5~16px
- 단색 vs 그라데이션 (히어로급 CTA는 그라데이션 OK)

---

## 8. 칩 — 두 패턴 (각 화면 의도대로)

### 선택형 (카드형 큰 칩 — 작물·증상 선택)
큰 카드 형태, 선택 시 딥틸 테두리 + green-soft 배경.

### 태그형 (pill 작은 칩 — 필터·키워드)
pill 형태, 선택 시 딥틸 배경 + 흰 글자.

구체 사이즈·radius는 화면 의도대로.

---

## 9. 일반 원칙

### 디자인 톤
- **주인공 하나에 집중** (나열 X)
- **비율·위계·호흡으로 채움**
- **위계**: 새 정보가 주인공, 이미 아는 정보는 작게
- **장식은 의미 있을 때만**

### UX 패턴
- **자동 다음 진행보다 명시적 "다음" 버튼**
- **카드 4개 이상 연속 → 텍스트 흐름**(border-top 구분선)으로
- **선택지 多·검색 → 바텀시트**
- **확인·안내 → 중앙 모달**

### 아이콘
- SVG 사용 (font 아이콘 ❌)
- `width`/`height`로 크기 (font-size ❌)
- `currentColor` + `stroke="currentColor"` 권장
- 표준 viewBox: `0 0 24 24`, stroke 1.8~2.2

### 시세 등락 (특수)
**농민 관점**: 가격 상승 → 테라코타(상승=화려), 가격 하락 → 차분한 그린.
일반 주식 앱과 반대 색을 의도적으로 사용.

---

## 10. 사용 / 회피 패턴

### ✅ 권장
- 토큰 변수로 컬러 참조
- SVG 아이콘 width/height 명시
- 의도 있는 곳에 의도 있는 디테일

### ❌ 회피
- 인라인 hex 컬러 (그라데이션 stop 예외)
- 본문에 진하지 않은 회색 (`#999` 같은 것)
- 카드 4개 이상 연속 (텍스트 흐름으로)
- 아이콘 폰트 사이즈로 크기 조절
- **이미 잘 맞춰진 화면을 사후 일괄 통일** ← 이번 세션 교훈

---

## 부록: 화면별로 다른 항목 (디자인 시스템 비대상)

**다음 항목은 화면마다 의도가 있어서 통일하지 않음**:

| 항목 | 화면별 변형 이유 |
|---|---|
| `--line` 값 (.06~.12) | 화면별 구분선 강도 의도 |
| `.phone min-height` | 화면 콘텐츠 양 |
| `.phone border-radius`·`border` | 홈 화면 등 특수 디자인 |
| `.scroll padding` | 화면 구조(footer 유무·FAB 등) |
| `.btn height`·`radius`·`font-size` | CTA 비중·화면 위계 |
| `.btn-primary` 단색/그라데이션 | 강조 정도 |

이 항목들은 **새 화면 만들 때 가장 가까운 기존 화면을 참고**하면 됨.
