# Select 组件

## 功能说明
Select 组件用于创建下拉选择框，支持单选和多选功能，适用于表单、筛选等场景。

## 组件结构
- `index.tsx` - 组件主要实现

## API

### 选项类型

```typescript
interface SelectItem {
  value: string | number;       // 选项值
  title: string;                // 选项标题
  key: string | number;         // 选项唯一标识
  disabled?: boolean;           // 是否禁用
}
```

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `SelectItem[]` | `[]` | 选项数据 |
| `value` | `string \| number \| (string \| number)[]` | - | 当前值 |
| `onChange` | `(value: string \| number \| (string \| number)[]) => void` | - | 值改变回调 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `multiple` | `boolean` | `false` | 是否多选 |
| `placeholder` | `string` | `'请选择'` | 占位文本 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |

## 使用示例

### 基本用法
```tsx
import { useState } from 'react';
import { FairysSelectBase } from '@fairys-admin/ui';

const App = () => {
  const [value, setValue] = useState('');

  const selectItems = [
    {
      value: '1',
      title: '选项1',
      key: '1'
    },
    {
      value: '2',
      title: '选项2',
      key: '2'
    },
    {
      value: '3',
      title: '选项3',
      key: '3'
    }
  ];

  return (
    <FairysSelectBase
      items={selectItems}
      value={value}
      onChange={setValue}
      disabled={false}
      multiple={false}
    />
  );
};
```

### 多选示例
```tsx
import { useState } from 'react';
import { FairysSelectBase } from '@fairys-admin/ui';

const App = () => {
  const [value, setValue] = useState<string[]>([]);

  const selectItems = [
    {
      value: '1',
      title: '选项1',
      key: '1'
    },
    {
      value: '2',
      title: '选项2',
      key: '2'
    },
    {
      value: '3',
      title: '选项3',
      key: '3'
    }
  ];

  return (
    <FairysSelectBase
      items={selectItems}
      value={value}
      onChange={setValue}
      multiple={true}
    />
  );
};
```

### 带占位文本
```tsx
import { useState } from 'react';
import { FairysSelectBase } from '@fairys-admin/ui';

const App = () => {
  const [value, setValue] = useState('');

  const selectItems = [
    {
      value: '1',
      title: '选项1',
      key: '1'
    },
    {
      value: '2',
      title: '选项2',
      key: '2'
    }
  ];

  return (
    <FairysSelectBase
      items={selectItems}
      value={value}
      onChange={setValue}
      placeholder="请选择一个选项"
    />
  );
};
```

### 禁用状态
```tsx
import { useState } from 'react';
import { FairysSelectBase } from '@fairys-admin/ui';

const App = () => {
  const [value, setValue] = useState('1');

  const selectItems = [
    {
      value: '1',
      title: '选项1',
      key: '1'
    },
    {
      value: '2',
      title: '选项2',
      key: '2',
      disabled: true
    },
    {
      value: '3',
      title: '选项3',
      key: '3'
    }
  ];

  return (
    <FairysSelectBase
      items={selectItems}
      value={value}
      onChange={setValue}
      disabled={false}
    />
  );
};
```

### 自定义样式
```tsx
import { useState } from 'react';
import { FairysSelectBase } from '@fairys-admin/ui';

const App = () => {
  const [value, setValue] = useState('');

  const selectItems = [
    {
      value: '1',
      title: '选项1',
      key: '1'
    },
    {
      value: '2',
      title: '选项2',
      key: '2'
    }
  ];

  return (
    <FairysSelectBase
      items={selectItems}
      value={value}
      onChange={setValue}
      className="custom-select"
      style={{ width: '200px' }}
    />
  );
};
```

## 特性
- 支持单选和多选（multiple）
- 支持自定义选项（items）
- 支持禁用状态（disabled）
- 支持值改变回调（onChange）
- 支持显示选中值
- 支持占位文本（placeholder）
- 支持自定义样式
