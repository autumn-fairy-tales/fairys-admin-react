import { FairysMainPage } from '@fairys/admin-tools-react';
import { NavLink } from 'react-router';
import { FairysLoginPage, FairysMainPageBody } from '@fairys/admin-tools-react';
import { FairysNotificationListBase } from '@fairys/admin-tools-react/lib/components/notification';

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
  const formInstance = FairysLoginPage.useForm();
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
    <FairysMainPage>
      DOC
      <FairysMainPageBody>
        <FairysNotificationListBase
          items={[
            {
              id: '1',
              type: 'ddd',
              title: '登录成功',
              date: '2023-01-01 12:00:00',
              icon: 'ant-design:unordered-list',
            },
            {
              id: '2',
              type: 'ddd',
              title: '登录成功',
              date: '2023-01-01 12:00:00',
              icon: 'ant-design:unordered-list',
            },
          ]}
        />

        <div className="w-[500px] h-[500px]">
          <FairysLoginPage
            className="bg-red-50 dark:bg-red-950"
            mainClassName="bg-white dark:bg-gray-900 px-[50px] py-[50px]"
            title="登录"
            form={formInstance}
            rules={rules}
          >
            <FairysLoginPage.FormItem name="username" label="用户名" required>
              <FairysLoginPage.FormItemInput disabled placeholder="请输入用户名" />
            </FairysLoginPage.FormItem>
            <FairysLoginPage.FormItem name="password" label="密码" required>
              <FairysLoginPage.FormItemInput placeholder="请输入密码" type="password" />
            </FairysLoginPage.FormItem>
            <button
              onClick={onLogin}
              className="bg-(--fairys-theme-color)/90 rounded-sm text-white py-[9px] mt-[20px] hover:bg-(--fairys-theme-color) cursor-pointer transition-all duration-300"
              type="button"
            >
              登录
            </button>
          </FairysLoginPage>
        </div>
        <NavLink to="/">首页</NavLink>
        <NavLink to="/list">列表</NavLink>
        <NavLink to="/detail">详情</NavLink>
      </FairysMainPageBody>
    </FairysMainPage>
  );
};
export const Component = MainIndex;
export default Component;
