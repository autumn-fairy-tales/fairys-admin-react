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
  /**父级 subMenu 菜单数量*/
  countSubMenu?: number;
  /**父级 group 菜单数量*/
  countGroupMenu?: number;
  /**当前菜单的分组层级(在弹框中使用)*/
  groupLevel?: number;
  /**弹框个数*/
  popupLevel?: number;
}

export const renderItems = (items: FairysItemType[], options: UtilsItemOptions = {}) => {
  const {
    level = 0,
    parentPaths = '0',
    menuTypes = [],
    countSubMenu = 0,
    countGroupMenu = 0,
    groupLevel = -1,
    popupLevel = -1,
  } = options;
  return items.map((item, index) => {
    // console.log('item', item, options);
    if (item.type === 'divider') {
      return <FairysDividerMenuItem key={`${parentPaths}_${index}`} item={item} level={level + 1} />;
    } else if (item.type === 'group') {
      return (
        <FairysSubMenuItem
          key={item.path}
          item={item}
          utilsItemOptions={{
            level: level + 1,
            parentPaths: `${parentPaths}_${index}`,
            menuTypes: [...menuTypes].concat([item.type || 'group']),
            currentType: 'group',
            countGroupMenu: countGroupMenu + 1,
            countSubMenu,
            groupLevel: groupLevel + 1,
            popupLevel: popupLevel + 1,
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
            countGroupMenu,
            countSubMenu: countSubMenu + 1,
            groupLevel: groupLevel,
            popupLevel: popupLevel + 1,
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
            countGroupMenu,
            countSubMenu,
            groupLevel,
            popupLevel,
          }}
        />
      );
    }
    return <Fragment key={item.path || index} />;
  });
};
