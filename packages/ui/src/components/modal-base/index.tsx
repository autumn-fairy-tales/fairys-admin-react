import { FloatingPortal } from '@floating-ui/react';
import { Fragment } from 'react';
import { DarkModeInstancePopoverContextProvider } from 'context/dark-mode';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimationStatus } from '../utils';
import clsx from 'clsx';
import { overlay_variants, base_variants, base_className, overlay_className, transitionBase } from './utils';

export interface ModalBaseProps {
  /**显示隐藏*/
  open?: boolean;
  /**标题 */
  title?: React.ReactNode;
  /**底部内容*/
  footer?: React.ReactNode;
  /**额外内容 */
  extra?: React.ReactNode;
  /**关闭回调 */
  onClose: () => void;
  /**内容类名 */
  className?: string;
  /**头部类名 */
  headerClassName?: string;
  /**标题类名 */
  titleClassName?: string;
  /**主体类名 */
  bodyClassName?: string;
  /**底部类名 */
  footerClassName?: string;
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
  children?: React.ReactNode;
  mode?: 'modal' | 'drawer';
}

export const ModalBase = (props: ModalBaseProps) => {
  const {
    title,
    children,
    footer,
    open,
    extra,
    onClose,
    className = '',
    headerClassName = '',
    titleClassName = '',
    bodyClassName = '',
    footerClassName = '',
    style,
    headerStyle,
    titleStyle,
    bodyStyle,
    footerStyle,
    mode = 'modal',
  } = props;
  const { show, onAnimationComplete } = useAnimationStatus(open);

  if (!show) {
    return <Fragment />;
  }
  const overlayClassName = overlay_className[mode] || overlay_className.modal;
  const baseClassName = base_className[mode] || base_className.modal;
  const overlayVariants = overlay_variants[mode] || overlay_variants.modal;
  const baseVariants = base_variants[mode] || base_variants.modal;

  return (
    <FloatingPortal>
      <AnimatePresence mode="wait">
        <DarkModeInstancePopoverContextProvider>
          <motion.div
            className={overlayClassName}
            initial="collapsed"
            animate={open ? 'open' : 'collapsed'}
            variants={overlayVariants}
            transition={transitionBase}
          >
            <motion.div
              className={`${baseClassName} ${className}`}
              style={style}
              initial="collapsed"
              animate={open ? 'open' : 'collapsed'}
              variants={baseVariants}
              transition={transitionBase}
              onAnimationComplete={onAnimationComplete}
            >
              <span
                className="fairys_admin_modal_base_close text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 absolute top-4 right-4 size-[16px] cursor-pointer icon-[ant-design--close-outlined]"
                onClick={onClose}
              />
              {title || extra ? (
                <div
                  style={headerStyle}
                  className={clsx(
                    'fairys_admin_modal_base_header relative flex items-center justify-between border-b border-gray-200 dark:border-gray-700 ',
                    headerClassName,
                  )}
                >
                  {title ? (
                    <div style={titleStyle} className={`fairys_admin_modal_base_header_title ${titleClassName}`}>
                      {title}
                    </div>
                  ) : (
                    <Fragment />
                  )}
                  {extra ? <div className="fairys_admin_modal_base_header_extra">{extra}</div> : <Fragment />}
                </div>
              ) : (
                <Fragment />
              )}
              <div
                style={bodyStyle}
                className={`fairys_admin_modal_base_content flex-1 overflow-auto ${bodyClassName}`}
              >
                {children}
              </div>
              {footer ? (
                <div
                  style={footerStyle}
                  className={`fairys_admin_modal_base_footer border-t border-gray-200 dark:border-gray-700 ${footerClassName}`}
                >
                  {footer}
                </div>
              ) : (
                <Fragment />
              )}
            </motion.div>
            {mode === 'modal' ? <div data-empty /> : <Fragment />}
          </motion.div>
        </DarkModeInstancePopoverContextProvider>
      </AnimatePresence>
    </FloatingPortal>
  );
};
