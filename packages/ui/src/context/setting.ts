import { proxy, useSnapshot } from 'valtio';

/**
 * 1. main_sub_left:左侧主菜单 + 子菜单 + 无头部信息
 * 2. main_left:左侧主菜单 + 移入子菜单展示 + 无头部信息
 * 3. main_left_sub_all:左侧主菜单 + 移入子菜单展示所有  + 无头部信息
 * 4. main_top_header:顶部菜单 +  移入子菜单展示 + 有头部信息
 * // 5. main_top_sub_all_header:顶部菜单 +  移入子菜单展示所有 + 有头部信息
 * 6. main_top_sub_left_header:顶部主菜单 + 侧边子菜单 + 有头部信息
 * 7. left:不区分主子菜单并且左侧显示 + 无头部信息(用户信息一起移入左侧显示)
 * 8. left_top_header:不区分主子菜单并且左侧显示 + 有头部信息
 * 9. mobile:移动端布局,不进行区分主子菜单，使用弹框展示，布局使用 `left` 布局
 */
export type LayoutMode =
  | 'main_sub_left'
  | 'main_left'
  | 'main_left_sub_all'
  | 'main_top_header'
  // | "main_top_sub_all_header"
  | 'main_top_sub_left_header'
  | 'left'
  | 'left_top_header'
  | 'mobile';

export interface SettingInstanceState {
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
  /**暗黑导航栏*/
  darkMenu?: boolean;
  /**侧边栏模式*/
  sideMenuMode?: 'open' | 'close';
  /**页面切换动画*/
  pageTransitionMode?: '';
  /**标签栏*/
  /**是否启用标签栏*/
  enableTabBar?: boolean;
  /**是否显示图标*/
  tabBarShowIcon?: boolean;
  /**标签页双击执行动作*/
  tabBarDoubleClickAction?: '';
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
  /**页面刷新*/
  enableToolBarRefresh?: boolean;

  /**是否启用页面水印*/
  enableWatermark?: boolean;
  /**载入进度条*/
  enableProgress?: boolean;

  /**只是默认值，不使用*/
  __defaultValue?: string;
}

class SettingInstance {
  static localStorageKey = 'fairys_setting_state';

  state = proxy<SettingInstanceState>({
    /**布局模式*/
    layoutMode: 'main_top_sub_left_header',
    // /**自动监听系统的明暗色系*/
    // autoListenSystemTheme: true,
    /**侧边栏模式*/
    sideMenuMode: 'open',
  });

  constructor() {
    const state = localStorage.getItem(SettingInstance.localStorageKey);
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

  mediaQueryList: MediaQueryList | null = null;

  setDocumentAndBodyTheme = () => {
    const theme = this.state.theme;
    console.log(theme);
    if (theme) {
      if (document.documentElement) {
        document.documentElement.classList.remove(theme === 'dark' ? 'light' : 'dark');
        document.documentElement.classList.add(theme);
      }
      if (document.body) {
        document.body.classList.remove(theme === 'dark' ? 'light' : 'dark');
        document.body.classList.add(theme);
      }
    }
  };

  onListenChangeSystemTheme = (e: MediaQueryListEvent) => {
    this.updated({ theme: e.matches ? 'dark' : 'light' });
    this.setDocumentAndBodyTheme();
  };

  /**自动监听系统的明暗色系*/
  autoListenSystemTheme = () => {
    if (this.state.autoListenSystemTheme) {
      if (!this.mediaQueryList) {
        this.mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
      } else {
        this.mediaQueryList.removeEventListener('change', this.onListenChangeSystemTheme);
      }
      this.updated({ theme: this.mediaQueryList.matches ? 'dark' : 'light' });
      this.setDocumentAndBodyTheme();
      this.mediaQueryList.addEventListener('change', this.onListenChangeSystemTheme);
    } else {
      this.mediaQueryList?.removeEventListener('change', this.onListenChangeSystemTheme);
      this.mediaQueryList = null;
    }
  };

  /**初始配置*/
  initSetting = (state: SettingInstanceState) => {
    const _newState: SettingInstanceState = {
      layoutMode: 'main_top_sub_left_header',
      ...state,
      ...this.state,
    };
    this.state = proxy({
      ..._newState,
      /**项目名和logo 始终取设置的值*/
      projectName: state.projectName,
      logo: state.logo,
    });
    if (this.state.themeColor) {
      document.body.setAttribute('style', `--theme-color:${this.state.themeColor}`);
    }
    this.autoListenSystemTheme();
    localStorage.setItem(SettingInstance.localStorageKey, JSON.stringify({ ...this.state }));
  };

  /**更新主题颜色*/
  updatedThemeColor = (themeColor: string) => {
    this.updated({ themeColor });
    if (themeColor) {
      document.body.setAttribute('style', `--theme-color:${themeColor}`);
    } else {
      document.body.removeAttribute('style');
    }
  };

  /**更新配置*/
  updated = (state: SettingInstanceState) => {
    for (const key in state) {
      const element = state[key];
      this.state[key] = element;
      if (key === 'theme') {
        this.setDocumentAndBodyTheme();
      }
    }
    localStorage.setItem(SettingInstance.localStorageKey, JSON.stringify(this.state));
  };

  /**判断是否主子菜单模板*/
  isMainSubMenuMode = () => {
    return (
      this.state.layoutMode === 'main_sub_left' ||
      this.state.layoutMode === 'main_left' ||
      this.state.layoutMode === 'main_top_header' ||
      this.state.layoutMode === 'main_left_sub_all' ||
      this.state.layoutMode === 'main_top_sub_left_header'
    );
  };
}

export const settingInstance = new SettingInstance();

export const useSetting = () => {
  const state = useSnapshot(settingInstance.state);
  return [state, settingInstance, state.__defaultValue] as [SettingInstanceState, SettingInstance, string | undefined];
};
