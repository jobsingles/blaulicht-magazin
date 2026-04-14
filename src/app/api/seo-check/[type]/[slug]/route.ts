import { NextResponse } from 'next/server';
import { reader } from '@/lib/keystatic';

type Check = { ok: boolean; weight: number; label: string; hint?: string };

const COLLECTION_MAP = {
  articles: 'articles',
  regional: 'regional',
  bekanntschaften: 'bekanntschaften',
  series: 'series',
  stories: 'stories',
} as const;

type CollectionKey = keyof typeof COLLECTION_MAP;

function lengthCheck(value: string | undefined | null, min: number, max: number, label: string, weight: number): Check {
  const len = (value ?? '').trim().length;
  const ok = len >= min && len <= max;
  return {
    ok,
    weight,
    label: `${label} (${len} Zeichen)`,
    hint: ok ? undefined : `Optimal ${min}–${max} Zeichen`,
  };
}

function presenceCheck(value: unknown, label: string, weight: number, hint?: string): Check {
  const ok = value !== undefined && value !== null && value !== '' && (Array.isArray(value) ? value.length > 0 : true);
  return { ok, weight, label, hint: ok ? undefined : hint };
}

function countCheck(value: unknown[], min: number, label: string, weight: number): Check {
  const ok = Array.isArray(value) && value.length >= min;
  return { ok, weight, label: `${label} (${Array.isArray(value) ? value.length : 0})`, hint: ok ? undefined : `Mindestens ${min} empfohlen` };
}

function wordCount(text: string | undefined | null): number {
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[äöüß]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' })[c] ?? c);
}

function containsKeyword(haystack: string | undefined | null, keyword: string): boolean {
  if (!haystack || !keyword) return false;
  return normalize(haystack).includes(normalize(keyword));
}

function keywordDensity(text: string, keyword: string): number {
  if (!text || !keyword) return 0;
  const words = text.split(/\s+/).filter(Boolean).length;
  if (words === 0) return 0;
  const occurrences = (normalize(text).match(new RegExp(normalize(keyword).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) ?? []).length;
  return (occurrences / words) * 100;
}

function keywordChecks(entry: any, slug: string, contentText: string, firstPara: string): Check[] {
  const kw = (entry.focusKeyword ?? '').trim();
  if (!kw) {
    return [{ ok: false, weight: 5, label: 'Focus-Keyword fehlt', hint: 'Setze ein Focus-Keyword im Backend, dann werden 7 Keyword-Checks aktiviert' }];
  }
  const density = keywordDensity(contentText, kw);
  const densityOk = density >= 0.5 && density <= 3.0;
  return [
    { ok: containsKeyword(entry.title, kw), weight: 8, label: `Keyword "${kw}" im Titel`, hint: `Im Artikel-Titel verwenden` },
    { ok: containsKeyword(slug, kw.replace(/\s+/g, '-')), weight: 6, label: `Keyword im Slug`, hint: `Slug enthält Keyword (mit Bindestrichen)` },
    { ok: containsKeyword(entry.seoTitle, kw), weight: 6, label: `Keyword im SEO-Titel`, hint: `SEO-Titel enthält das Keyword` },
    { ok: containsKeyword(entry.seoDescription, kw), weight: 6, label: `Keyword in SEO-Beschreibung`, hint: `Meta-Description enthält das Keyword` },
    { ok: containsKeyword(entry.excerpt, kw), weight: 4, label: `Keyword im Auszug`, hint: `Auszug erwähnt das Keyword` },
    { ok: containsKeyword(firstPara, kw), weight: 5, label: `Keyword im ersten Absatz`, hint: `Keyword in den ersten ~100 Wörtern` },
    { ok: densityOk, weight: 5, label: `Keyword-Dichte ${density.toFixed(2)}%`, hint: densityOk ? undefined : `Optimal 0.5–3.0% (aktuell ${density.toFixed(2)}%)` },
  ];
}

export async function GET(_: Request, { params }: { params: Promise<{ type: string; slug: string }> }) {
  const { type, slug } = await params;

  if (!(type in COLLECTION_MAP)) {
    return NextResponse.json({ error: `Unbekannter Typ: ${type}. Erlaubt: ${Object.keys(COLLECTION_MAP).join(', ')}` }, { status: 400 });
  }

  const collectionKey = COLLECTION_MAP[type as CollectionKey];
  const entry = await (reader.collections[collectionKey] as any).read(slug, { resolveLinkedFiles: true });

  if (!entry) {
    return NextResponse.json({ error: `${type}/${slug} nicht gefunden` }, { status: 404 });
  }

  const contentNode = typeof entry.content === 'function' ? await entry.content() : entry.content;
  const contentText = JSON.stringify(contentNode ?? '').replace(/<[^>]+>/g, ' ');
  const words = wordCount(contentText);
  const firstPara = contentText.slice(0, 600);

  const checks: Check[] = [
    ...keywordChecks(entry, slug, contentText, firstPara),
    lengthCheck(entry.title, 30, 70, 'Titel', 10),
    lengthCheck(entry.seoTitle ?? entry.title, 50, 60, 'SEO-Titel', 10),
    lengthCheck(entry.seoDescription, 140, 160, 'SEO-Beschreibung', 10),
    lengthCheck(entry.excerpt, 80, 200, 'Auszug', 5),
    presenceCheck(entry.featuredImage, 'Beitragsbild', 10, 'Featured Image fehlt'),
    presenceCheck(entry.featuredImageAlt, 'Alt-Text Beitragsbild', 10, 'Alt-Text fehlt — wichtig für SEO + Barrierefreiheit'),
    countCheck(entry.faqItems ?? [], 3, 'FAQ-Einträge', 10),
    countCheck(entry.takeaways ?? [], 3, 'Takeaways', 5),
    countCheck(entry.tags ?? [], 2, 'Tags', 5),
    {
      ok: words >= 600,
      weight: 15,
      label: `Content-Länge (${words} Wörter)`,
      hint: words >= 600 ? undefined : `Mindestens 600 Wörter empfohlen, aktuell ${words}`,
    },
    {
      ok: entry.status === 'published',
      weight: 5,
      label: `Status: ${entry.status}`,
      hint: entry.status !== 'published' ? 'Noch nicht published' : undefined,
    },
    presenceCheck(entry.calloutQuestion, 'Callout-Frage', 5, 'Callout fehlt — gut für Featured Snippets'),
  ];

  const totalWeight = checks.reduce((s, c) => s + c.weight, 0);
  const earned = checks.filter((c) => c.ok).reduce((s, c) => s + c.weight, 0);
  const score = Math.round((earned / totalWeight) * 100);

  return NextResponse.json({
    type,
    slug,
    title: entry.title,
    score,
    earned,
    totalWeight,
    words,
    checks,
  });
}
