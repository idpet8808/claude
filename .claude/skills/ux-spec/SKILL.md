---
name: ux-spec
description: UX 화면 명세서 작성 Skill. UX기획자가 PRD §B 요구사항 카탈로그와 기술 검토서를 기반으로 화면 메타(7 필드) + 시각적 스켈레톤 와이어프레임(마크다운 ASCII/Unicode 박스) + Description(영역별 번호 + 동작·연결 페이지) + 4상태(정상/빈/에러/로딩) 명세할 때 호출. Screen ID = UI-{명칭}-{NN} BN 표준. 출력은 projects/<slug>/03-ux-spec.md 고정. PRD(01-prd.md)와 기술검토서(02-tech-review.md) 둘 다 선행 필수.
---

# ux-spec — UX 화면 명세서 작성 Skill

## 본질

UX기획자(UX owner)가 PRD §B 요구사항 카탈로그를 *기준 SSOT*로 받아 *시각적 스켈레톤 와이어프레임 + Description* 산출. 퍼블이 받아서 HTML/CSS/JS 변환할 수 있는 *전달 자료*.

**격차 7 정정 본질** (M16):
- 텍스트 명세만 (M9·M13) 폐기 — *시각적 스켈레톤 와이어프레임* 필수
- BN 표준 Screen ID `UI-{명칭}-{NN}` (S-NNN 폐기)
- 화면 메타 7 필드 + Description (영역별 번호 + 동작·연결)

## 언제 쓰나

- UX기획자가 `/kickoff` [4] 병렬 진행 단계에서 자기 영역 명세서를 작성할 때 (4명 동시 spawn 시작점부터)
- **선행 조건**: `projects/<slug>/STATE.md` 존재 + `projects/<slug>/_broadcast.log` 생성됨

**선행 산출물 *완성* 사용 게이트** (CLAUDE.md §6-2):
- UX가 PRD/Tech를 *완성된 산출물로 사용*하는 시점 게이트: PRD 자가점검 통과 + Tech §A 4/5 + §B error 0
- **단 부분 broadcast/reply 흐름은 게이트 무관** — REQ/TR 부분 broadcast 받자마자 즉시 진행 (§4-0 (iv))

## §4-0 Mesh 5요소 정합 (M15 보존)

- (i) **4명 동시 spawn 시작점**: ux-planner 동시 spawn. 본 Skill은 spawn 직후부터 호출 가능
- (ii) **부분 broadcast 연속 흐름**: 명세 중 부분 확정 사건마다 즉시 발행
- (iii) **양방향 reply (multi-hop 중간 노드)**: PRD 모순·누락 → service-planner reply / Tech 모순 → tech-reviewer reply / 퍼블 reply 받았을 때 PRD 기인 시 즉시 REQ reply (격차 5 multi-hop 시나리오)
- (iv) **자가점검 = 완성 검증**: 명세서 완성 시점 1회. 후행(P) 진입 트리거 *아님*
- (v) **모든 영역 병렬·유기**: reply 처리 중에도 자기 영역 다른 작업 진행 계속

## 호출 절차

### 1. STATE.md + `_broadcast.log` + 01-prd.md + 02-tech-review.md first read

- STATE.md: 현재 단계·PM·오픈 이슈 파악
- `_broadcast.log`: PRD/Tech 부분 broadcast 수신 사건 추적
- 01-prd.md:
  - §0 PM 원본 *그대로 참조* (변환·삭제 금지 — service-planner 영역)
  - §B 요구사항 카탈로그 — 모든 REQ ID 식별 → §1 화면 목록 1:1 매핑 대상
  - §C 표준 패턴 자율 적용 기록 — UX 자율 결정 시 service-planner에 broadcast/reply로 §C 기록 요청 (UX 직접 §C 수정 금지)
- 02-tech-review.md:
  - §2 TR 전수 평가 → *불가능*·*조건부* 판정 식별
  - 기술 제약 반영 (불가능 → 제외 / 조건부 → 대안 경로)

### 2. template.md 로드 → 화면별 명세 작성 (부분 broadcast 연속 흐름)

#### 부분 broadcast 트리거 (명세 중 즉시 발행)

