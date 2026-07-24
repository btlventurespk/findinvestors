import type { Metadata } from 'next';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Important disclaimer about findinvestors.pk.',
};

export default function DisclaimerPage() {
  return (
    <Container className="max-w-3xl py-14">
      <h1 className="text-[36px] font-extrabold text-ink md:text-h1">Disclaimer</h1>
      <div className="mt-8 space-y-6 text-body text-ink/80">
        <p>
          findinvestors is a media and profiling platform. It does not offer, sell, or solicit
          securities, and does not provide investment advice. All discussions occur directly
          between the parties.
        </p>
        <p>
          Startup profiles are prepared from information provided by the founders. While we review
          applications and speak with every founder before listing, we do not audit financial
          statements and make no representation as to the accuracy or completeness of any profile.
          Figures such as revenue bands, customer counts and growth rates are founder-reported.
        </p>
        <p>
          A listing on findinvestors.pk is not an endorsement, a recommendation, or an indication
          of investment merit. Nothing on this site should be relied upon as financial, legal or
          tax advice. Anyone considering a transaction with a listed business should conduct their
          own due diligence and obtain independent professional advice.
        </p>
        <p>
          findinvestors never publishes investor identities and does not represent any investor.
          We facilitate introductions only; we are not a party to any agreement that may result.
        </p>
      </div>
    </Container>
  );
}
