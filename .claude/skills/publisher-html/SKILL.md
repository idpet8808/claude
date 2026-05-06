---
name: publisher-html
description: 퍼블리셔 MVP 모드 산출물 작성 Skill. P-NNN 발급 + HTML 상단 주석 SSoT + 04-prototype-mvp/ 폴더 골격 + README NA list 작성. 퍼블리셔 에이전트가 호출. 출력 위치 고정 projects/<slug>/04-prototype-mvp/. UX 명세 화면 목록을 그대로 매핑 (퍼블리셔는 화면 가감 권한 없음).
---

# publisher-html Skill

## 호출 주체
- `.claude/agents/publisher.md` (MVP 모드)

## 선행 조건
- `projects/<slug>/STATE.md` 존재
- `projects/<slug>/01-prd.md`, `02-tech-review.md`, `03-ux-spec.md` 모두 존재
- 03-ux-spec 자가 점검 ≥ 3/4 + S 확정 broadcast 수신 (M9-2-c-4)
- `04-prototype-mvp/` 미존재 (덮어쓰기 금지 — CLAUDE.md §9)

## 절차

1. **폴더 골격 부트스트랩** (`template.md` 참조)
   - `04-prototype-mvp/pages/`, `assets/{tokens, css, js}/`, `README.md` 생성
2. **assets/ 작성** (S 무관 선행 가능 — M9 §2-5)
   - `tokens/`: 디자인 토큰 (color·spacing·typography)
   - `css/`, `js/`: 공통 자산
3. **화면 목록 매핑** — UX기획자(03-ux-spec.md)에 정의된 화면 목록을 **그대로** 매핑. 퍼블리셔는 화면 가감 권한 없음 (CLAUDE.md §6 영역 침범 금지)
4. **`pages/<slug>.html` 작성** (S broadcast 후)
   - 파일명: slug만 (P-NNN 미포함 — M9 §1-2-2)
5. **P-NNN 발급** — HTML 파일 생성 시 영역별 max(NNN)+1 (M10 정합, 불변식 I14)
   - 기존 `pages/` 디렉토리에서 grep으로 max P-NNN 검색 후 +1
6. **HTML 상단 주석 SSoT** — `<!-- P-NNN / → REQ-XXX, REQ-YYY -->` (단일 진실 원천, M9 §1-2)
7. **README.md 매핑 표 + NA list 작성**
   - 매핑 표: P-NNN ↔ REQ-XXX 행
   - NA 섹션: P 영역 NA SSoT 예외 (§3-3 I5)
8. **자가 점검** (`checklist.md` 7항목, 8필드 형식)
9. **STATE.md Decision Log 기록**
   - P-NNN 신규 발급 / assets 토큰 변경 / NA 항목 추가 (별도 CHANGELOG 없음, Decision Log 통합)

## 출력 (산출물)

`projects/<slug>/04-prototype-mvp/` 전체:
```
04-prototype-mvp/
├── pages/<slug>.html
├── assets/{tokens, css, js}/
└── README.md
```

## 자가 점검

`checklist.md`의 7항목 (M13-① brainstorming 결정). 통과 기준 6/7.
