import { Outlet, useLocation } from 'react-router';
import { TabBar } from 'layout/tab-bar';
import { ToolBar } from 'layout/tool-bar';
import { KeepAlive } from 'react-activation';
import { useFairysRootContext } from 'components/root';
import { Fragment } from 'react/jsx-runtime';
import { useMemo, useState } from 'react';
import { FullScreen } from 'components/full-screen';

const KeepAliveContent = () => {
  const location = useLocation();
  return (
    <KeepAlive when={false} name={location.pathname} id={location.pathname} key={location.pathname}>
      <Outlet />
    </KeepAlive>
  );
};

const OutletContentContext = () => {
  const [open, setOpen] = useState(false);
  const fairysRootClass = useFairysRootContext();

  const render = useMemo(() => {
    if (fairysRootClass.keepAlive) return <KeepAliveContent />;
    return <Outlet />;
  }, [fairysRootClass.keepAlive]);

  return (
    <Fragment>
      <button onClick={() => setOpen(!open)}>{open ? '关闭' : '打开'}</button>
      <FullScreen open={open} onClose={() => setOpen(false)}>
        {render}
      </FullScreen>
    </Fragment>
  );
};

export const LayoutContent = () => {
  return (
    <div className="fairys_admin_main_content overflow-hidden flex flex-col w-full h-full">
      <div className="fairys_admin_main_content_header w-full overflow-hidden sticky top-0 shadow-[var(--fairys-box-shadow)]">
        <ToolBar />
        <TabBar />
      </div>
      <div className="fairys_admin_main_content_body overflow-hidden flex-1 w-full">
        <OutletContentContext />
      </div>
    </div>
  );
};
