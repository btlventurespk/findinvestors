import type { Metadata } from 'next';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Terms of use',
  description: 'Terms of use for findinvestors.pk.',
};

export default function TermsPage() {
  return (
    <Container className="max-w-3xl py-14">
      <h1 className="text-[36px] font-extrabold text-ink md:text-h1">Terms of use</h1>
      <p className="mt-2 text-small text-slate">Last updated: July 2026</p>
      <div className="mt-8 space-y-6 text-body text-ink/80">
        <section>
          <h2 className="text-h3 text-ink">What findinvestors is</h2>
          <p className="mt-2">
            findinvestors.pk is a media and profiling platform. We publish profiles of
            revenue-generating Pakistani startups and facilitate introductions between founders
            and interested parties. We are not a broker, dealer, investment adviser, crowdfunding
            platform or securities exchange, and nothing on this site is an offer, solicitation or
            recommendation to buy or sell securities.
          </p>
        </section>
        <section>
          <h2 className="text-h3 text-ink">Founder obligations</h2>
          <p className="mt-2">
            By applying, you confirm that the information you submit is accurate and that you are
            authorised to share it. Profiles are published only with your approval. You must tell
            us promptly if material information in your profile changes. We may decline or remove
            any listing at our discretion.
          </p>
        </section>
        <section>
          <h2 className="text-h3 text-ink">No guarantees</h2>
          <p className="mt-2">
            A listing provides exposure and visibility. It does not guarantee introductions,
            meetings, or funding of any kind. Any discussion, negotiation or transaction that
            follows an introduction occurs directly between the parties, at their own risk, and on
            their own terms. Each party is responsible for its own due diligence and legal advice.
          </p>
        </section>
        <section>
          <h2 className="text-h3 text-ink">Content and conduct</h2>
          <p className="mt-2">
            You may not submit false information, impersonate others, scrape the site, or use
            listed founders&apos; contact details for unrelated marketing. We may suspend access
            for misuse.
          </p>
        </section>
        <section>
          <h2 className="text-h3 text-ink">Liability</h2>
          <p className="mt-2">
            The site is provided as-is. To the maximum extent permitted by law, findinvestors is
            not liable for losses arising from use of the site, reliance on profile information,
            or the outcome of any introduction or transaction.
          </p>
        </section>
        <section>
          <h2 className="text-h3 text-ink">Changes</h2>
          <p className="mt-2">
            We may update these terms; continued use after an update constitutes acceptance.
            Questions: hello@findinvestors.pk.
          </p>
        </section>
      </div>
    </Container>
  );
}
