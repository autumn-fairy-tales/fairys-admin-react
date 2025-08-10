export const ToolBar = () => {
  return (
    <div className="fairys_admin_tool_bar overflow-hidden w-full flex flex-row px-[4px]">
      <div className="fairys_admin_tool_bar_left">面包屑</div>
      <div className="fairys_admin_tool_bar_body overflow-auto flex flex-row flex-1"></div>
      <div className="fairys_admin_tool_bar_right">右侧</div>
    </div>
  );
};
