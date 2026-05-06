// Mensa 랭킹챌린지 MVP 프로토타입 — 시연용 mock 인터랙션
// 실 API 연결 없음 (v1.1 Production 모드에서 정식화)
// S1 (P-001) 랭킹 위젯 4상태 토글 + 정렬·필터 mock

(function () {
  'use strict';

  // ----- Mock data -----
  const MOCK_RANKINGS = [
    { rank: 1, nickname: 'Genius***', score: 9870, change: '↑2', mine: false },
    { rank: 2, nickname: '논리퀸***', score: 9450, change: '-', mine: false },
    { rank: 3, nickname: 'P***zle', score: 9120, change: '↓1', mine: false },
    { rank: 4, nickname: 'IQ200***', score: 8760, change: '↑5', mine: true },
    { rank: 5, nickname: 'Prime***', score: 8530, change: '-', mine: false },
  ];

  const STATE = {
    NORMAL: 'normal',
    EMPTY: 'empty',
    ERROR: 'error',
    LOADING: 'loading',
  };

  // ----- 4-state renderer -----
  function renderState(state) {
    const root = document.querySelector('[data-widget="ranking"]');
    if (!root) return;

    // 가시성 토글
    root.querySelectorAll('[data-state]').forEach((el) => {
      el.hidden = el.dataset.state !== state;
    });

    // 토글 버튼 active 표시
    document.querySelectorAll('[data-state-btn]').forEach((btn) => {
      btn.setAttribute('aria-pressed', btn.dataset.stateBtn === state ? 'true' : 'false');
    });

    // CTA 활성 (정상/빈/에러에서 활성, 로딩에서 비활성)
    const cta = root.querySelector('[data-cta="challenge"]');
    if (cta) {
      cta.disabled = state === STATE.LOADING;
    }

    // 타임스탬프 갱신 (정상 상태일 때)
    if (state === STATE.NORMAL) {
      const ts = root.querySelector('[data-timestamp]');
      if (ts) ts.textContent = '방금 전 업데이트';
    }
  }

  // ----- Sort / filter (정상 상태 mock 인터랙션) -----
  function sortBy(field) {
    const list = [...MOCK_RANKINGS];
    if (field === 'score') {
      list.sort((a, b) => b.score - a.score);
    } else if (field === 'rank') {
      list.sort((a, b) => a.rank - b.rank);
    }
    paintList(list);
  }

  function paintList(list) {
    const tbody = document.querySelector('[data-rank-list]');
    if (!tbody) return;

    tbody.innerHTML = list
      .map((row) => {
        const mineClass = row.mine ? ' is-mine' : '';
        const rankBadge = row.rank <= 3 ? ` rank-badge--${row.rank}` : '';
        return `
        <li class="rank-row${mineClass}" role="row">
          <span class="rank-cell rank-pos${rankBadge}" role="cell" aria-label="${row.rank}위">
            ${row.rank}
          </span>
          <span class="rank-cell rank-name" role="cell">${row.nickname}${row.mine ? ' <em>(나)</em>' : ''}</span>
          <span class="rank-cell rank-score" role="cell" aria-label="${row.score}점">${row.score.toLocaleString()}</span>
          <span class="rank-cell rank-change" role="cell" aria-label="순위 변동 ${row.change}">${row.change}</span>
        </li>`;
      })
      .join('');
  }

  // ----- Refresh (에러 상태 -> 로딩 -> 정상 mock 흐름) -----
  function refresh() {
    renderState(STATE.LOADING);
    setTimeout(() => {
      paintList(MOCK_RANKINGS);
      renderState(STATE.NORMAL);
    }, 600);
  }

  // ----- Init -----
  document.addEventListener('DOMContentLoaded', () => {
    console.log('[mensa-ranking-challenge] MVP prototype loaded — S1 ranking widget mock');

    // 초기 데이터 페인트
    paintList(MOCK_RANKINGS);
    renderState(STATE.NORMAL);

    // 4상태 토글 (시연용)
    document.querySelectorAll('[data-state-btn]').forEach((btn) => {
      btn.addEventListener('click', () => {
        renderState(btn.dataset.stateBtn);
      });
    });

    // 정렬 버튼
    document.querySelectorAll('[data-sort]').forEach((btn) => {
      btn.addEventListener('click', () => sortBy(btn.dataset.sort));
    });

    // 새로고침 (에러 상태에서 노출)
    const refreshBtn = document.querySelector('[data-refresh]');
    if (refreshBtn) refreshBtn.addEventListener('click', refresh);

    // CTA — 시연 mock
    const cta = document.querySelector('[data-cta="challenge"]');
    if (cta) {
      cta.addEventListener('click', () => {
        // 실 환경에서는 로그인 상태 분기 → S2 또는 S3 이동
        alert('[시연] 로그인 상태 분기 → 비로그인: S2(로그인) / 로그인: S3(챌린지 목록)');
      });
    }
  });
})();
