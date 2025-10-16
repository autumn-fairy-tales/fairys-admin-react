# 主题监听

通过监听`html`、`body`元素或某个`ID`元素的`class`变化，来监听主题变化。

## 引入

```ts
import { useDarkModeWatchInstance , darkModeWatchInstance} from '@fairys/admin-tools-react';
```

## 示例

```tsx preview
import { useEffect } from 'react'
import { darkModeWatchInstance , useDarkModeWatchInstance} from '@fairys/admin-tools-react';

const Demo = ()=> {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const darkModeWatchInstance = useDarkModeWatchInstance();
  darkModeWatchInstance.watchDarkMode = 'html';
  darkModeWatchInstance.onUpdateDark = (darkMode) => {
    console.log('暗黑模式变化:', darkMode);
    setIsDarkMode(darkMode);
  };

  useEffect(darkModeWatchInstance.listenDarkMode,[])

  return (
    <div>
      <p>当前主题：{isDarkMode ? '暗黑' : '亮色'}</p>
    </div>
  );
}

export default Demo

```

**实体类**

```ts
/**监听暗黑模式变化实例*/
export class DarkModeWatchInstance {
    onUpdateDark: (darkMode: boolean) => void;
    /**
     * 监听暗黑模式变化的class属性
     * */
    darkDOM: React.RefObject<HTMLElement | HTMLDivElement>;
    /**
     * 监听暗黑模式变化的方式
     * - prefers-color-scheme: 监听系统暗黑模式变化
     * - html: 监听html元素的 class 变化
     * - body: 监听body元素的 class 变化
     * - string: 监听指定ID标签的 class 变化
     * */
    watchDarkMode: 'html' | 'body' | 'prefers-color-scheme' | string;
    /**监听暗黑模式变化*/
    listenDarkMode: () => () => void;
}
```
