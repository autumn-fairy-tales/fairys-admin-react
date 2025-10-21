import { proxy, useSnapshot } from 'valtio';
import { isBrowser } from 'utils';

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
export type LayoutMode =
  | 'main_sub_left'
  | 'main_left'
  // | "main_left_sub_all"
  | 'main_top_header'
  // | "main_top_sub_all_header"
  | 'main_top_sub_left_header'
  | 'left'
  | 'left_header'
  | 'mobile';

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
  /**标签栏*/
  // /**是否启用标签栏*/
  // enableTabBar?: boolean;
  // /**是否显示图标*/
  // tabBarShowIcon?: boolean;
  // /**标签页双击执行动作*/
  // tabBarDoubleClickAction?: '';
  /**工具栏*/
  /**是否启用工具栏*/
  // enableToolBar?: boolean;
  /**是否启用收藏夹*/
  enableToolBarFavorites?: boolean;
  /**收藏夹最多可存储多少个*/
  favoritesMaxLength?: number;
  // /**面包屑导航*/
  // enableToolBarBreadcrumb?: boolean;
  // /**导航搜索*/
  // enableToolBarSearch?: boolean;
  /**通知中心*/
  enableToolBarNotification?: boolean;
  /**全屏*/
  enableToolBarFullScreen?: boolean;
  isFullScreen?: boolean;
  /**页面刷新*/
  enableToolBarRefresh?: boolean;
  // /**是否启用页面水印*/
  // enableWatermark?: boolean;
  /**
   * 判断屏幕宽度是否是移动端布局
   * @default 1024
   */
  maxWidthScreen?: number;
  /**是否移动布局*/
  isMobile?: boolean;
  /**只是默认值，不使用*/
  __defaultValue?: string;
}

export class SettingDataInstance {
  static localStorageKey = 'fairys_setting_state';

  state = proxy<SettingDataInstanceState>({
    open: false,
    /**布局模式*/
    layoutMode: 'main_top_sub_left_header',
    _oldLayoutMode: 'main_top_sub_left_header',
    pageTransitionMode: '滑动',
    /**自动监听系统的明暗色系*/
    autoListenSystemTheme: true,
    /**侧边栏模式*/
    sideMenuMode: 'open',
    /**是否启用收藏夹*/
    enableToolBarFavorites: true,
    /**收藏夹最多可存储多少个*/
    favoritesMaxLength: 20,
    /**是否启用工具栏通知中心*/
    enableToolBarNotification: true,
    /**是否启用工具栏全屏*/
    enableToolBarFullScreen: true,
    /**是否启用工具栏刷新*/
    enableToolBarRefresh: true,
    /**
     * 判断屏幕宽度是否是移动端布局
     * @default 1024
     */
    maxWidthScreen: 1024,
    isMobile: false,
  });

  /**浏览器端初始化*/
  _browserConstructor = () => {
    const state = localStorage.getItem(SettingDataInstance.localStorageKey);
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
  };

  constructor() {
    if (isBrowser) {
      this._browserConstructor();
    }
  }

  /**初始化配置
   * @deprecated 请使用 `ctor` 方法
   */
  initSetting = (state: SettingDataInstanceState = {}) => {
    this.ctor(state);
  };

  /**初始配置*/
  ctor = (state: SettingDataInstanceState = {}) => {
    const _newState: SettingDataInstanceState = {
      layoutMode: 'main_top_sub_left_header',
      ...state,
      ...this.state,
    };
    if (_newState) {
      _newState._oldLayoutMode = _newState.layoutMode;
    }
    this.state = proxy({
      ..._newState,
      /**项目名和logo 始终取设置的值*/
      projectName: state.projectName,
      logo: state.logo,
    });
    if (this.state.themeColor) {
      if (document.documentElement) {
        document.documentElement.setAttribute('style', `--fairys-theme-color:${this.state.themeColor}`);
      }
      if (document.body) {
        document.body.setAttribute('style', `--fairys-theme-color:${this.state.themeColor}`);
      }
    }
    this.autoListenSystemTheme();
  };

