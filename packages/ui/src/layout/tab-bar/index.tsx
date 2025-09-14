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
import { Icon, IconProps } from '@iconify/react';
import { DropDownTabBarItems } from './drop-down';
import { FairysPopoverMenu, FairysPopoverMenuItemType } from 'components/popover-menu';
import { useFairysRootContext } from 'components/root';
import { appDataInstance } from 'context/app-data';

interface TabBarItemProps {
  item: TabBarItemType;
  currentIndex: number;
  count: number;
}

const TabBarItem = (props: TabBarItemProps) => {
  const { item, currentIndex, count } = props;
  const iconProps = item.iconProps as IconProps;

  const isTabFixed = item.isTabFixed;
  const tabInstance = useTabInstanceContext();
  const tabItemInstance = useTabItemInstance();
  tabItemInstance.item = item;
  const navigate = useNavigate();
  const match = useMatch(item.path);
  const currentPath = item.path;
  const rowItemData = item;
  tabItemInstance.isActive = !!match;
  const fairysRootClass = useFairysRootContext();

  const [state] = useTabBar();
  const tabBarItems = state.tabBarItems;

  const isCloseIconShow = useMemo(() => {
    return (tabBarItems || []).length > 1;
  }, [tabBarItems]);

  const itemClassName = useMemo(() => {
    return clsx(
      'fairys_admin_tab_bar_item fairys:shrink-0 fairys:transition-all fairys:duration-300 fairys:relative fairys:flex fairys:flex-row fairys:items-center fairys:gap-1 fairys:px-[20px] fairys:py-[10px] fairys:cursor-pointer',
      {
        active: !!match,
        'fairys:dark:before:bg-gray-600': true,
        'fairys:text-gray-500 fairys:hover:text-gray-500': !!match,
        'fairys:text-gray-400 fairys:hover:text-gray-500': !match,
        'fairys:bg-gray-100 fairys:hover:bg-gray-200': !match,
        'fairys:bg-white fairys:hover:bg-white': !!match,
        'fairys:dark:text-gray-200 fairys:dark:hover:text-gray-200': !!match,
        'fairys:dark:text-gray-400 fairys:dark:hover:text-gray-300': !match,
        'fairys:dark:bg-gray-800 fairys:dark:hover:bg-gray-700': !match,
        'fairys:dark:bg-gray-600 fairys:dark:hover:bg-gray-600': !!match,
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
    tabBarInstance.remove(item.path, tabItemInstance.isActive);
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
      'fairys:icon-[ant-design--close-outlined] fairys:transition-all fairys:duration-300 fairys:ml-5 fairys:text-gray-400 fairys:hover:text-gray-600 fairys:dark:hover:text-white',
      {
        'fairys:dark:text-gray-400': !!match,
        'fairys:dark:text-gray-500': !match,
      },
    );
  }, [match]);

  const items = useMemo(() => {
    return [
      { icon: 'ri:refresh-line', title: '重新加载', visible: !!fairysRootClass.keepAlive },
      { icon: 'ri:close-line', title: '关闭标签', disabled: count === 1 || isTabFixed },
      { isDivider: true },
      { icon: 'ant-design:expand-outlined', title: '最大化' },
      { icon: 'ant-design:credit-card-outlined', title: '新窗口打开' },
      { isDivider: true },
      { icon: 'mdi:close', title: '关闭其他标签', disabled: count === 1 },
      { icon: 'mdi:arrow-expand-left', title: '关闭左侧标签', disabled: currentIndex === 0 },
      { icon: 'mdi:arrow-expand-right', title: '关闭右侧标签', disabled: currentIndex === count - 1 },
    ];
  }, [currentIndex, count, isTabFixed]);

  const onMenuItemClick = useCallback(
    (item: FairysPopoverMenuItemType) => {
      if (item.title === '重新加载') {
        appDataInstance.aliveController?.refreshScope?.(currentPath);
      } else if (item.title === '关闭标签') {
        tabBarInstance.remove(currentPath, tabItemInstance.isActive);
      } else if (item.title === '关闭其他标签') {
        tabBarInstance.removeOther(currentIndex, tabItemInstance.isActive);
      } else if (item.title === '关闭左侧标签') {
        tabBarInstance.removeLeft(currentIndex, tabItemInstance.isActive);
      } else if (item.title === '关闭右侧标签') {
        tabBarInstance.removeRight(currentIndex, tabItemInstance.isActive);
      } else if (item.title === '最大化') {
        tabBarInstance.onToggleFullScreen();
      } else if (item.title === '新窗口打开') {
        const href = window.location.href.replace(location.pathname, currentPath);
        window.open(href, '_blank');
      }
    },
    [currentIndex, currentPath, rowItemData],
  );

  return (
    <FairysPopoverMenu
      placement="right-start"
      items={items}
      onClickItem={onMenuItemClick}
      ref={tabItemInstance.dom}
      eventName="contextMenu"
    >
      <div className={itemClassName} onClick={onClick}>
        {item.icon ? (
          <span className="fairys:size-[16px] fairys:mr-1">
            <Icon {...iconProps} icon={item.icon} className={`fairys:size-[16px] ${iconProps?.className || ''}`} />
          </span>
        ) : (
          <Fragment />
        )}
        <div className="fairys_admin_tab_bar_item_title">{item.title}</div>
        {isCloseIconShow && !isTabFixed ? <span className={iconClassName} onClick={onClose} /> : <Fragment />}
      </div>
    </FairysPopoverMenu>
  );
};

export const TabBar = () => {
  const [state] = useTabBar();
  const tabBarItems = state.tabBarItems;
  const tabInstance = useTabInstance();
  const tabBarClassName = useMemo(() => {
    return clsx(
      'fairys_admin_tab_bar fairys:transition-all fairys:duration-300 fairys:overflow-hidden fairys:w-full fairys:flex fairys:flex-row fairys:bg-gray-300/25 fairys:px-[8px] fairys:border-b fairys:border-gray-200 fairys:dark:border-gray-800 fairys:dark:bg-gray-800',
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
          className="fairys_admin_tab_bar_body fairys:overflow-auto fairys:flex fairys:flex-row fairys:flex-1 no-scrollbar"
          ref={tabInstance.dom}
        >
          {render}
        </div>
        <div className="fairys_admin_tab_bar_right fairys:flex fairys:items-center fairys:justify-center">
          <DropDownTabBarItems />
        </div>
      </div>
    </TabInstanceContext.Provider>
  );
};
