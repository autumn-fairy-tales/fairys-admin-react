import { createContext, useContext, createRef, useRef } from 'react';
import { proxy, useSnapshot, ref } from 'valtio';
import { settingInstance } from '../context/setting';
export interface MenuItemType {
  /**标题*/
  title: string;
  /**路径*/
  path: string;
  /**图标*/
  icon?: string;
  /**判断是否主子菜单字段，仅在第一层生效*/
  isMain?: boolean;
  /**子项菜单*/
  children?: MenuItemType[];
  [x: string]: any;
}

export interface MenuDataInstanceState {
  /**侧边渲染菜单*/
  menuItems: MenuItemType[];
  /**主菜单*/
  mainMenuItems: MenuItemType[];
  /**主菜单选中项*/
  mainMenuItemSelected?: string;
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

/**
 * 对比两个父级路径是否相同
 */
export const compareParentPath = (oldParentItems: MenuItemType[], newParentItems: MenuItemType[]) => {
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
    .map((it) => it.path)
    .join('_');
  const oldList = oldParentItems
    .slice(0, newLength - 1)
    .map((it) => it.path)
    .join('_');
  if (newList === oldList) {
    return oldParentItems;
  }
  return newParentItems;
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
    mainMenuItems: [],
    mainMenuItemSelected: '',
    expandItems: [],
  });
  /**设置菜单所有数据*/
  ctor = (items: MenuItemType[]) => {
    this._menuItems = items;
    this._flatMenuItems = flatMenuItems(items, [], this._parentMenuItemMap);
    this.state.menuItems = ref(items);
    this.state.mainMenuItems = ref(items.filter((item) => item.isMain));
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

  /**判断是否是父级菜单*/
  isParentMenuItem = (path: string, location_path: string) => {
    const parentItems = this._parentMenuItemMap.get(location_path);
    if (parentItems) {
      return !!parentItems.find((i) => i.path === path);
    }
    return false;
  };

  /**清空展开项*/
  clearExpandItems = () => {
    this.state.expandItems = ref([]);
  };

  /**展开项*/
  onExpandItems = (path: string) => {
    /**只有在未存在展开项时才进行更新(刚进行加载数据)*/
    if (this.state.expandItems.length === 0) {
      const parentItems = this._parentMenuItemMap.get(path) || [];
      this.state.expandItems = ref([...parentItems]);
      return;
    }
    // 如果不存在子菜单，则不进行更新展开项
    const _item = this.get_path_menuItem(path);
    const parentItems = this._parentMenuItemMap.get(path) || [];
    if (Array.isArray(_item?.children) && _item.children.length) {
      this.state.expandItems = ref([...parentItems]);
    } else {
      this.state.expandItems = compareParentPath(this.state.expandItems, parentItems);
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

  /**更新子菜单显示,和主菜单选中项*/
  updateChildMenus = (path: string) => {
    const isMainSubMenuMode = settingInstance.isMainSubMenuMode();
    if (isMainSubMenuMode) {
      const mainMenuItemSelected = this.state.mainMenuItemSelected;
      const parentItems = this._parentMenuItemMap.get(path);
      const currentMainMenuItemPath = parentItems?.[0]?.path;
      if (currentMainMenuItemPath && currentMainMenuItemPath !== mainMenuItemSelected) {
        this.state.mainMenuItemSelected = currentMainMenuItemPath;
        const _item = this.state.mainMenuItems.find((ite) => ite.path === currentMainMenuItemPath);
        if (_item) {
          this.state.menuItems = ref(_item.children);
        }
      }
    }
  };

  /**点击主菜单切换*/
  onMainMenu = (path: string) => {
    const _item = this.state.mainMenuItems.find((ite) => ite.path === path);
    if (_item) {
      if (Array.isArray(_item.children)) {
        this.state.menuItems = ref(_item.children);
        this.state.mainMenuItemSelected = path;
      }
    }
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
  /**关闭弹框事件*/
  close: () => void;
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

export interface MenuInstanceState {
  /**菜单展开隐藏*/
  menuModeExpandCollapse?: 'close' | 'open';
}

export class MenuInstance {
  /**节点*/
  dom = createRef<HTMLDivElement>();
  menuItems: MenuItemInstance[] = [];

  /**菜单数据状态*/
  state = proxy<MenuInstanceState>({
    menuModeExpandCollapse: 'open',
  });

  setMenuModeExpandCollapse = (mode: MenuInstanceState['menuModeExpandCollapse']) => {
    this.state.menuModeExpandCollapse = mode;
  };

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

  /**关闭弹框*/
  onClose = (path: string) => {
    // 树节点
    const treeNode = menuDataInstance._parentMenuItemMap.get(path);
    const list = treeNode
      .filter((its) => Array.isArray(its.children) && its.children.length)
      .map((its) => its.path)
      .concat([path])
      .reverse();
    for (let index = 0; index < list.length; index++) {
      const path = list[index];
      const finx = this.menuItems.find((it) => it.item.path === path);
      if (finx) {
        finx.close?.();
      }
    }
  };
}

export const MenuInstanceContext = createContext<MenuInstance>(new MenuInstance());
export const useMenuInstance = () => useRef(new MenuInstance()).current;

export const useMenuInstanceContext = () => {
  const menuInstance = useContext(MenuInstanceContext);
  const state = useSnapshot(menuInstance.state);
  const menuModeExpandCollapse = state.menuModeExpandCollapse;
  return [state, menuInstance, menuModeExpandCollapse] as [
    MenuInstanceState,
    MenuInstance,
    MenuInstanceState['menuModeExpandCollapse'],
  ];
};
