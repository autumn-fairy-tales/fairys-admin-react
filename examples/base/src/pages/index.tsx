import { MainPage } from '@fairys/admin-tools-react';
import { NavLink } from 'react-router';
import { LoginPage } from '@fairys/admin-tools-react';

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

const MainIndex = () => {
  const formInstance = LoginPage.useForm();
  const onLogin = () => {
    formInstance
      .validate()
      .then((values) => {
        console.log(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MainPage>
      <div className="w-[500px] h-[500px]">
        <LoginPage
          className="bg-red-50 dark:bg-red-950"
          mainClassName="bg-white dark:bg-gray-900 px-[50px] py-[50px]"
          title="登录"
          form={formInstance}
          rules={rules}
        >
          <LoginPage.FormItem name="username" label="用户名" required>
            <LoginPage.FormItemInput placeholder="请输入用户名" />
          </LoginPage.FormItem>
          <LoginPage.FormItem name="password" label="密码" required>
            <LoginPage.FormItemInput placeholder="请输入密码" type="password" />
          </LoginPage.FormItem>
          <button
            onClick={onLogin}
            className="bg-(--theme-color)/90 rounded-sm text-white py-[9px] mt-[20px] hover:bg-(--theme-color) cursor-pointer transition-all duration-300"
            type="button"
          >
            登录
          </button>
        </LoginPage>
      </div>
      <NavLink to="/">首页</NavLink>
      <NavLink to="/list">列表</NavLink>
      <NavLink to="/detail">详情</NavLink>
    </MainPage>
  );
};

export default MainIndex;
