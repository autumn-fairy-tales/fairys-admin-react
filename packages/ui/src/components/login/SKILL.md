# Login 组件

## 功能说明
Login 组件用于实现用户登录功能，包含表单验证、错误提示和自定义登录逻辑，适用于各种登录场景。

## 组件结构
- `index.tsx` - 组件主要实现
- `form.item.tsx` - 表单项组件
- `instance.ts` - 登录实例管理
- `variables.css` - 组件样式变量

## API

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | `'登录'` | 登录页面标题 |
| `form` | `FormInstance` | - | 表单实例 |
| `bodyClassName` | `string` | - | 自定义 body 类名 |
| `mainClassName` | `string` | - | 自定义 main 类名 |
| `titleClassName` | `string` | - | 自定义标题类名 |
| `children` | `React.ReactNode` | - | 登录表单内容 |

### FormItem 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `name` | `string` | - | 表单项名称 |
| `label` | `string` | - | 表单项标签 |
| `rules` | `Rule[]` | - | 表单项验证规则 |
| `children` | `React.ReactNode` | - | 表单项内容 |

### FormItemInput 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `string` | `'text'` | 输入框类型 |
| `placeholder` | `string` | - | 输入框占位符 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |

## 使用示例

### 基本用法
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

### 带验证规则
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
      <FairysLoginPage.FormItem 
        name="username" 
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <FairysLoginPage.FormItemInput placeholder="请输入用户名" />
      </FairysLoginPage.FormItem>
      <FairysLoginPage.FormItem 
        name="password" 
        label="密码"
        rules={[{ required: true, message: '请输入密码' }, { min: 6, message: '密码长度至少为 6 位' }]}
      >
        <FairysLoginPage.FormItemInput type="password" placeholder="请输入密码" />
      </FairysLoginPage.FormItem>
      <button onClick={handleLogin}>登录</button>
    </FairysLoginPage>
  );
};
```

### 自定义样式
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
    <FairysLoginPage 
      title="用户登录" 
      form={form}
      bodyClassName="bg-gray-100"
      mainClassName="p-8 rounded-lg shadow-lg"
      titleClassName="text-2xl font-bold text-center mb-6"
    >
      <FairysLoginPage.FormItem name="username" label="用户名">
        <FairysLoginPage.FormItemInput placeholder="请输入用户名" />
      </FairysLoginPage.FormItem>
      <FairysLoginPage.FormItem name="password" label="密码">
        <FairysLoginPage.FormItemInput type="password" placeholder="请输入密码" />
      </FairysLoginPage.FormItem>
      <button 
        onClick={handleLogin}
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        登录
      </button>
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
- 提供 useForm 钩子用于表单管理
