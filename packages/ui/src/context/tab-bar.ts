import { proxy, ref, useSnapshot } from 'valtio';
import type { MenuItemType } from './menu-data';
import type { NavigateFunction } from 'react-router';
import { menuDataInstance } from './menu-data';

export interface TabBarItemType extends MenuItemType {}
interface TabBarInstanceState {
  tabBarItems: TabBarItemType[];
  /**默认引用值*/
  __defaultValue?: string;
}

class TabBarInstance {
  state = proxy<TabBarInstanceState>({
    tabBarItems: [],
  });

  /**初始化渲染菜单数据*/
  ctor = (tabBarItems: MenuItemType[]) => {
    this.state.tabBarItems = ref(tabBarItems);
  };

  /**添加tab项*/
  addItem = (item: TabBarItemType) => {
    /**查询是否已经存在*/
    const finx = this.state.tabBarItems.find((it) => it.path === item.path);
    if (!finx) {
      this.state.tabBarItems = ref([...this.state.tabBarItems, item]);
    }
  };

  /**根据path添加tab项*/
  add = (path: string) => {
    /**查询是否已经存在*/
    const finx = this.state.tabBarItems.find((item) => item.path === path);
    if (!finx) {
      /**菜单中查找到数据进行存储*/
      const fix = menuDataInstance.get_path_menuItem(path);
      if (fix) {
        this.state.tabBarItems = ref([...this.state.tabBarItems, fix]);
      }
    }
  };

  /**删除tab项*/
  remove = (path: string, isActive: boolean, navigate: NavigateFunction) => {
    if (isActive) {
      const pathIndex = this.state.tabBarItems.findIndex((item) => item.path === path);
      this.state.tabBarItems = ref(this.state.tabBarItems.filter((item) => item.path !== path));
      let nativeItem = this.state.tabBarItems[pathIndex];
      if (!nativeItem) {
        nativeItem = this.state.tabBarItems[this.state.tabBarItems.length - 1];
      }
      if (nativeItem) {
        navigate(nativeItem.path);
      }
    } else {
      this.state.tabBarItems = ref(this.state.tabBarItems.filter((item) => item.path !== path));
    }
  };
}

export const tabBarInstance = new TabBarInstance();

export const useTabBar = () => {
  const state = useSnapshot(tabBarInstance.state);
  return [state, tabBarInstance, state.__defaultValue] as [TabBarInstanceState, TabBarInstance, string | undefined];
};
