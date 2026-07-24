export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

type Payload = Record<string, unknown>;

const str = (v: unknown, fallback = ''): string =>
  typeof v === 'string' && v.trim() ? v.trim() : fallback;

const int = (v: unknown, fallback = 0): number => {
  const n = parseInt(String(v), 10);
  return Number.isFinite(n) ? n : fallback;
};

// Maps a raw application payload onto the Startup model's columns.
// The apply form doesn't collect every profile field (e.g. targetMarket,
// milestones), so those start empty and can be edited in the DB later.
export function applicationToStartup(payload: Payload) {
  const name = str(payload.companyName, 'Unnamed startup');
  return {
    slug: slugify(name) || 'startup',
    name,
    logoUrl: null,
    oneLiner: str(payload.oneLiner, name).slice(0, 160),
    sector: str(payload.sector, 'Other'),
    city: str(payload.city, 'Pakistan'),
    foundedYear: int(payload.foundedYear, new Date().getFullYear()),
    entityType: str(payload.entityType, 'Not specified'),
    website: str(payload.website) || null,
    problem: str(payload.problem),
    solution: str(payload.solution),
    businessModel: str(payload.businessModel),
    targetMarket: str(payload.targetMarket),
    competition: str(payload.competition) || null,
    revenueBand: str(payload.revenueBand, 'Not disclosed'),
    monthsRunning: int(payload.monthsRunning),
    customers: str(payload.customers, '—'),
    growthPct: str(payload.growthPct) || null,
    milestones: str(payload.milestones) || null,
    raiseMin: int(payload.raiseMin),
    raiseMax: int(payload.raiseMax, int(payload.raiseMin)),
    equityOffered: str(payload.equityOffered) || null,
    useOfFunds: str(payload.useOfFunds),
    priorFunding: false,
    founderName: str(payload.founderName, '—'),
    founderRole: str(payload.founderRole, 'Founder'),
    founderBio: str(payload.founderBio),
    founderPhoto: null,
    linkedin: str(payload.linkedin) || null,
    teamSize: int(payload.teamSize, 1),
    deckUrl: str(payload.deckUrl) || null,
    videoUrl: str(payload.videoUrl) || null,
    featured: false,
    published: true,
  };
}
