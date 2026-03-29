import { NextResponse } from 'next/server';
import { reader } from '@/lib/keystatic';

export const dynamic = 'force-dynamic';

export async function GET() {
  const allArticles = await reader.collections.articles.all();

  // Zuerst Featured-Artikel, dann nach Datum sortiert
  const published = allArticles
    .filter((a) => a.entry.status === 'published')
    .sort((a, b) => {
      // Featured zuerst
      if (a.entry.isFeatured && !b.entry.isFeatured) return -1;
      if (!a.entry.isFeatured && b.entry.isFeatured) return 1;
      // Dann nach Datum
      const dateA = a.entry.publishedAt || '2026-01-01';
      const dateB = b.entry.publishedAt || '2026-01-01';
      return dateB.localeCompare(dateA);
    })
    .slice(0, 3);

  // WP REST API kompatibles Format
  const posts = published.map((a, index) => {
    const slug = a.slug;
    const entry = a.entry;
    const categoryPath =
      entry.category === 'tv-news' ? 'tv-news' : 'singles-partnersuche';
    const url = `https://blaulichtsingles.ch/magazin/${categoryPath}/${slug}/`;
    const image = entry.featuredImage
      ? `https://blaulichtsingles.ch/magazin${entry.featuredImage}`
      : '';

    return {
      id: index + 1,
      date: entry.publishedAt || '2026-01-01T00:00:00',
      title: { rendered: entry.title },
      excerpt: {
        rendered: `<p>${entry.excerpt || ''}</p>`,
      },
      link: url,
      featured_media: index + 1,
      _embedded: {
        'wp:featuredmedia': [
          {
            source_url: image,
            alt_text: entry.title,
            media_details: {
              width: 768,
              height: 404,
              sizes: {
                medium: { source_url: image, width: 768, height: 404 },
                thumbnail: { source_url: image, width: 225, height: 300 },
              },
            },
          },
        ],
      },
    };
  });

  return NextResponse.json(posts, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      'X-WP-Total': String(posts.length),
      'X-WP-TotalPages': '1',
    },
  });
}
