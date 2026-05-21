import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import FullPageLoader from '@/components/loaders/FullPageLoader';

// Lazy load page components for optimal load performance
const Home = React.lazy(() => import('../pages/Home'));
const Login = React.lazy(() => import('../pages/Login'));
const Signup = React.lazy(() => import('../pages/Signup'));
const Portfolio = React.lazy(() => import('../pages/Portfolio'));
const Verify = React.lazy(() => import('../pages/Verify'));
const Messages = React.lazy(() => import('../pages/Messages'));
const NotFound = React.lazy(() => import('../pages/NotFound'));


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: 'portfolio',
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Portfolio />
          </Suspense>
        )
      },
      {
        path: 'messages',
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Messages />
          </Suspense>
        )
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Login />
          </Suspense>
        )
      },
      {
        path: 'signup',
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Signup />
          </Suspense>
        )
      },
      {
        path: 'verify',
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Verify />
          </Suspense>
        )
      },
      {
        path: '404',
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <NotFound />
          </Suspense>
        )
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />
      }
    ]
  }
]);
export default router;
