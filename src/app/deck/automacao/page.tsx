import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import PasswordGate from '../PasswordGate';
import DeckWrapper from './DeckWrapper';

export const metadata: Metadata = {
  title: 'Salto — Automação',
};

export default async function DeckAutomacaoPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('deck_auth');
  const isAuthenticated = authCookie?.value === 'ok';

  if (!isAuthenticated) {
    return <PasswordGate returnTo="/deck/automacao" />;
  }

  return <DeckWrapper />;
}
