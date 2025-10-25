import type { Compiler } from '@rspack/core';
import chokidar, { FSWatcher } from 'chokidar';
import path from 'path';
import FS from 'fs-extra';
import {
  defaultCode,
  HydrateFallbackCode,
  indexCode,
  keepAliveBasePathCode,
  keepAliveBasePathIndexCode,
  keepAliveBasePathLazyCode,
  layoutCode,
  lazyCode,
  pathTransformation,
} from './code';
import type { ReactRoutesPluginOptions, RouteItem } from './interface';
import { TreeRoutes } from './tree';
export * from './interface';

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
  /**
   * @description 路由文件内容
   */
  routeFileContent: string = 'const routes = [];\nexport default routes;';
  /**
   * @description 树路由列表
   */
  treeRoutes: TreeRoutes = new TreeRoutes();

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
      routePrefix: '/' + (item.routePrefix.replace(/^\//, '').replace(/\/$/, '') || ''),
    }));
    const findx = this.config.watchDirs.find((item) => item.dir === 'src/pages');
    const findx2 = this.config.watchDirs.find((item) => item.routePrefix === '/');
    if (!findx && !findx2) {
      this.config.watchDirs.push({ dir: 'src/pages', routePrefix: '/' });
    }
    this.treeRoutes = new TreeRoutes();
    this.treeRoutes.watchDirs = this.config.watchDirs;
    this.treeRoutes.keepAliveBasePath = this.config.keepAliveBasePath;
    this.treeRoutes.loadType = this.config.loadType;
    this.treeRoutes.hydrateFallback = this.config.hydrateFallback;
    this.treeRoutes.isTs = this.#isTsConfigFile();
  }

  /**
   * @description 是否是路由文件
   * @param f 文件名
   * @returns 是否是路由文件
   */
  #isRouteFile(f: string) {
    /**
     * 判断文件
     * 1. page.{js,tsx,jsx}
     * 2. layout.{js,tsx,jsx}
     * 3. [x].page.{js,tsx,jsx}
     * 4. 特殊页面 404/403/500/*.{js,tsx,jsx}
     */
    return /^(?:(?:.+\/)?(?:page|layout)\.(?:js|tsx|jsx)|(?:.+\/)?\[[^\]]*\]\.page\.(?:js|tsx|jsx)|(?:.+\/)?(404|403|500|\*)\.(?:js|tsx|jsx))$/.test(
      f,
    );
  }

  /**是否是 tsconfig.json 文件*/
  #isTsConfigFile() {
    const _filePath = path.resolve(this.context, 'tsconfig.json');
    return FS.existsSync(_filePath);
  }

  /**对数据进行分组，布局和页面两个部分*/
  #groupRouteLayout = () => {
    // 通过 routePrefix 进行分组
    // 在每一组，区分布局和页面
    const routeGroups = new Map<string, { layout?: RouteItem; pages: RouteItem[] }>();
    const list = [...this.routes.values()].sort((a, b) => {
      return a?.path?.localeCompare(b.path || '') || 0;
    });
    // 遍历路由列表，进行分组
    for (const route of list) {
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
      return a.layout?.routePrefix?.localeCompare(b.layout?.routePrefix || '') || 0;
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
          if (this.config.loadType === 'lazy' && !/(404|403|500|\*)$/.test(element.path)) {
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
        importString += `import ${layout.componentName} from '${layout.component}';\n`;
        _route = layoutCode(layout, _route);
      }
      routes += _route;
    }

    if (this.config.hydrateFallback) {
      importString += `import HydrateFallback from '${this.config.hydrateFallback}';\n`;
    } else {
      importString += '\n' + HydrateFallbackCode;
    }
    if (isTs) {
      return `${importString}\nconst routes: RouteObject[] = [\n${routes}];\nexport default routes;`;
    }
    return `${importString}\nconst routes = [\n${routes}];\nexport default routes;`;
  };

  /**创建路由文件*/
  #createRouteFile = () => {
    let _filePath = path.resolve(this.context, 'src/.fairys/routes.tsx');
    if (!this.#isTsConfigFile()) {
      _filePath = path.resolve(this.context, 'src/.fairys/routes.jsx');
    }
    FS.ensureFileSync(_filePath);
    FS.writeFileSync(_filePath, this.routeFileContent, 'utf-8');
  };

  /**生成虚拟路由文件*/
  #createVirtualFile = () => {
    /**路由*/
    let _routeS = '';
    if (this.config.isTreeRoute) {
      this.treeRoutes.isTs = this.#isTsConfigFile();
      _routeS = this.treeRoutes.toString();
    } else {
      _routeS = this.#createFlatRoute();
    }
    this.routeFileContent = _routeS;
    this.#createRouteFile();
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
    const routePath = link
      .replace(dirItem.dir, dirItem.routePrefix || '/')
      .replace(/\/page\.(tsx|jsx|js)$/, '')
      .replace(/\.page\.(tsx|jsx|js)$/, '')
      .replace(/\.(tsx|jsx|js)$/, '');

    const _routePath = routePath.replace(/^\//, '').replace(/^\//, '').replace(/\[/g, ':').replace(/\]/g, '');

    // 组件地址
    const componentPath = link
      .replace(/^\//, '')
      .replace('src/', '@/')
      .replace(/\.(tsx|jsx|js)$/, '');
    /**组件名称*/
    const componentName = link
      .replace(/\.(tsx|jsx|js)$/, '')
      .replace(/\./, '_')
      .split('/')
      .join('_')
      .replace(/\*/g, '__')
      .replace(/[\s\t\r\n\f]/g, '___')
      .toUpperCase();
    /**是否是布局文件*/
    const isLayout = link.endsWith('layout.tsx') || link.endsWith('layout.jsx') || link.endsWith('layout.js');

    this.routes.set(link, {
      path: '/' + _routePath,
      component: componentPath,
      componentName: `FAIRYS_${componentName}`,
      routePrefix: dirItem.routePrefix,
      isLayout,
    });
  };

  /**新增路由*/
  #addPath = (link: string) => {
    const _link = pathTransformation(link);
    if (this.config.isTreeRoute) {
      this.treeRoutes.add(_link);
    } else {
      this.#createRoute(_link);
    }
    this.#createVirtualFile();
  };

  /**删除路由*/
  #removePath = (link: string) => {
    const _link = pathTransformation(link);
    if (this.config.isTreeRoute) {
      this.treeRoutes.remove(_link);
    } else {
      this.routes.delete(_link);
    }
    this.#createVirtualFile();
  };

  /**监听实例*/
  watcher: FSWatcher | null = null;

  /**监听文件*/
  watch = () => {
    /**创建空路由文件*/
    this.#createRouteFile();
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
