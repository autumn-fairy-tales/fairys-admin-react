# settingDataInstance 设置数据

:::tip 提示

用于存储当前应用的设置数据，包括导航栏模式、侧边栏模式、页面切换动画、标签栏等。

:::

:::warning 注意

如果需要设置初始值，请在渲染`Layout`和`FairysRoot`组件之前，调用`ctor`方法初始化设置数据

:::

## 引入

```ts
import { settingDataInstance , useSettingDataInstance } from '@fairys/admin-tools-react';
```

## 状态值

```ts
/**
 * 1. main_sub_left:左侧主菜单 + 子菜单 + 无头部信息
 * 2. main_left:左侧主菜单 + 移入子菜单展示 + 无头部信息
 * // 3. main_left_sub_all:左侧主菜单 + 移入子菜单展示所有  + 无头部信息
 * 4. main_top_header:顶部菜单 +  移入子菜单展示 + 有头部信息
 * // 5. main_top_sub_all_header:顶部菜单 +  移入子菜单展示所有 + 有头部信息
 * 6. main_top_sub_left_header:顶部主菜单 + 侧边子菜单 + 有头部信息
 * 7. left:不区分主子菜单并且左侧显示 + 无头部信息(用户信息一起移入左侧显示)
 * 8. left_header:不区分主子菜单并且左侧显示 + 有头部信息
 * 9. mobile:移动端布局,不进行区分主子菜单，使用弹框展示，布局使用 `left` 布局
 */
export type LayoutMode = 'main_sub_left' | 'main_left' | 'main_top_header' | 'main_top_sub_left_header' | 'left' | 'left_header' | 'mobile';
export interface SettingDataInstanceState {
     /**是否打开偏好设置*/
  open?: boolean;
  /**logo加载地址*/
  logo?: string;
  /**项目名*/
  projectName?: string;
  /**颜色主题风格*/
  theme?: 'dark' | 'light';
  /**自动监听系统的明暗色系*/
  autoListenSystemTheme?: boolean;
  /**主题颜色*/
  themeColor?: string;
  /**导航栏模式*/
  layoutMode?: LayoutMode;
  /**旧的导航栏模式,(用于切换mobile布局时，切换回旧的布局模式)*/
  _oldLayoutMode?: LayoutMode;
  /**暗黑导航栏*/
  darkMenu?: boolean;
  /**侧边栏模式*/
  sideMenuMode?: 'open' | 'close';
  /**页面切换动画*/
  pageTransitionMode?: '无动画' | '滑动' | '缩放消退' | '闪现' | '淡入淡出' | string;
  /**是否启用收藏夹*/
  enableToolBarFavorites?: boolean;
  /**收藏夹最多可存储多少个*/
  favoritesMaxLength?: number;
  /**通知中心*/
  enableToolBarNotification?: boolean;
  /**全屏*/
  enableToolBarFullScreen?: boolean;
  isFullScreen?: boolean;
  /**页面刷新*/
  enableToolBarRefresh?: boolean;
  /**
   * 判断屏幕宽度是否是移动端布局
   * @default 1024
   */
  maxWidthScreen?: number;
  /**是否移动布局*/
  isMobile?: boolean;
}
```

## 实体类

```ts
export declare class SettingDataInstance {
    static localStorageKey: string;
    state: SettingDataInstanceState;
    constructor();
    /**初始配置*/
    ctor: (state: SettingDataInstanceState) => void;
    /**监听系统主题变化*/
    mediaQueryList: MediaQueryList | null;
    /**更新文档和body的主题*/
    setDocumentAndBodyTheme: () => void;
    /**监听事件更新系统主题*/
    onListenChangeSystemTheme: (e: MediaQueryListEvent) => void;
    /**自动监听系统的明暗色系*/
    autoListenSystemTheme: () => void;
    /**切换自动监听系统的明暗色系*/
    onToggleAutoListenSystemTheme: (autoListenSystemTheme: boolean) => void;
    /**点击设置切换主题*/
    onToggleTheme: (theme: "light" | "dark" | "system") => void;
    /**更新主题颜色*/
    updatedThemeColor: (themeColor: string) => void;
    /**更新配置*/
    updated: (state: SettingDataInstanceState) => void;
    /**判断是否主子菜单模板*/
    isMainSubMenuMode: () => boolean;
    /**切换打开偏好设置*/
    onToggleOpen: () => void;
    /**全屏监听*/
    onFullscreenChange: () => void;
    addEventListenerFullscreenChange: () => () => void;
    /**全屏*/
    onToggleFullScreen: () => Promise<void>;
    /**监听屏幕变化，用于控制菜单布局*/
    mediaQueryListScreen: MediaQueryList | null;
    /**监听屏幕变化，用于控制菜单布局*/
    onListenChangeScreen: (e: MediaQueryListEvent) => void;
    /**自动监听屏幕变化，用于控制菜单布局*/
    autoListenScreen: () => () => void;
    /**清空*/
    clear: () => void;
}
```

## hooks

```ts
export const useSettingDataInstance: () => [SettingDataInstanceState, SettingDataInstance, string | undefined];
```

## 示例

```ts title='初始属性值'
import { settingDataInstance } from '@fairys/admin-tools-react';
// 设置项目名
settingDataInstance.updated({ 
  projectName: 'Fairys Admin',
  themeColor: '#af52de',
});
```
