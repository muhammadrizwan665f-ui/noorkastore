import { useState, type ReactNode } from 'react';
import { useCart } from '../lib/cart';
import { BRAND, WHATSAPP } from '../lib/config';
import { Link, useNav } from '../lib/nav';

export const WA = WHATSAPP ? `https://wa.me/${WHATSAPP.replace(/\D/g, '')}` : undefined;
const LINKS: [string, string][] = [['/', 'Home'], ['/shop', 'Shop'], ['/about', 'About Us'], ['/contact', 'Contact Us']];

export default function Layout({ children }: { children: ReactNode }) {
  const { count, setOpen } = useCart();
  const { base } = useNav();
  const [menu, setMenu] = useState(false);
  const cls = (to: string) => (to === base ? 'border-b-2 border-blue-600 pb-0.5 text-blue-700' : 'pb-0.5 border-b-2 border-transparent');
  return (
    <div className="flex min-h-full flex-col">
      <div className="bg-[#0b1530] px-3 py-2 text-[11px] text-white sm:text-xs"><div className="mx-auto flex max-w-6xl justify-between gap-3"><span>Free Delivery All Over Pakistan</span><span className="hidden sm:inline">Premium Quality Fabric</span><span>Easy Returns &amp; Exchange</span></div></div>
      <header className="sticky top-0 z-10 border-b border-neutral-100 bg-white/95 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 py-3">
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex" aria-label="Main">{LINKS.map(([to, label]) => <Link key={to} to={to} className={cls(to)} aria-current={to === base ? 'page' : undefined}>{label}</Link>)}</nav>
          <button className="justify-self-start p-2 md:hidden" onClick={() => setMenu((v) => !v)} aria-expanded={menu} aria-label="Menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d={menu ? 'M5 5l14 14M19 5L5 19' : 'M3 6h18M3 12h18M3 18h18'} /></svg></button>
          <Link to="/" className="text-center leading-none" aria-label={`${BRAND} home`}><span className="block text-base font-extrabold tracking-[0.12em] sm:text-2xl sm:tracking-[0.2em]">{BRAND}</span><span className="block text-[8px] tracking-[0.35em] text-neutral-500">T-SHIRTS</span></Link>
          <button onClick={() => setOpen(true)} className="relative justify-self-end p-2" aria-label={`Open bag, ${count} items`}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h3l2.5 12h11L21 7H6M9 20h.01M18 20h.01" /></svg>{count > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-blue-600 px-1 text-[10px] text-white">{count}</span>}</button>
        </div>
        {menu && <nav className="animate-fade border-t border-neutral-100 bg-white px-4 py-2 md:hidden" aria-label="Mobile">{LINKS.map(([to, label]) => <Link key={to} to={to} onClick={() => setMenu(false)} className={`block py-3 text-sm font-medium ${to === base ? 'text-blue-700' : ''}`}>{label}</Link>)}</nav>}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-[#0b1530] px-4 py-10 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
          <div><p className="text-xl font-extrabold tracking-[0.2em]">{BRAND}</p><p className="mt-2 text-sm text-white/70">T-shirts in 15 colours. Orders on WhatsApp.</p></div>
          <div><p className="font-semibold">Quick Links</p><ul className="mt-2 space-y-1 text-sm text-white/80">{[...LINKS, ['/shipping-returns', 'Shipping & Returns']].map(([to, label]) => <li key={to}><Link to={to}>{label}</Link></li>)}</ul></div>
          <div><p className="font-semibold">Contact</p>{WA ? <a href={WA} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex h-10 items-center rounded-full bg-blue-600 px-5 text-sm font-semibold">Chat on WhatsApp</a> : <p className="mt-2 text-sm text-white/70">Orders via WhatsApp</p>}</div>
        </div>
        <p className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-4 text-xs text-white/60">© {new Date().getFullYear()} {BRAND}. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
