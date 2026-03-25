import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Blaulicht Magazin — Dating für Blaulicht-Singles',
    template: '%s | Blaulicht Magazin',
  },
  description:
    'Das Magazin für Singles bei Polizei, Feuerwehr und Sanität. Partnersuche, Erfolgsgeschichten und regionale Tipps.',
  metadataBase: new URL('https://blaulichtsingles.ch/magazin'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
