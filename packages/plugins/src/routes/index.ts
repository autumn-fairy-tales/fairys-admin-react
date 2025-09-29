import type { Compiler, Plugins } from '@rspack/core';
import type { VirtualModulesPlugin } from '@rspack/core/dist/VirtualModulesPlugin';
import chokidar, { FSWatcher } from 'chokidar';
import path from 'path';

interface WatchDirsItem {
  /**
   * @description 监听目录
   * @default "src/pages"
   */
  dir: string;
  /**
   * @description 路由前缀
   * @default "/"
   */
  routePrefix?: string;
}

export interface ReactRoutesPluginOptions {
  /**
   * @description 加载类型
   * @default "layout_default_lazy"
   *
   * @choices ["lazy", "default", "layout_default_lazy"]
   *
   * "lazy": 异步加载
   *
   * "default": 同步加载
   *
   * "layout_default_lazy": 布局默认加载没有其他子路由时异步加载
   */
  loadType?: 'lazy' | 'default' | 'layout_default_lazy';

  /**
   * @description 监听目录
   * @default ["src/pages"]
   */
  watchDirs?: WatchDirsItem[];
  /**
   * @description 是否根据目录结构生成树路由
   */
  isTreeRoute?: boolean;
}
export interface RouteItem {
  /**
   * @description 路由路径
   */
  path: string;
  /**
   * @description 组件路径
   */
  component: string;
  /**
   * @description 组件名称
   */
  componentName: string;
}

export class ReactRoutesPlugin {
  /**
   * @description 插件配置
   */
  config: ReactRoutesPluginOptions = {};
  /**
   * @description 路由列表
   */
  routes: Map<string, RouteItem> = new Map([]);
  /**
   * @description 虚拟模块插件
   */
  virtualModulesPlugin: VirtualModulesPlugin;

  constructor(virtualModulesPlugin: VirtualModulesPlugin, options: ReactRoutesPluginOptions = {}) {
    this.config = {
      loadType: 'layout_default_lazy',
      ...options,
    };
    if (!virtualModulesPlugin) {
      throw new Error('ReactRoutesPlugin: virtualModulesPlugin is required');
    }
    this.virtualModulesPlugin = virtualModulesPlugin;
  }

  /**
   * @description 是否是路由文件
   * @param f 文件名
   * @returns 是否是路由文件
   */
  #isRouteFile(f: string) {
    return f === 'page.tsx' || f === 'page.jsx' || f === 'page.js';
  }

  /**生成扁平化路由*/
  #createFlatRoute = () => {
    const routes = [...this.routes.values()];
    let _route: string = '';
    let importString = '';
    for (let index = 0; index < routes.length; index++) {
      const element = routes[index];
      if (element.path === '/') {
        importString = `import ${element.componentName} from '${element.component}';\n` + importString;
        _route = `{index:true, path:'${element.path}',Component:${element.componentName}},\n` + _route;
      } else {
        if (this.config.loadType === 'lazy') {
          // lazy: () => import('./pages/lazy/page'),
          _route += `{path:'${element.path}',lazy:() => import('${element.component}')},\n`;
        } else {
          _route += `{path:'${element.path}',Component:${element.componentName}},\n`;
          importString += `import ${element.componentName} from '${element.component}';\n`;
        }
      }
    }
    return `${importString}\nconst routes = [${_route}];\nexport default routes;`;
  };

  /**生成树路由*/
  #createTreeRoute = () => {};

  /**生成虚拟路由文件*/
  #createVirtualFile = (compiler: Compiler) => {
    // 路由列表
    const _routeS = this.#createFlatRoute();
    const _filePath = compiler.context.concat('/node_modules/@virtual:fairys/routes');
    this.virtualModulesPlugin.writeModule(_filePath, _routeS);
  };

  /**创建路由*/
  #createRoute = (link: string) => {
    /**创建路由项*/
    let dirItem = this.config.watchDirs?.find((item) => {
      const dir = item.dir.replace(/\//, '').replace(/\/$/, '');
      return link.startsWith(dir + '/');
    });
    if (!dirItem) {
      dirItem = {
        dir: 'src/pages',
        routePrefix: '/',
      };
    }
    // 路由前缀
    const routePrefix = (dirItem.routePrefix || '/').replace(/^\//, '');
    // 路由地址
    const routePath = link.replace(dirItem.dir, routePrefix).replace(/\/page\.(tsx|jsx|js)$/, '');
    const _routePath = routePath.replace(/^\//, '');
    // 组件地址
    const componentPath = link
      .replace(/^\//, '')
      .replace('src/', '@/')
      .replace(/\.(tsx|jsx|js)$/, '');
    /**组件名称*/
    const componentName = link
      .replace(/\/page\.(tsx|jsx|js)$/, '')
      .split(path.sep)
      .join('_')
      .toUpperCase();
    this.routes.set(link, {
      path: '/' + _routePath,
      component: componentPath,
      componentName,
    });
  };
  /**新增路由*/
  #addPath = (link: string, compiler: Compiler) => {
    this.#createRoute(link);
    this.#createVirtualFile(compiler);
  };
  /**删除路由*/
  #removePath = (link: string, compiler: Compiler) => {
    this.routes.delete(link);
    this.#createVirtualFile(compiler);
  };
  /**监听实例*/
  watcher: FSWatcher | null = null;
  /**监听文件*/
  #watch = (compiler: Compiler) => {
    const watchDirs = this.config.watchDirs || [{ dir: 'src/pages' }];
    const watchDirsPaths = watchDirs.map((item) => {
      const r = `${item.dir}`.replace(/^\//, '');
      return compiler.context.concat(`/${r}`);
    });
    this.watcher = chokidar.watch(watchDirsPaths, {
      cwd: compiler.context,
      ignored: (link, stats) => {
        if (stats?.isFile()) {
          const f = path.basename(link);
          return !this.#isRouteFile(f);
        }
        return false;
      },
    });
    this.watcher.on('add', (path) => {
      this.#addPath(path, compiler);
    });
    this.watcher.on('unlink', (path) => {
      this.#removePath(path, compiler);
    });
  };
  apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap('FairysVirtualReactRoutesPlugin', () => {
      if (!this.watcher) this.#watch(compiler);
    });
    // 监听关闭事件
    compiler.hooks.shutdown.tap('FairysVirtualReactRoutesPlugin', () => {
      if (this.watcher) {
        this.watcher.close();
        this.watcher = null;
      }
    });
  }
}
