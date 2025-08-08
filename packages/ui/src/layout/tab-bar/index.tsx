import { useTabBar } from '../../context/tab-bar';
import clsx from 'clsx';
import { useMemo } from 'react';

export const TabBar = () => {
  const [state] = useTabBar();

  const tabBarItems = state.tabBarItems;

  const tabBarClassName = useMemo(() => {
    return clsx('fairys_admin_tab_bar');
  }, []);

  return <div className={tabBarClassName}></div>;
};
