import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Application received',
  robots: { index: false },
};

export default function ThankYouPage() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP;
  return (
    <Container className="max-w-2xl py-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green/15 text-h2 text-green-deep">
        ✓
      </div>
      <h1 className="mt-6 text-h2 text-ink">Application received.</h1>
      <p className="mx-auto mt-4 max-w-md text-body text-ink/70">
        We read every application. If your business fits, we&apos;ll reach out within{' '}
        <strong className="text-ink">5 working days</strong> to set up a call. No response after
        that means it&apos;s not a fit right now — apply again when the numbers grow.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {whatsapp && (
          <Button
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
              'Hi, I just submitted my application on findinvestors.pk'
            )}`}
          >
            Confirm on WhatsApp
          </Button>
        )}
        <Button href="/startups" variant="secondary">
          Browse startups
        </Button>
      </div>
    </Container>
  );
}
