import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="text-label font-medium uppercase tracking-[0.08em] text-slate">404</p>
      <h1 className="mt-3 text-h2 text-ink">This page doesn&apos;t exist.</h1>
      <p className="mx-auto mt-4 max-w-md text-body text-ink/70">
        The link may be old, or the profile may have been taken down.
      </p>
      <div className="mt-8">
        <Button href="/startups">Browse startups</Button>
      </div>
    </Container>
  );
}
