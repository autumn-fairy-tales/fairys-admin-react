import { Outlet, useLocation } from 'react-router';
import { TabBar } from 'layout/tab-bar';
import { ToolBar } from 'layout/tool-bar';
import { KeepAlive } from 'react-activation';
import { useFairysRootContext } from 'components/root';
import { Fragment } from 'react';
import { useMemo } from 'react';
import { FullScreen } from 'components/full-screen';
import { useTabBar } from 'context/tab-bar';
import { AliveControllerBase } from 'context/alive-controller';
import { motion } from 'framer-motion';
import { useSetting } from 'context/setting';
import { motionAnimation } from 'context/motion-animation';

interface MotionAnimationProps {
  children: React.ReactNode;
}

const MotionAnimation = (props: MotionAnimationProps) => {
  const location = useLocation();
  const [setting] = useSetting();
  const pageTransitionMode = setting.pageTransitionMode;

  const config = useMemo(() => {
    return motionAnimation.getAnimationConfig(pageTransitionMode);
  }, [pageTransitionMode]);

  return (
    <motion.div {...config} className="w-full h-full overflow-hidden" key={location.pathname}>
      {props.children}
    </motion.div>
  );
};

const KeepAliveContent = () => {
  const location = useLocation();
  const id = useMemo(() => {
    return AliveControllerBase.convertIdOrNameOne(location.pathname);
  }, [location.pathname]);
  return (
    <MotionAnimation>
      <KeepAlive autoFreeze={false} name={id} id={id} cacheKey={id}>
        <Outlet />
      </KeepAlive>
    </MotionAnimation>
  );
};

const OutletContentContext = () => {
  const fairysRootClass = useFairysRootContext();
  const [state, tabBarInstance] = useTabBar();
  const pageFullScreen = state.pageFullScreen;
  const render = useMemo(() => {
    if (fairysRootClass.keepAlive) return <KeepAliveContent />;
    return (
      <MotionAnimation>
        <Outlet />
      </MotionAnimation>
    );
  }, [fairysRootClass.keepAlive]);

  return (
    <Fragment>
      <FullScreen open={pageFullScreen} onClose={tabBarInstance.onToggleFullScreen}>
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
