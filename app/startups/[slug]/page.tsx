import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import Pill from '@/components/ui/Pill';
import Card from '@/components/ui/Card';
import IntroRail from '@/components/sections/IntroRail';
import { getStartupBySlug, getPublishedStartups, raiseBand } from '@/lib/startups';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const startups = await getPublishedStartups();
  return startups.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = await getStartupBySlug(slug);
  if (!s) return { title: 'Startup not found' };
  return { title: s.name, description: s.oneLiner };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-h3 text-ink">{title}</h2>
      <div className="mt-4 space-y-4 text-body text-ink/80">{children}</div>
    </section>
  );
}

export default async function StartupProfile({ params }: Props) {
  const { slug } = await params;
  const s = await getStartupBySlug(slug);
  if (!s) notFound();

  const stats = [
    { label: 'Monthly revenue', value: s.revenueBand },
    { label: 'Customers', value: s.customers },
    { label: 'Months operating', value: String(s.monthsRunning) },
    ...(s.growthPct ? [{ label: 'Growth', value: s.growthPct }] : []),
  ];

  return (
    <Container className="py-14">
      {/* Hero */}
      <div className="flex flex-wrap items-start gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-ink/5 font-heading text-[32px] font-extrabold text-ink">
          {s.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-[32px] font-extrabold text-ink md:text-[44px] md:leading-[1.05]">
            {s.name}
          </h1>
          <p className="mt-2 max-w-2xl text-body text-ink/80">{s.oneLiner}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill tone="green">{s.sector}</Pill>
            <Pill>{s.city}</Pill>
            <Pill>Since {s.foundedYear}</Pill>
            <Pill>{s.entityType}</Pill>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <Section title="The business">
            <p>
              <strong className="font-heading text-ink">Problem.</strong> {s.problem}
            </p>
            <p>
              <strong className="font-heading text-ink">Solution.</strong> {s.solution}
            </p>
            <p>
              <strong className="font-heading text-ink">Model.</strong> {s.businessModel}
            </p>
            <p>
              <strong className="font-heading text-ink">Market.</strong> {s.targetMarket}
            </p>
            {s.competition && (
              <p>
                <strong className="font-heading text-ink">Competition.</strong> {s.competition}
              </p>
            )}
          </Section>

          <Section title="Traction">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((st) => (
                <Card key={st.label} className="!p-4">
                  <p className="text-label font-medium uppercase tracking-[0.08em] text-slate">
                    {st.label}
                  </p>
                  <p className="mt-2 font-heading text-[17px] font-bold text-ink">{st.value}</p>
                </Card>
              ))}
            </div>
            {s.milestones && <p>{s.milestones}</p>}
          </Section>

          <Section title="Team">
            <Card>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green/15 font-heading text-h3 font-bold text-green-deep">
                  {s.founderName.charAt(0)}
                </div>
                <div>
                  <p className="font-heading text-[17px] font-bold text-ink">{s.founderName}</p>
                  <p className="text-small text-slate">{s.founderRole}</p>
                </div>
              </div>
              <p className="mt-4 text-small text-ink/80">{s.founderBio}</p>
              <p className="mt-3 text-small text-slate">Team of {s.teamSize}</p>
            </Card>
          </Section>

          <Section title="Use of funds">
            <p>{s.useOfFunds}</p>
          </Section>
        </div>

        <IntroRail
          startupSlug={s.slug}
          startupName={s.name}
          raise={raiseBand(s.raiseMin, s.raiseMax)}
          equity={s.equityOffered}
        />
      </div>
    </Container>
  );
}
