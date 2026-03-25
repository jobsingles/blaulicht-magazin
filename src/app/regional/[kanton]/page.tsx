import { reader } from '@/lib/keystatic';

export async function generateStaticParams() {
  const all = await reader.collections.regional.all();
  const kantons = new Set(all.map((r) => r.entry.kanton.toLowerCase().replace(/\s+/g, '-')));
  return Array.from(kantons).map((kanton) => ({ kanton }));
}

export default async function KantonPage({ params }: { params: Promise<{ kanton: string }> }) {
  const { kanton } = await params;
  const allRegional = await reader.collections.regional.all();
  const entries = allRegional.filter(
    (r) => r.entry.kanton.toLowerCase().replace(/\s+/g, '-') === kanton
  );

  const kantonName = entries[0]?.entry.kanton || kanton;

  return (
    <div data-theme="dark" className="bg-background text-foreground min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Kanton {kantonName}</h1>
          <p className="text-foreground/80">Blaulicht-Singles im Kanton {kantonName}.</p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {entries.map((entry) => (
            <a key={entry.slug} href={`/regional/${kanton}/${entry.slug}`} className="bg-surface-dark rounded-lg p-6 hover:ring-2 hover:ring-brand-orange transition-all">
              <h3 className="text-xl font-semibold">{entry.entry.title}</h3>
              {entry.entry.city && <p className="text-sm text-brand-orange">{entry.entry.city}</p>}
              <p className="text-foreground/60 mt-2">{entry.entry.excerpt}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
