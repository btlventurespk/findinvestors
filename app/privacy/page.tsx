import type { Metadata } from 'next';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How findinvestors.pk collects, uses and protects your information.',
};

export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl py-14">
      <h1 className="text-[36px] font-extrabold text-ink md:text-h1">Privacy policy</h1>
      <p className="mt-2 text-small text-slate">Last updated: July 2026</p>
      <div className="prose-ink mt-8 space-y-6 text-body text-ink/80">
        <section>
          <h2 className="text-h3 text-ink">What we collect</h2>
          <p className="mt-2">
            When you apply to be listed, we collect the information you provide: your company
            details, business description, revenue band, raise ask, team details and contact
            information (email and WhatsApp number). When you request an intro to a listed
            startup, we collect your name, email, phone number and message. We do not collect
            payment information on this site.
          </p>
        </section>
        <section>
          <h2 className="text-h3 text-ink">How we use it</h2>
          <p className="mt-2">
            Application data is used to evaluate your business for listing and, if accepted, to
            build your public profile — only with your approval. Intro request data is shared with
            the relevant startup&apos;s founder so they can respond to you. Contact details are
            used to communicate with you about your application or request. We do not sell your
            data to anyone.
          </p>
        </section>
        <section>
          <h2 className="text-h3 text-ink">What is public</h2>
          <p className="mt-2">
            Only approved startup profiles are public. Applications that are not accepted remain
            private. Investor identities are never published on this site.
          </p>
        </section>
        <section>
          <h2 className="text-h3 text-ink">Storage and security</h2>
          <p className="mt-2">
            Data is stored on managed servers with access limited to the findinvestors team.
            Notification emails containing submission details are sent to our internal address
            only.
          </p>
        </section>
        <section>
          <h2 className="text-h3 text-ink">Your choices</h2>
          <p className="mt-2">
            You can ask us to correct or delete your data — including a live profile — at any time
            by emailing hello@findinvestors.pk. We action removal requests within 7 working days.
          </p>
        </section>
      </div>
    </Container>
  );
}
