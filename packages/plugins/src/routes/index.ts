import type { RsbuildPlugin } from '@rsbuild/core';
import type { ReactRoutesPluginOptions } from './plugin';
import { ReactRoutesPlugin } from './plugin';
export * from './plugin';

export const RsbuildReactRoutesPlugin = (options: ReactRoutesPluginOptions = {}): RsbuildPlugin => {
  return {
    name: 'fairys:ReactRoutesPlugin',
    setup(api) {
      const routesPlugin = new ReactRoutesPlugin(options);
      routesPlugin.context = api.context.rootPath;

      api.modifyBundlerChain((chain) => {
        chain.resolve.alias.set('@fairys:routes', './src/.fairys/routes');
        chain.resolve.alias.set('@@routes', './src/.fairys/routes');
        // 只在开发环境和生产环境监听路由文件变化，预览环境不监听
        routesPlugin.watch();
      });
      api.onCloseBuild(() => {
        routesPlugin.closeWatch();
      });
      api.onCloseDevServer(() => {
        routesPlugin.closeWatch();
      });
    },
  };
};
