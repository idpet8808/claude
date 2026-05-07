---
name: notion-sync
description: 로컬 마크다운 산출물을 노션 페이지에 동기화하는 Skill. 노션관리자가 projects/<slug>/01-prd.md, 02-tech-review.md, 03-ux-spec.md를 노션 페이지 하위 블록으로 변환해 업로드할 때 호출. 노션 MCP는 paragraph + bulleted_list_item만 지원하므로 변환 규칙은 md-to-notion-blocks.md 참조. Notion 쓰기 API는 settings.json에서 ask 권한이므로 호출 시 사용자 승인 필요.
---

# notion-sync — 로컬 마크다운 → 노션 동기화 Skill

## 언제 쓰나
- **노션관리자**가 로컬 산출물을 노션 페이지에 등록할 때 (다른 에이전트는 이 Skill을 직접 호출하지 말고 노션관리자를 경유)
- `/sync-notion <파일경로>` Slash command가 이 Skill을 호출한다
- **선행 조건**:
  - 동기화할 로컬 파일이 실제 존재
  - STATE.md에 `Notion Page ID`가 등록되어 있거나, 등록 없으면 `API-post-search`로 대상 페이지를 먼저 확보

## 호출 절차

1. **STATE.md 읽기** → `Notion Page ID` 필드 확인
   - 미등록 시: `API-post-search`로 프로젝트명 검색 → 매칭되는 페이지가 여러 개면 팀장에게 선택 요청
   - 검색 결과 없음: 팀장에게 "노션에 상위 페이지가 없습니다. 1) 신규 생성 2) 수동 연결 3) 중단" 옵션 3가지로 보고 (CLAUDE.md §9)

2. **로컬 파일 읽기** → 마크다운 원문 확보

3. **md-to-notion-blocks.md 참조** → 블록 배열로 변환
   - 지원 블록: `paragraph`, `bulleted_list_item`만
   - 미지원 블록(표, 토글, 콜아웃, 헤더)은 변환 규칙에 따라 **굵은 글씨 paragraph** 또는 **bulleted_list_item**으로 강등
   - **자가 점검** 섹션은 그대로 유지 (체크박스는 `[x]/[ ]` 문자 그대로)
   - **04-prototype-mvp/ 처리** (M13 v1 추가 규칙):
     - `04-prototype-mvp/README.md` → 노션 본문 (paragraph + bulleted_list_item)
     - `pages/<UI-{명칭}-{NN}>.html` 및 `assets/` → **외부 링크만** (블록 변환 불가)
       - 형식: `\`pages/<UI-{명칭}-{NN}>.html\`` (코드 폰트) + 로컬 경로 표시
     - `04-prototype-mvp/` 폴더 자체는 노션에 등록 X (README만 본문)

4. **노션 API 호출** (쓰기 작업 — settings.json `ask` 권한 → 사용자 승인 프롬프트 발생)
   - 신규 페이지: `API-post-page` (PROJECT DB 하위)
   - 기존 페이지에 블록 추가: `API-patch-block-children`
   - API 오류 2회 이상 발생 시 재시도 중단 (CLAUDE.md §9 재시도 한계)

5. **STATE.md 갱신**
   - `Notion Page ID` 최신값 반영
   - Decision Log: "<파일명>을 노션에 동기화 (page_id=..., YYYY-MM-DD)"
   - 마지막 업데이트 갱신

## 출력
- 노션 page_id (신규 생성 시)
- 노션 URL (로그 출력)
- STATE.md 갱신

## 완료 보고 형식
```
[노션관리자] 완료
- 산출물: 노션 page_id=<id> (URL: ...)
- 자가 점검: N/7 (노션관리자 에이전트 정의의 체크리스트 기준)
- 오픈 이슈: N건
- 다음 권장: 사용자 노션 페이지 확인
```

## 주의
- **고급 블록 시도 금지** — CLAUDE.md §8 안티 패턴
- **산출물 내용 편집 금지** — 변환만, 편집은 원래 에이전트의 책임
- **query-data-source API 사용 금지** — `post-search` + 수동 필터 (노션관리자 정의 §4)

## 참조 파일
- `md-to-notion-blocks.md` — 마크다운 요소별 블록 변환 규칙
- `.claude/agents/notion-manager.md` §3 — 검증된 API 레시피 8종
