# Loading 加载状态

:::tip 注意

loading 插件用于页面未加载完成时显示 loading 效果，加载完成后手动调用方法隐藏 loading 效果。

:::

## 引入

```js
import { getLoadingHtmlTags } from '@fairys/admin-tools-react-plugins';
```

## 配置

```ts {7}

import { defineConfig } from '@rsbuild/core';
import { getLoadingHtmlTags } from '@fairys/admin-tools-react-plugins';

export default defineConfig({
  // ....
  html: {
    tags: getLoadingHtmlTags('Fairys'),
  },
});

```

## 项目中调用移除loading

```ts {7}
import { loadingFadeOut } from '@fairys/admin-tools-react';
import { useEffect } from 'react';

const Demo = ()=>{

  useEffect(()=>{
    loadingFadeOut();
  },[])

  return (
    <div>
      <h1>Hello Fairys</h1>
    </div>
  )
}

export default Demo;

```

## 直接代码移除

```ts
/**
 * 移除页面加载动画
 * @description 移除页面加载动画，包括动画元素、样式元素和脚本元素
 */
export const loadingFadeOut = () => {
  const loadingEl = document.getElementById('loading-container');
  const loadingStyleEl = document.getElementById('loading-container-style');
  const remove = () => {
    try {
      loadingEl.remove?.();
      loadingStyleEl.remove?.();
    } catch (error) {
      console.error('loadingFadeOut error', error);
    }
  };
  if (loadingEl) {
    loadingEl.style.opacity = '0';
    loadingEl.style.transition = 'all 0.5s ease-out';
    loadingEl.addEventListener('transitionend', remove, { once: true });
  }
};

```
