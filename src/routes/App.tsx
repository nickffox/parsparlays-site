import { NavLink, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Par&apos;s Parlays</h1>
          <nav className="flex gap-4 text-sm">
            <NavLink to="/" className="underline hover:no-underline" end>
              Home
            </NavLink>
            <NavLink to="/picks" className="underline hover:no-underline">
              Picks
            </NavLink>
          </nav>  
        </div>
      </header>

      {/* Child routes render here */}
      <Outlet />
    </div>
  );
}