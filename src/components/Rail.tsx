import { useEffect, useRef } from 'react';
import type { Product } from '../data/products';
import { ROD_OFFSET_PCT, CURRENCY } from '../lib/config';
import { fmtPrice } from '../lib/order';

/** Garments hanging from one rod. Drag with the mouse (with momentum), swipe on touch, wheel, arrows or keyboard.
 *  The garments swing slightly with the scroll speed, like real hangers. */
export default function Rail({ products, onOpen }: { products: Product[]; onOpen: (p: Product) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const suppress = useRef(false);

  useEffect(() => {
    const el = ref.current!; const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let last = el.scrollLeft, lastT = performance.now(), v = 0, lean = 0, raf = 0;
    const paint = () => {
      const w = Math.min(1, el.clientWidth / el.scrollWidth), max = el.scrollWidth - el.clientWidth, p = max > 0 ? el.scrollLeft / max : 0;
      if (bar.current) { bar.current.style.width = `${w * 100}%`; bar.current.style.marginLeft = `${p * (1 - w) * 100}%`; }
    };
    const tick = (t: number) => {
      const dt = Math.max(1, t - lastT); v = v * 0.8 + ((el.scrollLeft - last) / dt) * 0.2; last = el.scrollLeft; lastT = t;
      const target = reduce ? 0 : Math.max(-6, Math.min(6, v * 7)); lean += (target - lean) * 0.18;
      el.style.setProperty('--lean', `${lean.toFixed(2)}deg`); paint();
      raf = Math.abs(v) > 0.005 || Math.abs(lean) > 0.05 ? requestAnimationFrame(tick) : 0;
      if (!raf) el.style.setProperty('--lean', '0deg');
    };
    const kick = () => { if (!raf) { lastT = performance.now(); raf = requestAnimationFrame(tick); } };
    el.addEventListener('scroll', kick, { passive: true }); addEventListener('resize', paint); paint();

    // mouse drag with momentum (touch keeps native scrolling)
    let down = false, sx = 0, sl = 0, moved = 0, vel = 0, px = 0, pt = 0, mom = 0;
    const onDown = (e: PointerEvent) => { if (e.pointerType !== 'mouse' || e.button !== 0) return; cancelAnimationFrame(mom); down = true; moved = 0; sx = px = e.clientX; sl = el.scrollLeft; pt = performance.now(); vel = 0; };
    const onMove = (e: PointerEvent) => {
      if (!down) return; const dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx));
      if (moved > 5) el.classList.add('dragging');
      el.scrollLeft = sl - dx; const now = performance.now(); vel = vel * 0.6 + ((px - e.clientX) / Math.max(1, now - pt)) * 0.4; px = e.clientX; pt = now;
    };
    const onUp = () => {
      if (!down) return; down = false;
      if (moved > 5) { suppress.current = true; setTimeout(() => (suppress.current = false), 0); }
      const glide = () => { el.scrollLeft += vel * 16; vel *= 0.94; if (Math.abs(vel) > 0.03) mom = requestAnimationFrame(glide); else el.classList.remove('dragging'); };
      if (el.classList.contains('dragging')) glide();
    };
    el.addEventListener('pointerdown', onDown); addEventListener('pointermove', onMove); addEventListener('pointerup', onUp); addEventListener('pointercancel', onUp);

    const wheel = (e: WheelEvent) => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && el.scrollWidth > el.clientWidth + 2) { const edge = (e.deltaY < 0 && el.scrollLeft <= 0) || (e.deltaY > 0 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 1); if (!edge) { e.preventDefault(); el.scrollLeft += e.deltaY; } } };
    el.addEventListener('wheel', wheel, { passive: false });
    return () => { cancelAnimationFrame(raf); cancelAnimationFrame(mom); el.removeEventListener('scroll', kick); removeEventListener('resize', paint); el.removeEventListener('pointerdown', onDown); removeEventListener('pointermove', onMove); removeEventListener('pointerup', onUp); removeEventListener('pointercancel', onUp); el.removeEventListener('wheel', wheel); };
  }, []);

  const nudge = (d: number) => ref.current?.scrollBy({ left: d * Math.max(260, ref.current.clientWidth * 0.6), behavior: 'smooth' });
  return (
    <div className="relative">
      <div ref={ref} tabIndex={0} onKeyDown={(e) => { if (e.key === 'ArrowRight') { e.preventDefault(); nudge(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-1); } }}
        onClickCapture={(e) => { if (suppress.current) { e.preventDefault(); e.stopPropagation(); } }}
        className="rail-scroll no-scrollbar flex snap-x overflow-x-auto overflow-y-hidden px-3 pt-4 focus-visible:outline-none sm:px-8" role="list" aria-label="All colours (scroll sideways)">
        {products.map((p) => (
          <div key={p.id} role="listitem" className="group relative w-[46vw] max-w-[320px] shrink-0 snap-center sm:w-[26vw] lg:w-[21vw]">
            <span aria-hidden className="absolute -left-px -right-px h-1 rounded-full bg-gradient-to-b from-neutral-200 via-neutral-500 to-neutral-400 shadow-[0_1px_2px_rgba(0,0,0,.25)]" style={{ top: `${ROD_OFFSET_PCT}%` }} />
            <div className="rail-lean" style={{ transformOrigin: `50% ${ROD_OFFSET_PCT}%` }}>
              <button onClick={() => onOpen(p)} className="block w-full origin-top group-hover:animate-sway focus-visible:animate-sway" aria-label={`${p.name}, ${fmtPrice(p.price, CURRENCY)}`}>
                <img src={p.front} alt={p.name} loading="eager" decoding="async" draggable={false} className="pointer-events-none block aspect-[860/1090] w-full select-none object-contain" />
              </button>
            </div>
          </div>
        ))}
        <div aria-hidden className="w-3 shrink-0" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent sm:w-16" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent sm:w-16" />
      <button onClick={() => nudge(-1)} aria-label="Scroll left" className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-2xl shadow-md transition hover:scale-105 sm:grid">‹</button>
      <button onClick={() => nudge(1)} aria-label="Scroll right" className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-2xl shadow-md transition hover:scale-105 sm:grid">›</button>
      <div aria-hidden className="mx-auto mt-2 h-[3px] w-40 overflow-hidden rounded-full bg-neutral-200"><span ref={bar} className="block h-full rounded-full bg-neutral-800" style={{ width: '25%' }} /></div>
    </div>
  );
}
