import clsx from 'clsx';
import { forwardRef, Fragment, Ref, useMemo } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useAnimationStatus } from './../utils';

export interface EnterLoadingProps extends MotionProps {
  title?: string;
  tips?: string;
  loading?: boolean;
  className?: string;
}

export const EnterLoading = forwardRef((props: EnterLoadingProps, ref: Ref<HTMLDivElement>) => {
  const { title = '', tips = '载入中', className, loading = false, ...rest } = props;
  const { show, onAnimationComplete } = useAnimationStatus(loading);
  const classNames = useMemo(
    () => clsx('fairys_admin_enter_loading bg-white/75 dark:bg-black/75', className),
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
      <div className="tips">{tips}</div>
    </motion.div>
  ) : (
    <Fragment />
  );
});
