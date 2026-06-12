/* build-sprite.js — 단일 SVG 스프라이트 조립 (무설치 node)
 *
 * app/ 전반(_img/icons.svg → _js/sprite.js → 페이지들)에서 <symbol> 정의를 수집,
 * id 중복은 "먼저 만난 것"(canonical 우선순위) 채택 → app2/img/icons.svg 단일 파일 생성.
 * 외부 참조용: <use href=".../img/icons.svg#i-x">
 *
 * canonical 우선순위: _img/icons.svg(디자이너 단일소스) > _js/sprite.js > 페이지(알파벳).
 * 실행: node build-sprite.js
 */
const fs = require('fs');
const path = require('path');

const APP = path.join(__dirname, '..', 'app');
const OUT = path.join(__dirname, 'img', 'icons.svg');

function walkHtml(dir) {
  let out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (!['_img', '_js', '_css', '_qa'].includes(name)) out = out.concat(walkHtml(p));
    } else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

const sources = [];
const iconsSvg = path.join(APP, '_img', 'icons.svg');
const spriteJs = path.join(APP, '_js', 'sprite.js');
if (fs.existsSync(iconsSvg)) sources.push(iconsSvg);
if (fs.existsSync(spriteJs)) sources.push(spriteJs);
sources.push(...walkHtml(APP).sort());

const symRe = /<symbol id="([^"]+)"[\s\S]*?<\/symbol>/g;
const map = new Map();
const origin = new Map();
for (const s of sources) {
  const text = fs.readFileSync(s, 'utf8');
  let m;
  while ((m = symRe.exec(text))) {
    const id = m[1];
    if (!map.has(id)) { map.set(id, m[0]); origin.set(id, path.relative(APP, s)); }
  }
}

const body = [...map.values()].join('\n  ');
const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>\n  ' + body + '\n</defs></svg>\n';
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, svg);
console.log('sprite: ' + map.size + ' symbols → app2/img/icons.svg');
