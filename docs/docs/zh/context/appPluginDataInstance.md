# appPluginDataInstance 应用插件数据

:::tip 提示

用于存储当前应用的插件数据，包括工具条右侧插件、头像菜单插件等。

:::

:::warning 注意

请在渲染`Layout`和`FairysRoot`组件之前，设置属性值

:::

## 引入

```ts
import { appPluginDataInstance } from '@fairys/admin-tools-react';
```

## 实体类

```ts
import { FairysPopoverMenuItemType } from '../components/popover-menu';
export type AppPluginType = {
    /**工具条右侧插件*/
    'toolBar-right'?: {
        /**渲染组件*/
        render?: React.ReactNode;
        /**渲染重写函数*/
        override?: (menus: React.ReactNode[]) => React.ReactNode;
    };
    /**头像菜单插件*/
    'avatar-menus'?: {
        /**添加菜单项*/
        menus?: FairysPopoverMenuItemType[];
        /**重写菜单项*/
        override?: (menus: FairysPopoverMenuItemType[]) => FairysPopoverMenuItemType[];
    };
};

export class AppPluginDataInstance {
    /**插件组件*/
    appPlugins: AppPluginType;
    /**添加插件*/
    addPlugin: (plugin: AppPluginType) => void;
    /**清空数据*/
    clear: () => void;
}
```
