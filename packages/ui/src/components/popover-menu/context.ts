import { Placement } from '@floating-ui/react';
import { IconProps } from '@iconify/react';
import { useRef, createContext, useContext } from 'react';
import { proxy, useSnapshot } from 'valtio';

export type FairysPopoverMenuItemIconPropsType =
  | (Omit<IconProps, 'icon'> & {
      /** icon 使用className类名
       * @default false
       */
      isClassName?: false;
    })
  | ({
      /** icon 使用className类名
       * @default false
       */
      isClassName: true;
    } & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, 'ref'>);

export interface FairysPopoverMenuItemType {
  /**图标*/
  icon?: string;
  /**图标属性*/
  iconProps?: FairysPopoverMenuItemIconPropsType;
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
  onClick?: (item: FairysPopoverMenuItemType, event: React.MouseEvent) => void;
  /**删除按钮事件*/
  onClose?: (item: FairysPopoverMenuItemType, event: React.MouseEvent) => void;
  /**value值*/
  value?: string;
  /**子项*/
  items?: FairysPopoverMenuItemType[];
  /**是否显示关闭按钮
   * @default true
   */
  isShowClose?: boolean;
  /**是否点击关闭
   * @default true
   */
  isClickClose?: boolean;
  /**自定义类名*/
  className?: string;
  /**自定义弹出层类名*/
  popoverClassName?: string;
  /**自定义运动类名*/
  motionClassName?: string;
  [key: string]: any;
}

export interface FairysPopoverMenuProps {
  /**是否禁用*/
  disabled?: boolean;
  /**单选或多选*/
  mode?: 'single' | 'multiple';
  /**点击当前项*/
  onClickItem?: (item: FairysPopoverMenuItemType, event: React.MouseEvent) => void;
  /**关闭当前项*/
  onCloseItem?: (item: FairysPopoverMenuItemType, event: React.MouseEvent) => void;
  /**渲染数据*/
  items: FairysPopoverMenuItemType[];
  /**
   * 是否隐藏关闭按钮
   * @default true
   */
  isHideClose?: boolean;
  /**当使用这个时items每一项必须需要value值*/
  value?: string | string[];
  /**实例*/
  instance?: FairysPopoverMenuInstance;
  children?: React.ReactNode;
  /**打开关闭回调*/
  onOpenChange?: (open: boolean) => void;
  /**事件名称*/
  eventName?: 'click' | 'mousedown' | 'contextMenu';
  /**外部类名*/
  className?: string;
  /**运动类名*/
  motionClassName?: string;
  /**位置*/
  placement?: Placement;
  /**不设置最小宽度*/
  isNotMinWidth?: boolean;
  /**是否加透明度*/
  isOpacity?: boolean;
}

interface FairysPopoverMenuInstanceState {
  value?: FairysPopoverMenuProps['value'];
  __defaultValue?: string;
}

class FairysPopoverMenuInstance {
  /**是否隐藏关闭按钮*/
  isHideClose?: FairysPopoverMenuProps['isHideClose'] = true;
  /**点击当前项*/
  onClickItem?: FairysPopoverMenuProps['onClickItem'];
  /**关闭当前项*/
  onCloseItem?: FairysPopoverMenuProps['onCloseItem'];
  /**渲染数据*/
  items: FairysPopoverMenuProps['items'];
  /**单选或多选*/
  mode?: FairysPopoverMenuProps['mode'];
  /**状态*/
  state = proxy<FairysPopoverMenuInstanceState>({
    value: undefined,
  });
  /**判断是否选中*/
  isChecked = (item: FairysPopoverMenuItemType) => {
    if (this.state.value) {
      if (Array.isArray(this.state.value)) {
        return this.state.value.includes(item.value || '');
      }
      return this.state.value === item.value;
    }
    return false;
  };
}

export const useFairysPopoverMenuInstance = (instance?: FairysPopoverMenuInstance) => {
  const ref = useRef<FairysPopoverMenuInstance>();
  if (!ref.current) {
    if (instance) {
      ref.current = instance;
    } else {
      ref.current = new FairysPopoverMenuInstance();
    }
  }
  return ref.current;
};

export const FairysPopoverMenuContext = createContext(new FairysPopoverMenuInstance());

export const useFairysPopoverMenuContext = () => {
  const instance = useContext(FairysPopoverMenuContext);
  const state = useSnapshot(instance.state);
  return [state, instance, state.__defaultValue] as [FairysPopoverMenuInstanceState, FairysPopoverMenuInstance, string];
};
