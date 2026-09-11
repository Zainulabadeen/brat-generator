import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteConfig } from '@/lib/site';
import SiteAnalytics from '@/components/SiteAnalytics';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Brat Generator Free Brat Text & Album Cover Maker',
    template: '%s | Brat Generator',
  },
  description: siteConfig.description,
  applicationName: 'Brat Generator',
  manifest: '/manifest.webmanifest',
  creator: 'Brat Generator',
  publisher: 'Brat Generator',
  category: 'design',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Brat Generator',
    locale: 'en_GB',
    url: siteConfig.url,
    title: 'Brat Generator Free Brat Text & Album Cover Maker',
    description: siteConfig.description,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brat Generator preview on brat green background' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brat Generator Free Brat Text & Album Cover Maker',
    description: siteConfig.description,
    images: ['/og-image.png'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#8ACE00',
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
