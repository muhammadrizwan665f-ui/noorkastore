import { useEffect, useRef } from 'react';
import type { Product } from '../data/products';
import { ROD_OFFSET_PCT, CURRENCY } from '../lib/config';
import { fmtPrice } from '../lib/order';

/** Big garments hanging from one rod; scroll sideways (wheel, swipe, arrows). */
export default function Rail({ products, onOpen }: { products: Product[]; onOpen: (p: Product) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const f = (e: WheelEvent) => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && el.scrollWidth > el.clientWidth + 2) { const atEdge = (e.deltaY < 0 && el.scrollLeft <= 0) || (e.deltaY > 0 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 1); if (!atEdge) { e.preventDefault(); el.scrollLeft += e.deltaY; } } };
    el.addEventListener('wheel', f, { passive: false }); return () => el.removeEventListener('wheel', f);
  }, []);
  const nudge = (d: number) => ref.current?.scrollBy({ left: d * Math.max(260, ref.current.clientWidth * 0.6), behavior: 'smooth' });
  return (
    <div className="relative">
      <div ref={ref} className="no-scrollbar flex snap-x snap-proximity overflow-x-auto overflow-y-hidden px-3 pt-4 sm:px-8" role="list" aria-label="All colours">
        {products.map((p) => (
          <div key={p.id} role="listitem" className="group relative w-[46vw] max-w-[320px] shrink-0 snap-center sm:w-[26vw] lg:w-[21vw]">
            <span aria-hidden className="absolute -left-px -right-px h-1 rounded-full bg-gradient-to-b from-neutral-300 via-neutral-500 to-neutral-400" style={{ top: `${ROD_OFFSET_PCT}%` }} />
            <button onClick={() => onOpen(p)} className="block w-full origin-top group-hover:animate-sway focus-visible:animate-sway" aria-label={`${p.name}, ${fmtPrice(p.price, CURRENCY)}`}>
              <img src={p.front} alt={p.name} loading="eager" decoding="async" draggable={false} className="block aspect-[860/1090] w-full select-none object-contain" />
            </button>
          </div>
        ))}
        <div aria-hidden className="w-3 shrink-0" />
      </div>
      <button onClick={() => nudge(-1)} aria-label="Scroll left" className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-2xl shadow sm:grid">‹</button>
      <button onClick={() => nudge(1)} aria-label="Scroll right" className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-2xl shadow sm:grid">›</button>
    </div>
  );
}
