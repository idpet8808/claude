/* login.js — 로그인 화면 비밀번호 표시·숨김 토글
 * SVG 외부 sprite (_img/icons.svg) 참조
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
