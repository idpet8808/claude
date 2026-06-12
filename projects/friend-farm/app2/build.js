/* friend-farm app2 빌드 — 무설치 node (의존성 0)
 *
 * _src/pages/**.html (콘텐츠 + 선두 <!--META {json}-->) →
 * _src/layout.html 공통 셸 + 생성 status-bar/appbar + 사용 심볼 인라인 주입 → app2/<경로>.html
 *
 * 아이콘: 단일 소스 img/icons.svg 에서 **그 페이지가 쓰는 심볼만** 인라인 주입하고
 *         <use href="#id"> 내부참조 사용. (외부참조는 currentColor 미상속으로 색 사라짐 → 인라인)
 *         dev: 이 주입 블록을 PHP <?php include 'sprite.php' ?> 한 줄로 치환하면 단일 소스 유지.
 *
 * META: title, back(루트기준), menu(bool), right(우측 액션 raw), appbar(false면 생략), css, js, layout("raw")
 * 실행: node build.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, '_src');
const PAGES = path.join(SRC, 'pages');
const layout = fs.readFileSync(path.join(SRC, 'layout.html'), 'utf8');

// 단일 스프라이트 → 심볼 맵
const spriteSrc = fs.readFileSync(path.join(ROOT, 'img', 'icons.svg'), 'utf8');
const SYM = new Map();
{ const re = /<symbol id="([^"]+)"[\s\S]*?<\/symbol>/g; let m; while ((m = re.exec(spriteSrc))) SYM.set(m[1], m[0]); }

function relPrefix(rel) { const d = rel.split('/').length - 1; return d ? '../'.repeat(d) : ''; }

function statusBar() {
  return '    <div class="status-bar"><span>9:41</span><span class="group">' +
    '<svg class="ic"><use href="#i-wifi"/></svg> <svg class="ic"><use href="#i-battery"/></svg></span></div>\n';
}

function appBar(m) {
  if (m.appbar === false) return '';
  const back = m.back
    ? `<a class="back" href="{{A}}${m.back}" aria-label="뒤로"><svg class="ic"><use href="#i-back"/></svg></a>`
    : '<span class="sp"></span>';
  const menu = m.menu
    ? `<a class="menu" href="{{A}}menu.html" aria-label="메뉴"><svg class="ic"><use href="#i-menu"/></svg></a>`
    : '';
  const right = ((m.right || '') + menu) || '<span class="sp"></span>';
  return `    <div class="appbar">${back}<span class="title">${m.title || ''}</span>${right}</div>\n`;
}

// 페이지가 참조하는 심볼만 모아 인라인 스프라이트 생성
function spriteFor(html) {
  const ids = new Set(); const re = /href="#([A-Za-z0-9_-]+)"/g; let m;
  while ((m = re.exec(html))) { if (SYM.has(m[1])) ids.add(m[1]); }
  if (!ids.size) return '';
  return '  <svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
    [...ids].map(i => SYM.get(i)).join('') + '</defs></svg>\n';
}

function walk(dir) {
  let out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) out = out.concat(walk(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

let count = 0;
for (const file of walk(PAGES)) {
  const rel = path.relative(PAGES, file).split(path.sep).join('/');
  const raw = fs.readFileSync(file, 'utf8');
  const mm = raw.match(/^<!--META\s+([\s\S]*?)-->\s*/);
  const meta = mm ? JSON.parse(mm[1]) : {};
  const content = mm ? raw.slice(mm[0].length) : raw;

  const pagecss = meta.css ? `<link rel="stylesheet" href="{{A}}css/${meta.css}"/>` : '';
  const pagejs = meta.js ? `<script src="{{A}}js/${meta.js}"></script>` : '';

  let html;
  if (meta.layout === 'raw') {
    html = content;
  } else {
    html = layout
      .replace('{{TITLE}}', meta.title || '')
      .replace('{{PAGECSS}}', pagecss)
      .replace('{{STATUSBAR}}', statusBar())
      .replace('{{APPBAR}}', appBar(meta))
      .replace('{{CONTENT}}', content)
      .replace('{{PAGEJS}}', pagejs);
  }
  html = html.replace('{{SPRITE}}', spriteFor(html));   // 사용 심볼만 인라인 주입
  html = html.replace(/\{\{A\}\}/g, relPrefix(rel));

  const out = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  count++;
}
console.log('built ' + count + ' page(s) [inline sprite, internal refs]');
