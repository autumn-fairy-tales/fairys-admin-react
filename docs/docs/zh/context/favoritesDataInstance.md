# favoritesDataInstance 收藏数据

:::tip 提示

用于存储当前应用的收藏数据，包括收藏的菜单项。

:::

## 引入

```ts
import { favoritesDataInstance } from '@fairys/admin-tools-react';
```

## 状态值

```ts
import { MenuItemType } from './menu-data';
export type FavoritesDataState = {
    /**列表数据*/
    dataList?: MenuItemType[];
    /**默认引用值*/
    __defaultValue?: string;
};
```

## 实体类

```ts
import { MenuItemType } from './menu-data';
export declare class FavoritesDataInstance {
    static localStorageKey: string;
    state: FavoritesDataState;
    constructor();
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
export  const useFavoritesData: () => [FavoritesDataState, FavoritesDataInstance, FavoritesDataState["__defaultValue"]];
```
