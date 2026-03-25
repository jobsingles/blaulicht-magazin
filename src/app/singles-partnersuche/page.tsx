import { reader } from '@/lib/keystatic';

export const metadata = {
  title: 'Singles & Partnersuche',
  description: 'Partnersuche für Polizei, Sanität und Rettungskräfte — Tipps, Erfahrungen und Cluster-Artikel.',
};

export default async function SinglesPartnersuche() {
  const articles = await reader.collections.articles.all();
  const clusterArticles = articles.filter((a) => a.entry.type === 'cluster');

  return (
    <div data-theme="light">
      <section className="bg-primary text-on-primary py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Singles & Partnersuche</h1>
          <p className="text-lg opacity-90">
            Partnersuche für Blaulicht-Berufe — von Polizei bis Sanität.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clusterArticles.map((article) => (
            <a key={article.slug} href={`/singles-partnersuche/${article.slug}`} className="block rounded-lg bg-surface shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <span className="text-xs uppercase tracking-wider text-brand-orange font-semibold">{article.entry.category}</span>
                <h3 className="text-xl font-semibold mt-2 mb-2">{article.entry.title}</h3>
                <p className="text-foreground/70 text-sm">{article.entry.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
