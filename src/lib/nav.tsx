import { createContext, useCallback, useContext, useEffect, useRef, useState, type AnchorHTMLAttributes, type ReactNode } from 'react';

const norm = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p) || '/';
interface Nav { path: string; base: string; go: (to: string) => void; openProduct: (slug: string) => void; closeProduct: () => void; swapProduct: (slug: string) => void }
const Ctx = createContext<Nav>(null as unknown as Nav);
export const useNav = () => useContext(Ctx);
export const productSlug = (path: string) => { const m = path.match(/^\/p\/([^/]+)$/); return m ? decodeURIComponent(m[1]) : null; };

export function NavProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => norm(location.pathname));
  const baseRef = useRef(productSlug(path) ? '/' : path);
  if (!productSlug(path)) baseRef.current = path;
  useEffect(() => { const f = () => setPath(norm(location.pathname)); addEventListener('popstate', f); return () => removeEventListener('popstate', f); }, []);
  const go = useCallback((to: string) => {
    const [p, hash] = to.split('#'); const next = norm(p || '/');
    if (next !== norm(location.pathname)) { history.pushState(null, '', next); setPath(next); }
    requestAnimationFrame(() => { const el = hash ? document.getElementById(hash) : null; el ? el.scrollIntoView({ behavior: 'smooth' }) : !hash && scrollTo(0, 0); });
  }, []);
  const openProduct = useCallback((slug: string) => { history.pushState({ from: true }, '', `/p/${encodeURIComponent(slug)}`); setPath(`/p/${encodeURIComponent(slug)}`); }, []);
  const swapProduct = useCallback((slug: string) => { history.replaceState(history.state, '', `/p/${encodeURIComponent(slug)}`); setPath(`/p/${encodeURIComponent(slug)}`); }, []);
  const closeProduct = useCallback(() => { if (history.state?.from) history.back(); else { history.replaceState(null, '', '/'); setPath('/'); } }, []);
  return <Ctx.Provider value={{ path, base: baseRef.current, go, openProduct, closeProduct, swapProduct }}>{children}</Ctx.Provider>;
}

export function Link({ to, children, onClick, ...rest }: { to: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { go } = useNav();
  return <a href={to} {...rest} onClick={(e) => { onClick?.(e); if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); go(to); }}>{children}</a>;
}
