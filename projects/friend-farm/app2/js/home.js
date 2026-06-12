/* home.js — 홈 날씨 알약 동적 렌더
 * SVG 외부 sprite (_img/icons.svg) 참조
 *
 * 실제 운영 시 wx 객체를 기상청 API 응답으로 교체
 */

const wx = {
  temp: 23.1,      // 기온 (°C)
  humidity: 82,    // 습도 (%)
  rainProb: 60     // 강수확률 (%)
};

function renderHero(w) {
  const target = document.getElementById('heroWx');
  if (!target) return;

  const dot = '<span class="dotsep"></span>';
  target.innerHTML =
    '<span class="pill"><svg class="ic"><use href="#i-cloud-rain"/></svg> ' +
    w.temp + '°' + dot +
    '습도 ' + w.humidity + '%' + dot +
    '강수 ' + w.rainProb + '%</span>';
}

renderHero(wx);

/* 홈 상단 탭 토글 (농사친구 / 내 농장 관리) — final 디자인 */
(function () {
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = {
    friend: document.getElementById('panel-friend'),
    farm: document.getElementById('panel-farm')
  };
  tabs.forEach(function (b) {
    b.addEventListener('click', function () {
      const t = b.dataset.tab;
      if (!t) return;
      tabs.forEach(function (x) {
        const on = x === b;
        x.classList.toggle('active', on);
        x.setAttribute('aria-current', on ? 'page' : 'false');
      });
      Object.keys(panels).forEach(function (k) {
        if (panels[k]) panels[k].hidden = (k !== t);
      });
      const app = document.querySelector('.app');
      if (app) app.scrollTo(0, 0);
    });
  });
})();

/* 가로 스크롤 영역 마우스 드래그 스와이프 + 관성 (데스크톱 — 마우스 휠은 세로만 동작) */
(function () {
  document.querySelectorAll('.story-row').forEach(function (row) {
    let down = false, moved = false;
    let lastX = 0, velocity = 0, lastT = 0, raf = 0;

    function stopInertia() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }

    function inertia() {
      velocity *= 0.92;                      // 감속 계수
      row.scrollLeft -= velocity;
      if (Math.abs(velocity) > 0.4) {
        raf = requestAnimationFrame(inertia);
      } else {
        raf = 0;
      }
    }

    row.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'touch') return; // 터치는 네이티브 스와이프 사용
      stopInertia();
      down = true;
      moved = false;
      lastX = e.clientX;
      velocity = 0;
      lastT = e.timeStamp;
      row.setPointerCapture(e.pointerId);
    });

    row.addEventListener('pointermove', function (e) {
      if (!down) return;
      const dx = e.clientX - lastX;
      const dt = e.timeStamp - lastT || 16;
      if (Math.abs(dx) > 3) moved = true;
      row.scrollLeft -= dx;
      velocity = velocity * 0.7 + (dx / dt) * 16 * 0.3;  // 평활화된 속도(px/프레임)
      lastX = e.clientX;
      lastT = e.timeStamp;
    });

    function end(e) {
      if (!down) return;
      down = false;
      try { row.releasePointerCapture(e.pointerId); } catch (_) {}
      if (moved) {
        row.classList.add('dragging');       // 드래그 직후 카드 클릭 차단
        if (Math.abs(velocity) > 0.5) { stopInertia(); raf = requestAnimationFrame(inertia); }
      }
    }
    row.addEventListener('pointerup', end);
    row.addEventListener('pointercancel', end);

    // 드래그로 끝났을 때 발생하는 클릭만 1회 무력화
    row.addEventListener('click', function (e) {
      if (row.classList.contains('dragging')) {
        e.preventDefault();
        e.stopPropagation();
        row.classList.remove('dragging');
      }
    }, true);
  });
})();
