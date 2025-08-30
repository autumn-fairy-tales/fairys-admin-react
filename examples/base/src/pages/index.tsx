import { MainPage } from '@fairys/admin-tools-react';
import { NavLink } from 'react-router';
import { LoginPage } from '@fairys/admin-tools-react/lib/components/login';

const MainIndex = () => {
  return (
    <MainPage>
      <div className="w-[500px] h-[500px]">
        <LoginPage title="登录">
          <LoginPage.FormItem name="username" label="用户名" required>
            <LoginPage.FormItemInput placeholder="请输入用户名" />
          </LoginPage.FormItem>
          <LoginPage.FormItem name="password" label="密码" required>
            <LoginPage.FormItemInput placeholder="请输入密码" type="password" />
          </LoginPage.FormItem>
        </LoginPage>
      </div>
      <NavLink to="/">首页</NavLink>
      <NavLink to="/list">列表</NavLink>
      <NavLink to="/detail">详情</NavLink>
    </MainPage>
  );
};

export default MainIndex;
