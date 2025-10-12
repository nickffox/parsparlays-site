import { useState, useMemo } from "react";
import { usePicks } from "../app/usePicks";
import WagerCard from "../components/WagerCard";

export default function Picks() {
  const [selectedPicker, setSelectedPicker] = useState<string>("all");
  const { data: picks, error, loading } = usePicks();

  // Extract unique pickers for filter options
  const uniquePickers = useMemo(() => {
    if (!picks) return [];
    const pickers = [...new Set(picks.map(pick => pick.picker))];
    return pickers.sort(); // Sort alphabetically
  }, [picks]);

  // Filter picks based on selected picker
  const filteredPicks = useMemo(() => {
    if (!picks) return [];
    if (selectedPicker === "all") return picks;
    return picks.filter(pick => pick.picker === selectedPicker);
  }, [picks, selectedPicker]);

  // // Map a pick result to a Tailwind background/border class
  // const resultClass = (res?: string) => {
  //   const r = (res ?? '').toLowerCase();
  //   if (r === 'win') return 'bg-green-50 border border-green-200 rounded-md';
  //   if (r === 'loss') return 'bg-red-50 border border-red-200 rounded-md';
  //   // pending / unspecified
  //   return 'bg-white border border-neutral-200 rounded-md';
  // }

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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Picks ({filteredPicks.length})</h2>
          
          {/* Filter dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="picker-filter" className="text-sm text-neutral-600">
              Filter by picker:
            </label>
            <select
              id="picker-filter"
              value={selectedPicker}
              onChange={(e) => setSelectedPicker(e.target.value)}
              className="rounded-md border border-neutral-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Pickers</option>
              {uniquePickers.map((picker) => (
                <option key={picker} value={picker}>
                  {picker}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          {filteredPicks.map((p) => (
            <WagerCard key={p.id} pick={p} />
          ))}
        </ul>
      </div>
    </main>
  );
}


