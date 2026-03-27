import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ArticleCard } from '@/components/content/ArticleCard';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata = {
  title: 'Singles Feuerwehr Schweiz — Alle Kantone',
  description: 'Feuerwehr Singles & Bekanntschaften in allen Schweizer Kantonen. Dates und Partnersuche für Blaulicht-Singles.',
};

export default async function FeuerwehrRegional() {
  const all = await reader.collections.regional.all();
  const entries = all
    .filter((r) => r.entry.beruf === 'feuerwehr')
    .sort((a, b) => a.entry.kanton.localeCompare(b.entry.kanton, 'de-CH'));

  const byKanton = new Map<string, typeof entries>();
  for (const entry of entries) {
    const k = entry.entry.kanton;
    if (!byKanton.has(k)) byKanton.set(k, []);
    byKanton.get(k)!.push(entry);
  }

  return (
    <>
      <PillarHero
        title="Singles Feuerwehr"
        texts={['Berufsfeuerwehr', 'Milizfeuerwehr', 'Blaulicht', 'Feuerwehr Singles', 'Dein Kanton']}
        subtitle="Feuerwehr Singles & Partnersuche in allen Schweizer Kantonen — finde jemanden, der deinen Alltag kennt."
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: 'Regional', href: '/regional' },
          { label: 'Feuerwehr', href: '/regional/feuerwehr' },
        ]} />

        {Array.from(byKanton.entries()).map(([kanton, kantonsEntries]) => (
          <ScrollReveal key={kanton}>
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-4 border-b border-brand-orange/30 pb-2">{kanton}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kantonsEntries.map((entry) => (
                  <ArticleCard
                    key={entry.slug}
                    title={entry.entry.title}
                    excerpt={entry.entry.excerpt}
                    href={`/regional/${entry.entry.kanton.toLowerCase().replace(/[\s-]+/g, '-').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue')}/${entry.slug}`}
                    image={entry.entry.featuredImage || undefined}
                    category={entry.entry.city || kanton}
                    date={entry.entry.publishedAt || undefined}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}

        {entries.length === 0 && (
          <p className="text-foreground/50 text-center py-12">Noch keine Artikel. Bald verfügbar.</p>
        )}
      </div>
    </>
  );
}
