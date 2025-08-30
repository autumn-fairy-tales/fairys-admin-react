import clsx from 'clsx';
import { useMemo } from 'react';
import {
  LoginPageFormInstanceContext,
  useLoginPageFormInstance,
  LoginPageFormInstance,
  useLoginPageFormInstanceContext,
} from './instance';
import { LoginPageFormItem, LoginPageFormItemInput } from './form.item';

interface LoginPageProps
  extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  form?: LoginPageFormInstance;
  rules?: LoginPageFormInstance['rules'];
  bodyClassName?: string;
  mainClassName?: string;
  titleClassName?: string;
}

export const LoginPage = (props: LoginPageProps) => {
  const { className, title, form, children, rules, bodyClassName, titleClassName, mainClassName, ...rest } = props;

  const loginPageClassName = useMemo(() => {
    return clsx('fairys_login_page w-full h-full flex items-center justify-center overflow-auto box-border', className);
  }, [className]);

  const mainClass = useMemo(() => {
    return clsx(
      'fairys_login_page_content p-[14px] flex flex-col w-[400px] h-[400px] rounded-sm gap-y-[20px] box-border  shadow-xl inset-shadow-sm ',
      mainClassName,
    );
  }, [mainClassName]);

  const titleClass = useMemo(() => {
    return clsx(
      'fairys_login_page_content_title flex items-center justify-center text-[24px] font-bold box-border',
      titleClassName,
    );
  }, [titleClassName]);

  const bodyClass = useMemo(() => {
    return clsx('fairys_login_page_content_form flex-1 flex flex-col gap-[14px] box-border', bodyClassName);
  }, [bodyClassName]);

  const formInstance = useLoginPageFormInstance(form);
  formInstance.rules = rules;

  return (
    <LoginPageFormInstanceContext.Provider value={formInstance}>
      <div className={loginPageClassName} {...rest}>
        <div className={mainClass}>
          <div className={titleClass}>{title}</div>
          <div className={bodyClass}>{children}</div>
        </div>
      </div>
    </LoginPageFormInstanceContext.Provider>
  );
};

LoginPage.useForm = useLoginPageFormInstance;
LoginPage.useFormInstance = useLoginPageFormInstanceContext;
LoginPage.FormItem = LoginPageFormItem;
LoginPage.FormItemInput = LoginPageFormItemInput;
