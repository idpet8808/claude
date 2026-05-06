# M4-3-2 — PM 중간 개입 트리거 (확정안, Gate A 리뷰 대상)

**위치**: Mesh 하네스 설계 / M4 팀장 역할 경계 / M4-3 PM 인터페이스 / M4-3-2 중간 개입

**확정일**: 2026-04-15

**선행 확정**:
- M4-3-1 (2026-04-15): PM 입력 시점 — 옵션 B(PMBrief 확장 스키마, constraints/deadline/success_criteria optional)
- CLAUDE.md §3 (2026-04-14 수정): Codex 게이트 A/B/C는 **advisory**, PM이 수용/오버라이드 최종 결정

**상위 맥락 (기존 PM 접점 3개)**:
- E1 입력 — 사이클 시작
- E7 세션 종료 — 병목 snapshot notification only
- 수동 호출 — PM이 언제든 Codex 리뷰/개입 요청

---

## 1. M4-3-2-a — Push 트리거 **존재 여부**

**결정: 옵션 B — 소수 hard trigger 존재**

**근거**:
- A(pull only): 팀장 장애 시 Task 소진 전까지 PM 인지 0 → 리스크 과대
- C(Teammate → PM 직접): "팀장=단일 결정자" 패턴(합의 4·5, M3 broadcast 팀장 한정)과 정면 충돌

---

## 2. M4-3-2-b — Hard Trigger 목록

**결정: T1 + T2 + T3 (closed set — 추가 제안은 별도 M 이슈)**

| # | Trigger | 조건 | 축 |
|---|---------|------|-----|
| T1 | 팀장 자기 선언 | 팀장이 판단 불가 시 push (E8 대칭 구조) | 복구 |
| T2 | M2-6 반려 누적 | 동일 task 재오픈 **2회** 이상 (deliverable-linked task 한정 — M2-6 결정 1에 따라 chore는 auto-pass로 카운트 제외) | 내용 |
| T3 | 권고 3 조기 경보 | 단일 SendMessage 최대 대기 **30분(Y)** 초과 판정 시 push. 판정 시점 = 팀장이 다음 SendMessage를 수신하는 시점 (이벤트 기반). 무입력 구간 즉시성 미보장은 수용 — 주기 polling primitive 도입은 별도 M 이슈 | 시스템 |

**기각 후보**:
- T4 Codex 반려 누적: Codex advisory 재정의와 정합 깨짐 (PM 기각이 누적 리셋 — 모순)
- T5 E4 중재 실패: T1(팀장 자기 선언)로 포섭 가능
- T6 Primitive 장애: advisory scope 밖 (§3 원칙 — primitive 보장 범위는 수용)

**커버리지**: 복구(T1) / 내용(T2) / 시스템(T3) 3축 비중복.

**T3 관련 정합**:
- 기존 E7(권고 3-c-4 PM notification only)은 **세션 종료 시 집계 snapshot**
- T3는 **세션 진행 중** 팀장이 다음 SendMessage 수신 시점에 Y(30분) 초과 판정 후 push (이벤트 기반)
- 두 경로는 시점·트리거가 달라 중복이 아님. T3는 E7의 조기 경보 확장
- **즉시성 한계 수용**: 무입력 구간에서 T3 판정이 지연될 수 있음. 주기 polling primitive는 별도 M 이슈

---

## 3. M4-3-2-c — PM 호출 메커니즘

### c-1 경로 통합 — **옵션 α (팀장 단일 창구)**

T1/T2/T3 전부 팀장이 사용자(PM)에게 직접 출력. PM은 인간 사용자이므로 primitive `SendMessage(to=PM)` 경로 없음.

**근거**: M3 "1명 결정자" 패턴 + E8 원칙 정합. 권고 3-b β(측정 주체=팀장)상 분리 불가능.

### c-2 포맷 — **옵션 γ + 필드 (통일 포맷)**

CLAUDE.md §11 "실패 보고 4블록" 기반 확장:

```
[PM 개입 요청 — T<n>]
- Trigger: T1 | T2 | T3 (이름)
- 상황: <1~2줄>
- 영향: <무엇이 막혔거나 위협받는지>
- 옵션: 1) ... 2) ... 3) ...
- 참조: <task_id / snapshot 경로 / 관련 SendMessage>
```

**근거**: trigger별 맞춤(δ)은 추가 시 포맷 관리 비용. 통일 포맷 + "참조" 필드로 trigger별 맥락 첨부.

### c-3 Mesh 동작 — **옵션 ζ (계속)**

Push 발생 시 **팀장만 idle + PM 응답 대기**. Teammate는 현재 task 계속 진행.

**근거**: T1/T2/T3는 팀장 판단 영역. Teammate active task 강제 중단은 WIP 오염. PM 응답이 "전면 중단"이면 그때 팀장이 broadcast로 정지.

