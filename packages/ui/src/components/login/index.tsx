import clsx from 'clsx';
import { useMemo } from 'react';
import { LoginPageFormInstanceContext, useLoginPageFormInstance, LoginPageFormInstance } from './instance';
import { LoginPageFormItem, LoginPageFormItemInput } from './form.item';

interface LoginPageProps
  extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  form?: LoginPageFormInstance;
}

export const LoginPage = (props: LoginPageProps) => {
  const { className, title, form, children, ...rest } = props;
  const loginPageClassName = useMemo(() => {
    return clsx('fairys_login_page w-full h-full flex items-center justify-center overflow-auto', className);
  }, [className]);

  const formInstance = useLoginPageFormInstance(form);
  return (
    <LoginPageFormInstanceContext.Provider value={formInstance}>
      <div className={loginPageClassName} {...rest}>
        <div className="fairys_login_page_content p-[14px] flex flex-col w-[400px] h-[400px] rounded-sm gap-y-[20px]">
          <div className="fairys_login_page_content_title flex items-center justify-center text-[24px] font-bold">
            {title}
          </div>
          <div className="fairys_login_page_content_form flex-1 flex flex-col gap-[14px]">{children}</div>
        </div>
      </div>
    </LoginPageFormInstanceContext.Provider>
  );
};

LoginPage.FormItem = LoginPageFormItem;
LoginPage.FormItemInput = LoginPageFormItemInput;
