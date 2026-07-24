import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { sendNotification } from '@/lib/email';

const schema = z
  .object({
    companyName: z.string().min(2),
    email: z.string().email(),
    whatsapp: z.string().min(10),
  })
  .passthrough();

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  const { email, whatsapp, companyName } = parsed.data;

  const summary = Object.entries(parsed.data)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  try {
    await prisma.application.create({
      data: { payload: parsed.data as Record<string, string>, email, whatsapp },
    });
  } catch (e) {
    console.error('Application DB write failed:', e);
    // Email below still captures the lead
  }

  await sendNotification(`New application: ${companyName}`, summary).catch((e) =>
    console.error('Email failed:', e)
  );

  return NextResponse.json({ ok: true });
}
