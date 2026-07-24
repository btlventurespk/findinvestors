import crypto from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const ADMIN_COOKIE = 'fi_admin';
const SESSION_HOURS = 24 * 7;

function secret(): string {
  // Prefer a dedicated secret; otherwise derive one from the admin credentials
  const base =
    process.env.ADMIN_SECRET ??
    `${process.env.ADMIN_USER ?? ''}:${process.env.ADMIN_PASSWORD ?? ''}:fi-salt`;
  return crypto.createHash('sha256').update(base).digest('hex');
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
}

export function createSessionToken(): string {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + SESSION_HOURS * 3600 * 1000 })
  ).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return typeof exp === 'number' && exp > Date.now();
  } catch {
    return false;
  }
}

export function checkCredentials(username: string, password: string): boolean {
  const { ADMIN_USER, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_USER || !ADMIN_PASSWORD) return false;
  const eq = (x: string, y: string) => {
    const a = crypto.createHash('sha256').update(x).digest();
    const b = crypto.createHash('sha256').update(y).digest();
    return crypto.timingSafeEqual(a, b);
  };
  // Evaluate both to keep timing independent of which field is wrong
  const userOk = eq(username, ADMIN_USER);
  const passOk = eq(password, ADMIN_PASSWORD);
  return userOk && passOk;
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect('/admin/login');
}
