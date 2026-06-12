/* migrate.js — app/ 표준 페이지 → app2/_src/pages/ 콘텐츠 추출 (무설치 node)
 *
 * 표준 페이지(.phone > status-bar + appbar + 콘텐츠)에서 콘텐츠만 뽑아
 * <!--META {...}--> + 콘텐츠로 저장. status-bar·appbar·인라인 SVG defs 는 빌드가 생성하므로 제거.
 * 특수 레이아웃(SKIP)은 수동 처리.
 * 실행: node migrate.js
 */
const fs = require('fs');
const path = require('path');
const APP = path.join(__dirname, '..', 'app');
const PAGES = path.join(__dirname, '_src', 'pages');

// 수동 처리(특수 구조) — 자동 추출 제외
const SKIP = new Set([
  'index.html', 'home.html', 'menu.html', 'dialogs.html',
  'diagnose/diagnose-loading.html',   // 앱바 없음(다크 풀스크린)
  'diagnose/diagnose-input.html',     // 위저드(topBack JS)
  'diagnose/diagnose-followup.html',  // 위저드
  'diagnose/diagnose-result.html',    // 자체완결(인라인 <style>+defs+base64) → migrate-specials VERBATIM
  'mypage/pwchange.html',             // 모달 시트(.sheet)
  'price/pricesearch.html',           // .search-appbar
  'pestsearch/pestsearch-search.html' // .search-bar
]);

// 페이지전용 css 오버라이드(자동 감지로 못 잡는 경우) — 인라인 <style> 보충분을 전용 css로 분리
const CSS_OVERRIDE = {
  'expert/expert-write.html': 'expert-write.css'  // inquiry-write.css @import + 알약 .chip 3줄
};

// 햄버거 OFF (상세·결과·뷰어·인증)
function menuOff(rel) {
  return /(-detail|diagnose-result|terms-view|privacy-view|location-view)\.html$/.test(rel)
    || rel.startsWith('auth/');
}

function walk(d) {
  let r = [];
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f), s = fs.statSync(p);
    if (s.isDirectory()) { if (!['_img', '_js', '_css', '_qa'].includes(f)) r = r.concat(walk(p)); }
    else if (f.endsWith('.html')) r.push(p);
  }
  return r;
}

// .phone 내부 추출 (div 밸런스로 정확히 매칭)
function phoneInner(html) {
  const o = html.search(/<div class="phone"/);
  if (o < 0) return null;
  const start = html.indexOf('>', o) + 1;
  const re = /<div\b|<\/div>/g; re.lastIndex = start; let depth = 1, m;
  while ((m = re.exec(html))) { if (m[0] === '</div>') { if (--depth === 0) return html.slice(start, m.index); } else depth++; }
  return null;
}

let done = 0; const skipped = [], failed = [];
for (const file of walk(APP)) {
  const rel = path.relative(APP, file).split(path.sep).join('/');
  if (SKIP.has(rel)) { skipped.push(rel); continue; }
  const html = fs.readFileSync(file, 'utf8');
  let inner = phoneInner(html);
  if (inner === null) { failed.push(rel); continue; }
  inner = inner.replace(/\s*<div class="status-bar">[\s\S]*?<\/div>/, '');
  inner = inner.replace(/\s*<div class="appbar">[\s\S]*?<\/div>/, '');

  const title = (html.match(/<span class="title">([^<]*)<\/span>/) || [])[1] || '';
  const backRaw = (html.match(/<a class="back"[^>]*href="([^"]*)"/) || [])[1] || null;
  const css = [...html.matchAll(/href="\.\.\/_css\/([^"]+\.css)"/g)].map(x => x[1])
    .find(c => c !== 'common.css' && c !== 'components.css') || null;
  const scripts = [...html.matchAll(/<script[\s\S]*?<\/script>/g)]
    .map(x => x[0])
    .filter(s => !/sprite\.js/.test(s))                 // sprite.js 는 인라인 주입으로 대체 → 참조 제거
    .map(s => s.replace(/(\.\.\/)?_js\//g, '{{A}}js/'))
    .join('\n');

  // 앱바의 페이지전용 우측 액션(검색·북마크·⋯) 보존
  const abm = html.match(/<div class="appbar">([\s\S]*?)<\/div>/);
  let rightAct = '';
  if (abm) { const a = abm[1].match(/<button class="(?:act|more)"[\s\S]*?<\/button>/); if (a) rightAct = a[0]; }

  const meta = { title };
  if (backRaw) meta.back = path.posix.join(path.posix.dirname(rel), backRaw); // 루트 기준
  meta.menu = !menuOff(rel);
  if (rightAct) meta.right = rightAct;
  if (css) meta.css = css;
  if (CSS_OVERRIDE[rel]) meta.css = CSS_OVERRIDE[rel];

  let content = inner.trim();
  if (scripts) content += '\n' + scripts;

  const out = path.join(PAGES, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, '<!--META ' + JSON.stringify(meta) + ' -->\n' + content + '\n');
  done++;
}
console.log('migrated ' + done + ' / skipped(manual) ' + skipped.length);
console.log('  manual: ' + skipped.join(', '));
if (failed.length) console.log('  FAILED: ' + failed.join(', '));
