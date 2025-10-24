import { Icon, IconProps } from '@iconify/react';
import { Fragment } from 'react';

export type FairysIconPropsType =
  | (Omit<IconProps, 'icon'> & {
      /** icon 使用className类名
       * @default false
       */
      isClassName?: false;
    })
  | ({
      /** icon 使用className类名
       * @default false
       */
      isClassName: true;
    } & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, 'ref'>);

export interface FairysIconProps {
  /**图标*/
  icon?: string;
  /**图标属性*/
  iconProps?: FairysIconPropsType;
  className?: string;
}

export const FairysIcon = (props: FairysIconProps) => {
  const { icon, iconProps = {}, className = '' } = props;
  if (!icon) {
    return <Fragment />;
  }

  if (iconProps?.isClassName === true) {
    const { isClassName, ...rest } = iconProps;
    return <span {...rest} className={`${className} ${iconProps?.className || ''} ${icon}`} />;
  }
  return <Icon {...iconProps} icon={icon} className={`${className} ${iconProps?.className || ''}`} />;
};
