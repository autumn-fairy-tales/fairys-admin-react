import { motion, AnimatePresence } from 'framer-motion';
import type { MotionProps } from 'framer-motion';
import { useAnimationStatus } from '../utils';

interface DisclosureItemProps extends MotionProps {
  open?: boolean;
  className?: string;
}

export const DisclosureItem = (props: DisclosureItemProps) => {
  const { children, open, className, ...rest } = props;
  const { show, onAnimationComplete } = useAnimationStatus(open);

  return (
    <AnimatePresence initial={false} mode="wait">
      {show && (
        <motion.div
          {...rest}
          className={className}
          initial="collapsed"
          animate={open ? 'open' : 'collapsed'}
          variants={{
            open: { scale: 1, rotate: 0, opacity: 1, height: 'auto' },
            collapsed: { scale: 0.5, rotate: 45, opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.35 }}
          onAnimationComplete={onAnimationComplete}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
