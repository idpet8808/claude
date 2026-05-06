# M9-4 착수 인수인계 (2026-04-22 세션 종료 스냅샷)

내일 세션 시작 시 이 파일 1개만 읽으면 재개 가능.

---

## 직전까지 완료된 것 (2026-04-22)

- **M9-3 확정** (Codex Gate A 2차 통과)
  - §6-0 M9-3-0 lifecycle 상태 모델 (2층: 파일 축 + 항목 축)
  - §6-1 M9-3-a 변경 이벤트 closed 4종 × action closed 6종 + 팀장 broadcast 창구
  - §6-2 M9-3-c asset 차원 E-modify 우회 + draft/미생성 3분기
  - §6-3 M9-3-d suffix `[vN]` + `_broadcast.log`(이벤트 로그) + Decision Log 하이브리드 + broadcast 6필드(reason 필수) + 승격 closed list 3종
  - §7 종합 정리 + 불변식 I8~I14 신설 (I1~I7 불변 전제)
- **Codex Gate A 이력**
  - 1차: 부분 반려 (높음 1 / 중간 3 / 없음 1) → PM 전면 수용 → 4건 반영
  - 2차: **통과** (높음 0 / 중간 2 / 낮음 1 / 없음 2) → PM A안 → 중간 2건 반영 (`_broadcast.log` 이벤트 로그 재정의 · CLAUDE.md §7 구체화 관계 명시). 낮음 1건(M6 예외 대칭 표현)은 **M9-4+ 이관**

---

## 내일 재개 지점 — **M9-4 착수 brainstorming**

### M9-4 주제 후보 (팀장 잠정 판단)

M9-3까지 종료된 현 시점에서 M9-4 스코프로 고려할 수 있는 주제들 (PM 확정 필요):

1. **M9-4 cross-ref** (원 계획선) — 매핑 집계·판정 오류 감지·깨진 매핑 감지 등 **검증·관측** 성격. M9-5 cross-ref로 예약된 주제들과 통합 고려
2. **M9-3 낮음 이관분 흡수** — M6 예외 대칭 표현(STATE.md Decision Log 공용 예외 명시) 보강. 단, 단독 sub-step으로 하기엔 작음 → 다른 주제와 묶어야 함
3. **M9-5 cross-ref 선결 사항** — `[NOT APPLICABLE]` 판정 오류 감지, REQ 기록 형식 위반 감지, 깨진 매핑·누락 P-NNN 감지 — M9-2/M9-3에서 후속 이관된 항목들
4. **M9-6 관측성·집계** — `/status` 항목 헤더 집계, 변경 빈도 리포팅 등

**PM 판단 필요**: M9-4 원래 예정 주제가 명확히 정의돼 있지 않음. M9 전체 로드맵 확인 또는 M9-4 범위 결정부터 필요.

### 시작 시 진행 순서 (예상)

```
팀장 → M9-4 범위 질문 PM에게 제시 (위 4 후보 or 다른 주제)
   ↓
PM 범위 확정
   ↓
피드백 규칙 → superpowers:brainstorming invoke (M9-4 착수)
   ↓
Q1 펼침 → PM 응답 → 확정
   ↓
(반복)
   ↓
M9-4 §8 종합 정리
   ↓
Codex Gate A 1차 리뷰 (inline prompt · Windows WDAC 회피)
   ↓
PM 판정 반영 → 2차 리뷰 → 통과
   ↓
M9-4 확정 → M9-5 착수
```

---

## 주의 · 제약 (내일 재시작 시 준수)

1. **피드백 규칙**: M 이슈·sub-step 착수 시 **매번** `superpowers:brainstorming` invoke (`feedback_brainstorm_first.md`)
2. **Codex Gate A**: 설계 확정 후 1회 호출 필수. **inline prompt 방식** (Windows PowerShell WDAC 오류 `0x8009001d` 회피)
3. **리뷰 결과 표 포맷**: 심각도 / 발견 / 근거 / 처리 4열 고정 (2026-04-15 PM 지시)
4. **advisory 원칙**: Codex는 조언. PM이 수용/오버라이드 최종 결정 (`feedback_codex_advisory.md`)
5. **선행 확정 침범 금지**: M1~M9-3 모든 결정은 M9-4에서 **변경 대상 아님**. 상충 시 PM 판단으로 M9-4 스코프 조정

---

## 저장 상태 (2026-04-22 세션 종료 시점)

- **디스크 저장**: 모두 완료
- **git 추적**: `_design/` 디렉토리는 아직 **untracked** (git add 미실행). PM 지시 시 commit 처리
- **노션 동기화**: 미실행 (M9-3 설계는 내부 작업물이라 노션 업로드 불필요할 수 있음 — PM 판단)

---

## 참조 파일 (디스크 경로)

| 파일 | 크기 | 용도 |
|------|-----|------|
| `_design/M9_deliverable-structure.md` | 1285줄 / 83KB | 설계문서 본체 (M1~M9-3 확정 전체) |
| `_design/_codex-gate-a-m9-3-prompt.md` | 6KB | M9-3 Gate A 1차 리뷰 프롬프트 |
| `_design/_codex-gate-a-m9-3-output.log` | 2KB | M9-3 Gate A 1차 리뷰 결과 |
| `_design/_codex-gate-a-m9-3-2-prompt.md` | 7KB | M9-3 Gate A 2차 리뷰 프롬프트 |
| `_design/_codex-gate-a-m9-3-2-output.log` | 3KB | M9-3 Gate A 2차 리뷰 결과 (통과) |
| `_design/M9-3_resume.md` | 4KB | 이전 세션(M9-3 착수) 스냅샷 — 참고용, 내일은 본 파일 사용 |
| `memory/project_harness_mesh_design.md` | 1374줄+ | 메모리 로그 (업데이트 필요 시 M9-3 완료·M9-4 착수 상태 반영) |

---

## 내일 첫 메시지 제안

> `_design/M9-4_resume.md` 읽고 M9-4 착수.

이 한 줄이면 팀장이 본 파일 읽고 M9-4 범위 질문으로 진입함.
