import { menuDataInstance, MenuItemType, useMenuDataInstance } from 'context/menu-data';
import { useSettingDataInstance } from 'context/setting';
import { FairysMenu, FairysMenuItemType, FairysMenuProps } from 'components/menu';
import { useLocation } from 'react-router';
import { routerDataInstance } from 'context/router-data';
import { tabBarDataInstance } from 'context/tab-bar';
import { useCallback } from 'react';

export interface MenuProps extends FairysMenuProps {
  // 点击菜单项回调
  onClickItem?: (item: MenuItemType & FairysMenuItemType) => void;
}

export const Menu = (props: MenuProps) => {
  const [state] = useMenuDataInstance();
  const menuItems = state.menuItems as FairysMenuItemType[];
  const _menuItems = menuDataInstance._menuItems as FairysMenuItemType[];
  const [settingState] = useSettingDataInstance();
  const sideMenuMode = settingState.sideMenuMode;
  const layoutMode = settingState.layoutMode;
  const location = useLocation();

  const onClickItem = useCallback(
    async (item: MenuItemType & FairysMenuItemType) => {
      // 打开浏览器新窗口
      if (item.isOpenNewWindow) {
        window.open(item.path, '_blank');
        return;
      }
      if (typeof item.onBeforeNavigate === 'function') {
        const isBool = await item.onBeforeNavigate(item);
        // 如果为 false 不进行跳转
        if (!isBool) {
          return;
        }
      }
      if (typeof menuDataInstance.onBeforeNavigate === 'function') {
        const isBool = await menuDataInstance.onBeforeNavigate(item);
        // 如果为 false 不进行跳转
        if (!isBool) {
          return;
        }
      }
      routerDataInstance.navigate(item.path);
      tabBarDataInstance.addItem(item as any);
      props.onClickItem?.(item);
    },
    [menuDataInstance],
  );

  return (
    <FairysMenu
      maxWidth={220}
      {...props}
      items={layoutMode === 'left' || layoutMode === 'mobile' ? _menuItems : menuItems}
      activeMotionPrefixCls="fairys-menu-item-active"
      collapsed={sideMenuMode === 'close' && layoutMode !== 'mobile' ? true : undefined}
      firstLevelSize={sideMenuMode === 'close' && layoutMode !== 'mobile' ? 'large' : 'default'}
      isOnlyParentOpenKeys
      selectedKey={location.pathname}
      onClickItem={onClickItem}
    />
  );
};
