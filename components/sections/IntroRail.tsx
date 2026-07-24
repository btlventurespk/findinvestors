'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function IntroRail({
  startupSlug,
  startupName,
  raise,
  equity,
}: {
  startupSlug: string;
  startupName: string;
  raise: string;
  equity: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP;
  const waLink = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(
        `Hi, I'd like an intro to ${startupName} listed on findinvestors.pk`
      )}`
    : null;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = new FormData(e.currentTarget);
    const res = await fetch('/api/intro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startupSlug,
        name: form.get('name'),
        email: form.get('email'),
        phone: form.get('phone'),
        message: form.get('message'),
      }),
    }).catch(() => null);
    setStatus(res?.ok ? 'sent' : 'error');
  }

  const inputCls =
    'w-full rounded-lg border border-ink/15 px-4 py-2.5 text-small text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-deep';

  return (
    <>
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-ink/5 bg-white p-6 shadow-sm">
          <p className="text-label font-medium uppercase tracking-[0.08em] text-slate">
            Raise ask
          </p>
          <p className="mt-2 font-heading text-h3 text-ink">{raise}</p>
          {equity && (
            <>
              <p className="mt-4 text-label font-medium uppercase tracking-[0.08em] text-slate">
                Equity offered
              </p>
              <p className="mt-2 font-heading text-[17px] font-bold text-ink">{equity}</p>
            </>
          )}
          <Button onClick={() => setOpen(true)} className="mt-6 w-full">
            Request an intro
          </Button>
          <p className="mt-4 text-[12px] leading-relaxed text-slate">
            We connect you directly with the founder. findinvestors does not broker securities or
            provide investment advice.
          </p>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Request an intro to ${startupName}`}
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <h2 className="text-h3 text-ink">Request an intro</h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-lg p-1 text-slate hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                ✕
              </button>
            </div>
            <p className="mt-1 text-small text-slate">{startupName}</p>

            {status === 'sent' ? (
              <div className="mt-6">
                <p className="text-body text-ink">
                  Got it. We&apos;ll pass your request to the founder and follow up with you
                  directly.
                </p>
                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-small font-medium text-green-deep hover:underline"
                  >
                    Prefer WhatsApp? Message us →
                  </a>
                )}
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 space-y-4">
                <input name="name" required placeholder="Your name" className={inputCls} aria-label="Your name" />
                <input name="email" type="email" required placeholder="Email" className={inputCls} aria-label="Email" />
                <input name="phone" required placeholder="Phone" className={inputCls} aria-label="Phone" />
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Anything you'd like the founder to know (optional)"
                  className={inputCls}
                  aria-label="Message"
                />
                {status === 'error' && (
                  <p className="text-small text-red-600">
                    Something went wrong. Try again{waLink ? ' or reach us on WhatsApp below' : ''}.
                  </p>
                )}
                <Button type="submit" disabled={status === 'sending'} className="w-full">
                  {status === 'sending' ? 'Sending…' : 'Send request'}
                </Button>
                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-small font-medium text-green-deep hover:underline"
                  >
                    Or message us on WhatsApp →
                  </a>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
