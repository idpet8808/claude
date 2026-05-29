# v3 마이그레이션 완료 보고서

**날짜:** 2026-05-29
**대상:** 45개 hybrid 화면

## 적용 항목 요약

### 1차 일괄 (구조·토큰 표준화)
| 항목 | 적용 파일 수 |
|---|---|
| `--line` 값 통일 (`.10/.12/.06 → .08`) | 20개 |
| `.appbar flex-shrink: 0` 추가 | 12개 |
| `.scroll overflow-x: hidden` 추가 | 36개 |
| `.scroll overflow-y: auto` 추가 (누락 보완) | 11개 |
| `.scroll flex: 1` 추가 (누락 보완) | 11개 |
| `.phone position: relative` 추가 | 13개 |
| `.phone min-height: 844px` 추가 (없던 경우만) | 3개 |
| **총 변경** | **106건 / 43개 파일** |

### 2차 일괄 (360px 안전망)
| 항목 | 적용 파일 수 |
|---|---|
| 360px safety net CSS 블록 추가 | 45개 (전체) |

## 안전망 CSS

```css
/* === 360px safety net (v3) === */
.phone img, .phone svg { max-width: 100%; height: auto; }
.phone { word-break: keep-all; overflow-wrap: break-word; }
```

## 백업 위치
원본은 `/home/claude/backup_v2/` 에 45개 모두 보존 (롤백 가능).

## 남은 후속 작업 (수동 확인 필요)

### 표준 미적용 / 결정 필요 항목

1. ✅ **`.phone min-height` 값 통일 완료** — 전체 860px로 통일
   - 기존: 800/820/840/844/860/880/900px 혼재 (변경 26개)
   - 실제 디바이스에선 무관, 데스크탑 미리보기 일관성 목적

2. **`.phone display: flex; flex-direction: column` 누락 화면** — 일부 화면(menu, main, pwchange 등)
   - 보통은 다른 레이아웃 의도 있을 수 있어 자동 적용 안 함
   - 화면별 검토 필요

3. **특수 화면 예외**
   - `onboarding_entry`: 그라데이션 배경 (의도적)
   - `dialogs`: 다이얼로그 모음 (작은 height 의도)
   - `main`: border-radius 40px·border 추가 (홈 특별 디자인)

### 누락 컴포넌트 표준 정의
v3 디자인 시스템 문서에 `.input`/`.btn-line`/`.tag`/`.chip-select`/`.chip-tag` 표준 정의됨.
**적용은 새 화면부터** — 기존 화면 일괄 변경은 시각적 영향 크므로 별도 작업.

### 360px 실측 확인
안전망 CSS로 80~90% 해결되지만, 여전히 깨지는 화면이 있으면:
- 어느 화면 어느 부분이 깨지는지 확인
- 화면별 정밀 수정

## 검증 결과

- ✅ `--line` 값: 45/45 모두 `rgba(48,42,30,.08)` 통일
- ✅ `.phone min-height: 860px`: 45/45 통일
- ✅ `.appbar flex-shrink: 0`: 45/45 적용
- ✅ `.scroll overflow-x: hidden`: 45/45 적용
- ✅ 360px 안전망: 45/45 적용
