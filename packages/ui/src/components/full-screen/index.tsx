import clsx from 'clsx';
import { useMemo } from 'react';

interface FullScreenProps {
  open?: boolean;
  children?: React.ReactNode;
}

export const FullScreen = (props: FullScreenProps) => {
  const { open, children } = props;
  const className = useMemo(() => {
    return clsx('fairys_admin_full_screen transparent transition-all duration-500 overflow-hidden w-full h-full', {
      'absolute bg-white dark:bg-gray-800 top-0 left-0 right-0 bottom-0': !!open,
    });
  }, [open]);

  return <div className={className}>{children}</div>;
};
