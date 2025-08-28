import { LayoutMode, useSetting } from 'context/setting';
import { ModalBase } from 'components/modal-base';
import { ReactNode, useMemo } from 'react';
import { SelectBase } from 'components/select';
import clsx from 'clsx';
import { ButtonBase } from 'components/button';
interface LayoutItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: ReactNode;
  children: ReactNode;
  isDivider?: boolean;
}

const LayoutItem = (props: LayoutItemProps) => {
  const { label, children, className, isDivider, ...rest } = props;

  const title = useMemo(() => {
    if (isDivider) {
      return (
        <div
          className={clsx(
            'my-4 w-full flex items-center justify-center whitespace-nowrap text-[14px] font-medium gap-4',
            [
              'after:h-px after:w-full after:min-w-4 after:border-b after:border-gray-200 dark:after:border-gray-600  after:content-empty',
              'before:h-px before:w-full before:min-w-4 before:border-b before:border-gray-200 dark:before:border-gray-600  before:content-empty',
            ],
          )}
        >
          {label}
        </div>
      );
    }
    return <div className="font-medium text-[14px]">{label}</div>;
  }, [isDivider]);

  const itemClass = useMemo(() => {
    return clsx('w-full flex justify-between items-center min-h-[36px] pb-4', className, {
      'flex-col': isDivider,
    });
  }, [className, isDivider]);

  const itemChildClass = useMemo(() => {
    return clsx('', {
      'w-full flex items-center justify-center': isDivider,
      'w-auto': !isDivider,
    });
  }, [isDivider]);

  return (
    <div {...rest} className={itemClass}>
      {title}
      <div className={itemChildClass}>{children}</div>
    </div>
  );
};

export const SettingDrawer = () => {
  const [state, settingInstance] = useSetting();
  const theme = state.theme;
  const autoListenSystemTheme = state.autoListenSystemTheme;

  const isCheckTheme = useMemo(() => {
    const data = {
      dark: false,
      light: false,
      system: false,
    };
    if (autoListenSystemTheme) {
      data.system = true;
    } else {
      data[theme] = true;
    }
    return data;
  }, [theme, autoListenSystemTheme]);
  console.log('autoListenSystemTheme', isCheckTheme, autoListenSystemTheme);
  return (
    <ModalBase onClose={settingInstance.onToggleOpen} open={state.open} title="偏好设置" mode="drawer">
      <div className="flex flex-col gap-4 box-border">
        <LayoutItem isDivider label="主题风格">
          <div className="flex items-center justify-center gap-2">
            <ButtonBase
              className="w-[80px]"
              bordered
              isBg={isCheckTheme.dark}
              onClick={() => settingInstance.onToggleTheme('dark')}
            >
              <span className="icon-[ri--moon-line] text-[18px]"></span>
              <span className="text-[14px] pl-2">暗黑</span>
            </ButtonBase>
            <ButtonBase
              className="w-[80px]"
              bordered
              isBg={isCheckTheme.light}
              onClick={() => settingInstance.onToggleTheme('light')}
            >
              <span className="icon-[ri--sun-line] text-[18px]"></span>
              <span className="text-[14px] pl-2">亮色</span>
            </ButtonBase>
            <ButtonBase
              className="w-[80px]"
              bordered
              isBg={isCheckTheme.system}
              onClick={() => settingInstance.onToggleTheme('system')}
            >
              <span className="icon-[codicon--color-mode] text-[18px]"></span>
              <span className="text-[14px] pl-2">系统</span>
            </ButtonBase>
          </div>
        </LayoutItem>
        <LayoutItem label="布局模式">
          <SelectBase
            value={state.layoutMode}
            items={[
              { title: 'main_sub_left', value: 'main_sub_left' },
              { title: 'main_left', value: 'main_left' },
              { title: 'main_top_header', value: 'main_top_header' },
              { title: 'main_top_sub_left_header', value: 'main_top_sub_left_header' },
              { title: 'left', value: 'left' },
              { title: 'left_top_header', value: 'left_top_header' },
              { title: 'mobile', value: 'mobile', disabled: true },
            ]}
            onChange={(value: LayoutMode) => settingInstance.updated({ layoutMode: value })}
          />
        </LayoutItem>
      </div>
    </ModalBase>
  );
};
