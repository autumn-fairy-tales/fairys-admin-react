import { useMemo } from 'react';
import { motion, AnimatePresence, AnimatePresenceProps } from 'framer-motion';
import { useSettingDataInstance } from 'context/setting';
import { motionAnimationDataInstance } from 'context/motion-animation';

interface FairysMotionAnimationProps {
  children: React.ReactNode;
  className?: string;
  animateKey?: string;
  mode?: AnimatePresenceProps['mode'];
}

/**包裹动画*/
export const FairysMotionAnimation = (props: FairysMotionAnimationProps) => {
  const { children, className = '', animateKey = '', mode = 'wait' } = props;
  const [setting] = useSettingDataInstance();
  const pageTransitionMode = setting.pageTransitionMode;

  const config = useMemo(() => {
    return motionAnimationDataInstance.getAnimationConfig(pageTransitionMode);
  }, [pageTransitionMode]);

  return (
    <AnimatePresence mode={mode}>
      <motion.div
        {...config}
        className={`fairys_admin_motion_animation fairys:w-full fairys:h-full fairys:overflow-auto ${className}`}
        key={animateKey}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
