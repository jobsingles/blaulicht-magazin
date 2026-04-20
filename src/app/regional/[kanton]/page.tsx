import type { Metadata } from 'next';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ArticleCard } from '@/components/content/ArticleCard';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

function kantonLabel(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\bae\b/g, 'ä').replace(/\boe\b/g, 'ö').replace(/\bue\b/g, 'ü')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: { params: Promise<{ kanton: string }> }): Promise<Metadata> {
  const { kanton } = await params;
  const label = kantonLabel(kanton);
  return {
    title: `Singles ${label} — Blaulicht-Dating Kanton ${label}`,
    description: `Polizei, Feuerwehr und Sanität: Singles im Kanton ${label} kennenlernen. Regionale Tipps, Treffpunkte und Bekanntschaften für Blaulicht-Singles aus ${label}.`,
    alternates: { canonical: `/regional/${kanton}` },
  };
}

export async function generateStaticParams() {
  const all = await reader.collections.regional.all();
  const kantons = new Set(
    all.map((r) => r.entry.kanton.toLowerCase().replace(/[\s-]+/g, '-').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue'))
  );
  // Statische Beruf-Routen ausschliessen
  const STATIC = new Set(['polizei', 'sanitaet', 'feuerwehr']);
  return Array.from(kantons)
    .filter((k) => !STATIC.has(k))
    .map((kanton) => ({ kanton }));
}

const BERUF_LABELS: Record<string, string> = {
  polizei: 'Polizei',
  sanitaet: 'Sanität',
  feuerwehr: 'Feuerwehr',
};

export default async function KantonPage({ params }: { params: Promise<{ kanton: string }> }) {
  const { kanton } = await params;
  const allRegional = await reader.collections.regional.all();
  const entries = allRegional.filter(
    (r) => r.entry.kanton.toLowerCase().replace(/[\s-]+/g, '-').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue') === kanton
  );

  const kantonName = entries[0]?.entry.kanton || kanton;

  const byBeruf = new Map<string, typeof entries>();
  for (const entry of entries) {
    const b = entry.entry.beruf ?? 'polizei';
    if (!byBeruf.has(b)) byBeruf.set(b, []);
    byBeruf.get(b)!.push(entry);
  }

  return (
    <>
      <PillarHero
        title={`Kanton ${kantonName}`}
        subtitle={`Blaulicht-Singles im Kanton ${kantonName} — Polizei, Sanität und Feuerwehr.`}
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: 'Regional', href: '/regional' },
          { label: kantonName, href: `/regional/${kanton}` },
        ]} />

        {['polizei', 'sanitaet', 'feuerwehr'].map((beruf) => {
          const berufsEntries = byBeruf.get(beruf);
          if (!berufsEntries?.length) return null;
          return (
            <ScrollReveal key={beruf}>
              <div className="mb-12">
                <h2 className="text-xl font-bold mb-4 border-b border-brand-orange/30 pb-2">
                  {BERUF_LABELS[beruf]}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {berufsEntries.map((entry) => (
                    <ArticleCard
                      key={entry.slug}
                      title={entry.entry.title}
                      excerpt={entry.entry.excerpt}
                      href={`/regional/${kanton}/${entry.slug}`}
                      image={entry.entry.featuredImage || undefined}
                      imageAlt={entry.entry.featuredImageAlt || undefined}
                      category={entry.entry.city || kantonName}
                      date={entry.entry.publishedAt || undefined}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-foreground/10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Blaulicht-Singles im Kanton {kantonName}</h2>
        <div className="space-y-4 text-foreground/75 leading-relaxed">
          <p>
            Der Kanton {kantonName} bringt eigene Realitäten mit — unterschiedliche Einsatzstrukturen, regionale Korps-Kulturen
            und lokale Treffpunkte, an denen sich Singles aus Polizei, Feuerwehr und Sanität natürlicher begegnen als in einer
            generischen Dating-App. Diese Übersicht bündelt alle regionalen Beiträge zu {kantonName} an einem Ort.
          </p>
          <p>
            Partnersuche im Blaulicht-Umfeld läuft anders als im Durchschnitt. Schichtdienst, Wochenend-Pikett, emotional
            fordernde Einsätze — wer das lebt, braucht eine Gegenseite, die es einordnen kann. Die Beiträge für {kantonName}
            gehen auf lokale Date-Ideen, Treffpunkte nach der Schicht und auf die Besonderheiten der kantonalen Einsatzrealität
            ein. So wird aus einem Dating-Profil ein Gespräch, das nicht bei „Was machst du beruflich?" hängen bleibt.
          </p>
          <p>
            Nutzer in {kantonName} profitieren zusätzlich von der gesamtschweizerischen Reichweite der Plattform: wer im
            Grenzverkehr arbeitet (etwa zwischen {kantonName} und Nachbarkantonen), findet über die Regionalsuche auch
            dort Profile, ohne extra reisen zu müssen.
          </p>
          <p>
            Alle Beiträge sind redaktionell gepflegt, mit Quellen, Autor-Bio und Veröffentlichungsdatum versehen — damit
            du weisst, wann ein Text entstanden ist und wer dahintersteht.
          </p>
        </div>
      </section>
    </>
  );
}
