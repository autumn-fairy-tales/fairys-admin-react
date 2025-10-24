# menuDataInstance 菜单数据

:::tip 提示

用于存储当前应用的菜单数据，包括侧边渲染菜单、主菜单、主菜单选中项、展开项、主菜单展开项等。

:::

:::warning 注意

请在渲染`Layout`和`FairysRoot`组件之前，调用`ctor`方法设置菜单数据

:::

## 引入

```ts
import { menuDataInstance } from '@fairys/admin-tools-react';
```

## 状态值

```ts
import type { FairysIconPropsType } from "components/icon"

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
}

export interface MenuItemType {
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
  /**在left布局中，父级是否显示
   * @default true
   */
  left_isMainShow?: boolean;
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

```

## 实体类

```ts
export class MenuDataInstance {
    /**原始整个菜单*/
    _menuItems: MenuItemType[];
    /**平铺所有菜单数据*/
    _flatMenuItems: MenuItemType[];
    /**地址查找父级路径*/
    _parentMenuItemMap: Map<string, MenuItemType[]>;
    /**菜单数据状态*/
    state: MenuDataInstanceState;
    /**设置菜单所有数据*/
    ctor: (items: MenuItemType[]) => void;
    /**更新主菜单展开项*/
    updateMainExpandItem: (item?: MenuItemType) => void;
    /**
     * 通过path获取菜单对象
     * 暂不支持 /path/:id 这种动态路由
     */
    get_path_menuItem: (path: string) => MenuItemType;
    /**搜索菜单*/
    onSearch: (word: string) => void;
    /**判断是否是父级菜单*/
    isParentMenuItem: (path: string, location_path: string) => boolean;
    /**清空展开项*/
    clearExpandItems: () => void;
    /**展开项*/
    onExpandItems: (path: string) => void;
    /**折叠*/
    onCollapseItems: (path: string) => void;
    /**切换展示隐藏*/
    onToggleItems: (path: string) => void;
    /**是否展示*/
    isExpand: (path: string) => boolean;
    /**更新子菜单显示,和主菜单选中项*/
    updateChildMenus: (path: string) => void;
    /**点击主菜单切换*/
    onMainMenu: (path: string) => void;
    /**清空*/
    clear: () => void;
    /**跳转之前触发，返回 false 则不跳转*/
    onBeforeNavigate?: (item: MenuItemType) => boolean | Promise<boolean>;
}
```

## hooks

```ts
export const useMenuDataInstance: () => [MenuDataInstanceState, MenuDataInstance, string | undefined];
```

## 示例

```ts title='设置菜单所有数据'
import { menuDataInstance } from '@fairys/admin-tools-react';
// 设置菜单所有数据
menuDataInstance.ctor([
    {
        title: '首页',
        path: '/home',
        icon: 'ant-design:home-outlined',
    },
]);
```
