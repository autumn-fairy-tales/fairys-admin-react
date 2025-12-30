import { useLocation, useOutlet } from 'react-router';
import { TabBar } from 'layout/tab-bar';
import { ToolBar } from 'layout/tool-bar';
import { KeepAlive } from 'react-activation';
import { useFairysRootContext } from 'components/root';
import { Fragment, memo } from 'react';
import { useMemo } from 'react';
import { FairysFullScreen } from 'components/full-screen';
import { useTabBarDataInstance } from 'context/tab-bar';
import { AliveControllerDataInstance } from 'context/alive-controller';

import { FairysMotionAnimation } from 'components/motion-animation';

const KeepAliveContent = () => {
  const location = useLocation();
  const id = useMemo(() => {
    return AliveControllerDataInstance.convertIdOrNameOne(location.pathname);
  }, [location.pathname]);
  const outlet = useOutlet();
  //嵌套多个 MotionAnimation ，为了解决页面刷新时，动画不生效的问题
  return (
    <FairysMotionAnimation animateKey={location.pathname}>
      <KeepAlive name={id} id={id} cacheKey={id} key={id}>
        <FairysMotionAnimation animateKey={`${id}_motion_${location.pathname}`}>{outlet}</FairysMotionAnimation>
      </KeepAlive>
    </FairysMotionAnimation>
  );
};

// 为了解决动画问题
const KeepAliveContent2 = () => {
  const outlet = useOutlet();
  const location = useLocation();
  return <FairysMotionAnimation animateKey={location.pathname}>{outlet}</FairysMotionAnimation>;
};

const OutletContentContext = () => {
  const fairysRootClass = useFairysRootContext();
  const [state, tabBarDataInstance] = useTabBarDataInstance();
  const pageFullScreen = state.pageFullScreen;

  const render = useMemo(() => {
    if (fairysRootClass.keepAlive && fairysRootClass.isOutletKeepAlive) return <KeepAliveContent />;
    return <KeepAliveContent2 />;
  }, [fairysRootClass.keepAlive]);

  return (
    <Fragment>
      <FairysFullScreen
        className="fairys_admin_main_content_body_full_screen"
        open={pageFullScreen}
        onClose={tabBarDataInstance.onToggleFullScreen}
      >
        {render}
      </FairysFullScreen>
    </Fragment>
  );
};

export const LayoutContent = memo(() => {
  return (
    <div className="fairys_admin_main_content fairys:overflow-hidden fairys:flex fairys:flex-col fairys:w-full fairys:h-full">
      <div className="fairys_admin_main_content_header fairys:w-full fairys:overflow-hidden fairys:sticky fairys:top-0 fairys:shadow-(--fairys-box-shadow)">
        <ToolBar />
        <TabBar />
      </div>
      <div className="fairys_admin_main_content_body fairys:overflow-hidden fairys:flex-1 fairys:w-full">
        <OutletContentContext />
      </div>
    </div>
  );
});
