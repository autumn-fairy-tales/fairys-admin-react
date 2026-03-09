# MainPage 组件

## 功能说明
MainPage 组件是应用的主页面容器，用于组织页面布局和内容，包含搜索区、主体内容区和页脚区。

## 组件结构
- `index.tsx` - 组件主要实现
- `variables.css` - 组件样式变量

## 使用示例
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

## 特性
- 支持页面布局管理
- 包含搜索区、主体内容区和页脚区
- 支持自定义样式（className）
- 支持响应式布局
