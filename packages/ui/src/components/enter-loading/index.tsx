import clsx from 'clsx';
import { forwardRef, Ref, useMemo } from 'react';

export interface EnterLoadingProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
  tips?: string;
}

export const EnterLoading = forwardRef((props: EnterLoadingProps, ref: Ref<HTMLDivElement>) => {
  const { title = '', tips = '载入中', className, ...rest } = props;

  const classNames = useMemo(
    () => clsx('fairys_admin_enter_loading bg-white/75 dark:bg-black/75', className),
    [className],
  );

  return (
    <div {...rest} ref={ref} className={classNames}>
      <div className="fairys_admin_enter_loading-main">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
      <div className="name">{title}</div>
      <div className="tips">{tips}</div>
    </div>
  );
});
