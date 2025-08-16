import { Outlet, useLocation } from 'react-router';
import { TabBar } from 'layout/tab-bar';
import { ToolBar } from 'layout/tool-bar';
import { KeepAlive } from 'react-activation';
import { useFairysRootContext } from 'components/root';
import { useMemo } from 'react';

const OutletContentContext = () => {
  const location = useLocation();
  return (
    <KeepAlive name={location.pathname} id={location.pathname} key={location.pathname}>
      <Outlet />
    </KeepAlive>
  );
};

export const LayoutContent = () => {
  const fairysRootClass = useFairysRootContext();
  return (
    <div className="fairys_admin_main_content overflow-hidden flex flex-col w-full h-full">
      <div className="fairys_admin_main_content_header w-full overflow-hidden sticky top-0 shadow-[var(--fairys-box-shadow)]">
        <ToolBar />
        <TabBar />
      </div>
      <div className="fairys_admin_main_content_body overflow-hidden flex flex-1 w-full">
        {fairysRootClass.keepAlive ? <OutletContentContext /> : <Outlet />}
      </div>
    </div>
  );
};
