export default function Pill({
  children,
  tone = 'default',
}: {
  children: React.ReactNode;
  tone?: 'default' | 'green';
}) {
  const tones = {
    default: 'bg-ink/5 text-ink',
    green: 'bg-green/15 text-green-deep',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-label font-body font-medium uppercase tracking-[0.08em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
