# appPluginDataInstance 应用插件数据

:::tip 提示

用于存储当前应用的插件数据，包括工具条右侧插件、头像菜单插件等。

:::

:::warning 注意

建议在渲染`Layout`和`FairysRoot`组件之前，设置属性值

:::

## 引入

```ts
import { appPluginDataInstance } from '@fairys/admin-tools-react';
```

## 实体类

```ts
import { FairysPopoverMenuItemType } from '@fairys/admin-tools-react';
export type AppPluginDataInstanceType = {
 /**工具条右侧插件*/
  'toolBar-right'?: {
    /**渲染组件*/
    render?: React.ReactNode;
    /**渲染重写函数*/
    override?: (menus: React.ReactNode[]) => React.ReactNode;
  };
  'toolBar-middle'?: {
    /**渲染组件*/
    render?: React.ReactNode;
  };
  /**头像菜单插件*/
  'avatar-menus'?: {
    /**添加菜单项*/
    menus?: FairysPopoverMenuItemType[];
    /**重写菜单项*/
    override?: (menus: FairysPopoverMenuItemType[]) => FairysPopoverMenuItemType[];
  };
  /**设置抽屉添加其他项*/
  "setting"?: {
    /**渲染组件*/
    render?: React.ReactNode;
  };
  /**头部渲染*/
  "header"?: {
    /**渲染组件*/
    render?: React.ReactNode;
  };
  /**子菜单底部切换展开折叠按钮位置上下渲染*/
  "child-menu-bottom"?: {
    /**渲染组件*/
    "top-render"?: React.ReactNode;
    "bottom-render"?: React.ReactNode;
  };
  /**主菜单底部渲染*/
  "main-menu-bottom"?: {
    /**渲染组件*/
    "render"?: React.ReactNode;
  };
};

export class AppPluginDataInstance {
    /**插件组件*/
    appPlugins: AppPluginDataInstanceType;
     /**插件组件状态存储*/
    state: AppPluginDataInstanceType;
    /**添加插件*/
    addPlugin: (plugin: AppPluginDataInstanceType) => void;
     /**清空某个插件*/
    clearPlugin = (key: keyof AppPluginDataInstanceType) => void;
    /**清空数据*/
    clear: () => void;
}
/**应用插件数据实例*/
export const useAppPluginDataInstance: () => [AppPluginDataInstanceType, AppPluginDataInstance, string | undefined];
```

## 示例

```ts title='头像菜单插件'
import { appPluginDataInstance ,FairysPopoverMenuItemType} from '@fairys/admin-tools-react';
// 在 appPluginDataInstance 中添加自定义的菜单项
const menus:FairysPopoverMenuItemType[] =[
  { title: '测试', icon: 'ant-design:question-circle-outlined' },
  { title: '测试2', icon: 'ant-design:question-circle-outlined' },
]
appPluginDataInstance.addPlugin({
  'avatar-menus': {
    menus,
    /**重写菜单项*/
    // override: (menus2: FairysPopoverMenuItemType[]) => [...menus2, ...menus],
  },
});
```

```ts title='工具条右侧插件'
import { appPluginDataInstance } from '@fairys/admin-tools-react';

appPluginDataInstance.addPlugin({
  'toolBar-right': {
    /**渲染组件*/
    render: <div>测试</div>,
     /**重写菜单项*/
    // override: (menus: React.ReactNode[]) => [...menus,<div key='test' >测试</div>];
  },
});
```