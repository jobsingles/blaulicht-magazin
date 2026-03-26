import { DocumentRenderer } from '@keystatic/core/renderer';

type Props = {
  document: any;
};

export function ArticleBody({ document }: Props) {
  // Handle both resolved (Element[]) and unresolved ({ node: Node }) formats
  const doc = Array.isArray(document) ? document : [];

  if (doc.length === 0) return null;

  return (
    <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/85 prose-a:text-brand-orange prose-strong:text-foreground prose-code:text-brand-orange dark:prose-invert">
      <DocumentRenderer document={doc} />
    </div>
  );
}
