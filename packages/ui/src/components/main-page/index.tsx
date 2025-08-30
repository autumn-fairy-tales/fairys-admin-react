import clsx from 'clsx';
import { forwardRef, Ref, useMemo } from 'react';

interface MainPageBaseProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const MainPageSearch = forwardRef((props: MainPageBaseProps, ref: Ref<HTMLDivElement>) => {
  const { className, children, ...rest } = props;
  const clx = useMemo(() => {
    return clsx('fairys_admin_main_page_search fairys:w-full fairys:box-border', className);
  }, [className]);

  return (
    <div {...rest} ref={ref} className={clx}>
      {children}
    </div>
  );
});

export const MainPageBody = forwardRef((props: MainPageBaseProps, ref: Ref<HTMLDivElement>) => {
  const { className, children, ...rest } = props;
  const clx = useMemo(() => {
    return clsx(
      'fairys_admin_main_page_body fairys:w-full fairys:box-border fairys:flex-1 fairys:flex fairys:flex-col fairys:overflow-auto',
      className,
    );
  }, [className]);

  return (
    <div {...rest} ref={ref} className={clx}>
      {children}
    </div>
  );
});

export const MainPageFooter = forwardRef((props: MainPageBaseProps, ref: Ref<HTMLDivElement>) => {
  const { className, children, ...rest } = props;
  const clx = useMemo(() => {
    return clsx('fairys_admin_main_page_footer fairys:box-border fairys:w-full', className);
  }, [className]);

  return (
    <div {...rest} ref={ref} className={clx}>
      {children}
    </div>
  );
});

export const MainPage = forwardRef(
  (props: MainPageBaseProps & { bodyClassName?: string }, ref: Ref<HTMLDivElement>) => {
    const { className, children, bodyClassName, ...rest } = props;
    const clx = useMemo(() => {
      return clsx(
        'fairys_admin_main_page fairys:p-[14px] fairys:box-border fairys:h-full fairys:w-full fairys:bg-stone-100 fairys:dark:bg-gray-950',
        className,
      );
    }, [className]);

    const mainBodyCls = useMemo(() => {
      return clsx(
        'fairys_admin_main_page_main fairys:p-[14px] fairys:flex fairys:flex-col fairys:box-border fairys:h-full fairys:w-full fairys:bg-white fairys:dark:bg-gray-800 fairys:rounded-sm',
        bodyClassName,
      );
    }, [bodyClassName]);

    return (
      <div {...rest} ref={ref} className={clx}>
        <div className={mainBodyCls}>{children}</div>
      </div>
    );
  },
);
