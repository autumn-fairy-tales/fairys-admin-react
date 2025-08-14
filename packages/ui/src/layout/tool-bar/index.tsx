import { Fragment } from 'react/jsx-runtime';
import { Breadcrumb } from '../../breadcrumb';
import { useSetting } from '../../context/setting';

const MenuDarkLight = () => {
  const [state, settingInstance] = useSetting();
  const darkMenu = state.darkMenu;
  const layoutMode = state.layoutMode;

  const onClick = () => {
    settingInstance.updated({
      darkMenu: !darkMenu,
    });
  };

  const onClick2 = () => {
    settingInstance.updated({ layoutMode: layoutMode === 'main_left' ? 'main_sub_left' : 'main_left' });
  };

  return (
    <Fragment>
      <button onClick={onClick2}>菜单格式：{state.layoutMode}</button>
      <button onClick={onClick}>{darkMenu ? '切换为亮色' : '切换为暗色'}</button>
    </Fragment>
  );
};

export const ToolBar = () => {
  return (
    <div className="fairys_admin_tool_bar overflow-hidden w-full flex flex-row items-center px-[4px] border-b border-gray-200 dark:border-gray-800">
      <div className="fairys_admin_tool_bar_left">
        <Breadcrumb />
      </div>
      <div className="fairys_admin_tool_bar_body overflow-auto flex flex-row flex-1"></div>
      <div className="fairys_admin_tool_bar_right">
        <MenuDarkLight />
      </div>
    </div>
  );
};
