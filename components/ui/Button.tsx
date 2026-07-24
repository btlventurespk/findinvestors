import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost';

const styles: Record<Variant, string> = {
  primary:
    'bg-green text-ink hover:bg-green-deep hover:text-white focus-visible:ring-green-deep',
  secondary:
    'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white focus-visible:ring-ink',
  ghost: 'text-ink hover:text-green-deep focus-visible:ring-ink',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-heading text-[15px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

export default function Button({
  href,
  variant = 'primary',
  className = '',
  children,
  ...props
}: {
  href?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
