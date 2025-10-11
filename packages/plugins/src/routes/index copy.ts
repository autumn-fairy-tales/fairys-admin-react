import type { Compiler } from '@rspack/core';
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
  /**
   * @description 路由前缀
   */
  routePrefix?: string;
  /**
   * @description 是否是布局文件
   */
  isLayout?: boolean;
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
    if (!this.config.watchDirs) {
      this.config.watchDirs = [{ dir: 'src/pages', routePrefix: '/' }];
    }
    this.config.watchDirs = [...this.config.watchDirs].map((item) => ({
      dir: item.dir.replace(/^\//, '').replace(/\/$/, ''),
      routePrefix: item.routePrefix?.replace(/^\//, '').replace(/\/$/, '') || '/',
    }));
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
    return (
      f === 'page.tsx' ||
      f === 'page.jsx' ||
      f === 'page.js' ||
      f === 'layout.tsx' ||
      f === 'layout.jsx' ||
      f === 'layout.js'
    );
  }

  // 对数据进行分组，布局和页面两个部分
  #groupRouteLayout = () => {
    // 通过 routePrefix 进行分组
    // 在每一组，区分布局和页面
    const routeGroups = new Map<string, { layout?: RouteItem; pages: RouteItem[] }>();
    // 遍历路由列表，进行分组
    for (const route of this.routes.values()) {
      const routePrefix = route.routePrefix || '/';
      if (!routeGroups.has(routePrefix)) {
        routeGroups.set(routePrefix, { layout: undefined, pages: [] });
      }
      const group = routeGroups.get(routePrefix)!;
      if (route.isLayout) {
        group.layout = route;
      } else {
        group.pages.push(route);
      }
    }
    return routeGroups;
  };

  /**生成扁平化路由*/
  #createFlatRoute = () => {
    const routeGroups = this.#groupRouteLayout();
    let importString = '';
    const list = [...routeGroups.values()];
    let routes: string = '';
    for (const groupItem of list) {
      const pages = groupItem.pages;
      const layout = groupItem.layout;
      let _route = '';
      for (let index = 0; index < pages.length; index++) {
        const element = pages[index];
        if (element.path === element.routePrefix) {
          // 根路由
          importString = `import ${element.componentName} from '${element.component}';\n` + importString;
          _route = `{index:true, path:'${element.path}',Component:${element.componentName}},\n` + _route;
        } else {
          if (this.config.loadType === 'lazy') {
            _route += `{path:'${element.path}',lazy:() => import('${element.component}')},\n`;
          } else {
            importString += `import ${element.componentName} from '${element.component}';\n`;
            _route += `{path:'${element.path}',Component:${element.componentName}},\n`;
          }
        }
      }
      if (layout) {
        _route = `{path:'${layout.routePrefix}',Component:${layout.componentName},children:[${_route}]},\n`;
      }
      routes += _route;
    }
    return `${importString}\nconst routes = [${routes}];\nexport default routes;`;
  };

  /**生成树路由*/
  #createTreeRoute = () => {};

  _temp_routes_contents = '';

  /**生成虚拟路由文件*/
  #createVirtualFile = (compiler: Compiler) => {
    // 路由列表
    const _routeS = this.#createFlatRoute();
    const _filePath = path.resolve(compiler.context, 'src/fairys-routes');
    this.virtualModulesPlugin.writeModule(_filePath, _routeS);
    this._temp_routes_contents = _routeS;
  };

  /**创建路由*/
  #createRoute = (link: string) => {
    /**创建路由项*/
    let dirItem = this.config.watchDirs?.find((item) => {
      return link.startsWith(item.dir + '/');
    });
    if (!dirItem) {
      dirItem = {
        dir: 'src/pages',
        routePrefix: '/',
      };
    }
    // 路由地址
    const routePath = link.replace(dirItem.dir, dirItem.routePrefix || '/').replace(/\/page\.(tsx|jsx|js)$/, '');
    const _routePath = routePath.replace(/^\//, '').replace(/^\//, '');
    // 组件地址
    const componentPath = link
      .replace(/^\//, '')
      .replace('src/', '@/')
      .replace(/\.(tsx|jsx|js)$/, '');
    /**组件名称*/
    const componentName = link
      .replace(/\.(tsx|jsx|js)$/, '')
      .split(path.sep)
      .join('_')
      .toUpperCase();

    /**是否是布局文件*/
    const isLayout = link.endsWith('.layout.tsx') || link.endsWith('.layout.jsx') || link.endsWith('.layout.js');

    this.routes.set(link, {
      path: '/' + _routePath,
      component: componentPath,
      componentName,
      routePrefix: dirItem.routePrefix,
      isLayout,
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
    const watchDirs = this.config.watchDirs || [];
    const watchDirsPaths = watchDirs.map((item) => {
      const _filePath = path.resolve(compiler.context, item.dir);
      return _filePath;
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
      console.log('add', path);
      this.#addPath(path, compiler);
    });
    this.watcher.on('unlink', (path) => {
      console.log('unlink', path);
      this.#removePath(path, compiler);
    });
  };
  apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap('FairysVirtualReactRoutesPlugin', () => {
      // 不能使用，需要使用 thisCompilation 事件，每次变更的时候重新生成，不然内容更新，路由不做更新
      if (!this.watcher) {
        this.#watch(compiler);
      }
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
