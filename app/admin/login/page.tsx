import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import LoginForm from '@/components/admin/LoginForm';

export const metadata: Metadata = {
  title: 'Admin login',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <Container className="max-w-sm py-24">
      <h1 className="text-h2 text-ink">Admin login</h1>
      <p className="mt-2 text-small text-slate">For the findinvestors team only.</p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </Container>
  );
}
