import type { ReactNode } from 'react';
import { BRAND } from '../lib/config';
import { Link } from '../lib/nav';
import { WA } from '../components/Layout';

const Wrap = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="mx-auto max-w-3xl px-4 py-12"><h1 className="mb-6 text-3xl font-bold tracking-tight">{title}</h1><div className="space-y-4 leading-relaxed text-neutral-700">{children}</div></section>
);
const Cta = ({ label = 'Chat on WhatsApp' }: { label?: string }) => WA ? <a href={WA} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex h-11 items-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white">{label}</a> : null;

export function About() {
  return <Wrap title={`About ${BRAND}`}>
    <p>{BRAND} is a T-shirt store. Our plain, comfortable T-shirts come in 15 colours and in sizes S, M, L, XL and XXL.</p>
    <p>You can look at the front and the back of every shirt, pick your size and send your order on WhatsApp. We confirm your order and delivery details with you there.</p>
    <Link to="/shop" className="inline-flex h-11 items-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white">Browse the shop →</Link>
  </Wrap>;
}
export function Contact() {
  return <Wrap title="Contact Us">
    <p>The quickest way to reach us is WhatsApp. Ask about a colour, a size or your order and we will reply there.</p>
    <Cta />
    <h2 className="pt-6 text-xl font-semibold text-neutral-900">How to order</h2>
    <ol className="list-decimal space-y-2 pl-5"><li>Open a T-shirt, check the front and back, and pick your size.</li><li>Tap “Add to bag”. Add as many shirts as you like.</li><li>Open your bag and tap “Order on WhatsApp”.</li><li>Send the message, then add your name, delivery address and city. We confirm your order.</li></ol>
  </Wrap>;
}
export function Shipping() {
  return <Wrap title="Shipping &amp; Returns">
    <p>We deliver all over Pakistan. Delivery charges and expected delivery time are confirmed with you on WhatsApp when you place your order.</p>
    <p>If something is not right with your order, or you would like to exchange a size, message us on WhatsApp with your order details and we will help you.</p>
    <Cta label="Message us on WhatsApp" />
  </Wrap>;
}
export function NotFoundPage() {
  return <Wrap title="Page not found"><p>We could not find that page.</p><Link to="/" className="inline-flex h-11 items-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white">Back to home</Link></Wrap>;
}
