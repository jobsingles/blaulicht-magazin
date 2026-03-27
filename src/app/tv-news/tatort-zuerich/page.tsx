import { reader } from '@/lib/keystatic';

export const metadata = {
  title: 'Tatort Zürich (SRF)',
  description: 'Dating-Artikel rund um die SRF-Serie Tatort Zürich.',
};

export default async function TatortZuerich() {
  const [allSeries, allArticles] = await Promise.all([
    reader.collections.series.all(),
    reader.collections.articles.all(),
  ]);
  const fromSeries = allSeries.filter((s) => s.entry.seriesId === 'tatort-zuerich');
  const fromArticles = allArticles.filter(
    (a) => a.entry.type === 'serie' && a.entry.series === 'tatort-zuerich' && a.entry.status !== 'draft'
  );
  const articles = [...fromSeries, ...fromArticles];

  return (
    <div data-theme="dark" className="bg-background text-foreground min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Tatort Zürich</h1>
          <p className="text-foreground/80">SRF-Serie — Liebe und Verbrechen in Zürich.</p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <a key={article.slug} href={`/tv-news/tatort-zuerich/${article.slug}`} className="bg-surface-dark rounded-lg p-6 hover:ring-2 hover:ring-brand-orange transition-all">
              <h3 className="text-xl font-semibold">{article.entry.title}</h3>
              <p className="text-foreground/60 mt-2">{article.entry.excerpt}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
