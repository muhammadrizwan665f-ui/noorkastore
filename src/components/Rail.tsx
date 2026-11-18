import { useEffect, useRef } from 'react';
import type { Product } from '../data/products';
import { ROD_OFFSET_PCT, CURRENCY } from '../lib/config';
import { fmtPrice } from '../lib/order';

export default function Rail({ products, onOpen }: { products: Product[]; onOpen: (p: Product) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  // Mouse wheel scrolls the rail sideways on desktop.
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const f = (e: WheelEvent) => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && el.scrollWidth > el.clientWidth) { e.preventDefault(); el.scrollLeft += e.deltaY; } };
    el.addEventListener('wheel', f, { passive: false }); return () => el.removeEventListener('wheel', f);
  }, []);
  const nudge = (d: number) => ref.current?.scrollBy({ left: d * Math.max(300, ref.current.clientWidth * 0.7), behavior: 'smooth' });
  return (
    <div className="relative h-full">
      <div ref={ref} className="no-scrollbar flex h-full snap-x items-start overflow-x-auto overflow-y-hidden px-4 pt-[4vh] sm:px-10" role="list" aria-label="Collection">
        {products.map((p, i) => (
          <div key={p.id} role="listitem" className="group relative w-[62vw] max-w-[300px] shrink-0 snap-center sm:w-[260px] lg:w-[280px]">
            <span aria-hidden className="absolute -left-px -right-px h-px bg-neutral-800" style={{ top: `${ROD_OFFSET_PCT}%`, aspectRatio: 'auto' }} />
            <button onClick={() => onOpen(p)} className="block w-full origin-top group-hover:animate-sway focus-visible:animate-sway" aria-label={`${p.name}, ${fmtPrice(p.price, CURRENCY)}`}>
              <img src={p.front} alt={p.name} loading={i < 5 ? 'eager' : 'lazy'} decoding="async" draggable={false} className="block aspect-[400/520] w-full select-none object-contain" />
            </button>
          </div>
        ))}
        <div aria-hidden className="w-4 shrink-0" />
      </div>
      <button onClick={() => nudge(-1)} aria-label="Scroll left" className="absolute left-2 top-1/3 hidden h-10 w-10 place-items-center rounded-full bg-white/80 text-xl shadow sm:grid">‹</button>
      <button onClick={() => nudge(1)} aria-label="Scroll right" className="absolute right-2 top-1/3 hidden h-10 w-10 place-items-center rounded-full bg-white/80 text-xl shadow sm:grid">›</button>
    </div>
  );
}
