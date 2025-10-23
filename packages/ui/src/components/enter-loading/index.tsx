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
  const classNames = useMemo(
    () => clsx('fairys_admin_enter_loading fairys:bg-white/75 fairys:dark:bg-black/75', className),
    [className],
  );
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
export default FairysEnterLoading;
