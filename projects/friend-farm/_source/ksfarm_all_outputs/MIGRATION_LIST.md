# v3 표준 마이그레이션 대상 화면 매핑

총 45개 화면 검사
문제 있는 화면: **45**개 (구조)
토큰 불일치 화면: **20**개 (--line)

---

## 1. 구조·컴포넌트 불일치

### 문제 패턴 빈도

| 문제 | 발생 파일 수 |
|---|---|
| .phone 누락 | 44 |
| .scroll overflow-x | 36 |
| .scroll padding 비표준 | 17 |
| .appbar flex-shrink | 12 |
| .scroll flex | 11 |
| .scroll overflow-y | 11 |
| .btn-primary 단색 → 그라데이션으로 변경 필요 | 2 |

### 화면별 상세

**cropguide_detail**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)

**cropguide_list**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)

**diagnose_followup**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .scroll padding 비표준: 30px 22px 24px
  - .btn height: 54px (표준 52px)

**diagnose_input**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .scroll padding 비표준: 30px 22px 24px
  - .btn height: 54px (표준 52px)

**diagnose_loading**
  - .phone 누락: ['background: var(--bg)', 'min-height: 844px']
  - .phone 그라데이션 배경 (예외 화면 아님)

**diagnose_result**
  - .phone 누락: ['min-height: 844px']
  - .scroll padding 비표준: 16px 20px 32px

**dialogs**
  - .phone 누락: ['width: min(390px, 100%)', 'border-radius: 30px', 'min-height: 844px', 'display: flex', 'flex-direction: column']
  - .btn height: 48px (표준 52px)

**diary_list**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)

**diary_write2**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .btn-primary 단색 → 그라데이션으로 변경 필요

**diary_write**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .btn-primary 단색 → 그라데이션으로 변경 필요

**editprofile**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)

**expert_detail**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .scroll padding 비표준: 8px 20px 20px

**expert_list**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .scroll padding 비표준: 14px 20px 14px

**expert_write**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)

**farm_detail**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .scroll padding 비표준: 8px 20px calc(32px + env(safe-area-inset-bottom))

**farm_edit**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)

**farm_register**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)

**farmlist**
  - .phone 누락: ['min-height: 844px', 'display: flex', 'flex-direction: column']
  - .scroll flex:1 누락
  - .scroll overflow-y:auto 누락
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .appbar flex-shrink:0 누락

**findaccount**
  - .phone 누락: ['position: relative', 'min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .scroll padding 비표준: 22px 20px 24px

**inquiry_detail**
  - .phone 누락: ['position: relative', 'min-height: 844px', 'display: flex', 'flex-direction: column']
  - .scroll flex:1 누락
  - .scroll overflow-y:auto 누락
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .appbar flex-shrink:0 누락

**inquiry_list**
  - .phone 누락: ['min-height: 844px', 'display: flex', 'flex-direction: column']
  - .scroll flex:1 누락
  - .scroll overflow-y:auto 누락
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .appbar flex-shrink:0 누락

**inquiry_write**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .scroll padding 비표준: 14px 20px 24px

**location_view**
  - .phone 누락: ['position: relative', 'min-height: 844px', 'display: flex', 'flex-direction: column']
  - .scroll flex:1 누락
  - .scroll overflow-y:auto 누락
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .appbar flex-shrink:0 누락

**login**
  - .phone 누락: ['min-height: 844px']

**main**
  - .phone 누락: ['border-radius: 30px', 'display: flex', 'flex-direction: column']

**marketing_consent**
  - .phone 누락: ['position: relative', 'min-height: 844px', 'display: flex', 'flex-direction: column']
  - .scroll flex:1 누락
  - .scroll overflow-y:auto 누락
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .scroll padding 비표준: 8px 20px 30px
  - .appbar flex-shrink:0 누락

**menu**
  - .phone 누락: ['min-height: 844px', 'display: flex', 'flex-direction: column']

**mypage**
  - .phone 누락: ['position: relative', 'min-height: 844px', 'display: flex', 'flex-direction: column']
  - .scroll flex:1 누락
  - .scroll overflow-y:auto 누락
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .scroll padding 비표준: 6px 20px 30px
  - .appbar flex-shrink:0 누락

**noti_setting**
  - .phone 누락: ['position: relative', 'min-height: 844px', 'display: flex', 'flex-direction: column']
  - .scroll flex:1 누락
  - .scroll overflow-y:auto 누락
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .scroll padding 비표준: 8px 20px 30px
  - .appbar flex-shrink:0 누락

**notice_detail**
  - .phone 누락: ['position: relative', 'min-height: 844px', 'display: flex', 'flex-direction: column']
  - .scroll flex:1 누락
  - .scroll overflow-y:auto 누락
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .appbar flex-shrink:0 누락

**notice**
  - .phone 누락: ['position: relative', 'min-height: 844px', 'display: flex', 'flex-direction: column']
  - .appbar flex-shrink:0 누락

**onboarding_entry**
  - .btn height: 54px (표준 52px)

**pestsearch_detail**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)

**pestsearch_home**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .scroll padding 비표준: 0 24px 24px

**pestsearch_search**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .scroll padding 비표준: 4px 20px 20px

**pricehome**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)

**pricesearch**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .scroll padding 비표준: 4px 20px 24px

**privacy_view**
  - .phone 누락: ['position: relative', 'min-height: 844px', 'display: flex', 'flex-direction: column']
  - .scroll flex:1 누락
  - .scroll overflow-y:auto 누락
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .appbar flex-shrink:0 누락

**pwchange**
  - .phone 누락: ['min-height: 844px', 'display: flex', 'flex-direction: column']

**settings**
  - .phone 누락: ['position: relative', 'min-height: 844px', 'display: flex', 'flex-direction: column']
  - .scroll flex:1 누락
  - .scroll overflow-y:auto 누락
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .scroll padding 비표준: 8px 20px 30px
  - .appbar flex-shrink:0 누락

**signup**
  - .phone 누락: ['position: relative', 'min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .scroll padding 비표준: 16px 20px 24px

**signup_terms**
  - .phone 누락: ['position: relative', 'min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .scroll padding 비표준: 16px 20px 24px

**support_detail**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)

**support_list**
  - .phone 누락: ['min-height: 844px']
  - .scroll overflow-x:hidden 누락 (v3 신규)

**terms_view**
  - .phone 누락: ['position: relative', 'min-height: 844px', 'display: flex', 'flex-direction: column']
  - .scroll flex:1 누락
  - .scroll overflow-y:auto 누락
  - .scroll overflow-x:hidden 누락 (v3 신규)
  - .appbar flex-shrink:0 누락

---

## 2. 토큰 불일치 (--line)

**20개 화면**에서 `--line` 값 비표준

표준: `rgba(48,42,30,.08)`

### 화면별

**rgba(48,42,30,.10)** (17개)
  - dialogs
  - editprofile
  - farm_edit
  - farm_register
  - farmlist
  - findaccount
  - inquiry_detail
  - inquiry_write
  - location_view
  - main
  - notice_detail
  - notice
  - privacy_view
  - pwchange
  - signup
  - signup_terms
  - terms_view

**rgba(48,42,30,.12)** (2개)
  - login
  - onboarding_entry

**rgba(48,42,30,.06)** (1개)
  - menu

