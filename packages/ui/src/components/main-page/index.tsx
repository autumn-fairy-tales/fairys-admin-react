import clsx from 'clsx';
import { forwardRef, Ref, useMemo } from 'react';

interface MainPageBaseProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const MainPageSearch = forwardRef((props: MainPageBaseProps, ref: Ref<HTMLDivElement>) => {
  const { className, children, ...rest } = props;
  const clx = useMemo(() => {
    return clsx('fairys_admin_main_page_search w-full box-border', className);
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
    return clsx('fairys_admin_main_page_body w-full box-border flex-1 flex flex-col overflow-auto', className);
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
    return clsx('fairys_admin_main_page_footer box-border w-full', className);
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
      return clsx('fairys_admin_main_page p-[14px] box-border h-full w-full bg-gray-100 dark:bg-gray-950', className);
    }, [className]);

    const mainBodyCls = useMemo(() => {
      return clsx(
        'fairys_admin_main_page_main p-[14px] flex flex-col box-border h-full w-full bg-white dark:bg-gray-800 rounded-sm',
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
