import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

function PortalBase(props: { children: React.ReactNode }) {
  let { children } = props;
  let [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

interface PopoverProps
  extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
  open?: boolean;
}

export const Popover = (props: PopoverProps) => {
  const { children, open, ...rest } = props;

  // 弹窗位置
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });

  return (
    <PortalBase>
      <AnimatePresence initial={false} mode="wait">
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: 0.25,
              },
            }}
          >
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </PortalBase>
  );
};
