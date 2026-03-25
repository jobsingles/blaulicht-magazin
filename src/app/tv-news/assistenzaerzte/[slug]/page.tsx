import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const all = await reader.collections.series.all();
  return all
    .filter((s) => s.entry.seriesId === 'assistenzaerzte')
    .map((s) => ({ slug: s.slug }));
}

export default async function AssistenzaerzteArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await reader.collections.series.read(slug);
  if (!article) notFound();

  return (
    <div data-theme="dark" className="bg-background text-foreground min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-wider text-brand-orange font-semibold">Die Assistenzärzte</span>
          <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-6">{article.title}</h1>
          <p className="text-lg text-foreground/80">{article.excerpt}</p>
          <div className="prose prose-invert max-w-none mt-8">
            {/* TODO: Markdoc renderer */}
          </div>
        </div>
      </section>
    </div>
  );
}
