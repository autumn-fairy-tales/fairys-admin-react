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
    return clsx('fairys_admin_logo fairys:flex fairys:items-center', className, {
      'fairys:justify-center': mode === 'close' || isOnlyName,
      'fairys:gap-2': mode === 'open',
      'fairys:min-h-[32px]': isOnlyName,
      'fairys:ml-2': isHeader,
    });
  }, [mode, className, isOnlyName]);

  const pname = useMemo(() => {
    return clsx(
      'fairys_admin_logo_name fairys:px-2 fairys:box-border fairys:flex-1 fairys:cursor-pointer fairys:whitespace-nowrap fairys:overflow-hidden fairys:text-ellipsis',
      {
        'fairys:min-w-[165px]': isHeader,
      },
    );
  }, [isHeader]);

  return (
    <div {...rest} className={baseClassName}>
      {isOnlyName ? (
        <Fragment />
      ) : (
        <div className="fairys:flex fairys:items-center fairys:justify-center fairys:cursor-pointer">
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
