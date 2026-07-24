import Link from 'next/link';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Pill from '@/components/ui/Pill';
import Card from '@/components/ui/Card';
import StartupCard from '@/components/sections/StartupCard';
import { getFeaturedStartups, getPublishedStartups, raiseBand } from '@/lib/startups';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [featured, all] = await Promise.all([getFeaturedStartups(6), getPublishedStartups()]);
  const sectors = new Set(all.map((s) => s.sector)).size;
  const cities = new Set(all.map((s) => s.city)).size;
  const heroCards = featured.slice(0, 3);

  return (
    <>
      {/* 1. Hero */}
      <section className="bg-paper">
        <Container className="grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="text-[40px] font-extrabold leading-[1.05] text-ink md:text-h1">
              You built something that works.
            </h1>
            <p className="mt-5 max-w-md text-body text-ink/80">
              Put it in front of investors who back Pakistani businesses.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/apply">List your startup</Button>
              <Button href="/startups" variant="secondary">
                Browse startups
              </Button>
            </div>
          </div>
          <div className="relative hidden h-[420px] md:block" aria-hidden="true">
            {heroCards.map((s, i) => (
              <div
                key={s.slug}
                className="absolute w-72 rounded-2xl border border-ink/5 bg-white p-5 shadow-lg"
                style={{
                  top: `${i * 110}px`,
                  right: `${i * 48}px`,
                  transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green/15 font-heading font-bold text-green-deep">
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading text-[15px] font-bold text-ink">{s.name}</p>
                    <p className="text-[12px] text-slate">
                      {s.sector} · {s.city}
                    </p>
                  </div>
                </div>
                <p className="mt-3 line-clamp-2 text-[13px] text-ink/70">{s.oneLiner}</p>
                <p className="mt-3 text-[13px] font-medium text-green-deep">
                  Raising {raiseBand(s.raiseMin, s.raiseMax)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 2. Trust bar */}
      <section className="border-y border-ink/5 bg-white">
        <Container className="grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
          {[
            { value: `${all.length}+`, label: 'Startups listed' },
            { value: `${sectors}`, label: 'Sectors' },
            { value: `${cities}`, label: 'Cities' },
            { value: 'Growing', label: 'Investor network' },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <p className="font-heading text-h2 text-ink">{m.value}</p>
              <p className="mt-1 text-label font-medium uppercase tracking-[0.08em] text-slate">
                {m.label}
              </p>
            </div>
          ))}
        </Container>
      </section>

      {/* 3. How it works */}
      <section className="py-20">
        <Container>
          <h2 className="text-center text-[28px] font-bold text-ink md:text-h2">How it works</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                n: '1',
                title: 'Apply',
                body: 'Tell us about your business, your revenue, and what you want to raise. Takes about 15 minutes.',
              },
              {
                n: '2',
                title: 'We meet you',
                body: 'Our team reviews your application and gets on a call. We only list businesses we can stand behind.',
              },
              {
                n: '3',
                title: 'You go live',
                body: 'Your profile goes up. Investors browsing the directory can request an intro directly.',
              },
            ].map((step) => (
              <Card key={step.n}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-heading font-bold text-green">
                  {step.n}
                </span>
                <h3 className="mt-4 text-h3 text-ink">{step.title}</h3>
                <p className="mt-2 text-small text-ink/70">{step.body}</p>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link href="/how-it-works" className="text-small font-medium text-green-deep hover:underline">
              Read the full process →
            </Link>
          </p>
        </Container>
      </section>

      {/* 4. Featured startups */}
      <section className="bg-white py-20">
        <Container>
          <div className="flex items-end justify-between">
            <h2 className="text-[28px] font-bold text-ink md:text-h2">Featured startups</h2>
            <Link href="/startups" className="text-small font-medium text-green-deep hover:underline">
              View all →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s) => (
              <StartupCard key={s.slug} startup={s} />
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Who this is for */}
      <section className="py-20">
        <Container className="grid gap-8 md:grid-cols-2">
          <Card>
            <Pill tone="green">This is for you if…</Pill>
            <ul className="mt-6 space-y-4">
              {[
                'Your business makes real revenue, every month.',
                'You are registered — or ready to register — as a formal entity.',
                'You are prepared to give equity in exchange for growth capital.',
              ].map((t) => (
                <li key={t} className="flex gap-3 text-body text-ink/80">
                  <span className="mt-1 text-green-deep">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="bg-paper">
            <Pill>Not yet if…</Pill>
            <ul className="mt-6 space-y-4">
              {[
                'You are at idea stage with nothing launched.',
                'You have users but no revenue yet.',
                'You want a loan, not an investor.',
              ].map((t) => (
                <li key={t} className="flex gap-3 text-body text-ink/60">
                  <span className="mt-1 text-slate">—</span>
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-small text-slate">
              Come back when the revenue is flowing. We&apos;ll be here.
            </p>
          </Card>
        </Container>
      </section>

      {/* 6. Founder quote */}
      <section className="bg-white py-20">
        <Container className="max-w-3xl text-center">
          <blockquote className="text-[24px] font-bold leading-snug text-ink md:text-h2">
            “We spent two years being invisible. Three weeks after our profile went live, we were
            having conversations we couldn&apos;t get in the door for before.”
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green/15 font-heading font-bold text-green-deep">
              H
            </div>
            <div className="text-left">
              <p className="font-heading text-[15px] font-bold text-ink">Hamza Siddiqui</p>
              <p className="text-small text-slate">Founder, Chai Theory — Karachi</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. CTA band */}
      <section className="bg-ink py-20">
        <Container className="text-center">
          <h2 className="text-[28px] font-bold text-white md:text-h2">
            Your revenue deserves an audience.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-body text-slate">
            Listing is free. If your business is real, we want investors to see it.
          </p>
          <div className="mt-8">
            <Button href="/apply">Apply to be listed</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
