'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function BratTextLegacyRedirect() {
  useEffect(() => {
    window.location.replace('/#generator');
  }, []);

  return (
    <main className="section" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <div className="glass" style={{ padding: 28, textAlign: 'center', maxWidth: 520 }}>
        <h1 style={{ marginTop: 0 }}>Brat Generator moved to the homepage</h1>
        <p>The main Brat text generator now lives directly on the homepage.</p>
        <Link className="btn btn-green" href="/#generator">Open Brat Generator</Link>
      </div>
    </main>
  );
}
