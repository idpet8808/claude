/* signup.js — 회원가입 비밀번호 표시·숨김 토글
 * (login.js와 동일한 패턴 — 별도 파일로 페이지 명명 일관성 유지)
 */

document.querySelectorAll('.eye').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var inp = btn.parentElement.querySelector('.inp');
    var use = btn.querySelector('use');
    if (!inp || !use) return;

    if (inp.type === 'password') {
      inp.type = 'text';
      use.setAttribute('href', '#i-eye-off');
    } else {
      inp.type = 'password';
      use.setAttribute('href', '#i-eye');
    }
  });
});
