import { Fragment, useState } from 'react';
import { onLogin } from './utils';
import { FairysEnterLoading } from '@fairys/admin-tools-react';
import { FairysLoginPage } from '@fairys/admin-tools-react';

interface LoginProps {
  onLogin: () => void;
}

const rules = {
  username: (value: string) => {
    if (!value) {
      return '用户名不能为空';
    }
    return '';
  },
  password: (value: string) => {
    if (!value) {
      return '密码不能为空';
    }
    return '';
  },
};

export const Login = (props: LoginProps) => {
  const [loading, setLoading] = useState(false);
  const formInstance = FairysLoginPage.useForm();
  const onLoginClick = () => {
    formInstance
      .validate()
      .then((values) => {
        setLoading(true);
        onLogin()
          .then(() => {
            console.log('登录成功');
            props.onLogin();
          })
          .finally(() => {
            setLoading(false);
          });
        console.log(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <FairysLoginPage
        mainClassName="bg-white dark:bg-gray-900 px-[50px] py-[50px]"
        title="登录"
        form={formInstance}
        rules={rules}
      >
        <FairysLoginPage.FormItem name="username" label="用户名" required>
          <FairysLoginPage.FormItemInput placeholder="请输入用户名" />
        </FairysLoginPage.FormItem>
        <FairysLoginPage.FormItem name="password" label="密码" required>
          <FairysLoginPage.FormItemInput placeholder="请输入密码" type="password" />
        </FairysLoginPage.FormItem>
        <button
          onClick={onLoginClick}
          className="bg-(--fairys-theme-color)/90 rounded-sm text-white py-[9px] mt-[20px] hover:bg-(--fairys-theme-color) cursor-pointer transition-all duration-300"
          type="button"
        >
          登录
        </button>
      </FairysLoginPage>
      <FairysEnterLoading loading={loading} tips="登录中" />
    </Fragment>
  );
};
