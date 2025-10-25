import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettingDataInstance } from 'context/setting';
import { motionAnimationDataInstance } from 'context/motion-animation';

interface FairysMotionAnimationProps {
  children: React.ReactNode;
  className?: string;
  animateKey?: string;
}

/**包裹动画*/
export const FairysMotionAnimation = (props: FairysMotionAnimationProps) => {
  const { children, className = '', animateKey = '' } = props;
  const [setting] = useSettingDataInstance();
  const pageTransitionMode = setting.pageTransitionMode;

  const config = useMemo(() => {
    return motionAnimationDataInstance.getAnimationConfig(pageTransitionMode);
  }, [pageTransitionMode]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        {...config}
        className={`fairys_admin_motion_animation fairys:w-full fairys:h-full fairys:overflow-hidden ${className}`}
        key={animateKey}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
