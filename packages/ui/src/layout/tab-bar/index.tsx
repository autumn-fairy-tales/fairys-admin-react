import {
  useTabBar,
  TabBarItemType,
  tabBarInstance,
  TabInstanceContext,
  useTabInstance,
  useTabInstanceContext,
  useTabItemInstance,
} from 'context/tab-bar';
import clsx from 'clsx';
import { Fragment, useCallback, useEffect, useMemo } from 'react';
import { useMatch, useNavigate, useLocation } from 'react-router';
import { Icon } from '@iconify/react';
import { DropDownTabBarItems } from './drop-down';
import { ContextMenu, ContextMenuItem } from 'components/context-menu';
import { useFairysRootContext } from 'components/root';
import { appDataInstance } from 'context/app-data';

interface TabBarItemProps {
  item: TabBarItemType;
  currentIndex: number;
  count: number;
}

const TabBarItem = (props: TabBarItemProps) => {
  const { item, currentIndex, count } = props;
  const tabInstance = useTabInstanceContext();
  const tabItemInstance = useTabItemInstance();
  tabItemInstance.item = item;
  const navigate = useNavigate();
  const match = useMatch(item.path);
  const currentPath = item.path;
  tabItemInstance.isActive = !!match;
  const fairysRootClass = useFairysRootContext();

  const [state] = useTabBar();
  const tabBarItems = state.tabBarItems;

  const isCloseIconShow = useMemo(() => {
    return (tabBarItems || []).length > 1;
  }, [tabBarItems]);

  const itemClassName = useMemo(() => {
    return clsx(
      'fairys_admin_tab_bar_item shrink-0 transition-all duration-300 relative flex flex-row items-center gap-1 px-[20px] py-[10px] cursor-pointer',
      {
        active: !!match,
        'dark:before:bg-gray-600': true,
        'text-gray-500 hover:text-gray-500': !!match,
        'text-gray-400 hover:text-gray-500': !match,
        'bg-gray-100 hover:bg-gray-200': !match,
        'bg-white hover:bg-white': !!match,
        'dark:text-gray-200 dark:hover:text-gray-200': !!match,
        'dark:text-gray-400 dark:hover:text-gray-300': !match,
        'dark:bg-gray-800 dark:hover:bg-gray-700': !match,
        'dark:bg-gray-600 dark:hover:bg-gray-600': !!match,
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
    tabBarInstance.remove(item.path, tabItemInstance.isActive, navigate);
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
    return clsx(
      'icon-[ant-design--close-outlined] transition-all duration-300 ml-5 text-gray-400 hover:text-gray-600 dark:hover:text-white',
      {
        'dark:text-gray-400': !!match,
        'dark:text-gray-500': !match,
      },
    );
  }, [match]);

  const iconRender = useMemo(() => {
    return item.icon ? (
      <span className="size-[16px]">
        <Icon icon={item.icon} className="size-[16px]" />
      </span>
    ) : (
      <Fragment />
    );
  }, [item.icon]);

  const items = useMemo(() => {
    return [
      { icon: 'ri:refresh-line', title: '重新加载', visible: !!fairysRootClass.keepAlive },
      { icon: 'ri:close-line', title: '关闭标签', disabled: count === 1 },
      { isDivider: true },
      { icon: 'ant-design:expand-outlined', title: '最大化' },
      { icon: 'ant-design:credit-card-outlined', title: '新窗口打开' },
      { isDivider: true },
      { icon: 'mdi:close', title: '关闭其他标签', disabled: count === 1 },
      { icon: 'mdi:arrow-expand-left', title: '关闭左侧标签', disabled: currentIndex === 0 },
      { icon: 'mdi:arrow-expand-right', title: '关闭右侧标签', disabled: currentIndex === count - 1 },
    ];
  }, [currentIndex, count]);

  const onMenuItemClick = useCallback(
    (item: ContextMenuItem) => {
      if (item.title === '重新加载') {
        appDataInstance.aliveController?.refreshScope?.(currentPath);
      } else if (item.title === '关闭标签') {
        tabBarInstance.remove(currentPath, tabItemInstance.isActive, navigate);
      } else if (item.title === '关闭其他标签') {
        tabBarInstance.removeOther(currentIndex);
      } else if (item.title === '关闭左侧标签') {
        tabBarInstance.removeLeft(currentIndex);
      } else if (item.title === '关闭右侧标签') {
        tabBarInstance.removeRight(currentIndex);
      }
    },
    [currentIndex, currentPath],
  );

  return (
    <ContextMenu
      items={items}
      onMenuItemClick={onMenuItemClick}
      ref={tabItemInstance.dom}
      className={itemClassName}
      onClick={onClick}
    >
      {iconRender}
      <div className="fairys_admin_tab_bar_item_title">{item.title}</div>
      {isCloseIconShow ? <span className={iconClassName} onClick={onClose} /> : <Fragment />}
    </ContextMenu>
  );
};

export const TabBar = () => {
  const [state] = useTabBar();
  const tabBarItems = state.tabBarItems;
  const tabInstance = useTabInstance();
  const tabBarClassName = useMemo(() => {
    return clsx(
      'fairys_admin_tab_bar transition-all duration-300 overflow-hidden w-full flex flex-row bg-gray-300/25 px-[8px] border-b border-gray-200 dark:border-gray-800 dark:bg-gray-800',
    );
  }, []);
  const location = useLocation();

  useEffect(() => {
    tabBarInstance.add(location.pathname);
  }, [location.pathname]);

  const render = useMemo(() => {
    const length = tabBarItems.length;
    return tabBarItems.map((item, index) => {
      return <TabBarItem count={length} currentIndex={index} key={item.path} item={item} />;
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
