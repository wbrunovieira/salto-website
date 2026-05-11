'use client';

import dynamic from 'next/dynamic';

const OSClient = dynamic(() => import('./OSClient'), { ssr: false });

export default function OSWrapper() {
  return <OSClient />;
}
