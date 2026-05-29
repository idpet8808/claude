/* find-account.js — 계정 찾기 (아이디/비밀번호 탭 전환 + 이메일 유효성)
 */

(function () {
  var tabs = document.querySelectorAll('.tab');
  var paneId = document.querySelector('.pane-id');
  var panePw = document.querySelector('.pane-pw');
  var submitBtn = document.getElementById('submitBtn');

  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.classList.remove('on'); });
      t.classList.add('on');
      var isId = t.dataset.tab === 'id';
      paneId.classList.toggle('hidden', !isId);
      panePw.classList.toggle('hidden', isId);
      submitBtn.textContent = isId ? '아이디 찾기' : '다음';
    });
  });

  /* 유효성 검사 (인증요청 시) */
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setErr(id, on) {
    var f = document.getElementById(id);
    f.classList.toggle('show-err', on);
    f.querySelector('.box').classList.toggle('err', on);
  }

  document.querySelectorAll('[data-req-email]').forEach(function (btn) {
    var ids = btn.getAttribute('data-req-email').split(',');
    var emailId = ids[0], prevId = ids[1];
    btn.addEventListener('click', function () {
      var prev = document.getElementById(prevId);
      var prevVal = prev.querySelector('.inp').value.trim();
      setErr(prevId, prevVal === '');
      var emailVal = document.getElementById(emailId).querySelector('.inp').value.trim();
      setErr(emailId, !emailRe.test(emailVal));
    });
  });

  document.querySelectorAll('.field .inp').forEach(function (inp) {
    inp.addEventListener('input', function () {
      var f = inp.closest('.field');
      if (f && f.classList.contains('show-err')) {
        f.classList.remove('show-err');
        f.querySelector('.box').classList.remove('err');
      }
    });
  });
})();
