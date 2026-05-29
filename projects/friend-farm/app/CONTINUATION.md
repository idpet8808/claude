# 변환 진행 상태 — 다음 세션 인수인계

> **마지막 갱신**: 2026-05-29
> **완성**: 29 / 45 페이지
> **남은 작업**: 16 페이지

---

## ✅ 완성 (29 페이지)

### 루트 (3)
- `index.html` — 진입(시작하기) (← `ksfarm_onboarding_entry_mo_hybrid.html`)
- `home.html` — 메인 홈 (← `ksfarm_main_mo_hybrid.html`)
- `menu.html` — 전체 메뉴 드로어 (← `ksfarm_menu_mo_hybrid.html`)

### auth/ (4/4 ✅)
- `login.html`, `signup-terms.html`, `signup.html`, `find-account.html`

### farm/ (4/4 ✅)
- `farmlist.html`, `farm-detail.html`, `farm-register.html`, `farm-edit.html`
- (farm-edit는 farm-register.css·js 공유)

### mypage/ (9/9 ✅)
- `mypage.html`, `editprofile.html`, `pwchange.html`, `settings.html`
- `noti-setting.html`, `marketing-consent.html`
- `terms-view.html`, `privacy-view.html`, `location-view.html`
- (약관 뷰어 3종은 `terms-view.css` 공유)

### cs/ (5/5 ✅)
- `notice.html`, `notice-detail.html`
- `inquiry-list.html`, `inquiry-detail.html`, `inquiry-write.html`

### expert/ (3/3 ✅)
- `expert-list.html`, `expert-detail.html`, `expert-write.html`
- (expert-write는 inquiry-write.css 재사용)

### cropguide/ (1/2)
- `cropguide-list.html` ✅
- ⚠️ `cropguide-detail.html` 미완성

---

## ⚠️ 남은 작업 (16 페이지)

### cropguide/ 잔여 1
| 출력 | 원본 | 비고 |
|---|---|---|
| `cropguide-detail.html` | `ksfarm_cropguide_detail_mo_hybrid.html` | 5탭 sticky (개요·생육·재배·병해·수확) + 작물 일러스트 |

### pestsearch/ 3
| 출력 | 원본 |
|---|---|
| `pestsearch-home.html` | `ksfarm_pestsearch_home_mo_hybrid.html` |
| `pestsearch-search.html` | `ksfarm_pestsearch_search_mo_hybrid.html` |
| `pestsearch-detail.html` | `ksfarm_pestsearch_detail_mo_hybrid.html` |

### diagnose/ 4 ⭐ KS팜 시그니처
| 출력 | 원본 | 비고 |
|---|---|---|
| `diagnose-input.html` | `ksfarm_diagnose_input_mo_hybrid.html` | 대화형 4스텝 (작물·증상·시기·사진) |
| `diagnose-loading.html` | `ksfarm_diagnose_loading_mo_hybrid.html` | 펄스 링 + 분석 단계 |
| `diagnose-followup.html` | `ksfarm_diagnose_followup_mo_hybrid.html` | 추가 질문 (확신 부족 시) |
| `diagnose-result.html` | `ksfarm_diagnose_result_mo_hybrid.html` | 사진 슬라이더 + 신뢰도 + 본문 |

### support/ 2
| 출력 | 원본 |
|---|---|
| `support-list.html` | `ksfarm_support_list_mo_hybrid.html` |
| `support-detail.html` | `ksfarm_support_detail_mo_hybrid.html` |

### price/ 2
| 출력 | 원본 | 비고 |
|---|---|---|
| `pricehome.html` | `ksfarm_pricehome_mo_hybrid.html` | Chart.js 라인 차트 |
| `pricesearch.html` | `ksfarm_pricesearch_mo_hybrid.html` | KAMIS 검색 |

### diary/ 3
| 출력 | 원본 | 비고 |
|---|---|---|
| `diary-list.html` | `ksfarm_diary_list_mo_hybrid.html` | 월 달력 + 일지 카드 |
| `diary-write.html` | `ksfarm_diary_write_mo_hybrid.html` | 작성 1/2 (농장·작물·작업·사진) |
| `diary-write2.html` | `ksfarm_diary_write2_mo_hybrid.html` | 작성 2/2 (생육·자재·상세) |

### 루트 추가 1
| 출력 | 원본 |
|---|---|
| `dialogs.html` | `ksfarm_dialogs_mo_hybrid.html` |

---

## 누적 자산 구조

