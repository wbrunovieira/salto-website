import { cookies } from 'next/headers';
import PasswordGate from '../PasswordGate';
import DeckWrapper from './DeckWrapper';

export default async function DeckSaltoPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('deck_auth')?.value === 'ok';

  if (!isAuthenticated) {
    return <PasswordGate returnTo="/deck/salto" />;
  }

  return <DeckWrapper />;
}
