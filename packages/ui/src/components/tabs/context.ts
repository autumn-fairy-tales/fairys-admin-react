import { createContext, useRef, useContext, ReactNode } from 'react';
import { proxy, useSnapshot } from 'valtio';

export interface FairysTabsItemType {
  title: string;
  key: string;
  icon?: string;
  children?: ReactNode;
  /**是否禁用*/
  disabled?: boolean;
  [s: string]: any;
}

export interface TabsInstanceState {
  /**选中的key*/
  activeKey: string;

  __defaultValue?: string;
}

export class TabsInstance {
  activeKey: string;
  onChange: (key: string, item: FairysTabsItemType) => void;
  state = proxy<TabsInstanceState>({
    activeKey: '',
  });
  onSelected = (item: FairysTabsItemType) => {
    this.state.activeKey = item.key;
    this.onChange?.(item.key, item);
  };
}

export const useTabsInstance = (tabs?: TabsInstance) => {
  const instance = useRef<TabsInstance>();
  if (!instance.current) {
    if (tabs) {
      instance.current = tabs;
    } else {
      instance.current = new TabsInstance();
    }
  }
  return instance.current;
};
export const TabsInstanceContext = createContext<TabsInstance>(new TabsInstance());

export const useTabsInstanceContext = () => {
  const instance = useContext(TabsInstanceContext);
  const state = useSnapshot(instance.state);
  return [state, instance, state.__defaultValue] as [TabsInstanceState, TabsInstance, string];
};
