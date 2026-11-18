import { useEffect, useRef, useState } from 'react';
import type { Product } from '../data/products';
import { CURRENCY } from '../lib/config';
import { fmtPrice } from '../lib/order';
import { useCart } from '../lib/cart';

export default function ProductView({ product, list, onClose, onNav }: { product: Product; list: Product[]; onClose: () => void; onNav: (slug: string) => void }) {
  const [side, setSide] = useState<'front' | 'back'>('front');
  const [size, setSize] = useState<string | null>(null);
  const { add } = useCart();
  const idx = list.findIndex((p) => p.id === product.id);
  const step = (d: number) => onNav(list[(idx + d + list.length) % list.length].slug);
  useEffect(() => { setSide('front'); setSize(null); }, [product.id]);
  useEffect(() => {
    const f = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); else if (e.key === 'ArrowLeft') step(-1); else if (e.key === 'ArrowRight') step(1); };
    addEventListener('keydown', f); return () => removeEventListener('keydown', f);
  });
  const x0 = useRef<number | null>(null);
  const out = (s: string) => product.soldOut?.includes(s);
  return (
    <div className="fixed inset-0 z-20 flex animate-fade flex-col items-center overflow-y-auto bg-white/80 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={product.name}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onTouchStart={(e) => { x0.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { if (x0.current == null) return; const dx = e.changedTouches[0].clientX - x0.current; x0.current = null; if (Math.abs(dx) > 60) step(dx < 0 ? 1 : -1); }}>
      <button onClick={onClose} className="absolute right-5 top-4 z-10 p-2 text-sm tracking-wide sm:right-8" aria-label="Close">Close ✕</button>
      <div className="relative flex min-h-0 w-full max-w-md flex-1 items-center justify-center px-14 pt-12">
        <button onClick={() => step(-1)} aria-label="Previous piece" className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-3xl sm:-left-10">‹</button>
        <div className="relative aspect-[400/520] w-full max-h-[52vh]">
          {(['front', 'back'] as const).map((s) => (
            <img key={s} src={product[s]} alt={`${product.name} ${s}`} draggable={false}
              className={`absolute inset-0 h-full w-full select-none object-contain transition-opacity duration-300 ${side === s ? 'opacity-100' : 'opacity-0'}`} />
          ))}
        </div>
        <button onClick={() => step(1)} aria-label="Next piece" className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-3xl sm:-right-10">›</button>
      </div>
      <div className="w-full max-w-md px-6 pb-8 text-center">
        <h1 className="text-base font-medium tracking-wide">{product.name}</h1>
        <p className="mt-1 text-sm text-neutral-600">{fmtPrice(product.price, CURRENCY)}</p>
        <div className="mt-3 inline-flex gap-5 text-sm" role="group" aria-label="View">
          {(['front', 'back'] as const).map((s) => <button key={s} onClick={() => setSide(s)} aria-pressed={side === s} className={`pb-0.5 capitalize ${side === s ? 'border-b border-black' : 'text-neutral-400'}`}>{s}</button>)}
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2" role="group" aria-label="Size">
          {product.sizes.map((s) => (
            <button key={s} disabled={!!out(s)} onClick={() => setSize(s)} aria-pressed={size === s}
              className={`h-10 min-w-12 border px-3 text-sm transition ${size === s ? 'border-black bg-black text-white' : 'border-neutral-300 hover:border-black'} ${out(s) ? 'cursor-not-allowed text-neutral-300 line-through hover:border-neutral-300' : ''}`}>{s}</button>
          ))}
        </div>
        <button disabled={!size} onClick={() => { if (size) add({ id: product.id, name: product.name, size, price: product.price }); }}
          className="mt-5 h-12 w-full max-w-xs bg-black text-sm tracking-wide text-white transition disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500">
          {size ? 'Add to bag' : 'Select a size'}
        </button>
      </div>
    </div>
  );
}
