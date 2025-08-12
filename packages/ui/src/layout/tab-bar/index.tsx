import {
  useTabBar,
  TabBarItemType,
  tabBarInstance,
  TabInstanceContext,
  useTabInstance,
  useTabInstanceContext,
  useTabItemInstance,
} from '../../context/tab-bar';
import clsx from 'clsx';
import { Fragment, useEffect, useMemo } from 'react';
import { useMatch, useNavigate, useLocation } from 'react-router';
import { Icon } from '@iconify/react';
import { DropDownTabBarItems } from './drop-down';

interface TabBarItemProps {
  item: TabBarItemType;
}

const TabBarItem = (props: TabBarItemProps) => {
  const { item } = props;
  const tabInstance = useTabInstanceContext();
  const tabItemInstance = useTabItemInstance();
  tabItemInstance.item = item;

  const navigate = useNavigate();
  const match = useMatch(item.path);

  tabItemInstance.isActive = !!match;

  const itemClassName = useMemo(() => {
    return clsx(
      'fairys_admin_tab_bar_item shrink-0 text-gray-400 transition-[background-color] relative flex flex-row items-center gap-1 px-[20px] py-[10px] cursor-pointer',
      {
        'dark:before:bg-gray-600': true,
        'hover:bg-gray-200 dark:hover:bg-gray-700': !match,
        'hover:text-gray-600 dark:hover:text-gray-300': !match,
        'text-gray-600 dark:text-gray-300': !!match,
        'bg-white dark:bg-gray-600': !!match,
        active: !!match,
      },
    );
  }, [match]);

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!match) {
      navigate(item.path);
      tabBarInstance.addItem(item);
    }
  };

  const onClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    tabBarInstance.remove(item.path, !!match, navigate);
  };

  useEffect(() => {
    const onMount = tabInstance.register(tabItemInstance);
    return () => onMount?.();
  }, []);

  // 跳转后滚动到当前tab
  useEffect(() => {
    if (!!match && tabItemInstance.dom.current) {
      tabItemInstance.scrollIntoView();
    }
  }, [match, tabItemInstance.dom]);

  const iconClassName = useMemo(() => {
    return clsx('icon-[ant-design--close-outlined] ml-5 text-gray-400 hover:text-gray-600 dark:hover:text-white', {
      'dark:text-gray-400': !!match,
      'dark:text-gray-500': !match,
    });
  }, [match]);

  return (
    <div ref={tabItemInstance.dom} className={itemClassName} onClick={onClick}>
      {item.icon ? (
        <span className="size-[16px]">
          <Icon icon={item.icon} className="size-[16px]" />
        </span>
      ) : (
        <Fragment />
      )}
      <div className="fairys_admin_tab_bar_item_title">{item.title}</div>
      <span className={iconClassName} onClick={onClose} />
    </div>
  );
};

export const TabBar = () => {
  const [state] = useTabBar();
  const tabBarItems = state.tabBarItems;
  const tabInstance = useTabInstance();
  const tabBarClassName = useMemo(() => {
    return clsx('fairys_admin_tab_bar overflow-hidden w-full flex flex-row bg-gray-300/25 px-[6px]', {
      'dark:bg-gray-800': true,
    });
  }, []);
  const location = useLocation();

  useEffect(() => {
    tabBarInstance.add(location.pathname);
  }, [location.pathname]);

  const render = useMemo(() => {
    return tabBarItems.map((item) => {
      return <TabBarItem key={item.path} item={item} />;
    });
  }, [tabBarItems]);

  useEffect(() => {
    const onMount = tabInstance.addEventListener();
    return () => onMount?.();
  }, [tabInstance.dom]);

  return (
    <TabInstanceContext.Provider value={tabInstance}>
      <div className={tabBarClassName}>
        <div className="fairys_admin_tab_bar_left"></div>
        <div
          className="fairys_admin_tab_bar_body overflow-auto flex flex-row flex-1 no-scrollbar"
          ref={tabInstance.dom}
        >
          {render}
        </div>
        <div className="fairys_admin_tab_bar_right flex items-center justify-center">
          <DropDownTabBarItems />
        </div>
      </div>
    </TabInstanceContext.Provider>
  );
};
