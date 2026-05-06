# M13-① 5명 정합 점검 메모 (Group C 갱신 대상)

작성일: 2026-05-06
작성 단계: M13-① Task A6
근거: M1 결정 (5명 teammate) + M13-① 퍼블리셔(MVP) 신설 결과

> 본 메모는 *Group C에서 갱신할 항목*을 식별하는 *체크리스트*다. 실 갱신 작업은 Group C에서 수행.

---

## 1. 기존 4 에이전트 정의 갱신 항목 (M13-③ Task C2에서 처리)

### `service-planner.md`

- [ ] §1 입력 컨텍스트: 변경 없음
- [ ] §2 작업 절차: **Mesh 분해 단계 추가** (4명 동시 draft → 팀장 confirm) + **부분 broadcast 발행 시점 명시** (WHY·1차 사용자 / 기능 1차 / Must 확정)
- [ ] §5 자가 점검: **8필드 형식** + REQ owner 책임 항목 + U-1~U-5
- [ ] §7 안티 패턴: **"04-prototype-mvp/ 수정 — 퍼블리셔 영역 침범"** 항목 추가
- [ ] 섹션 번호 인용 정합 (§5 영역침범 → §6 / §6 Decision Log → §7 / §7 Skills → §8 / §8 덮어쓰기 → §9 / §9 블로커 → §10 / §10 표준 출력 → §11)

### `tech-reviewer.md`

- [ ] §1 선행 조건: API 계약 = **v1 미정의 명시** (v1.1 이관)
- [ ] §2 작업 절차: Mesh 분해 + **부분 broadcast 받자마자 외부 의존성 1차 시작 가능**
- [ ] §5 자가 점검: 8필드 + TR owner + U-1~U-5
- [ ] §7 안티 패턴: 퍼블리셔 영역 침범 항목 추가
- [ ] 섹션 번호 정합 동일

### `ux-planner.md`

- [ ] §1 선행 조건: 변경 없음
- [ ] §2 작업 절차: Mesh 분해 + **S 확정 broadcast 발행 시점 명시**
- [ ] §3 산출물 명세 또는 §6 완료 보고: **"다음 권장: 퍼블리셔 호출"로 변경** (현재 "노션관리자 호출")
- [ ] §5 자가 점검: 8필드 + S owner + U-1~U-5 + **빈/에러/로딩 4상태 자동 실패 유지**
- [ ] §7 안티 패턴: 퍼블리셔 영역 침범 항목 추가
- [ ] 섹션 번호 정합 동일

### `notion-manager.md`

- [ ] §6 입력 컨텍스트 (또는 §1 워크스페이스 옆): **"페이즈 외부 공통 도구" 명시 추가**
- [ ] §6 동기화 대상: **`04-prototype-mvp/` 추가** — README.md만 노션 본문, HTML/asset은 외부 링크
- [ ] §7 자가 점검: 8필드 형식 + 페이즈 외부 표시
- [ ] §8 완료 보고: 변경 없음 (이미 §10·§11 인용)
- [ ] 섹션 번호 정합 동일

---

## 2. 기존 5 Skill 갱신 항목 (M13-③ Task C3에서 처리)

| Skill | 갱신 항목 |
|-------|---------|
| **prd-draft** | checklist.md에 8필드 양식 + REQ owner F-* 항목 + U-1~U-5 (U-3 N/A 가능 명시) |
| **tech-review** | checklist.md에 8필드 + TR owner + U-1~U-5 |
| **ux-spec** | checklist.md에 8필드 + S owner + U-1~U-5 + 빈/에러/로딩 자동 실패 |
| **notion-sync** | SKILL.md에 04-prototype-mvp 동기화 처리 추가 (HTML/asset은 외부 링크) + 8필드 |
| **weekly-status** | template.md에 _INDEX.md 4단계 컬럼 + 산출물 4종 진행률 양식 |

## 3. 3 Slash 갱신 항목 (M13-③ Task C4에서 처리)

| Slash | 갱신 항목 |
|-------|---------|
| **/kickoff** | **kickoff 명령 흐름**: 1~6단계 → **1~7단계** (5단계 슬롯에 퍼블리셔(MVP) 신설). **운영 에이전트 단계**: 4명(서비스기획자→기술검토자→UX→노션) → **5명**(퍼블리셔 추가). 두 layer 구분 — 명령 흐름 1~7 ≠ 운영 에이전트 단계 4→5. 게이트 4→5: UX 통과 + S broadcast / 5→6: 퍼블 자가 점검 ≥ 6/7 / 6→7: 노션관리자 통과 |
| **/status** | 4단계 (`기획중 / MVP-구현중 / MVP-완료 / 종료`) + 산출물 4종 진행률 컬럼 |
| **/sync-notion** | 04-prototype-mvp 처리 추가 (README.md 본문 + HTML/asset 외부 링크) |

## 4. STATE.md 템플릿 갱신 항목 (M13-③ Task C5 부속)

- [ ] 산출물 인덱스 4항목: `01-prd / 02-tech-review / 03-ux-spec / 04-prototype-mvp/`
- [ ] 현재 단계 필드 4단계 옵션
- [ ] Decision Log 시점 추가: P-NNN 발급 / assets 토큰 변경 / NA 항목

## 5. `_INDEX.md` 양식 갱신 항목 (M13-③ Task C5 부속)

- [ ] 컬럼: 슬러그 / 프로젝트 / PM / **현재 단계** (4단계) / **산출물 진행** (✓✓✓· 4종) / 자가점검 / STATE
- [ ] 산출물 진행 표기: ✓ = 완료, · = 미완료 (4 슬롯)

---

## 작업 순서 권고 (Group C 진입 시)

1. 4 에이전트 정의 일괄 갱신 (Task C2) — 패턴 동일이므로 grep + Edit 일괄
2. 5 Skill 갱신 (Task C3) — checklist 양식 일괄
3. 3 Slash 갱신 (Task C4) — kickoff 5단계 슬롯에 퍼블리셔(MVP) 신설 (명령 흐름 1~6 → 1~7, 운영 에이전트 4명 → 5명)
4. STATE.md 템플릿 + _INDEX.md 부트스트랩 (Task C5)
5. 실 프로젝트 1건 적용·검증 (Task C6·C7)
