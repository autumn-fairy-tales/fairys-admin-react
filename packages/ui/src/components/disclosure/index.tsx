import { motion, AnimatePresence } from 'framer-motion';
import type { MotionProps } from 'framer-motion';

interface DisclosureItemProps extends MotionProps {
  open?: boolean;
  className?: string;
}

export const DisclosureItem = (props: DisclosureItemProps) => {
  const { children, open, className, ...rest } = props;
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        {...rest}
        className={className}
        initial="collapsed"
        animate={open ? 'open' : 'collapsed'}
        variants={{
          open: { scale: 1, rotate: 0, opacity: 1, height: 'auto' },
          collapsed: { scale: 0.5, rotate: 45, opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
