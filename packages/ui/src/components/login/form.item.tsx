import clsx from 'clsx';
import { cloneElement, Fragment, isValidElement, useMemo } from 'react';
import { useFairysLoginPageFormItemInstance, UseFairysLoginPageFormItemInstanceProps } from './instance';

export interface FairysLoginPageFormItemInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  /**错误边框位置*/
  errorBorderd?: 'bottom' | 'none' | 'all';
  /**是否存在验证不通过信息*/
  'data-is-error'?: boolean;
}

export const FairysLoginPageFormItemInputClassName =
  'fairys_login_page_content_form_item_input fairys:disabled:bg-gray-100 fairys:dark:disabled:bg-gray-700 fairys:transition-all fairys:duration-300 fairys:py-[8px] fairys:px-[12px] fairys:outline-none fairys:box-border fairys:w-full fairys:min-h-[32px] fairys:rounded-sm fairys:text-sm fairys:border fairys:border-gray-200 fairys:dark:border-gray-700 fairys:data-[is-error=true]:text-red-500 fairys:data-[is-error=true]:placeholder:text-red-500';

export const FairysLoginPageFormItemInput = (props: FairysLoginPageFormItemInputProps) => {
  const { className, errorBorderd = 'bottom', ...rest } = props;
  const inputClassName = useMemo(() => {
    return clsx(FairysLoginPageFormItemInputClassName, className, {
      'fairys:data-[is-error=true]:border-red-500': errorBorderd === 'all',
      'fairys:data-[is-error=true]:border-b-red-500': errorBorderd === 'bottom',
    });
  }, [className, errorBorderd]);
  return <input {...rest} className={inputClassName} />;
};

export interface FairysLoginPageFormItemProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    UseFairysLoginPageFormItemInstanceProps {
  /**标签*/
  label?: React.ReactNode;
  /**是否必填*/
  required?: boolean;
  /**显示错误信息*/
  isShowErrorMessage?: boolean;
  /**布局*/
  layout?: 'vertical' | 'horizontal';
  /**标签类名*/
  labelClassName?: string;
}

export const FairysLoginPageFormItem = (props: FairysLoginPageFormItemProps) => {
  const {
    label,
    children,
    className,
    formatValue,
    valuePropName,
    name,
    required,
    isShowErrorMessage,
    layout = 'vertical',
    labelClassName,
    ...rest
  } = props;
  const itemInstance = useFairysLoginPageFormItemInstance({ name: name, formatValue, valuePropName });
  const errors = itemInstance.errors as any;
  const hasError = Boolean(errors);

  const formItemClassName = useMemo(() => {
    return clsx('fairys_login_page_content_form_item fairys:flex ', className, {
      'fairys:flex-row fairys:gap-x-[12px]': layout === 'horizontal',
      'fairys:flex-col fairys:gap-y-[4px]': layout === 'vertical',
    });
  }, [className, layout]);

  const labelcCls = useMemo(() => {
    return clsx(
      `fairys_login_page_content_form_item_label fairys:min-w-[80px] fairys:relative fairys:flex fairys:items-center fairys:font-medium fairys:text-[14px]`,
      labelClassName,
      {
        [`fairys:before:content-['*'] fairys:before:text-red-600 fairys:before:mr-[2px]`]: required,
        'fairys:justify-end': layout === 'horizontal',
      },
    );
  }, [required, layout, labelClassName]);

  const contentCls = useMemo(() => {
    return clsx('fairys_login_page_content_form_item_content fairys:relative', {
      'fairys:flex-1': layout === 'horizontal',
    });
  }, [layout]);

  const _value =
    typeof itemInstance.value === 'number' || typeof itemInstance.value === 'boolean'
      ? itemInstance.value
      : itemInstance.value || '';

  return (
    <div {...rest} className={formItemClassName}>
      <label className={labelcCls} htmlFor={name}>
        {label}
      </label>
      <div className={contentCls}>
        {isValidElement(children)
          ? cloneElement(children, {
              value: _value,
              onChange: itemInstance.onChange,
              id: name,
              ['data-is-error']: hasError,
              name: name,
            } as any)
          : children}
        {isShowErrorMessage && hasError ? (
          <div className="fairys_login_page_content_form_item_error_message fairys:absolute fairys:top-full fairys:left-0 fairys:text-[10px] fairys:text-red-500">
            {errors}
          </div>
        ) : (
          <Fragment />
        )}
      </div>
    </div>
  );
};
