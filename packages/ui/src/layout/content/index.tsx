import { Outlet, useLocation, useOutlet } from 'react-router';
import { TabBar } from 'layout/tab-bar';
import { ToolBar } from 'layout/tool-bar';
import { KeepAlive } from 'react-activation';
import { useFairysRootContext } from 'components/root';
import { Fragment, memo } from 'react';
import { useMemo } from 'react';
import { FairysFullScreen } from 'components/full-screen';
import { useTabBar } from 'context/tab-bar';
import { AliveControllerBase } from 'context/alive-controller';
import { motion, AnimatePresence } from 'framer-motion';
import { useSetting } from 'context/setting';
import { motionAnimationInstance } from 'context/motion-animation';

interface MotionAnimationProps {
  children: React.ReactNode;
  className?: string;
}

/**包裹动画*/
const MotionAnimation = (props: MotionAnimationProps) => {
  const { children, className = '' } = props;
  const location = useLocation();
  const [setting] = useSetting();
  const pageTransitionMode = setting.pageTransitionMode;
  const config = useMemo(() => {
    return motionAnimationInstance.getAnimationConfig(pageTransitionMode);
  }, [pageTransitionMode]);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        {...config}
        className={`fairys_admin_main_content_body_motion fairys:w-full fairys:h-full fairys:overflow-hidden ${className}`}
        key={location.pathname}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const KeepAliveContent = () => {
  const location = useLocation();
  const id = useMemo(() => {
    return AliveControllerBase.convertIdOrNameOne(location.pathname);
  }, [location.pathname]);

  const outlet = useOutlet();

  //嵌套多个 MotionAnimation ，为了解决页面刷新时，动画不生效的问题
  return (
    <MotionAnimation>
      <KeepAlive name={id} id={id} cacheKey={id}>
        <MotionAnimation>{outlet}</MotionAnimation>
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
      <FairysFullScreen
        className="fairys_admin_main_content_body_full_screen"
        open={pageFullScreen}
        onClose={tabBarInstance.onToggleFullScreen}
      >
        {render}
      </FairysFullScreen>
    </Fragment>
  );
};

export const LayoutContent = memo(() => {
  return (
    <div className="fairys_admin_main_content fairys:overflow-hidden fairys:flex fairys:flex-col fairys:w-full fairys:h-full">
      <div className="fairys_admin_main_content_header fairys:w-full fairys:overflow-hidden fairys:sticky fairys:top-0 fairys:shadow-[var(--fairys-box-shadow)]">
        <ToolBar />
        <TabBar />
      </div>
      <div className="fairys_admin_main_content_body fairys:overflow-hidden fairys:flex-1 fairys:w-full">
        <OutletContentContext />
      </div>
    </div>
  );
});
