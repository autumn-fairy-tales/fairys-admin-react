import type { RouteItem } from './plugin';

export const convertIdOrNameOne = (value: string) => {
  return `fairys_admin_keep_alive_${value}`;
};

export const keepAliveBasePathIndexCode = (element: RouteItem) => `
  {
    index: true,
    path: '${element.path}', 
    Component: KeepAliveBaseHOC(${element.componentName}, '${convertIdOrNameOne(element.path)}')
  },
`;

export const indexCode = (element: RouteItem) => `
  {
    index: true,
    path: '${element.path}', 
    Component: ${element.componentName}
  },
`;

export const keepAliveBasePathLazyCode = (element: RouteItem, isTs: boolean) => `
  {
    path: '${element.path}',
    lazy: async () => {
      const data${isTs ? ' :any' : ''} = await import('${element.component}');
      return { ...data, Component: KeepAliveBaseHOC(data.Component || data.element, '${convertIdOrNameOne(
        element.path,
      )}') }
    }
  },
`;

export const lazyCode = (element: RouteItem) => `
  {
    path: '${element.path}',
    lazy: () => import('${element.component}'),
  },
`;

export const keepAliveBasePathCode = (element: RouteItem) => `
  {
    path: '${element.path}',
    Component: KeepAliveBaseHOC(${element.componentName}, '${convertIdOrNameOne(element.path)}')
  },
`;
export const defaultCode = (element: RouteItem) => `
  {
    path: '${element.path}',
    Component: ${element.componentName}
  },
`;
export const layoutCode = (element: RouteItem, _route: string) => `
  {
    path: '${element.routePrefix}', 
    Component: ${element.componentName}, 
    children: [
      ${_route}
    ]
  },
`;
