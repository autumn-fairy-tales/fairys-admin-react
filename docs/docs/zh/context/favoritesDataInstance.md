# favoritesDataInstance 收藏数据

:::tip 提示

用于存储当前应用的收藏数据，包括收藏的菜单项。

:::

## 引入

```ts
import { favoritesDataInstance , useFavoritesDataInstance } from '@fairys/admin-tools-react';
```

## 状态值

```ts
import { MenuItemType } from './menu-data';
export type FavoritesDataInstanceState = {
    /**列表数据*/
    dataList?: MenuItemType[];
};
```

## 实体类

```ts
import { MenuItemType } from './menu-data';
export declare class FavoritesDataInstance {
    static localStorageKey: string;
    state: FavoritesDataInstanceState;
    /**添加*/
    addItem: (item: MenuItemType) => void;
    /**移除*/
    removeItem: (item: MenuItemType) => void;
    /**清空数据*/
    clear: () => void;
}
```

## hooks

```ts
export  const useFavoritesDataInstance: () => [FavoritesDataInstanceState, FavoritesDataInstance, FavoritesDataInstanceState["__defaultValue"]];
```

## 示例

```ts title='添加收藏项'
import { favoritesDataInstance } from '@fairys/admin-tools-react';
// 添加收藏项
favoritesDataInstance.addItem({
    title: '首页2',
    path: '/main-menu2/home',
    icon: 'ant-design:home-outlined',
});
```

```ts title='移除收藏项'
import { favoritesDataInstance } from '@fairys/admin-tools-react';
// 移除收藏项
favoritesDataInstance.removeItem({
    title: '首页2',
    path: '/main-menu2/home',
    icon: 'ant-design:home-outlined',
});
```