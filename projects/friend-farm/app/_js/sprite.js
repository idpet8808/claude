/* sprite.js — SVG 아이콘 스프라이트 인젝션
 *
 * 배경:
 *   file:// 프로토콜에서 Chrome/Edge가 cross-file SVG <use href="external.svg#x"/> 차단
 *   → 외부 sprite 참조 시 아이콘 안 보임
 *
 * 해결:
 *   sprite.js를 <body> 최상단에 sync 로드 → SVG 심볼을 DOM에 직접 주입
 *   HTML에서는 <use href="#i-xxx"/> 같은 문서 내 참조 사용 (모든 환경 호환)
 *
 * 사용:
 *   <body>
 *     <script src="_js/sprite.js"></script>   <!-- 최상단 sync 로드 -->
 *     ...
 *     <use href="#i-back"/>                   <!-- 인젝션된 sprite 참조 -->
 *
 * 디자인 원본:
 *   _img/icons.svg (디자이너·웹서버 배포 시 단일 소스)
 *   본 파일은 file:// 호환용 런타임 인젝션 사본 — icons.svg 갱신 시 동기화 필요
 */

(function () {
  var SVG_SPRITE =
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' +
    '<defs>' +

    /* ═══ 상태바 ═══ */
    '<symbol id="i-wifi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14 0"/><path d="M8.5 16.05a6 6 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><line x1="12" y1="20" x2="12" y2="20"/></symbol>' +
    '<symbol id="i-wifi-dot" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="0.5" fill="currentColor" stroke="none"/><path d="M9.17 15.17a4 4 0 0 1 5.66 0"/><path d="M6.34 12.34a8 8 0 0 1 11.32 0"/><path d="M3.51 9.51a12 12 0 0 1 16.98 0"/></symbol>' +
    '<symbol id="i-battery" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="8" width="18" height="9" rx="2"/><path d="M22 11v3"/></symbol>' +
    '<symbol id="i-battery-fill" viewBox="0 0 24 24" fill="currentColor"><rect x="9" y="3" width="6" height="2.5" rx="1"/><rect x="5.5" y="5.5" width="13" height="16" rx="2.5"/></symbol>' +

    /* ═══ 네비게이션 ═══ */
    '<symbol id="i-back" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 6 9 12 15 18"/></symbol>' +
    '<symbol id="i-cv" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></symbol>' +
    '<symbol id="i-chev-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></symbol>' +
    '<symbol id="i-chev-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></symbol>' +
    '<symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></symbol>' +
    '<symbol id="i-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></symbol>' +
    '<symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 12 10 17 19 7"/></symbol>' +
    '<symbol id="i-check-c" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="8 12 11 15 16 9"/></symbol>' +
    '<symbol id="i-more" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></symbol>' +
    '<symbol id="i-edit" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></symbol>' +
    '<symbol id="i-trash" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></symbol>' +
    '<symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-5.6 7-11a7 7 0 0 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></symbol>' +
    '<symbol id="i-cv-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></symbol>' +
    '<symbol id="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></symbol>' +
    '<symbol id="i-img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="M21 16l-5-5L5 20"/></symbol>' +
    '<symbol id="i-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></symbol>' +
    '<symbol id="i-bell" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2-3v-3a7 7 0 0 1 4-6"/><path d="M9 17v1a3 3 0 0 0 6 0v-1"/></symbol>' +
    '<symbol id="i-pin-fill" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12 2a8 8 0 0 1 8 8c0 4.418-3.582 12-8 12s-8-7.582-8-12a8 8 0 0 1 8-8zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" clip-rule="evenodd"/></symbol>' +

    /* ═══ 잎 (브랜드) ═══ */
    '<symbol id="i-leaf" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a7 7 0 0 1-13.71 2"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></symbol>' +
    '<symbol id="i-leaf-f" viewBox="0 0 24 24" fill="currentColor"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a7 7 0 0 1-13.71 2"/></symbol>' +
    '<symbol id="i-leaf-grow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21c.5-4.5 2.5-8 7-10"/><path d="M9 18c6.218 0 10.5-3.288 11-12v-2h-4.014c-9 0-11.986 4-12 9c0 1 0 3 2 5h3z"/></symbol>' +
    '<symbol id="i-leaf-fill" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4h-4.014c-9 0-11.986 4-12 9c0 1 0 3 2 5h.5c.6-3.5 2.5-6.4 6.5-8.3l.4.8C8.6 12.7 6.5 16 6 21h2l.2-1.5c.1-.4.3-.8.5-1.2C16 17.5 19.5 13 20 5z"/></symbol>' +

    /* ═══ 인증·SNS ═══ */
    '<symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></symbol>' +
    '<symbol id="i-chat" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.7 6.7-.2.7-.7 2.5-.8 2.9 0 .2.1.4.4.2.3-.2 3-2 4.2-2.8.5.1 1 .1 1.5.1 5.5 0 10-3.6 10-8s-4.5-8-10-8z"/></symbol>' +
    '<symbol id="i-chat-line" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20l1.3-3.9A9 8 0 1 1 7.7 19L3 20"/></symbol>' +
    '<symbol id="i-eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></symbol>' +
    '<symbol id="i-eye-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.9 5.1A9.6 9.6 0 0 1 12 5c6.5 0 10 7 10 7a16 16 0 0 1-3 3.7M6.6 6.6A16 16 0 0 0 2 12s3.5 7 10 7a9.5 9.5 0 0 0 4.4-1.1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/><line x1="3" y1="3" x2="21" y2="21"/></symbol>' +
    '<symbol id="i-apple" viewBox="0 0 24 24" fill="currentColor"><path d="M17 12.5c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.8zM14.8 5.2c.6-.8 1-1.9.9-3-1 0-2.1.7-2.8 1.5-.6.7-1.1 1.8-.9 2.8 1.1.1 2.2-.5 2.8-1.3z"/></symbol>' +
    '<symbol id="i-naver" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4h4.6l4.8 7.2V4H19v16h-4.6L9.6 12.8V20H5z"/></symbol>' +
    '<symbol id="i-google" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.6 12.2c0-.6-.1-1.3-.2-1.9H12v3.6h5.4c-.2 1.2-.9 2.3-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.2z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.5l-3.2-2.5c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.8-5.6-4.2H3.1v2.6C4.7 19.9 8.1 22 12 22z"/><path fill="#FBBC05" d="M6.4 13.7c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V7.3H3.1C2.4 8.7 2 10.3 2 12s.4 3.3 1.1 4.7l3.3-2.6z"/><path fill="#EA4335" d="M12 6.4c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 3.5 14.7 2.6 12 2.6 8.1 2.6 4.7 4.7 3.1 7.9l3.3 2.6C7.2 8.1 9.4 6.4 12 6.4z"/></symbol>' +

    /* ═══ 콘텐츠·기능 아이콘 ═══ */
    '<symbol id="i-cloud-rain" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16a4.6 4.4 0 0 1 0-9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7"/><path d="M10 19l-1 2"/><path d="M14 19l-1 2"/><path d="M12 21l-1 1"/></symbol>' +
    '<symbol id="i-camera" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7h2a2 2 0 0 0 2-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1a2 2 0 0 0 2 2h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2"/><circle cx="12" cy="13" r="3"/></symbol>' +
    '<symbol id="i-chatbot" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4l-4 4l-4-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"/><circle cx="9.5" cy="10" r="0.6" fill="currentColor"/><circle cx="14.5" cy="10" r="0.6" fill="currentColor"/></symbol>' +
    '<symbol id="i-notebook" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M13 8h3"/><path d="M13 12h3"/><path d="M8 8h2"/><path d="M8 12h2"/><path d="M8 16h2"/></symbol>' +
    '<symbol id="i-check-fill" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 1 0 20a10 10 0 0 1 0-20zm4.71 7.29a1 1 0 0 0-1.42 0L11 13.59l-2.29-2.3a1 1 0 0 0-1.42 1.42l3 3a1 1 0 0 0 1.42 0l5-5a1 1 0 0 0 0-1.42z"/></symbol>' +
    '<symbol id="i-home-fill" viewBox="0 0 24 24" fill="currentColor"><path d="M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 1.42 1.42L4 12.41V20a2 2 0 0 0 2 2h3v-7h6v7h3a2 2 0 0 0 2-2v-7.59l.29.3a1 1 0 0 0 1.42-1.42l-9-9z"/></symbol>' +
    '<symbol id="i-user" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"/></symbol>' +
    '<symbol id="i-star-fill" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18.6 6.1 21.3l1.2-6.6L2.5 9.5l6.6-.9L12 2.5z"/></symbol>' +
    '<symbol id="i-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M8 7h9v9"/></symbol>' +
    '<symbol id="i-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7l10 10"/><path d="M17 8v9H8"/></symbol>' +
    '<symbol id="i-gift" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M4.5 12v7.5a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V12"/><path d="M12 8v12.5"/><path d="M12 8C12 8 11 3.5 8 3.5a2.3 2.3 0 0 0 0 4.5h4"/><path d="M12 8C12 8 13 3.5 16 3.5a2.3 2.3 0 0 1 0 4.5h-4"/></symbol>' +
    '<symbol id="i-sprout" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21v-9.5"/><path d="M12 11.5C12 7.5 9 5.5 4 5.5c0 4 2.2 6.8 8 6.8z"/><path d="M12 13.5c0-3 2.4-5 7-5c0 3.4-2 5.8-7 5.8z"/></symbol>' +
    '<symbol id="i-bug" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 9V7a3 3 0 0 1 6 0v2"/><rect x="8" y="9" width="8" height="12" rx="4"/><path d="M19 9l-3 2"/><path d="M5 9l3 2"/><path d="M19 15h-3"/><path d="M8 15H5"/><path d="M19 21l-3-2"/><path d="M5 21l3-2"/></symbol>' +
    '<symbol id="i-farm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V10l9-6 9 6v11"/><path d="M3 21h18"/><path d="M9 21v-6h6v6"/></symbol>' +

    '</defs></svg>';

  var wrapper = document.createElement('div');
  wrapper.innerHTML = SVG_SPRITE;
  document.body.insertBefore(wrapper.firstChild, document.body.firstChild);
})();
