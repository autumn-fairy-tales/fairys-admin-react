import { createBrowserRouter } from 'react-router';
import type { RouteObject } from 'react-router';
import Home from './pages';
import List from './pages/list';
import Detail from './pages/detail';
import { Layout } from '@fairys/admin-tools-react';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        path: '/',
        Component: Home,
      },
      {
        path: '/list',
        Component: List,
      },
      {
        path: '/detail',
        Component: Detail,
      },
      {
        path: '*',
        element: <div>404</div>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
