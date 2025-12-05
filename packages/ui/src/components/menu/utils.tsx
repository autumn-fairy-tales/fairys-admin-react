import { Fragment } from 'react/jsx-runtime';
import { FairysDividerMenuItem } from './divider.item';
import { FairysGroupMenuItem } from './group.item';
import { FairysMenuItem } from './item';
import { FairysSubMenuItem } from './sub.item';
import { FairysItemType } from './interface';

export interface UtilsItemOptions {
  level?: number;
  parentPaths?: string;
  /**父级的菜单类型*/
  menuTypes?: FairysItemType['type'][];
  currentType?: FairysItemType['type'];
}

export const renderItems = (items: FairysItemType[], options: UtilsItemOptions = {}) => {
  const { level = 0, parentPaths = '0', menuTypes = [] } = options;
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
            menuTypes: [...menuTypes].concat([item.type || 'group']),
            currentType: 'group',
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
            menuTypes: [...menuTypes].concat([item.type || 'subMenu']),
            currentType: 'subMenu',
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
            menuTypes: [...menuTypes].concat([item.type || 'item']),
            currentType: 'item',
          }}
        />
      );
    }
    return <Fragment key={item.path || index} />;
  });
};
