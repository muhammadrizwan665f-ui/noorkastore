import { PRODUCTS } from '../data/products';
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';
import { useNav } from '../lib/nav';

export default function Shop() {
  const { openProduct } = useNav();
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <SectionTitle title="Shop" sub={`${PRODUCTS.length} colours · sizes S to XXL`} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{PRODUCTS.map((p) => <Card key={p.id} p={p} onOpen={(x) => openProduct(x.slug)} />)}</div>
    </section>
  );
}
