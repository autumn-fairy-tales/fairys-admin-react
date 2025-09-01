import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
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
    return clsx(
      'fairys_login_page fairys:w-full fairys:h-full fairys:flex fairys:items-center fairys:justify-center fairys:overflow-auto fairys:box-border',
      className,
    );
  }, [className]);

  const mainClass = useMemo(() => {
    return clsx(
      'fairys_login_page_content fairys:p-[14px] fairys:flex fairys:flex-col fairys:w-[400px] fairys:h-[400px] fairys:rounded-sm fairys:gap-y-[20px] fairys:box-border  fairys:shadow-xl fairys:inset-shadow-sm ',
      mainClassName,
    );
  }, [mainClassName]);

  const titleClass = useMemo(() => {
    return clsx(
      'fairys_login_page_content_title fairys:flex fairys:items-center fairys:justify-center fairys:text-[24px] fairys:font-bold fairys:box-border',
      titleClassName,
    );
  }, [titleClassName]);

  const bodyClass = useMemo(() => {
    return clsx(
      'fairys_login_page_content_form fairys:flex-1 fairys:flex fairys:flex-col fairys:gap-[20px] fairys:box-border',
      bodyClassName,
    );
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
