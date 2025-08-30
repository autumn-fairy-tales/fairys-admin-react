import clsx from 'clsx';
import { Fragment, useEffect, useMemo, useRef } from 'react';
import hotkeys from 'hotkeys-js';

interface FullScreenProps {
  open?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

class FullScreenInstance {
  open = false;
  onClose?: () => void;

  /**退出全屏*/
  onEsc = () => {
    if (this.open) {
      const _this = this;
      hotkeys('esc', (e) => {
        e.preventDefault();
        _this.onClose?.();
      });
    }
    return () => {
      hotkeys.unbind('esc');
    };
  };
}

const useFullScreenInstance = () => useRef(new FullScreenInstance()).current;

export const FullScreen = (props: FullScreenProps) => {
  const { open, children, onClose } = props;
  const fullScreenInstance = useFullScreenInstance();
  fullScreenInstance.onClose = onClose;
  fullScreenInstance.open = open;

  const className = useMemo(() => {
    return clsx('fairys_admin_full_screen transparent transition-all duration-300 overflow-hidden w-full h-full', {
      'absolute bg-white dark:bg-gray-800 top-0 left-0 right-0 bottom-0': !!open,
    });
  }, [open]);

  const closeClassName = useMemo(() => {
    return clsx(
      'fairys_admin_full_screen_close transition-all duration-300 justify-center items-center flex absolute top-0 right-0 w-[38px] h-[38px] bg-neutral-500 hover:bg-neutral-600 cursor-pointer',
      {},
    );
  }, [open]);

  useEffect(fullScreenInstance.onEsc, [open]);

  return (
    <div className={className}>
      {open ? (
        <div title="退出全屏" className={closeClassName} onClick={onClose}>
          <span className="absolute top-[4px] right-[4px] text-white dark:hover:text-neutral-300 size-[20px] icon-[mdi-light--fullscreen-exit]" />
        </div>
      ) : (
        <Fragment />
      )}
      {children}
    </div>
  );
};
