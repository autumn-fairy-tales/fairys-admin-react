import { Menu } from '../../menu';

export const LayoutSider = () => {
  return (
    <div className="fairys_admin_layout_sider flex flex-col h-full w-[250px] border-r border-gray-200 overflow-hidden">
      <div>hhhhh</div>
      <div className="fairys_admin_layout_sider_menu flex-1 overflow-hidden">
        <Menu />
      </div>
      <div>footer</div>
    </div>
  );
};
