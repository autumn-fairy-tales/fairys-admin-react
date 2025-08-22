import { useAccountData } from 'context/account-data';
import { settingInstance } from 'context/setting';
import { forwardRef, Fragment, useMemo } from 'react';
import clsx from 'clsx';
import { ContextMenu } from 'components/context-menu';

export interface AvatarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  mode?: 'sider' | 'header';
  nameMode?: 'node' | 'show';
}

const baseClassName =
  'flex transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md cursor-pointer';

export const Avatar = forwardRef((props: AvatarProps, ref: React.Ref<HTMLDivElement>) => {
  const { mode, nameMode, className, ...rest } = props;
  const [accountData] = useAccountData();
  const userName = accountData.userName || 'fairys';

  const avatarRender = useMemo(() => {
    const avatar = accountData.userAvatar || settingInstance.state.logo;
    if (avatar) {
      return <img width={32} height={32} src={avatar} alt={userName} />;
    }
    return userName;
  }, [accountData.userAvatar]);

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
        title: '主页',
      },
      {
        title: '偏好设置',
      },
      {
        isDivider: true,
      },
      {
        title: '退出登录',
      },
    ];
  }, []);

  const onMenuItemClick = () => {};

  const placement = useMemo(() => {
    if (mode === 'header') {
      return 'bottom';
    }
    return 'top';
  }, [mode]);

  return (
    <ContextMenu
      items={items}
      onMenuItemClick={onMenuItemClick}
      ref={ref}
      placement={placement}
      eventName="onClick"
      popoverProps={{
        className: 'min-w-[120px]',
      }}
    >
      <div {...rest} ref={ref} title={userName} className={classNameBase}>
        <span className="flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
          {avatarRender}
        </span>
        {nameMode === 'show' ? (
          <span className="text-[14px] font-medium text-gray-900 dark:text-gray-400">{userName}</span>
        ) : (
          <Fragment />
        )}
      </div>
    </ContextMenu>
  );
});
