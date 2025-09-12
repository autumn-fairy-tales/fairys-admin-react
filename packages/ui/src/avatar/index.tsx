import { useAccountData } from 'context/account-data';
import { authDataInstance } from 'context/auth-data';
import { settingInstance } from 'context/setting';
import { forwardRef, Fragment, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { FairysPopoverMenu, FairysPopoverMenuItemType } from 'components/popover-menu';
import { appPluginDataInstance } from 'context/app-plugins-data';

export interface AvatarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  mode?: 'sider' | 'header';
  nameMode?: 'node' | 'show';
}

const baseClassName =
  'fairys:flex fairys:transition-all fairys:duration-300 fairys:hover:bg-gray-200 fairys:dark:hover:bg-gray-700 fairys:rounded-md fairys:cursor-pointer';

export const Avatar = forwardRef((props: AvatarProps, ref: React.Ref<HTMLDivElement>) => {
  const { mode, nameMode, className, ...rest } = props;
  const [accountState] = useAccountData();
  const userName = accountState.userName || 'fairys';
  const userEmail = accountState.userEmail || '未绑定邮箱';
  const navigate = useNavigate();
  const plugin = appPluginDataInstance.appPlugins?.['avatar-menus'];

  const avatarRender = useMemo(() => {
    const avatar = accountState.userAvatar || settingInstance.state.logo;
    if (avatar) {
      return (
        <img
          className="fairys:rounded-full fairys:w-[32px] fairys:h-[32px] fairys:object-cover"
          src={avatar}
          alt={userName}
        />
      );
    }
    return userName;
  }, [accountState.userAvatar, userName]);

  const classNameBase = useMemo(() => {
    return clsx(baseClassName, className, {
      'fairys:p-[2px] fairys:items-center fairys:justify-center fairys:mr-2': mode === 'header',
      'fairys:p-[4px] fairys:mx-[8px] fairys:my-[8px] fairys:bg-gray-200 fairys:dark:bg-gray-700': mode === 'sider',
      'fairys:px-[14px] ': mode === 'sider' && nameMode === 'show',
      'fairys:items-center fairys:gap-4': nameMode === 'show',
      'fairys:items-center fairys:justify-center': nameMode === 'node',
    });
  }, [mode, className, nameMode]);

  const items = useMemo(() => {
    const _items = [
      {
        children: (
          <div className="fairys:p-2 fairys:flex fairys:flex-col fairys:gap-y-4">
            <span className="fairys:text-[12px] fairys:text-gray-300 fairys:dark:text-gray-500">当前登录账号</span>
            <div className="fairys:flex fairys:min-h-[38px] fairys:gap-x-2">
              {avatarRender}
              <div className="fairys:flex fairys:flex-col fairys:gap-y-1">
                <div className="fairys:text-[14px] fairys:font-medium fairys:text-gray-900 fairys:dark:text-gray-400">
                  {userName}
                </div>
                <div className="fairys:text-[12px] fairys:text-gray-400 fairys:dark:text-gray-500">[{userEmail}]</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        isDivider: true,
      },
      {
        title: '主页',
        icon: 'ant-design:home-outlined',
      },
      {
        title: '偏好设置',
        icon: 'ant-design:setting-outlined',
      },
      ...(plugin?.menus || []),
      {
        isDivider: true,
      },
      {
        title: '退出登录',
        icon: 'ant-design:logout-outlined',
      },
    ].filter(Boolean);
    if (plugin?.override) {
      return plugin.override(_items);
    }
    return _items;
  }, [userEmail, avatarRender, userName, plugin]);

  const onMenuItemClick = (item: FairysPopoverMenuItemType) => {
    if (item.title === '主页') {
      navigate('/');
    } else if (item.title === '偏好设置') {
      settingInstance.onToggleOpen();
    } else if (item.title === '退出登录') {
      authDataInstance._onLogout?.();
    }
  };

  return (
    <FairysPopoverMenu items={items} onClickItem={onMenuItemClick} ref={ref} motionClassName="fairys:min-w-[180px]">
      <div {...rest} title={userName} className={classNameBase}>
        <span className="fairys:flex fairys:items-center fairys:justify-center fairys:rounded-full fairys:bg-gray-200 fairys:dark:bg-gray-700">
          {avatarRender}
        </span>
        {nameMode === 'show' ? (
          <span className="fairys:text-[14px] fairys:font-medium fairys:text-gray-900 fairys:dark:text-gray-400">
            {userName}
          </span>
        ) : (
          <Fragment />
        )}
      </div>
    </FairysPopoverMenu>
  );
});
