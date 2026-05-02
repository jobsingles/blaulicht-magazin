import { reader } from '@/lib/keystatic';
import { SeriesCard } from './SeriesCard';

const SERIES_LABEL: Record<string, string> = {
  bergdoktor: 'Der Bergdoktor',
  'tatort-zuerich': 'Tatort Zürich',
};

interface Props {
  currentSlug: string;
  currentSeriesId: string;
}

export async function RelatedSeriesArticles({ currentSlug, currentSeriesId }: Props) {
  const all = await reader.collections.series.all();
  const related = all
    .filter(
      (s) =>
        s.entry.status !== 'draft' &&
        s.slug !== currentSlug &&
        s.entry.seriesId === currentSeriesId
    )
    .sort((a, b) =>
      String(b.entry.publishedAt ?? '').localeCompare(String(a.entry.publishedAt ?? ''))
    )
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-foreground/10">
      <h2 className="text-2xl font-bold mb-6">
        Mehr aus {SERIES_LABEL[currentSeriesId] || 'dieser Serie'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((s) => (
          <SeriesCard
            key={s.slug}
            title={s.entry.title}
            excerpt={s.entry.excerpt}
            href={`/tv-news/${s.entry.seriesId}/${s.slug}`}
            image={s.entry.featuredImage || undefined}
            imageAlt={s.entry.featuredImageAlt || undefined}
            seriesLabel={SERIES_LABEL[s.entry.seriesId] || s.entry.seriesId}
          />
        ))}
      </div>
    </section>
  );
}
