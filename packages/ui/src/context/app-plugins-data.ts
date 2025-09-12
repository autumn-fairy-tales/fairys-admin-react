import { FairysPopoverMenuItemType } from 'components/popover-menu';

export type AppPluginType = {
  /**工具条右侧插件*/
  'toolBar-right'?: {
    /**渲染组件*/
    render?: React.ReactNode;
    /**渲染重写函数*/
    override?: (menus: React.ReactNode[]) => React.ReactNode;
  };
  /**头像菜单插件*/
  'avatar-menus'?: {
    /**添加菜单项*/
    menus?: FairysPopoverMenuItemType[];
    /**重写菜单项*/
    override?: (menus: FairysPopoverMenuItemType[]) => FairysPopoverMenuItemType[];
  };
};

export class AppPluginDataInstance {
  /**插件组件*/
  appPlugins: AppPluginType = {};
  /**添加插件*/
  addPlugin = (plugin: AppPluginType) => {
    this.appPlugins = { ...this.appPlugins, ...plugin };
  };
  /**清空数据*/
  clear = () => {};
}
/**应用插件,用于添加或重写组件渲染*/
export const appPluginDataInstance = new AppPluginDataInstance();
