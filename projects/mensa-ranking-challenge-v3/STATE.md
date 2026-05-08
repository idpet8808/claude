# 랭킹챌린지_ver3.0
- 고객사: 멘사코리아
- 슬러그: mensa-ranking-challenge-v3
- Notion Page ID: 미등록
- PM: 신주한
- 현재 단계: 기획중
- 시작일: 2026-05-08
- 종료일: (미정)
- 마지막 업데이트: 2026-05-08 (P last-write — PM stop signal 수신, 정지)

## 산출물 인덱스
- [x] 01-prd.md (2026-05-08)
- [x] 02-tech-review.md (2026-05-08)
- [x] 03-ux-spec.md (2026-05-08)
- [x] 04-prototype-mvp/ (2026-05-08 — assets/ 골격 + HTML wireframe 13개 pages/ 발급)

## Decision Log
- (2026-05-08) `/kickoff`로 착수 — 멘사 v3 신규 진입 (M18 첫 적용 검증). v2-0은 비교군으로 보존
- (2026-05-08) 슬러그 `mensa-ranking-challenge-v3` 확정 — PM 인자 "v3" 정합
- (2026-05-08) M18 정의 첫 적용 — UX HTML wireframe 양식 (`04-prototype-mvp/pages/<UI>.html` ux-planner 직접 작성) + publisher CSS·JS·assets 보강. ASCII 박스 폐기
- (2026-05-08) P 영역 assets/ 골격 확정 — tokens/colors.css·spacing.css·typography.css + css/base.css + css/wireframe.css(M18신설) + js/main.js. wireframe.css에 멘사 도메인 클래스 (.quiz-area·.hint-section·.result-section·.dashboard-grid·.stat-card·.timer·.badge 등) 정의.
- (2026-05-08) P 영역 HTML 검토·CSS·JS 보강 완료 — 13개 wireframe 전수 검토. wireframe.css orphan class 전수 정의 추가 (.placeholder.small·.widget-container·.ranking-table·.stage-header·.sudoku-grid·.ring-grid·.modal-container·.summary-card·.card-grid·.tab-btn·.page-main--centered 등). main.js: Stage2 스도쿠 셀 선택+키입력 / Stage5 ring 셀 선택 / 랭킹 탭 전환 / 힌트 패널 토글 추가. README.md 매핑 표 13건 갱신. NA 0건.
- (2026-05-08) P 영역 자가 점검 통과 — 7/7 (자동 실패 0/5). UI ID 1:1 매핑 13건 정합. SSoT 주석 정규식 13/13. area-num 마커 전수. orphan class 0건.
- (2026-05-08) PRD 작성 완료 — 자가 점검 자동 실패 0/5 + 통과율 7/7. §B 12개 요구사항 (RANK 4 + AUTH 2 + QUIZ 4 + PAY 2 + ADMIN 2 NNN). v2-0 대비 AUTH NN 2분해 + PAY NN 2분해 + ADMIN 2 NNN 분리 (M17 A-5 Use Case 분해 정합). 특정 로직 PM 질의 §D #2·#4 등재.
- (2026-05-08) TR 기술 검토서 완성 — §A 5/5 + §B error 0. PRD §B 14건 전수 평가 (가능 3건 / 조건부 11건). 기술 스택: PHP + Vanilla JS + 이니시스 PG. DB 미확정(MySQL vs PostgreSQL). 공수 낙관 8주/현실 12주/보수 18주. reply-1(DB 선택)·reply-2(시간보너스 공식·배점 v3 확인) PM 질의 발행 중.
- (2026-05-08) UX — HTML wireframe 13개 발급 (M18 첫 적용 검증): UI-Ranking_Widget-01 / UI-Challenge_Intro-01 / UI-Quiz_Stage_1~5-01 / UI-Item_Purchase-01 / UI-Challenge_Result-01 / UI-Ranking_Board-01 / UI-Payment_Success-01 / UI-Payment_Failure-01 / UI-Admin_Dashboard-01
- (2026-05-08) UX — 4상태 정책: 정상=HTML wireframe / 빈·에러·로딩=03-ux-spec.md 텍스트 (M18 갱신 정합)
- (2026-05-08) UX — TR-003 (9×9 그리드 + 32칸 고리형 조건부) + TR-010 (이니시스 팝업 조건부 대안) 기술 제약 반영
- (2026-05-08) UX — UI-Item_Purchase-01 인-스테이지 모달 방식 채택 (v2-0 §D #9 이슈 해결 방향 정합)
- (2026-05-08) UX — 03-ux-spec.md 자가 점검 통과 (자동 실패 0/3 + 통과율 4/4 + §B error 0건)

## 미해결 이슈
- PRD §D #1 공식 랭킹 힌트 사용자 처리 방식 / 신주한 / 2026-05-15
- PRD §D #2 문제별 제한 시간 + 시간 보너스 공식 확정 / 신주한 / 2026-05-15
- PRD §D #3 유료 패스권 상품 모델 (소진형/기간형) / 신주한 / 2026-05-15
- PRD §D #4 5개 문제 난이도별 배점 방식 / 신주한 / 2026-05-15
- PRD §D #5 AI 의심 기록 처리 방식 (자동 제외 vs 관리자 검수) / 신주한 / 2026-05-15
- UX 오픈 이슈 #1 제한 시간 초과 처리 방식 / 신주한 / 2026-05-15
- UX 오픈 이슈 #2 탭 이탈 시 시각적 경고 표시 여부 / 신주한 / 2026-05-15

## 다음 액션
- 페이즈 1 산출물 4종 완성 — 노션관리자 호출은 PM 명시 결정
- PM: PRD §D 오픈 이슈 5건 결정 (제한시간·배점·패스권·힌트 랭킹처리·AI의심처리)
- PM: DB 선택 (MySQL vs PostgreSQL) + 시간보너스 공식 v3 확인 필요 (TR reply-1·reply-2)
- (2026-05-08) **PM 명시 stop signal 발행** — 4 Teammate shutdown_request 발송. v3 시연 [4] 종료
- v1 운영 시행착오 발견 2건 (`_FOLLOWUP.md` ② 운영 정련 등록 후보):
  - **PI-002 후보**: service-planner §B 12 REQ 묶음 broadcast (부분 broadcast 이상 X — Skill 정의 강화)
  - **PI-024 (D) 확정**: 3 agent (service-planner/tech-reviewer/publisher) controller confirm signal ack 메아리 발생 — 4 agent 정의 §2 작업 절차에 "confirm signal silent 처리" 명시 강화 필요
