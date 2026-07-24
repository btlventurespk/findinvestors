import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/adminAuth';

// One-click alternative to `prisma migrate deploy` for hosts without SSH:
// runs the checked-in init migration statement by statement, skipping
// tables that already exist.
export async function POST() {
  const store = await cookies();
  if (!verifySessionToken(store.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL is not set.' }, { status: 400 });
  }

  let sql: string;
  try {
    sql = await fs.readFile(
      path.join(process.cwd(), 'prisma', 'migrations', '0_init', 'migration.sql'),
      'utf8'
    );
  } catch {
    return NextResponse.json(
      { error: 'Migration file not found on the server. Make sure the prisma/ folder was uploaded.' },
      { status: 500 }
    );
  }

  const statements = sql
    .split(/;\s*[\r\n]/)
    .map((s) => s.trim())
    .filter((s) => s && !s.startsWith('--'));

  let applied = 0;
  let skipped = 0;
  for (const stmt of statements) {
    try {
      await prisma.$executeRawUnsafe(stmt);
      applied++;
    } catch (e) {
      const msg = String((e as Error).message ?? '');
      if (/already exists|Duplicate/i.test(msg)) {
        skipped++;
        continue;
      }
      console.error('Setup DB failed on statement:', stmt.slice(0, 80), e);
      return NextResponse.json(
        { error: `Database error: ${msg.split('\n').filter(Boolean).slice(-1)[0]}` },
        { status: 500 }
      );
    }
  }
  return NextResponse.json({ ok: true, applied, skipped });
}