| 트리거 사건 | broadcast 대상 |
|-------------|----------------|
| 화면 1개 후보 (UI-{명칭}-{NN} 발급) | P |
| 화면 1개 메타 7 필드 채움 | P |
| 화면 1개 시각적 스켈레톤 작성 | P |
| 화면 1개 4상태 확정 | P |
| 빈/에러/로딩 자동 실패 발견 | REQ/TR |
| S 확정 (모든 화면 + 4상태 완료) | P (완성 broadcast — 부분 broadcast 누적 결과) |

발행 방식: `SendMessage`(broadcast) 또는 `_broadcast.log` 8필드 기록 (type=`broadcast`, owner=`UX`, target=`UI-{명칭}-{NN}`)

#### 작성 시 본질 영역

- **§1 화면 목록**: PRD §B 카탈로그 전수 매핑 (1 REQ ↔ N 화면 / 1 화면 ↔ N REQ)
- **§2 화면 명세** (각 화면):
  - **메타 7 필드** (자동 실패 조건 A-1): 버전·화면명·Screen ID·이용자·작성인·작성일·페이지 경로
  - **Screen ID 정규식** (자동 실패 조건 A-2): `^UI-[A-Za-z][A-Za-z0-9_]*-\d{2}$`
  - **시각적 스켈레톤** (통과율 B-1, 격차 7 핵심): 마크다운 ASCII/Unicode 박스 (예: `┌─┐ ├─┤ └─┘`). *비주얼 디자인 시안 X* (색상·폰트·세부 X — 화면 *구조*만)
  - **Description** (통과율 B-2): 영역별 번호 (1, 2, ...) + 설명 + 구성 요소 정의 + 동작 + 연결 페이지
  - **4상태** (자동 실패 조건 A-3): 정상/빈/에러/로딩 모두 정의 (1건 누락 시 자동 실패)
  - **인터랙션**: 트리거/동작/결과 3요소
  - **기술 제약 반영**: TR 판정 *불가능* → 제외 / *조건부* → 대안 경로
- **§3 공통 컴포넌트 / §4 네비게이션 플로우 / §5 접근성·반응형 / §6 오픈 이슈** 보존

### 3. PRD/Tech 명시 없음 발견 시 reply 의무 (§4-0 (iii))

- PRD §B에 *명시 없음* 발견 시 자율 결정 금지 → service-planner reply 발행
- Tech §2에 *기술 제약 명시 없음* 발견 시 → tech-reviewer reply 발행
- **격차 5 multi-hop 시나리오** (퍼블 → UX → REQ 연쇄):
  ```
  퍼블: UI-Member_Detail-03 그리드 사양 누락 → SendMessage(ux-planner) reply
     ↓
  UX: PRD §B에 REQ-USR-005-01 N값 미정 발견 → SendMessage(service-planner) reply
     ↓
  REQ: 자가점검 재발동 → broadcast(전체): "REQ-USR-005-01 N=Top 10 확정"
     ↓
  UX: 03 보강 → broadcast(P): "UI-Member_Detail-03 그리드 확정"
     ↓
  퍼블: HTML 진행 재개
  ```

### 4. 특정 로직 발견 시 PM 추가 질의 (PI-012)

- 도메인 로직 (랭킹 표시 N값·매칭 알고리즘 결과 화면 등)
- 결제 흐름 화면 (PG사별 흐름 차이)
- 비표준 비즈니스 로직 화면

→ controller 경유 PM `AskUserQuestion` 또는 service-planner reply → PM 결정 → PRD §B 명시 + UX 화면 갱신

### 5. 다른 영역 reply 수신 시 처리 (§4-0 (iii))

P가 UX 산출물 모순·누락 발견하여 reply 발행한 경우:
- 자가점검 재발동 → 보강 → broadcast 재발행
- UX가 PRD 기인 격차 발견 시 즉시 REQ reply (multi-hop 중간 노드)
- 자기 영역 다른 작업은 진행 계속 (§4-0 (v))

### 6. checklist.md 로드 → 자가 점검 (§4-0 (iv) 완성 검증 한정)

