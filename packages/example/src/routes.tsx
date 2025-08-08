import { createBrowserRouter } from 'react-router';
import type { RouteObject } from 'react-router';
import Home from './pages';
import { Layout, routerDataInstance } from '@fairys/admin-tools-react';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
    ],
  },
];

export const router = (routerDataInstance.router = createBrowserRouter(routes));
