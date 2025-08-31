import clsx from 'clsx';
import { cloneElement, Fragment, isValidElement, useMemo } from 'react';
import { useLoginPageFormItemInstance, UseLoginPageFormItemInstanceProps } from './instance';

export interface LoginPageFormItemInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const LoginPageFormItemInput = (props: LoginPageFormItemInputProps) => {
  const { className, ...rest } = props;
  const inputClassName = useMemo(() => {
    return clsx(
      'fairys_login_page_content_form_item_input fairys:transition-all fairys:duration-300 fairys:py-[8px] fairys:px-[12px] fairys:outline-none fairys:box-border fairys:w-full fairys:min-h-[32px] fairys:rounded-sm fairys:text-sm',
      [
        'fairys:border fairys:border-gray-200 fairys:dark:border-gray-700 fairys:data-[is-error=true]:text-red-600 fairys:data-[is-error=true]:border-b-red-600',
      ],
      className,
    );
  }, [className]);

  return <input {...rest} className={inputClassName} />;
};

export interface LoginPageFormItemProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    UseLoginPageFormItemInstanceProps {
  label?: React.ReactNode;
  required?: boolean;
}

export const LoginPageFormItem = (props: LoginPageFormItemProps) => {
  const { label, children, className, formatValue, valuePropName, name, required, ...rest } = props;
  const itemInstance = useLoginPageFormItemInstance({ name: name, formatValue, valuePropName });
  const errors = itemInstance.errors;
  const hasError = Boolean(errors);

  const formItemClassName = useMemo(() => {
    return clsx('fairys_login_page_content_form_item fairys:flex fairys:flex-col fairys:gap-y-[4px]', className);
  }, [className]);

  const labelcCls = useMemo(() => {
    return clsx(
      `fairys_login_page_content_form_item_label fairys:relative fairys:block fairys:font-medium fairys:text-[14px]`,
      {
        [`fairys:before:content-['*'] fairys:before:text-red-600 fairys:before:mr-[2px]`]: required,
      },
    );
  }, [required]);

  const _value =
    typeof itemInstance.value === 'number' || typeof itemInstance.value === 'boolean'
      ? itemInstance.value
      : itemInstance.value || '';

  return (
    <div {...rest} className={formItemClassName}>
      <label className={labelcCls} htmlFor={name}>
        {label}
      </label>
      <div className="fairys_login_page_content_form_item_content">
        {isValidElement(children) ? (
          cloneElement(children, {
            value: _value,
            onChange: itemInstance.onChange,
            id: name,
            ['data-is-error']: hasError,
            name: name,
          } as any)
        ) : (
          <LoginPageFormItemInput />
        )}
      </div>
    </div>
  );
};
