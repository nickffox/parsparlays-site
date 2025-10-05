import { usePicks } from "../app/usePicks";

export default function Picks() {

  const { data: picks, error, loading } = usePicks();

  // Map a pick result to a Tailwind background/border class
  const resultClass = (res?: string) => {
    const r = (res ?? '').toLowerCase();
    if (r === 'win') return 'bg-green-50 border border-green-200 rounded-md';
    if (r === 'loss') return 'bg-red-50 border border-red-200 rounded-md';
    // pending / unspecified
    return 'bg-white border border-neutral-200 rounded-md';
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">Loading…</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <div className="rounded-2xl border bg-white p-6 shadow-sm text-red-600">
          Error: {String(error)}
        </div>
      </main>
    );
  }

  if (!picks || picks.length === 0) {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Picks</h2>
          <p className="mt-2 text-neutral-600">No rows found.</p>
          <p className="mt-2 text-sm text-neutral-500">
            Tip: check your sheet is published as CSV and that column names match the adapter.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Picks ({picks.length})</h2>

        <ul className="mt-4 space-y-2">
          {/* <ul className="mt-4 divide-y"> */}
          {picks.map((p) => (
            <li key={p.id} className={`py-3 px-3 ${resultClass(p.result)}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-neutral-600">
                  {p.sport}
                  {/* {p.league ? ` • ${p.league}` : ''} • {p.betType} */}
                  {/* {p.odds != null ? ` • ${p.odds}` : ''} */}
                </div>
              </div>
              <div className="text-xs text-neutral-500">Picked by {p.picker}</div>
              <div className="text-xs text-neutral-500">{p.date} • {p.result}</div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}


