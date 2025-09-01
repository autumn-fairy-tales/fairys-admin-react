import type { RouteObject } from 'react-router';
import Home from './pages';
import List from './pages/list';
import Detail from './pages/detail';
import About from './pages/about';
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
        path: '/about',
        Component: About,
      },
      {
        path: '*',
        element: <div>404</div>,
      },
    ],
  },
];
