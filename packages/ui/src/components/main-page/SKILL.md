# MainPage 组件

## 功能说明
MainPage 组件是应用的主页面容器，用于组织页面布局和内容，包含搜索区、主体内容区和页脚区，适用于管理系统、后台应用等场景。

## 组件结构
- `index.tsx` - 组件主要实现
- `variables.css` - 组件样式变量

## API

### FairysMainPage 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |
| `children` | `React.ReactNode` | - | 子组件 |

### FairysMainPageSearch 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |
| `children` | `React.ReactNode` | - | 搜索区域内容 |

### FairysMainPageBody 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |
| `children` | `React.ReactNode` | - | 主体内容 |

### FairysMainPageFooter 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |
| `children` | `React.ReactNode` | - | 页脚内容 |

## 使用示例

### 基本用法
```tsx
import { 
  FairysMainPage, 
  FairysMainPageSearch, 
  FairysMainPageBody, 
  FairysMainPageFooter 
} from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysMainPage>
      <FairysMainPageSearch>
        {/* 搜索区域内容 */}
        <div>搜索框</div>
      </FairysMainPageSearch>
      <FairysMainPageBody>
        {/* 主体内容 */}
        <div>页面内容</div>
      </FairysMainPageBody>
      <FairysMainPageFooter>
        {/* 页脚内容 */}
        <div>页脚信息</div>
      </FairysMainPageFooter>
    </FairysMainPage>
  );
};
```

### 带自定义样式
```tsx
import { 
  FairysMainPage, 
  FairysMainPageSearch, 
  FairysMainPageBody, 
  FairysMainPageFooter 
} from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysMainPage className="custom-main-page" style={{ minHeight: '100vh' }}>
      <FairysMainPageSearch className="custom-search" style={{ padding: '16px' }}>
        <div>搜索框</div>
      </FairysMainPageSearch>
      <FairysMainPageBody className="custom-body" style={{ flex: 1, padding: '24px' }}>
        <div>页面内容</div>
      </FairysMainPageBody>
      <FairysMainPageFooter className="custom-footer" style={{ padding: '16px', borderTop: '1px solid #e8e8e8' }}>
        <div>页脚信息</div>
      </FairysMainPageFooter>
    </FairysMainPage>
  );
};
```

### 完整示例
```tsx
import { 
  FairysMainPage, 
  FairysMainPageSearch, 
  FairysMainPageBody, 
  FairysMainPageFooter 
} from '@fairys-admin/ui';
import { Input, Button } from 'antd';

const App = () => {
  return (
    <FairysMainPage>
      <FairysMainPageSearch>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Input placeholder="请输入搜索内容" style={{ width: 300 }} />
          <Button type="primary">搜索</Button>
        </div>
      </FairysMainPageSearch>
      <FairysMainPageBody>
        <div style={{ backgroundColor: '#f5f5f5', padding: '24px', borderRadius: '8px' }}>
          <h1>页面标题</h1>
          <p>这是页面的主体内容区域，可以放置各种组件和内容。</p>
        </div>
      </FairysMainPageBody>
      <FairysMainPageFooter>
        <div style={{ textAlign: 'center', color: '#666' }}>
          © 2024 管理系统 - 版权所有
        </div>
      </FairysMainPageFooter>
    </FairysMainPage>
  );
};
```

## 特性
- 支持页面布局管理
- 包含搜索区、主体内容区和页脚区
- 支持自定义样式（className）
- 支持响应式布局
- 提供清晰的页面结构组织
