# KS팜 hybrid 컴포넌트 감사 보고서 (1단계)

**감사 대상**: 45개 hybrid 화면 (`*_mo_hybrid.html`)
**날짜**: 2026-05-29
**목적**: 컴포넌트 변형을 모아 표준 사양 결정의 근거 마련

---

## 1. 컬러·디자인 토큰

### ✅ 일치 (전 화면 통일)
모든 핵심 컬러 토큰은 통일됨:
- `--bg #ECEAE0` · `--card #FFFFFF` · `--ink #20251D` · `--ink-2 #45493E` · `--gray #76796C`
- `--green #1F4B3C` · `--green-2 #163729` · `--green-soft #E7EEE6`
- `--clay #B0612C` · `--field-bg #F4F4EF` · `--sage #2F6150` · `--gold #B08A3E`
- `--r-lg 18px` · `--r-md 14px` · `--shadow 0 1px 2px rgba(36,30,18,.05)`

### 🔴 불일치
| 토큰 | 변형 | 빈도 |
|---|---|---|
| `--line` | `rgba(48,42,30,.08)` | 25개 |
| | `rgba(48,42,30,.10)` | 17개 |
| | `rgba(48,42,30,.12)` | 2개 |
| | `rgba(48,42,30,.06)` | 1개 |

**🎯 표준 제안**: `--line: rgba(48,42,30,.08)` (가장 많은 빈도, 적절한 대비)

---

## 2. `.phone` (모바일 프레임 컨테이너)

전체 변형: **17가지**. 대부분 사소한 차이(공백·줄바꿈)지만 의미 있는 차이도 있음.

### 빈도 상위 변형 (정규화 후)
| # | 빈도 | 핵심 차이 |
|---|---|---|
| 1 | 18개 | `position: relative; width: min(390px, 100%); background: var(--bg); border-radius: 30px; overflow: hidden; box-shadow: 0 18px 44px -12px rgba(40,34,22,.42); min-height: 844px; display: flex; flex-direction: column;` ← **표준 후보** |
| 2 | 9개 | 위와 동일하나 `position: relative` 누락 |
| 3 | 1개 | `linear-gradient` 배경 (온보딩만, 의도적) |
| 4 | 1개 | `width: 100%` (전체 화면 모드?) |
| 기타 | 다양 | min-height 820/844/860, border-radius 28/30/40, border 유무 |

### 🎯 표준 제안
```css
.phone {
  position: relative;
  width: min(390px, 100%);
  background: var(--bg);
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 18px 44px -12px rgba(40,34,22,.42);
  min-height: 844px;
  display: flex;
  flex-direction: column;
}
```
**예외 허용**: 온보딩 진입(딥틸 그라데이션 배경) — 별도 클래스 또는 인라인 변형

---

## 3. `.scroll` (본문 스크롤 영역) — **가장 큰 불일치**

전체 변형: **21가지**. 주요 차이는 padding (좌우 20/22/24px, 상 0/4/6/8/14/16/22/30px, 하 14/20/24/30/32/40/90/100px).

### 빈도 상위 변형
| # | 빈도 | padding |
|---|---|---|
| 1 | 9개 | `8px 20px 24px` ← 가장 많음 |
| 2 | 4개 | `14px 22px 40px` |
| 3 | 3개 | `8px 20px 30px` |
| 4 | 2개 | `16px 20px 24px` |
| 5 | 1개 | `16px 20px 32px` (결과 화면, overflow-x: hidden 추가됨) |
| 기타 | 다양 | 14/22, 8/22 100, 등 |

### 분석
- **좌우 20px가 표준** (대부분), 22/24px는 일부 예외
- **상단 8px가 가장 많음**, 14px도 자주 (앱바와 거리)
- **하단**은 footer 있는 화면 vs 없는 화면 차이:
  - footer 있음 → 24~32px
  - footer 없음 → 40~100px (하단 여유)
- **`flex: 1; overflow-y: auto;` 빠진 정의가 일부 있음** (4개) — 버그성

### 🎯 표준 제안
```css
.scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;  /* 가로 스크롤 방지 (진단 결과 슬라이더처럼) */
  padding: 8px 20px 24px;  /* footer 있을 때 기본값 */
}
```
**변형 허용**:
- 하단 여유 필요한 화면(footer 없음): `padding: 8px 20px 90px` (FAB 등 떠 있을 때)
- 상단 여유 필요한 화면(앱바 없이 시작): `padding: 22px 20px 24px`

---

## 4. `.appbar` (상단 앱바)

전체 변형: **3가지**. 거의 동일.

| # | 빈도 | 본문 |
|---|---|---|
| 1 | 24개 | `display: flex; align-items: center; padding: 4px 12px 0; flex-shrink: 0;` |
| 2 | 12개 | `display: flex; align-items: center; padding: 4px 12px 0;` (flex-shrink 누락) |
| 3 | 1개 | 위 + `position: relative; z-index: 1` |

