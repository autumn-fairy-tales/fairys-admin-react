import { proxy, useSnapshot, ref } from 'valtio';
import { FairysMenuItemType, FairysMenuInstanceState, FairysItemType } from './interface';
import { createContext, createRef, useContext, useRef } from 'react';
import { FloatingTreeType, ReferenceType } from '@floating-ui/react';

/**
 * 菜单组件
 * 1. 支持水平和垂直方向
 * 2. 支持菜单展开和收起(横向变短)
 * 3. 支持菜单折叠(子菜单折叠)
 * 4. 支持菜单禁用
 * 5. 支持菜单展开单个父级
 * 6. 支持菜单展开多个父级
 * 7. 支持 移入/点击 菜单显示子菜单
 * 8. 支持分组菜单
 * 9. 支持分割线
 * 10. 默认展开子菜单
 * 11. 切换主题色
 * 12. 可以自定义 移入/点击菜单 弹出框渲染内容
 * 13. 自动滚动到选中菜单(单选菜单)
 * 14. 支持多选菜单
 * 15. 菜单右侧扩展内容
 * 16. 菜单名换行或省略号显示(默认省略显示)
 * 17. 最顶层为分组菜单，则可拆分成两列菜单，左侧主菜单(可以点击/移入 显示弹框子菜单)，右侧子菜单
 */

let DEFAULT_ACTIVE_MOTION_PREFIX_CLS_Number = 0;

export class FairysMenuItemInstance {
  dom = createRef<HTMLDivElement>();
  item: FairysMenuItemType;
  /**是否选中*/
  isActive: boolean = false;
  /**滚动到当前项*/
  scrollIntoView = () => {
    this.dom.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  };
}

export const useFairysMenuItemInstance = () => useRef<FairysMenuItemInstance>(new FairysMenuItemInstance()).current;

export class FairysMenuInstance {
  public dom = createRef<HTMLDivElement>();
  /**所有菜单实例*/
  public menuItems: FairysMenuItemInstance[] = [];
  /**注册菜单实例*/
  public register = (item: FairysMenuItemInstance) => {
    this.menuItems.push(item);
    return () => {
      this.menuItems = this.menuItems.filter((it) => it !== item);
    };
  };

  /**监听节点尺寸变化 回调方法*/
  private resizeObserverCallback = () => {
    // 需要把当前tab项移入可视区
    for (let index = 0; index < this.menuItems.length; index++) {
      const element = this.menuItems[index];
      if (element.isActive) {
        element.scrollIntoView();
      }
    }
  };

  /**监听节点尺寸变化*/
  private resizeObserver = () => {
    const resizeObserver = new ResizeObserver(this.resizeObserverCallback);
    if (this.dom.current) resizeObserver.observe(this.dom.current);
    return () => {
      resizeObserver.disconnect();
    };
  };

  /**添加监听事件*/
  addEventListener = () => {
    // 1. 监听子节点的尺寸变化（ResizeObserver）
    const unMount_resizeObserver = this.resizeObserver();
    return () => {
      unMount_resizeObserver();
    };
  };

  /**
   * 父级菜单映射表
   * key: 子菜单 path
   * value: 父级菜单列表
   */
  public parentPathMap = new Map<string, FairysMenuItemType[]>();
  public pathMap = new Map<string, FairysMenuItemType>();
  public floatingTree: FloatingTreeType<ReferenceType>;

  /**props 传递的字段*/
  public propsKeys: string[] = [];
  /**是否传递 openKeys 字段*/
  public isOpenKeysField: boolean = true;
  /**是否传递 selectedKey 字段*/
  public isSelectedKeyField: boolean = true;
  /**是否只保留一组父级菜单展开*/
  public isOnlyParentOpenKeys: boolean = false;

  /**
   * 对比两个父级路径是否相同
   */
  public compareParentPath = (oldParentItems: FairysMenuItemType[], newParentItems: FairysMenuItemType[]) => {
    // 新的如果长，则直接返回去更新新的
    // 长度相同，则直接更新最新的
    const oldLength = oldParentItems.length;
    const newLength = newParentItems.length;
    if (oldLength === newLength || newLength > oldLength) {
      return newParentItems;
    }
    // 如果新的短，则进行判断父级是否相同
    // 新的移除最后一个进行判断是否相同父级
    const newList = newParentItems
      .slice(0, newLength - 1)
      .map((it: FairysMenuItemType) => it.path)
      .join('_');
    const oldList = oldParentItems
      .slice(0, newLength - 1)
      .map((it: FairysMenuItemType) => it.path)
      .join('_');
    if (newList === oldList) {
      return oldParentItems;
    }
    return newParentItems;
  };

