# KS팜 'AI 농사친구' — 전체 산출물

> **마지막 업데이트**: 2026-05-29
> **총 파일**: 85개

---

## 📋 카테고리 요약

| 카테고리 | 개수 | 위치 |
|---|---|---|
| 📚 문서 & 디자인 가이드 | 3 | 루트 |
| 📱 확정 hybrid 화면 (v2 톤) | 45 | `ksfarm_*_mo_hybrid.html` |
| 🆚 비교 목업·데모·변형 | 37 | 기타 .html |

---

## 1. 📚 문서 & 디자인 가이드

### ⭐ 핵심 산출물

| 파일 | 역할 |
|---|---|
| **`KSFARM_DESIGN_SYSTEM.md`** | 디자인 시스템 사양서. 45개 화면 분석에서 진짜 공통인 것만. **새 화면 만들 때 기준**. |
| **`ksfarm_design_guide.html`** | 시각적 디자인 가이드 (브라우저로 열기). 14개 섹션, 공통(🟢)/변형(🟡) 명확 구분. |
| `KSFARM_OUTPUTS_INDEX.md` | 산출물 상세 인덱스. 작업 과정·의사결정·미해결 사항. |

### 디자인 시스템 사용 원칙

1. **토큰과 공통 컴포넌트는 그대로 따른다** — 컬러·타이포·기본 컨테이너
2. **레이아웃·여백·세부 사이즈는 화면 의도에 맞춰 자유롭게** — 화면마다 정보 위계가 달라 통일하면 안 됨
3. **이미 잘 맞춰진 화면을 사후 일괄 통일하지 않는다** — 디자인 시스템은 새 화면 만들 때만 참고

---

## 2. 📱 확정 hybrid 화면 (45개)

영역별 정리. 파일명 패턴: `ksfarm_{영역}_mo_hybrid.html`.

### 온보딩 / 인증 (5)
| 파일 | 화면 |
|---|---|
| `ksfarm_onboarding_entry_mo_hybrid.html` | 진입 — 딥틸 그라데이션 |
| `ksfarm_login_mo_hybrid.html` | 로그인 |
| `ksfarm_signup_terms_mo_hybrid.html` | 회원가입 1/2 — 약관 동의 |
| `ksfarm_signup_mo_hybrid.html` | 회원가입 2/2 — 정보 입력 |
| `ksfarm_findaccount_mo_hybrid.html` | 계정 찾기 |

### 홈 / 내비 (2)
| 파일 | 화면 |
|---|---|
| `ksfarm_main_mo_hybrid.html` | ⭐ 메인 홈 — 히어로·시세·전문가 답변·피드 |
| `ksfarm_menu_mo_hybrid.html` | 전체메뉴 드로어 |

### 마이페이지 / 설정 (9)
| 파일 | 화면 |
|---|---|
| `ksfarm_mypage_mo_hybrid.html` | 마이페이지 |
| `ksfarm_editprofile_mo_hybrid.html` | 프로필 수정 |
| `ksfarm_pwchange_mo_hybrid.html` | 비밀번호 변경 |
| `ksfarm_settings_mo_hybrid.html` | 환경설정 |
| `ksfarm_noti_setting_mo_hybrid.html` | 알림 설정 |
| `ksfarm_marketing_consent_mo_hybrid.html` | 마케팅 동의 |
| `ksfarm_terms_view_mo_hybrid.html` | 이용약관 |
| `ksfarm_privacy_view_mo_hybrid.html` | 개인정보처리방침 |
| `ksfarm_location_view_mo_hybrid.html` | 위치기반 약관 |

### 고객지원 (5)
| 파일 | 화면 |
|---|---|
| `ksfarm_notice_mo_hybrid.html` | 공지사항 목록 |
| `ksfarm_notice_detail_mo_hybrid.html` | 공지사항 상세 |
| `ksfarm_inquiry_list_mo_hybrid.html` | 1:1문의 목록 |
| `ksfarm_inquiry_detail_mo_hybrid.html` | 1:1문의 상세 |
| `ksfarm_inquiry_write_mo_hybrid.html` | 1:1문의 작성 |

### 농장 관리 (4)
| 파일 | 화면 |
|---|---|
| `ksfarm_farmlist_mo_hybrid.html` | 농장 목록 |
| `ksfarm_farm_detail_mo_hybrid.html` | 농장 상세 |
| `ksfarm_farm_register_mo_hybrid.html` | 농장 등록 |
| `ksfarm_farm_edit_mo_hybrid.html` | 농장 수정 |

### 전문가 Q&A (3)
| 파일 | 화면 |
|---|---|
| `ksfarm_expert_list_mo_hybrid.html` | 전문가 질문 목록 |
| `ksfarm_expert_detail_mo_hybrid.html` | 질문 상세 + 답변 |
| `ksfarm_expert_write_mo_hybrid.html` | 질문 작성 |

### 재배 가이드 (2)
| 파일 | 화면 |
|---|---|
| `ksfarm_cropguide_list_mo_hybrid.html` | 재배 가이드 목록 |
| `ksfarm_cropguide_detail_mo_hybrid.html` | 재배 가이드 상세 |

### 병해충 검색 (3)
| 파일 | 화면 |
|---|---|
| `ksfarm_pestsearch_home_mo_hybrid.html` | 병해충 검색 메인 |
| `ksfarm_pestsearch_search_mo_hybrid.html` | 검색 |
| `ksfarm_pestsearch_detail_mo_hybrid.html` | 병해충 상세 (NCPMS API 매핑) |

