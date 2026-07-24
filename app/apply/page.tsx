import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import ApplyForm from '@/components/sections/ApplyForm';

export const metadata: Metadata = {
  title: 'Apply to be listed',
  description:
    'List your revenue-generating Pakistani startup on findinvestors.pk. Free to apply — takes about 15 minutes.',
};

export default function ApplyPage() {
  return (
    <Container className="max-w-2xl py-14">
      <h1 className="text-[36px] font-extrabold text-ink md:text-h1">Apply to be listed</h1>
      <p className="mt-3 text-body text-ink/70">
        Seven short steps, about 15 minutes. Your answers save on this device as you go, so you can
        come back anytime.
      </p>
      <div className="mt-10">
        <ApplyForm />
      </div>
    </Container>
  );
}
