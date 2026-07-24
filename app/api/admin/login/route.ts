import { NextResponse } from 'next/server';
import { z } from 'zod';
import { ADMIN_COOKIE, checkCredentials, createSessionToken } from '@/lib/adminAuth';

const schema = z.object({ username: z.string().min(1), password: z.string().min(1) });

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  if (!process.env.ADMIN_USER || !process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: 'Admin login is not configured. Set ADMIN_USER and ADMIN_PASSWORD.' },
      { status: 503 }
    );
  }
  if (!checkCredentials(parsed.data.username, parsed.data.password)) {
    return NextResponse.json({ error: 'Wrong username or password.' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 7 * 24 * 3600,
  });
  return res;
}