```
app/
├── _css/                   # 공통(2) + 페이지별(28)
│   ├── common.css          # 디자인 토큰 + .phone 기본 (45/45 공통)
│   ├── components.css      # .appbar·.status-bar·.foot·.btn-submit (10+ 페이지)
│   ├── index.css, login.css, home.css, ...
│   └── ...
├── _js/                    # sprite.js + 페이지 JS
│   ├── sprite.js           # (참고용, 신규 페이지는 인라인 SVG 사용)
│   ├── login.js, home.js, signup-terms.js, ...
│   └── ...
├── _img/
│   └── icons.svg           # SVG 원본 (디자인 참조)
├── auth/      (4)
├── farm/      (4)
├── mypage/    (9)
├── cs/        (5)
├── expert/    (3)
├── cropguide/ (1)
├── pestsearch/  ← 폴더 비어있음
├── diagnose/    ← 폴더 비어있음
├── support/     ← 폴더 비어있음
├── price/       ← 폴더 비어있음
├── diary/       ← 폴더 비어있음
├── index.html, home.html, menu.html
└── CONTINUATION.md (이 파일)
```

---

## 🔧 변환 패턴 (남은 16 페이지 적용)

### 패턴 (각 페이지 동일)

```html
<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>KS팜 — {화면명}</title>
<link rel="stylesheet" href="../_css/common.css"/>      <!-- 토큰·.phone -->
<link rel="stylesheet" href="../_css/components.css"/>  <!-- .appbar·.status-bar·.foot·.btn-submit -->
<link rel="stylesheet" href="../_css/{name}.css"/>      <!-- 페이지 고유 -->
</head>
<body>
  <svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <!-- 원본 SVG <symbol> 그대로 인라인 -->
  </defs></svg>

  <!-- 원본 .phone 구조 그대로 -->
  <div class="phone">...</div>

  <script>
    /* 원본 inline JS 또는 _js/{name}.js로 분리 */
  </script>
</body>
</html>
```

### 단계
1. **CSS 추출**: 원본 `<style>` → `_css/{name}.css` 그대로 (components.css가 제공하는 `.appbar`·`.status-bar`·`.foot`·`.btn-submit`만 생략 가능)
2. **HTML 골격**: `<link>` 3개 + 인라인 SVG + 콘텐츠 + 인라인 `<script>`
3. **내부 링크**: `<a href="#">` → 실제 경로 (예: `../home.html`, `expert-detail.html`, `../farm/farmlist.html`)
4. **인라인 SVG**: 원본 `<svg><defs><symbol>` 그대로 보존 (sprite.js 의존 X)

### 카테고리 폴더 내 페이지의 경로 컨벤션
- CSS·JS·이미지: `../_css/`, `../_js/`, `../_img/`
- 같은 카테고리 내: `{name}.html`
- 다른 카테고리: `../{folder}/{name}.html`
- 루트로: `../index.html`, `../home.html`, `../menu.html`

---

## 📋 페이지 간 네비게이션 추정 (남은 페이지 변환 시)

- 진단: `home.html → diagnose-input.html → diagnose-loading.html → (필요시) diagnose-followup.html → diagnose-result.html`
- 일지: `home.html → diary-list.html → diary-write.html → diary-write2.html → diary-list.html`
- 시세: `home.html → pricehome.html → pricesearch.html`
- 지원사업: `home.html → support-list.html → support-detail.html`
- 병해충 검색: `home.html → pestsearch-home.html → pestsearch-search.html → pestsearch-detail.html`
- 재배 가이드 상세: `cropguide-list.html → cropguide-detail.html`
- 다이얼로그 모음: `menu.html → dialogs.html` (또는 컴포넌트 카탈로그용 별도 진입)

---

## ✅ 시연 가능 동선 (현재 29 페이지)

1. **온보딩·인증 전체**: index → auth/login → home / auth/signup-terms → signup → home
2. **농장 관리 전체**: home → farm/farmlist → farm-detail → (액션시트) → farm-edit → farm-detail
3. **마이/설정 전체**: home → mypage/mypage → editprofile → pwchange / settings → noti-setting/marketing-consent / 약관 뷰어 3종
4. **고객지원 전체**: home → cs/notice → notice-detail / mypage → cs/inquiry-list → inquiry-detail / inquiry-write
5. **전문가 Q&A**: home → expert/expert-list → expert-detail → (액션시트) / expert-write
6. **재배 가이드**: home → cropguide/cropguide-list (상세는 미작성)
7. **전체메뉴 드로어**: home → menu (모든 카테고리 진입점)

---

## 🚀 다음 세션 진입 명령

```
"app/CONTINUATION.md 읽고 남은 16 페이지 변환 이어서.
우선순위: diagnose 4 (시그니처) → diary 3 → price 2 → cropguide-detail → pestsearch 3 → support 2 → dialogs"
```

---

## 💡 디자인 가이드 (참고)

- **디자인 시스템 spec**: `_source/ksfarm_final/KSFARM_DESIGN_SYSTEM.md`
- **시각 카탈로그**: `_source/ksfarm_final/ksfarm_design_guide.html`
- **원본 인덱스**: `_source/ksfarm_final/OUTPUTS_SUMMARY.md`

원칙: *"토큰·기본 컴포넌트는 그대로 따르되, 레이아웃·여백·세부 사이즈는 화면 의도에 맞춰 자유롭게"*
