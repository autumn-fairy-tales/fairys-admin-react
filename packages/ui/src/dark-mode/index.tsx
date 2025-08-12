import { useMemo } from 'react';
import { useSetting } from '../context/setting';
import clsx from 'clsx';

interface UseDarkModeOption {
  darkModeField?: string;
  className?: string;
}

export const useDarkMode = (option: UseDarkModeOption = {}) => {
  const { darkModeField = 'darkMenu', className } = option;
  const [state] = useSetting();
  const darkMenu = state[darkModeField];
  return useMemo(() => {
    return clsx('fairys_admin_use_dark_mode transition-all duration-300', className, {
      dark: !!darkMenu,
    });
  }, [darkMenu, className]);
};

export interface DarkModeWarpProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    UseDarkModeOption {}

/**
 * 明暗主题包裹组件
 */
export const DarkModeWarp = (props: DarkModeWarpProps) => {
  const { children, className, darkModeField = 'darkMenu', ...rest } = props;
  const darkModeCls = useDarkMode({ className, darkModeField });

  const darkModeClassName = useMemo(() => {
    return clsx('fairys_admin_dark_mode_warp', darkModeCls);
  }, [darkModeCls, className]);

  return (
    <div {...rest} className={darkModeClassName}>
      {props.children}
    </div>
  );
};
