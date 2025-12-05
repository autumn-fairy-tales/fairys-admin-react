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
   * 菜单模式
   */
  mode?: 'horizontal' | 'vertical';
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
   * 是否内联折叠子菜单，子菜单移入或者点击显示
   *
   * inline: 显示图标和标题
   * icon: 只显示图标
   */
  collapsedMode?: 'inline' | 'icon';
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
  onClickItem?: (
    item: FairysMenuItemType,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    instance: FairysMenuInstance,
  ) => void;
  onClickSubItem?: (
    item: FairysMenuItemType,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    instance: FairysMenuInstance,
  ) => void;
  /**是否只保留一组父级菜单展开(在未传递 openKeys 字段时生效)*/
  isOnlyParentOpenKeys?: boolean;
}
