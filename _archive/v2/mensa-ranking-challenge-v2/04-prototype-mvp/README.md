# 멘사코리아 랭킹챌린지 — MVP 프로토타입

- 슬러그: `mensa-ranking-challenge-v2`
- 퍼블리셔 착수일: 2026-05-06
- 현재 상태: **assets 골격 완료 / pages/ 진행 대기 (S broadcast 수신 후 진입)**

---

## 디렉토리 구조

```
04-prototype-mvp/
├── pages/                          # HTML 화면 파일 (S broadcast 수신 후 작성)
├── assets/
│   ├── tokens/
│   │   ├── colors.css              # 컬러 토큰 (블루-네이비 계열, WCAG AA)
│   │   ├── spacing.css             # 스페이싱·레이아웃·그림자·z-index 토큰
│   │   └── typography.css          # 타이포그래피 토큰 (Pretendard + Space Mono)
│   ├── css/
│   │   └── base.css                # 토큰 임포트 + 리셋 + 공통 컴포넌트 클래스
│   └── js/
│       └── main.js                 # 공통 JS (타이머·점수산정·세션·접근성·토스트)
└── README.md                       # 이 파일 (P-NNN ↔ REQ 매핑 SSoT)
```

---

## P-NNN ↔ REQ 매핑 표

> 이 표는 `03-ux-spec.md` S 확정 broadcast 수신 후 퍼블리셔가 채운다.
> HTML 상단 주석 `<!-- P-NNN / → REQ-XXX, REQ-YYY -->` 와 이 표가 SSoT를 공유한다.

| P-NNN | 화면명 | 파일명 | 연결 REQ | 비고 |
|-------|-------|--------|----------|------|
| (S broadcast 수신 후 채워질 예정) | | | | |

---

## [NOT APPLICABLE] 섹션

> `§3-3 I5 NA SSoT 예외`: P 영역의 NA 항목은 HTML 파일 부재로 이 README가 SSoT를 겸임한다.
> 형식: `- REQ-NNN: 사유 1줄` (PRD REQ 존재 검증 필수)

### assets 골격 단계 현재 NA 항목

- REQ-001: S broadcast 수신 전 — pages/ 화면 미작성 단계 (정상 NA. S 확정 후 P-NNN 발급 및 매핑 예정)
- REQ-002: S broadcast 수신 전 — pages/ 화면 미작성 단계 (정상 NA. S 확정 후 P-NNN 발급 및 매핑 예정)
- REQ-003: S broadcast 수신 전 — pages/ 화면 미작성 단계 (정상 NA. S 확정 후 P-NNN 발급 및 매핑 예정)
- REQ-004: S broadcast 수신 전 — pages/ 화면 미작성 단계 (정상 NA. S 확정 후 P-NNN 발급 및 매핑 예정)
- REQ-005: S broadcast 수신 전 — pages/ 화면 미작성 단계 (정상 NA. S 확정 후 P-NNN 발급 및 매핑 예정)

> Should (REQ-006~007) / Could (REQ-008~009) 항목은 03-ux-spec.md 화면 명세 확정 후 NA 여부 결정.

---

## 디자인 토큰 결정 근거

| 토큰 범주 | 결정 내용 | 근거 |
|----------|----------|------|
| 컬러 팔레트 | 블루-네이비 계열 primary + 골드 accent | IQ 챌린지 컨셉: 지적·집중·도전. 멘사 인증 배지(골드) |
| WCAG 대비 | AA 충족 (텍스트 4.5:1, UI 3:1) | 접근성 필수 요건 |
| 폰트 | Pretendard(UI) + Space Mono(문제·점수) | 한국어 가독성(Pretendard) + 수열·숫자 맥락 강조(모노) |
| Breakpoint | mobile(480px) / tablet(768px) / desktop(1024px) | 모바일·태블릿·데스크톱 3단계 변수화 (spacing.css --bp-*) |
| 그리드 | 4px 기반 8-포인트 그리드 | 일관된 수직 리듬 |

---

## 외부 자원 참조 안내

`_reference/` 디렉토리의 PNG 파일(멘사 자체 챌린지 자료)은 디자인 영감용으로만 활용.
**외부 공개(배포) 시 해당 이미지 제거 필수** — 저작권 귀속 확인 전 퍼블리싱 금지.

---

## 시연 가이드

> pages/ 파일 작성 완료 후 갱신 예정.

### 로컬 시연

```
# 별도 빌드 도구 없음 — 브라우저에서 직접 열기
open projects/mensa-ranking-challenge-v2/04-prototype-mvp/pages/<slug>.html
```

### 화면 흐름 (S broadcast 수신 후 확정)

1. 화면 목록 및 네비게이션 흐름은 03-ux-spec.md 확정 후 기재
2. 각 화면 P-NNN → REQ 매핑은 위 매핑 표 참조
