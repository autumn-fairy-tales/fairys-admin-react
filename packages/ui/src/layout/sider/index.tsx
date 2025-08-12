import { Menu } from '../../menu';
import { DarkModeWarp } from './../../dark-mode';

export const LayoutSider = () => {
  return (
    <DarkModeWarp className="fairys_admin_layout_sider flex flex-col h-full w-[250px] border-r border-gray-200 dark:border-gray-800! dark:text-gray-400 overflow-hidden">
      <div>hhhhh</div>
      <div className="fairys_admin_layout_sider_menu flex-1 overflow-hidden">
        <Menu />
      </div>
      <div>footer</div>
    </DarkModeWarp>
  );
};
