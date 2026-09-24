'use client';

import { useEffect } from 'react';

export default function FeaturesRedirectPage() {
  useEffect(() => {
    window.location.replace('/#features');
  }, []);

  return null;
}
