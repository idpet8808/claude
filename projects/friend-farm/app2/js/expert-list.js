/* expert-list.js — 상단 검색창 토글 (농업 영상 패턴 동일) */
(function () {
  var searchBtn = document.getElementById('searchBtn');
  var searchTop = document.getElementById('searchTop');
  var searchInput = document.getElementById('searchInput');
  if (!searchBtn || !searchTop) return;
  searchBtn.addEventListener('click', function () {
    var open = searchTop.classList.toggle('open');
    searchBtn.classList.toggle('on', open);
    if (open) { setTimeout(function () { searchInput && searchInput.focus(); }, 80); }
    else { searchInput && searchInput.blur(); }
  });
})();
