import { proxy, useSnapshot } from 'valtio';
import { LayoutMode } from './setting';
export interface MenuItem {
  title: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
}

export interface MenuDataInstanceState {
  menuItems: MenuItem[];
  /**默认引用值*/
  __defaultValue?: string;
}

class MenuDataInstance {
  /**原始整个菜单*/
  _menuItems: MenuItem[] = [];
  /**菜单数据状态*/
  state = proxy<MenuDataInstanceState>({
    menuItems: [],
  });
}
/**菜单数据使用实例*/
export const menuDataInstance = new MenuDataInstance();

export const useMenuData = () => {
  const state = useSnapshot(menuDataInstance.state);
  return [state, menuDataInstance, state.__defaultValue] as const;
};
