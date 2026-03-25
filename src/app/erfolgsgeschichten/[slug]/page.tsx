import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const stories = await reader.collections.stories.all();
  return stories.map((s) => ({ slug: s.slug }));
}

export default async function StoryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await reader.collections.stories.read(slug);
  if (!story) notFound();

  return (
    <div data-theme="dark" className="bg-background text-foreground min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{story.title}</h1>
          <p className="text-brand-orange text-lg">{story.couple}</p>
          <p className="text-foreground/60">{story.location}</p>

          <div className="prose prose-invert max-w-none mt-8">
            {/* TODO: Markdoc renderer */}
          </div>
        </div>
      </section>
    </div>
  );
}
