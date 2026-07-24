import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { sendNotification } from '@/lib/email';

const schema = z.object({
  startupSlug: z.string().min(1),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  message: z.string().max(2000).optional().nullable(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  const { startupSlug, name, email, phone, message } = parsed.data;

  try {
    const startup = await prisma.startup.findUnique({ where: { slug: startupSlug } });
    if (!startup) {
      return NextResponse.json({ error: 'Startup not found' }, { status: 404 });
    }
    await prisma.introRequest.create({
      data: { startupId: startup.id, name, email, phone, message: message ?? null },
    });
    await sendNotification(
      `Intro request: ${startup.name}`,
      `New intro request for ${startup.name} (${startupSlug})\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message ?? '—'}`
    ).catch((e) => console.error('Email failed:', e));
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Intro request failed:', e);
    // DB not wired up yet — still notify by email so no lead is lost
    await sendNotification(
      `Intro request (DB unavailable): ${startupSlug}`,
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message ?? '—'}`
    ).catch(() => null);
    return NextResponse.json({ ok: true });
  }
}