  /**
   * 处理菜单数据，构建父级菜单映射表
   * @param items 菜单数据
   */
  public processMenuItems = (items: FairysItemType[], parentItems: FairysMenuItemType[] = []) => {
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      if (element.type !== 'divider') {
        this.pathMap.set(element.path, element);
        this.parentPathMap.set(element.path, [...parentItems, element]);
        if (element.items && element.items.length > 0) {
          this.processMenuItems(element.items, [...parentItems, element]);
        }
      }
    }
  };

  /**在没有传递 openKeys 值的情况下使用*/
  public updatedOpenKeys = (selectedKey?: string) => {
    if (!selectedKey) {
      return;
    }
    // 只保留一个父级展开
    if (this.isOnlyParentOpenKeys) {
      const parentItems = this.parentPathMap.get(selectedKey);
      if (parentItems) {
        this.state.expandItems = this.compareParentPath(this.state.expandItems, parentItems);
        this.state.openKeys = Array.from(new Set(this.state.expandItems.map((it) => it.path)));
      }
    } else {
      const parentItems = this.parentPathMap.get(selectedKey);
      this.state.expandItems = [...this.state.expandItems, ...parentItems];
      this.state.openKeys = Array.from(new Set(this.state.expandItems.map((it) => it.path)));
    }
  };

  /**点击菜单项回调*/
  public onClickItem: (
    rowItem: FairysMenuItemType,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    instance: FairysMenuInstance,
  ) => void = () => void 0;
  public onClickSubItem: (
    item: FairysMenuItemType,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    instance: FairysMenuInstance,
  ) => void = () => void 0;

  public _onClickItem: FairysMenuInstance['onClickItem'] = (rowItem, event, instance) => {
    if (!this.isSelectedKeyField) {
      this.state.selectedKey = rowItem.path;
    }
    this.onClickItem?.(rowItem, event, instance);
  };

  public _onClickSubItem: FairysMenuInstance['onClickSubItem'] = (item, event, instance) => {
    if (!this.isOpenKeysField) {
      const isOpen = this.isOpen(item.path);
      if (isOpen) {
        this.state.expandItems = this.state.expandItems.filter((it) => it.path !== item.path);
        this.state.openKeys = Array.from(new Set(this.state.expandItems.map((it) => it.path)));
      } else {
        // 只保留一个父级展开
        if (this.isOnlyParentOpenKeys) {
          const parentItems = this.parentPathMap.get(item.path);
          if (parentItems) {
            this.state.expandItems = [...parentItems];
            this.state.openKeys = Array.from(new Set(this.state.expandItems.map((it) => it.path)));
          }
        } else {
          this.state.expandItems = [...this.state.expandItems, item];
          this.state.openKeys = Array.from(new Set(this.state.expandItems.map((it) => it.path)));
        }
      }
    }
    this.onClickSubItem?.(item, event, instance);
  };

  state = proxy<FairysMenuInstanceState>({
    /**菜单模式*/
    mode: 'vertical',
    /**展开的菜单 key 列表*/
    openKeys: ref([]),
    expandItems: ref([]),
    /**选中的菜单 key*/
    selectedKey: undefined,
    /**是否支持多选*/
    multiple: false,
    /**子菜单数据*/
    items: ref([]),
  });

  setActiveMotionPrefixCls = (cls?: string) => {
    if (!cls) {
      this.state.activeMotionPrefixCls = 'fairys-menu' + DEFAULT_ACTIVE_MOTION_PREFIX_CLS_Number++;
    } else {
      this.state.activeMotionPrefixCls = cls;
    }
  };

  /**
   * 是否选中菜单
   * @param path 菜单 path
   * @returns 是否选中
   */
  isActive(path: string) {
    return this.state.selectedKey === path;
  }

  /**
   * 是否展开菜单
   * @param path 菜单 path
   * @returns 是否展开
   */
  isOpen(path: string) {
    return (this.state.openKeys || []).includes(path);
  }

  /**折叠选中*/
  isCollapsed(path: string) {
    const parentItems = this.parentPathMap.get(this.state.selectedKey) || [];
    return !!parentItems.find((it) => it.path === path);
  }
}

export const useFairysMenuInstance = (instance?: FairysMenuInstance) => {
  const ref = useRef<FairysMenuInstance>();
  if (!ref.current) {
    if (instance) {
      ref.current = instance;
    } else {
      ref.current = new FairysMenuInstance();
    }
  }
  return ref.current;
};

export const FairysMenuInstanceContext = createContext<FairysMenuInstance>(new FairysMenuInstance());

export interface FairysMenuInstanceContextProviderProps {
  instance: FairysMenuInstance;
  children: React.ReactNode;
}

export const useFairysMenuInstanceContext = () => {
  const instance = useContext(FairysMenuInstanceContext);
  const state = useSnapshot(instance.state);
  return [state, instance, state.__defaultValue] as [FairysMenuInstanceState, FairysMenuInstance, string];
};
