import { proxy, useSnapshot, ref } from 'valtio';

export interface TabBarItem {
  /**标题*/
  title: string;
  /**路径*/
  path: string;
  [x: string]: any;
}

interface TabBarInstanceState {
  tabBarItems: TabBarItem[];
  /**默认引用值*/
  __defaultValue?: string;
}

class TabBarInstance {
  state = proxy<TabBarInstanceState>({
    tabBarItems: [],
  });
}

const tabBarInstance = new TabBarInstance();

export const useTabBar = () => {
  const state = useSnapshot(tabBarInstance.state);
  return [state, tabBarInstance, state.__defaultValue] as const;
};
