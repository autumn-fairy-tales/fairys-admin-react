import clsx from 'clsx';
import { Fragment, useMemo } from 'react';

interface FullScreenProps {
  open?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

export const FullScreen = (props: FullScreenProps) => {
  const { open, children, onClose } = props;

  const className = useMemo(() => {
    return clsx('fairys_admin_full_screen transparent transition-all duration-300 overflow-hidden w-full h-full', {
      'absolute bg-white dark:bg-gray-800 top-0 left-0 right-0 bottom-0': !!open,
    });
  }, [open]);

  return (
    <div className={className}>
      {open ? (
        <span
          className="fairys_admin_full_screen_close text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 absolute top-4 right-4 size-[16px] cursor-pointer icon-[ant-design--close-outlined]"
          onClick={onClose}
        />
      ) : (
        <Fragment />
      )}
      {children}
    </div>
  );
};
