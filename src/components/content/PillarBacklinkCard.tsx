import Link from 'next/link';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';

type Beruf = 'polizei' | 'sanitaet' | 'feuerwehr';
type Variant = 'regional' | 'partnersuche';

interface Props {
  beruf: Beruf;
  variant?: Variant;
}

const REGIONAL = {
  polizei: { label: 'Polizei', href: '/regional/polizei' },
  sanitaet: { label: 'Sanität', href: '/regional/sanitaet' },
  feuerwehr: { label: 'Feuerwehr', href: '/regional/feuerwehr' },
};

const PARTNERSUCHE = {
  polizei: {
    label: 'Polizei',
    href: '/singles-partnersuche/polizei',
    heading: 'Polizei Singles & Partnersuche',
    text: 'Alle Artikel rund um Partnersuche, Dating und Beziehung für Polizistinnen und Polizisten.',
    cta: 'Zur Polizei Partnersuche →',
  },
  sanitaet: {
    label: 'Sanität',
    href: '/singles-partnersuche/sanitaet',
    heading: 'Sanität Singles & Partnersuche',
    text: 'Alle Artikel rund um Partnersuche, Dating und Beziehung für Rettungskräfte und Sanitäter.',
    cta: 'Zur Sanität Partnersuche →',
  },
  feuerwehr: {
    label: 'Feuerwehr',
    href: '/singles-partnersuche/feuerwehr',
    heading: 'Feuerwehr Singles & Partnersuche',
    text: 'Alle Artikel rund um Partnersuche, Dating und Beziehung für Feuerwehrleute.',
    cta: 'Zur Feuerwehr Partnersuche →',
  },
};

export function PillarBacklinkCard({ beruf, variant = 'regional' }: Props) {
  if (variant === 'partnersuche') {
    const c = PARTNERSUCHE[beruf] ?? PARTNERSUCHE.polizei;
    return (
      <AnimatedGradientBorder borderRadius={12} borderWidth={2} className="mt-12 mb-8">
        <div className="p-6">
          <p className="font-bold text-foreground mb-1">{c.heading}</p>
          <p className="text-sm text-foreground/70 mb-3">{c.text}</p>
          <Link href={c.href} className="text-brand-orange font-semibold hover:underline text-sm">
            {c.cta}
          </Link>
        </div>
      </AnimatedGradientBorder>
    );
  }

  const c = REGIONAL[beruf] ?? REGIONAL.polizei;
  return (
    <AnimatedGradientBorder borderRadius={12} borderWidth={2} className="mt-12 mb-8">
      <div className="p-6">
        <p className="font-bold text-foreground mb-1">
          {c.label} Singles — alle Kantone & Regionen
        </p>
        <p className="text-sm text-foreground/70 mb-3">
          Du suchst {c.label}-Singles in der ganzen Schweiz? Unsere Übersicht zeigt alle Kantone, Städte und Regionen.
        </p>
        <Link href={c.href} className="text-brand-orange font-semibold hover:underline text-sm">
          Zur {c.label} Übersicht →
        </Link>
      </div>
    </AnimatedGradientBorder>
  );
}
