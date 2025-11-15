import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MainLayout } from '../components/Layout/MainLayout';
import { LandingPage } from '../features/landing/components/LandingPage';
import { PhishingTestPage } from '../features/phishing/components/PhishingTestPage';
import { PasswordTestPage } from '../features/password/components/PasswordTestPage';
import { IncidentTestPage } from '../features/incident/components/IncidentTestPage';
import { ResultsPage } from '../features/results/components/ResultsPage';

// On définit toutes les routes de notre application
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // Le layout principal s'applique à toutes les routes enfants
    children: [
      {
        index: true, // La page par défaut (quand on est sur '/')
        element: <LandingPage />,
      },
      {
        path: 'test/phishing',
        element: <PhishingTestPage />,
      },
      {
        path: 'test/password',
        element: <PasswordTestPage />,
      },
      {
        path: 'test/incident',
        element: <IncidentTestPage />,
      },
      {
        path: 'results',
        element: <ResultsPage />,
      },
    ],
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};