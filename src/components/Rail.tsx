import { useEffect, useRef } from 'react';
import type { Product } from '../data/products';
import { ROD_OFFSET_PCT, CURRENCY } from '../lib/config';
import { fmtPrice } from '../lib/order';

/** All colours hung on one rod. Fits the width on desktop, scrolls sideways on small screens. */
export default function Rail({ products, onOpen }: { products: Product[]; onOpen: (p: Product) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const f = (e: WheelEvent) => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && el.scrollWidth > el.clientWidth + 2) { const atEdge = (e.deltaY < 0 && el.scrollLeft <= 0) || (e.deltaY > 0 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 1); if (!atEdge) { e.preventDefault(); el.scrollLeft += e.deltaY; } } };
    el.addEventListener('wheel', f, { passive: false }); return () => el.removeEventListener('wheel', f);
  }, []);
  return (
    <div ref={ref} className="no-scrollbar flex snap-x overflow-x-auto overflow-y-hidden px-2 pt-2 sm:px-4" role="list" aria-label="All colours">
      {products.map((p) => (
        <div key={p.id} role="listitem" className="group relative min-w-[64px] flex-1 snap-center">
          <span aria-hidden className="absolute -left-px -right-px h-[3px] rounded-full bg-gradient-to-b from-neutral-300 via-neutral-500 to-neutral-300" style={{ top: `${ROD_OFFSET_PCT}%` }} />
          <button onClick={() => onOpen(p)} className="block w-full origin-top group-hover:animate-sway focus-visible:animate-sway" aria-label={`${p.name}, ${fmtPrice(p.price, CURRENCY)}`}>
            <img src={p.front} alt={p.name} loading="eager" decoding="async" draggable={false} className="block aspect-[860/1180] w-full select-none object-contain" />
          </button>
        </div>
      ))}
    </div>
  );
}
