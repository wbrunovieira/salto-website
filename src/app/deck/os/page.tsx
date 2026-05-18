import { cookies } from 'next/headers';
import PasswordGate from '../PasswordGate';
import OSWrapper from './OSWrapper';

export default async function DeckOSPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('deck_auth')?.value === 'ok';

  if (!isAuthenticated) {
    return <PasswordGate returnTo="/deck/os" />;
  }

  return <OSWrapper />;
}
