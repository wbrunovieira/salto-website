'use client';
import dynamic from 'next/dynamic';
const DeckClient = dynamic(() => import('./DeckClient'), { ssr: false });
export default function DeckWrapper() { return <DeckClient />; }
