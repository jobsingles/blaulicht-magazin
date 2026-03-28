import Markdoc, { type RenderableTreeNode } from '@markdoc/markdoc';
import React, { type ReactNode } from 'react';

function toId(text: string) {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function collectText(children: any[]): string {
  return children
    .map((c) => (typeof c === 'string' ? c : ''))
    .join('');
}

const markdocConfig = {
  nodes: {
    heading: {
      render: 'heading',
      attributes: {
        level: { type: Number, required: true },
      },
      transform(node: any, config: any) {
        const children = node.transformChildren(config);
        const level = node.attributes.level;
        const attrs = level === 2 ? { id: toId(collectText(children)) } : {};
        return new Markdoc.Tag(`h${level}`, attrs, children);
      },
    },
  },
};

const proseClasses = "prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/85 prose-a:text-brand-orange prose-strong:text-foreground prose-code:text-brand-orange dark:prose-invert";

type Props = {
  content: { node: any } | any[];
  /** Insert this element after the Nth H2 heading */
  insertAfterH2?: number;
  /** The element to insert */
  insertElement?: ReactNode;
};

export function ArticleBody({ content, insertAfterH2, insertElement }: Props) {
  const node = 'node' in content ? content.node : content;
  const renderable = Markdoc.transform(node, markdocConfig);

  if (!insertAfterH2 || !insertElement) {
    return (
      <div className={proseClasses}>
        {Markdoc.renderers.react(renderable, React)}
      </div>
    );
  }

  // Split rendered content at the Nth H2
  const rendered = Markdoc.renderers.react(renderable, React) as React.ReactElement;
  const children = React.Children.toArray(rendered.props.children);
  let h2Count = 0;
  let splitIndex = -1;

  for (let i = 0; i < children.length; i++) {
    const child = children[i] as any;
    if (child?.type === 'h2' || child?.props?.id) {
      h2Count++;
      if (h2Count === insertAfterH2) {
        // Find the next H2 or end — insert after this section
        for (let j = i + 1; j < children.length; j++) {
          const next = children[j] as any;
          if (next?.type === 'h2' || next?.props?.id) {
            splitIndex = j;
            break;
          }
        }
        if (splitIndex === -1) splitIndex = Math.min(i + 4, children.length);
        break;
      }
    }
  }

  if (splitIndex === -1) {
    return (
      <div className={proseClasses}>
        {children}
      </div>
    );
  }

  return (
    <>
      <div className={proseClasses}>
        {children.slice(0, splitIndex)}
      </div>
      {insertElement}
      <div className={proseClasses}>
        {children.slice(splitIndex)}
      </div>
    </>
  );
}
