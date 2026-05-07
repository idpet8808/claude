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
- **시각적 와이어프레임 형태** (마크다운 ASCII/Unicode 박스 — 등폭 폰트 paragraph로 변환되나 *시각적 정렬* 손실 가능, M16 PI-019)

손실된 정보는 노션 페이지 상단에 "⚠ 일부 서식은 로컬 원본 참조 필요" 안내 paragraph를 추가한다.

---

## M16 산출물별 변환 규칙 (M16 신설 — PI-002·PI-009·PI-019 정합)

### PRD `01-prd.md` — 6 섹션

| 섹션 | 변환 규칙 |
|------|-----------|
| **§0 PM 입력 원본** | 원문 그대로 paragraph 직렬화 (변환·삭제 0건). 외부 자료(사업계획서·이미지)는 외부 URL 링크 |
| **§A 비전** | WHY (paragraph 다수) + 1차 사용자 (paragraph + bulleted_list_item). KPI 영역 부재 (M16 폐기) |
| **§B 요구사항 카탈로그** | **각 요구사항 = paragraph 그룹** (16 필드 1줄씩 또는 bulleted_list_item N개). REQ ID는 paragraph 헤더(굵게)로 표시. 16 필드 표 → 필드명: 값 1줄 형식 직렬화 |
| **§C 표준 패턴 자율 적용** | 1줄 형식 그대로 bulleted_list_item N개 |
| **§D 오픈 이슈** | 표 → paragraph 다수 (행 단위, "# / 항목 / 담당자 / 기한" 형식) |
| **§E 자가 점검** | 8필드 표 → paragraph 다수 + bulleted_list_item |

### TR `02-tech-review.md`

| 섹션 | 변환 규칙 |
|------|-----------|
| **§2 요구사항 전수 평가** | 표 → paragraph 다수 (TR ID + REQ ID 매핑 행 단위). REQ 4 segment 형식 (`REQ-{도메인}-NNN-NN`) 보존 |
| 기타 섹션 | 표준 변환 규칙 |

### UX `03-ux-spec.md`

| 섹션 | 변환 규칙 |
|------|-----------|
| **화면 메타 7 필드** | paragraph (필드명: 값 1줄씩) — 버전·화면명·Screen ID(UI-{명칭}-{NN})·이용자·작성인·작성일·페이지 경로 |
| **시각적 스켈레톤 (ASCII/Unicode 박스)** | 코드블록 처리 (annotations.code = true). 등폭 폰트 paragraph 직렬화. **강등 시 시각적 정렬 손실 가능** — 노션 페이지 상단 안내 추가 |
| **Description (영역별 번호)** | bulleted_list_item N개 (영역별 번호 + 설명 + 구성 요소 + 동작·연결) |
| **4상태 (정상/빈/에러/로딩)** | paragraph (상태명 굵게) + bulleted_list_item |

### P `04-prototype-mvp/`

| 항목 | 변환 규칙 |
|------|-----------|
| `pages/<UI-{명칭}-{NN}>.html` | **블록 변환 불가** — 외부 링크만 (M16 파일명 UI ID 기반 정합) |
| `assets/{tokens, css, js}/` | **블록 변환 불가** — 외부 링크만 |
| `README.md` | 표준 변환 규칙. 매핑 표(Screen ID + REQ + pages/) → paragraph 다수. NA list → bulleted_list_item N개 (`- REQ-{도메인}-NNN-NN: 사유` 형식) |

### 기능명세서 `01b-functional-spec.md` (옵션 산출물 — PI-005)

- 신설 시 PRD §B와 유사한 변환 규칙 적용
- FN-NNN ID + REQ ID 매핑 표 직렬화

---

## 영역 침범 금지 (M16 신설)

- ❌ **§0 PM 원본 변환·삭제** (PI-009) — service-planner 영역. 노션관리자는 *원문 그대로 직렬화*
- ❌ **PRD §B 16 필드 표 변환 누락** (PI-002) — 모든 필드 paragraph 직렬화 필수
- ❌ **REQ 3자리 형식 매핑** (PI-004) — `REQ-{도메인}-NNN-NN` 4 segment 보존
- ❌ **S-NNN / P-NNN 매핑 표시** (PI-019 A1 폐기) — `UI-{명칭}-{NN}` 단일 사용
- ❌ **시각적 스켈레톤 임의 텍스트 강등** — 코드블록 형식 보존 시도. 강등 시 손실 보고 의무
