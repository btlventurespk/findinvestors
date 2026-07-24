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
          Could not reach the database. Check DATABASE_URL in the Hostinger panel and make sure
          the migrations have been run (npx prisma migrate deploy).
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
