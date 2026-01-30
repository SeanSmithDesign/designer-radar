import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { Providers } from './providers';
import './globals.css';

const IS_PORTFOLIO_MODE = process.env.NEXT_PUBLIC_PORTFOLIO_MODE === 'true';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Sean's Designer Strength Radar",
  description:
    'Interactive radar chart for product designers and UX designers at startups leveraging AI tools and coding.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {IS_PORTFOLIO_MODE && (
        <head>
          <link rel="stylesheet" href="/styles/navbar.css" />
        </head>
      )}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {IS_PORTFOLIO_MODE && <div id="shared-navbar"></div>}
        <Providers>{children}</Providers>
        {IS_PORTFOLIO_MODE && (
          <Script src="/components/shared-navbar.js" strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
