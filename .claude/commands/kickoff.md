---
description: 신규 프로젝트를 0에서 노션 등록까지 순차 착수. 슬러그 생성 → STATE.md 초기화 → 서비스기획자 → 기술검토자 → UX기획자 → 퍼블리셔(MVP) → 노션관리자를 전제 조건 체크와 함께 순차 호출.
argument-hint: <고객사> <프로젝트명> [PM]
---

# /kickoff — 신규 프로젝트 착수

신규 프로젝트 1건을 **PRD → 기술 검토 → UX 명세 → 퍼블리셔(MVP) → 노션 등록**까지 자동 순차 진행한다 (M13 v1 정합).

## 인자
- `$1` 고객사명 (필수)
- `$2` 프로젝트명 (필수)
- `$3` PM (선택, 미지정 시 사용자에게 질의)

## 절차 (팀장 Claude가 수행, 1~7단계)

### 1단계 — 슬러그·STATE 초기화

1. 고객사·프로젝트명으로 **슬러그 생성** (영문 소문자 + 하이픈, CLAUDE.md §5)
   - 예: "BNSYSTEM / Verihum 사람 인증" → `verihum-auth`
   - 슬러그 충돌 시 접미사 `-v2` 등으로 구분
2. `projects/<slug>/` 디렉토리 생성
3. `projects/<slug>/STATE.md` 초기화 (CLAUDE.md §5 필수 필드 모두 포함)
   - 고객사, 슬러그, Notion Page ID(미등록), PM, 현재 단계(`기획중`), 마지막 업데이트(오늘)
   - 산출물 인덱스 4개 빈 체크박스 (01-prd / 02-tech-review / 03-ux-spec / 04-prototype-mvp/)
   - Decision Log: "`/kickoff`로 착수 (YYYY-MM-DD)"
4. `projects/_INDEX.md`에 신규 행 추가 또는 `weekly-status` Skill 호출로 재생성

### 2단계 — 서비스기획자 호출 (Mesh 분해 시작)

- **Mesh 분해**: 4명 동시 draft Task 생성 → 팀장 confirm 후 정식 산출물 진입 (CLAUDE.md §4)
- Agent: `서비스기획자`
- 입력: 슬러그, 고객사, 프로젝트명, PM, 비즈니스 배경(사용자에게 질의)
- 작업: `01-prd.md` 작성 + 부분 broadcast (WHY·1차 사용자 확정 시점)
- 완료 후 **PRD 자가 점검 §A 6/7 이상 + §B error 0 확인**
  - 미달 → 중단, 사용자에게 "재작성 또는 요구사항 재검토" 옵션 제시 (CLAUDE.md §10)

### 3단계 — 기술검토자 호출

- **전제**: `01-prd.md` 존재 + §A 6/7 + §B error 0
- 부분 broadcast 받자마자 외부 의존성 1차 조사 시작 가능 (PRD 완성 대기 X)
- Agent: `기술검토자`
- 작업: `02-tech-review.md` 작성 + 부분 broadcast
- 완료 후 **기술 검토 §A 4/5 + §B error 0 확인**

### 4단계 — UX기획자 호출

- **전제**: `01-prd.md` + `02-tech-review.md` 둘 다 존재 + 각 자가 점검 통과
- Agent: `UX기획자`
- 작업: `03-ux-spec.md` 작성 (4상태 정상/빈/에러/로딩 자동 실패 조건)
- **S 확정 broadcast 발행** → 퍼블리셔 진입 가능 (M9-2-c-4)
- 완료 후 **UX §A 3/4 + §B error 0 + 빈/에러/로딩 누락 없음 확인**

### 5단계 — 퍼블리셔(MVP) 호출 (M13 v1 신설)

- **전제**: 01·02·03 모두 + 03 자가 점검 통과 + S 확정 broadcast 수신
- 단 `assets/{tokens, css, js}/` 골격은 S broadcast 무관 선행 가능 (M9 §2-5)
- Agent: `퍼블리셔` (MVP 모드 only)
- 작업: `04-prototype-mvp/{pages/<slug>.html, assets/, README.md}` 작성
  - P-NNN 발급 (HTML 파일 생성 시 max(NNN)+1)
  - HTML 상단 주석 SSoT (`<!-- P-NNN / → REQ-XXX -->`)
  - README NA list (`- REQ-NNN: 사유 1줄` 형식, §3-3 I5)
- 완료 후 **퍼블 자가 점검 §A 6/7 + §B error 0 확인**

### 6단계 — 노션관리자 호출 (PM 명시)

- **PM 명시 호출** — 자동 호출 아님. 노션 쓰기 settings.json `ask` 권한 발화 (CLAUDE.md §10)
- Agent: `노션관리자` (페이즈 외부 공통 도구)
- 작업: 4개 산출물을 노션에 새 프로젝트 페이지로 등록
  - `API-post-page`로 PROJECT DB 하위에 신규 페이지 생성
  - `API-patch-block-children`으로 산출물 블록 추가:
    - 01·02·03 → paragraph + bulleted_list_item 변환
    - 04-prototype-mvp/README.md → 노션 본문 / pages·assets → 외부 링크 (블록 변환 불가)
- STATE.md의 `Notion Page ID` 필드 업데이트
- 완료 후 노션 자가 점검 6/7 확인

### 7단계 — 사용자에게 최종 보고

CLAUDE.md §11 표준 출력 4블록 준수:

```
[팀장] 신규 프로젝트 착수 완료
- 산출물: projects/<slug>/{01-prd.md, 02-tech-review.md, 03-ux-spec.md, 04-prototype-mvp/}
- 자가 점검 요약: PRD N/7 / Tech N/5 / UX N/4 / P N/7
- 오픈 이슈: N건
- 다음 권장: 노션 페이지 확인 / v1.1 페이즈 2 진입 시점 PM 결정
```
- 노션 URL 별도 표시

## 게이트 로직 (Stage CLAUDE.md §6 에이전트 호출 원칙)

각 단계 사이에 다음을 강제한다:

| 게이트 | 조건 | 미달 시 |
|--------|------|--------|
| 2→3 | PRD §A 6/7 + §B error 0 | 서비스기획자 재작성 요청 또는 중단 |
| 3→4 | 기술 §A 4/5 + §B error 0 | 기술검토자 재작성 요청 |
| 4→5 | UX §A 3/4 + §B error 0 + 빈/에러/로딩 자동 실패 없음 + S broadcast 발행 | UX기획자 재작성 요청 |
| 5→6 | 퍼블 §A 6/7 + §B error 0 | 퍼블리셔 재작성 요청 |
| 6 | 노션 자가 점검 ≥ 6/7 | 롤백 후 재시도 1회 |

## 중단 조건

- 사용자가 중단 요청
- 자가 점검 3회 연속 미달 (CLAUDE.md §10 재시도 한계)
- 노션 API 오류 2회 이상
- 고객사·프로젝트명이 비어있거나 불명확

## 주의

- **사용자 질의는 가능한 한 한 번에 묶어서** (`AskUserQuestion`)
- 중간 산출물을 사용자에게 모두 보여주지 말고 **요약+링크**만 (CLAUDE.md §11)
- 각 에이전트의 개별 완료 보고는 팀장이 내부적으로 수집하고, 사용자에게는 최종 7단계 보고만 전달
- 페이즈 2 (`/handoff`·퍼블 Production·백엔드) 진입은 v1 미정의 — v1.1+ 신설 (CLAUDE.md §12)
