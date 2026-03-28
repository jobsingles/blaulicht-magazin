'use client';

import { useCallback, useRef, useState } from 'react';

interface SpotlightHeroProps {
  children: React.ReactNode;
  className?: string;
}

export function SpotlightHero({ children, className = '' }: SpotlightHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [heart, setHeart] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHeart({ x, y, visible: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHeart((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Heart spotlight */}
      {heart.visible && (
        <div
          className="pointer-events-none absolute z-0 text-[140px] leading-none select-none"
          style={{
            left: heart.x,
            top: heart.y,
            transform: 'translate(-50%, -50%)',
            color: 'rgba(255, 50, 50, 0.08)',
            textShadow: '0 0 80px rgba(255, 50, 50, 0.12)',
          }}
        >
          ❤
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
