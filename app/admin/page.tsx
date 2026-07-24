import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import ApplicationsPanel from '@/components/admin/ApplicationsPanel';
import IntroRequestsPanel from '@/components/admin/IntroRequestsPanel';
import LogoutButton from '@/components/admin/LogoutButton';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/adminAuth';
import { slugify } from '@/lib/publish';

export const metadata: Metadata = {
  title: 'Admin dashboard',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  await requireAdmin();

  let applications: {
    id: string;
    payload: Record<string, unknown>;
    email: string;
    whatsapp: string;
    status: string;
    createdAt: string;
    live: boolean;
  }[] = [];
  let intros: {
    id: string;
    startupName: string;
    name: string;
    email: string;
    phone: string;
    message: string | null;
    createdAt: string;
  }[] = [];
  let dbError = false;
  let dbErrorDetail = '';
  let dbHint = '';

  try {
    const [apps, introRows, startups] = await Promise.all([
      prisma.application.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.introRequest.findMany({
        orderBy: { createdAt: 'desc' },
        include: { startup: { select: { name: true } } },
      }),
      prisma.startup.findMany({ select: { slug: true, published: true } }),
    ]);
    const liveSlugs = new Set(startups.filter((s) => s.published).map((s) => s.slug));
    applications = apps.map((a) => {
      const payload = a.payload as Record<string, unknown>;
      return {
        id: a.id,
        payload,
        email: a.email,
        whatsapp: a.whatsapp,
        status: a.status,
        createdAt: a.createdAt.toISOString(),
        live: liveSlugs.has(slugify(String(payload.companyName ?? ''))),
      };
    });
    intros = introRows.map((r) => ({
      id: r.id,
      startupName: r.startup.name,
      name: r.name,
      email: r.email,
      phone: r.phone,
      message: r.message,
      createdAt: r.createdAt.toISOString(),
    }));
  } catch (e) {
    console.error('Admin dashboard DB read failed:', e);
    dbError = true;
    const err = e as { code?: string; message?: string };
    // First line of the Prisma message carries the useful part
    dbErrorDetail = [err.code, err.message?.split('\n').filter(Boolean).slice(-1)[0]]
      .filter(Boolean)
      .join(' — ');
    if (!process.env.DATABASE_URL) {
      dbHint =
        'DATABASE_URL is not set. Add it in the Hostinger Node.js panel and restart the app.';
    } else if (err.code === 'P1001' || err.code === 'P1000') {
      dbHint =
        'The database refused the connection. Check the host, username and password in DATABASE_URL. If your password has special characters (@ : / # etc.), they must be URL-encoded.';
    } else if (err.code === 'P2021' || dbErrorDetail.includes('does not exist')) {
      dbHint =
        'Connected, but the tables are missing. Run: npx prisma migrate deploy (then npx prisma db seed if you want the sample startups).';
    }
  }

  return (
    <Container className="py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-h2 text-ink">Dashboard</h1>
          <p className="mt-1 text-small text-slate">
            {applications.length} applications · {intros.length} intro requests
          </p>
        </div>
        <LogoutButton />
      </div>

      {dbError && (
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-body text-red-700">
          <p className="font-heading font-bold">Could not reach the database.</p>
          {dbErrorDetail && (
            <p className="mt-2 break-words font-mono text-small">{dbErrorDetail}</p>
          )}
          <p className="mt-3 text-small">
            {dbHint ||
              'Check DATABASE_URL in the Hostinger panel and make sure the migrations have been run (npx prisma migrate deploy).'}
          </p>
        </div>
      )}

      <section className="mt-10">
        <h2 className="text-h3 text-ink">Startup applications</h2>
        <p className="mt-1 text-small text-slate">
          Tick “Visible on website” to publish an application as a live profile in the directory.
          Untick to take it down.
        </p>
        <div className="mt-6">
          <ApplicationsPanel applications={applications} />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-h3 text-ink">Intro requests</h2>
        <p className="mt-1 text-small text-slate">
          People who asked to be introduced to a listed startup.
        </p>
        <div className="mt-6">
          <IntroRequestsPanel intros={intros} />
        </div>
      </section>
    </Container>
  );
}
