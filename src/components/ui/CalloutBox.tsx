import type { ReactNode } from 'react';

interface CalloutBoxProps {
  question: string;
  children: ReactNode;
}

export function CalloutBox({ question, children }: CalloutBoxProps) {
  return (
    <div className="border-l-4 border-brand-orange bg-surface rounded-r-xl p-6 my-8">
      <p className="font-bold text-foreground mb-2">{question}</p>
      <div className="text-foreground/70 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
