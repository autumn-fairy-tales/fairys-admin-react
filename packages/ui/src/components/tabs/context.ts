import { createContext, useRef, useContext, ReactNode } from 'react';
import { proxy, useSnapshot } from 'valtio';
import { IconProps } from '@iconify/react';

export interface FairysTabsItemType {
  title: string;
  key: string;
  /**图标*/
  icon?: string;
  /**图标属性*/
  iconProps?: IconProps;
  children?: ReactNode;
  /**是否禁用*/
  disabled?: boolean;
  [s: string]: any;
}

export interface FairysTabsInstanceState {
  /**选中的key*/
  activeKey: string;

  __defaultValue?: string;
}

export class FairysTabsInstance {
  activeKey: string;
  onChange: (key: string, item: FairysTabsItemType) => void;
  state = proxy<FairysTabsInstanceState>({
    activeKey: '',
  });
  onSelected = (item: FairysTabsItemType) => {
    this.state.activeKey = item.key;
    this.onChange?.(item.key, item);
  };
}

export const useFairysTabsInstance = (tabs?: FairysTabsInstance) => {
  const instance = useRef<FairysTabsInstance>();
  if (!instance.current) {
    if (tabs) {
      instance.current = tabs;
    } else {
      instance.current = new FairysTabsInstance();
    }
  }
  return instance.current;
};
export const FairysTabsInstanceContext = createContext<FairysTabsInstance>(new FairysTabsInstance());

export const useFairysTabsInstanceContext = () => {
  const instance = useContext(FairysTabsInstanceContext);
  const state = useSnapshot(instance.state);
  return [state, instance, state.__defaultValue] as [FairysTabsInstanceState, FairysTabsInstance, string];
};
