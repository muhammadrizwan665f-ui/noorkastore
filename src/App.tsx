import { useCallback, useEffect, useState } from 'react';
import { CartProvider, useCart } from './lib/cart';
import { BRAND, TAGLINE } from './lib/config';
import { PRODUCTS } from './data/products';
import Rail from './components/Rail';
import ProductView from './components/ProductView';
import Bag from './components/Bag';

const slugFromPath = () => { const m = location.pathname.match(/^\/p\/([^/]+)\/?$/); return m ? decodeURIComponent(m[1]) : null; };

function Shell() {
  const [slug, setSlug] = useState<string | null>(slugFromPath);
  const { count, setOpen } = useCart();
  useEffect(() => { const f = () => setSlug(slugFromPath()); addEventListener('popstate', f); return () => removeEventListener('popstate', f); }, []);
  const go = useCallback((s: string | null, replace = false) => {
    const url = s ? `/p/${encodeURIComponent(s)}` : '/';
    replace ? history.replaceState(null, '', url) : history.pushState(null, '', url);
    setSlug(s);
  }, []);
  const product = slug ? PRODUCTS.find((p) => p.slug === slug) : undefined;
  useEffect(() => { document.title = product ? `${product.name} — ${BRAND}` : `${BRAND} — ${TAGLINE}`; }, [product]);

  return (
    <div className="flex h-full flex-col">
      <header className="relative z-10 flex items-center justify-between px-5 py-4 sm:px-8">
        <button onClick={() => go(null)} className="text-sm font-medium tracking-[0.3em]" aria-label={`${BRAND} home`}>{BRAND}</button>
        <button onClick={() => setOpen(true)} className="text-sm tracking-wide" aria-label={`Open bag, ${count} items`}>Bag ({count})</button>
      </header>
      <main className={`flex-1 min-h-0 transition-[filter] duration-300 ${product ? 'blur-md' : ''}`} aria-hidden={!!product}>
        <Rail products={PRODUCTS} onOpen={(p) => go(p.slug)} />
      </main>
      <footer className="px-5 py-4 text-center text-[11px] tracking-widest text-neutral-400 sm:px-8">{TAGLINE.toUpperCase()} · ORDERS VIA WHATSAPP</footer>
      {slug && !product && <NotFound onBack={() => go(null)} />}
      {product && <ProductView product={product} list={PRODUCTS} onClose={() => go(null)} onNav={(s) => go(s, true)} />}
      <Bag />
    </div>
  );
}
function NotFound({ onBack }: { onBack: () => void }) {
  return <div className="fixed inset-0 z-20 grid place-items-center bg-white/80 text-center"><div><p className="mb-4 text-sm">This piece is no longer available.</p><button onClick={onBack} className="border border-black px-5 py-2 text-sm">Back to the rail</button></div></div>;
}
export default function App() { return <CartProvider><Shell /></CartProvider>; }
