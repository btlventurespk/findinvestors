import Link from 'next/link';
import Pill from '@/components/ui/Pill';
import Card from '@/components/ui/Card';
import { raiseBand, type StartupData } from '@/lib/startups';

export default function StartupCard({ startup }: { startup: StartupData }) {
  return (
    <Link
      href={`/startups/${startup.slug}`}
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-deep focus-visible:ring-offset-2"
    >
      <Card className="h-full transition-shadow group-hover:shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink/5 font-heading text-h3 text-ink">
            {startup.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-heading text-[18px] font-bold text-ink group-hover:text-green-deep">
              {startup.name}
            </h3>
            <p className="text-small text-slate">{startup.city}</p>
          </div>
        </div>
        <p className="mt-4 line-clamp-2 text-small text-ink/80">{startup.oneLiner}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Pill tone="green">{startup.sector}</Pill>
          <span className="text-small text-slate">
            Raising {raiseBand(startup.raiseMin, startup.raiseMax)}
          </span>
        </div>
      </Card>
    </Link>
  );
}
