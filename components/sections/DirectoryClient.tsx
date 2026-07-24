'use client';

import { useMemo, useState } from 'react';
import StartupCard from '@/components/sections/StartupCard';
import type { StartupData } from '@/lib/startups';

const raiseBuckets = [
  { label: 'Any raise size', min: 0, max: Infinity },
  { label: 'Under PKR 5M', min: 0, max: 5000000 },
  { label: 'PKR 5M–8M', min: 5000000, max: 8000000 },
  { label: 'PKR 8M+', min: 8000000, max: Infinity },
];

const selectCls =
  'rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-small text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-deep';

export default function DirectoryClient({ startups }: { startups: StartupData[] }) {
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('');
  const [city, setCity] = useState('');
  const [raise, setRaise] = useState(0);

  const sectors = useMemo(() => [...new Set(startups.map((s) => s.sector))].sort(), [startups]);
  const cities = useMemo(() => [...new Set(startups.map((s) => s.city))].sort(), [startups]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const bucket = raiseBuckets[raise];
    return startups.filter((s) => {
      if (sector && s.sector !== sector) return false;
      if (city && s.city !== city) return false;
      if (s.raiseMax < bucket.min || s.raiseMin > bucket.max) return false;
      if (q && !`${s.name} ${s.oneLiner} ${s.sector} ${s.city}`.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [startups, query, sector, city, raise]);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search startups…"
          aria-label="Search startups"
          className={`${selectCls} w-full sm:w-64`}
        />
        <select value={sector} onChange={(e) => setSector(e.target.value)} className={selectCls} aria-label="Filter by sector">
          <option value="">All sectors</option>
          {sectors.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select value={city} onChange={(e) => setCity(e.target.value)} className={selectCls} aria-label="Filter by city">
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          value={raise}
          onChange={(e) => setRaise(Number(e.target.value))}
          className={selectCls}
          aria-label="Filter by raise size"
        >
          {raiseBuckets.map((b, i) => (
            <option key={b.label} value={i}>
              {b.label}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-6 text-small text-slate">
        {filtered.length} {filtered.length === 1 ? 'startup' : 'startups'}
      </p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <StartupCard key={s.slug} startup={s} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-ink/15 p-12 text-center">
          <p className="text-body text-ink/60">Nothing matches those filters yet.</p>
        </div>
      )}
    </div>
  );
}
