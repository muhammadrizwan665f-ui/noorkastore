import { useEffect } from 'react';
import { useCart } from '../lib/cart';
import { BRAND, CURRENCY, WHATSAPP } from '../lib/config';
import { buildOrderMessage, fmtPrice, whatsappUrl } from '../lib/order';

export default function Bag() {
  const { lines, open, setOpen, setQty, total, clear } = useCart();
  useEffect(() => { if (!open) return; const f = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false); addEventListener('keydown', f); return () => removeEventListener('keydown', f); }, [open, setOpen]);
  if (!open) return null;
  const href = WHATSAPP && lines.length ? whatsappUrl(WHATSAPP, buildOrderMessage(lines, BRAND, CURRENCY)) : undefined;
  return (
    <div className="fixed inset-0 z-30" role="dialog" aria-modal="true" aria-label="Bag">
      <div className="absolute inset-0 animate-fade bg-black/30" onClick={() => setOpen(false)} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-sm animate-slide flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between px-5 py-4"><h2 className="text-sm font-medium tracking-[0.2em]">BAG</h2><button onClick={() => setOpen(false)} className="p-2 text-sm" aria-label="Close bag">✕</button></div>
        <div className="flex-1 overflow-y-auto px-5">
          {lines.length === 0 && <p className="py-10 text-center text-sm text-neutral-500">Your bag is empty.</p>}
          {lines.map((l) => (
            <div key={l.id + l.size} className="flex items-center gap-3 border-b border-neutral-100 py-4">
              <img src={`/products/${l.id}-front-sm.webp`} alt="" className="h-16 w-12 object-contain" onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }} />
              <div className="min-w-0 flex-1 text-sm"><p className="truncate">{l.name}</p><p className="text-neutral-500">Size {l.size} · {fmtPrice(l.price, CURRENCY)}</p></div>
              <div className="flex items-center gap-2 text-sm">
                <button className="h-7 w-7 border" onClick={() => setQty(l.id, l.size, l.qty - 1)} aria-label="Decrease">−</button>
                <span className="w-4 text-center">{l.qty}</span>
                <button className="h-7 w-7 border" onClick={() => setQty(l.id, l.size, l.qty + 1)} aria-label="Increase">+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t px-5 py-4">
          <div className="mb-3 flex justify-between text-sm"><span>Total</span><span className="font-medium">{fmtPrice(total, CURRENCY)}</span></div>
          {href ? <a href={href} target="_blank" rel="noopener noreferrer" className="grid h-12 place-items-center bg-black text-sm tracking-wide text-white">Order on WhatsApp</a>
            : <button disabled className="h-12 w-full bg-neutral-200 text-sm text-neutral-500">{lines.length ? 'Ordering is not available yet' : 'Order on WhatsApp'}</button>}
          <p className="mt-2 text-center text-[11px] text-neutral-400">Delivery details are confirmed with you on WhatsApp.</p>
          {lines.length > 0 && <button onClick={clear} className="mt-2 w-full text-center text-[11px] text-neutral-400 underline">Empty bag</button>}
        </div>
      </aside>
    </div>
  );
}
