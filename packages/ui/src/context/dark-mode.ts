import { createContext, useContext, useRef, useEffect, createElement, ReactNode } from 'react';
import { proxy, useSnapshot } from 'valtio';

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
