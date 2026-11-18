import { useCallback, useEffect, useState } from 'react';
import { CartProvider, useCart } from './lib/cart';
import { BRAND, TAGLINE, WHATSAPP } from './lib/config';
import { PRODUCTS, NEW_ARRIVALS, BEST_SELLERS } from './data/products';
import Rail from './components/Rail';
import Card from './components/Card';
import ProductView from './components/ProductView';
import Bag from './components/Bag';

const slugFromPath = () => { const m = location.pathname.match(/^\/p\/([^/]+)\/?$/); return m ? decodeURIComponent(m[1]) : null; };
const wa = WHATSAPP ? `https://wa.me/${WHATSAPP.replace(/\D/g, '')}` : undefined;
const Ico = ({ d }: { d: string }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>;

function SectionTitle({ title, sub }: { title: string; sub: string }) {
  return <div className="mb-5 text-center"><div className="flex items-center justify-center gap-4"><span className="h-px w-12 bg-neutral-300 sm:w-24" /><h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2><span className="h-px w-12 bg-neutral-300 sm:w-24" /></div><p className="mt-1 text-sm text-neutral-600">{sub}</p></div>;
}

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
  const open = (p: { slug: string }) => go(p.slug);

  return (
    <div className="min-h-full">
      <div className="bg-[#0b1530] px-3 py-2 text-[11px] text-white sm:text-xs"><div className="mx-auto flex max-w-6xl justify-between gap-3"><span>Free Delivery All Over Pakistan</span><span className="hidden sm:inline">Premium Quality Fabric</span><span>Easy Returns &amp; Exchange</span></div></div>
      <header className="sticky top-0 z-10 border-b border-neutral-100 bg-white/95 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 py-3">
          <nav className="flex items-center gap-3 text-sm font-medium sm:gap-6" aria-label="Main">
            <a href="#top" className="border-b-2 border-blue-600 pb-0.5 text-blue-700">Home</a>
            <a href="#new-arrivals">Shop</a>
            {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="hidden sm:inline">Contact Us</a>}
          </nav>
          <a href="#top" className="text-center leading-none" aria-label={`${BRAND} home`}><span className="block text-base font-extrabold tracking-[0.12em] sm:text-2xl sm:tracking-[0.2em]">{BRAND}</span><span className="block text-[8px] tracking-[0.35em] text-neutral-500">T-SHIRTS</span></a>
          <button onClick={() => setOpen(true)} className="relative justify-self-end p-2" aria-label={`Open bag, ${count} items`}><Ico d="M2 3h3l2.5 12h11L21 7H6M9 20h.01M18 20h.01" />{count > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-blue-600 px-1 text-[10px] text-white">{count}</span>}</button>
        </div>
      </header>

      <main id="top">
        <section className="overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-600">
          <div className="mx-auto grid max-w-6xl items-center gap-2 px-4 py-8 sm:grid-cols-2 sm:py-12">
            <div>
              <p className="text-xs font-semibold tracking-[0.4em] text-neutral-700">PREMIUM T-SHIRTS</p>
              <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] sm:text-6xl">STYLE MEETS <span className="block text-blue-600">COMFORT</span></h1>
              <p className="mt-3 text-lg font-medium">Look Better. Feel Better.</p>
              <a href="#new-arrivals" className="mt-5 inline-flex h-11 items-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white">Shop Now →</a>
            </div>
            <div className="relative mx-auto flex w-full max-w-md justify-center" aria-hidden>
              <img src={PRODUCTS[0].front} alt="" className="-mr-10 w-[52%] -rotate-3 drop-shadow-xl" /><img src={PRODUCTS[13].front} alt="" className="mt-6 w-[52%] rotate-3 drop-shadow-xl" />
            </div>
          </div>
        </section>

        <section id="collection" className="border-b border-neutral-100 bg-white pb-2" aria-label="Colours">
          <Rail products={PRODUCTS} onOpen={open} />
        </section>

        <section id="new-arrivals" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-10">
          <SectionTitle title="New Arrivals" sub="Discover our latest collection" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{NEW_ARRIVALS.map((p) => <Card key={p.id} p={p} badge="New" onOpen={open} />)}</div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-3 px-4 sm:grid-cols-3">
          <div className="rounded-xl bg-[#0b1530] p-5 text-white"><p className="text-xl font-bold">Premium Fabric</p><p className="text-xs text-white/80">Soft · Breathable · Durable</p></div>
          <div className="rounded-xl bg-blue-600 p-5 text-white"><p className="text-xl font-bold">Best Prices</p><p className="text-xs text-white/90">Upgrade Your Wardrobe</p></div>
          <div className="rounded-xl bg-[#0b1530] p-5 text-white"><p className="text-xl font-bold">Perfect Gift</p><p className="text-xs text-white/80">For Every Occasion</p></div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <SectionTitle title="Best Sellers" sub="Our Most Loved Products" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {BEST_SELLERS.map((p) => <Card key={p.id} p={p} badge="Top" onOpen={open} />)}
            <a href="#collection" className="col-span-2 flex flex-col justify-center rounded-xl bg-blue-50 p-5 sm:col-span-3 lg:col-span-1"><p className="text-xl font-extrabold leading-tight">Shop All Products</p><span className="mt-3 inline-flex h-9 w-fit items-center whitespace-nowrap rounded-full bg-blue-600 px-4 text-xs font-semibold text-white">Explore More →</span></a>
          </div>
        </section>
      </main>

      <footer className="bg-[#0b1530] px-4 py-10 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
          <div><p className="text-xl font-extrabold tracking-[0.2em]">{BRAND}</p><p className="mt-2 text-sm text-white/70">T-shirts in 15 colours. Orders on WhatsApp.</p></div>
          <div><p className="font-semibold">Quick Links</p><ul className="mt-2 space-y-1 text-sm text-white/80"><li><a href="#top">Home</a></li><li><a href="#collection">All Colours</a></li><li><a href="#new-arrivals">New Arrivals</a></li></ul></div>
          <div><p className="font-semibold">Contact</p>{wa ? <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex h-10 items-center rounded-full bg-blue-600 px-5 text-sm font-semibold">Chat on WhatsApp</a> : <p className="mt-2 text-sm text-white/70">Orders via WhatsApp</p>}</div>
        </div>
        <p className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-4 text-xs text-white/60">© {new Date().getFullYear()} {BRAND}. All Rights Reserved.</p>
      </footer>

      {slug && !product && <NotFound onBack={() => go(null)} />}
      {product && <ProductView product={product} list={PRODUCTS} onClose={() => go(null)} onNav={(s) => go(s, true)} />}
      <Bag />
    </div>
  );
}
function NotFound({ onBack }: { onBack: () => void }) {
  return <div className="fixed inset-0 z-20 grid place-items-center bg-white/80 text-center"><div><p className="mb-4 text-sm">This piece is no longer available.</p><button onClick={onBack} className="border border-black px-5 py-2 text-sm">Back to the store</button></div></div>;
}
export default function App() { return <CartProvider><Shell /></CartProvider>; }
