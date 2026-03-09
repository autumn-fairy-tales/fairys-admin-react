# Login 组件

## 功能说明
Login 组件用于实现用户登录功能，包含表单验证和登录逻辑。

## 组件结构
- `index.tsx` - 组件主要实现
- `form.item.tsx` - 表单项组件
- `instance.ts` - 登录实例管理
- `variables.css` - 组件样式变量

## 使用示例
```tsx
import { FairysLoginPage } from '@fairys-admin/ui';

const App = () => {
  const [form] = FairysLoginPage.useForm();

  const handleLogin = async () => {
    try {
      const values = await form.validate();
      // 登录逻辑
      console.log('登录数据:', values);
    } catch (error) {
      console.error('验证失败:', error);
    }
  };

  return (
    <FairysLoginPage title="登录" form={form}>
      <FairysLoginPage.FormItem name="username" label="用户名">
        <FairysLoginPage.FormItemInput placeholder="请输入用户名" />
      </FairysLoginPage.FormItem>
      <FairysLoginPage.FormItem name="password" label="密码">
        <FairysLoginPage.FormItemInput type="password" placeholder="请输入密码" />
      </FairysLoginPage.FormItem>
      <button onClick={handleLogin}>登录</button>
    </FairysLoginPage>
  );
};
```

## 特性
- 支持表单验证
- 支持自定义登录逻辑
- 支持错误提示
- 支持自定义样式（bodyClassName、mainClassName、titleClassName）
- 支持自定义标题（title）
- 支持表单规则配置（rules）
