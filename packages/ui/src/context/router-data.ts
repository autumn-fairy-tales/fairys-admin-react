import type { DataRouter, NavigateFunction, To, NavigateOptions } from 'react-router';

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
}
/**路由使用实例*/
export const routerDataInstance = new RouterDataInstance();
