'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

const inputCls =
  'w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-body text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-deep';

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const form = new FormData(e.currentTarget);
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: form.get('username'), password: form.get('password') }),
    }).catch(() => null);
    if (res?.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      const data = await res?.json().catch(() => null);
      setError(data?.error ?? 'Login failed. Try again.');
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="username" className="mb-2 block text-small font-medium text-ink">
          Username
        </label>
        <input id="username" name="username" required autoComplete="username" className={inputCls} />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-small font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputCls}
        />
      </div>
      {error && (
        <p className="text-small text-red-600" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" disabled={busy} className="w-full">
        {busy ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  );
}
