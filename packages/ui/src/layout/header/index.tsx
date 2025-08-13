import { MainMenu } from '../../main-menu';

export const LayoutHeader = () => {
  return (
    <div className="fairys_admin_layout_header h-[48px] border-b border-gray-200 dark:border-gray-800">
      <MainMenu layoutMode="horizontal" />
    </div>
  );
};
