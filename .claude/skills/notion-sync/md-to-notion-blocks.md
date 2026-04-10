# 마크다운 → 노션 블록 변환 규칙

노션 MCP가 지원하는 블록은 `paragraph`와 `bulleted_list_item` 두 종류뿐이다 (노션관리자 정의 §4 블록 타입 제한).
이 규칙은 로컬 마크다운 원문을 위 두 블록으로 강등(downgrade)하는 정책을 정의한다.

---

## 변환 규칙 표

| 마크다운 요소 | 예시 원문 | 변환 후 블록 | 비고 |
|---|---|---|---|
| H1 (`#`) | `# 제목` | `paragraph` (굵게 + 줄바꿈) | rich_text에 `annotations: { bold: true }` 적용 |
| H2 (`##`) | `## 소제목` | `paragraph` (굵게) | 앞줄에 빈 paragraph 1개 삽입 |
| H3 (`###`) | `### 세부` | `paragraph` (굵게) | H2와 동일하게 처리 |
| 일반 단락 | `본문 내용입니다.` | `paragraph` | rich_text 단일 요소 |
| 굵게 | `**중요**` | `paragraph` 내 rich_text | `annotations: { bold: true }` |
| 기울임 | `*강조*` | `paragraph` 내 rich_text | `annotations: { italic: true }` |
| 인라인 코드 | `` `코드` `` | `paragraph` 내 rich_text | `annotations: { code: true }` |
| 링크 | `[텍스트](url)` | `paragraph` 내 rich_text | `text.link = { url }` |
| 불릿 리스트 (`- `) | `- 항목` | `bulleted_list_item` | rich_text 요소 그대로 |
| 번호 리스트 (`1. `) | `1. 항목` | `bulleted_list_item` | 번호는 텍스트 앞에 `1.` 문자로 포함 (degraded) |
| 체크박스 (`- [ ]`) | `- [ ] 해야할 것` | `bulleted_list_item` | 앞에 `☐ ` 또는 `☑ ` 문자 삽입 |
| 표 | `\| a \| b \|` | `paragraph` 여러 개 (행 단위) | 각 행을 `"a | b"` 포맷 paragraph로 강등 |
| 코드블록 | ` ```python ` | `paragraph` 여러 개 | 줄바꿈마다 paragraph 1개, 모두 `annotations: { code: true }` |
| 인용(`> `) | `> 인용문` | `paragraph` | 앞에 `> ` 문자 유지 |
| 수평선 (`---`) | `---` | `paragraph` (빈) | 빈 줄로 시각적 구분 |
| 이미지 | `![alt](url)` | `paragraph` (링크 rich_text) | 업로드 불가 (노션관리자 §4) → URL 링크만 |

---

## 변환 알고리즘 (의사 코드)

```
1. 원문을 라인 배열로 분할
2. 빈 줄은 건너뛰거나 빈 paragraph 삽입 (헤딩 앞)
3. 각 라인을 정규식으로 분류 → 위 표의 규칙 적용
4. children 배열에 블록 순서대로 추가
5. children.length가 100개 초과 시 chunking (노션 API 제약)
6. API-patch-block-children 호출 (chunk당 1회)
```

## chunking 규칙
- 노션 API는 한 번의 `patch-block-children` 호출로 최대 100개 블록까지 허용
- 100개 초과 시 여러 번 나눠 호출 (순서 보장 필수)

## rich_text 기본 형식

```json
{
  "type": "text",
  "text": { "content": "..." },
  "annotations": {
    "bold": false,
    "italic": false,
    "code": false,
    "color": "default"
  }
}
```

## 강등 시 손실되는 정보

다음 정보는 노션에서 표현 불가하므로 변환 과정에서 손실된다 — **자가 점검에서 반드시 보고**:

- 다단계 불릿(중첩 3단 이상)
- 표의 셀 정렬
- 코드블록의 언어 하이라이팅
- 이미지 원본 파일 (URL 링크만)
- 수학식(LaTeX)
- Mermaid 다이어그램

손실된 정보는 노션 페이지 상단에 "⚠ 일부 서식은 로컬 원본 참조 필요" 안내 paragraph를 추가한다.
