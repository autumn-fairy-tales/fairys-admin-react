import { proxy, useSnapshot } from 'valtio';
import type { MenuItemType } from './menu-data';

export interface TabBarItemType extends MenuItemType {}
interface TabBarInstanceState {
  tabBarItems: TabBarItemType[];
  /**默认引用值*/
  __defaultValue?: string;
}

class TabBarInstance {
  state = proxy<TabBarInstanceState>({
    tabBarItems: [
      {
        title: '首页',
        path: '/',
        icon: 'solar:home-bold',
      },
      {
        title: '列表',
        path: '/list',
        icon: 'solar:checklist-bold',
      },
      {
        title: '详情',
        path: '/detail',
        icon: 'solar:info-circle-outline',
      },
    ],
  });

  /**初始化渲染菜单数据*/
  ctor_tabBarItems = (tabBarItems: MenuItemType[]) => {
    this.state.tabBarItems = tabBarItems;
  };
}

const tabBarInstance = new TabBarInstance();

export const useTabBar = () => {
  const state = useSnapshot(tabBarInstance.state);
  return [state, tabBarInstance, state.__defaultValue] as [TabBarInstanceState, TabBarInstance, string | undefined];
};
