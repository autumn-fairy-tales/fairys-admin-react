import type { RouteObject } from 'react-router';
// import Home from './pages/page';
// import List from './pages/list/page';
// import Detail from './pages/detail/page';
// import About from './pages/about/page';
// import { Layout } from '@fairys/admin-tools-react';
// import routevirtual from '@virtual:fairys/routes';
// @ts-ignore
// import routevirtual from '@/fairys-routes';
// console.log('routevirtual', routevirtual);
// import r from '@fairys:routes';

import routesData from '@/.fairys/routes';
console.log('routesData', routesData);

export const routes: RouteObject[] = [
  ...routesData,
  // {
  //   path: '/',
  //   Component: Layout,
  //   children: [
  //     // ...routesData,
  //     {
  //       index: true,
  //       path: '/',
  //       Component: Home,
  //     },
  //     {
  //       path: '/list',
  //       // Component: List,
  //       lazy: () => import('@/pages/list/page'),
  //     },
  //     {
  //       path: '/detail',
  //       // Component: Detail,
  //       lazy: () => import('./pages/detail/page'),
  //     },
  //     {
  //       path: '/about',
  //       // Component: About,
  //       lazy: () => import('./pages/about/page'),
  //     },
  //     {
  //       path: '/lazy',
  //       lazy: () => import('./pages/lazy/page'),
  //     },
  //     {
  //       path: '/laz2',
  //       children: [
  //         {
  //           path: '/laz2/1',
  //           children: [
  //             {
  //               path: '/laz2/1',
  //               lazy: () => import('./pages/lazy/page'),
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       path: '*',
  //       element: <div>404</div>,
  //     },
  //   ],
  // },
];
