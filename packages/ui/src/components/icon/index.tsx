import { Icon, IconProps } from '@iconify/react';
import { Fragment } from 'react';
import { fairysIconDataInstance } from './instance';
export * from './instance';

export type FairysIconPropsType =
  | (Omit<IconProps, 'icon'> & {
      /** icon 使用className类名
       * @default false
       */
      isClassName?: false;
      /**自定义className*/
      className?: string;
      /**自定义样式*/
      style?: React.CSSProperties;
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
  /**自定义className*/
  className?: string;
}

export const FairysIcon = (props: FairysIconProps) => {
  const { icon, iconProps = {}, className = '' } = props;

  if (!icon) {
    return <Fragment />;
  }

  const classNameIcon = fairysIconDataInstance.getIcon(icon);

  if (iconProps?.isClassName === true) {
    const { isClassName, ...rest } = iconProps;
    return <span {...rest} className={`${className} ${iconProps?.className || ''} ${icon}`} />;
  } else if (classNameIcon) {
    return <span style={iconProps?.style} className={`${className} ${iconProps?.className || ''} ${classNameIcon}`} />;
  }
  return <Icon {...iconProps} icon={icon} className={`${className} ${iconProps?.className || ''}`} />;
};
