import {
  useTabBarDataInstance,
  TabBarItemType,
  tabBarDataInstance,
  TabInstanceContext,
  useTabInstance,
  useTabInstanceContext,
  useTabItemInstance,
} from 'context/tab-bar';
import clsx from 'clsx';
import { Fragment, useCallback, useEffect, useMemo } from 'react';
import { useMatch, useNavigate, useLocation } from 'react-router';
import { DropDownTabBarItems } from './drop-down';
import { FairysPopoverMenu, FairysPopoverMenuItemType } from 'components/popover-menu';
import { useFairysRootContext } from 'components/root';
import { appDataInstance } from 'context/app-data';
import { useFavoritesDataInstance } from 'context/favorites-data';
import { FairysIcon, FairysIconPropsType } from 'components/icon';
import { motion } from 'framer-motion';

interface TabBarItemProps {
  item: TabBarItemType;
  currentIndex: number;
  count: number;
}

const TabBarItem = (props: TabBarItemProps) => {
  const { item, currentIndex, count } = props;
  const iconProps = item.iconProps as FairysIconPropsType;
  const className = item.className;
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
  const [favoritesData, favoritesDataInstance] = useFavoritesDataInstance();
  const isFavorites = useMemo(() => favoritesDataInstance.isFavorites(item), [favoritesData.dataList, item]);
  const location = useLocation();

  const [state] = useTabBarDataInstance();
  const tabBarItems = state.tabBarItems;

  const isCloseIconShow = useMemo(() => {
    return (tabBarItems || []).length > 1;
  }, [tabBarItems]);

  const itemClassName = useMemo(() => {
    return clsx(
      'fairys_admin_tab_bar_item fairys:shrink-0 fairys:transition-all fairys:duration-300 fairys:relative fairys:flex fairys:flex-row fairys:items-center fairys:gap-1 fairys:px-[20px] fairys:py-[8px] fairys:cursor-pointer',
      className,
      {
        active: !!match,
        'fairys:text-white fairys:hover:text-gray-100': !!match,
        'fairys:text-gray-400 fairys:hover:text-gray-500': !match,
        'fairys:dark:hover:text-gray-300': !match,
      },
    );
  }, [match, className]);

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!match) {
      navigate(item.path);
      tabBarDataInstance.addItem(item);
    }
  };

  const onClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    tabBarDataInstance.remove(item.path, tabItemInstance.isActive);
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
    return clsx('fairys:icon-[ant-design--close-outlined] fairys:transition-all fairys:duration-300 fairys:ml-5 ', {
      'fairys:text-gray-300 fairys:hover:text-white': !!match,
      'fairys:text-gray-400 fairys:hover:text-gray-600': !match,
      'fairys:dark:text-gray-400': !!match,
      'fairys:dark:text-gray-500 fairys:dark:hover:text-gray-300': !match,
    });
  }, [match]);

  const items: FairysPopoverMenuItemType[] = useMemo(() => {
    return [
      {
        icon: 'fairys:icon-[ri--refresh-line]',
        title: '重新加载',
        visible: !!fairysRootClass.keepAlive,
        iconProps: { isClassName: true },
      },
      {
        icon: 'fairys:icon-[ri--close-line]',
        title: '关闭标签',
        disabled: count === 1 || isTabFixed,
        iconProps: { isClassName: true },
      },
      { isDivider: true },
      { icon: 'fairys:icon-[ant-design--expand-outlined]', title: '最大化', iconProps: { isClassName: true } },
      { icon: 'fairys:icon-[ant-design--credit-card-outlined]', title: '新窗口打开', iconProps: { isClassName: true } },
      { isDivider: true },
      {
        icon: 'fairys:icon-[mdi--close]',
        title: '关闭其他标签',
        disabled: count === 1,
        iconProps: { isClassName: true },
      },
      {
        icon: 'fairys:icon-[mdi--arrow-expand-left]',
        title: '关闭左侧标签',
        disabled: currentIndex === 0,
        iconProps: { isClassName: true },
      },
      {
        icon: 'fairys:icon-[mdi--arrow-expand-right]',
        title: '关闭右侧标签',
        disabled: currentIndex === count - 1,
        iconProps: { isClassName: true },
      },
      { isDivider: true },
      {
        icon: 'fairys:icon-[material-symbols--family-star]',
        title: '收藏',
        iconProps: { isClassName: true, className: isFavorites ? 'fairys:text-[#eb2f96]' : '' },
        isClickClose: false,
      },
    ] as FairysPopoverMenuItemType[];
  }, [currentIndex, count, isTabFixed, isFavorites]);

  const onMenuItemClick = useCallback(
    (item: FairysPopoverMenuItemType) => {
      if (item.title === '重新加载') {
        appDataInstance.aliveController?.refreshScope?.(currentPath);
      } else if (item.title === '关闭标签') {
        tabBarDataInstance.remove(currentPath, tabItemInstance.isActive);
      } else if (item.title === '关闭其他标签') {
        tabBarDataInstance.removeOther(currentIndex, tabItemInstance.isActive);
      } else if (item.title === '关闭左侧标签') {
        tabBarDataInstance.removeLeft(currentIndex, tabItemInstance.isActive);
      } else if (item.title === '关闭右侧标签') {
        tabBarDataInstance.removeRight(currentIndex, tabItemInstance.isActive);
      } else if (item.title === '最大化') {
        tabBarDataInstance.onToggleFullScreen();
      } else if (item.title === '新窗口打开') {
        const href = window.location.href.replace(location.pathname, currentPath);
        window.open(href, '_blank');
      } else if (item.title === '收藏') {
        favoritesDataInstance.onToggleFavorites(rowItemData);
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
      isOpacity
    >
      <motion.div className={itemClassName} onClick={onClick}>
        {match ? (
          <motion.div
            style={{ width: '100%', height: '100%', position: 'absolute', borderRadius: 2, top: 0, left: 0 }}
            layoutId="selected"
            initial={{ backgroundColor: 'var(--fairys-theme-color)' }}
            animate={{ backgroundColor: 'var(--fairys-theme-color)' }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <Fragment />
        )}
        <div className="fairys_admin_tabs-item-content fairys:relative fairys:w-full fairys:h-full fairys:flex fairys:flex-row fairys:items-center fairys:justify-center fairys:gap-2">
          {item.icon ? (
            <span className="fairys:size-[16px] fairys:mr-1">
              <FairysIcon className="fairys:size-[16px] " icon={item.icon} iconProps={iconProps} />
            </span>
          ) : (
            <Fragment />
          )}
          <div className="fairys_admin_tab_bar_item_title">{item.title}</div>
          {isCloseIconShow && !isTabFixed ? <span className={iconClassName} onClick={onClose} /> : <Fragment />}
        </div>
      </motion.div>
    </FairysPopoverMenu>
  );
};

export const TabBar = () => {
  const [state] = useTabBarDataInstance();
  const tabBarItems = state.tabBarItems;
  const tabInstance = useTabInstance();
  const tabBarClassName = useMemo(() => {
    return clsx(
      'fairys_admin_tab_bar fairys:transition-all fairys:duration-300 fairys:overflow-hidden fairys:w-full fairys:flex fairys:flex-row fairys:bg-gray-50 fairys:px-[8px] fairys:border-b fairys:border-gray-200 fairys:dark:border-gray-800 fairys:dark:bg-gray-800',
    );
  }, []);
  const location = useLocation();

  useEffect(() => {
    tabBarDataInstance.add(location.pathname);
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
