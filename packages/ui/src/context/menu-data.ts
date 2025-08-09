import { proxy, useSnapshot } from 'valtio';
export interface MenuItemType {
  /**标题*/
  title: string;
  /**路径*/
  path: string;
  /**图标*/
  icon?: string;
  /**子项菜单*/
  children?: MenuItemType[];
  [x: string]: any;
}

export interface MenuDataInstanceState {
  menuItems: MenuItemType[];
  /**默认引用值*/
  __defaultValue?: string;
}

/**整个菜单数据实例*/
export class MenuDataInstance {
  /**原始整个菜单*/
  _menuItems: MenuItemType[] = [];
  /**菜单数据状态*/
  state = proxy<MenuDataInstanceState>({
    menuItems: [],
  });
  /**初始化渲染菜单数据*/
  ctor_menuItems = (menuItems: MenuItemType[]) => {
    this.state.menuItems = menuItems;
  };
}
/**菜单数据使用实例*/
export const menuDataInstance = new MenuDataInstance();

export const useMenuData = () => {
  const state = useSnapshot(menuDataInstance.state);
  return [state, menuDataInstance, state.__defaultValue] as [
    MenuDataInstanceState,
    MenuDataInstance,
    string | undefined,
  ];
};