### 🎯 표준 제안
```css
.appbar {
  display: flex;
  align-items: center;
  padding: 4px 12px 0;
  flex-shrink: 0;
}
```
`flex-shrink: 0` 누락은 버그 (스크롤 콘텐츠 많을 때 앱바가 줄어들 수 있음) → 통일 필요.

---

## 5. `.btn` (기본 버튼)

전체 변형: **6가지**. height(48/52/54), border-radius(14/15/var), font-size(14.5/15/16) 차이.

### 빈도 상위
| # | 빈도 | height | border-radius | font-size |
|---|---|---|---|---|
| 1 | 2개 | 54px | 15px | 16px |
| 2 | 1개 | 48px | var(--r-md)=14px | 14.5px |
| 3 | 1개 | 52px | 14px | 15px |
| 4 | 1개 | 52px | 14px | 15px (flex: 1) |
| 5 | 1개 | 52px | var(--r-md) | 15px |
| 6 | 1개 | 54px | var(--r-md) | 15px (width: 100%) |

### 분석
- **height 52px가 합리적** (모바일 터치 타깃 최소 48px 초과)
- **border-radius는 var(--r-md)=14px 권장** (디자인 시스템 토큰 일관성)
- **font-size 15px가 다수**
- 일부 화면이 54px·radius 15·font 16 사용 — 큰 버튼? 의도 확인 필요

### 🎯 표준 제안
```css
.btn {
  height: 52px;
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

---

## 6. `.btn-primary` (주요 CTA)

전체 변형: **3가지**.

| # | 본문 |
|---|---|
| 1 | `flex: 1; background: var(--green); color: #fff;` (단색) |
| 2 | `background: var(--green); color: #fff;` (단색) |
| 3 | `background: linear-gradient(180deg, #2C6150, var(--green) 52%, var(--green-2)); color: #fff; box-shadow: inset 0 1px 0 rgba(255,255,255,.22)` (그라데이션) |

### 🎯 표준 결정 필요
- **A안**: 단색 `var(--green)` — 토스·당근식 미니멀
- **B안**: 그라데이션 + inset highlight — 더 풍부한 질감

**제안: A안 (단색)** — hybrid 톤(미니멀)에 맞고 대부분 단색 사용

---

## 7. `.card` (카드)

전체 변형: **2가지** — 거의 일관.
- 1개: `border: 1px solid var(--line)` 추가
- 1개: border 없이 shadow만

### 🎯 표준 제안: shadow만 사용 (border 없이)

---

## 8. `.chip` (선택 칩)

전체 변형: **2가지**. 의도적으로 다름:
- **선택형 칩**(작물/증상 등): `padding: 13px 17px; border-radius: 13px; background: var(--card); box-shadow; border: 1.5px solid transparent;` (큰 사이즈, 카드형)
- **태그형 칩**(필터): `height: 36px; padding: 0 15px; border-radius: 999px; background: var(--field-bg); font-size: 13.5px;` (작은 사이즈, pill형)

### 🎯 별도 클래스로 분리 추천
- `.chip-select`: 선택형 (카드형 큰 사이즈)
- `.chip-tag`: 태그형 (pill 작은 사이즈)

---

## 9. `.footer` (하단 고정 영역)

전체 변형: **2가지** — 거의 일관.
- 4개: `padding: 14px 20px calc(14px + env(safe-area-inset-bottom)); background: var(--bg); border-top: 1px solid var(--line); display: flex; ...`
- 1개: `display: flex` 빠짐

### 🎯 표준 제안
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

## 10. 정의 빈도가 0인 컴포넌트
다음은 일반화된 클래스 정의 없이 화면별 인라인 또는 다른 이름으로 사용 중:
- `.input` (입력 필드) — 화면마다 다른 이름·구조
- `.btn-line` (보조 버튼) — 일관성 없음
- `.tag` (작은 배지) — 화면마다 다른 구조

→ 표준 컴포넌트로 추가 필요

---

# 의사결정 필요 항목 (요약)

| # | 항목 | 결정 필요한 내용 |
|---|---|---|
| 1 | `--line` 값 | `.08` (다수) 권장 |
| 2 | `.phone` 표준 | 18개 화면 빈도 1위 형태로 통일 권장 |
| 3 | `.scroll` padding | `8px 20px 24px` 기본 + 예외 정책 |
| 4 | `.scroll` overflow-x | `hidden` 추가 권장 (가로 스크롤 방지) |
| 5 | `.appbar` flex-shrink | `0` 추가 통일 |
| 6 | `.btn` height | **52px vs 54px 결정 필요** |
| 7 | `.btn-primary` 배경 | **단색(A) vs 그라데이션(B) 결정 필요** |
| 8 | `.card` border | 없이 shadow만 |
| 9 | `.chip` | `.chip-select` / `.chip-tag` 분리 |
| 10 | 누락 컴포넌트 | `.input`/`.btn-line`/`.tag` 표준 정의 추가 |

---

## 다음 단계 (2단계)
이 보고서 보고 위 10개 항목 결정 → 디자인 시스템 문서 v3 작성 → 어긋난 화면 매핑 → 일괄 수정
