import { createRef, forwardRef, useRef, useImperativeHandle, useState, Fragment, useMemo } from 'react';
import { Popover, PopoverProps } from './../popover';
import { PopoverMenu, PopoverMenuItem, PopoverMenuProps } from '../popover-menu';
import { useAnimationStatus } from '../utils';
import { PopoverEnumVariantType } from 'components/popover/utils';
export interface ContextMenuItem extends PopoverMenuItem {}

interface ContextMenuProps
  extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'> {
  children?: React.ReactNode;
  content?: React.ReactNode;
  popoverProps?: PopoverProps;
  onMenuItemClick?: (item: ContextMenuItem, e: React.MouseEvent) => void;
  items?: ContextMenuItem[];
  eventName?: 'onContextMenu' | 'onClick';
  placement?: PopoverProps['placement'];
  modeType?: PopoverEnumVariantType;
  value?: PopoverMenuProps['value'];
  /**仅传递open状态*/
  onOpenChange?: (open: boolean) => void;
}
class ContextMenuInstance {
  dom = createRef<HTMLDivElement>();
  items: any[] = [];
  /**仅传递open状态*/
  onOpenChange?: (open: boolean) => void;
  open: boolean;
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
    this.onOpenChange?.(false);
  };

  onToggle = (open: boolean) => {
    this.onOpenChange?.(open);
    this.setOpen?.(open);
  };
}
const useContextMenuInstance = () => useRef(new ContextMenuInstance()).current;

export const ContextMenu = forwardRef((props: ContextMenuProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    children,
    content,
    popoverProps = {},
    onMenuItemClick,
    items,
    eventName = 'onContextMenu',
    placement = 'right-start',
    modeType,
    value,
    onOpenChange,
    ...rest
  } = props;
  const [open, setOpen] = useState(false);
  const contextMenuInstance = useContextMenuInstance();
  contextMenuInstance.open = open;
  contextMenuInstance.setOpen = setOpen;
  contextMenuInstance.onOpenChange = onOpenChange;
  contextMenuInstance.onMenuItemClick = onMenuItemClick;
  contextMenuInstance.items = items;
  useImperativeHandle(ref, () => contextMenuInstance.dom.current);
  const { show, onAnimationComplete } = useAnimationStatus(open);
  const params = useMemo(() => {
    return {
      [eventName]: (event: React.MouseEvent) => {
        event.preventDefault();
        if (eventName === 'onClick') {
          contextMenuInstance.onToggle(!contextMenuInstance.open);
        } else if (!contextMenuInstance.open) {
          contextMenuInstance.onToggle(true);
        }
      },
    };
  }, [eventName, contextMenuInstance]);

  return (
    <Popover
      {...popoverProps}
      modeType={modeType}
      className={`border border-gray-100 dark:border-gray-700 ${popoverProps?.className || ''}`}
      open={open}
      onOpenChange={contextMenuInstance.onToggle}
      placement={placement}
      content={
        show ? (
          <PopoverMenu value={value} items={items} onClick={contextMenuInstance.onClick} isHideClose />
        ) : (
          <Fragment />
        )
      }
      domRef={contextMenuInstance.dom}
      onAnimationComplete={onAnimationComplete}
    >
      <div {...rest} {...params}>
        {children}
      </div>
    </Popover>
  );
});
