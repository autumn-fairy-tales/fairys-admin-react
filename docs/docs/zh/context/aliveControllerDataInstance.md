# aliveControllerDataInstance 页面缓存

:::tip 提示

用于缓存当前页面的组件实例。

:::

## 引入

```ts
import { aliveControllerDataInstance } from '@fairys/admin-tools-react';
```

## 实体类

```ts
import type { AliveController } from 'react-activation';
export class AliveControllerDataInstance {
    aliveController: AliveController;
    /**转换路由值列表*/
    static convertIdOrNameList: (value: string[]) => string[];
    /**清空缓存*/
    clear: () => void;
    /**删除缓存*/
    drop: (name: string) => void;
    /**删除缓存ById*/
    dropById: (id: string) => void;
    /**删除缓存Scope*/
    dropScope: (name: string) => void;
    /**删除缓存ScopeByIds*/
    dropScopeByIds: (ids: string[]) => void;
    /**刷新缓存*/
    refresh: (name: string) => void;
    /**刷新缓存ById*/
    refreshById: (id: string) => void;
    /**刷新缓存Scope*/
    refreshScope: (name: string) => void;
    /**刷新缓存ScopeByIds*/ 
    refreshScopeByIds: (ids: string[]) => void;
    /**获取缓存节点*/
    getCachingNodes: () => import("react-activation").CachingNode[];
}
```

## 示例

```ts
import { aliveControllerDataInstance } from '@fairys/admin-tools-react';

aliveControllerDataInstance.refreshScope('scope1');
aliveControllerDataInstance.dropScope('scope1');
aliveControllerDataInstance.getCachingNodes();
aliveControllerDataInstance.refreshScopeByIds(['id1', 'id2']);
aliveControllerDataInstance.dropScopeByIds(['id1', 'id2']);
aliveControllerDataInstance.refreshById('id1');
aliveControllerDataInstance.dropById('id1');
aliveControllerDataInstance.refresh('name1');
aliveControllerDataInstance.drop('name1');

```