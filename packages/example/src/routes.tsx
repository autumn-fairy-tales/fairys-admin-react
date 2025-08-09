import { createBrowserRouter } from 'react-router';
import type { RouteObject } from 'react-router';
import Home from './pages';
import List from './pages/list';
import Detail from './pages/detail';
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
      {
        path: '/list',
        element: <List />,
      },
      {
        path: '/detail',
        element: <Detail />,
      },
    ],
  },
];

export const router = (routerDataInstance.router = createBrowserRouter(routes));
