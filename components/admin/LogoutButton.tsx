'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => null);
    router.push('/admin/login');
    router.refresh();
  }
  return (
    <Button variant="secondary" onClick={logout}>
      Sign out
    </Button>
  );
}
