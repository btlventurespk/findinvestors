'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function SetupDbButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  async function run() {
    setBusy(true);
    setMessage('');
    const res = await fetch('/api/admin/setup-db', { method: 'POST' }).catch(() => null);
    const data = await res?.json().catch(() => null);
    setBusy(false);
    if (res?.ok) {
      setMessage('Tables created. Reloading…');
      router.refresh();
    } else {
      setMessage(data?.error ?? 'Setup failed. Try again.');
    }
  }

  return (
    <div className="mt-4">
      <Button onClick={run} disabled={busy}>
        {busy ? 'Creating tables…' : 'Create database tables'}
      </Button>
      {message && <p className="mt-2 text-small">{message}</p>}
    </div>
  );
}
