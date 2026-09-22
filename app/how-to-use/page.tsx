import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { absolute: 'Brat Generator Guide Moved' },
  description: 'The The Brat text guide now lives directly on the homepage beside the main Brat Generator.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/' },
};

export default function Page() {
  return (
    <main id="main-content" className="moved-page">
      <div className="moved-card">
        <p className="eyebrow">Guide moved</p>
        <h1>How to Use Brat Generator</h1>
        <p>The simple step-by-step guide now sits on the homepage beside the main Brat Generator so the tool and instructions stay together.</p>
        <Link className="pill-btn primary" href="/#how-to">Open the Brat Generator Guide →</Link>
      </div>
    </main>
  );
}
