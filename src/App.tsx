import { useEffect } from 'react';
import { CartProvider } from './lib/cart';
import { NavProvider, useNav, productSlug } from './lib/nav';
import { BRAND, TAGLINE } from './lib/config';
import { PRODUCTS } from './data/products';
import Layout from './components/Layout';
import ProductView from './components/ProductView';
import Bag from './components/Bag';
import Home from './pages/Home';
import Shop from './pages/Shop';
import { About, Contact, Shipping, NotFoundPage } from './pages/Text';

const PAGES: Record<string, { el: () => JSX.Element; title: string }> = {
  '/': { el: Home, title: `${BRAND} — ${TAGLINE}` },
  '/shop': { el: Shop, title: `Shop — ${BRAND}` },
  '/about': { el: About, title: `About — ${BRAND}` },
  '/contact': { el: Contact, title: `Contact — ${BRAND}` },
  '/shipping-returns': { el: Shipping, title: `Shipping & Returns — ${BRAND}` },
};

function Shell() {
  const { path, base, closeProduct, swapProduct } = useNav();
  const slug = productSlug(path);
  const product = slug ? PRODUCTS.find((p) => p.slug === slug) : undefined;
  const page = PAGES[base];
  const Page = page ? page.el : NotFoundPage;
  useEffect(() => { document.title = product ? `${product.name} — ${BRAND}` : page ? page.title : `Not found — ${BRAND}`; }, [product, page]);
  return (
    <>
      <Layout><Page /></Layout>
      {slug && !product && <div className="fixed inset-0 z-20 grid place-items-center bg-white/80 text-center"><div><p className="mb-4 text-sm">This piece is no longer available.</p><button onClick={closeProduct} className="border border-black px-5 py-2 text-sm">Back to the store</button></div></div>}
      {product && <ProductView product={product} list={PRODUCTS} onClose={closeProduct} onNav={swapProduct} />}
      <Bag />
    </>
  );
}
export default function App() { return <CartProvider><NavProvider><Shell /></NavProvider></CartProvider>; }
