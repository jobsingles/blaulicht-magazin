import { NextResponse } from 'next/server';
import { reader } from '@/lib/keystatic';

export const dynamic = 'force-dynamic';

export async function GET() {
  const allArticles = await reader.collections.articles.all();

  const featured = allArticles
    .filter((a) => a.entry.isFeatured && a.entry.status === 'published')
    .slice(0, 3)
    .map((a) => {
      const slug = a.slug;
      const entry = a.entry;

      // URL-Pfad basierend auf Kategorie
      const categoryPath =
        entry.category === 'tv-news' ? 'tv-news' : 'singles-partnersuche';
      const url = `https://blaulichtsingles.ch/magazin/${categoryPath}/${slug}/`;

      // Bild-URL
      const image = entry.featuredImage
        ? `https://blaulichtsingles.ch/magazin${entry.featuredImage}`
        : '';

      return {
        title: entry.title,
        excerpt: entry.excerpt || '',
        url,
        image,
        category: entry.category,
      };
    });

  // CORS-Header für ICONY-Domain
  return NextResponse.json(featured, {
    headers: {
      'Access-Control-Allow-Origin': 'https://blaulichtsingles.ch',
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
