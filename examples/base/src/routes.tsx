import type { RouteObject } from 'react-router';
// import Home from './pages/page';
// import List from './pages/list/page';
// import Detail from './pages/detail/page';
// import About from './pages/about/page';
import { Layout } from '@fairys/admin-tools-react';
import routevirtual from '@virtual:fairys/routes';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      ...routevirtual,
      // {
      //   path: '/about2',
      //   Component: About,
      // },
      // {
      //   index: true,
      //   path: '/',
      //   Component: Home,
      // },
      // {
      //   path: '/list',
      //   Component: List,
      // },
      // {
      //   path: '/detail',
      //   Component: Detail,
      // },
      // {
      //   path: '/about',
      //   Component: About,
      // },
      // {
      //   path: '/lazy',
      //   lazy: () => import('./pages/lazy/page'),
      // },
      {
        path: '*',
        element: <div>404</div>,
      },
    ],
  },
];
