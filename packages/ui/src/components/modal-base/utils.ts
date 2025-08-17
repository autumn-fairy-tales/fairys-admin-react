import { FloatingPortal } from '@floating-ui/react';
import { Fragment } from 'react';
import { DarkModeInstancePopoverContextProvider } from 'context/dark-mode';
import { motion, AnimatePresence } from 'framer-motion';
import type { Transition } from 'framer-motion';

import { useAnimationStatus } from '../utils';
import clsx from 'clsx';

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

export const overlay_className = {
  modal:
    'fairys_admin_modal_base_overlay absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center no-scrollbar justify-around',
  drawer:
    'fairys_admin_drawer_base_overlay absolute top-0 left-0 right-0 bottom-0 flex flex-row justify-end no-scrollbar',
};

export const base_className = {
  modal:
    'fairys_admin_modal_base p-4 min-w-[300px] min-h-[200px] rounded-sm bg-white dark:bg-gray-800! border border-gray-200 dark:border-gray-700 shadow-xl inset-shadow-sm relative flex flex-col max-h-[100vh] overflow-hidden',
  drawer:
    'fairys_admin_drawer_base_drawer p-4 min-w-[300px] min-h-[100vh] rounded-l-sm bg-white dark:bg-gray-800! border border-gray-200 dark:border-gray-700 shadow-xl inset-shadow-sm relative flex flex-col max-h-[100vh] overflow-hidden',
};

export const overlay_variants = {
  modal: {
    open: { backgroundColor: 'var(--bg-modal)' },
    collapsed: { backgroundColor: 'transparent' },
  },
  drawer: {
    open: { backgroundColor: 'var(--bg-modal)' },
    collapsed: { backgroundColor: 'transparent' },
  },
};

export const transitionBase: Transition = {
  type: 'spring',
  bounce: 0,
  duration: 0.5,
};

export const transitions: Record<'modal' | 'drawer', Record<'open' | 'collapsed', Transition>> = {
  modal: {
    open: transitionBase,
    collapsed: transitionBase,
  },
  drawer: {
    open: transitionBase,
    collapsed: transitionBase,
  },
};

export const base_variants = {
  modal: {
    open: { clipPath: 'inset(0% 0% 0% 0% round var(--radius-sm))' },
    collapsed: { clipPath: 'inset(10% 50% 90% 50% round var(--radius-sm))' },
  },
  drawer: {
    open: { clipPath: 'inset(0% 0% 0% 0% round var(--radius-sm))' },
    collapsed: { clipPath: 'inset(0% 0% 100% 100% round var(--radius-sm))' },
  },
};
