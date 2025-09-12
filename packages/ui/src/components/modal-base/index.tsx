import { FloatingPortal } from '@floating-ui/react';
import { Fragment } from 'react';
import { DarkModeInstancePopoverContextProvider } from 'context/dark-mode';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimationStatus } from '../utils';
import clsx from 'clsx';
import {
  overlay_variants,
  base_variants,
  base_className,
  overlay_className,
  transitionBase,
  fullScreen_base_className,
} from './utils';

export interface FairysModalBaseProps {
  /**显示隐藏*/
  open?: boolean;
  /**标题 */
  title?: React.ReactNode;
  /**底部内容*/
  footer?: React.ReactNode;
  /**额外内容 */
  extra?: React.ReactNode;
  /**关闭回调 */
  onClose?: () => void;
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
  // 是否全屏
  isFullScreen?: boolean;
  /**点击 overlay 关闭弹窗 */
  outsidePressClose?: boolean;
}

export const FairysModalBase = (props: FairysModalBaseProps) => {
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
    isFullScreen,
    outsidePressClose = true,
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
            onClick={(event) => {
              event.preventDefault();
              // 点击 overlay 关闭弹窗
              if (event.target === event.currentTarget && outsidePressClose) {
                onClose?.();
              }
            }}
          >
            <motion.div
              className={`${baseClassName} ${isFullScreen ? fullScreen_base_className : ''} ${className}`}
              style={style}
              initial="collapsed"
              animate={open ? 'open' : 'collapsed'}
              variants={baseVariants}
              transition={transitionBase}
              onAnimationComplete={onAnimationComplete}
            >
              {title || extra ? (
                <div
                  style={headerStyle}
                  className={clsx(
                    'fairys_admin_modal_base_header fairys:box-border fairys:p-4 fairys:relative fairys:flex fairys:items-center fairys:justify-between fairys:border-b fairys:border-gray-200 fairys:dark:border-gray-700 ',
                    headerClassName,
                  )}
                >
                  {title ? (
                    <div
                      style={titleStyle}
                      className={`fairys_admin_modal_base_header_title fairys:font-medium fairys:text-lg ${titleClassName}`}
                    >
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
                className={`fairys_admin_modal_base_content fairys:p-4 fairys:box-border fairys:flex-1 fairys:overflow-hidden ${bodyClassName}`}
              >
                {children}
              </div>
              {footer ? (
                <div
                  style={footerStyle}
                  className={`fairys_admin_modal_base_footer fairys:p-4 fairys:box-border fairys:border-t fairys:border-gray-200 fairys:dark:border-gray-700 ${footerClassName}`}
                >
                  {footer}
                </div>
              ) : (
                <Fragment />
              )}
              {onClose ? (
                <span
                  className="fairys_admin_modal_base_close fairys:text-gray-400 fairys:hover:text-gray-500 fairys:dark:hover:text-gray-300 fairys:absolute fairys:top-4 fairys:right-4 fairys:size-[16px] fairys:cursor-pointer fairys:icon-[ant-design--close-outlined]"
                  onClick={onClose}
                />
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
