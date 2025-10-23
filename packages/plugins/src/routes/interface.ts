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
  routePrefix: string;
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
  /**
   * @description 自定义 HydrateFallback 组件
   */
  hydrateFallback?: string;
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
