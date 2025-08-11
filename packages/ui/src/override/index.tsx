import clsx from 'clsx';
import { useMemo } from 'react';

export interface OverrideProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}
export const Override = (props: OverrideProps) => {
  const { className, ...rest } = props;
  const overviewClassName = useMemo(() => {
    return clsx('fairys_admin_override', className);
  }, [className]);

  return <div className={overviewClassName} {...rest}></div>;
};
