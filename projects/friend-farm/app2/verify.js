/* verify.js — 빌드물 정적 링크/자산 검증 (무설치 node, 브라우저 불필요)
 *
 * 각 .html 의 href/src(css·js·html·svg·이미지) 를 페이지 위치 기준으로 해석해
 * 실제 파일 존재를 확인. 외부(http)·data·mailto·tel·앵커(#)는 제외.
 * 실행: node verify.js
 */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

function walk(d) {
  let r = [];
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) { if (!['_src', '_qa', 'node_modules'].includes(f)) r = r.concat(walk(p)); }
    else if (f.endsWith('.html')) r.push(p);
  }
  return r;
}

let miss = 0, checked = 0;
const ext = /(?:href|src)="([^"]+?\.(?:css|js|html|svg|png|jpg|jpeg|webp|gif))(?:[?#][^"]*)?"/g;
for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(ext)) {
    const ref = m[1];
    if (/^(https?:|data:|mailto:|tel:|#)/.test(ref)) continue;
    checked++;
    const tgt = path.normalize(path.join(path.dirname(file), ref));
    if (!fs.existsSync(tgt)) { console.log('MISSING  ' + rel + '  →  ' + ref); miss++; }
  }
}
console.log('\nchecked ' + checked + ' refs, ' + miss + ' missing');
