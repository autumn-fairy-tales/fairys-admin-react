import { proxy, ref, useSnapshot } from 'valtio';
import type { MenuItemType } from './menu-data';

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
  ctor_tabBarItems = (tabBarItems: MenuItemType[]) => {
    this.state.tabBarItems = ref(tabBarItems);
    console.log(12);
  };
}

export const tabBarInstance = new TabBarInstance();

export const useTabBar = () => {
  const state = useSnapshot(tabBarInstance.state);
  return [state, tabBarInstance, state.__defaultValue] as [TabBarInstanceState, TabBarInstance, string | undefined];
};
