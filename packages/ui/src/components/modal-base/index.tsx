import { FloatingPortal } from '@floating-ui/react';
import { Fragment } from 'react';
import { DarkModeInstancePopoverContextProvider } from 'context/dark-mode';
import { createPortal } from 'react-dom';

export interface ModalBaseProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  open?: boolean;
  extra?: React.ReactNode;
  onClose: () => void;
}

export const ModalBase = (props: ModalBaseProps) => {
  const { title, children, footer, open, extra, onClose } = props;
  if (!open) {
    return <Fragment />;
  }
  return createPortal(
    <div className="fairys_admin_modal_base_overlay absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center no-scrollbar">
      <DarkModeInstancePopoverContextProvider>
        <div className="fairys_admin_modal_base p-4 min-w-[300px] min-h-[200px] rounded-sm bg-white dark:bg-gray-800! shadow-xl inset-shadow-sm relative flex flex-col max-h-[100vh] overflow-hidden">
          <span
            className="fairys_admin_modal_base_close text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 absolute top-4 right-4 size-[16px] cursor-pointer icon-[ant-design--close-outlined]"
            onClick={onClose}
          />
          <div className="fairys_admin_modal_base_header relative flex items-center justify-between">
            {title ? <div className="fairys_admin_modal_base_header_title">{title}</div> : <Fragment />}
            {extra ? <div className="fairys_admin_modal_base_header_extra">{extra}</div> : <Fragment />}
          </div>
          <div className="fairys_admin_modal_base_content flex-1 overflow-auto">{children}</div>
          {footer ? <div className="fairys_admin_modal_base_footer">{footer}</div> : <Fragment />}
        </div>
      </DarkModeInstancePopoverContextProvider>
    </div>,
    document.body,
  );
};
