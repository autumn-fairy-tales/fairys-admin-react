import clsx from 'clsx';
import { useMemo } from 'react';
import {
  FairysLoginPageFormInstanceContext,
  useFairysLoginPageFormInstance,
  FairysLoginPageFormInstance,
  useFairysLoginPageFormInstanceContext,
} from './instance';
import { FairysLoginPageFormItem, FairysLoginPageFormItemInput } from './form.item';

interface FairysLoginPageProps
  extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'title'> {
  /**登录页标题*/
  title?: React.ReactNode;
  /**登录页表单实例*/
  form?: FairysLoginPageFormInstance;
  /**登录页表单验证规则*/
  rules?: FairysLoginPageFormInstance['rules'];
  /**登录页表单主体类名*/
  bodyClassName?: string;
  /**登录页主体类名*/
  mainClassName?: string;
  /**登录页标题类名*/
  titleClassName?: string;
}

export const FairysLoginPage = (props: FairysLoginPageProps) => {
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

  const formInstance = useFairysLoginPageFormInstance(form);
  formInstance.rules = rules;

  return (
    <FairysLoginPageFormInstanceContext.Provider value={formInstance}>
      <div className={loginPageClassName} {...rest}>
        <div className={mainClass}>
          <div className={titleClass}>{title}</div>
          <div className={bodyClass}>{children}</div>
        </div>
      </div>
    </FairysLoginPageFormInstanceContext.Provider>
  );
};

FairysLoginPage.useForm = useFairysLoginPageFormInstance;
FairysLoginPage.useFormInstance = useFairysLoginPageFormInstanceContext;
FairysLoginPage.FormItem = FairysLoginPageFormItem;
FairysLoginPage.FormItemInput = FairysLoginPageFormItemInput;
