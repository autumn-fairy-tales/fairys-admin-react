import type { Compiler } from '@rspack/core';
import chokidar, { FSWatcher } from 'chokidar';
import path from 'path';
import FS from 'fs-extra';
import {
  defaultCode,
  indexCode,
  keepAliveBasePathCode,
  keepAliveBasePathIndexCode,
  keepAliveBasePathLazyCode,
  layoutCode,
  lazyCode,
} from './code';

export interface WatchDirsItem {
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

  /**
   * @description 保持路由组件的 HOC 函数
   */
  keepAliveBasePath?: string;
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
   * @description 插件上下文地址
   */
  context: string = '';

  static convertIdOrNameOne = (value: string) => {
    return `fairys_admin_keep_alive_${value}`;
  };

  constructor(options: ReactRoutesPluginOptions = {}) {
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

  // 是否是 tsconfig.json 文件
  #isTsConfigFile() {
    const _filePath = path.resolve(this.context, 'tsconfig.json');
    return FS.existsSync(_filePath);
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
    const list = [...routeGroups.values()].sort((a, b) => {
      return a.layout?.path?.localeCompare(b.layout?.path || '') || 0;
    });
    let routes: string = '';
    const isTs = this.#isTsConfigFile();
    if (isTs) {
      importString += `import type { RouteObject } from 'react-router';\n`;
    }
    if (this.config.keepAliveBasePath) {
      importString += `import KeepAliveBaseHOC from '${this.config.keepAliveBasePath}';\n`;
    }
    for (const groupItem of list) {
      const pages = groupItem.pages;
      const layout = groupItem.layout;
      // 对页面进行排序，确保根路由在最前面
      const _pages = pages.sort((a, b) => {
        return a.path.localeCompare(b.path);
      });
      let _route = '';
      for (let index = 0; index < _pages.length; index++) {
        const element = _pages[index];
        if (element.path === element.routePrefix) {
          // 根路由
          importString = `import ${element.componentName} from '${element.component}';\n` + importString;
          if (this.config.keepAliveBasePath) {
            _route = keepAliveBasePathIndexCode(element) + _route;
          } else {
            _route = indexCode(element) + _route;
          }
        } else {
          if (this.config.loadType === 'lazy') {
            if (this.config.keepAliveBasePath) {
              _route += keepAliveBasePathLazyCode(element, isTs);
            } else {
              _route += lazyCode(element);
            }
          } else {
            importString += `import ${element.componentName} from '${element.component}';\n`;
            if (this.config.keepAliveBasePath) {
              _route += keepAliveBasePathCode(element);
            } else {
              _route += defaultCode(element);
            }
          }
        }
      }
      if (layout) {
        _route = layoutCode(layout, _route);
      }
      routes += _route;
    }

    if (isTs) {
      return `${importString}\nconst routes: RouteObject[] = [\n${routes}];\nexport default routes;`;
    }
    return `${importString}\nconst routes = [\n${routes}];\nexport default routes;`;
  };

  /**生成树路由*/
  #createTreeRoute = () => {};

  /**生成虚拟路由文件*/
  #createVirtualFile = () => {
    // 路由列表
    const _routeS = this.#createFlatRoute();
    let _filePath = path.resolve(this.context, 'src/.fairys/routes.ts');
    if (!this.#isTsConfigFile()) {
      _filePath = path.resolve(this.context, 'src/.fairys/routes.js');
    }
    FS.ensureFileSync(_filePath);
    FS.writeFileSync(_filePath, _routeS, 'utf-8');
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
    const isLayout = link.endsWith('layout.tsx') || link.endsWith('layout.jsx') || link.endsWith('layout.js');

    this.routes.set(link, {
      path: '/' + _routePath,
      component: componentPath,
      componentName,
      routePrefix: dirItem.routePrefix,
      isLayout,
    });
  };

  /**新增路由*/
  #addPath = (link: string) => {
    this.#createRoute(link);
    this.#createVirtualFile();
  };

  /**删除路由*/
  #removePath = (link: string) => {
    this.routes.delete(link);
    this.#createVirtualFile();
  };

  /**监听实例*/
  watcher: FSWatcher | null = null;

  /**监听文件*/
  watch = () => {
    const watchDirs = this.config.watchDirs || [];
    const watchDirsPaths = watchDirs.map((item) => {
      const _filePath = path.resolve(this.context, item.dir);
      return _filePath;
    });
    this.watcher = chokidar.watch(watchDirsPaths, {
      cwd: this.context,
      ignored: (link, stats) => {
        if (stats?.isFile()) {
          const f = path.basename(link);
          return !this.#isRouteFile(f);
        }
        return false;
      },
    });
    this.watcher.on('add', (path) => {
      // console.log('add', path);
      this.#addPath(path);
    });
    this.watcher.on('unlink', (path) => {
      // console.log('unlink', path);
      this.#removePath(path);
    });
  };

  closeWatch = () => {
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
    }
  };

  apply(compiler: Compiler) {
    this.context = compiler.context;
    compiler.options.resolve.alias = {
      ...compiler.options.resolve.alias,
      '@fairys:routes': path.resolve(this.context, 'src/.fairys/routes'),
      '@@': path.resolve(this.context, 'src/.fairys'),
    };
    compiler.hooks.afterPlugins.tap('FairysVirtualReactRoutesPlugin', () => {
      this.watch();
    });
    // 监听关闭事件
    compiler.hooks.shutdown.tap('FairysVirtualReactRoutesPlugin', () => {
      this.closeWatch();
    });
  }
}
