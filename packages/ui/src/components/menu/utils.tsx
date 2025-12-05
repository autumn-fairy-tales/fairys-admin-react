import { Fragment } from 'react/jsx-runtime';
import { FairysDividerMenuItem } from './divider.item';
import { FairysGroupMenuItem } from './group.item';
import { FairysMenuItem } from './item';
import { FairysSubMenuItem } from './sub.item';
import { FairysItemType } from './interface';

export interface UtilsItemOptions {
  level?: number;
  parentPaths?: string;
  /**弹出层内的层级(主要是 分组使用)*/
  popoverLevel?: number;
}

export const renderItems = (items: FairysItemType[], options: UtilsItemOptions = {}) => {
  const { level = 0, parentPaths = '0', popoverLevel = 0 } = options;
  return items.map((item, index) => {
    if (item.type === 'divider') {
      return <FairysDividerMenuItem key={`${parentPaths}_${index}`} item={item} level={level + 1} />;
    } else if (item.type === 'group') {
      return (
        <FairysGroupMenuItem
          key={item.path}
          item={item}
          utilsItemOptions={{
            level: level + 1,
            parentPaths: `${parentPaths}_${index}`,
            popoverLevel: popoverLevel + 1,
          }}
        />
      );
    } else if (Array.isArray(item.items) && item.items.length) {
      return (
        <FairysSubMenuItem
          key={item.path}
          item={item}
          utilsItemOptions={{
            level: level + 1,
            parentPaths: `${parentPaths}_${index}`,
            popoverLevel: popoverLevel + 1,
          }}
        />
      );
    } else if (item) {
      return (
        <FairysMenuItem
          key={item.path}
          item={item}
          utilsItemOptions={{
            level: level + 1,
            parentPaths: `${parentPaths}_${index}`,
            popoverLevel: popoverLevel + 1,
          }}
        />
      );
    }
    return <Fragment key={item.path || index} />;
  });
};
