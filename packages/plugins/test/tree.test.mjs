import assert from 'node:assert/strict';
import test from 'node:test';
import { TreeRoutes } from '../esm/routes/tree.js';

const createTree = (files) => {
  const tree = new TreeRoutes();
  tree.isTs = true;
  tree.loadType = 'lazy';
  tree.watchDirs = [{ dir: 'src/pages', routePrefix: '/' }];
  files.forEach((file) => tree.add(file));
  return tree;
};

const baseFiles = [
  'src/pages/layout.tsx',
  'src/pages/page.tsx',
  'src/pages/home/page.tsx',
  'src/pages/home/layout.tsx',
  'src/pages/home/aaa/layout.tsx',
  'src/pages/home/aaa/page.tsx',
  'src/pages/home/aaa/detail/page.tsx',
  'src/pages/home/404.tsx',
  'src/pages/home/aaa/404.tsx',
];

test('删除单个页面保留兄弟页面，删空后剪枝目录', () => {
  const tree = createTree(baseFiles);
  tree.remove('src/pages/home/aaa/detail/page.tsx');
  const afterDetail = tree.toString();
  assert.ok(afterDetail.includes('@/pages/home/aaa/page'));
  assert.ok(!afterDetail.includes('@/pages/home/aaa/detail/page'));

  tree.remove('src/pages/home/aaa/page.tsx');
  tree.remove('src/pages/home/aaa/layout.tsx');
  tree.remove('src/pages/home/aaa/404.tsx');
  const afterAll = tree.toString();
  assert.ok(!afterAll.includes('/home/aaa'));
  assert.ok(afterAll.includes('/home/404'));
});

test('catch-all 生成通配路由并兼容 Windows 文件名', () => {
  const tree = createTree(['src/pages/layout.tsx', 'src/pages/page.tsx', 'src/pages/catch-all.tsx']);
  const result = tree.toString();
  assert.ok(result.includes("from '@/pages/catch-all'"));
  assert.ok(result.includes("'/*'"));
  assert.ok(!result.includes("@/pages/*"));
});

test('深层 layout 挂到自己的路由节点', () => {
  const tree = createTree(baseFiles);
  const result = tree.toString();
  assert.ok(
    result.includes('"path": "/home/aaa", HydrateFallback , "Component": FAIRYS_HOME_AAA_LAYOUT'),
  );
  assert.ok(result.includes('"path": "/home", HydrateFallback , "Component": FAIRYS_HOME_LAYOUT'));
});

test('删除嵌套 layout/404 不残留 import', () => {
  const tree = createTree(baseFiles);
  tree.remove('src/pages/home/aaa/layout.tsx');
  tree.remove('src/pages/home/aaa/404.tsx');
  tree.remove('src/pages/home/555.tsx');
  const result = tree.toString();
  assert.ok(!result.includes('FAIRYS_HOME_AAA_LAYOUT'));
  assert.ok(!result.includes('FAIRYS_HOME_AAA_404'));
  assert.ok(result.includes('FAIRYS_HOME_LAYOUT'));
});
