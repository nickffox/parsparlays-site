
export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="mx-auto max-w-6xl p-6">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Tailwind v4 is live ✅</h2>
          <p className="mt-2 text-neutral-600">
            Utilities here control spacing, typography, borders, and color.
          </p>

          <div className="mt-4 flex gap-3">
            <button className="rounded-xl bg-brand-500 px-4 py-2 text-white hover:bg-brand-600 active:translate-y-px">
              Primary Action
            </button>
            <button className="rounded-xl border px-4 py-2 hover:bg-neutral-50">
              Secondary
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}