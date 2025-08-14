import { motion, AnimatePresence } from 'framer-motion';
import type { MotionProps } from 'framer-motion';
import { useMemo, useState } from 'react';

interface DisclosureItemProps extends MotionProps {
  open?: boolean;
  className?: string;
}

export const DisclosureItem = (props: DisclosureItemProps) => {
  const { children, open, className, ...rest } = props;
  const [isOpen, setIsOpen] = useState(open);

  const isShow = useMemo(() => {
    //如果是开，则说明是展开的数据
    if (isOpen) {
      return true;
    }
    // 其他情况直接执行 open 参数
    return open;
  }, [isOpen, open]);

  return (
    <AnimatePresence initial={false} mode="wait">
      {isShow && (
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
          onAnimationComplete={(status) => {
            setIsOpen(status === 'open');
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
