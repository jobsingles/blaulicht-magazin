import { reader } from '@/lib/keystatic';

export const metadata = {
  title: 'Erfolgsgeschichten',
  description: 'Echte Liebesgeschichten von Blaulicht-Singles — Paare die sich über uns gefunden haben.',
};

export default async function Erfolgsgeschichten() {
  const stories = await reader.collections.stories.all();

  return (
    <div data-theme="dark" className="bg-background text-foreground min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Erfolgsgeschichten</h1>
          <p className="text-lg text-foreground/80">
            Echte Paare. Echte Geschichten. Echte Liebe.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <a
              key={story.slug}
              href={`/erfolgsgeschichten/${story.slug}`}
              className="bg-surface-dark rounded-lg p-6 shadow-lg transition-transform hover:scale-[1.02]"
              style={{ transform: `rotate(${i % 2 === 0 ? '-1' : '1'}deg)` }}
            >
              <div className="tape w-16 h-4 mx-auto -mt-8 mb-4 rounded-sm" />
              <h3 className="text-lg font-semibold">{story.entry.title}</h3>
              <p className="text-sm text-brand-orange mt-1">{story.entry.couple}</p>
              <p className="text-sm text-foreground/50">{story.entry.location}</p>
              <p className="text-foreground/70 mt-3 text-sm">{story.entry.excerpt}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
