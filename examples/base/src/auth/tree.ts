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

    // 组件地址
    const componentPath = _link.replace(/^\//, '').replace(/\.(tsx|jsx|js)$/, '');

    /**组件名称*/
    const componentName = _link
      .replace(/\.(tsx|jsx|js)$/, '')
      .replace(/\./, '_')
      .split('/')
      .filter((item) => item)
      .join('_')
      .toUpperCase();

    const pre = (this.#rootTree?.routePrefix || '/').replace(/^\//, '').replace(/\/$/, '');

    return {
      routePath: pre + '/' + _routePath,
      _routePath,
      componentPath: '@/' + componentPath,
      componentName,
    };
  };

  /**创建路由信息*/
  #createInfo = (link: string) => {
    const result = this.#replacePath(link);
    this.#componentPath = result.componentPath;
    this.#componentName = result.componentName;
    this.#routePath = result._routePath;
  };

  /**创建路由路径*/
  #createPath = (dir: string) => {
    const _routePath = dir.replace(/^\//, '').replace(/\[/g, ':').replace(/\]/g, '');
    const pre = (this.#rootTree?.routePrefix || '/').replace(/^\//, '').replace(/\/$/, '');
    this.#routePath = pre + '/' + _routePath;
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
    if (rest.length === 1) {
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
    const _indent2 = '\t'.repeat(_level + 2);
    if (lg) {
      for (let index = 0; index < lg; index++) {
        const element = this.children[index];
        const result = element.stringify(_level + 1);
        routeString += result.routeString;
        importString += result.importString;
      }
    } else {
      if (this.#rootTree?.loadType === 'lazy') {
        // 保持路由组件的 HOC 函数
        if (this.#rootTree?.isKeepAliveBasePath) {
          return {
            routeString: `${_indent}{\n${_indent}\t"path": "${
              this.#routePath
            }",\n${_indent}\t"lazy": async ()=>{\n${_indent2}const data${
              this.#rootTree.isTs ? ' : any' : ''
            } = await import('${
              this.#componentPath
            }');\n${_indent2}return { ...data, Component: KeepAliveBaseHOC(data.Component, '${convertIdOrNameOne(
              this.#routePath,
            )}') }  },\n${_indent}},\n`,
            importString: ``,
          };
        }
        return {
          routeString: `${_indent}{\n${_indent}\t"path": "${this.#routePath}",\n${_indent}\t"lazy": () => import('${
            this.#componentPath
          }'),,\n${_indent}},\n`,
          importString: ``,
        };
      }
      if (this.#rootTree?.isKeepAliveBasePath) {
        return {
          routeString: `${_indent}{\n${_indent}\t"path": "${
            this.#routePath
          }",\n${_indent}\t"Component": KeepAliveBaseHOC(${this.#componentName}, '${convertIdOrNameOne(
            this.#routePath,
          )}'),\n${_indent}},\n`,
          importString: `import ${this.#componentName} from '${this.#componentPath}';\n`,
        };
      }
      return {
        routeString: `${_indent}{\n${_indent}\t"path": "${this.#routePath}",\n${_indent}\t"Component": ${
          this.#componentName
        },\n${_indent}},\n`,
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
        routeString: `${_indent}{\n${_indent}\t"path": "${this.#routePath}", \n${_indent}\t"Component": ${
          this.#componentName
        }, \n${_indent}\t"children": [\n\t${routeString}\n${_indent}], \n${_indent}},\n`,
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
      routeString: `${_indent}{\n${_indent}\t"path": "${
        this.#routePath
      }",\n${_indent}\t"children": [\n\t${routeString}\n${_indent}], \n${_indent}},\n`,
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

export class TreeRoute {
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
  watchDirs?: any[];
  /**
   * @description 保持路由组件的 HOC 函数
   */
  keepAliveBasePath?: string;

  add = () => {};

  remove = () => {};
}

const tree = new RootTree();
tree.loadType = 'lazy';
tree.isKeepAliveBasePath = true;
tree.isTs = true;

tree.addChild('/a/b/c/page.tsx');
tree.addChild('/a/b/d/page.tsx');
tree.addChild('/a/e/f/page.tsx');
tree.addChild('/a/d/f/page.tsx');
tree.addChild('/a/layout.tsx');
tree.addChild('/a/404.tsx');

console.log(tree, tree.stringify());
