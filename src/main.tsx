import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';


import { createBrowserRouter,  RouterProvider } from 'react-router-dom';
import AppLayout from './routes/App';
import Home from './routes/Home';
import Picks from './routes/Picks';

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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
