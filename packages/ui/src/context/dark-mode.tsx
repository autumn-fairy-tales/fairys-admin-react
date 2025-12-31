import { createContext, useContext, useRef, ReactNode, createRef, useEffect, useMemo } from 'react';
import { proxy, useSnapshot } from 'valtio';
import { useSettingDataInstance } from './setting';

interface DarkModeInstanceState {
  theme: 'light' | 'dark';
}

export class DarkModeInstance {
  state = proxy<DarkModeInstanceState>({ theme: 'light' });

  setTheme = (theme: 'light' | 'dark') => {
    this.state.theme = theme;
  };

  ctor = (state: Partial<DarkModeInstanceState> = {}) => {
    for (const key in state) {
      const element = state[key];
      if (element) {
        this.state[key] = element;
      }
    }
    return this;
  };
}
export const DarkModeInstanceContext = createContext<DarkModeInstance>(new DarkModeInstance());

export const useDarkModeInstance = (darkModeInstance?: DarkModeInstance, theme?: 'light' | 'dark') => {
  const darkModeInstanceRef = useRef<DarkModeInstance>();
  if (!darkModeInstanceRef.current) {
    if (darkModeInstance) {
      darkModeInstanceRef.current = darkModeInstance;
      if (theme) {
        darkModeInstanceRef.current.ctor({ theme });
      }
    } else {
      darkModeInstanceRef.current = new DarkModeInstance().ctor({ theme });
    }
  }
  return darkModeInstanceRef.current;
};

export const useDarkModeInstanceContext = () => {
  const darkModeInstance = useContext(DarkModeInstanceContext);
  const state = useSnapshot(darkModeInstance.state);
  return [state, darkModeInstance] as [DarkModeInstanceState, DarkModeInstance];
};

export interface DarkModeInstanceContextProviderProps {
  children: ReactNode;
  /**是否暗色系*/
  theme?: 'light' | 'dark';
  /**自定义darkModeInstance*/
  darkModeInstance?: DarkModeInstance;
}

export const DarkModeInstanceContextProvider = (props: DarkModeInstanceContextProviderProps) => {
  const { children, theme, darkModeInstance: instance } = props;
  const darkModeInstance = useDarkModeInstance(instance, theme);
  useMemo(() => {
    darkModeInstance.setTheme(theme);
  }, [theme]);

  return <DarkModeInstanceContext.Provider value={darkModeInstance}>{children}</DarkModeInstanceContext.Provider>;
};

export const FairysDarkModeRoot = (props: DarkModeInstanceContextProviderProps) => {
  const { children, theme } = props;
  const [state] = useSettingDataInstance();
  const settTheme = theme || state.theme;
  const darkModeInstance = useDarkModeInstance(undefined, settTheme);
  useMemo(() => {
    darkModeInstance.setTheme(theme);
  }, [theme]);

  return <DarkModeInstanceContext.Provider value={darkModeInstance}>{children}</DarkModeInstanceContext.Provider>;
};

/**监听暗黑模式变化实例*/
export class DarkModeWatchInstance {
  public onUpdateDark: (darkMode: boolean) => void = () => void 0;
  /**
   * 监听暗黑模式变化的class属性
   * */
  public darkDOM = createRef<HTMLDivElement | HTMLElement>();
  /**
   * 监听暗黑模式变化的方式
   * - prefers-color-scheme: 监听系统暗黑模式变化
   * - html: 监听html元素的 class 变化
   * - body: 监听body元素的 class 变化
   * - string: 监听指定ID标签的 class 变化
   * */
  public watchDarkMode: 'html' | 'body' | 'prefers-color-scheme' | string = 'prefers-color-scheme';

  #mutationCallback: MutationCallback = (mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class' &&
        mutation.target instanceof HTMLElement
      ) {
        // 检查是否包含暗黑模式的 class
        if (mutation.target.classList.contains('dark')) {
          // 暗黑模式下的逻辑
          this.onUpdateDark(true);
        } else {
          // 正常模式下的逻辑
          this.onUpdateDark(false);
        }
      }
    }
  };
  /**标签监听*/
  #observer?: MutationObserver;
  /**
   * 通过标签监听
   */
  #html = (dom: HTMLDivElement | HTMLElement) => {
    if (!dom) {
      return;
    }
    // 创建观察器实例
    this.#observer = new MutationObserver(this.#mutationCallback);
    // 检查是否包含暗黑模式的 class
    if (dom.classList.contains('dark')) {
      // 暗黑模式下的逻辑
      this.onUpdateDark(true);
    } else {
      // 正常模式下的逻辑
      this.onUpdateDark(false);
    }
    // 开始观察
    this.#observer.observe(dom, {
      attributes: true,
      attributeFilter: ['class'], // 只监听 class 属性
    });
  };

  /**监听系统主题变化*/
  #mediaQueryList: MediaQueryList | null = null;

  /**监听事件更新系统主题*/
  #onListenChangeSystemTheme = (e: MediaQueryListEvent) => {
    this.onUpdateDark(e.matches);
  };

  #prefersColorScheme = () => {
    if (!this.#mediaQueryList) {
      this.#mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    } else {
      this.#mediaQueryList.removeEventListener('change', this.#onListenChangeSystemTheme);
    }
    this.#mediaQueryList.addEventListener('change', this.#onListenChangeSystemTheme);
    this.onUpdateDark(this.#mediaQueryList.matches);
  };

  /**监听暗黑模式变化*/
  listenDarkMode = () => {
    if (this.darkDOM.current) {
      this.#html(this.darkDOM.current);
    } else if (this.watchDarkMode === 'prefers-color-scheme') {
      this.#prefersColorScheme();
    } else if (this.watchDarkMode === 'html') {
      this.#html(document.documentElement);
    } else if (this.watchDarkMode === 'body') {
      this.#html(document.body);
    } else if (this.watchDarkMode) {
      this.#html(document.getElementById(this.watchDarkMode) as HTMLDivElement | HTMLElement);
    }
    return () => {
      this.#observer?.disconnect?.();
      this.#mediaQueryList?.removeEventListener?.('change', this.#onListenChangeSystemTheme);
    };
  };
}
/**监听暗黑模式变化hooks*/
export const useDarkModeWatchInstance = (darkInstance?: DarkModeWatchInstance) => {
  const darkModeWatchInstance = useRef<DarkModeWatchInstance>();
  if (!darkModeWatchInstance.current) {
    if (darkInstance) {
      darkModeWatchInstance.current = darkInstance;
    } else {
      darkModeWatchInstance.current = new DarkModeWatchInstance();
    }
  }
  return darkModeWatchInstance.current;
};
