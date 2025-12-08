import { FloatingPortal } from '@floating-ui/react';
import { Fragment, useMemo } from 'react';
import { useDarkModeInstanceContext } from 'context/dark-mode';
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
  base_drawer_variants,
} from './utils';
import { UtilsColor } from 'utils/utils.color';

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
  /**样式 */
  style?: React.CSSProperties;
  /**头部样式 */
  headerStyle?: React.CSSProperties;
  /**标题样式 */
  titleStyle?: React.CSSProperties;
  /**主体样式 */
  bodyStyle?: React.CSSProperties;
  /**底部样式 */
  footerStyle?: React.CSSProperties;
  children?: React.ReactNode;
  /**模式 */
  mode?: 'modal' | 'drawer';
  /**抽屉方向 */
  drawerDirection?: 'right' | 'left' | 'top' | 'bottom';
  /**是否全屏*/
  isFullScreen?: boolean;
  /**点击 overlay 关闭弹窗 */
  outsidePressClose?: boolean;
  /**宽度 */
  width?: number;
  /**高度 */
  height?: number;
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
    drawerDirection = 'right',
    width,
    height,
  } = props;
  const [state] = useDarkModeInstanceContext();
  const darkMode = state.darkMode;

  const { show, onAnimationComplete } = useAnimationStatus(open);

  const _clsxDrawerDirection = useMemo(() => {
    if (mode === 'drawer') {
      return clsx('fairys:flex fairys:flex-row no-scrollbar fairys:overflow-hidden', {
        'fairys:justify-end': drawerDirection === 'right',
        'fairys:justify-start': drawerDirection === 'left',
        'fairys:items-end': drawerDirection === 'bottom',
        'fairys:items-start': drawerDirection === 'top',
      });
    }
    return '';
  }, [drawerDirection, mode]);

  const _clsxBaseDrawerDirection = useMemo(() => {
    if (mode === 'drawer') {
      return clsx({
        'fairys:min-w-[400px] fairys:min-h-[100vh]': drawerDirection === 'right' || drawerDirection === 'left',
        'fairys:min-h-[400px] fairys:min-w-[100vw]': drawerDirection === 'bottom' || drawerDirection === 'top',
      });
    }
    return '';
  }, [drawerDirection, mode]);

  if (!show) {
    return <Fragment />;
  }

  const overlayClassName = overlay_className[mode] || overlay_className.modal;
  const baseClassName = base_className[mode] || base_className.modal;
  const overlayVariants = overlay_variants[mode] || overlay_variants.modal;
  const baseVariants = base_variants[mode] || base_variants.modal;
  const drawerVariants = base_drawer_variants[drawerDirection] || base_drawer_variants.right;

  return (
    <FloatingPortal>
      <AnimatePresence mode="wait">
        <motion.div
          className={`${overlayClassName} ${_clsxDrawerDirection} ${darkMode ? 'dark' : ''}`}
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
            className={`${baseClassName} ${_clsxBaseDrawerDirection}  ${
              isFullScreen ? fullScreen_base_className : ''
            } ${className}`}
            style={{ ...style, width, height }}
            initial="collapsed"
            animate={open ? 'open' : 'collapsed'}
            variants={mode === 'drawer' ? drawerVariants : baseVariants}
            transition={transitionBase}
            onAnimationComplete={onAnimationComplete}
          >
            {title || extra ? (
              <div
                style={headerStyle}
                className={clsx(
                  'fairys_admin_modal_base_header  fairys:p-4 fairys:relative fairys:flex fairys:items-center fairys:justify-between fairys:border-b ',
                  UtilsColor.componentBorderClassNameBase,
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
              className={`fairys_admin_modal_base_content fairys:p-4  fairys:flex-1 fairys:overflow-hidden ${bodyClassName}`}
            >
              {children}
            </div>
            {footer ? (
              <div
                style={footerStyle}
                className={`fairys_admin_modal_base_footer fairys:p-4  fairys:border-t ${UtilsColor.componentBorderClassNameBase} ${footerClassName}`}
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
      </AnimatePresence>
    </FloatingPortal>
  );
};
