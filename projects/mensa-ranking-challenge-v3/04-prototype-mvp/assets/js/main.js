// MVP 프로토타입 공통 스크립트 — 시연용 mock 인터랙션만
// 실제 API 연결은 Production 모드에서 정식화

document.addEventListener('DOMContentLoaded', () => {
  console.log('MVP prototype loaded — mensa-ranking-challenge-v3');

  // 패스 모달 닫기
  document.getElementById('passCancel')?.addEventListener('click', () => {
    document.getElementById('passModal').hidden = true;
  });

  // 패스 버튼 → 모달 열기
  document.getElementById('passBtn')?.addEventListener('click', () => {
    document.getElementById('passModal').hidden = false;
  });

  // 힌트 즉시 구매 모달 취소
  document.getElementById('hintPurchaseCancel')?.addEventListener('click', () => {
    document.getElementById('hintPurchaseModal').hidden = true;
  });

  // 아이템 구매 모달 닫기
  document.getElementById('purchaseModalClose')?.addEventListener('click', () => {
    document.getElementById('purchaseModal').hidden = true;
  });

  // 타이머 mock (퀴즈 스테이지)
  const timerEl = document.querySelector('.timer');
  if (timerEl) {
    let seconds = 0;
    const tick = setInterval(() => {
      seconds++;
      const m = String(Math.floor(seconds / 60)).padStart(2, '0');
      const s = String(seconds % 60).padStart(2, '0');
      timerEl.textContent = `${m}:${s}`;
    }, 1000);
    window.__timerCleanup = () => clearInterval(tick);
  }

  // Stage 2: 스도쿠 9×9 그리드 셀 선택 인터랙션
  const sudokuGrid = document.querySelector('.sudoku-grid');
  if (sudokuGrid) {
    let selectedCell = null;

    sudokuGrid.addEventListener('click', (e) => {
      const cell = e.target.closest('.placeholder.checkbox');
      if (!cell || cell.classList.contains('cell-fixed')) return;

      if (selectedCell) selectedCell.classList.remove('cell-selected');
      selectedCell = cell;
      cell.classList.add('cell-selected');
    });

    // 숫자 키 입력 (1~9) — 선택된 셀에 값 표시
    document.addEventListener('keydown', (e) => {
      if (!selectedCell) return;
      if (e.key >= '1' && e.key <= '9') {
        selectedCell.textContent = e.key;
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        selectedCell.textContent = '_';
      }
    });
  }

  // Stage 5: 32칸 고리형 셀 선택 인터랙션
  const ringCells = document.querySelector('.ring-cells');
  if (ringCells) {
    ringCells.addEventListener('click', (e) => {
      const cell = e.target.closest('.placeholder.checkbox');
      if (!cell) return;
      cell.classList.toggle('cell-selected');
    });
  }

  // 랭킹 전체 보기: 공식/완주 탭 전환
  const tabBtns = document.querySelectorAll('.tab-btn');
  if (tabBtns.length > 0) {
    const officialSection = document.querySelector('[data-area="2"]');
    const completeSection = document.querySelector('[data-area="3"]');

    tabBtns.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('tab-btn--active'));
        btn.classList.add('tab-btn--active');

        if (officialSection && completeSection) {
          if (idx === 0) {
            officialSection.hidden = false;
            completeSection.hidden = true;
          } else {
            officialSection.hidden = true;
            completeSection.hidden = false;
          }
        }
      });
    });
  }

  // 힌트 패널 토글 (퀴즈 스테이지 공통)
  document.querySelectorAll('.item-actions .btn-secondary').forEach(btn => {
    if (btn.textContent.includes('힌트')) {
      btn.addEventListener('click', () => {
        const panel = btn.closest('.item-section')?.querySelector('.hint-panel');
        if (panel) panel.hidden = !panel.hidden;
      });
    }
  });
});
