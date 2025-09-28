import { RootProvider } from '@/providers/root-provider';
import type { Metadata } from 'next';
import { JetBrains_Mono, Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetBrainsMono',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'WoDBleach',
  description: 'Uma fusão direta de Dragon Ball com Bleach, evocando mundos colididos!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${montserrat.className} ${jetBrainsMono.variable} antialiased`}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
