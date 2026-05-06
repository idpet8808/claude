# 멘사 — 랭킹챌린지 — MVP 프로토타입

> **PM 결정**: 본 MVP는 **S1 메인 페이지(랭킹 위젯) + S4-A 배수 수열 (문제 풀이 시연) 2개 우선 구현**. 다른 화면(S2·S3·S4-B~E·S5~S8)은 후속 작업으로 미룸 (M13 v1 C6 운영 검증 + PM 추가 요청 — 가속 시연).
> 03-ux-spec.md S1·S4-A 명세 그대로 매핑 (퍼블리셔 화면 가감 권한 없음 — M13-① 결정 #3).

## 화면 매핑 (P-NNN ↔ REQ)

| P-NNN | 화면명 | 매핑 REQ | pages/ |
|-------|--------|---------|--------|
| **P-001** | S1. 온라인테스트 첫 페이지 — 랭킹 위젯 | F-1 (랭킹 시스템), F-8 (첫 페이지 노출) | `pages/mensa-ranking-challenge.html` |
| **P-002** | S4-A. 배수 수열 챌린지 풀이 (sequence_fill) | F-2 (챌린지 무료 도전), F-3 (힌트·패스) | `pages/mensa-ranking-challenge-baesu-suyeol.html` |

**HTML 상단 주석 SSoT** (M9-5 cross-ref F-4 정합):
```html
<!-- P-001 / → F-1, F-8 (랭킹 시스템 + 온라인테스트 첫 페이지 노출) -->
<!-- P-002 / → F-2, F-3 (챌린지 무료 도전 + 힌트·패스 — S4-A 배수 수열) -->
```

## 후속 작업 예정

본 MVP는 PM 결정에 따라 S1 1개만 우선 구현. 다음 화면은 후속 작업 예정 (P-002~P-008 발급 대기):

> **참고**: P-NNN은 *발급 순서대로 max+1* (M9 §1-2-2). UX 명세 S2·S3·... 순서와 다를 수 있음. 진행 시 max+1 발급.

| 후속 P-NNN (예상) | 화면명 | 매핑 Must / 비고 |
|-----------|--------|-----------------|
| P-003 (예정) | S2. 로그인 | F-5 (기존 멘사 DB 연동) — TR-01 미팅 결과(2026-05-09)에 따라 시나리오 A/B/C 분기 |
| P-004 (예정) | S3. 챌린지 목록 | F-2 (챌린지 무료 도전) |
| P-005 (예정) | S4-B. 11배수 스도쿠 (grid_puzzle) | F-2 + F-3 — **전용 인터랙티브 React 컴포넌트** 별도 개발 필요 |
| P-006 (예정) | S4-C. 너는 바보입니다 (symbol_equation) | F-2 + F-3 |
| P-007 (예정) | S4-D. 아름다운 수열 (graph_fill) | F-2 + F-3 — **전용 인터랙티브 React 컴포넌트** 별도 개발 필요 |
| P-008 (예정) | S4-E. 아 치킨먹고싶다 (meta_quiz) | F-2 + F-3 |
| P-009 (예정) | S5. 결과·랭킹 반영 | F-1 + F-2 |
| P-010 (예정) | S6. 힌트·패스 구매 모달 | F-3 (힌트·패스 유료 판매) |
| P-011 (예정) | S7. 유료결제 패스 상품 | F-4 — TR-04(구독형 vs 소진형) feature flag 처리 |
| P-012 (예정) | S8. 관리자 대시보드 | Should F-6 — Must 격상 PM 결정 대기 (오픈 이슈 #3) |

## [NOT APPLICABLE]

본 프로젝트에서 적용되지 않는 항목 (P 영역 NA SSoT 예외 §3-3 I5).
형식: `- REQ-NNN: 사유 1줄` (PRD REQ 실제 존재 검증 — F-8).

해당 없음 — NA 항목 0건

## 콘텐츠 자료 인지

`../_reference/` 5종 콘텐츠 (11배수 스도쿠 / 너는 바보입니다 / 배수 수열 / 아 치킨먹고싶다 / 아름다운 수열)는 **챌린지 화면(S4) 후속 작업에서 활용 예정**. 본 작업(S1)에서는 직접 사용 안 함.

## assets/ 변경 이력

(M13-① 결정 #4 — 별도 CHANGELOG 없음, STATE.md Decision Log 통합)

- 2026-05-06 — assets/tokens/colors.css 신설 — 멘사 톤 (검정 #1a1a1a primary + gold accent #c9a227 + 회색 보조 + status 4색)
- 2026-05-06 — assets/tokens/spacing.css 신설 — 8px 기반 spacing scale (xs 4px ~ xl 64px) + radius + touch-min
- 2026-05-06 — assets/tokens/typography.css 신설 — system font stack, font-size sm/md/lg/xl, weight 400/500/600/700
- 2026-05-06 — assets/css/base.css 신설 — reset + button system + skeleton 로딩 (S2~S8 후속에 재사용)
- 2026-05-06 — assets/js/main.js 신설 — 시연용 mock 인터랙션 (실 API 연결 X, v1.1+ 본 구현 시 정식화)

## MVP 시연 가이드

`pages/mensa-ranking-challenge.html`을 브라우저에서 열면:

1. **상단 4상태 시연 탭** (정상 / 빈 / 에러 / 로딩) — 토글 클릭 시 위젯이 4상태 모두 전환 시연 (UX §2 4상태 자동 실패 조건 정합)
2. **정상 상태**: Top-5 랭킹 (마스킹 닉네임) + 내 순위 (23위) + "도전하기" CTA
3. **빈 상태**: "아직 도전한 회원이 없습니다" + 첫 도전 CTA
4. **에러 상태**: "랭킹을 불러올 수 없습니다" + 재시도 버튼
5. **로딩 상태**: skeleton 5개 (1.4s 펄스 애니메이션, base.css)
6. **모바일**: 600px 미만에서 Top-3으로 축소 (UX §2-2 정합)

## 자가 점검 (M11 v1 — M9 §10-2-2 정합)

### §A. 산출물 품질 (7항목, 통과 기준 6/7)

- [x] **항목 1: F-1·F-2·F-3** ID 정합 — P-001 1건. 중복·재사용 없음. 결번 없음. (M9 §1-2-2 정합)
- [x] **항목 2: F-4·F-5·F-6** 헤더 정합 — `<!-- P-001 / → F-1, F-8 -->` 형식 일치. 누락 0건. (자동 실패 회피)
- [x] **항목 3: F-8 + NA SSoT 예외 (§3-3 I5)** — README NA 섹션 존재 + "해당 없음 — NA 항목 0건" 명시. (자동 실패 회피)
- [x] **항목 4: M-b·M-c (P 영역)** — orphan 없음 (P-001이 REQ 참조). 끊김 검증은 F-1·F-8 PRD §4 Must 1·8 매핑 (UX 명세 §S1 인용)
- [x] **항목 5: M-e (NA → active 참조 모순)** — NA 0건이므로 N/A
- [x] **항목 6: H-1·H-2·H-5 (NA 휴리스틱)** — NA 0건이므로 N/A 명시
- [x] **항목 7: U-1·U-2·U-3·U-4·U-5 묶음** — U-1 M9-5 자동 검증 통과 / U-2 Decision Log 갱신 / U-3 후행 영역 N/A (퍼블 = 페이즈 1 마지막) / U-4 노션 동기화 PM 명시 대기 / U-5 본 자가 점검 결과를 README + STATE Decision Log에 기록

**통과율 §A: 7/7** (PM 결정 - S1만 우선이라 *부분 작업*이지만 작업한 P-001 1건에 대해서는 모든 항목 충족)

### §B. M11 v1 cross-ref (8필드 — M9 §9-4 F-7)

| type | timestamp | owner | target | 위반 항목 ID | result | 사유 | evidence_ref |
|------|-----------|-------|--------|------------|--------|------|--------------|
| self-check | 2026-05-06 | 퍼블리셔(위임) | 04-prototype-mvp/P-001 | F-1·F-2·F-3 | pass | P-001 1건 발급, 중복·재사용 없음, 결번 없음 | grep "<!-- P-" pages/*.html |
| self-check | 2026-05-06 | 퍼블리셔(위임) | 04-prototype-mvp/P-001 | F-4·F-5·F-6 | pass | HTML 상단 주석 SSoT 형식 일치, 누락 0건 | head -1 pages/mensa-ranking-challenge.html |
| self-check | 2026-05-06 | 퍼블리셔(위임) | 04-prototype-mvp/README | F-8 + NA SSoT | pass | README NA 섹션 + "해당 없음 — NA 항목 0건" 명시 | grep -A 2 "NOT APPLICABLE" README.md |
| self-check | 2026-05-06 | 퍼블리셔(위임) | 04-prototype-mvp/P-001 | M-b·M-c | pass | P-001 → F-1·F-8 매핑, UX 명세 §S1 인용 | UX 03-ux-spec.md §S1 line 27 |
| self-check | 2026-05-06 | 퍼블리셔(위임) | 04-prototype-mvp | M-e | N/A | NA 0건 | — |
| self-check | 2026-05-06 | 퍼블리셔(위임) | 04-prototype-mvp | H-1·H-2·H-5 | N/A | NA 0건 | — |
| self-check | 2026-05-06 | 퍼블리셔(위임) | 04-prototype-mvp | U-1·U-2·U-4·U-5 | pass | 자동 검증 통과·Decision Log 기록·노션 동기화 PM 명시 대기·evidence 첨부 | _broadcast.log + STATE.md |
| self-check | 2026-05-06 | 퍼블리셔(위임) | 04-prototype-mvp | U-3 | N/A | 퍼블리셔는 페이즈 1 마지막 영역, 후행 통지 대상 없음 (M9 §10-2-2 line 1752) | — |

**§B error 0건** (자동 실패 조건 회피: HTML 상단 주석 SSoT 누락 X / README NA 형식 X)

### 통합 통과 기준
§A 7/7 + §B error 0 + 자동 실패 조건 0 → **통과** (노션관리자 호출 가능)

## 위임 사유

본 작업은 `.claude/agents/publisher.md` (퍼블리셔 MVP 모드)에 따라 진행해야 했으나, **세션 중 신설된 에이전트라 Claude Code Agent tool 미인식**. `general-purpose` 위임으로 assets 골격 작성 후 한도 도달, **팀장(Claude) 직접 마무리** (pages/HTML + README + STATE 갱신). 시행착오 #3 (`_FOLLOWUP.md` ②)에 등록 완료.
