# KS팜 'AI 농사친구' — 전체 산출물 정리

> **마지막 업데이트**: 2026-05-29
> **총 산출물**: 91개 파일 (디자인 시스템 + 45개 hybrid 화면 + 비교/데모 목업 + 문서)

---

## 📋 목차

1. [📚 문서 & 디자인 시스템](#1-문서--디자인-시스템) (9개)
2. [📱 확정 hybrid 화면](#2-확정-hybrid-화면) (45개)
3. [🆚 비교 목업 — 의사결정 보관](#3-비교-목업) (18개)
4. [🎨 데모 / 스타일 변형](#4-데모--스타일-변형) (18개)
5. [📂 기타](#5-기타) (1개)

---

## 1. 문서 & 디자인 시스템

### ⭐ 현행 표준 (반드시 참조)

| 파일 | 역할 |
|---|---|
| **`KSFARM_DESIGN_SPEC_v3.md`** | 디자인 시스템 v3 사양서. 모든 컴포넌트의 표준 정의. 새 화면 만들 때 기준 문서. |
| **`ksfarm_design_system.html`** | 디자인 시스템 시각적 카탈로그. 디자이너·기획자가 보는 라이브 카탈로그(브라우저에서 열어보기). 16개 섹션(컬러·타이포·버튼·칩·모달·아이콘 등). |
| **`KSFARM_OUTPUTS_INDEX.md`** | 산출물 인덱스 (12차). 작업 과정·의사결정·미해결 사항 상세 기록. |

### 마이그레이션 보고서 (작업 이력)

| 파일 | 역할 |
|---|---|
| `AUDIT_SUMMARY.md` | v3 마이그레이션 1단계: 45개 화면 컴포넌트 감사 요약. 의사결정 항목 10개. |
| `audit_components.txt` | 감사 raw 데이터: 컴포넌트별 변형 + 사용 파일 매핑. |
| `audit_tokens.txt` | 감사 raw 데이터: 컬러·토큰 일관성 상세. |
| `MIGRATION_LIST.md` | 마이그레이션 3단계: 어긋난 화면·항목 매핑. |
| `MIGRATION_REPORT.md` | 마이그레이션 결과 보고서: 적용 완료 + 후속 과제. |

### 구 버전 (참고용)

| 파일 | 역할 |
|---|---|
| `KSFARM_DESIGN_SPEC.md` | v2 사양서. 홈 화면 기준 정리. 참고용 보관. |

---

## 2. 확정 hybrid 화면

전체 45개. 모두 v3 표준 적용 완료. 파일명 패턴: `ksfarm_{영역}_mo_hybrid.html`.

### 2-1. 온보딩 / 인증 (5개)

| 파일 | 화면 |
|---|---|
| `ksfarm_onboarding_entry_mo_hybrid.html` | 진입 (시작하기) — 딥틸 그라데이션 배경 |
| `ksfarm_login_mo_hybrid.html` | 로그인 |
| `ksfarm_signup_terms_mo_hybrid.html` | 회원가입 1/2 — 약관 동의 |
| `ksfarm_signup_mo_hybrid.html` | 회원가입 2/2 — 정보 입력 |
| `ksfarm_findaccount_mo_hybrid.html` | 계정 찾기 (아이디/비번) |

### 2-2. 홈 (1개)

| 파일 | 화면 |
|---|---|
| `ksfarm_main_mo_hybrid.html` | 메인 홈 — 히어로·시세·전문가 답변·피드 |

### 2-3. 내비 (1개)

| 파일 | 화면 |
|---|---|
| `ksfarm_menu_mo_hybrid.html` | 전체메뉴 드로어 |

### 2-4. 마이페이지 / 설정 (9개)

| 파일 | 화면 |
|---|---|
| `ksfarm_mypage_mo_hybrid.html` | 마이페이지 |
| `ksfarm_editprofile_mo_hybrid.html` | 프로필 수정 |
| `ksfarm_pwchange_mo_hybrid.html` | 비밀번호 변경 |
| `ksfarm_settings_mo_hybrid.html` | 환경설정 |
| `ksfarm_noti_setting_mo_hybrid.html` | 알림 설정 |
| `ksfarm_marketing_consent_mo_hybrid.html` | 마케팅 동의 |
| `ksfarm_terms_view_mo_hybrid.html` | 이용약관 보기 |
| `ksfarm_privacy_view_mo_hybrid.html` | 개인정보처리방침 보기 |
| `ksfarm_location_view_mo_hybrid.html` | 위치기반 약관 보기 |

### 2-5. 고객지원 (4개)

| 파일 | 화면 |
|---|---|
| `ksfarm_notice_mo_hybrid.html` | 공지사항 목록 |
| `ksfarm_notice_detail_mo_hybrid.html` | 공지사항 상세 |
| `ksfarm_inquiry_list_mo_hybrid.html` | 1:1문의 목록 |
| `ksfarm_inquiry_detail_mo_hybrid.html` | 1:1문의 상세 |
| `ksfarm_inquiry_write_mo_hybrid.html` | 1:1문의 작성 |

### 2-6. 농장 관리 (4개)

| 파일 | 화면 |
|---|---|
| `ksfarm_farmlist_mo_hybrid.html` | 농장 목록 |
| `ksfarm_farm_detail_mo_hybrid.html` | 농장 상세 |
| `ksfarm_farm_register_mo_hybrid.html` | 농장 등록 |
| `ksfarm_farm_edit_mo_hybrid.html` | 농장 수정 |

### 2-7. 전문가 Q&A (3개)

| 파일 | 화면 |
|---|---|
| `ksfarm_expert_list_mo_hybrid.html` | 전문가 질문 목록 |
| `ksfarm_expert_detail_mo_hybrid.html` | 질문 상세 + 답변 |
| `ksfarm_expert_write_mo_hybrid.html` | 질문 작성 |

### 2-8. 재배 가이드 (2개)

| 파일 | 화면 |
|---|---|
| `ksfarm_cropguide_list_mo_hybrid.html` | 재배 가이드 목록 |
| `ksfarm_cropguide_detail_mo_hybrid.html` | 재배 가이드 상세 |

### 2-9. 병해충 검색 (3개)

| 파일 | 화면 |
|---|---|
| `ksfarm_pestsearch_home_mo_hybrid.html` | 병해충 검색 메인 |
| `ksfarm_pestsearch_search_mo_hybrid.html` | 검색 화면 |
| `ksfarm_pestsearch_detail_mo_hybrid.html` | 병해충 상세 (NCPMS API 매핑) |

### 2-10. 병해진단 (4개) ⭐ 이번 세션 완성

| 파일 | 화면 |
|---|---|
| `ksfarm_diagnose_input_mo_hybrid.html` | 진단 입력 (대화형 4스텝: 작물·증상·시기·사진) |
| `ksfarm_diagnose_loading_mo_hybrid.html` | 진단 로딩 (펄스 링 + 분석 단계) |
| `ksfarm_diagnose_followup_mo_hybrid.html` | 진단 추가 질문 (확신 부족 시) |
| `ksfarm_diagnose_result_mo_hybrid.html` | 진단 결과 (사진 슬라이더·신뢰도·본문·액션) |

### 2-11. 지원사업 (2개)

| 파일 | 화면 |
|---|---|
| `ksfarm_support_list_mo_hybrid.html` | 지원사업 목록 |
| `ksfarm_support_detail_mo_hybrid.html` | 지원사업 상세 |

### 2-12. 작물 시세 (2개)

| 파일 | 화면 |
|---|---|
| `ksfarm_pricehome_mo_hybrid.html` | 시세 메인 (KAMIS API) |
| `ksfarm_pricesearch_mo_hybrid.html` | 시세 검색 (현재 진입로 없음, 보존) |

### 2-13. 영농일지 (3개)

| 파일 | 화면 |
|---|---|
| `ksfarm_diary_list_mo_hybrid.html` | 일지 목록 (월 달력) |
| `ksfarm_diary_write_mo_hybrid.html` | 일지 작성 1/2 |
| `ksfarm_diary_write2_mo_hybrid.html` | 일지 작성 2/2 |

### 2-14. 다이얼로그 (1개)

| 파일 | 화면 |
|---|---|
| `ksfarm_dialogs_mo_hybrid.html` | 모달·다이얼로그 모음 |

---

## 3. 비교 목업

의사결정 과정에서 만든 A/B/C 비교 또는 컴포넌트 변형 시안. **참고용 보관**.

| 파일 | 내용 |
|---|---|
| `ksfarm_diagnose_compare.html` | 병해진단 입력 3안 (A 사진히어로 / B 단계카드 / **C 대화형 채택**) |
| `ksfarm_diagnose_step1_compare.html` | 진단 STEP1 작물 선택 3안 (A 큰카드 / B 내농장먼저 / C 안내카드+2열) |
| `hero_top_mockups.html` | 홈 히어로 상단 영역 비교 |
| `price_token_mockups.html` | 시세 작물 토큰 디자인 비교 |
| `onboarding_entry_styles.html` | 온보딩 진입 디자인 비교 |
| `onboarding_fill_styles.html` | 온보딩 입력 화면 비교 |
| `menu_toss_styles.html` | 전체메뉴 토스식 비교 |
| `expert_card_styles.html` | 전문가 카드 디자인 비교 |
| `farm_thumb_styles.html` | 농장 썸네일 비교 |
| `farmlist_styles.html` | 농장 목록 비교 |
| `editprofile_styles.html` | 프로필 수정 비교 |
| `pestsearch_home_styles.html` | 병해충 검색 메인 비교 |
| `cropguide_layout_styles.html` | 재배가이드 레이아웃 비교 |
| `cropadd_btn_styles.html` | 작물 추가 버튼 비교 |
| `photo_tile_styles.html` | 사진 타일 비교 |
| `support_reco_styles.html` | 지원사업 추천 비교 1 |
| `support_reco_styles2.html` | 지원사업 추천 비교 2 |
| `support_row_styles.html` | 지원사업 줄 디자인 비교 |

---

## 4. 데모 / 스타일 변형

특정 컴포넌트·상태·톤 비교용 작은 시안들.

### 톤 비교 (apple/minimal/hybrid 메인 홈)

| 파일 | 내용 |
|---|---|
| `ksfarm_main_mo_apple.html` | 메인 홈 — apple 톤 (비교용 보관) |
| `ksfarm_main_mo_minimal.html` | 메인 홈 — minimal 톤 (비교용 보관) |

### 홈 히어로 변형

| 파일 | 내용 |
|---|---|
| `hero_copy_sets.html` | 히어로 카피 세트 |
| `hero_motif.html` | 히어로 모티프 (배경 잎 등) |
| `hero_pest_alt.html` | 히어로 병해충 변형 |
| `hero_rhythm_fix.html` | 히어로 리듬 조정 |
| `hero_topspace.html` | 히어로 상단 여백 |

### 컴포넌트 변형

| 파일 | 내용 |
|---|---|
| `answer_farmer.html` | 전문가 답변 카드 농민 톤 |
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

---

## 5. 기타

| 파일 | 내용 |
|---|---|
| `farm_detail_nophoto.html` | 농장 상세 — 사진 없는 변형 (보관) |

---

## 📊 통계

| 카테고리 | 개수 |
|---|---|
| **문서 & 디자인 시스템** | 9 (v3 표준 1·카탈로그 1·인덱스 1·감사 5·구 v2 1) |
| **확정 hybrid 화면** | 45 (전 영역 v3 적용 완료) |
| **비교 목업** | 18 (의사결정 보관) |
| **데모/스타일 변형** | 18 |
| **기타** | 1 |
| **합계** | **91** |

---

## 🔑 핵심 결과물 4개 (다른 거 다 잊어도 이것만)

1. **`KSFARM_DESIGN_SPEC_v3.md`** — 디자인 시스템 표준 문서
2. **`ksfarm_design_system.html`** — 시각적 디자인 시스템 카탈로그 (브라우저로 열기)
3. **`ksfarm_main_mo_hybrid.html`** — 홈 (앱의 얼굴)
4. **45개 hybrid 화면 전체** — 모두 v3 표준 적용 완료, 클라이언트 전달 가능

---

## ⏭️ 남은 작업

상세는 `KSFARM_OUTPUTS_INDEX.md` §5 미해결 참조. 우선순위:

1. **농장 작물 등록 화면** (품목 선택형) — ⭐ 작물 마스터 매핑 선행 필요
2. **영농일지+진단 연동 변형** — B 방식 (작물·날짜·작업유형 자동 채움 + 진단 카드 첨부)
3. **농사친구 AI 대화** 화면 — 미착수
4. **지원사업 관리자 등록 화면** — 미착수
5. **누락 컴포넌트 일괄 적용** — `.input`/`.btn-line`/`.tag`/`.chip-select`/`.chip-tag` 새 화면부터
6. **360px 실측 점검** — 안전망 적용 후 핵심 화면 확인
7. **농진청 AI 진단 엔진 응답 필드 확정** — 신뢰도% · top-N 후보
8. **농약정보시스템(pis.rda.go.kr) OpenAPI 연동** — 추천 약제 구조화
