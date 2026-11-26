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
import { useMatch, useLocation } from 'react-router';
import { routerDataInstance } from 'context/router-data';
import { DropDownTabBarItems } from './drop-down';
import { FairysPopoverMenu, FairysPopoverMenuItemType } from 'components/popover-menu';
import { useFairysRootContext } from 'components/root';
import { appDataInstance } from 'context/app-data';
import { favoritesDataInstance, useIsFavorites } from 'context/favorites-data';
import { FairysIcon, FairysIconPropsType } from 'components/icon';
import { motion } from 'framer-motion';
import { UtilsColor } from 'utils/utils.color';

const TabBarMenuAction = {
  reload: 'fairys:tab:reload',
  close: 'fairys:tab:close',
  maximize: 'fairys:tab:maximize',
  newWindow: 'fairys:tab:new-window',
  closeOther: 'fairys:tab:close-other',
  closeLeft: 'fairys:tab:close-left',
  closeRight: 'fairys:tab:close-right',
  favorite: 'fairys:tab:favorite',
} as const;

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
  const match = useMatch(item.path);
  const currentPath = item.path;
  const rowItemData = item;
  tabItemInstance.isActive = !!match;
  const fairysRootClass = useFairysRootContext();
  const isFavorites = useIsFavorites(item.path);
  const location = useLocation();

  const isCloseIconShow = count > 1;

  const itemClassName = useMemo(() => {
    return clsx(
      'fairys_admin_tab_bar_item fairys:shrink-0 fairys:transition-all fairys:duration-300 fairys:relative fairys:flex fairys:flex-row fairys:items-center fairys:gap-1 fairys:px-[20px] fairys:py-[8px] fairys:cursor-pointer',
      className,
      {
        active: !!match,
      },
    );
  }, [match, className]);

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!match) {
      routerDataInstance.navigate(item.path);
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
    return clsx(
      'fairys_admin_tab_bar_item_icon fairys:icon-[ant-design--close-outlined] fairys:transition-all fairys:duration-300 fairys:ml-5 ',
      {
        active: !!match,
      },
    );
  }, [match]);

  const items: FairysPopoverMenuItemType[] = useMemo(() => {
    return [
      {
        icon: 'fairys:icon-[ri--refresh-line]',
        title: '重新加载',
        value: TabBarMenuAction.reload,
        visible: !!fairysRootClass.keepAlive,
        iconProps: { isClassName: true },
      },
      {
        icon: 'fairys:icon-[ri--close-line]',
        title: '关闭标签',
        value: TabBarMenuAction.close,
        disabled: count === 1 || isTabFixed,
        iconProps: { isClassName: true },
      },
      { isDivider: true },
      {
        icon: 'fairys:icon-[ant-design--expand-outlined]',
        title: '最大化',
        value: TabBarMenuAction.maximize,
        iconProps: { isClassName: true },
      },
      {
        icon: 'fairys:icon-[ant-design--credit-card-outlined]',
        title: '新窗口打开',
        value: TabBarMenuAction.newWindow,
        iconProps: { isClassName: true },
      },
      { isDivider: true },
      {
        icon: 'fairys:icon-[mdi--close]',
        title: '关闭其他标签',
        value: TabBarMenuAction.closeOther,
        disabled: count === 1,
        iconProps: { isClassName: true },
      },
      {
        icon: 'fairys:icon-[mdi--arrow-expand-left]',
        title: '关闭左侧标签',
        value: TabBarMenuAction.closeLeft,
        disabled: currentIndex === 0,
        iconProps: { isClassName: true },
      },
      {
        icon: 'fairys:icon-[mdi--arrow-expand-right]',
        title: '关闭右侧标签',
        value: TabBarMenuAction.closeRight,
        disabled: currentIndex === count - 1,
        iconProps: { isClassName: true },
      },
      { isDivider: true },
      {
        icon: 'fairys:icon-[material-symbols--family-star]',
        title: '收藏',
        value: TabBarMenuAction.favorite,
        iconProps: { isClassName: true, className: isFavorites ? 'fairys:text-[#eb2f96]' : '' },
        isClickClose: false,
      },
    ] as FairysPopoverMenuItemType[];
  }, [currentIndex, count, isTabFixed, isFavorites]);

  const onMenuItemClick = useCallback(
    (item: FairysPopoverMenuItemType) => {
      if (item.value === TabBarMenuAction.reload) {
        appDataInstance.aliveController?.refreshScope?.(currentPath);
      } else if (item.value === TabBarMenuAction.close) {
        tabBarDataInstance.remove(currentPath, tabItemInstance.isActive);
      } else if (item.value === TabBarMenuAction.closeOther) {
        tabBarDataInstance.removeOther(currentIndex, tabItemInstance.isActive);
      } else if (item.value === TabBarMenuAction.closeLeft) {
        tabBarDataInstance.removeLeft(currentIndex, tabItemInstance.isActive);
      } else if (item.value === TabBarMenuAction.closeRight) {
        tabBarDataInstance.removeRight(currentIndex, tabItemInstance.isActive);
      } else if (item.value === TabBarMenuAction.maximize) {
        tabBarDataInstance.onToggleFullScreen();
      } else if (item.value === TabBarMenuAction.newWindow) {
        const href = window.location.href.replace(location.pathname, currentPath);
        window.open(href, '_blank', 'noopener,noreferrer');
      } else if (item.value === TabBarMenuAction.favorite) {
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
      <motion.div
        className={itemClassName}
        onClick={onClick}
        role="tab"
        aria-selected={!!match}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.currentTarget.click();
          }
        }}
      >
        {match ? (
          <motion.div
            style={{ width: '100%', height: '100%', position: 'absolute', borderRadius: 2, top: 0, left: 0 }}
            layoutId="tab-bar-selected"
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
          {isCloseIconShow && !isTabFixed ? (
            <span
              className={iconClassName}
              onClick={onClose}
              role="button"
              aria-label="关闭标签"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  event.stopPropagation();
                  onClose(event as unknown as React.MouseEvent);
                }
              }}
            />
          ) : (
            <Fragment />
          )}
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
      'fairys_admin_tab_bar fairys:transition-all fairys:duration-300 fairys:overflow-hidden fairys:w-full fairys:flex fairys:flex-row fairys:px-[8px] fairys:border-b ',
      UtilsColor.otherBorderClassNameBase,
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
      <div className={tabBarClassName} role="tablist" aria-orientation="horizontal">
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
