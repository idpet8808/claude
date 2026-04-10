---
name: prd-draft
description: PRD(Product Requirements Document) 초안 작성 Skill. 서비스기획자가 신규 프로젝트의 요구사항을 PRD로 정형화할 때 호출. 출력은 반드시 projects/<slug>/01-prd.md 경로에 생성하며, 산출물 하단에 7개 항목 자가 점검 결과를 기록한다.
---

# prd-draft — PRD 초안 작성 Skill

## 언제 쓰나
- 서비스기획자가 `/kickoff` 진입점 또는 팀장 호출로 신규 프로젝트 PRD를 작성할 때
- **선행 조건**: `projects/<slug>/STATE.md` 존재

## 호출 절차

1. **STATE.md 읽기** (first read 원칙 — CLAUDE.md §6)
   - 고객사, PM, 현재 단계, 시작/종료일 확인
   - 이미 `01-prd.md`가 존재하면 덮어쓰지 말고 팀장에게 보고 (CLAUDE.md §8)

2. **입력 요구사항 수집** (부족하면 `AskUserQuestion`으로 질의)
   - 고객사명 (필수)
   - 프로젝트명 (필수)
   - WHY — 이 프로젝트가 필요한 이유 (필수)
   - 1차 사용자 (필수, 1명으로 좁혀야 함)
   - 비즈니스 목표 또는 성공 지표 (필수)
   - 납기·예산 제약 (선택)
   - 참고 자료·기존 시안 (선택)

3. **template.md 로드 → 각 섹션 채우기**
   - 템플릿의 빈 필드를 모두 채우되, 확정되지 않은 항목은 "미정"이 아니라 "**오픈 이슈**"로 별도 등록
   - 미정 필드 5개 이상이면 작업 중단, 팀장에게 블로커 보고 (CLAUDE.md §9)

4. **checklist.md 로드 → 7개 항목 자가 점검**
   - 산출물 하단에 `## 자가 점검` 섹션으로 기록
   - 통과율 < 85% (6/7 미만)이면 재작성 1회 시도
   - 재작성 후에도 미달이면 실패 보고 (CLAUDE.md §10)

5. **STATE.md 갱신** (last write 원칙)
   - 산출물 인덱스의 `- [ ] 01-prd.md` → `- [x] 01-prd.md (YYYY-MM-DD)`
   - Decision Log에 "PRD 초안 작성 (자가 점검 N/7)" 기록
   - "마지막 업데이트" 필드 갱신

## 출력 경로
- `projects/<slug>/01-prd.md` (고정)
- 다른 경로로 출력 금지

## 완료 보고 형식 (CLAUDE.md §10 준수)
```
[서비스기획자] 완료
- 산출물: projects/<slug>/01-prd.md
- 자가 점검: N/7
- 오픈 이슈: N건 (담당자·기한 요약)
- 다음 권장: 기술검토자 호출
```

## 참조 파일
- `template.md` — PRD 구조 템플릿
- `checklist.md` — 7개 자가 점검 항목
