import { proxy, useSnapshot, ref } from 'valtio';
import { tabBarDataInstance } from './tab-bar';
import type { FairysIconPropsType } from 'components/icon';
import { FairysItemType } from 'components/menu';

export interface MenuItemType {
  type?: FairysItemType['type'];
  /**标题*/
  title: string;
  /**路径*/
  path: string;
  /**图标*/
  icon?: string;
  /**图标属性*/
  iconProps?: FairysIconPropsType;
  /**判断是否主子菜单字段，仅在第一层生效*/
  isMain?: boolean;
  /**子项菜单*/
  items?: MenuItemType[];
  /**是否为固定菜单,(直接固定到tabbar上，不可删除)*/
  isTabFixed?: boolean;
  /**排序-固定菜单*/
  sortTabFixed?: number;
  /**样式属性*/
  className?: string;
  /**是否打开浏览器新窗口*/
  isOpenNewWindow?: boolean;
  /**跳转之前触发，返回 false 则不跳转*/
  onBeforeNavigate?: (item: MenuItemType) => boolean | Promise<boolean>;
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
  /**主菜单展开项*/
  mainExpandItem?: MenuItemType;
  /**搜索菜单*/
  searchMenuItems?: MenuItemType[];
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
    if (Array.isArray(item.items)) {
      _list.push(...flatMenuItems(item.items, [...parentPath].concat(item), parentMenuItemMap));
    }
  }
  return _list;
};

/**菜单搜索*/
const filterMenuItems = (items: MenuItemType[], keyword: string) => {
  return items.filter((item) => {
    if (Array.isArray(item.items) && item.items.length) {
      return filterMenuItems(item.items, keyword).length > 0;
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
    mainExpandItem: undefined,
    searchMenuItems: [],
  });
  /**设置菜单所有数据*/
  ctor = (items: MenuItemType[]) => {
    const _items: MenuItemType[] = items.map((it) => ({
      ...it,
      isMain: it.type === 'group' ? true : it.isMain ?? false,
      type: it.type === 'group' ? 'group' : it.isMain ? 'group' : it.type,
    }));

    this._menuItems = _items;
    this._flatMenuItems = flatMenuItems(_items, [], this._parentMenuItemMap);
    this.state.menuItems = ref(_items);
    this.state.mainMenuItems = ref(_items.filter((item) => item.isMain));
    this.state.searchMenuItems = ref([...this._flatMenuItems].filter((it) => !it.isMain));
    const fixedItems = this._flatMenuItems.filter((it) => it.isTabFixed && !it.isMain);
    if (fixedItems.length) {
      tabBarDataInstance.ctor(fixedItems);
    }
  };

  /**更新主菜单展开项*/
  updateMainExpandItem = (item?: MenuItemType) => {
    this.state.mainExpandItem = item;
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
      this.state.searchMenuItems = ref([...this._flatMenuItems].filter((it) => !it.isMain));
      return;
    }
    this.state.searchMenuItems = ref(
      this._flatMenuItems.filter((it) => !it.isMain).filter((item) => item.title.includes(_key)),
    );
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
    const finxItem = this.get_path_menuItem(path);
    /**如果没找到则不进行更新*/
    if (!finxItem) {
      return;
    }
    // 还有一种，这个是子菜单，需要展开父级所有菜单

    /**只有在未存在展开项时才进行更新(刚进行加载数据)*/
    if (this.state.expandItems.length === 0) {
      const parentItems = this._parentMenuItemMap.get(path) || [];
      this.state.expandItems = ref([...parentItems]);
      return;
    }
    // 如果不存在子菜单，则不进行更新展开项
    const _item = this.get_path_menuItem(path);
    const parentItems = this._parentMenuItemMap.get(path) || [];
    if (Array.isArray(_item?.items) && _item.items.length) {
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
    const mainMenuItemSelected = this.state.mainMenuItemSelected;
    const parentItems = this._parentMenuItemMap.get(path);
    const currentMainMenuItemPath = parentItems?.[0]?.path;
    if (currentMainMenuItemPath && currentMainMenuItemPath !== mainMenuItemSelected) {
      this.state.mainMenuItemSelected = currentMainMenuItemPath;
      const _item = this.state.mainMenuItems.find((ite) => ite.path === currentMainMenuItemPath);
      if (_item) {
        this.state.menuItems = ref(_item.items);
      }
    }
  };

  /**点击主菜单切换*/
  onMainMenu = (path: string) => {
    const _item = this.state.mainMenuItems.find((ite) => ite.path === path);
    if (_item) {
      if (Array.isArray(_item.items)) {
        this.state.menuItems = ref(_item.items);
        this.state.mainMenuItemSelected = path;
      }
    }
  };

  /**清空*/
  clear = () => {
    this.state.menuItems = ref([]);
    this.state.mainMenuItems = ref([]);
    this.state.mainMenuItemSelected = '';
    this.state.expandItems = ref([]);
    this.state.mainExpandItem = undefined;
    this.state.searchMenuItems = ref([]);
  };
  /**跳转之前触发，返回 false 则不跳转*/
  onBeforeNavigate?: (item: MenuItemType) => boolean | Promise<boolean>;
}
/**菜单数据使用实例*/
export const menuDataInstance = new MenuDataInstance();

export const useMenuDataInstance = () => {
  const state = useSnapshot(menuDataInstance.state);
  return [state, menuDataInstance, state.__defaultValue] as [
    MenuDataInstanceState,
    MenuDataInstance,
    string | undefined,
  ];
};
