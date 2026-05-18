import { cookies } from 'next/headers';
import PasswordGate from './PasswordGate';
import DeckHomeClient from './DeckHomeClient';

export default async function DeckHomePage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('deck_auth')?.value === 'ok';

  if (!isAuthenticated) {
    return <PasswordGate returnTo="/deck" />;
  }

  return <DeckHomeClient />;
}
