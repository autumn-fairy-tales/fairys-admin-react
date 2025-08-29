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

class RouterDataInstance {
  router: DataRouter | undefined = undefined;
  /**从root挂载的数据*/
  __navigate: NavigateFunction;
  /**跳转前回调*/
  onNavigateBefore: (to: To) => Promise<boolean>;

  /**内置跳转方法*/
  navigate = async (to: To | number, options?: NavigateOptions) => {
    const navigate = this.__navigate || this.router.navigate;
    if (!navigate) {
      console.warn('请先初始化路由');
      return Promise.resolve();
    }
    if (typeof to === 'number') {
      return navigate?.(to);
    }
    let isNavigate = true;
    if (this.onNavigateBefore) {
      isNavigate = await this.onNavigateBefore(to);
    }
    if (isNavigate) {
      return navigate?.(to, options);
    }
    return Promise.resolve();
  };

  createBrowserRouter = (routes: RouteObject[], opts?: DOMRouterOpts) => {
    const router = createBrowserRouter(routes, opts);
    this.__navigate = router.navigate;
    router.navigate = this.navigate;
    this.router = router;
    return router;
  };

  createMemoryRouter = (routes: RouteObject[], opts?: MemoryRouterOpts) => {
    const router = createMemoryRouter(routes, opts);
    this.__navigate = router.navigate;
    router.navigate = this.navigate;
    this.router = router;
    return router;
  };

  createHashRouter = (routes: RouteObject[], opts?: DOMRouterOpts) => {
    const router = createHashRouter(routes, opts);
    this.__navigate = router.navigate;
    router.navigate = this.navigate;
    this.router = router;
    return router;
  };
  /**清空tab项*/
  clear = () => {};
}
/**路由使用实例*/
export const routerDataInstance = new RouterDataInstance();
