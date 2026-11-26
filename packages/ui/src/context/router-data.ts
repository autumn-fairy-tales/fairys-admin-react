import type {
  DataRouter,
  NavigateFunction,
  To,
  NavigateOptions,
  RouteObject,
  DOMRouterOpts,
  MemoryRouterOpts,
} from 'react-router';
import { createBrowserRouter, createMemoryRouter, createHashRouter } from 'react-router';
import { FairysAliveRoute } from './alive-route';

/**在路由树最外层注入缓存作用域，使缓存节点仍在 RouterProvider 内*/
const withAliveScope = (routes: RouteObject[]): RouteObject[] => {
  return [{ Component: FairysAliveRoute, children: routes }];
};

export class RouterDataInstance {
  router: DataRouter | undefined = undefined;
  /**由 create*Router 创建的路由已注入 AliveScope 路由*/
  private managedRouters = new WeakSet<DataRouter>();
  /**从root挂载的数据*/
  __navigate: NavigateFunction;
  /**跳转前回调*/
  onNavigateBefore: (to: To, next: (to?: To, options?: NavigateOptions) => void) => Promise<boolean>;

  /**路由是否由 create*Router 创建（已内置 AliveScope）*/
  isManagedRouter = (router: DataRouter) => this.managedRouters.has(router);

  /**内置跳转方法*/
  navigate = async (to: To | number, options?: NavigateOptions) => {
    const navigate = this.__navigate || this.router?.navigate;
    if (!navigate) {
      console.warn('请先初始化路由');
      return Promise.resolve();
    }
    if (typeof to === 'number') {
      return navigate?.(to);
    }
    let isNavigate = true;
    if (this.onNavigateBefore) {
      isNavigate = await this.onNavigateBefore(to, (_newTo = to, _options = options) => {
        if (_newTo !== null) navigate?.(_newTo, _options);
      });
    }
    if (isNavigate) {
      return navigate?.(to, options);
    }
    return Promise.resolve();
  };

  createBrowserRouter = (routes: RouteObject[], opts?: DOMRouterOpts) => {
    const router = createBrowserRouter(withAliveScope(routes), opts);
    this.managedRouters.add(router);
    this.__navigate = router.navigate;
    router.navigate = this.navigate;
    this.router = router;
    return router;
  };

  createMemoryRouter = (routes: RouteObject[], opts?: MemoryRouterOpts) => {
    const router = createMemoryRouter(withAliveScope(routes), opts);
    this.managedRouters.add(router);
    this.__navigate = router.navigate;
    router.navigate = this.navigate;
    this.router = router;
    return router;
  };

  createHashRouter = (routes: RouteObject[], opts?: DOMRouterOpts) => {
    const router = createHashRouter(withAliveScope(routes), opts);
    this.managedRouters.add(router);
    this.__navigate = router.navigate;
    router.navigate = this.navigate;
    this.router = router;
    return router;
  };
  /**清空路由实例*/
  clear = () => {
    this.router = undefined;
    this.__navigate = undefined;
  };
}
/**路由使用实例*/
export const routerDataInstance = new RouterDataInstance();
