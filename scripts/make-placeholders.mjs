// Generates simple garment placeholder images (front/back, transparent background) so the layout can be tested
// before the real photos arrive. Real photos (PNG/WebP with transparent background) replace these in /public/products.
import { writeFileSync } from 'node:fs';
const kinds = ['tee', 'jacket', 'shirt', 'hoodie', 'tee', 'shirt', 'jacket', 'hoodie', 'shirt', 'tee', 'jacket', 'shirt', 'hoodie', 'jacket', 'tee'];
const cols = ['#d9c7a3', '#b5532f', '#26375c', '#1b1b1d', '#9fb39a', '#bdb7a6', '#1f2a44', '#8d9096', '#f1f1ee', '#b88a6a', '#6b7048', '#9cc3e0', '#6a3d5c', '#d8c4a0', '#20232b'];
const shade = (hex, f) => '#' + hex.slice(1).match(/../g).map((h) => Math.max(0, Math.min(255, Math.round(parseInt(h, 16) * f))).toString(16).padStart(2, '0')).join('');
const hanger = '<path d="M200 22c0-16 22-16 22 0 0 11-14 13-22 24" fill="none" stroke="#222" stroke-width="3"/><path d="M200 46L52 112H348Z" fill="none" stroke="#222" stroke-width="3" stroke-linejoin="round"/>';
function body(kind, c, back) {
  const d = shade(c, .78), st = `stroke="${shade(c, .55)}" stroke-width="2" stroke-linejoin="round"`;
  const neck = back ? 'Q200 124 230 112' : 'Q200 156 230 112';
  const tee = `<path d="M112 120L170 112${neck}L288 120L352 176L318 214L290 192V470H110V192L82 214L48 176Z" fill="${c}" ${st}/>`;
  if (kind === 'tee') return tee + (back ? '' : `<path d="M170 112${neck}" fill="none" stroke="${d}" stroke-width="5"/>`);
  if (kind === 'shirt') return `<path d="M112 120L172 112L200 150L228 112L288 120L352 190L330 470H70L48 190Z" transform="translate(0 0)" fill="${c}" ${st}/>` + (back ? `<path d="M112 140Q200 160 288 140" fill="none" stroke="${d}" stroke-width="3"/>` : `<path d="M200 150V470" stroke="${d}" stroke-width="3"/>` + [190, 250, 310, 370, 430].map((y) => `<circle cx="206" cy="${y}" r="3.5" fill="${d}"/>`).join('') + `<path d="M172 112L200 150L190 170L150 130Z M228 112L200 150L210 170L250 130Z" fill="${d}" opacity=".55"/>`);
  if (kind === 'jacket') return `<path d="M108 120L172 110H228L292 120L356 200L334 500H66L44 200Z" fill="${c}" ${st}/>` + (back ? `<path d="M200 110V500" stroke="${d}" stroke-width="2"/>` : `<path d="M200 112V500" stroke="${d}" stroke-width="4"/><rect x="108" y="330" width="62" height="46" rx="3" fill="none" stroke="${d}" stroke-width="3"/><rect x="230" y="330" width="62" height="46" rx="3" fill="none" stroke="${d}" stroke-width="3"/>`) + `<path d="M172 110Q200 130 228 110L228 132Q200 150 172 132Z" fill="${d}"/>`;
  return `<path d="M120 122L172 112Q200 82 228 112L280 122L352 220L322 480H78L48 220Z" fill="${c}" ${st}/>` + (back ? '' : `<path d="M172 112Q200 190 228 112" fill="${d}" stroke="${shade(c, .5)}" stroke-width="2"/><path d="M186 160V230M214 160V230" stroke="${shade(c, .4)}" stroke-width="3"/><path d="M130 400H270V470H130Z" fill="none" stroke="${d}" stroke-width="3"/>`) + `<path d="M150 112Q200 70 250 112" fill="none" stroke="${d}" stroke-width="${back ? 14 : 8}" opacity=".8"/>`;
}
kinds.forEach((k, i) => {
  const id = String(i + 1).padStart(2, '0');
  for (const back of [false, true]) writeFileSync(new URL(`../public/products/${id}-${back ? 'back' : 'front'}.svg`, import.meta.url), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 520" role="img" aria-label="placeholder">${hanger}${body(k, cols[i], back)}</svg>`);
});
console.log('wrote', kinds.length * 2, 'placeholder images');
