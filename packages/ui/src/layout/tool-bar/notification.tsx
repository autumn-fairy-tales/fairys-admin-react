import { FairysNotificationListBase } from 'components/notification';
import { FairysTabs } from 'components/tabs';
import { useNotificationDatainstance } from 'context/notification-data';
import { Fragment } from 'react/jsx-runtime';
import { FairysButtonBase } from 'components/button';
import { FairysPopoverBase } from 'components/popover-base';
import { UtilsColor } from 'utils/utils.color';

export const Notification = () => {
  const [state, notificationDataInstance] = useNotificationDatainstance();
  const title = state.title;
  const isTabs = !!(state.tabItems || []).length;
  const activeKey = state.activeKey;
  const dataList = isTabs ? state[`dataList_${activeKey}`] : state.dataList;
  const isEmpty = !dataList?.length;

  return (
    <div className="fairys_admin_tool_bar_notification fairys:w-[300px] fairys:h-[400px] fairys:flex fairys:flex-col ">
      <div
        className={`fairys_admin_tool_bar_notification_title fairys:border-b ${UtilsColor.componentBorderClassNameBase}`}
      >
        {isTabs ? (
          <div className="fairys:py-1 fairys:px-3">
            <FairysTabs
              activeKey={activeKey}
              items={state.tabItems}
              onChange={notificationDataInstance._onUpdateActiveKey}
            />
          </div>
        ) : (
          <div className="fairys:flex fairys:justify-start fairys:items-center fairys:font-medium fairys:my-3 fairys:px-3">
            {title || '通知'}
          </div>
        )}
      </div>
      <div className="fairys_admin_tool_bar_notification_list fairys:flex-1 fairys:overflow-auto no-scrollbar  fairys:px-3 fairys:pt-3">
        {isEmpty ? (
          <div className="fairys:py-20 fairys:text-center  fairys:text-gray-400">暂无通知</div>
        ) : (
          <FairysNotificationListBase
            onClickItem={notificationDataInstance._onClickItem}
            isShowIcon={state.isShowIcon}
            items={dataList}
          />
        )}
      </div>
      {isEmpty ? (
        <Fragment />
      ) : (
        <div
          className={`fairys_admin_tool_bar_notification_footer fairys:py-3  fairys:font-medium fairys:border-t ${UtilsColor.componentBorderClassNameBase}`}
        >
          <div className="fairys:flex fairys:justify-center fairys:items-center">
            <div className="fairys:cursor-pointer" onClick={notificationDataInstance._onClickMore}>
              查看全部
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const NotificationBtn = () => {
  const [state] = useNotificationDatainstance();
  const count = state.count;
  return (
    <FairysPopoverBase placement="bottom" content={<Notification />}>
      <FairysButtonBase className="fairys_admin_tool_bar_notification fairys:relative">
        <span className="fairys:icon-[ant-design--bell-outlined] fairys:size-[18px]" />
        {count > 0 ? (
          <span className="fairys:absolute fairys:px-[6px] fairys:top-[0px] fairys:left-[40%]  fairys:flex fairys:items-center fairys:justify-center fairys:rounded-[10px] fairys:bg-red-500 fairys:text-white">
            {count > 99 ? '99+' : count}
          </span>
        ) : (
          <Fragment />
        )}
      </FairysButtonBase>
    </FairysPopoverBase>
  );
};
