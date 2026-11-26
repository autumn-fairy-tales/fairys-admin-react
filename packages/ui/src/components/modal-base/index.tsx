import { FloatingPortal } from '@floating-ui/react';
import { Fragment, useEffect, useMemo, useRef } from 'react';
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
import { DarkModeInstanceContextProvider } from 'context/dark-mode';

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
  /**主题*/
  theme?: 'light' | 'dark';
}

let modalOpenCount = 0;
let modalPreviousOverflow = '';

const focusableSelector =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

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
    theme: _parentTheme,
  } = props;
  const [state] = useDarkModeInstanceContext();
  const theme = _parentTheme || state.theme;
  const { show, onAnimationComplete } = useAnimationStatus(open);
  const modalRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const previousActiveElement = document.activeElement as HTMLElement | null;
    if (modalOpenCount === 0) {
      modalPreviousOverflow = document.body.style.overflow;
    }
    modalOpenCount += 1;
    document.body.style.overflow = 'hidden';

    const modal = modalRef.current;
    const focusFirst = () => {
      const focusable = modal?.querySelectorAll<HTMLElement>(focusableSelector);
      if (focusable && focusable.length) {
        focusable[0].focus();
      } else {
        modal?.focus();
      }
    };
    const timer = window.setTimeout(focusFirst, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current?.();
        return;
      }
      if (event.key !== 'Tab' || !modal) {
        return;
      }
      const focusable = Array.from(modal.querySelectorAll<HTMLElement>(focusableSelector));
      if (!focusable.length) {
        event.preventDefault();
        modal.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', onKeyDown);
      modalOpenCount -= 1;
      if (modalOpenCount === 0) {
        document.body.style.overflow = modalPreviousOverflow;
      }
      previousActiveElement?.focus?.();
    };
  }, [open]);

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
      const isHorizontal = drawerDirection === 'right' || drawerDirection === 'left';
      const style: React.CSSProperties = isHorizontal
        ? { width: width === undefined ? 'min(400px, 100vw)' : undefined, height: '100vh' }
        : { width: '100vw', height: height === undefined ? 'min(400px, 100vh)' : undefined };
      return { style, class: '' };
    }
    return {
      class: '',
      style: {} as React.CSSProperties,
    };
  }, [drawerDirection, mode, width, height]);

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
      <DarkModeInstanceContextProvider theme={theme}>
        <AnimatePresence mode="wait">
          <motion.div
            data-theme={theme}
            className={`${overlayClassName} ${_clsxDrawerDirection} ${theme}`}
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
              ref={modalRef}
              className={`${baseClassName} ${_clsxBaseDrawerDirection.class}  ${
                isFullScreen ? fullScreen_base_className : ''
              } ${className}`}
              style={{
                ..._clsxBaseDrawerDirection.style,
                ...style,
                width: width ?? style?.width ?? _clsxBaseDrawerDirection.style.width,
                height: height ?? style?.height ?? _clsxBaseDrawerDirection.style.height,
              }}
              initial="collapsed"
              animate={open ? 'open' : 'collapsed'}
              variants={mode === 'drawer' ? drawerVariants : baseVariants}
              transition={transitionBase}
              onAnimationComplete={onAnimationComplete}
              role="dialog"
              aria-modal="true"
              aria-label={typeof title === 'string' ? title : undefined}
              tabIndex={-1}
            >
              {title || extra ? (
                <div
                  style={headerStyle}
                  className={clsx(
                    'fairys_admin_modal_base_header fairys:box-border fairys:p-4 fairys:relative fairys:flex fairys:items-center fairys:justify-between fairys:border-b ',
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
                className={`fairys_admin_modal_base_content fairys:box-border fairys:p-4 fairys:flex-1 fairys:overflow-hidden ${bodyClassName}`}
              >
                {children}
              </div>
              {footer ? (
                <div
                  style={footerStyle}
                  className={`fairys_admin_modal_base_footer fairys:box-border fairys:p-4 fairys:border-t ${UtilsColor.componentBorderClassNameBase} ${footerClassName}`}
                >
                  {footer}
                </div>
              ) : (
                <Fragment />
              )}
              {onClose ? (
                <span
                  className="fairys_admin_modal_base_close fairys:absolute fairys:top-4 fairys:right-4 fairys:size-[16px] fairys:cursor-pointer fairys:icon-[ant-design--close-outlined]"
                  onClick={onClose}
                />
              ) : (
                <Fragment />
              )}
            </motion.div>
            {mode === 'modal' ? <div data-empty /> : <Fragment />}
          </motion.div>
        </AnimatePresence>
      </DarkModeInstanceContextProvider>
    </FloatingPortal>
  );
};
