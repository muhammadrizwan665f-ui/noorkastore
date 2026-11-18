import test from 'node:test';
import assert from 'node:assert/strict';
import { buildOrderMessage, whatsappUrl, total, count, fmtPrice } from '../src/lib/order.ts';
const lines = [{ id: '01', name: 'Tee', size: 'M', qty: 2, price: 3200 }, { id: '02', name: 'Jacket', size: 'L', qty: 1, price: 14500 }];
test('totals', () => { assert.equal(total(lines), 20900); assert.equal(count(lines), 3); assert.equal(fmtPrice(20900), 'PKR 20,900'); });
test('message', () => { const m = buildOrderMessage(lines, 'X'); assert.match(m, /1\. Tee — Size M × 2 — PKR 6,400/); assert.match(m, /Total: PKR 20,900/); });
test('wa url', () => { const u = whatsappUrl('+92 300-1234567', 'a b'); assert.equal(u, 'https://wa.me/923001234567?text=a%20b'); });
