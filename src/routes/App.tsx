import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { loadGtag, sendPageView } from '../lib/gtag';

export default function AppLayout() {
  const location = useLocation();
  const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

  useEffect(() => {
    if (GA_ID) loadGtag(GA_ID);
  }, [GA_ID]);

  useEffect(() => {
    if (GA_ID) sendPageView();
  }, [location, GA_ID]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">

          {/* <div className="flex items-center">
            <img
              src="/src/assets/logo_small.png"
              alt="Par's Parlays Logo"
              className="inline h-8 mr-3"
            />
            <h1 className="text-xl font-bold">Par&apos;s Parlays</h1>  
          </div> */}
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