import { createContext, useContext, createRef, useRef } from 'react';
import { proxy, useSnapshot, ref } from 'valtio';
export interface MenuItemType {
  /**标题*/
  title: string;
  /**路径*/
  path: string;
  /**图标*/
  icon?: string;
  /**子项菜单*/
  children?: MenuItemType[];
  [x: string]: any;
}

export interface MenuDataInstanceState {
  /**侧边渲染菜单*/
  menuItems: MenuItemType[];
  /**展开项*/
  expandItems: MenuItemType[];
  /**默认引用值*/
  __defaultValue?: string;
}

/**平铺所有菜单*/
const flatMenuItems = (
  items: MenuItemType[],
  parentPath: MenuItemType[] = [],
  parentMenuItemMap: Map<string, MenuItemType[]>,
) => {
  const _list: MenuItemType[] = [];
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    _list.push(item);
    if (item.path) {
      parentMenuItemMap.set(item.path, [...parentPath].concat(item));
    }
    if (Array.isArray(item.children)) {
      _list.push(...flatMenuItems(item.children, [...parentPath].concat(item), parentMenuItemMap));
    }
  }
  return _list;
};

/**菜单搜索*/
const filterMenuItems = (items: MenuItemType[], keyword: string) => {
  return items.filter((item) => {
    if (Array.isArray(item.children) && item.children.length) {
      return filterMenuItems(item.children, keyword).length > 0;
    }
    return item.title.includes(keyword);
  });
};

/**移除重复数据*/
const removeRepeat = (items: MenuItemType[]) => {
  const _newList: MenuItemType[] = [];
  for (let index = 0; index < items.length; index++) {
    const element = items[index];
    const _item = _newList.find((i) => i.path === element.path);
    if (!_item) {
      _newList.push(element);
    }
  }
  return _newList;
};

/**整个菜单数据实例*/
export class MenuDataInstance {
  /**原始整个菜单*/
  _menuItems: MenuItemType[] = [];
  /**平铺所有菜单数据*/
  _flatMenuItems: MenuItemType[] = [];
  /**地址查找父级路径*/
  _parentMenuItemMap: Map<string, MenuItemType[]> = new Map();
  /**菜单数据状态*/
  state = proxy<MenuDataInstanceState>({
    menuItems: [],
    expandItems: [],
  });
  /**设置菜单所有数据*/
  ctor = (items: MenuItemType[]) => {
    this._menuItems = items;
    this._flatMenuItems = flatMenuItems(items, [], this._parentMenuItemMap);
    this.state.menuItems = ref(items);
  };
  /**
   * 通过path获取菜单对象
   * 暂不支持 /path/:id 这种动态路由
   */
  get_path_menuItem = (path: string) => {
    return this._flatMenuItems.find((item) => item.path === path);
  };
  /**搜索菜单*/
  onSearch = (word: string) => {
    const _key = `${word || ''}`.trim();
    if (!_key) {
      this.state.menuItems = ref(this._menuItems);
      return;
    }
    this.state.menuItems = ref(filterMenuItems(this._menuItems, _key));
  };
  /**展开项*/
  onExpandItems = (path: string) => {
    if (this.state.expandItems.length === 0) {
      const parentItems = this._parentMenuItemMap.get(path) || [];
      this.state.expandItems = ref([...parentItems]);
      return;
    }
    // 如果不存在子菜单，则不进行更新展开项
    const _item = this.get_path_menuItem(path);
    if (Array.isArray(_item?.children) && _item.children.length) {
      const parentItems = this._parentMenuItemMap.get(path) || [];
      this.state.expandItems = ref([...parentItems]);
    }
  };
  /**折叠*/
  onCollapseItems = (path: string) => {
    this.state.expandItems = ref(this.state.expandItems.filter((i) => i.path !== path));
  };

  /**切换展示隐藏*/
  onToggleItems = (path: string) => {
    const finx = this.state.expandItems.find((i) => i.path === path);
    if (finx) {
      this.onCollapseItems(path);
    } else {
      this.onExpandItems(path);
    }
  };
  /**是否展示*/
  isExpand = (path: string) => {
    return !!this.state.expandItems.find((i) => i.path === path);
  };
}
/**菜单数据使用实例*/
export const menuDataInstance = new MenuDataInstance();

export const useMenuData = () => {
  const state = useSnapshot(menuDataInstance.state);
  return [state, menuDataInstance, state.__defaultValue] as [
    MenuDataInstanceState,
    MenuDataInstance,
    string | undefined,
  ];
};

// ================================================================================================
export class MenuItemInstance {
  dom = createRef<HTMLDivElement>();
  item: MenuItemType;
  isSubMenu: boolean;
  /**是否当前项选中*/
  isActive = false;
  /**滚动到当前项*/
  scrollIntoView = () => {
    this.dom.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  };
}

export const useMenuItemInstance = () => useRef<MenuItemInstance>(new MenuItemInstance()).current;

export class MenuInstance {
  /**节点*/
  dom = createRef<HTMLDivElement>();
  menuItems: MenuItemInstance[] = [];
  register = (item: MenuItemInstance) => {
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
}

export const MenuInstanceContext = createContext<MenuInstance>(new MenuInstance());
export const useMenuInstance = () => useRef(new MenuInstance()).current;
export const useMenuInstanceContext = () => useContext(MenuInstanceContext);
