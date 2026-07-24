import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the findinvestors team.',
};

export default function ContactPage() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP;
  return (
    <Container className="max-w-2xl py-14">
      <h1 className="text-[36px] font-extrabold text-ink md:text-h1">Contact</h1>
      <p className="mt-4 text-body text-ink/70">
        Founders, investors, press — we answer everything ourselves, usually within a working day.
      </p>

      <div className="mt-10 space-y-6">
        <Card>
          <h2 className="text-h3 text-ink">Founders</h2>
          <p className="mt-2 text-body text-ink/80">
            Want to be listed? The application is the fastest route — it tells us everything we
            need for a first look.
          </p>
          <Button href="/apply" className="mt-5">
            Apply to be listed
          </Button>
        </Card>

        <Card>
          <h2 className="text-h3 text-ink">Everything else</h2>
          <p className="mt-2 text-body text-ink/80">
            Email us at{' '}
            <a href="mailto:hello@findinvestors.pk" className="font-medium text-green-deep hover:underline">
              hello@findinvestors.pk
            </a>
            {whatsapp && (
              <>
                {' '}
                or message us on{' '}
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-green-deep hover:underline"
                >
                  WhatsApp
                </a>
              </>
            )}
            .
          </p>
        </Card>
      </div>
    </Container>
  );
}
