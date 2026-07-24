'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type AppRow = {
  id: string;
  payload: Record<string, unknown>;
  email: string;
  whatsapp: string;
  status: string;
  createdAt: string;
  live: boolean;
};

// Field order + labels for the expanded view; anything not listed still renders below.
const fieldLabels: [string, string][] = [
  ['companyName', 'Company'],
  ['city', 'City'],
  ['foundedYear', 'Founded'],
  ['entityType', 'Entity type'],
  ['website', 'Website'],
  ['oneLiner', 'One-liner'],
  ['sector', 'Sector'],
  ['problem', 'Problem'],
  ['solution', 'Solution'],
  ['businessModel', 'Business model'],
  ['revenueBand', 'Monthly revenue'],
  ['monthsRunning', 'Months running'],
  ['customers', 'Customers'],
  ['growthPct', 'Growth'],
  ['raiseMin', 'Raise min (PKR)'],
  ['raiseMax', 'Raise max (PKR)'],
  ['equityOffered', 'Equity offered'],
  ['useOfFunds', 'Use of funds'],
  ['founderName', 'Founder'],
  ['founderRole', 'Role'],
  ['founderBio', 'Founder bio'],
  ['teamSize', 'Team size'],
  ['linkedin', 'LinkedIn'],
  ['deckUrl', 'Deck'],
  ['videoUrl', 'Video'],
  ['email', 'Email'],
  ['whatsapp', 'WhatsApp'],
];

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function ApplicationsPanel({ applications }: { applications: AppRow[] }) {
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState('');

  async function toggle(app: AppRow, publish: boolean) {
    setBusyId(app.id);
    setError('');
    const res = await fetch('/api/admin/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ applicationId: app.id, publish }),
    }).catch(() => null);
    setBusyId(null);
    if (res?.ok) {
      router.refresh();
    } else {
      const data = await res?.json().catch(() => null);
      setError(data?.error ?? 'Could not update. Try again.');
    }
  }

  if (applications.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/15 p-10 text-center text-body text-ink/60">
        No applications yet. New submissions from the /apply form will appear here.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {error && (
        <p className="text-small text-red-600" role="alert">
          {error}
        </p>
      )}
      {applications.map((app) => {
        const p = app.payload;
        const open = openId === app.id;
        const known = new Set(fieldLabels.map(([k]) => k));
        const extras = Object.entries(p).filter(([k]) => !known.has(k));
        return (
          <div key={app.id} className="rounded-2xl border border-ink/10 bg-white">
            <div className="flex flex-wrap items-center gap-4 p-5">
              <button
                onClick={() => setOpenId(open ? null : app.id)}
                className="flex min-w-0 flex-1 items-center gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-deep rounded-lg"
                aria-expanded={open}
              >
                <span className="text-slate">{open ? '▾' : '▸'}</span>
                <span className="min-w-0">
                  <span className="block truncate font-heading text-[16px] font-bold text-ink">
                    {String(p.companyName ?? '(no name)')}
                  </span>
                  <span className="block truncate text-small text-slate">
                    {String(p.sector ?? '—')} · {String(p.city ?? '—')} ·{' '}
                    {String(p.revenueBand ?? '—')} · {fmtDate(app.createdAt)}
                  </span>
                </span>
              </button>
              <span
                className={`rounded-full px-3 py-1 text-label uppercase tracking-[0.08em] ${
                  app.live
                    ? 'bg-green/15 text-green-deep'
                    : app.status === 'new'
                      ? 'bg-ink/10 text-ink'
                      : 'bg-ink/5 text-slate'
                }`}
              >
                {app.live ? 'Live' : app.status}
              </span>
              <label className="flex cursor-pointer items-center gap-2 text-small font-medium text-ink">
                <input
                  type="checkbox"
                  checked={app.live}
                  disabled={busyId === app.id}
                  onChange={(e) => toggle(app, e.target.checked)}
                  className="h-4 w-4 accent-[#16C172]"
                />
                Visible on website
              </label>
            </div>
            {open && (
              <div className="border-t border-ink/5 p-5">
                <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {fieldLabels.map(([key, label]) => {
                    const value =
                      key === 'email' ? app.email : key === 'whatsapp' ? app.whatsapp : p[key];
                    if (value === undefined || value === null || value === '') return null;
                    return (
                      <div key={key} className="min-w-0">
                        <dt className="text-label uppercase tracking-[0.08em] text-slate">
                          {label}
                        </dt>
                        <dd className="mt-0.5 whitespace-pre-wrap break-words text-small text-ink">
                          {String(value)}
                        </dd>
                      </div>
                    );
                  })}
                  {extras.map(([key, value]) =>
                    value === undefined || value === null || value === '' ? null : (
                      <div key={key} className="min-w-0">
                        <dt className="text-label uppercase tracking-[0.08em] text-slate">{key}</dt>
                        <dd className="mt-0.5 whitespace-pre-wrap break-words text-small text-ink">
                          {String(value)}
                        </dd>
                      </div>
                    )
                  )}
                </dl>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
