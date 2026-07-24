import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import Container from '@/components/ui/Container';

const columns = [
  {
    title: 'Platform',
    links: [
      { href: '/startups', label: 'Browse startups' },
      { href: '/apply', label: 'Apply to be listed' },
      { href: '/how-it-works', label: 'How it works' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
      { href: '/disclaimer', label: 'Disclaimer' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Logo reversed />
            <p className="mt-4 max-w-xs text-small text-slate">
              Where Pakistan&apos;s revenue-generating startups get seen by people who write
              cheques.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-label font-medium uppercase tracking-[0.08em] text-slate">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-small text-white/80 hover:text-green">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-small text-slate">
            findinvestors is a media and profiling platform. It does not offer, sell, or solicit
            securities, and does not provide investment advice. All discussions occur directly
            between the parties.
          </p>
          <p className="mt-3 text-small text-slate">
            © {new Date().getFullYear()} findinvestors · findinvestors.pk
          </p>
        </div>
      </Container>
    </footer>
  );
}
