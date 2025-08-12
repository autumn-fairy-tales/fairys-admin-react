import { Breadcrumb } from '../../breadcrumb';

export const ToolBar = () => {
  return (
    <div className="fairys_admin_tool_bar overflow-hidden w-full flex flex-row px-[4px] border-b border-gray-200 dark:border-gray-800">
      <div className="fairys_admin_tool_bar_left">
        <Breadcrumb />
      </div>
      <div className="fairys_admin_tool_bar_body overflow-auto flex flex-row flex-1"></div>
      <div className="fairys_admin_tool_bar_right">右侧</div>
    </div>
  );
};
