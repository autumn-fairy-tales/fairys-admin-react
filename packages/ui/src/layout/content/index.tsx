import { Outlet } from 'react-router';
import { TabBar } from '../tab-bar';

export const LayoutContent = () => {
  return (
    <div className="fairys_admin_main_content flex flex-col w-full h-full">
      <div className="fairys_admin_main_content_header sticky top-0">
        <TabBar />
      </div>
      <div className="fairys_admin_main_content_body flex flex-1 w-full">
        <Outlet />
      </div>
    </div>
  );
};
