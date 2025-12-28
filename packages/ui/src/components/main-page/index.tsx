import clsx from 'clsx';
import { forwardRef, Ref, useMemo } from 'react';

export interface FairysMainPageBaseProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const FairysMainPageSearch = forwardRef((props: FairysMainPageBaseProps, ref: Ref<HTMLDivElement>) => {
  const { className, children, ...rest } = props;
  const clx = useMemo(() => {
    return clsx(
      'fairys_admin_main_page_search fairys:w-full fairys:p-[14px] fairys:box-border fairys:bg-white fairys:dark:bg-gray-900 ',
      className,
    );
  }, [className]);

  return (
    <div {...rest} ref={ref} className={clx}>
      {children}
    </div>
  );
});

export const FairysMainPageBody = forwardRef((props: FairysMainPageBaseProps, ref: Ref<HTMLDivElement>) => {
  const { className, children, ...rest } = props;
  const clx = useMemo(() => {
    return clsx(
      'fairys_admin_main_page_body fairys:w-full fairys:flex-1 fairys:flex fairys:flex-col fairys:overflow-auto fairys:p-[14px] fairys:box-border fairys:bg-white fairys:dark:bg-gray-900 ',
      className,
    );
  }, [className]);

  return (
    <div {...rest} ref={ref} className={clx}>
      {children}
    </div>
  );
});

export const FairysMainPageFooter = forwardRef((props: FairysMainPageBaseProps, ref: Ref<HTMLDivElement>) => {
  const { className, children, ...rest } = props;
  const clx = useMemo(() => {
    return clsx(
      'fairys_admin_main_page_footer fairys:w-full fairys:p-[14px] fairys:box-border fairys:bg-white fairys:dark:bg-gray-900',
      className,
    );
  }, [className]);

  return (
    <div {...rest} ref={ref} className={clx}>
      {children}
    </div>
  );
});

export const FairysMainPage = forwardRef(
  (props: FairysMainPageBaseProps & { bodyClassName?: string }, ref: Ref<HTMLDivElement>) => {
    const { className, children, bodyClassName, ...rest } = props;
    const clx = useMemo(() => {
      return clsx(
        'fairys_admin_main_page fairys:p-[14px]  fairys:h-full fairys:w-full fairys:bg-stone-100 fairys:dark:bg-gray-950',
        className,
      );
    }, [className]);

    const mainBodyCls = useMemo(() => {
      return clsx(
        'fairys_admin_main_page_main fairys:flex fairys:flex-col fairys:h-full fairys:w-full fairys:rounded-sm fairys:gap-[14px]',
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
