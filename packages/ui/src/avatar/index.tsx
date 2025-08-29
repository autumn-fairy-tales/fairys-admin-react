import { useAccountData } from 'context/account-data';
import { authDataInstance } from 'context/auth-data';
import { settingInstance } from 'context/setting';
import { forwardRef, Fragment, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { PopoverMenu, PopoverMenuItem } from 'components/popover-menu';

export interface AvatarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  mode?: 'sider' | 'header';
  nameMode?: 'node' | 'show';
}

const baseClassName =
  'flex transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md cursor-pointer';

export const Avatar = forwardRef((props: AvatarProps, ref: React.Ref<HTMLDivElement>) => {
  const { mode, nameMode, className, ...rest } = props;
  const [accountState] = useAccountData();
  const userName = accountState.userName || 'fairys';
  const userEmail = accountState.userEmail || '未绑定邮箱';
  const navigate = useNavigate();

  const avatarRender = useMemo(() => {
    const avatar = accountState.userAvatar || settingInstance.state.logo;
    if (avatar) {
      return <img className="rounded-full w-[32px] h-[32px] object-cover" src={avatar} alt={userName} />;
    }
    return userName;
  }, [accountState.userAvatar, userName]);

  const classNameBase = useMemo(() => {
    return clsx(baseClassName, className, {
      'p-[2px] items-center justify-center mr-2': mode === 'header',
      'p-[4px] mx-[8px] my-[8px] bg-gray-200 dark:bg-gray-700': mode === 'sider',
      'px-[14px] ': mode === 'sider' && nameMode === 'show',
      'items-center gap-4': nameMode === 'show',
      'items-center justify-center': nameMode === 'node',
    });
  }, [mode, className, nameMode]);

  const items = useMemo(() => {
    return [
      {
        children: (
          <div className="p-2 flex flex-col gap-y-4">
            <span className="text-[12px] text-gray-300 dark:text-gray-500">当前登录账号</span>
            <div className="flex min-h-[38px] gap-x-2">
              {avatarRender}
              <div className="flex flex-col gap-y-1">
                <div className="text-[14px] font-medium text-gray-900 dark:text-gray-400">{userName}</div>
                <div className="text-[12px] text-gray-400 dark:text-gray-500">[{userEmail}]</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        isDivider: true,
      },
      {
        // <HomeOutlined />
        title: '主页',
        icon: 'ant-design:home-outlined',
      },
      {
        // <SettingOutlined />
        title: '偏好设置',
        icon: 'ant-design:setting-outlined',
      },
      {
        isDivider: true,
      },
      {
        // <LogoutOutlined />
        title: '退出登录',
        icon: 'ant-design:logout-outlined',
      },
    ];
  }, [userEmail, avatarRender, userName]);

  const onMenuItemClick = (item: PopoverMenuItem) => {
    if (item.title === '主页') {
      navigate('/');
    } else if (item.title === '偏好设置') {
      settingInstance.onToggleOpen();
    } else if (item.title === '退出登录') {
      authDataInstance._onLogout?.();
    }
  };

  return (
    <PopoverMenu items={items} onClickItem={onMenuItemClick} ref={ref} motionClassName="min-w-[180px]">
      <div {...rest} title={userName} className={classNameBase}>
        <span className="flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
          {avatarRender}
        </span>
        {nameMode === 'show' ? (
          <span className="text-[14px] font-medium text-gray-900 dark:text-gray-400">{userName}</span>
        ) : (
          <Fragment />
        )}
      </div>
    </PopoverMenu>
  );
});
