import { Outlet } from 'react-router';
import { TabBar } from 'layout/tab-bar';
import { ToolBar } from 'layout/tool-bar';

export const LayoutContent = () => {
  return (
    <div className="fairys_admin_main_content overflow-hidden flex flex-col w-full h-full">
      <div className="fairys_admin_main_content_header w-full overflow-hidden sticky top-0 shadow-[var(--fairys-box-shadow)]">
        <ToolBar />
        <TabBar />
      </div>
      <div className="fairys_admin_main_content_body overflow-hidden flex flex-1 w-full">
        <Outlet />
      </div>
    </div>
  );
};
