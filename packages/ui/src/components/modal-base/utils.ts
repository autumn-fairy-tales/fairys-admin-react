import type { Transition } from 'framer-motion';

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
    'fairys_admin_modal_base_overlay fairys:absolute fairys:top-0 fairys:left-0 fairys:right-0 fairys:bottom-0 fairys:flex fairys:flex-col fairys:items-center no-scrollbar fairys:justify-around',
  drawer:
    'fairys_admin_drawer_base_overlay fairys:absolute fairys:top-0 fairys:left-0 fairys:right-0 fairys:bottom-0 fairys:flex fairys:flex-row fairys:justify-end no-scrollbar',
};

export const base_className = {
  modal:
    'fairys_admin_modal_base fairys:min-w-[400px] fairys:min-h-[200px] fairys:max-h-[calc(100vh-100px)] fairys:rounded-sm fairys:bg-white fairys:dark:bg-gray-800! fairys:border fairys:border-gray-200 fairys:dark:border-gray-700 fairys:shadow-xl fairys:inset-shadow-sm fairys:relative fairys:flex fairys:flex-col fairys:max-h-[100vh] fairys:overflow-hidden',
  drawer:
    'fairys_admin_drawer_base_drawer fairys:min-w-[400px] fairys:min-h-[100vh] fairys:rounded-l-sm fairys:bg-white fairys:dark:bg-gray-800! fairys:border fairys:border-gray-200 fairys:dark:border-gray-700 fairys:shadow-xl fairys:inset-shadow-sm fairys:relative fairys:flex fairys:flex-col fairys:max-h-[100vh] fairys:overflow-hidden',
};

export const fullScreen_base_className = 'fairys:min-w-[100vw]! fairys:min-h-[100vh]! fairys:p-0!';

export const overlay_variants = {
  modal: {
    open: {
      backgroundColor: 'var(--fairys-bg-modal,oklch(27.8% 0.033 256.848 /0.5))',
    },
    collapsed: { backgroundColor: 'transparent' },
  },
  drawer: {
    open: {
      backgroundColor: 'var(--fairys-bg-modal,oklch(27.8% 0.033 256.848 /0.5))',
    },
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