---

## 4. M4-3-2-d — PM 응답 후 복귀 경로

### d-1 처리 주체 — **옵션 A (팀장 단일 창구)**

PM 자유 서술 → 팀장 해석 → mesh 반영 (broadcast / task 조정).

**근거**: M4-3-1(팀장 해석 경유) + 합의 5(팀장=결정자) 패턴 유지. B(PM 직접 mesh 지시)는 E1 원칙(PM raw 입력자) 붕괴.

### d-2 무응답 처리 — **옵션 Y (타임아웃 없음)**

팀장 idle 유지, PM 응답까지 무기한 대기. 팀장 자율 재개 없음.

**근거**:
- T1/T2/T3는 PM 판단 필수 영역 → 팀장 자율 재개는 위험
- c-3 ζ로 Teammate는 계속 → 세션 효율 저하 없음
- PM 무응답 상태로 세션 종료 시 **팀장 세션 종료 보고에 T push 이력·무응답 여부 포함** → 이중 안전망 (E7 병목 집계와 별개 채널)
- Z(무응답 재push)는 스팸 리스크

### d-3 Mesh 영향 범위 — **옵션 R (PM 응답에 따라 팀장 판단)**

범위는 PM 응답 내용이 결정. 예:
- "이 task 재스코핑" → 해당 task만 (P 수준)
- "전면 중단 후 재검토" → 전체 mesh (Q 수준)

**근거**: 고정 규칙(P 또는 Q)은 PM 지시 표현력 손실.

---

## 5. 설계 불변식

1. **Hard trigger closed set** — T1/T2/T3 외 추가는 별도 M 이슈로만 가능. M4 spiral 방지용 freeze
2. **PM ↔ mesh 해석 단일 창구 = 팀장** — E1/M4-3-1/M4-3-2 전 구간 동일 패턴
3. **Push 자체는 Teammate WIP를 중단하지 않음** — Teammate 자율 유지. 단, PM 응답 내용이 "전면 중단"이면 팀장이 broadcast로 중단 가능 (응답 경로 중단은 불변식이 아니라 PM 지시 반영)
4. **E7과 T3는 시점 분리** — 세션 종료 집계 vs 세션 중 이벤트 기반 판정, 중복 아님
5. **PM 무응답 상태는 세션 종료 시 팀장 최종 보고에 포함** — T1/T2/T3 발동 이력과 무응답 여부를 팀장이 세션 종료 보고에 명시. (E7 병목 집계와는 별개 채널. E7 재정의 불필요)

---

## 6. Primitive 전제

- 팀장이 사용자에게 직접 출력 = Claude Code 표준 user-facing text 경로 (primitive 신규 기능 불필요)
- T3 측정 = 권고 3-b β(팀장 수동 기록, 타임스탬프 2개)에 편승. 팀장이 **다음 SendMessage 수신 시점에** 직전 대기 시간을 계산해 Y(30분) 초과 판정 — 이벤트 기반. 주기 polling 아님
- T2 감지 = 팀장이 M2-6 재오픈 실행 주체이므로 자연 카운트

**알려진 제약 수용** (M4 최종 개정과 동일 원칙):
- 팀장 crash 시 T1~T3 push 유실 가능. 복구는 세션 재시작 후 Task List + STATE.md 재동기화

---

## 7. 후속 이관 (M4-3-2 범위 외)

- **M4-3-3 종결 승인**: Task List 소진 후 PM 최종 확인 절차 (다음 sub-step)
- T1 판단 기준 문서화: "팀장이 판단 불가"의 구체 경계 — M4-3-3 또는 구현 단계
- T3 Y 임계값 재조정: 권고 3-c-2 운영 데이터 기반 재튜닝과 동일 경로

---

## 8. 리뷰 요청 맥락 (Codex Gate A)

- **리뷰 대상**: 본 파일 전체
- **게이트**: A (설계)
- **핵심 제약**:
  1. Codex는 §3 재정의에 따라 **advisory** — 판정은 PM 의사결정 입력
  2. Primitive 보장 범위 밖 가정(악의적 teammate, FIFO 미지원 등) 기반 HIGH는 범위 이탈
  3. Hard trigger closed set 유지가 설계 의도 — 추가 제안은 "별도 M 이슈" 형태로만 수용
- **리뷰 초점**: 내적 일관성, 기존 M 결정(M2~M4-3-1)과의 정합, 누락 요소, 규칙 2~5의 불변식이 M4-3-2-a~d 결정으로 실제 도출되는지
- **참고 파일**:
  - `C:\Users\BN211\Desktop\claude\CLAUDE.md` (§3 전역 작업 사이클)
  - `C:\Users\BN211\.claude\projects\C--Users-BN211-Desktop-claude\memory\project_harness_mesh_design.md` (M1~M4-3-1 확정 결정)
