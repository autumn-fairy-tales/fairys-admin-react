import { createRef, forwardRef, useRef, useImperativeHandle, useState, Fragment } from 'react';
import { Popover, PopoverProps } from './../popover';
import { PopoverMenu, PopoverMenuItem } from '../popover-menu';
import { useAnimationStatus } from '../utils';
export interface ContextMenuItem extends PopoverMenuItem {}

class ContextMenuInstance {
  dom = createRef<HTMLDivElement>();
  items: any[] = [];

  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  /**点击*/
  onMenuItemClick: (item: ContextMenuItem, e: React.MouseEvent) => void;
  /**点击事件*/
  onClick = (item: ContextMenuItem, e: React.MouseEvent) => {
    e.preventDefault();
    if (item.disabled) {
      return;
    }
    this.setOpen?.(false);
    this.onMenuItemClick?.(item, e);
  };
}
const useContextMenuInstance = () => useRef(new ContextMenuInstance()).current;

interface ContextMenuProps
  extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'> {
  children?: React.ReactNode;
  content?: React.ReactNode;
  popoverProps?: PopoverProps;
  onMenuItemClick?: (item: ContextMenuItem, e: React.MouseEvent) => void;
  items?: ContextMenuItem[];
}

export const ContextMenu = forwardRef((props: ContextMenuProps, ref: React.Ref<HTMLDivElement>) => {
  const { children, content, popoverProps, onMenuItemClick, items, ...rest } = props;
  const [open, setOpen] = useState(false);
  const contextMenuInstance = useContextMenuInstance();
  contextMenuInstance.setOpen = setOpen;
  contextMenuInstance.onMenuItemClick = onMenuItemClick;
  contextMenuInstance.items = items;
  useImperativeHandle(ref, () => contextMenuInstance.dom.current);
  const { show, onAnimationComplete } = useAnimationStatus(open);

  return (
    <Popover
      {...popoverProps}
      className="border border-gray-100 dark:border-gray-700"
      open={open}
      onOpenChange={setOpen}
      placement="right-start"
      content={show ? <PopoverMenu items={items} onClick={contextMenuInstance.onClick} isHideClose /> : <Fragment />}
      domRef={contextMenuInstance.dom}
      onAnimationComplete={onAnimationComplete}
    >
      <div
        {...rest}
        onContextMenu={(event) => {
          event.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </div>
    </Popover>
  );
});
