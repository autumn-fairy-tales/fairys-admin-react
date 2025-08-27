import { LayoutMode, useSetting } from 'context/setting';
import { ModalBase } from 'components/modal-base';
import { ReactNode } from 'react';
import { SelectBase } from 'components/select';

interface LayoutItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: ReactNode;
  children: ReactNode;
}

const LayoutItem = (props: LayoutItemProps) => {
  const { label, children, className, ...rest } = props;
  return (
    <div {...rest} className={`w-full flex justify-between items-center min-h-[36px] ${className}`}>
      <div className="font-medium text-[14px]">{label}</div>
      <div>{children}</div>
    </div>
  );
};

export const SettingDrawer = () => {
  const [state, settingInstance] = useSetting();
  return (
    <ModalBase onClose={settingInstance.onToggleOpen} open={state.open} title="偏好设置" mode="drawer">
      <div>
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
              {
                title: '1',
                value: '2',
                items: [
                  { title: 'mobile_top_header', value: 'mobile_top_header' },
                  { title: 'mobile_top_sub_left_header', value: 'mobile_top_sub_left_header' },
                  { title: 'mobile_top_sub_left_header', value: 'mobile_top_sub_left_header' },
                ],
              },
            ]}
            onChange={(value: LayoutMode) => settingInstance.updated({ layoutMode: value })}
          />
        </LayoutItem>
      </div>
    </ModalBase>
  );
};
