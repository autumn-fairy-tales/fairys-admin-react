import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  createElement,
  ReactNode,
  cloneElement,
  createRef,
} from 'react';
import { proxy, useSnapshot } from 'valtio';
import clsx from 'clsx';

interface DarkModeInstanceState {
  darkMode: boolean;
}

export class DarkModeInstance {
  state = proxy<DarkModeInstanceState>({
    darkMode: false,
  });
  setDarkMode = (darkMode: boolean) => {
    this.state.darkMode = darkMode;
  };
}

export const DarkModeInstanceContext = createContext<DarkModeInstance>(new DarkModeInstance());

export const useDarkModeInstance = (darkModeInstance?: DarkModeInstance) => {
  const darkModeInstanceRef = useRef<DarkModeInstance>();
  if (!darkModeInstanceRef.current) {
    if (darkModeInstance) {
      darkModeInstanceRef.current = darkModeInstance;
    } else {
      darkModeInstanceRef.current = new DarkModeInstance();
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
  darkMode?: boolean;
  /**自定义darkModeInstance*/
  darkModeInstance?: DarkModeInstance;
}

/**为了在弹窗中使用darkMode，需要在弹窗中包裹这个组件*/
export const DarkModeInstancePopoverContextProvider = (props: DarkModeInstanceContextProviderProps) => {
  const { children } = props;
  const [state, darkModeInstance] = useDarkModeInstanceContext();
  const darkMode = state.darkMode;
  return createElement(DarkModeInstanceContext.Provider, {
    children: React.Children.map(children, (child: any) => {
      const prop = child?.props;
      if (!React.isValidElement(child)) {
        return child;
      }
      return cloneElement(child as React.ReactElement, {
        className: clsx(prop?.className, 'fairys:transition-all fairys:duration-300', {
          dark: darkMode,
        }),
      });
    }),
    value: darkModeInstance,
  });
};

export const DarkModeInstanceContextProvider = (props: DarkModeInstanceContextProviderProps) => {
  const { children, darkMode, darkModeInstance: instance } = props;
  const darkModeInstance = useDarkModeInstance(instance);

  useEffect(() => {
    darkModeInstance.setDarkMode(darkMode);
  }, [darkMode, darkModeInstance]);

  return createElement(DarkModeInstanceContext.Provider, {
    children,
    value: darkModeInstance,
  });
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
