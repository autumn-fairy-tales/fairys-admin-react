# tabBarDataInstance 页面标签栏

:::tip 提示

用于存储当前应用的页面标签栏数据，包括标签栏项集合、右侧选择的标签栏项集合、页面是否全屏等。

:::

## 引入

```ts
import { tabBarDataInstance } from '@fairys/admin-tools-react';
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
}
```

## 实体类

:::warning 注意

在调用`menuDataInstance`的`ctor`方法初始化菜单，会自动调用`tabBarDataInstance`的`ctor`方法初始化标签栏项集合。

:::

```ts
export class TabBarDataInstance {
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
export const useTabBarDataInstance: () => [TabBarInstanceState, TabBarDataInstance, string | undefined];
```

## 示例

```ts title='tab项操作'
import { tabBarDataInstance } from '@fairys/admin-tools-react';
// 添加tab项
tabBarDataInstance.addItem({
    path: '/',
    name: '首页',
});

// 删除tab项
tabBarDataInstance.remove('/');

// 关闭其他标签
tabBarDataInstance.removeOther(0, true);

// 关闭左侧标签
tabBarDataInstance.removeLeft(0, true);

// 关闭右侧标签
tabBarDataInstance.removeRight(0, true);

```