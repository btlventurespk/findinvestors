import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About',
  description:
    'findinvestors profiles revenue-generating Pakistani startups and puts them in front of people who invest in Pakistani businesses.',
};

export default function AboutPage() {
  return (
    <Container className="max-w-3xl py-14">
      <h1 className="text-[36px] font-extrabold text-ink md:text-h1">
        Good businesses shouldn&apos;t be invisible.
      </h1>
      <div className="mt-8 space-y-6 text-body text-ink/80">
        <p>
          Pakistan is full of businesses that work. Cafes doing millions a month. Logistics
          companies moving thousands of parcels a day. Apps that shopkeepers actually open every
          morning. Real revenue, real customers, real growth.
        </p>
        <p>
          Most of them never get in front of an investor. Not because the business isn&apos;t good
          — because the founder doesn&apos;t have the network. Fundraising in Pakistan still runs
          on who you know, and if you built your company on a factory floor in Faisalabad instead
          of at a startup mixer in Karachi, you&apos;re out of the room before it starts.
        </p>
        <p>
          findinvestors fixes the visibility problem. We profile revenue-generating Pakistani
          startups — properly, with the numbers that matter — and put those profiles in front of
          people who invest in Pakistani businesses. When an investor wants to talk to you, we
          connect you directly and step back.
        </p>
        <p>
          We don&apos;t promise funding. Nobody honestly can. What we promise is that if you built
          something that works, the people who write cheques will get to see it.
        </p>
      </div>

      <h2 className="mt-14 text-h2 text-ink">What we believe</h2>
      <ul className="mt-6 space-y-4 text-body text-ink/80">
        <li className="flex gap-3">
          <span className="mt-1 text-green-deep">✓</span>
          Revenue is the best pitch deck. We only list businesses that make money.
        </li>
        <li className="flex gap-3">
          <span className="mt-1 text-green-deep">✓</span>
          Plain language wins. If your dadi can&apos;t understand what your business does from your
          profile, we rewrite it.
        </li>
        <li className="flex gap-3">
          <span className="mt-1 text-green-deep">✓</span>
          Privacy for investors, visibility for founders. That&apos;s the trade that makes both
          sides comfortable.
        </li>
      </ul>

      <div className="mt-14 text-center">
        <Button href="/apply">Apply to be listed</Button>
      </div>
    </Container>
  );
}
