import Image from 'next/image';
import dynamic from 'next/dynamic';
import { SpotlightHero } from '@/components/ui/SpotlightHero';

const ParticleText = dynamic(() => import('@/components/ui/ParticleText').then((m) => m.ParticleText), {
  ssr: false,
  loading: () => (
    <div className="w-full h-40 md:h-56 mb-0 flex items-center justify-center">
      <div className="text-4xl md:text-6xl font-bold text-foreground/70" aria-hidden="true">·</div>
    </div>
  ),
});

interface PillarHeroProps {
  title: string;
  texts?: string[];
  subtitle?: string;
  image?: string;
  colors?: Array<{ r: number; g: number; b: number }>;
}

export function PillarHero({ title, texts, subtitle, image, colors }: PillarHeroProps) {
  return (
    <SpotlightHero>
      <section className="relative overflow-hidden pt-1 pb-2 md:pt-2 md:pb-4">
        {/* Background */}
        <div className="absolute inset-0 particle-overlay opacity-50" />
        {image && (
          <Image
            src={image}
            alt=""
            width={1920}
            height={1080}
            priority
            className="absolute inset-0 w-full h-full object-cover opacity-15"
            sizes="100vw"
          />
        )}

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="sr-only">{title}</h1>
          <ParticleText text={title} texts={texts} colors={colors} className="w-full h-40 md:h-56 mb-0" />
          {subtitle && (
            <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </section>
    </SpotlightHero>
  );
}
