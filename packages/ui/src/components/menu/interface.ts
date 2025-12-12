import { FairysIconPropsType } from 'components/icon';
import { FairysMenuInstance } from './instance';

export interface FairysSubMenuItemBaseType {
  /**路径*/
  path: string;
  /**标题*/
  title?: string;
  /**图标*/
  icon?: string;
  /**图标属性*/
  iconProps?: FairysIconPropsType;
  /**子项菜单*/
  items?: FairysItemType[];
  /**禁用*/
  disabled?: boolean;
  /**额外内容*/
  extra?: React.ReactNode;
  /**菜单样式*/
  style?: React.CSSProperties;
  /**菜单类名*/
  className?: string;
  /**自定义属性*/
  [key: string]: any;
}

export interface FairysMenuItemType extends FairysSubMenuItemBaseType {
  /**父级菜单项*/
  type?: 'subMenu' | 'item' | 'group';
  /**点击事件*/
  onClick?: (item: FairysMenuItemType, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface FairysDividerMenuItemType {
  type: 'divider';
  /**菜单样式*/
  style?: React.CSSProperties;
  /**菜单类名*/
  className?: string;
}
export type FairysItemType = FairysMenuItemType | FairysDividerMenuItemType;

export interface FairysMenuInstanceState {
  /**
   * 展开的菜单 key 列表
   */
  openKeys?: string[];
  /**
   * 展开的菜单项列表（在没有传递 openKeys 值的情况下使用）
   */
  expandItems?: FairysMenuItemType[];
  /**
   * 选中的菜单 key
   */
  selectedKey?: string;
  /**
   * 是否支持多选
   */
  multiple?: boolean;
  /**子菜单数据*/
  items?: FairysItemType[];
  /**
   * 菜单模式
   */
  mode?: 'horizontal' | 'vertical';
  /**
   * 分组菜单模式(第一层使用)
   * click: 点击分组菜单展开子菜单
   * hover: 鼠标移入分组菜单展开子菜单
   * onlyGroup: 只显示分组菜单，子菜单不进行任何操作
   * none: 不做任何处理，直接展开，（相当于 subMenu 菜单直接展开，不可折叠和收起）
   * @default 'none'
   */
  firstGroupMode?: 'click' | 'hover' | 'onlyGroup' | 'none';
  /**菜单大小*/
  size?: 'small' | 'default' | 'large';
  /**第一层菜单大小*/
  firstLevelSize?: 'small' | 'default' | 'large';
  /**菜单最大宽度*/
  maxWidth?: number;
  /**选中菜单类名前缀*/
  activeMotionPrefixCls?: string;
  /**是否收起菜单*/
  collapsed?: boolean;
  /**
   * 收起菜单，第一层菜单 显示 图标+标题 还是 只显示图标
   * icon: 只显示图标
   * vertical: 垂直显示图标和标题
   * @default 'vertical'
   */
  collapsedMode?: 'icon' | 'vertical';
  /**禁用移入点击显示子菜单*/
  disabledShowChildItem?: boolean;
  /**默认字段不进行使用*/
  __defaultValue?: string;
}

export interface FairysMenuProps extends Omit<FairysMenuInstanceState, '__defaultValue'> {
  /**菜单数据*/
  items?: FairysItemType[];
  /**菜单实例*/
  menuInstance?: FairysMenuInstance;
  /**点击菜单项事件*/
  onClickItem?: FairysMenuInstance['onClickItem'];
  /**点击sub菜单项事件*/
  onClickSubItem?: FairysMenuInstance['onClickSubItem'];
  /**点击分组菜单项事件*/
  onClickGroupItem?: FairysMenuInstance['onClickGroupItem'];
  /**是否只保留一组父级菜单展开(在未传递 openKeys 字段时生效)*/
  isOnlyParentOpenKeys?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /**宽度
   * auto: 自动宽度
   * number: 固定宽度
   */
  width?: 'auto' | number;
}
