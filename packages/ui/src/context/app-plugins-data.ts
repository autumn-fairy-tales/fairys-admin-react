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
};

export class AppPluginDataInstance {
  /**插件组件*/
  appPlugins: AppPluginDataInstanceType = {};
  /**添加插件*/
  addPlugin = (plugin: AppPluginDataInstanceType) => {
    this.appPlugins = { ...this.appPlugins, ...plugin };
  };
  /**清空数据*/
  clear = () => {};
}
/**应用插件,用于添加或重写组件渲染*/
export const appPluginDataInstance = new AppPluginDataInstance();
