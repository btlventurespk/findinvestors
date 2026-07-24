'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

const nav = [
  { href: '/startups', label: 'Startups' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-paper/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="findinvestors home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-small font-medium transition-colors hover:text-green-deep ${
                pathname.startsWith(item.href) ? 'text-green-deep' : 'text-ink'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Button href="/apply" className="!px-5 !py-2.5">
            List your startup
          </Button>
        </nav>

        <button
          className="rounded-lg p-2 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <div className="border-t border-ink/5 bg-paper md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-body font-medium text-ink hover:bg-ink/5"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/apply" className="mt-2">
              List your startup
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
