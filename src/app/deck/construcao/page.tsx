import { cookies } from 'next/headers';
import PasswordGate from '../PasswordGate';
import DeckWrapper from './DeckWrapper';

export default async function DeckConstrucaoPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('deck_auth');
  const isAuthenticated = authCookie?.value === 'ok';

  if (!isAuthenticated) {
    return <PasswordGate returnTo="/deck/construcao" />;
  }

  return <DeckWrapper />;
}
