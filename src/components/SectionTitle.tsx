export default function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return <div className="mb-5 text-center"><div className="flex items-center justify-center gap-4"><span className="h-px w-12 bg-neutral-300 sm:w-24" /><h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2><span className="h-px w-12 bg-neutral-300 sm:w-24" /></div>{sub && <p className="mt-1 text-sm text-neutral-600">{sub}</p>}</div>;
}
