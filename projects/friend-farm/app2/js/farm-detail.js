/* farm-detail.js — 더보기 액션 시트 + 삭제 확인 + 갤러리 인디케이터 */

(function () {
  function show(id) { document.getElementById(id).classList.add('show'); }
  function hide(id) { document.getElementById(id).classList.remove('show'); }

  // 더보기 → 액션 시트
  document.getElementById('moreBtn').addEventListener('click', function () { show('actionSheet'); });
  document.getElementById('asCancel').addEventListener('click', function () { hide('actionSheet'); });
  document.getElementById('actionSheet').addEventListener('click', function (e) {
    if (!e.target.closest('.action-sheet')) hide('actionSheet');
  });

  // 수정 → 농장 수정 페이지로 이동
  document.getElementById('asEdit').addEventListener('click', function () {
    hide('actionSheet');
    window.location.href = 'farm-edit.html';
  });

  // 삭제 → 확인 모달 → 완료 모달
  document.getElementById('asDelete').addEventListener('click', function () {
    hide('actionSheet');
    setTimeout(function () { show('confirmModal'); }, 180);
  });
  document.getElementById('confirmCancel').addEventListener('click', function () { hide('confirmModal'); });
  document.getElementById('confirmDelete').addEventListener('click', function () {
    hide('confirmModal');
    setTimeout(function () { show('deletedModal'); }, 180);
  });
  document.getElementById('deletedOk').addEventListener('click', function () {
    hide('deletedModal');
    window.location.href = 'farmlist.html';
  });

  // 사진 스와이프 인디케이터
  var track = document.getElementById('track');
  if (track) {
    var dots = document.querySelectorAll('#dots .dot');
    var counter = document.getElementById('counter');
    var total = track.querySelectorAll('.slide').length;
    track.addEventListener('scroll', function () {
      var i = Math.round(track.scrollLeft / track.clientWidth);
      dots.forEach(function (d, idx) { d.classList.toggle('on', idx === i); });
      counter.textContent = (i + 1) + ' / ' + total;
    });

    // 데스크톱 마우스 드래그 스와이프 (터치는 네이티브 스와이프 사용)
    var down = false, moved = false, startX = 0, startScroll = 0;
    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'touch') return;
      down = true; moved = false;
      startX = e.clientX; startScroll = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
      track.classList.add('dragging');
    });
    track.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;
      track.scrollLeft = startScroll - dx;
    });
    function endDrag(e) {
      if (!down) return;
      down = false;
      try { track.releasePointerCapture(e.pointerId); } catch (_) {}
      track.classList.remove('dragging');
      // 가장 가까운 슬라이드로 스냅
      var i = Math.round(track.scrollLeft / track.clientWidth);
      track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
    }
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);
    // 드래그로 끝났을 때 이미지 클릭/드래그 기본동작 무력화
    track.addEventListener('click', function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);
    track.addEventListener('dragstart', function (e) { e.preventDefault(); });
  }
})();
