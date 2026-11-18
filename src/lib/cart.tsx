import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { type Line, lineKey, count, total } from './order';

interface Cart { lines: Line[]; add: (l: Omit<Line, 'qty'>) => void; setQty: (id: string, size: string, qty: number) => void; clear: () => void; open: boolean; setOpen: (v: boolean) => void; count: number; total: number }
const Ctx = createContext<Cart>(null as unknown as Cart);
export const useCart = () => useContext(Ctx);
const KEY = 'rail-store-bag-v1';

function load(): Line[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v.filter((l) => l && typeof l.id === 'string' && typeof l.size === 'string' && l.qty > 0 && l.price >= 0) : [];
  } catch { return []; }
}
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>(load);
  const [open, setOpen] = useState(false);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch { /* storage unavailable */ } }, [lines]);
  const value = useMemo<Cart>(() => ({
    lines, open, setOpen, count: count(lines), total: total(lines),
    add: (l) => { setLines((p) => { const k = lineKey(l.id, l.size); return p.some((x) => lineKey(x.id, x.size) === k) ? p.map((x) => (lineKey(x.id, x.size) === k ? { ...x, qty: Math.min(10, x.qty + 1) } : x)) : [...p, { ...l, qty: 1 }]; }); setOpen(true); },
    setQty: (id, size, qty) => setLines((p) => (qty <= 0 ? p.filter((x) => lineKey(x.id, x.size) !== lineKey(id, size)) : p.map((x) => (lineKey(x.id, x.size) === lineKey(id, size) ? { ...x, qty: Math.min(10, qty) } : x)))),
    clear: () => setLines([]),
  }), [lines, open]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
