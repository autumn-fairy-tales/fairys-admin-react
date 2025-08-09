import { proxy, useSnapshot, ref } from 'valtio';
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

/**平铺所有菜单*/
const flatMenuItems = (items: MenuItemType[]) => {
  const _list: MenuItemType[] = [];
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    _list.push(item);
    if (Array.isArray(item.children)) {
      _list.push(...flatMenuItems(item.children));
    }
  }
  return _list;
};

/**整个菜单数据实例*/
export class MenuDataInstance {
  /**原始整个菜单*/
  _menuItems: MenuItemType[] = [];
  /**平铺所有菜单数据*/
  _flatMenuItems: MenuItemType[] = [];
  /**菜单数据状态*/
  state = proxy<MenuDataInstanceState>({
    menuItems: [],
  });
  /**设置菜单所有数据*/
  ctor = (items: MenuItemType[]) => {
    this._menuItems = items;
    this._flatMenuItems = flatMenuItems(items);
    this.state.menuItems = ref(items);
  };

  /**
   * 通过path获取菜单对象
   * 暂不支持 /path/:id 这种动态路由
   */
  get_path_menuItem = (path: string) => {
    return this._flatMenuItems.find((item) => item.path === path);
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
