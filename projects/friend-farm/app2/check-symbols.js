/* check-symbols.js — 빌드물의 아이콘 참조(#id)가 모두 스프라이트에 존재하는지 검증
 * 누락 = 안 보이는 아이콘. 페이지가 자체 inline 정의한 id(verbatim 등)는 통과.
 * 실행: node check-symbols.js
 */
const fs = require('fs');
const path = require('path');
const sprite = fs.readFileSync('img/icons.svg', 'utf8');
const SYM = new Set([...sprite.matchAll(/<symbol id="([^"]+)"/g)].map(m => m[1]));

function walk(d) {
  let r = [];
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) {
      if (!['_src', '_qa', 'img', 'css', 'js', 'node_modules'].includes(f)) r = r.concat(walk(p));
    } else if (f.endsWith('.html')) r.push(p);
  }
  return r;
}

let miss = 0;
for (const file of walk('.')) {
  const rel = path.relative('.', file).split(path.sep).join('/');
  const html = fs.readFileSync(file, 'utf8');
  const ids = new Set([...html.matchAll(/href="#([A-Za-z0-9_-]+)"/g)].map(m => m[1]));
  for (const id of ids) {
    // 스프라이트에 없고, 그 페이지가 자체 inline 정의(id="...")도 안 했으면 깨진 아이콘
    if (!SYM.has(id) && !html.includes('id="' + id + '"')) {
      console.log('  ⚠ ' + rel + ' → #' + id + ' (스프라이트·인라인 모두 없음)');
      miss++;
    }
  }
}
console.log(miss ? '  누락 ' + miss + '건' : '  ✓ 모든 아이콘 참조가 스프라이트/인라인에 존재 (' + SYM.size + ' 심볼)');
