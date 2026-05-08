# 랭킹챌린지_ver2.0
- 고객사: 멘사코리아
- 슬러그: mensa-ranking-challenge-v2-0
- Notion Page ID: 미등록
- PM: 신주한
- 현재 단계: 기획중
- 시작일: 2026-05-07
- 종료일: (미정)
- 마지막 업데이트: 2026-05-07 (PRD v0.1.6 + §C 3건 + §D #9 등재 + 격차 발견 Decision Log)

## 산출물 인덱스
- [x] 01-prd.md (2026-05-07)
- [x] 02-tech-review.md (2026-05-07)
- [x] 03-ux-spec.md (2026-05-07)
- [x] 04-prototype-mvp/ (2026-05-07)

## Decision Log
- (2026-05-07) `/kickoff`로 착수 — PM 신규 검증 sub-step 진입 (M16 정의 검증용)
- (2026-05-07) 슬러그 `mensa-ranking-challenge-v2-0` 확정 — PM 인자 `랭킹챌린지_ver2.0` 버전 표기 반영
- (2026-05-07) 기존 멘사 흔적(v1·v2 아카이브 + _reference PNG) 모두 제거 — PM 명시 신규 진입 의사 정합
- (2026-05-07) P 영역: assets/ 골격 확정 — tokens/colors.css, tokens/spacing.css, tokens/typography.css, css/base.css, js/main.js (§4-0 (v) UI broadcast 무관 선행)
- (2026-05-07) P 영역: README.md 골격 생성 — 화면 매핑 표 + NA list 스켈레톤 (UX broadcast 수신 후 갱신 예정)
- (2026-05-07) P 영역: README.md PRD §B 기반 REQ 11개 매핑 예상 표 갱신 — UI ID 확정 전 frame
- (2026-05-07) P 영역: assets/css/layout.css 추가 — .container/.page-header/main/footer/.btn/.btn-primary/.btn-accent/4상태 클래스 (§4-0 (v) 선행)
- (2026-05-07) 01-prd.md v0.1 완성 — 자동 실패 0/4 + 통과율 7/7 + §B error 0건. §B 9개 요구사항 (RANK 4건/AUTH 1건/QUIZ 4건/PAY 1건/ADMIN 1건). 오픈 이슈 5건. _refer 폴더 문제 PNG 참조 기록.
- (2026-05-07) 경계 사례 명시 — REQ-AUTH-001-01 (기존 로그인 시스템 연동 제약), REQ-PAY-001-01 (이니시스 결제·결제창·환불 정책 명시)
- (2026-05-07) TR: PostgreSQL default (표준 패턴 RDB CRUD 자율 결정) — service-planner §C 기록 요청 발행
- (2026-05-07) TR reply-1 발행 — REQ-AUTH-001-01 기존 인증 방식(세션/JWT·도메인 구조) PM 질의 요청
- (2026-05-07) TR reply-2 발행 — REQ-RANK-002-01 시간 보너스 공식·문제별 배점 PM 질의 요청
- (2026-05-07) 02-tech-review.md v0.1 — §A 5/5 + §B error 0 통과. 9건 전수 평가 (가능 3건·조건부 7건·불가능 0건). 리스크 7건·외부 의존성 5건·공수 8/12/18주
- (2026-05-07) _refer 폴더 위치 — projects/mensa-ranking-challenge-v2-0/_refer/ (5개 문제 PNG: 배수수열/11배수스도쿠/너는바보입니다/아치킨먹고싶다/아름다운수열). 참조용 자료, 산출물 X
- (2026-05-07) PM 결정 #1 — REQ-RANK-001-01 Top 10 확정. §D #6 해소
- (2026-05-07) PM 결정 #2 — REQ-RANK-003-01 개인 기록 = 챌린지 결과 화면 내 도전 이력 링크 제공 (별도 페이지 X). §D #7 해소
- (2026-05-07) PM 결정 #3 — REQ-AUTH-001-01 기존 사이트: PHP / 서버 세션+쿠키 / 동일 도메인 mensa.kr/challenge. CORS 없음, 세션 공유 자연. §D #8 해소
- (2026-05-07) PM 결정 #4 — REQ-RANK-002-01 시간 보너스 공식 확정: 선형 감소 `20 × (남은시간/제한시간)`. 예) 120초 문제 60초 풀이 = 10점. §D #2 해소
- (2026-05-07) PM 결정 #5 — REQ-RANK-002-01 문제 배점 확정: 균등 20점 × 5개. §D #4 해소
- (2026-05-07) §C 기록 — TR PostgreSQL default (RDB CRUD 표준 패턴 자율 결정). TR broadcast/reply 수신 후 service-planner §C 단일 기록 (PI-013 정합)
- (2026-05-07) §C 기록 — P UI-Item_Purchase-01 닫기 버튼 history.back() default (PI-013 정합)
- (2026-05-07) §C 기록 — P UI-Quiz_Stage-01 purchaseModal 닫기 modal.hidden=true default (PI-013 정합)
- (2026-05-07) §D #9 등재 — 인-스테이지 힌트 즉시 구매 방식 PRD 명시 필요. UX v0.5 Quiz_Stage 내 모달 방식 vs 기존 REQ-PAY-001-01 결제 화면 전제 모순. PRD 재작성 시 반영 예정
- (2026-05-07) 격차 발견 — §B 분해 깊이 미흡 (9 REQ 대단위 묶음, NN 미세 분해 미수행) + brainstorming 누락 (feedback_brainstorm_first 위배). PM 회귀 결정. 01-prd.md v0.1.6 보존, 재작성 예정
- (2026-05-07) TR v0.1+broadcast-5 완성. 격차 정정 회귀 영역 인지

- (2026-05-07) UX: 03-ux-spec.md v0.2 완성 — Screen ID 7개 발급 (UI-Ranking_Widget-01·UI-Challenge_Intro-01·UI-Quiz_Stage-01·UI-Item_Purchase-01·UI-Challenge_Result-01·UI-Ranking_Board-01·UI-Admin_Dashboard-01). 자동 실패 0/3 + 통과율 4/4 + §B error 0.
- (2026-05-07) UX: REQ-RANK-001-01 Top 10 반영 (PM 결정 #1 정합). REQ-RANK-003-01 개인 기록 = 결과 화면 내 내 기록 탭 처리 (PM 결정 #2 정합). REQ-AUTH-001-01 PHP/세션쿠키/동일도메인 확정 반영 (PM 결정 #3 정합).
- (2026-05-07) P 영역: HTML 7개 파일 발급 — UI-Ranking_Widget-01(REQ-RANK-001-01) / UI-Challenge_Intro-01(REQ-AUTH-001-01, REQ-RANK-003-01) / UI-Quiz_Stage-01(REQ-QUIZ-001-01~004-01) / UI-Item_Purchase-01(REQ-PAY-001-01) / UI-Challenge_Result-01(REQ-RANK-002-01, REQ-RANK-003-01, REQ-RANK-004-01) / UI-Ranking_Board-01(REQ-RANK-003-01) / UI-Admin_Dashboard-01(REQ-ADMIN-001-01, REQ-QUIZ-004-01)
- (2026-05-07) P 영역: README.md 화면 매핑 표 완성 — 7개 UI ID + REQ 전수 매핑. NA 항목 0건
- (2026-05-07) P 영역: 자가 점검 통과 — 7/7 (자동 실패 0/3). 04-prototype-mvp/ 완성
- (2026-05-07) P 영역: BC-016 반영 — UI-Challenge_Result-01.html 점수 상세 갱신. 문제 기본점수 100→20점(균등 20점×5), 시간 보너스 공식 `20×(남은시간/제한시간)` 표시 추가 (REQ-RANK-002-01)
- (2026-05-07) P 영역: 사용자 쪽 6개 화면 navigation 연결 완료 — (1) UI-Ranking_Widget-01 랭킹 행 클릭→UI-Challenge_Intro-01 (2) UI-Quiz_Stage-01 정답제출/패스확인→UI-Challenge_Result-01 (3) UI-Item_Purchase-01 결제완료 복귀→UI-Quiz_Stage-01/UI-Challenge_Intro-01 (4) UI-Ranking_Board-01 재도전→UI-Challenge_Intro-01, 홈복귀→UI-Ranking_Widget-01. HTML 상단 주석 SSoT 보존. 재자가 점검 7/7 (자동 실패 0/3)
- (2026-05-07) UX: 03-ux-spec.md v0.5 — PM 결정 화면 구조 보강. UI-Quiz_Stage-01 폐기 (I14 결번 허용) + UI-Quiz_Stage_1~5-01 신규 5개 (_refer PNG 정합) + UI-Payment_Success-01 + UI-Payment_Failure-01 신규 2개. 힌트 즉시 구매 모달 인-스테이지. 총 12개 활성 화면. 자동 실패 0/3 + 통과율 4/4 + §B error 0.
- (2026-05-07) P 영역: UX-BC-011 수신 — pages/ HTML 신규 7개 발급. UI-Quiz_Stage_1~5-01(REQ-QUIZ-001~004-01 각), UI-Payment_Success-01(REQ-PAY-001-01), UI-Payment_Failure-01(REQ-PAY-001-01). UI-Quiz_Stage-01 NA list 등재(폐기). README 매핑 표 13개로 갱신. main.js 공통 핸들러 추가. 재자가 점검 7/7 (자동 실패 0/3)
- (2026-05-07) v0.5 작업 직전 PM 격차 발견. v0.3 결과 + v0.5 결과 모두 보존. 회귀 sub-step에서 재활용
- (2026-05-08) M17 6건 구조 격차 정정 진행 — `_design/M17_6deficits-brainstorming.md` + `M17_progress-plan.md` + `M17_session_resume.md`. v2.0 산출물은 비교군으로 보존 (멘사 v3 신규 sub-step에서 격차 해소 검증 — 별도 슬러그)

## 미해결 이슈
- (TR) REQ-AUTH-001-01 → 가능 확정 (2026-05-07, §D #8 해소) — 미해결 아님, 기록 종결
- (TR) REQ-RANK-002-01 확정 (2026-05-07, §D #2·#4 해소) — 미해결 아님, 기록 종결
- (TR) REQ-PAY-001-01 조건부 — 이니시스 결제창 방식(팝업/인라인)·환불 정책 미확정 / 담당: 신주한 (PM) / 기한: 2026-05-14
- (TR) REQ-RANK-003-01 조건부 — 공식 랭킹 힌트 사용자 처리 기준 미확정 / 담당: 신주한 (PM) / 기한: 2026-05-14
- (UX) UI-Quiz_Stage_2-01·5-01 모바일 그리드 정책 — 스도쿠 9×9/아름다운 수열 32칸 수평 스크롤 vs 핀치 줌 미확정 / 담당: ux-planner / 기한: 2026-05-21
- (REQ) §D #9 — 인-스테이지 힌트 즉시 구매 방식 PRD §B 명시 필요 / 담당: service-planner / 기한: 2026-05-14 (PRD 재작성 시)
- (REQ) PRD §B 재작성 예정 — §B 분해 깊이 미흡(NN 미세 분해 미수행) + brainstorming 누락. controller brainstorming 결과 수신 후 진입

## 다음 액션
- service-planner: idle — controller brainstorming 결과 SendMessage 수신 시 PRD §B 재작성 진입
- ux-planner: idle — service-planner PRD 신규 broadcast 수신 시 재진입 (v0.5 보존 상태 재활용)
- publisher: idle — 현재 작업 그대로 종료 (PM 명시 2026-05-07). 04-prototype-mvp/ v0.5 상태 보존
- PM 결정 대기: §D 이슈 #1·#3·#5 잔여 (기한 2026-05-14)
- 마지막 업데이트: 2026-05-07 (P idle 종료 — PM 명시)
