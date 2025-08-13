/**
 *  主菜单分为 左侧主菜单 和 顶部主菜单
 */

import clsx from 'clsx';
import { useMemo } from 'react';
import { useSetting } from '../context/setting';
import { useLocation, useNavigate } from 'react-router';

export interface MainMenuProps {
  layoutMode?: 'vertical' | 'horizontal';
}

export const MainMenu = (props: MainMenuProps) => {
  const { layoutMode } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [state] = useSetting();

  const mainMenuClassName = useMemo(() => {
    return clsx('fairys_admin_main_menu flex box-border overflow-auto items-center justify-between px-[8px]', {
      'fairys_admin_main_menu_vertical flex-col h-full': layoutMode === 'vertical',
      'fairys_admin_main_menu_horizontal flex-row w-full': layoutMode === 'horizontal',
    });
  }, [layoutMode]);

  const mainMenuBodyClassName = useMemo(() => {
    return clsx('fairys_admin_main_menu_body flex-1 w-full overflow-hidden flex gap-2 items-center', {
      'flex-col ': layoutMode === 'vertical',
      'flex-row': layoutMode === 'horizontal',
    });
  }, [layoutMode]);

  const projectNameClassName = useMemo(() => {
    return clsx('fairys_admin_main_menu_body_name overflow-hidden whitespace-nowrap cursor-pointer', {
      'w-full  text-ellipsis': layoutMode === 'vertical',
    });
  }, [layoutMode]);

  const onClickHome = () => {
    if (location.pathname === '/') {
      return;
    }
    navigate('/');
  };

  return (
    <div className={mainMenuClassName}>
      {/* 左侧主菜单 */}
      <div className={mainMenuBodyClassName}>
        <div className="fairys_admin_main_menu_body_logo flex items-center justify-center cursor-pointer">
          <img width={48} height={48} src={state.logo} alt={state.projectName} onClick={onClickHome} />
        </div>
        <div className={projectNameClassName} onClick={onClickHome}>
          {state.projectName}
        </div>
        <div className="fairys_admin_main_menu_body_menus">菜单</div>
      </div>
      <div className="fairys_admin_main_menu_extra">头像部分</div>
      {/* 顶部主菜单 */}
      {/* <div>
      <div>logo</div>
      <div>项目名</div>
      <div>菜单</div>
    </div>
    <div>头像部分</div> */}
    </div>
  );
};
