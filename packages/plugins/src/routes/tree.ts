import path from 'path';
import { WatchDirsItem } from './interface';

export const convertIdOrNameOne = (value: string) => {
  return `fairys_admin_keep_alive_${value}`;
};

export class DirsTree {
  /**目录*/
  public dir: string = '';
  /**文件路径*/
  public filePath: string = '';
  /**子目录*/
  public children: DirsTree[] = [];
  /**布局*/
  public layout?: string;
  /**特殊页面*/
  public special: string[] = [];

  /**父级实例*/
  #rootTree?: RootTree;
  /**组件路径*/
  #componentPath: string = '';
  /**组件名称*/
  #componentName: string = '';
  /**路由地址*/
  #routePath: string = '';
  get routePath() {
    return this.#routePath;
  }

  #replacePath = (link: string) => {
    const _link =
      '/' +
      link
        .split('/')
        .filter((item) => item)
        .join('/');
    // 路由地址
    const _routePath = _link
      .replace(/\/(page|layout)\.(tsx|jsx|js)$/, '')
      .replace(/\.page\.(tsx|jsx|js)$/, '')
      .replace(/^\//, '')
      .replace(/^\//, '')
      .replace(/\[/g, ':')
      .replace(/\]/g, '')
      .replace(/\.(tsx|jsx|js)$/, '');
    const _componentPath = path.join(this.#rootTree?.dir || 'src/pages', _link);
    // 组件地址
    const componentPath = _componentPath
      .replace(/^\//, '')
      .replace('src/', '@/')
      .replace(/\.(tsx|jsx|js)$/, '');

    /**组件名称*/
    const componentName = _link
      .replace(/\.(tsx|jsx|js)$/, '')
      .replace(/\./, '_')
      .split('/')
      .filter((item) => item)
      .join('_')
      .toUpperCase();

    let routePath = path.join(this.#rootTree?.routePrefix || '/', _routePath);

    if (!/^\//.test(routePath)) {
      routePath = '/' + routePath;
    }

    return {
      routePath,
      componentPath: componentPath,
      componentName: `FAIRYS_${componentName}`,
    };
  };

  /**创建路由信息*/
  #createInfo = (link: string) => {
    const result = this.#replacePath(link);
    this.#componentPath = result.componentPath;
    this.#componentName = result.componentName;
    this.#routePath = result.routePath;
  };

  /**创建路由路径*/
  #createPath = (dir: string) => {
    const _routePath = dir.replace(/^\//, '').replace(/\[/g, ':').replace(/\]/g, '');
    this.#routePath = path.join(this.#rootTree?.routePrefix || '/', _routePath);
  };

  /**创建特殊页面字符串*/
  #getSpecialPageStringify = (_indent: string = '') => {
    let importString = '';
    let routeString = '';
    const _list = Array.from(new Set([...this.special]))
      .sort()
      .reverse();
    for (let index = 0; index < _list.length; index++) {
      const element = _list[index];
      const result = this.#replacePath(element);
      importString += `import ${result.componentName} from '${result.componentPath}';\n`;
      routeString += `${_indent}{\n${_indent}\t"path": '${result.routePath}',\n${_indent}\t"Component": ${result.componentName},\n${_indent}},\n`;
    }
    return {
      importString,
      routeString,
    };
  };

  /**添加子目录*/
  addChild(dir: string, parentDir: string = '') {
    if (!this.#rootTree) {
      this.#rootTree = this;
    }
    const listDirs = dir.split('/').filter((item) => item);
    const [first, ...rest] = listDirs;
    const child = this.children.find((item) => item.dir === first);
    if (!first) {
      return;
    }
    const filePath = `${parentDir}/${first}`;
    this.#createPath(parentDir);
    if (rest.length === 1 || rest.length === 0) {
      /**还剩最后一层*/
      if (/^(?:.+\/)?(404|403|500|\*)\.(?:js|tsx|jsx)$/.test(dir)) {
        this.special.push(parentDir + '/' + listDirs.join('/'));
        return;
      } else if (/^(?:.+\/)?(layout)\.(?:js|tsx|jsx)$/.test(dir)) {
        this.layout = parentDir + '/' + listDirs.join('/');
        this.#createInfo(this.layout);
        return;
      }
    }
    if (child) {
      child.addChild(rest.join('/'), filePath);
    } else {
      const newChild = new DirsTree();
      newChild.dir = first;
      newChild.filePath = filePath;
      this.children.push(newChild);
      newChild.#rootTree = this.#rootTree;
      if (rest.length === 0) {
        newChild.#createInfo(filePath);
      }
      newChild.addChild(rest.join('/'), filePath);
    }
  }

  /**移除子目录*/
  removeChild(dir: string) {
    const listDirs = dir.split('/').filter((item) => item);
    const [first, ...rest] = listDirs;
    const child = this.children.find((item) => item.dir === first);
    if (!first) {
      return;
    }
    if (rest.length === 1) {
      this.children = this.children.filter((item) => item.dir !== first);
    } else if (child) {
      child.removeChild(rest.join('/'));
    }
  }

  /**创建路由树字符串*/
  stringify = (level: number = 0) => {
    let routeString = '';
    let importString = '';
    const lg = this.children.length;
    const _level = this.layout ? level + 1 : level;
    const _indent = '\t'.repeat(_level);

    if (lg) {
      const child = this.children.sort((a, b) => {
        return a.routePath.localeCompare(b.routePath);
      });
      for (let index = 0; index < lg; index++) {
        const element = child[index];
        const result = element.stringify(_level + 2);
        routeString += result.routeString;
        importString += result.importString;
      }
    } else {
      /**如果路由前缀和当前路由相同*/
      if (this.#routePath === this.#rootTree?.routePrefix) {
        /**使用缓存页面*/
        if (this.#rootTree?.isKeepAliveBasePath) {
          return {
            routeString: `${_indent}{ "path": "${this.#routePath}", "Component": KeepAliveBaseHOC(${
              this.#componentName
            }, "${convertIdOrNameOne(this.#routePath)}") },\n`,
            importString: `import ${this.#componentName} from '${this.#componentPath}';\n`,
          };
        }
        return {
          routeString: `${_indent}{ "index": true, "path": "${this.#routePath}", "Component": ${
            this.#componentName
          } },\n`,
          importString: `import ${this.#componentName} from '${this.#componentPath}';\n`,
        };
      }
      /**使用 layout 加载页面*/
      if (this.#rootTree?.loadType === 'lazy') {
        // 保持路由组件的 HOC 函数
        if (this.#rootTree?.isKeepAliveBasePath) {
          return {
            routeString: `${_indent}{ "path": "${this.#routePath}", "lazy": async ()=>{ const data${
              this.#rootTree.isTs ? ': any' : ''
            } = await import("${
              this.#componentPath
            }"); return { ...data, Component: KeepAliveBaseHOC(data.Component, '${convertIdOrNameOne(
              this.#routePath,
            )}') } } },\n`,
            importString: ``,
          };
        }
        return {
          routeString: `${_indent}{ "path": "${this.#routePath}", "lazy": () => import('${this.#componentPath}') },\n`,
          importString: ``,
        };
      }
      /**使用缓存页面*/
      if (this.#rootTree?.isKeepAliveBasePath) {
        return {
          routeString: `${_indent}{ "path": "${this.#routePath}", "Component": KeepAliveBaseHOC(${
            this.#componentName
          }, "${convertIdOrNameOne(this.#routePath)}") },\n`,
          importString: `import ${this.#componentName} from '${this.#componentPath}';\n`,
        };
      }
      return {
        routeString: `${_indent}{ "path": "${this.#routePath}", "Component": ${this.#componentName} },\n`,
        importString: `import ${this.#componentName} from '${this.#componentPath}';\n`,
      };
    }
    // 还需要拼接特殊页面
    if (this.special.length) {
      const specialResult = this.#getSpecialPageStringify(_indent);
      routeString += specialResult.routeString;
      importString += specialResult.importString;
    }
    if (this.layout) {
      if (routeString === '') {
        return {
          routeString: '',
          importString: '',
        };
      }
      importString += `import ${this.#componentName} from '${this.#componentPath}';\n`;
      return {
        routeString: `${_indent}{ "path": "${this.#routePath}", "Component": ${
          this.#componentName
        }, "children": [\n${routeString.replace(/,\n$/, '\n')}] },\n`,
        importString,
      };
    }
    if (routeString === '') {
      return {
        routeString: '',
        importString: '',
      };
    }
    return {
      routeString: `${_indent}{ "path": "${this.#routePath}", "children": [\n${routeString.replace(
        /,\n$/,
        '\n',
      )}] },\n`,
      importString,
    };
  };
}

export class RootTree extends DirsTree {
  /**
   * @description 监听目录
   * @default "src/pages"
   */
  public dir: string = 'src/pages';
  /**
   * @description 路由前缀
   * @default "/"
   */
  public routePrefix?: string;
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
  public loadType?: 'lazy' | 'default' | 'layout_default_lazy' = 'default';
  /**
   * @description 保持路由组件的 HOC 函数
   */
  public isKeepAliveBasePath?: boolean;
  // 是否是 ts 文件
  public isTs?: boolean;
}

export class TreeRoutes {
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
  watchDirs?: WatchDirsItem[] = [];
  /**
   * @description 保持路由组件的 HOC 函数
   */
  keepAliveBasePath?: string;
  // 是否是 ts 文件
  isTs?: boolean;
  // 路由树
  routes: RootTree[] = [];
  // 获取监听目录项
  #getWatchDirsItem = (link: string) => {
    let dirItem = this.watchDirs?.find((item) => {
      return link.startsWith(item.dir + '/');
    });
    if (!dirItem) {
      dirItem = {
        dir: 'src/pages',
        routePrefix: '/',
      };
    }
    return dirItem;
  };

  // 添加路由项
  add = (link: string) => {
    // console.log('link', link)
    /**创建路由项*/
    const dirItem = this.#getWatchDirsItem(link);
    const _link = link
      .replace(dirItem.dir, dirItem.routePrefix || '/')
      .replace(/^\/\//, '')
      .replace(/^\//, '');
    // console.log('_link', _link)
    const finx = this.routes.find((it) => it.dir === dirItem.dir);
    if (finx) {
      finx.addChild(_link);
    } else {
      const route = new RootTree();
      route.loadType = this.loadType;
      route.isKeepAliveBasePath = !!this.keepAliveBasePath;
      route.isTs = this.isTs;
      route.dir = dirItem.dir;
      route.routePrefix = dirItem.routePrefix;
      this.routes.push(route);
      route.addChild(_link);
    }
  };

  // 删除路由项
  remove = (link: string) => {
    /**创建路由项*/
    const dirItem = this.#getWatchDirsItem(link);
    const _link = link
      .replace(dirItem.dir, dirItem.routePrefix || '/')
      .replace(/^\/\//, '')
      .replace(/^\//, '');
    const finx = this.routes.find((it) => it.dir === dirItem.dir);
    if (finx) {
      finx.removeChild(_link);
    }
  };

  /**转换数据*/
  toString = () => {
    let importString = '';
    let routeString = '';
    if (this.isTs) {
      importString += `import type { RouteObject } from 'react-router';\n`;
    }
    if (this.keepAliveBasePath) {
      importString += `import KeepAliveBaseHOC from '${this.keepAliveBasePath}';\n`;
    }
    const routes = this.routes.sort((a, b) => {
      return (a.routePrefix || '/').localeCompare(b.routePrefix || '/');
    });

    for (let index = 0; index < routes.length; index++) {
      const item = routes[index];
      item.isTs = this.isTs;
      const result = item.stringify(1);
      importString += result.importString;
      routeString += result.routeString;
    }
    if (this.isTs) {
      return `${importString}\nconst routes: RouteObject[] = [\n${routeString.replace(
        /,\n$/,
        '\n',
      )}];\nexport default routes;`;
    }
    return `${importString}\nconst routes = [\n${routeString.replace(/,\n$/, '\n')}];\nexport default routes;`;
  };
}
