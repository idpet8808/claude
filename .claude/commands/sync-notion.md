---
description: 로컬 산출물 파일을 노션 페이지에 동기화. 노션관리자 에이전트를 호출해 notion-sync Skill을 실행. 마크다운 → paragraph/bulleted_list_item 블록으로 변환 후 업로드.
argument-hint: <파일경로>
---

# /sync-notion — 로컬 산출물 → 노션 동기화

로컬 마크다운 산출물을 노션 페이지에 업로드한다.

## 인자
- `$1` 로컬 파일 경로 (필수, 예: `projects/verihum-auth/01-prd.md`)

## 절차 (팀장 Claude가 수행)

1. **파일 경로 검증**
   - 파일 존재 확인 (`Read` 도구)
   - `projects/<slug>/` 하위 파일인지 확인 (아니면 거부)
   - 경로에서 `<slug>` 추출

2. **STATE.md 확인**
   - `projects/<slug>/STATE.md` 읽기
   - `Notion Page ID` 필드 값 확인

3. **노션관리자 호출**
   - Agent: `노션관리자`
   - 입력:
     - 동기화 대상 로컬 파일 경로
     - 상위 페이지 ID (STATE.md의 Notion Page ID)
     - 슬러그
   - 노션관리자는 `notion-sync` Skill을 경유:
     - 파일 읽기
     - `md-to-notion-blocks.md` 규칙으로 블록 배열 생성
     - **04-prototype-mvp 처리** (M13 v1): README.md → 본문 / pages·assets → 외부 링크 (블록 변환 불가)
     - 페이지 ID가 있으면 `API-patch-block-children`으로 추가
     - 페이지 ID가 없으면 팀장에게 "1) 신규 페이지 생성 2) 검색 후 연결 3) 중단" 옵션 보고

4. **승인 프롬프트**
   - 노션 쓰기 API(`post-page`, `patch-block-children`)는 settings.json의 `ask` 권한
   - 사용자에게 자동으로 승인 프롬프트 발생

5. **완료 후 STATE.md 갱신**
   - `Notion Page ID` 필드 반영 (신규 생성 시)
   - Decision Log: "`<파일명>`을 노션에 동기화 (page_id=..., YYYY-MM-DD)"
   - 마지막 업데이트 갱신

6. **사용자에게 완료 보고**
   ```
   [노션관리자] 동기화 완료
   - 대상 파일: <path>
   - 노션: <URL>
   - 자가 점검: N/7
   - 손실된 서식: <있으면 나열> (예: 중첩 불릿, 표 셀 정렬)
   ```

## 게이트 로직
- 파일이 `projects/` 밖 → 거부 ("하네스는 projects/ 하위만 동기화")
- 파일이 존재하지 않음 → 거부
- 자가 점검 통과율이 85% 미만인 산출물 → **동기화 경고** 출력 후 사용자 최종 확인 대기

## 주의
- **고급 블록 시도 금지** — `paragraph`와 `bulleted_list_item`만 (CLAUDE.md §8)
- **query-data-source API 사용 금지** — 검색은 `post-search` + 수동 필터 (노션관리자 §4)
- **산출물 내용 편집 금지** — 변환만, 수정은 원 에이전트의 책임
- **3개 산출물(01-prd, 02-tech-review, 03-ux-spec) 외 파일**도 `projects/<slug>/` 내부면 동기화 허용 (예: `meeting-notes.md`)
