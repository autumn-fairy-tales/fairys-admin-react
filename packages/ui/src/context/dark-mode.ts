import React, { createContext, useContext, useRef, useEffect, createElement, ReactNode, cloneElement } from 'react';
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
        className: clsx(prop?.className, 'transition-all duration-300', {
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
