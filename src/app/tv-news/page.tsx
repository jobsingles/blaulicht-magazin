import { reader } from '@/lib/keystatic';

export const metadata = {
  title: 'TV News',
  description: 'Serien-Artikel zu SRF-Sendungen — Die Assistenzärzte, Tatort Zürich und mehr.',
};

export default async function TVNews() {
  const seriesArticles = await reader.collections.series.all();

  const assistenzaerzte = seriesArticles.filter((s) => s.entry.seriesId === 'assistenzaerzte');
  const tatort = seriesArticles.filter((s) => s.entry.seriesId === 'tatort-zuerich');

  return (
    <div data-theme="dark" className="bg-background text-foreground min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">TV News</h1>
          <p className="text-lg text-foreground/80">
            Dating-Perspektiven aus beliebten Schweizer TV-Serien.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Die Assistenzärzte (SRF)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {assistenzaerzte.map((article) => (
            <a key={article.slug} href={`/tv-news/assistenzaerzte/${article.slug}`} className="bg-surface-dark rounded-lg p-6 hover:ring-2 hover:ring-brand-orange transition-all">
              <h3 className="text-lg font-semibold">{article.entry.title}</h3>
              <p className="text-sm text-foreground/60 mt-2">{article.entry.excerpt}</p>
            </a>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Tatort Zürich (SRF)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tatort.map((article) => (
            <a key={article.slug} href={`/tv-news/tatort-zuerich/${article.slug}`} className="bg-surface-dark rounded-lg p-6 hover:ring-2 hover:ring-brand-orange transition-all">
              <h3 className="text-lg font-semibold">{article.entry.title}</h3>
              <p className="text-sm text-foreground/60 mt-2">{article.entry.excerpt}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
