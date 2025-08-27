import { useRef, createContext, useContext } from 'react';
import { proxy, useSnapshot } from 'valtio';

export interface PopoverMenuItem {
  /**图标*/
  icon?: string;
  /**标题*/
  title?: string;
  /**是否禁用*/
  disabled?: boolean;
  /**分割线*/
  isDivider?: boolean;
  /**是否显示*/
  visible?: boolean;
  /**自定义内容*/
  children?: React.ReactNode;
  /**点击当前项*/
  onClick?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  /**删除按钮事件*/
  onClose?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  /**value值*/
  value?: string;
  /**子项*/
  items?: PopoverMenuItem[];
  [key: string]: any;
}

export interface PopoverMenuProps {
  /**是否禁用*/
  disabled?: boolean;
  /**单选或多选*/
  mode?: 'single' | 'multiple';
  /**点击当前项*/
  onClickItem?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  /**关闭当前项*/
  onCloseItem?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  /**渲染数据*/
  items: PopoverMenuItem[];
  /**
   * 是否隐藏关闭按钮
   * @default true
   */
  isHideClose?: boolean;
  /**当使用这个时items每一项必须需要value值*/
  value?: string | string[];
  /**实例*/
  instance?: PopoverMenuInstance;
  children?: React.ReactNode;
  /**打开关闭回调*/
  onOpenChange?: (open: boolean) => void;
  /**事件名称*/
  eventName?: 'click' | 'mousedown' | 'contextMenu';
  /**外部类名*/
  className?: string;
  /**运动类名*/
  motionClassName?: string;
}

interface PopoverMenuInstanceState {
  value?: PopoverMenuProps['value'];
  __defaultValue?: string;
}

class PopoverMenuInstance {
  /**是否隐藏关闭按钮*/
  isHideClose?: PopoverMenuProps['isHideClose'] = true;
  /**点击当前项*/
  onClickItem?: PopoverMenuProps['onClickItem'];
  /**关闭当前项*/
  onCloseItem?: PopoverMenuProps['onCloseItem'];
  /**渲染数据*/
  items: PopoverMenuProps['items'];
  /**单选或多选*/
  mode?: PopoverMenuProps['mode'];
  /**状态*/
  state = proxy<PopoverMenuInstanceState>({
    value: undefined,
  });
  /**判断是否选中*/
  isChecked = (item: PopoverMenuItem) => {
    if (this.state.value) {
      if (Array.isArray(this.state.value)) {
        return this.state.value.includes(item.value || '');
      }
      return this.state.value === item.value;
    }
    return false;
  };
}

export const usePopoverMenuInstance = (instance?: PopoverMenuInstance) => {
  const ref = useRef<PopoverMenuInstance>();
  if (!ref.current) {
    if (instance) {
      ref.current = instance;
    } else {
      ref.current = new PopoverMenuInstance();
    }
  }
  return ref.current;
};

export const PopoverMenuContext = createContext(new PopoverMenuInstance());

export const usePopoverMenuContext = () => {
  const instance = useContext(PopoverMenuContext);
  const state = useSnapshot(instance.state);
  return [state, instance, state.__defaultValue] as [PopoverMenuInstanceState, PopoverMenuInstance, string];
};
