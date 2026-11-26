import { useAccountDataInstance } from 'context/account-data';
import { authDataInstance } from 'context/auth-data';
import { settingDataInstance } from 'context/setting';
import { routerDataInstance } from 'context/router-data';
import { forwardRef, Fragment, useMemo } from 'react';
import clsx from 'clsx';
import { FairysPopoverMenu, FairysPopoverMenuItemType } from 'components/popover-menu';
import { useAppPluginDataInstance } from 'context/app-plugins-data';

export interface AvatarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /**
   * @description 头像放置位置
   * @default "header"
   */
  mode?: 'sider' | 'header';
  /**
   * @description 名称显示
   * @default "node"
   */
  nameMode?: 'node' | 'show';
}

const baseClassName =
  'fairys-admin-avatar fairys:flex fairys:transition-all fairys:duration-300 fairys:rounded-md fairys:cursor-pointer';

export const Avatar = forwardRef((props: AvatarProps, ref: React.Ref<HTMLDivElement>) => {
  const { mode = 'header', nameMode, className, ...rest } = props;
  const [accountState] = useAccountDataInstance();
  const userName = accountState.userName || 'fairys';
  const userEmail = accountState.userEmail || '未绑定邮箱';
  const [snapshot] = useAppPluginDataInstance();
  const plugin = snapshot?.['avatar-menus'];

  const avatarRender = useMemo(() => {
    const avatar = accountState.userAvatar || settingDataInstance.state.logo;
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
      'fairys:p-[4px] fairys:mx-[8px] fairys:my-[8px] sider': mode === 'sider',
      'fairys:px-[14px] ': mode === 'sider' && nameMode === 'show',
      'fairys:items-center fairys:gap-4': nameMode === 'show',
      'fairys:items-center fairys:justify-center': nameMode === 'node',
    });
  }, [mode, className, nameMode]);

  const items = useMemo(() => {
    const _items = [
      {
        children: (
          <div className="fairys-admin-avatar-info fairys:p-2 fairys:flex fairys:flex-col fairys:gap-y-4">
            <span className="fairys-admin-avatar-info_title">当前登录账号</span>
            <div className="fairys:flex fairys:min-h-[38px] fairys:gap-x-2">
              {avatarRender}
              <div className="fairys:flex fairys:flex-col fairys:gap-y-1">
                <div className="fairys-admin-avatar-info_name fairys:font-medium">{userName}</div>
                <div className="fairys-admin-avatar-info_email">[{userEmail}]</div>
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
        value: 'fairys:avatar:home',
        icon: 'fairys:icon-[ant-design--home-outlined]',
        iconProps: { isClassName: true },
      },
      {
        title: '偏好设置',
        value: 'fairys:avatar:setting',
        icon: 'fairys:icon-[ant-design--setting-outlined]',
        iconProps: { isClassName: true },
      },
      ...(plugin?.menus || []),
      {
        isDivider: true,
      },
      {
        title: '退出登录',
        value: 'fairys:avatar:logout',
        icon: 'fairys:icon-[ant-design--logout-outlined]',
        iconProps: { isClassName: true },
      },
    ].filter(Boolean);
    if (plugin?.override) {
      return plugin.override(_items);
    }
    return _items;
  }, [userEmail, avatarRender, userName, plugin]);

  const onMenuItemClick = (item: FairysPopoverMenuItemType) => {
    if (item.value === 'fairys:avatar:home') {
      routerDataInstance.navigate('/');
    } else if (item.value === 'fairys:avatar:setting') {
      settingDataInstance.onToggleOpen();
    } else if (item.value === 'fairys:avatar:logout') {
      authDataInstance._onLogout?.();
    }
  };

  return (
    <FairysPopoverMenu
      items={items}
      onClickItem={onMenuItemClick}
      ref={ref}
      motionClassName="fairys-admin-avatar-popover-menu fairys:min-w-[180px]"
    >
      <div {...rest} title={userName} className={classNameBase}>
        <span className="fairys-admin-avatar-image fairys:flex fairys:items-center fairys:justify-center fairys:rounded-full">
          {avatarRender}
        </span>
        {nameMode === 'show' ? (
          <span className="fairys-admin-avatar-name  fairys:font-medium ">{userName}</span>
        ) : (
          <Fragment />
        )}
      </div>
    </FairysPopoverMenu>
  );
});
