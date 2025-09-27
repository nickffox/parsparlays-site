export default function App() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">Par&apos;s Parlays</h1>
          <nav className="text-sm">
            <a href="/" className="underline hover:no-underline">
              Home
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl p-6">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Tailwind v4 is live ✅</h2>
          <p className="mt-2 text-neutral-600">
            Utilities here control spacing, typography, borders, and color.
          </p>

          <div className="mt-4 flex gap-3">
            <button className="bg-brand-500 hover:bg-brand-600 rounded-xl px-4 py-2 text-white active:translate-y-px">
              Primary Action
            </button>
            <button className="rounded-xl border px-4 py-2 hover:bg-neutral-50">Secondary</button>
          </div>
        </div>
      </section>
    </main>
  );
}
