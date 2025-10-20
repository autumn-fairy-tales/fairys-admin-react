# tabBarInstance 页面标签栏

:::tip 提示

用于存储当前应用的页面标签栏数据，包括标签栏项集合、右侧选择的标签栏项集合、页面是否全屏等。

:::

## 引入

```ts
import { tabBarInstance } from '@fairys/admin-tools-react';
```

## 状态值

```ts
import type { MenuItemType } from './menu-data';
export interface TabBarItemType extends MenuItemType {
}
export interface TabBarInstanceState {
    /**tab项集合*/
    tabBarItems: TabBarItemType[];
    /**右侧选择的tab项集合,不在可视区域的数据*/
    dropDownTabBarItems: TabBarItemType[];
    /**页面是否全屏*/
    pageFullScreen?: boolean;
    /**默认引用值*/
    __defaultValue?: string;
}
```

## 实体类

```ts
export class TabBarInstance {
    state: TabBarInstanceState;
    /**初始化渲染菜单数据*/
    ctor: (tabBarItems: MenuItemType[]) => void;
    /**添加tab项*/
    addItem: (item: TabBarItemType) => void;
    /**根据path添加tab项*/
    add: (path: string) => void;
    /**删除tab项*/
    remove: (path: string, isActive: boolean) => void;
    /**设置页面是否全屏*/
    onToggleFullScreen: () => void;
    /**关闭其他标签*/
    removeOther: (current: number, isActive: boolean) => void;
    /**移除左侧*/
    removeLeft: (current: number, isActive: boolean) => void;
    /**移除右侧*/
    removeRight: (current: number, isActive: boolean) => void;
    /**清空tab项*/
    clear: () => void;
}
```

## hooks

```ts
export const useTabBar: () => [TabBarInstanceState, TabBarInstance, string | undefined];
```
