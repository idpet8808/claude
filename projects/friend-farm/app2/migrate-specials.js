/* migrate-specials.js — 특수 레이아웃 페이지를 app2 raw 페이지로 변환 (무설치 node)
 *
 * 표준 셸이 안 맞는 페이지(home·menu·dialogs·index·진단 위저드·로딩·시트·검색바)를
 * layout:"raw"로 통째 가져오되:
 *   - 인라인 <defs> 또는 sprite.js <script> → {{SPRITE}} (빌드가 사용 심볼 인라인 주입)
 *   - 자산 경로(_css/_js/_img, ../포함) → {{A}}  (빌드가 깊이별 보정)
 *   - 내부 페이지 링크는 그대로 (구조 미러링)
 * 실행: node migrate-specials.js
 */
const fs = require('fs');
const path = require('path');
const APP = path.join(__dirname, '..', 'app');
const PAGES = path.join(__dirname, '_src', 'pages');

const SPECIALS = [
  'index.html', 'home.html', 'menu.html', 'dialogs.html',
  'diagnose/diagnose-loading.html', 'diagnose/diagnose-input.html', 'diagnose/diagnose-followup.html',
  'mypage/pwchange.html', 'price/pricesearch.html', 'pestsearch/pestsearch-search.html'
];

// 자체완결 페이지(인라인 <style>+defs+base64 데모이미지) — 원본 그대로 보존(변형 X).
// "원본 소스로 유지" 지시 정합. 공용 셸/스프라이트 미사용 = 문서화된 단일 예외.
const VERBATIM = ['diagnose/diagnose-result.html'];

for (const rel of SPECIALS) {
  let h = fs.readFileSync(path.join(APP, rel), 'utf8');
  let injected = false;
  // 인라인 SVG defs 블록 제거 → {{SPRITE}}
  h = h.replace(/<svg width="0" height="0"[^>]*>[\s\S]*?<\/defs><\/svg>/, () => { injected = true; return '{{SPRITE}}'; });
  // sprite.js 스크립트 제거 → {{SPRITE}}
  h = h.replace(/\s*<script src="[^"]*sprite\.js"[^>]*><\/script>/, () => { injected = true; return '\n{{SPRITE}}'; });
  if (!injected) h = h.replace(/<body>/, '<body>\n{{SPRITE}}');
  // 자산 경로 → {{A}}
  h = h.replace(/(\.\.\/)?_css\//g, '{{A}}css/')
       .replace(/(\.\.\/)?_js\//g, '{{A}}js/')
       .replace(/(\.\.\/)?_img\//g, '{{A}}img/');

  const out = path.join(PAGES, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, '<!--META {"layout":"raw"} -->\n' + h);
  console.log('special: ' + rel);
}

for (const rel of VERBATIM) {
  const h = fs.readFileSync(path.join(APP, rel), 'utf8');  // 변형 없이 원본 그대로
  const out = path.join(PAGES, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, '<!--META {"layout":"raw"} -->\n' + h);
  console.log('verbatim: ' + rel);
}
