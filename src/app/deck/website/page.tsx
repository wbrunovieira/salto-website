import { cookies } from 'next/headers';
import PasswordGate from '../PasswordGate';
import DeckWrapper from './DeckWrapper';

export default async function DeckWebsitePage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('deck_auth')?.value === 'ok';

  if (!isAuthenticated) {
    return <PasswordGate returnTo="/deck/website" />;
  }

  return <DeckWrapper />;
}
