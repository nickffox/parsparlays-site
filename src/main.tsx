import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';


import { createBrowserRouter,  RouterProvider } from 'react-router-dom';
import AppLayout from './routes/App';
import Home from './routes/Home';
import Picks from './routes/Picks';

import { DataProvider } from './app/DataProvider';
import { CsvPicksRepository } from './data/CsvPicksRepository';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> }, 
      { path: 'picks', element: <Picks /> }
    ],
  }
]);

// Vite exposes env starting with VITE_
const CSV_URL = import.meta.env.VITE_PICKS_CSV_URL as string | undefined;

if (!CSV_URL) {
  // Early warning in dev; avoids mysterious fetch errors later
  // eslint-disable-next-line no-console
  console.warn('VITE_PICKS_CSV_URL is not set. Add it to .env.local before loading picks.');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataProvider repo={new CsvPicksRepository(CSV_URL ?? '/picks.csv')}>
      <RouterProvider router={router} />
    </DataProvider>
  </StrictMode>,
);
