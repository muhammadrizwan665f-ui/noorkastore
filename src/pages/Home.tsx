import { PRODUCTS, NEW_ARRIVALS, BEST_SELLERS, type Product } from '../data/products';
import Rail from '../components/Rail';
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';
import { Link, useNav } from '../lib/nav';

export default function Home() {
  const { openProduct } = useNav();
  const open = (p: Product) => openProduct(p.slug);
  return (
    <>
      <section className="overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-600">
        <div className="mx-auto grid max-w-6xl items-center gap-2 px-4 py-8 sm:grid-cols-2 sm:py-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.4em] text-neutral-700">PREMIUM T-SHIRTS</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] sm:text-6xl">STYLE MEETS <span className="block text-blue-600">COMFORT</span></h1>
            <p className="mt-3 text-lg font-medium">Look Better. Feel Better.</p>
            <Link to="/shop" className="mt-5 inline-flex h-11 items-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white">Shop Now →</Link>
          </div>
          <div className="relative mx-auto flex w-full max-w-md justify-center" aria-hidden>
            <img src={PRODUCTS[0].thumb} alt="" className="-mr-10 w-[52%] -rotate-3 drop-shadow-xl" /><img src={PRODUCTS[13].thumb} alt="" className="mt-6 w-[52%] rotate-3 drop-shadow-xl" />
          </div>
        </div>
      </section>
      <section id="collection" className="scroll-mt-16 border-b border-neutral-100 bg-white pb-4" aria-label="Colours"><Rail products={PRODUCTS} onOpen={open} /></section>
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
          <Link to="/shop" className="col-span-2 flex flex-col justify-center rounded-xl bg-blue-50 p-5 sm:col-span-3 lg:col-span-1"><p className="text-xl font-extrabold leading-tight">Shop All Products</p><span className="mt-3 inline-flex h-9 w-fit items-center whitespace-nowrap rounded-full bg-blue-600 px-4 text-xs font-semibold text-white">Explore More →</span></Link>
        </div>
      </section>
    </>
  );
}
