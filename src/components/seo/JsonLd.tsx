interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function articleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  isNews,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  authorUrl?: string;
  isNews?: boolean;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': isNews ? 'NewsArticle' : 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    description,
    url,
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image,
      },
    }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    author: {
      '@type': 'Person',
      name: authorName || 'Tommy Honold',
      url: authorUrl || 'https://blaulichtsingles.ch/magazin/autor/tommy-honold',
      sameAs: [
        'https://www.facebook.com/thomashonold1/',
        'https://blaulichtsingles.ch/magazin/autor/tommy-honold',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Blaulicht Magazin',
      url: 'https://blaulichtsingles.ch/magazin',
      logo: {
        '@type': 'ImageObject',
        url: 'https://blaulichtsingles.ch/magazin/logos/jobsingles-logo.png',
        width: 200,
        height: 200,
      },
    },
    inLanguage: 'de-CH',
  };
}

export function faqJsonLd(items: readonly { readonly question: string; readonly answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
