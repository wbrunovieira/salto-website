import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = formData.get('password') as string | null;
  const rawReturn = (formData.get('returnTo') as string | null)?.trim() ?? '';
  const dest = rawReturn.startsWith('/deck/') ? rawReturn : '/deck/construcao';

  const expected = (process.env.DECK_PASSWORD ?? '').trim();

  if (!expected || (password ?? '').trim() !== expected) {
    return NextResponse.redirect(new URL(dest + '?error=1', request.url), { status: 303 });
  }

  const response = NextResponse.redirect(new URL(dest, request.url), { status: 303 });
  response.cookies.set('deck_auth', 'ok', {
    path: '/deck',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 86400,
  });

  return response;
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/deck', request.url), { status: 303 });
  response.cookies.set('deck_auth', '', {
    path: '/deck',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 0,
  });
  return response;
}
