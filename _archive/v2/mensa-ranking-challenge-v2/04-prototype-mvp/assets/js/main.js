/**
 * BN시스템 × 멘사코리아 랭킹챌린지 — 공통 JS (MVP)
 * 의존성: 없음 (Vanilla ES2020+)
 */

'use strict';

/* ── 1. 타이머 유틸 (챌린지 풀이 시간 측정 — REQ-002) ── */
class ChallengeTimer {
  constructor() {
    this._startMs = null;
    this._elapsed = 0;       // ms
  }

  start() {
    this._startMs = Date.now();
  }

  pause() {
    if (this._startMs !== null) {
      this._elapsed += Date.now() - this._startMs;
      this._startMs = null;
    }
  }

  stop() {
    this.pause();
    const result = this._elapsed;
    this._elapsed = 0;
    return result;  // ms 반환
  }

  /** 현재 경과 초 (소수점 1자리) */
  get seconds() {
    const extra = this._startMs !== null ? Date.now() - this._startMs : 0;
    return ((this._elapsed + extra) / 1000).toFixed(1);
  }
}

/* ── 2. 점수 산정 (REQ-002) ── */
/**
 * @param {boolean} isCorrect
 * @param {number}  elapsedMs
 * @param {number}  baseScore   문제당 기본 점수 (기본 1000)
 * @returns {number}
 */
function calcScore(isCorrect, elapsedMs, baseScore = 1000) {
  if (!isCorrect) return 0;
  const seconds = elapsedMs / 1000;
  // 시간 가중치: 60초 기준, 빠를수록 보너스 (최소 0)
  const timeFactor = Math.max(0, 1 - seconds / 60);
  return Math.round(baseScore * (0.5 + 0.5 * timeFactor));
}

/* ── 3. 세션 스토리지 헬퍼 (비회원 임시 저장 — REQ-002) ── */
const GuestSession = {
  KEY: 'mensa_guest_scores',

  load() {
    try {
      return JSON.parse(sessionStorage.getItem(this.KEY) || '{}');
    } catch {
      return {};
    }
  },

  save(challengeId, score) {
    const data = this.load();
    data[challengeId] = score;
    sessionStorage.setItem(this.KEY, JSON.stringify(data));
  },

  clear() {
    sessionStorage.removeItem(this.KEY);
  },
};

/* ── 4. 포커스 트랩 (모달 접근성 — WCAG 2.1 Success Criterion 2.4.3) ── */
function trapFocus(modalEl) {
  const focusable = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled])',
    'select:not([disabled])', 'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  const elements = Array.from(modalEl.querySelectorAll(focusable));
  if (!elements.length) return () => {};

  const first = elements[0];
  const last  = elements[elements.length - 1];

  function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  modalEl.addEventListener('keydown', handler);
  first.focus();

  return () => modalEl.removeEventListener('keydown', handler);
}

/* ── 5. 토스트 알림 ── */
function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container') || createToastContainer();

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = message;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('toast--visible'));

  setTimeout(() => {
    toast.classList.remove('toast--visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, duration);
}

function createToastContainer() {
  const el = document.createElement('div');
  el.id = 'toast-container';
  el.className = 'toast-container';
  el.setAttribute('aria-label', '알림 영역');
  document.body.appendChild(el);
  return el;
}

/* ── 6. 페이지 진입 공통 초기화 ── */
document.addEventListener('DOMContentLoaded', () => {
  // 모바일 햄버거 메뉴 (헤더 내 .nav-toggle 존재 시)
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.site-header__nav');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // ESC 키로 열린 모달 닫기 (data-modal 패턴)
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const openModal = document.querySelector('[data-modal][aria-hidden="false"]');
    if (openModal) openModal.setAttribute('aria-hidden', 'true');
  });
});

/* ── 7. 내보내기 (HTML <script type="module"> 또는 전역 사용 모두 지원) ── */
if (typeof window !== 'undefined') {
  window.MensaChallenge = {
    ChallengeTimer,
    GuestSession,
    calcScore,
    trapFocus,
    showToast,
  };
}
