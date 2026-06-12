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
