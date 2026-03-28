import { reader } from '@/lib/keystatic';
import { SeriesCard } from '@/components/content/SeriesCard';

export const metadata = {
  title: 'TV News — Tatort Zürich & Der Bergdoktor',
  description: 'Blaulicht-Singles TV News: Hintergrund-Storys zu Tatort Zürich und Der Bergdoktor — was die Darsteller privat machen, Drehorte und neue Folgen.',
  openGraph: {
    title: 'TV News — Tatort Zürich & Der Bergdoktor | Blaulicht-Singles Magazin',
    description: 'Hintergrund-Storys zu Tatort Zürich und Der Bergdoktor — was die Darsteller privat machen, Drehorte und neue Folgen.',
    images: [{ url: '/images/hero-tv-news.webp', width: 2940, height: 1626, alt: 'Tatort-Kommissar und Bergdoktor Rücken an Rücken — Zürich bei Regen und Schweizer Alpen im Sonnenlicht' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/hero-tv-news.webp'],
  },
};

export default async function TVNews() {
  const seriesArticles = await reader.collections.series.all();
  const published = seriesArticles.filter((s) => s.entry.status !== 'draft');

  const bergdoktor = published.filter((s) => s.entry.seriesId === 'bergdoktor');
  const tatort = published.filter((s) => s.entry.seriesId === 'tatort-zuerich');

  return (
    <>
      <section className="relative overflow-hidden min-h-[320px] md:min-h-[440px]">
        <div className="absolute inset-0">
          <img
            src="/images/hero-tv-news.webp"
            alt="Tatort-Kommissar und Bergdoktor Rücken an Rücken — Zürich bei Regen und Schweizer Alpen im Sonnenlicht"
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 20%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col justify-end min-h-[320px] md:min-h-[440px] pb-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-white drop-shadow-lg">TV News</h1>
          <p className="text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed">
            Tatort Zürich & Der Bergdoktor — Hintergrund-Storys, Drehorte und was die Darsteller privat machen.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-6">«Tatort» Zürich</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tatort.map((article, i) => (
            <SeriesCard
              key={article.slug}
              title={article.entry.title}
              excerpt={article.entry.excerpt}
              href={`/tv-news/tatort-zuerich/${article.slug}`}
              image={article.entry.featuredImage || undefined}
              seriesLabel="Tatort Zürich"
            />
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Der Bergdoktor</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bergdoktor.map((article, i) => (
            <SeriesCard
              key={article.slug}
              title={article.entry.title}
              excerpt={article.entry.excerpt}
              href={`/tv-news/bergdoktor/${article.slug}`}
              image={article.entry.featuredImage || undefined}
              seriesLabel="Der Bergdoktor"
            />
          ))}
        </div>
      </section>
    </>
  );
}
