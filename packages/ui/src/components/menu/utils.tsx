import { Fragment } from 'react/jsx-runtime';
import { FairysDividerMenuItem } from './divider.item';
import { FairysGroupMenuItem } from './group.item';
import { FairysMenuItem } from './item';
import { FairysSubMenuItem } from './sub.item';
import { FairysItemType } from './interface';

export const renderItems = (items: FairysItemType[], level: number = 0) => {
  return items.map((item, index) => {
    if (item.type === 'divider') {
      return <FairysDividerMenuItem key={item.path} item={item} level={level + 1} />;
    } else if (item.type === 'group') {
      return <FairysGroupMenuItem key={item.path} item={item} level={level + 1} />;
    } else if (Array.isArray(item.items) && item.items.length) {
      return <FairysSubMenuItem key={item.path} item={item} level={level + 1} />;
    } else if (item) {
      return <FairysMenuItem key={item.path} item={item} level={level + 1} />;
    }
    return <Fragment key={item.path || index} />;
  });
};
