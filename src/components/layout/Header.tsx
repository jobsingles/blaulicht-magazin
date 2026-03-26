import Image from 'next/image';
import { MenuHoverNav } from '@/components/ui/MenuHoverNav';

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 glass-nav">
      <div className="flex justify-between items-center px-6 h-20 max-w-7xl mx-auto">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <Image
            src="/logos/jobsingles-logo.webp"
            alt="Jobsingles Network"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="font-bold text-xl text-foreground tracking-tight">
            Blaulicht<span className="text-brand-orange"> Magazin</span>
          </span>
        </a>

        {/* Navigation */}
        <MenuHoverNav />
      </div>
    </header>
  );
}
