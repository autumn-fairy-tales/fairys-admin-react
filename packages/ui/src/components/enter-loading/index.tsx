import clsx from 'clsx';
import { forwardRef, Fragment, Ref, useMemo } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useAnimationStatus } from './../utils';

export interface FairysEnterLoadingProps extends MotionProps {
  /**加载标题*/
  title?: string;
  /**加载提示*/
  tips?: string;
  /**是否加载中*/
  loading?: boolean;
  className?: string;
}

export const FairysEnterLoading = forwardRef((props: FairysEnterLoadingProps, ref: Ref<HTMLDivElement>) => {
  const { title = '', tips = '载入中', className, loading = false, ...rest } = props;
  const { show, onAnimationComplete } = useAnimationStatus(loading);
  const classNames = useMemo(() => clsx('fairys_admin_enter_loading', className), [className]);
  return show ? (
    <motion.div
      {...rest}
      ref={ref}
      className={classNames}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={onAnimationComplete}
    >
      <div className="fairys_admin_enter_loading-main">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
      <div className="name">{title}</div>
      <div className="tips">
        {tips}
        <span className="loading-dots" />
      </div>
    </motion.div>
  ) : (
    <Fragment />
  );
});

export interface FairysLoadingProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  loading?: boolean;
}

export const FairysLoading = (props: FairysLoadingProps) => {
  const { loading = false, className, children, ...rest } = props;
  const classNames = useMemo(
    () => clsx('fairys_admin_loading_base fairys:relative fairys:w-full fairys:h-full', className),
    [className],
  );

  return (
    <div {...rest} className={classNames}>
      {children}
      <FairysEnterLoading loading={loading} />
    </div>
  );
};

export default FairysEnterLoading;