  // =============================================主题===================================================
  /**监听系统主题变化*/
  mediaQueryList: MediaQueryList | null = null;
  /**更新文档和body的主题*/
  setDocumentAndBodyTheme = () => {
    const theme = this.state.theme;
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
  /**监听事件更新系统主题*/
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
      this.setDocumentAndBodyTheme();
    }
  };
  /**切换自动监听系统的明暗色系*/
  onToggleAutoListenSystemTheme = (autoListenSystemTheme: boolean) => {
    this.updated({ autoListenSystemTheme });
    this.autoListenSystemTheme();
  };
  /**点击设置切换主题*/
  onToggleTheme = (theme: 'light' | 'dark' | 'system') => {
    if (theme === 'system') {
      this.updated({ autoListenSystemTheme: true });
    } else {
      this.updated({ theme, autoListenSystemTheme: false });
    }
    this.autoListenSystemTheme();
  };
  // ================================================================================================
  /**更新主题颜色*/
  updatedThemeColor = (themeColor: string) => {
    this.updated({ themeColor });
    if (themeColor) {
      document.body.setAttribute('style', `--fairys-theme-color:${themeColor}`);
    } else {
      document.body.removeAttribute('style');
    }
  };
  // ================================================================================================

  /**更新配置*/
  updated = (state: SettingDataInstanceState) => {
    /**只做更改值存储，其他的默认值不做处理*/
    let _state: Partial<SettingDataInstanceState> = {};
    try {
      _state = JSON.parse(localStorage.getItem(SettingDataInstance.localStorageKey) || '{}');
    } catch (error) {
      console.log(error);
    }
    for (const key in state) {
      const element = state[key];
      this.state[key] = element;
      /**open 不做本地存储*/
      if (key !== 'open') {
        _state[key] = element;
      }
      if (key === 'layoutMode') {
        _state._oldLayoutMode = this.state.layoutMode;
      }
      if (key === 'theme') {
        this.setDocumentAndBodyTheme();
      }
    }
    localStorage.setItem(SettingDataInstance.localStorageKey, JSON.stringify(_state));
  };
  /**判断是否主子菜单模板*/
  isMainSubMenuMode = () => {
    return (
      this.state.layoutMode === 'main_sub_left' ||
      this.state.layoutMode === 'main_left' ||
      this.state.layoutMode === 'main_top_header' ||
      this.state.layoutMode === 'main_top_sub_left_header'
    );
  };
  /**切换打开偏好设置*/
  onToggleOpen = () => {
    this.updated({ open: !this.state.open });
  };
  // ============================================全屏====================================================
  /**全屏监听*/
  onFullscreenChange = () => {
    // 如果有元素处于全屏模式，则 document.fullscreenElement 将指向该元素。如果没有元素处于全屏模式，则该属性的值为 null。
    if (!document.fullscreenElement) {
      this.state.isFullScreen = false;
    } else {
      this.state.isFullScreen = true;
    }
  };
  addEventListenerFullscreenChange = () => {
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', this.onFullscreenChange);
    };
  };
  /**全屏*/
  onToggleFullScreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } catch (error) {
      console.log('onToggleFullScreen===>', error);
    }
  };
  // ============================================屏幕大小====================================================
  /**监听屏幕变化，用于控制菜单布局*/
  mediaQueryListScreen: MediaQueryList | null = null;

  /**监听屏幕变化，用于控制菜单布局*/
  onListenChangeScreen = (e: MediaQueryListEvent) => {
    this.state.layoutMode = e.matches ? 'mobile' : this.state._oldLayoutMode;
    this.state.isMobile = e.matches;
  };

  /**自动监听屏幕变化，用于控制菜单布局*/
  autoListenScreen = () => {
    if (this.state.maxWidthScreen) {
      if (!this.mediaQueryListScreen) {
        this.mediaQueryListScreen = window.matchMedia(`(max-width: ${this.state.maxWidthScreen}px)`);
      } else {
        this.mediaQueryListScreen.removeEventListener('change', this.onListenChangeScreen);
      }
      this.state.layoutMode = this.mediaQueryListScreen.matches ? 'mobile' : this.state._oldLayoutMode;
      this.state.isMobile = this.mediaQueryListScreen.matches;
      this.mediaQueryListScreen.addEventListener('change', this.onListenChangeScreen);
    }
    return () => {
      this.mediaQueryListScreen?.removeEventListener('change', this.onListenChangeScreen);
      this.mediaQueryListScreen = null;
    };
  };

  /**清空*/
  clear = () => {};
}

export const settingDataInstance = new SettingDataInstance();

export const useSettingDataInstance = () => {
  const state = useSnapshot(settingDataInstance.state);
  return [state, settingDataInstance, state.__defaultValue] as [
    SettingDataInstanceState,
    SettingDataInstance,
    string | undefined,
  ];
};
