import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';
import { ServiceReceiptPage } from './receipt/pages/ServiceReceiptPage';
import { NewServiceReceiptPage } from './receipt/pages/NewServiceReceiptPage';

const MainLayout = lazy(() => import('./receipt/layouts/MainLayout'));

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ServiceReceiptPage />,
      },
      {
        path: 'new-service-receipt',
        element: <NewServiceReceiptPage />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404 Not Found</div>,
  },
]);
