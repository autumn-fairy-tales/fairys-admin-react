import { ModalBase } from 'components/modal-base';
import { ButtonBase } from 'components/button';
import { Fragment } from 'react/jsx-runtime';
import { useState } from 'react';

/**菜单搜索*/
export const MenuSearch = () => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <ButtonBase className="fairys_admin_tool_bar_menu_search" onClick={() => setOpen(true)}>
        <span className="icon-[ant-design--file-search-outlined] size-[16px]" />
      </ButtonBase>
      <ModalBase mode="drawer" open={open} onClose={() => setOpen(false)}>
        <div>2112</div>
      </ModalBase>
    </Fragment>
  );
};
