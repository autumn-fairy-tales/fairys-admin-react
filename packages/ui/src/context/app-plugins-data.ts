import { proxy, ref, useSnapshot } from 'valtio';

import { FairysPopoverMenuItemType } from 'components/popover-menu';

export type AppPluginDataInstanceType = {
  /**工具条右侧插件*/
  'toolBar-right'?: {
    /**渲染组件*/
    render?: React.ReactNode;
    /**渲染重写函数*/
    override?: (menus: React.ReactNode[]) => React.ReactNode;
  };
  'toolBar-middle'?: {
    /**渲染组件*/
    render?: React.ReactNode;
  };
  /**头像菜单插件*/
  'avatar-menus'?: {
    /**添加菜单项*/
    menus?: FairysPopoverMenuItemType[];
    /**重写菜单项*/
    override?: (menus: FairysPopoverMenuItemType[]) => FairysPopoverMenuItemType[];
  };
  /**设置抽屉添加其他项*/
  setting?: {
    /**渲染组件*/
    render?: React.ReactNode;
  };
  /**头部渲染*/
  header?: {
    /**渲染组件*/
    render?: React.ReactNode;
  };
  /**子菜单底部切换展开折叠按钮位置上下渲染*/
  'child-menu-bottom'?: {
    /**渲染组件*/
    'top-render'?: React.ReactNode;
    'bottom-render'?: React.ReactNode;
  };
  /**主菜单底部渲染*/
  'main-menu-bottom'?: {
    /**渲染组件*/
    render?: React.ReactNode;
  };
  /**默认引用值*/
  __defaultValue?: string;
};

export class AppPluginDataInstance {
  /**插件组件*/
  appPlugins: AppPluginDataInstanceType = {};
  /**插件组件状态存储*/
  state = proxy<AppPluginDataInstanceType>({});
  /**添加插件*/
  addPlugin = (plugin: AppPluginDataInstanceType) => {
    this.appPlugins = { ...this.appPlugins, ...plugin };
    for (const key in this.appPlugins) {
      this.state[key] = ref(this.appPlugins[key]);
    }
  };
  /**清空某个插件*/
  clearPlugin = (key: keyof AppPluginDataInstanceType) => {
    delete this.appPlugins[key];
    this.state[key] = undefined;
  };
  /**清空数据*/
  clear = () => {};
}
/**应用插件,用于添加或重写组件渲染*/
export const appPluginDataInstance = new AppPluginDataInstance();

/**应用插件数据实例*/
export const useAppPluginDataInstance = () => {
  const snapshot = useSnapshot(appPluginDataInstance.state);
  return [snapshot, appPluginDataInstance, snapshot.__defaultValue] as [
    AppPluginDataInstanceType,
    AppPluginDataInstance,
    string | undefined,
  ];
};
