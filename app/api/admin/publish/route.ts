import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/adminAuth';
import { applicationToStartup, slugify } from '@/lib/publish';

const schema = z.object({
  applicationId: z.string().min(1),
  publish: z.boolean(),
});

export async function POST(req: Request) {
  const store = await cookies();
  if (!verifySessionToken(store.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  const { applicationId, publish } = parsed.data;

  try {
    const app = await prisma.application.findUnique({ where: { id: applicationId } });
    if (!app) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
    const payload = app.payload as Record<string, unknown>;
    const slug = slugify(String(payload.companyName ?? '')) || 'startup';

    if (publish) {
      const data = applicationToStartup(payload);
      await prisma.startup.upsert({
        where: { slug },
        update: { ...data, published: true },
        create: data,
      });
      await prisma.application.update({
        where: { id: applicationId },
        data: { status: 'published' },
      });
    } else {
      await prisma.startup.updateMany({ where: { slug }, data: { published: false } });
      await prisma.application.update({
        where: { id: applicationId },
        data: { status: 'reviewed' },
      });
    }
    return NextResponse.json({ ok: true, slug });
  } catch (e) {
    console.error('Publish toggle failed:', e);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
