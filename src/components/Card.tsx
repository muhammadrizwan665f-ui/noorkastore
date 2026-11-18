import type { Product } from '../data/products';
import { CURRENCY } from '../lib/config';
import { fmtPrice } from '../lib/order';

export default function Card({ p, badge, onOpen }: { p: Product; badge: string; onOpen: (p: Product) => void }) {
  return (
    <button onClick={() => onOpen(p)} className="group relative block w-full rounded-xl border border-neutral-100 bg-white p-2 text-left shadow-sm transition hover:shadow-md" aria-label={`${p.name}, ${fmtPrice(p.price, CURRENCY)}`}>
      <span className="absolute left-2 top-2 z-10 rounded bg-blue-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">{badge}</span>
      <div className="overflow-hidden rounded-lg bg-neutral-50"><img src={p.front} alt="" loading="eager" decoding="async" draggable={false} className="aspect-[860/1000] w-full object-contain object-top transition group-hover:scale-105" /></div>
      <p className="mt-2 text-[13px] font-medium text-neutral-800">{p.name}</p>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-sm font-bold text-blue-700">{fmtPrice(p.price, CURRENCY)}</span>
        <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-neutral-900 text-white"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M2 3h3l2.5 12h11L21 7H6" /></svg></span>
      </div>
    </button>
  );
}
