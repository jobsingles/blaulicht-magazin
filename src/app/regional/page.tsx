import { reader } from '@/lib/keystatic';

export const metadata = {
  title: 'Regional',
  description: 'Blaulicht-Dating in deinem Kanton — regionale Tipps und lokale Singles.',
};

export default async function Regional() {
  const allRegional = await reader.collections.regional.all();

  // Group by kanton
  const kantons = new Map<string, typeof allRegional>();
  for (const entry of allRegional) {
    const k = entry.entry.kanton;
    if (!kantons.has(k)) kantons.set(k, []);
    kantons.get(k)!.push(entry);
  }

  return (
    <div data-theme="dark" className="bg-background text-foreground min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Regional</h1>
          <p className="text-lg text-foreground/80">
            Blaulicht-Singles in deinem Kanton finden.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        {Array.from(kantons.entries()).map(([kanton, entries]) => (
          <div key={kanton} className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{kanton}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {entries.map((entry) => (
                <a key={entry.slug} href={`/regional/${entry.entry.kanton.toLowerCase().replace(/\s+/g, '-')}/${entry.slug}`} className="bg-surface-dark rounded-lg p-6 hover:ring-2 hover:ring-brand-orange transition-all">
                  <h3 className="text-lg font-semibold">{entry.entry.title}</h3>
                  {entry.entry.city && <p className="text-sm text-brand-orange mt-1">{entry.entry.city}</p>}
                  <p className="text-foreground/60 mt-2 text-sm">{entry.entry.excerpt}</p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
