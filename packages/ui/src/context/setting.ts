import { proxy, useSnapshot } from 'valtio';

/**
 * 1. main_sub_left:左侧主菜单 + 子菜单 + 无头部信息
 * 2. main_left:左侧主菜单 + 移入子菜单展示 + 无头部信息
 * 3. main_left_sub_all:左侧主菜单 + 移入子菜单展示所有  + 无头部信息
 * 4. main_top:顶部菜单 +  移入子菜单展示 + 有头部信息
 * 5. main_top_sub_all:顶部菜单 +  移入子菜单展示所有 + 有头部信息
 * 6. main_top_sub_left:顶部主菜单 + 侧边子菜单 + 有头部信息
 * 7. left:不区分主子菜单并且左侧显示 + 无头部信息(用户信息一起移入左侧显示)
 * 8. left_top:不区分主子菜单并且左侧显示 + 头部信息
 */
export type LayoutMode =
  | 'main_sub_left'
  | 'main_left'
  | 'main_left_sub_all'
  | 'main_top'
  | 'main_top_sub_all'
  | 'main_top_sub_left'
  | 'left'
  | 'left_top';

export interface SettingInstacneState {
  /**颜色主题风格*/
  theme?: 'dark' | 'light' | 'auto';
  /**主题颜色*/
  themeColor?: string;
  /**圆角系数*/
  borderRadius?: number;
  /**导航栏模式*/
  layoutMode?: LayoutMode;
  /**暗黑导航栏*/
  darkMenu?: boolean;
  /**页面切换动画*/
  pageTransitionMode?: '';

  /**导航栏*/
  /**次导航保持展开一个*/
  keepOneSubMenu?: boolean;
  /**导航栏选中风格*/
  mainMenuSelectStyle?: '';
  /**是否启用主导航快捷键*/
  enableMainMenuShortcut?: boolean;

  /**标签栏*/
  /**是否启用标签栏*/
  enableTabBar?: boolean;
  /**标签栏风格*/
  tabBarStyle?: '';
  /**是否显示图标*/
  tabBarShowIcon?: boolean;
  /**标签页双击执行动作*/
  tabBarDoubleClickAction?: '';
  /**是否启用快捷键*/
  enableTabBarShortcut?: boolean;

  /**工具栏*/
  /**是否启用工具栏*/
  enableToolBar?: boolean;
  /**是否启用收藏夹*/
  enableToolBarFavorites?: boolean;
  /**面包屑导航*/
  enableToolBarBreadcrumb?: boolean;
  /**导航搜索*/
  enableToolBarSearch?: boolean;
  /**通知中心*/
  enableToolBarNotification?: boolean;
  /**全屏*/
  enableToolBarFullScreen?: boolean;

  /**面包屑导航风格*/
  breadcrumbStyle?: '';
  /**是否启用页面水印*/
  enableWatermark?: boolean;

  /**只是默认值，不使用*/
  __defaultValue?: string;
}

class SettingInstacne {
  state = proxy<SettingInstacneState>({
    layoutMode: 'left_top',
  });

  constructor() {
    const state = localStorage.getItem('setting_state');
    if (state) {
      try {
        const newState = JSON.parse(state);
        for (const key in newState) {
          const element = newState[key];
          this.state[key] = element;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  initState = (state: SettingInstacneState) => {
    this.state = proxy({ layoutMode: 'left_top', ...state });
    localStorage.setItem('setting_state', JSON.stringify({ layoutMode: 'left_top', ...state }));
  };

  updated = (state: SettingInstacneState) => {
    for (const key in state) {
      const element = state[key];
      this.state[key] = element;
    }
    localStorage.setItem('setting_state', JSON.stringify(this.state));
  };
}

export const settingInstacne = new SettingInstacne();

export const useSetting = () => {
  const state = useSnapshot(settingInstacne.state);
  return [state, settingInstacne, state.__defaultValue] as [SettingInstacneState, SettingInstacne, string | undefined];
};
