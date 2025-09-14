import { FairysNotificationListBase } from 'components/notification';
import { FairysTabs } from 'components/tabs';
import { useNotificationData } from 'context/notification-data';
import { Fragment } from 'react/jsx-runtime';

export const Notification = () => {
  const [state, notificationDataInstance] = useNotificationData();
  const title = state.title;
  const isTabs = !!(state.tabItems || []).length;
  const activeKey = state.activeKey;
  const dataList = isTabs ? state[`dataList_${activeKey}`] : state.dataList;
  const isEmpty = !dataList?.length;
  console.log('dataList', dataList);

  return (
    <div className="fairys_admin_tool_bar_notification fairys:w-[300px] fairys:h-[400px] fairys:flex fairys:flex-col fairys:box-border">
      <div className="fairys_admin_tool_bar_notification_title fairys:border-b fairys:border-gray-200 fairys:dark:border-gray-800">
        {isTabs ? (
          <div className="fairys:py-1 fairys:px-3">
            <FairysTabs
              activeKey={activeKey}
              items={state.tabItems}
              onChange={notificationDataInstance._onUpdateActiveKey}
            />
          </div>
        ) : (
          <div className="fairys:flex fairys:justify-center fairys:items-center fairys:font-bold fairys:my-3">
            {title || '通知'}
          </div>
        )}
      </div>
      <div className="fairys_admin_tool_bar_notification_list fairys:flex-1 fairys:overflow-auto no-scrollbar fairys:box-border fairys:px-3">
        {isEmpty ? (
          <div className="fairys:py-20 fairys:text-center fairys:text-[14px] fairys:text-gray-400">暂无通知</div>
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
        <div className="fairys_admin_tool_bar_notification_footer fairys:py-3 fairys:text-[12px] fairys:font-medium fairys:border-t fairys:border-gray-200 fairys:dark:border-gray-800">
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
