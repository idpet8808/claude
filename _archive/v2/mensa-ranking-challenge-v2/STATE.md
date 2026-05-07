# 멘사코리아 — 랭킹챌린지_ver1.0

- 고객사: 멘사코리아
- 슬러그: `mensa-ranking-challenge-v2`
- Notion Page ID: 미등록 (PM 보류 결정 — /sync-notion 별도 PM 명시 시점)
- PM: 신주한
- 현재 단계: 기획중
- 시작일: 2026-05-06
- 종료일: TBD
- 마지막 업데이트: 2026-05-06 (UX 화면 명세 완료 + S 확정 broadcast 발행)

## 산출물 인덱스

- [x] 01-prd.md (2026-05-06)
- [x] 02-tech-review.md (2026-05-06)
- [x] 03-ux-spec.md (2026-05-06)
- [x] 04-prototype-mvp/ (assets 골격 2026-05-06, pages/ S broadcast 대기)

## Decision Log

- (2026-05-06) `/kickoff <멘사코리아> <랭킹챌린지_ver1.0> <신주한>` 실행 → 슬러그 `mensa-ranking-challenge-v2` 부여, STATE.md 초기화. M14 v1.1 정련(§4-11 Agent Teams + 4중 신뢰성 보장) 적용 후 §4 정의(Mesh + 부분 broadcast + Agent Teams)대로 백지 재진행.
- (2026-05-06) PM 결정 3건 확정 — ① 슬러그: `mensa-ranking-challenge-v2`로 v1과 분리 (`mensa-ranking-challenge`는 _archive/v1/ 비교군 보존). ② 노션: 동기화 보류 (이번 /kickoff에서 [6]단계 노션관리자 호출 생략. PM 별도 /sync-notion 시점에 결정). ③ v1 참조: 백지 재작성 (각 영역 에이전트는 _archive/v1/ 직접 참조 X. 단 `_reference/` PNG 25개는 멘사 자체 챌린지 자료이므로 활용 허용 — _archive와 무관).
- (2026-05-06) PRD 초안 작성 완료 — 자가 점검 §A 7/7 + §B error 0 통과. Must 5개(REQ-001~005) 확정: 챌린지 풀기·점수 산정·랭킹 조회·회원가입·IQ 응시권 결제. 비즈니스 배경: IQ 챌린지 플랫폼 → 응시권 결제 전환 퍼널. 챌린지 무료, 응시권만 유료.
- (2026-05-06) 기능 범위(Must/Should/Could/Won't) 확정 — Must: REQ-001~005(5개). Should: REQ-006~007. Could: REQ-008~009. Won't: 모바일 앱·커뮤니티·힌트 유료화·회원 DB 완전 통합·5종 외 추가 챌린지. 근거: PM 명시 결정(2026-05-06).
- (2026-05-06) v1 운영 시행착오 발견 — `_FOLLOWUP.md` ② 등록 — "idle notification 의미 모호" (service-planner idle 2회를 차단 오진 → 실제 PM 응답 대기였음).
- (2026-05-06) v1 운영 시행착오 발견 — `_FOLLOWUP.md` ② 등록 — "팀장 controller 진행 상황 시각화 §4 워터폴화 회귀 패턴" (tech/ux/publisher spawn을 PRD 완성까지 워터폴 대기로 시각 → PM 지적 후 정정, 동시 spawn).
- (2026-05-06) 기술 스택 결정 — 선택: Next.js 15 App Router + Supabase Auth + Supabase PostgreSQL + 포트원 V2 + Vercel, 대안: Auth.js(NextAuth)·Neon Postgres·토스페이먼츠 직접 연동, 근거: Auth+DB+RLS 통합으로 관리 오버헤드 최소화, 포트원 V2 추상 레이어로 PG사 교체 비용 최소화.
- (2026-05-06) 리스크 대응 결정 — PG사 미정: 포트원 V2 레이어 선채택으로 완화(수용). 멘사 회원 DB 연동 미정: 수동 배지 인증 fallback으로 완화(완화). 카카오 비즈니스앱: 착수 즉시 신청 필요(완화).
- (2026-05-06) 공수 산정 — 낙관 6w / 현실 9w / 보수 13w. 현실 기준 2026-05-06 착수 시 7월 내 완료 가능. 보수 기준 13w는 7월 목표 초과 위험(출시일 확정 전 착수 즉시 필요).
- (2026-05-06) assets 골격 선행 작성 완료 — tokens(colors/spacing/typography) + css/base.css + js/main.js + README.md(골격). 디자인 토큰: 블루-네이비 primary + 골드 accent, WCAG AA 충족, Pretendard+Space Mono, 3단계 breakpoint 변수화. pages/는 03-ux-spec.md 자가 점검 통과 + S 확정 broadcast 수신 후 진입. M9 §2-5 정합.
- (2026-05-06) PM 지시로 일시 정지 — 워터폴화 회귀 구조 설계 우선 진행
- (2026-05-06) UX 화면 명세 완료 — S-001~S-010 확정(10화면). 4상태 전 화면 완비. Must 5개(REQ-001~005) + Should 2개(REQ-006·007) 전수 매핑. PG 미확정→S-008 추상 컴포넌트 대안 경로, 멘사 DB 미확정→S-009 코드 입력 대안 경로. 자가 점검 §A 4/4 + §B error 0. S 확정 broadcast 발행(E-broadcast-S-001). 오픈 이슈 5건 등록.
- (2026-05-07) M16 진입에 따라 v2 산출물 `_archive/v2/`로 이동 — PM 결정. M15 정의 검증용으로 진행되었으나 PM 본질 지적 ("PRD = 요구사항정의서, 전면 수정")으로 격차 6 발견 후 M16 본질 재설계 진입. 본 v2 산출물은 *기존 누적 SSoT*로 보존 (M16 [2] 기존 누적 검토 + [3] 대조 단계에서 참조). 향후 M16 적용 후 신규 슬러그(v3 또는 다른 명칭)로 재진행 — PM 결정 시점.

## 미해결 이슈

- (이슈 1) PG사 선정 — 담당자: 신주한(PM) / 기한: 2026-06-01
- (이슈 2) 멘사 회원 DB 연동 방식 — 담당자: 기술검토자 + 멘사코리아 / 기한: 2026-06-01
- (이슈 3) 월별 랭킹 초기화 여부 — 담당자: 신주한(PM) / 기한: 2026-06-15
- (이슈 4) 출시 일정 확정 — 담당자: 기술검토자 + 신주한(PM) / 기한: 2026-06-08
- (이슈 5) 예산 한도 확정 — 담당자: 신주한(PM) / 기한: 2026-06-08
- (이슈 6) 카카오 비즈니스앱 전환 신청 — 담당자: 기술검토자 / 기한: 2026-05-20

## 다음 액션

- 퍼블리셔(MVP) → `04-prototype-mvp/pages/` 정식 작업 (S 확정 broadcast E-broadcast-S-001 수신 완료 — 진입 가능)
- 노션관리자 → 보류 (PM 별도 /sync-notion 시점)
