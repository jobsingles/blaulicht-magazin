import Image from 'next/image';
import Link from 'next/link';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata = {
  alternates: { canonical: \'/regional\' },
  title: 'Regional',
  description: 'Blaulicht-Dating in deinem Kanton — regionale Tipps und lokale Singles für Polizei, Sanität und Feuerwehr.',
};

const BERUFE = [
  {
    id: 'polizei',
    label: 'Polizei',
    description: 'Kantonspolizei, Stadtpolizei, Gemeindepolizei — Singles in deinem Kanton.',
    href: '/regional/polizei',
    icon: '🚔',
  },
  {
    id: 'sanitaet',
    label: 'Sanität',
    description: 'Rettungsdienst, Sanitäter, Notfallsanitäter — Singles in deinem Kanton.',
    href: '/regional/sanitaet',
    icon: '🚑',
  },
  {
    id: 'feuerwehr',
    label: 'Feuerwehr',
    description: 'Berufsfeuerwehr und Milizfeuerwehr — Singles in deinem Kanton.',
    href: '/regional/feuerwehr',
    icon: '🚒',
  },
] as const;

export default async function Regional() {
  const all = await reader.collections.regional.all();

  const counts = {
    polizei: all.filter((r) => r.entry.beruf === 'polizei').length,
    sanitaet: all.filter((r) => r.entry.beruf === 'sanitaet').length,
    feuerwehr: all.filter((r) => r.entry.beruf === 'feuerwehr').length,
  };

  return (
    <>
      <section className="relative overflow-hidden min-h-[320px] md:min-h-[440px]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-regional.webp"
            alt="Blaulicht-Singles Regional — Polizei, Feuerwehr, Sanität und Ärzte vor Schweizer Alpenpanorama"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 15%' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col justify-end min-h-[320px] md:min-h-[440px] pb-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-lg text-center">
            <span className="text-brand-orange">Singles</span> Regional finden
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow text-center">
            Blaulicht-Singles in deinem Kanton — regionale Tipps, lokale Orte, echte Verbindungen.
          </p>
        </div>
      </section>

      <PillarHero as="h2"
        title="Regional"
        texts={['Liebe Dialekt', 'Singles vor Ort', 'Dein Kanton', 'Nähe verbindet', 'Regional']}
      />

      <section className="max-w-5xl mx-auto px-6 pt-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BERUFE.map((beruf) => (
            <ScrollReveal key={beruf.id}>
              <Link
                href={beruf.href}
                className="block bg-surface-dark text-white rounded-xl p-8 hover:ring-2 hover:ring-brand-orange transition-all group"
              >
                <div className="text-4xl mb-4">{beruf.icon}</div>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-brand-orange transition-colors">
                  {beruf.label}
                </h2>
                <p className="text-white/60 text-sm mb-4">{beruf.description}</p>
                <span className="text-xs font-semibold text-brand-orange">
                  {counts[beruf.id]} {counts[beruf.id] === 1 ? 'Kanton' : 'Kantone'} →
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-foreground/10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Regional Singles finden — warum die Kantonsfilter wichtig sind</h2>
        <div className="space-y-4 text-foreground/75 leading-relaxed">
          <p>
            Die Schweiz ist im Blaulicht-Bereich föderal organisiert. 26 Kantonspolizeien, über 300 Gemeindepolizeien, rund
            1&apos;500 Feuerwehr-Einheiten (Berufs- und Miliz) und eine Vielzahl regionaler Rettungsdienste — jede Einheit
            hat eigene Strukturen, Dienstzeiten und Dialekte. Wer auf Partnersuche ist, profitiert davon, wenn das regional
            eingegrenzt wird.
          </p>
          <p>
            Diese Übersicht sortiert dich direkt zu den Kantonen, in denen es aktive Profile und Artikel gibt. Ob Kanton
            Zürich mit städtischer Dichte, Kanton Graubünden mit Alpenregionen oder kleinere Kantone wie Appenzell
            Innerrhoden — jede Region hat eine eigene Dating-Realität. Lange Wege, dünne Bevölkerung, enge Korps-Kulturen
            oder dichte urbane Szene mit vielen Kollegen, die sich privat kennen.
          </p>
          <p>
            Dazu kommen die drei Berufsgruppen — Polizei, Feuerwehr und Sanität — mit jeweils eigenen Besonderheiten.
            Polizeidienst mit Schichtrhythmus, Milizfeuerwehr mit Doppelbelastung neben dem Hauptberuf, und
            Rettungsdienst mit intensiver emotionaler Belastung. Wer hier passt, weiss was der andere aushält.
          </p>
          <p>
            Nutze die Navigation oben, um direkt in deinen Kanton zu springen, oder filtere nach Beruf, wenn dir die
            Region weniger wichtig ist als das gemeinsame Einsatzumfeld.
          </p>
        </div>
      </section>
    </>
  );
}
