'use client';

import { useState, type ReactNode } from 'react';

interface HeartButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function HeartButton({ href, children, className = '' }: HeartButtonProps) {
  const [burst, setBurst] = useState(false);

  function handleClick() {
    setBurst(true);
    setTimeout(() => setBurst(false), 600);
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`relative inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-brand-orange text-brand-orange font-bold transition-colors hover:bg-brand-orange hover:text-white ${className}`}
    >
      <span className="relative">
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
        {burst && (
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-brand-orange"
                style={{
                  animation: 'heart-burst 600ms ease-out forwards',
                  animationDelay: `${i * 50}ms`,
                  transform: `rotate(${i * 60}deg) translateY(-8px)`,
                }}
              />
            ))}
          </span>
        )}
      </span>
      {children}
    </a>
  );
}
