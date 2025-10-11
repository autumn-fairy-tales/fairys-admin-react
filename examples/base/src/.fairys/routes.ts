import SRC_PAGES_PAGE from '@/pages/page';
import KeepAliveBaseHOC from '@fairys/admin-tools-react/lib/components/keep-alive';

const routes = [
  { index: true, path: '/', Component: SRC_PAGES_PAGE },
  {
    path: '/about',
    lazy: async () => {
      const data = await import('@/pages/about/page');
      return { ...data, Component: KeepAliveBaseHOC(data.Component || data.element, 'fairys_admin_keep_alive_/about') };
    },
  },
  {
    path: '/home',
    lazy: async () => {
      const data = await import('@/pages/home/page');
      return { ...data, Component: KeepAliveBaseHOC(data.Component || data.element, 'fairys_admin_keep_alive_/home') };
    },
  },
  {
    path: '/detail',
    lazy: async () => {
      const data = await import('@/pages/detail/page');
      return {
        ...data,
        Component: KeepAliveBaseHOC(data.Component || data.element, 'fairys_admin_keep_alive_/detail'),
      };
    },
  },
  {
    path: '/lazy',
    lazy: async () => {
      const data = await import('@/pages/lazy/page');
      return { ...data, Component: KeepAliveBaseHOC(data.Component || data.element, 'fairys_admin_keep_alive_/lazy') };
    },
  },
  {
    path: '/list',
    lazy: async () => {
      const data = await import('@/pages/list/page');
      return { ...data, Component: KeepAliveBaseHOC(data.Component || data.element, 'fairys_admin_keep_alive_/list') };
    },
  },
  {
    path: '/test',
    lazy: async () => {
      const data = await import('@/pages/test/page');
      return { ...data, Component: KeepAliveBaseHOC(data.Component || data.element, 'fairys_admin_keep_alive_/test') };
    },
  },
  {
    path: '/home/aaa',
    lazy: async () => {
      const data = await import('@/pages/home/aaa/page');
      return {
        ...data,
        Component: KeepAliveBaseHOC(data.Component || data.element, 'fairys_admin_keep_alive_/home/aaa'),
      };
    },
  },
  {
    path: '/home/aaa copy',
    lazy: async () => {
      const data = await import('@/pages/home/aaa copy/page');
      return {
        ...data,
        Component: KeepAliveBaseHOC(data.Component || data.element, 'fairys_admin_keep_alive_/home/aaa copy'),
      };
    },
  },
  {
    path: '/home/dd',
    lazy: async () => {
      const data = await import('@/pages/home/dd/page');
      return {
        ...data,
        Component: KeepAliveBaseHOC(data.Component || data.element, 'fairys_admin_keep_alive_/home/dd'),
      };
    },
  },
];
export default routes;
