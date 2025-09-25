import Navbar from '@/components/Navbar';
import { RootProvider } from '@/providers/root-provider';
import type { Metadata } from 'next';
import { JetBrains_Mono, Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetBrainsMono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'WoDBleach',
  description: 'Uma fusão direta de World of Dragon Ball com Bleach, evocando mundos colidindo!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${poppins.className} ${jetBrainsMono.variable} antialiased`}>
        <RootProvider>
          <Navbar />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
