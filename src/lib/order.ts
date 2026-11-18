export interface Line { id: string; name: string; size: string; qty: number; price: number }

export const fmtPrice = (n: number, currency = 'PKR') => `${currency} ${Math.round(n).toLocaleString('en-US')}`;
export const lineKey = (id: string, size: string) => `${id}|${size}`;
export const total = (lines: Line[]) => lines.reduce((s, l) => s + l.price * l.qty, 0);
export const count = (lines: Line[]) => lines.reduce((s, l) => s + l.qty, 0);

/** Plain-text order message that the customer sends to the store on WhatsApp. */
export function buildOrderMessage(lines: Line[], brand: string, currency = 'PKR'): string {
  const rows = lines.map((l, i) => `${i + 1}. ${l.name} — Size ${l.size} × ${l.qty} — ${fmtPrice(l.price * l.qty, currency)}`);
  return [`Hello ${brand}, I would like to order:`, '', ...rows, '', `Total: ${fmtPrice(total(lines), currency)}`, '', 'My name:', 'Delivery address:', 'City:'].join('\n');
}
export function whatsappUrl(number: string, text: string): string {
  const n = number.replace(/\D/g, '');
  return `https://wa.me/${n}?text=${encodeURIComponent(text)}`;
}
