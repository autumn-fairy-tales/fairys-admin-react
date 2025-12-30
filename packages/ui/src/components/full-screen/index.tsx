import clsx from 'clsx';
import { Fragment, useEffect, useMemo, useRef } from 'react';
import hotkeys from 'hotkeys-js';

interface FairysFullScreenProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /**是否全屏*/
  open?: boolean;
  /**全屏内容*/
  children?: React.ReactNode;
  /**关闭全屏回调*/
  onClose?: () => void;
}

class FairysFullScreenInstance {
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

const useFairysFullScreenInstance = () => useRef(new FairysFullScreenInstance()).current;

export const FairysFullScreen = (props: FairysFullScreenProps) => {
  const { open, children, onClose, className: cls, ...rest } = props;
  const fullScreenInstance = useFairysFullScreenInstance();
  fullScreenInstance.onClose = onClose;
  fullScreenInstance.open = open;

  const className = useMemo(() => {
    return clsx(
      'fairys_admin_full_screen fairys:transparent fairys:transition-all fairys:duration-300 fairys:overflow-hidden fairys:w-full fairys:h-full',
      cls,
      {
        'fairys:absolute fairys:bg-(--fairys-admin-full-screen-bg-color) fairys:top-0 fairys:left-0 fairys:right-0 fairys:bottom-0':
          !!open,
      },
    );
  }, [open, cls]);

  const closeClassName = useMemo(() => {
    return clsx(
      'fairys_admin_full_screen_close fairys:transition-all fairys:duration-300 fairys:justify-center fairys:items-center fairys:flex fairys:absolute fairys:top-0 fairys:right-0 fairys:w-[38px] fairys:h-[38px] fairys:bg-(--fairys-admin-full-screen-close-bg-color) fairys:hover:bg-(--fairys-admin-full-screen-close-hover-bg-color) fairys:cursor-pointer',
      {},
    );
  }, [open]);

  useEffect(fullScreenInstance.onEsc, [open]);

  return (
    <div {...rest} className={className}>
      {open ? (
        <div title="退出全屏" className={closeClassName} onClick={onClose}>
          <span className="fairys:absolute fairys:top-[4px] fairys:right-[4px] fairys:text-(--fairys-admin-full-screen-close-text-color) fairys:dark:hover:text-(--fairys-admin-full-screen-close-hover-text-color) fairys:size-[20px] fairys:icon-[mdi-light--fullscreen-exit]" />
        </div>
      ) : (
        <Fragment />
      )}
      {children}
    </div>
  );
};
