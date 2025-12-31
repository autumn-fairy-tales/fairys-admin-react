import { FairysMainPage, FairysMenu } from '@fairys/admin-tools-react';
import { NavLink } from 'react-router';
import {
  FairysLoginPage,
  FairysMainPageBody,
  FairysMainPageFooter,
  FairysMainPageSearch,
} from '@fairys/admin-tools-react';
import { FairysNotificationListBase } from '@fairys/admin-tools-react/lib/components/notification';
import { useState } from 'react';

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
  const [selectedKey, updateSelectedKey] = useState('/');
  const [openKeys, updateOpenKeys] = useState<string[]>([]);

  return (
    <FairysMainPage>
      <FairysMainPageSearch>
        <input type="text" placeholder="搜索" />
      </FairysMainPageSearch>
      <FairysMainPageBody>
        <button onClick={() => updateSelectedKey('/about/1')}>切换选中</button>
        <button onClick={() => updateSelectedKey('/')}>切换选中</button>
        <div>
          <FairysMenu
            // size='small'
            selectedKey={selectedKey}
            // openKeys={openKeys}
            // mode="horizontal"
            // collapsedMode="vertical"
            collapsed
            // firstGroupMode="hover"
            firstGroupMode="click"
            // firstGroupMode='hover'
            onClickItem={(item, event, instance) => {
              updateSelectedKey(item.path);
            }}
            onClickSubItem={(item) => {
              updateOpenKeys((prev) => {
                const finx = prev.includes(item.path);
                if (finx) {
                  return prev.filter((i) => i !== item.path);
                }
                return [...prev, item.path];
              });
            }}
            items={[
              {
                title: '首页',
                icon: 'ant-design:home',
                path: '/',
              },
              {
                title: '列表',
                icon: 'ant-design:unordered-list',
                path: '/list',
                disabled: true,
              },
              {
                type: 'divider',
              },
              {
                title: '详情',
                icon: 'ant-design:profile',
                path: '/detail',
                items: [
                  {
                    title: '详情1',
                    icon: 'ant-design:profile',
                    path: '/detail/1',
                  },
                  {
                    title: '详情2',
                    icon: 'ant-design:profile',
                    path: '/detail/2',
                  },
                  {
                    type: 'group',
                    path: '/group/3',
                    title: '分组',
                    items: [
                      {
                        title: '分组1',
                        icon: 'ant-design:profile',
                        path: '/group/3/1',
                      },

                      {
                        title: '分组2',
                        icon: 'ant-design:profile',
                        path: '/group/3/2',
                      },
                      {
                        type: 'group',
                        path: '/group',
                        title: '分组',
                        items: [
                          {
                            title: '分组1',
                            icon: 'ant-design:profile',
                            path: '/group/1',
                          },
                          {
                            title: '分组2',
                            icon: 'ant-design:profile',
                            path: '/group/2',
                          },
                          {
                            title: '管理',
                            icon: 'ant-design:profile',
                            path: '/about',
                            items: [
                              {
                                title: '关于1',
                                icon: 'ant-design:profile',
                                path: '/about/1',
                              },
                              {
                                title: '关于2',
                                icon: 'ant-design:profile',
                                path: '/about/2',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'group',
                path: '/group/4',
                title: '分组',
                icon: 'ant-design:home',
                items: [
                  {
                    title: '分组1',
                    icon: 'ant-design:profile',
                    path: '/group/4/1',
                  },
                  {
                    title: '分组2',
                    icon: 'ant-design:profile',
                    path: '/group/4/2',
                  },
                ],
              },
            ]}
          />
        </div>

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
              className="fairys_button_base bg-(--fairys-theme-color)/90 rounded-sm text-white py-[9px] mt-[20px] hover:bg-(--fairys-theme-color) cursor-pointer transition-all duration-300"
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
      <FairysMainPageFooter>
        <div className="flex justify-end items-center">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">共 100 条</span>
          </div>
        </div>
      </FairysMainPageFooter>
    </FairysMainPage>
  );
};
export const Component = MainIndex;
export default Component;
