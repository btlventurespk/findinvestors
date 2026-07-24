import { prisma } from './db';
import seedData from '@/data/startups.json';

export type StartupData = {
  slug: string;
  name: string;
  logoUrl: string | null;
  oneLiner: string;
  sector: string;
  city: string;
  foundedYear: number;
  entityType: string;
  website: string | null;
  problem: string;
  solution: string;
  businessModel: string;
  targetMarket: string;
  competition: string | null;
  revenueBand: string;
  monthsRunning: number;
  customers: string;
  growthPct: string | null;
  milestones: string | null;
  raiseMin: number;
  raiseMax: number;
  equityOffered: string | null;
  useOfFunds: string;
  priorFunding: boolean;
  founderName: string;
  founderRole: string;
  founderBio: string;
  founderPhoto: string | null;
  linkedin: string | null;
  teamSize: number;
  deckUrl: string | null;
  videoUrl: string | null;
  featured: boolean;
  published: boolean;
};

const fallback = seedData as StartupData[];

// The site must render before DATABASE_URL is wired up (and during local builds),
// so every read degrades to the bundled seed data when the DB is unreachable.
export async function getPublishedStartups(): Promise<StartupData[]> {
  try {
    const rows = await prisma.startup.findMany({
      where: { published: true },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });
    if (rows.length > 0) return rows as unknown as StartupData[];
  } catch {
    // fall through to seed data
  }
  return fallback.filter((s) => s.published);
}

export async function getFeaturedStartups(limit = 6): Promise<StartupData[]> {
  const all = await getPublishedStartups();
  const featured = all.filter((s) => s.featured);
  return (featured.length >= limit ? featured : all).slice(0, limit);
}

export async function getStartupBySlug(slug: string): Promise<StartupData | null> {
  try {
    const row = await prisma.startup.findUnique({ where: { slug } });
    if (row && row.published) return row as unknown as StartupData;
    if (row) return null;
  } catch {
    // fall through to seed data
  }
  return fallback.find((s) => s.slug === slug && s.published) ?? null;
}

export function formatPKR(amount: number): string {
  if (amount >= 10000000) return `PKR ${(amount / 10000000).toFixed(1).replace(/\.0$/, '')} crore`;
  if (amount >= 100000) return `PKR ${(amount / 100000).toFixed(1).replace(/\.0$/, '')} lakh`;
  return `PKR ${amount.toLocaleString()}`;
}

export function raiseBand(min: number, max: number): string {
  const m = (n: number) => `${(n / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  return `PKR ${m(min)}–${m(max)}`;
}
