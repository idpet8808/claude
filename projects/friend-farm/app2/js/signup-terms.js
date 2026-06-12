/* signup-terms.js — 회원가입 약관 동의
 * 전체 동의 / 개별 동의 / 필수 충족 시 다음 버튼 활성화
 */

(function () {
  var agAll = document.getElementById('agAll');
  var items = Array.from(document.querySelectorAll('.ag-item'));
  var next = document.getElementById('next');

  function refresh() {
    agAll.classList.toggle('on', items.every(function (i) {
      return i.classList.contains('on');
    }));
    var reqOk = items.filter(function (i) {
      return i.dataset.req === '1';
    }).every(function (i) {
      return i.classList.contains('on');
    });
    next.disabled = !reqOk;
  }

  agAll.addEventListener('click', function () {
    var on = !agAll.classList.contains('on');
    items.forEach(function (i) { i.classList.toggle('on', on); });
    refresh();
  });

  items.forEach(function (i) {
    i.addEventListener('click', function () {
      i.classList.toggle('on');
      refresh();
    });
  });
})();
