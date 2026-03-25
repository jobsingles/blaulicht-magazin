import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const all = await reader.collections.regional.all();
  return all.map((r) => ({
    kanton: r.entry.kanton.toLowerCase().replace(/\s+/g, '-'),
    slug: r.slug,
  }));
}

export default async function RegionalDetail({ params }: { params: Promise<{ kanton: string; slug: string }> }) {
  const { slug } = await params;
  const article = await reader.collections.regional.read(slug);
  if (!article) notFound();

  return (
    <div data-theme="dark" className="bg-background text-foreground min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-wider text-brand-orange font-semibold">
            {article.kanton} {article.city && `— ${article.city}`}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-6">{article.title}</h1>
          <p className="text-lg text-foreground/80">{article.excerpt}</p>

          <div className="prose prose-invert max-w-none mt-8">
            {/* TODO: Markdoc renderer */}
          </div>

          {article.takeaways && article.takeaways.length > 0 && (
            <div className="bg-surface-dark rounded-lg p-6 mt-12">
              <h3 className="text-lg font-bold mb-4">Das Wichtigste</h3>
              <ul className="space-y-2">
                {article.takeaways.map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-brand-orange">&#x2713;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {article.faqItems && article.faqItems.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Häufige Fragen</h3>
              <div className="space-y-4">
                {article.faqItems.map((faq, i) => (
                  <details key={i} className="bg-surface-dark rounded-lg p-4">
                    <summary className="font-semibold cursor-pointer">{faq.question}</summary>
                    <p className="mt-2 text-foreground/80">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
