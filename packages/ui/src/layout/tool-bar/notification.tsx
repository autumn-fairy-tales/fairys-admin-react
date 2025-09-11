import { FairysNotificationList } from 'components/notification';
import { FairysTabs } from 'components/tabs';
import { useNotificationData } from 'context/notification-data';

export const Notification = () => {
  const [state] = useNotificationData();
  const title = state.title;

  const isTabs = !!(state.tabItems || []).length;

  return (
    <div className="fairys_admin_tool_bar_notification fairys:w-[300px] fairys:h-[400px] fairys:flex fairys:flex-col fairys:box-border">
      <div className="fairys_admin_tool_bar_notification_title fairys:border-b fairys:border-gray-200 fairys:dark:border-gray-800">
        {isTabs ? (
          <div className="fairys:py-1 fairys:px-3">
            <FairysTabs
              activeKey="all"
              items={[
                {
                  title: '全部',
                  key: 'all',
                },
                {
                  title: '未读',
                  key: 'unread',
                },
                {
                  title: '已读',
                  key: 'read',
                },
              ]}
            />
          </div>
        ) : (
          <div className="fairys:flex fairys:justify-center fairys:items-center fairys:font-bold fairys:my-3">
            {title || '通知'}
          </div>
        )}
      </div>
      <div className="fairys_admin_tool_bar_notification_list fairys:flex-1 fairys:overflow-auto no-scrollbar">
        <FairysNotificationList
          items={Array.from({ length: 100 }).map((item, index) => ({
            id: index.toString(),
            type: 'ddd',
            title: '登录成功',
            date: '2023-01-01 12:00:00',
            icon: 'ant-design:unordered-list',
          }))}
        />
      </div>
      <div className="fairys_admin_tool_bar_notification_footer fairys:py-3 fairys:text-[12px] fairys:font-medium fairys:border-t fairys:border-gray-200 fairys:dark:border-gray-800">
        <div className="fairys:flex fairys:justify-center fairys:items-center">
          <div className="fairys:cursor-pointer">查看全部</div>
        </div>
      </div>
    </div>
  );
};