### 병해진단 (4) ⭐
| 파일 | 화면 |
|---|---|
| `ksfarm_diagnose_input_mo_hybrid.html` | 진단 입력 (대화형 4스텝) |
| `ksfarm_diagnose_loading_mo_hybrid.html` | 진단 로딩 (펄스 링 + 분석 단계) |
| `ksfarm_diagnose_followup_mo_hybrid.html` | 진단 추가 질문 |
| `ksfarm_diagnose_result_mo_hybrid.html` | 진단 결과 (사진 슬라이더·신뢰도·본문·액션) |

### 지원사업 / 시세 / 영농일지 / 다이얼로그 (8)
| 파일 | 화면 |
|---|---|
| `ksfarm_support_list_mo_hybrid.html` | 지원사업 목록 |
| `ksfarm_support_detail_mo_hybrid.html` | 지원사업 상세 |
| `ksfarm_pricehome_mo_hybrid.html` | 작물 시세 메인 (KAMIS) |
| `ksfarm_pricesearch_mo_hybrid.html` | 시세 검색 (보존) |
| `ksfarm_diary_list_mo_hybrid.html` | 영농일지 목록 (월 달력) |
| `ksfarm_diary_write_mo_hybrid.html` | 영농일지 작성 1/2 |
| `ksfarm_diary_write2_mo_hybrid.html` | 영농일지 작성 2/2 |
| `ksfarm_dialogs_mo_hybrid.html` | 다이얼로그·모달 모음 |

---

## 3. 🆚 비교 목업 · 데모 · 변형 (37개)

의사결정 과정에서 만든 비교 시안과 데모. 참고용 보관.

### 비교 목업 (의사결정 보관)

| 파일 | 내용 |
|---|---|
| `ksfarm_diagnose_compare.html` | 병해진단 입력 3안 (A 사진히어로 / B 단계카드 / **C 대화형 채택**) |
| `ksfarm_diagnose_step1_compare.html` | 진단 STEP1 작물 선택 3안 |
| `hero_top_mockups.html` | 홈 히어로 상단 영역 비교 |
| `price_token_mockups.html` | 시세 작물 토큰 디자인 비교 |
| `onboarding_entry_styles.html` | 온보딩 진입 비교 |
| `onboarding_fill_styles.html` | 온보딩 입력 비교 |
| `menu_toss_styles.html` | 전체메뉴 토스식 비교 |
| `expert_card_styles.html` | 전문가 카드 비교 |
| `farm_thumb_styles.html` | 농장 썸네일 비교 |
| `farmlist_styles.html` | 농장 목록 비교 |
| `editprofile_styles.html` | 프로필 수정 비교 |
| `pestsearch_home_styles.html` | 병해충 검색 메인 비교 |
| `cropguide_layout_styles.html` | 재배가이드 레이아웃 비교 |
| `cropadd_btn_styles.html` | 작물 추가 버튼 비교 |
| `photo_tile_styles.html` | 사진 타일 비교 |
| `support_reco_styles.html` | 지원사업 추천 비교 1 |
| `support_reco_styles2.html` | 지원사업 추천 비교 2 |
| `support_row_styles.html` | 지원사업 행 디자인 비교 |

### 톤 비교 (메인 홈 변형)

| 파일 | 내용 |
|---|---|
| `ksfarm_main_mo_apple.html` | 메인 홈 — apple 톤 (비교용 보관) |
| `ksfarm_main_mo_minimal.html` | 메인 홈 — minimal 톤 (비교용 보관) |

### 컴포넌트 변형

| 파일 | 내용 |
|---|---|
| `hero_copy_sets.html` | 히어로 카피 세트 |
| `hero_motif.html` | 히어로 모티프 |
| `hero_pest_alt.html` | 히어로 병해충 변형 |
| `hero_rhythm_fix.html` | 히어로 리듬 조정 |
| `hero_topspace.html` | 히어로 상단 여백 |
| `answer_farmer.html` | 전문가 답변 농민 톤 |
| `answer_icon.html` | 답변 아이콘 변형 |
| `feed_chip_refine.html` | 피드 키워드 칩 |
| `feed_keyword.html` | 피드 키워드 |
| `feed_options.html` | 피드 옵션 |
| `mypage_variants.html` | 마이페이지 변형 |
| `inquiry_detail_states.html` | 문의 상세 상태별 |
| `wx_pill.html` | 날씨 알약 |

### 데모 / 빈 상태

| 파일 | 내용 |
|---|---|
| `ksfarm_pricehome_empty_demo.html` | 시세 메인 빈 상태 데모 |
| `ksfarm_pestsearch_search_demo.html` | 병해충 검색 데모 |
| `price_no_token.html` | 시세 토큰 없는 버전 |

### 기타

| 파일 | 내용 |
|---|---|
| `farm_detail_nophoto.html` | 농장 상세 — 사진 없는 변형 |

---

## 🔑 핵심 4개 (다른 거 다 잊어도 이것만)

1. **`KSFARM_DESIGN_SYSTEM.md`** — 디자인 시스템 사양서
2. **`ksfarm_design_guide.html`** — 시각적 디자인 가이드 (브라우저로 열기)
3. **`ksfarm_main_mo_hybrid.html`** — 메인 홈 (앱의 얼굴)
4. **45개 hybrid 화면 전체** — 클라이언트/개발 전달 가능

---

## ⏭️ 남은 작업

1. **농장 작물 등록 화면** (품목 선택형) — 작물 마스터 매핑 선행 필요
2. **영농일지 + 진단 연동 변형** (B 방식: 자동 채움)
3. **농사친구 AI 대화** 화면 — 미착수
4. **지원사업 관리자 등록 화면** — 미착수
5. **농진청 AI 진단 엔진 응답 필드 확정** — 신뢰도% · top-N 후보
6. **농약정보시스템 OpenAPI 연동** — 추천 약제 구조화
