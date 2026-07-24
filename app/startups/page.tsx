import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import DirectoryClient from '@/components/sections/DirectoryClient';
import { getPublishedStartups } from '@/lib/startups';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Startup directory',
  description:
    'Browse revenue-generating Pakistani startups by sector, city, stage and raise size.',
};

export default async function StartupsPage() {
  const startups = await getPublishedStartups();

  return (
    <Container className="py-14">
      <h1 className="text-[36px] font-extrabold text-ink md:text-h1">Startups</h1>
      <p className="mt-3 max-w-xl text-body text-ink/70">
        Every business here makes real revenue. Filter by sector, city or raise size — and request
        an intro when something catches your eye.
      </p>
      <div className="mt-10">
        <DirectoryClient startups={startups} />
      </div>
    </Container>
  );
}