#### §A 자동 실패 조건 (3건 — 1건 위배 시 즉시 재작성)
- A-1: 화면 메타 7 필드 누락 0건
- A-2: Screen ID 정규식 정합
- A-3: 4상태 (정상/빈/에러/로딩) 모두 정의

#### §A 통과율 4항목 (3/4 이상 통과)
- B-1: 시각적 스켈레톤 와이어프레임 존재
- B-2: Description (영역별 번호 + 동작·연결) 정합
- B-3: 요구사항 ID 1:1 매핑 (PRD §B 카탈로그 전수)
- B-4: 기술검토 제약 처리

#### §B M11 v1 cross-ref (8필드 + 정규식 갱신)
- F-1~F-8 / M-b·M-c·M-e / H-1·H-2·H-5 / U-1~U-5
- Screen ID 정규식: `^UI-[A-Za-z][A-Za-z0-9_]*-\d{2}$`
- REQ 매핑 정규식: `^REQ-[A-Z]{2,4}-\d{3}-\d{2}$`

**통과 기준**: 자동 실패 0 + §A 통과율 ≥ 3/4 + §B error 0 → 후행 영역(P) *완성 산출물 사용 게이트* 통과.

### 7. STATE.md 갱신 (last write 원칙)

- 산출물 인덱스: `- [x] 03-ux-spec.md (YYYY-MM-DD)`
- Decision Log: 기술 제약 처리·접근성 결정·표준 패턴 자율 결정 등 기록
- 마지막 업데이트 갱신

## 출력 경로

- `projects/<slug>/03-ux-spec.md` (고정)
- 다른 경로 출력 금지

## 완료 보고 형식 (CLAUDE.md §11 4블록)

```
[UX기획자] 완료
- 산출물: projects/<slug>/03-ux-spec.md (UI-{명칭}-{NN} N건 발급)
- 자가 점검: §A 자동 실패 0/3 + 통과율 N/4 + §B error N건
- 오픈 이슈: N건 (담당자·기한)
- 다음 권장: 후행 영역(P) *완성 산출물 사용 게이트* 통과 — 퍼블 진행 중
```

## 영역 침범 금지 (CLAUDE.md §6·§9)

- ❌ **PRD §0 PM 원본 변환·삭제** (service-planner 영역)
- ❌ **비주얼 디자인 시안 결정** (색상·폰트·세부 디자인 — 디자이너 영역, 페이즈 1 v1 미정의)
- ❌ **시각적 스켈레톤 부재** (텍스트 명세만 — 격차 7 회귀)
- ❌ **Screen ID `S-NNN` 형식 사용** (M16에서 폐기 — `UI-{명칭}-{NN}` 단일)
- ❌ **PRD/Tech 명시 없음 자율 결정** (격차 4 회귀 — reply 의무)
- ❌ **묶음 broadcast** (UI 확정 broadcast 1회 = 격차 2 회귀)
- ❌ **기술검토 *불가능* 컴포넌트 사용** (기술 제약 무시 = 스프린트 폭파)
- ❌ **빈/에러/로딩 상태 누락** (자동 실패 조건 A-3)

## 참조 파일

- `template.md` — 화면별 메타 7 필드 + 시각적 스켈레톤 + Description 구조
- `checklist.md` — 자동 실패 3 + 통과율 4 + §B M11 v1 cross-ref
- `CLAUDE.md` §4-0 — Mesh 본질 5요소
- `CLAUDE.md` §6-2 — 선행 산출물 *완성* 사용 게이트

## 변경 이력

- (2026-05-07) **M16 진입** — UX 본질 재설계 (격차 7 정정). Screen ID `UI-{명칭}-{NN}` BN 표준 (S-NNN 폐기). 시각적 스켈레톤 와이어프레임 + 화면 메타 7 필드 + Description (영역별 번호 + 동작·연결) 신설. 요구사항 ID 1:1 매핑 + REQ 4 segment 인용. M15 B-4 (ux-planner 에이전트 정의 보강분 — 격차 5 multi-hop) 통합. PI-001~PI-019 정합.
- (이전) M9·M13 — 텍스트 명세만 + S-NNN ID + Must 정합 가정 (M16에서 폐기).
