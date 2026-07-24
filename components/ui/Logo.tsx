export default function Logo({ reversed = false }: { reversed?: boolean }) {
  return (
    <span className="font-heading text-[22px] font-extrabold lowercase leading-none tracking-tight">
      <span className={reversed ? 'text-white' : 'text-ink'}>find</span>
      <span className="text-green">investors</span>
    </span>
  );
}
