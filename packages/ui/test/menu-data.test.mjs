import assert from 'node:assert/strict';
import test from 'node:test';
import { menuDataInstance } from '../esm/context/menu-data.js';
import { tabBarDataInstance } from '../esm/context/tab-bar.js';

const menuItems = [
  {
    title: '主菜单',
    path: 'main-menu',
    type: 'group',
    isMain: true,
    items: [
      { title: '列表', path: '/list' },
      { title: '详情', path: '/detail/:id' },
      { title: '通配', path: '/*' },
    ],
  },
];

test('动态路由命中菜单 pattern 并生成具体路径标签', () => {
  menuDataInstance.ctor(menuItems);
  assert.equal(menuDataInstance.get_match_menu_path('/detail/12'), '/detail/:id');
  assert.equal(menuDataInstance.get_match_menu_path('/list'), '/list');
  assert.equal(menuDataInstance.get_match_menu_path('/nope'), '/nope');
  assert.equal(menuDataInstance.get_path_menuItem('/detail/12')?.title, '详情');
  assert.deepEqual(
    (menuDataInstance.get_parent_menuItems('/detail/12') || []).map((item) => item.path),
    ['main-menu', '/detail/:id'],
  );

  tabBarDataInstance.clear();
  tabBarDataInstance.add('/detail/12');
  const tab = tabBarDataInstance.state.tabBarItems[0];
  assert.equal(tab?.path, '/detail/12');
  assert.equal(tab?.title, '详情');
  assert.equal(tabBarDataInstance.state.tabBarItems.length, 1);
});

test('动态菜单不进入搜索结果', () => {
  menuDataInstance.ctor(menuItems);
  assert.ok(!menuDataInstance.state.searchMenuItems.some((item) => item.path.includes(':')));
  menuDataInstance.onSearch('详情');
  assert.equal(menuDataInstance.state.searchMenuItems.length, 0);
});
