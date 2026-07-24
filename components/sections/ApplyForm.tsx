'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/ui/Button';

const schema = z.object({
  // Company
  companyName: z.string().min(2, 'Company name is required'),
  city: z.string().min(2, 'City is required'),
  foundedYear: z.string().regex(/^\d{4}$/, 'Enter a 4-digit year'),
  entityType: z.string().min(1, 'Select an entity type'),
  website: z.string().optional(),
  // Business
  oneLiner: z.string().min(10, 'At least 10 characters').max(160, 'Max 160 characters'),
  sector: z.string().min(1, 'Select a sector'),
  problem: z.string().min(30, 'Tell us more — at least 30 characters'),
  solution: z.string().min(30, 'Tell us more — at least 30 characters'),
  businessModel: z.string().min(30, 'Tell us more — at least 30 characters'),
  // Traction
  revenueBand: z.string().min(1, 'Select a revenue band'),
  monthsRunning: z.string().regex(/^\d+$/, 'Enter a number'),
  customers: z.string().min(1, 'Required'),
  growthPct: z.string().optional(),
  // Raise
  raiseMin: z.string().regex(/^\d+$/, 'Enter a number in PKR'),
  raiseMax: z.string().regex(/^\d+$/, 'Enter a number in PKR'),
  equityOffered: z.string().optional(),
  useOfFunds: z.string().min(30, 'Tell us how you would use the money'),
  // Team
  founderName: z.string().min(2, 'Required'),
  founderRole: z.string().min(2, 'Required'),
  founderBio: z.string().min(30, 'A few sentences about you'),
  teamSize: z.string().regex(/^\d+$/, 'Enter a number'),
  linkedin: z.string().optional(),
  // Assets
  deckUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  // Contact
  email: z.string().email('Enter a valid email'),
  whatsapp: z.string().min(10, 'Enter your WhatsApp number with country code'),
});

type FormValues = z.infer<typeof schema>;

type FieldDef = {
  name: keyof FormValues;
  label: string;
  type?: 'text' | 'textarea' | 'select';
  options?: string[];
  placeholder?: string;
};

