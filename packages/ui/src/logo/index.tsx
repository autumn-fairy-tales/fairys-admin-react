import { useSetting } from 'context/setting';
import { useNavigate } from 'react-router';
import clsx from 'clsx';
import { Fragment, useMemo } from 'react';

export interface LogoProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  mode: 'open' | 'close';
  logoSize?: number;
  isOnlyName?: boolean;
  isHeader?: boolean;
}

export const Logo = (props: LogoProps) => {
  const { mode, className, logoSize = 32, isOnlyName = false, isHeader = false, ...rest } = props;

  const navigate = useNavigate();
  const [state] = useSetting();

  const onClickHome = () => {
    navigate('/');
  };

  const baseClassName = useMemo(() => {
    return clsx('fairys_admin_logo flex items-center', className, {
      'justify-center': mode === 'close' || isOnlyName,
      'gap-2': mode === 'open',
      'min-h-[32px]': isOnlyName,
      'ml-2': isHeader,
    });
  }, [mode, className, isOnlyName]);

  const pname = useMemo(() => {
    return clsx(
      'fairys_admin_logo_name px-2 box-border flex-1 cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis',
      {
        'min-w-[165px]': isHeader,
      },
    );
  }, [isHeader]);

  return (
    <div {...rest} className={baseClassName}>
      {isOnlyName ? (
        <Fragment />
      ) : (
        <div className="flex items-center justify-center cursor-pointer">
          <img width={logoSize} height={logoSize} src={state.logo} alt={state.projectName} onClick={onClickHome} />
        </div>
      )}
      {mode === 'open' || isOnlyName ? (
        <div title={state.projectName} className={pname}>
          {state.projectName}
        </div>
      ) : (
        <Fragment />
      )}
    </div>
  );
};
