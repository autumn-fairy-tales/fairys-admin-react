import { createContext, useContext, createRef, useRef } from 'react';
import { proxy, useSnapshot, ref } from 'valtio';

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

export const useDarkModeInstance = () => useRef(new DarkModeInstance()).current;

export const useDarkModeInstanceContext = () => {
  const darkModeInstance = useContext(DarkModeInstanceContext);
  const state = useSnapshot(darkModeInstance.state);
  return [state, darkModeInstance] as [DarkModeInstanceState, DarkModeInstance];
};
