type IntroRow = {
  id: string;
  startupName: string;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  createdAt: string;
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function IntroRequestsPanel({ intros }: { intros: IntroRow[] }) {
  if (intros.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/15 p-10 text-center text-body text-ink/60">
        No intro requests yet.
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-white">
      <table className="w-full min-w-[720px] text-left text-small">
        <thead>
          <tr className="border-b border-ink/10 text-label uppercase tracking-[0.08em] text-slate">
            <th className="px-5 py-3 font-medium">Startup</th>
            <th className="px-5 py-3 font-medium">Name</th>
            <th className="px-5 py-3 font-medium">Email</th>
            <th className="px-5 py-3 font-medium">Phone</th>
            <th className="px-5 py-3 font-medium">Message</th>
            <th className="px-5 py-3 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {intros.map((r) => (
            <tr key={r.id} className="border-b border-ink/5 align-top last:border-0">
              <td className="px-5 py-3 font-medium text-ink">{r.startupName}</td>
              <td className="px-5 py-3 text-ink">{r.name}</td>
              <td className="px-5 py-3">
                <a href={`mailto:${r.email}`} className="text-green-deep hover:underline">
                  {r.email}
                </a>
              </td>
              <td className="px-5 py-3 text-ink">{r.phone}</td>
              <td className="max-w-xs whitespace-pre-wrap break-words px-5 py-3 text-ink/80">
                {r.message ?? '—'}
              </td>
              <td className="px-5 py-3 text-slate">{fmtDate(r.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
