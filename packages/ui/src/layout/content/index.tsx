import { Outlet } from 'react-router';
import { TabBar } from '../tab-bar';
import { ToolBar } from '../tool-bar';

export const LayoutContent = () => {
  return (
    <div className="fairys_admin_main_content overflow-hidden flex flex-col w-full h-full">
      <div className="fairys_admin_main_content_header w-full overflow-hidden sticky top-0 shadow-[var(--fairys-box-shadow)] border-b border-gray-200 dark:border-gray-800">
        <ToolBar />
        <TabBar />
      </div>
      <div className="fairys_admin_main_content_body overflow-hidden flex flex-1 w-full">
        <Outlet />
      </div>
    </div>
  );
};