const steps: { title: string; intro: string; fields: FieldDef[] }[] = [
  {
    title: 'Company',
    intro: 'The basics first.',
    fields: [
      { name: 'companyName', label: 'Company name' },
      { name: 'city', label: 'City', type: 'select', options: ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Rawalpindi', 'Peshawar', 'Multan', 'Other'] },
      { name: 'foundedYear', label: 'Year founded', placeholder: '2022' },
      { name: 'entityType', label: 'Entity type', type: 'select', options: ['Private Limited', 'Sole Proprietorship', 'Partnership', 'Not registered yet'] },
      { name: 'website', label: 'Website (optional)', placeholder: 'https://' },
    ],
  },
  {
    title: 'Business',
    intro: 'What you do and why it matters.',
    fields: [
      { name: 'oneLiner', label: 'One-liner (max 160 characters)' },
      { name: 'sector', label: 'Sector', type: 'select', options: ['F&B', 'E-commerce', 'Logistics', 'EdTech', 'HealthTech', 'D2C Apparel', 'AgriTech', 'FinTech', 'SaaS', 'Other'] },
      { name: 'problem', label: 'The problem you solve', type: 'textarea' },
      { name: 'solution', label: 'Your solution', type: 'textarea' },
      { name: 'businessModel', label: 'How you make money', type: 'textarea' },
    ],
  },
  {
    title: 'Traction',
    intro: 'Numbers beat adjectives.',
    fields: [
      { name: 'revenueBand', label: 'Monthly revenue', type: 'select', options: ['PKR 300k–1M monthly', 'PKR 1M–2M monthly', 'PKR 2M–4M monthly', 'PKR 4M+ monthly'] },
      { name: 'monthsRunning', label: 'Months in operation', placeholder: '24' },
      { name: 'customers', label: 'Customers (count or description)' },
      { name: 'growthPct', label: 'Growth rate (optional)', placeholder: 'e.g. 10% MoM' },
    ],
  },
  {
    title: 'Raise',
    intro: 'What you need and what it buys.',
    fields: [
      { name: 'raiseMin', label: 'Minimum raise (PKR)', placeholder: '5000000' },
      { name: 'raiseMax', label: 'Maximum raise (PKR)', placeholder: '8000000' },
      { name: 'equityOffered', label: 'Equity offered (optional)', placeholder: 'e.g. 10–15%' },
      { name: 'useOfFunds', label: 'Use of funds', type: 'textarea' },
    ],
  },
  {
    title: 'Team',
    intro: 'Who is behind this.',
    fields: [
      { name: 'founderName', label: 'Founder name' },
      { name: 'founderRole', label: 'Role', placeholder: 'Founder & CEO' },
      { name: 'founderBio', label: 'Short bio', type: 'textarea' },
      { name: 'teamSize', label: 'Team size', placeholder: '10' },
      { name: 'linkedin', label: 'LinkedIn (optional)', placeholder: 'https://linkedin.com/in/…' },
    ],
  },
  {
    title: 'Assets',
    intro: 'Anything that shows the business. Both optional.',
    fields: [
      { name: 'deckUrl', label: 'Pitch deck link (optional)', placeholder: 'Google Drive / Dropbox link' },
      { name: 'videoUrl', label: 'Video link (optional)', placeholder: 'YouTube link' },
    ],
  },
  {
    title: 'Contact',
    intro: 'How we reach you.',
    fields: [
      { name: 'email', label: 'Email' },
      { name: 'whatsapp', label: 'WhatsApp number', placeholder: '+92 300 1234567' },
    ],
  },
];

const STORAGE_KEY = 'findinvestors-apply';

const inputCls =
  'w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-body text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-deep';

export default function ApplyForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    trigger,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: 'onTouched' });

  // Restore a half-finished application from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { values, step: savedStep } = JSON.parse(saved);
        reset(values);
        setStep(Math.min(savedStep ?? 0, steps.length - 1));
      }
    } catch {
      // corrupt state — start fresh
    }
  }, [reset]);

  // Persist on every change
  useEffect(() => {
    const sub = watch((values) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ values, step }));
    });
    return () => sub.unsubscribe();
  }, [watch, step]);

  async function next() {
    const names = steps[step].fields.map((f) => f.name);
    const valid = await trigger(names);
    if (valid) setStep((s) => s + 1);
  }

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    setSubmitError(false);
    const res = await fetch('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }).catch(() => null);
    if (res?.ok) {
      localStorage.removeItem(STORAGE_KEY);
      router.push('/apply/thank-you');
    } else {
      setSubmitError(true);
      setSubmitting(false);
    }
  }

  const current = steps[step];
  const isLast = step === steps.length - 1;
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-small text-slate">
          <span>
            Step {step + 1} of {steps.length} — {current.title}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/10" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={steps.length}>
          <div className="h-full rounded-full bg-green transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <h2 className="text-h2 text-ink">{current.title}</h2>
      <p className="mt-2 text-body text-ink/70">{current.intro}</p>

      <div className="mt-8 space-y-6">
        {current.fields.map((f) => (
          <div key={f.name}>
            <label htmlFor={f.name} className="mb-2 block text-small font-medium text-ink">
              {f.label}
            </label>
            {f.type === 'textarea' ? (
              <textarea id={f.name} rows={4} placeholder={f.placeholder} className={inputCls} {...register(f.name)} />
            ) : f.type === 'select' ? (
              <select id={f.name} className={inputCls} {...register(f.name)}>
                <option value="">Select…</option>
                {f.options!.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input id={f.name} type="text" placeholder={f.placeholder} className={inputCls} {...register(f.name)} />
            )}
            {errors[f.name] && (
              <p className="mt-2 text-small text-red-600" role="alert">
                {errors[f.name]?.message as string}
              </p>
            )}
          </div>
        ))}
      </div>

      {submitError && (
        <p className="mt-6 text-small text-red-600" role="alert">
          Submission failed. Check your connection and try again — your answers are saved on this
          device.
        </p>
      )}

      <div className="mt-10 flex items-center justify-between">
        {step > 0 ? (
          <Button type="button" variant="secondary" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        ) : (
          <span />
        )}
        {isLast ? (
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit application'}
          </Button>
        ) : (
          <Button type="button" onClick={next}>
            Continue
          </Button>
        )}
      </div>
    </form>
  );
}
