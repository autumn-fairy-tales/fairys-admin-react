# Select 组件

## 功能说明
Select 组件用于创建下拉选择框，支持单选和多选功能。

## 组件结构
- `index.tsx` - 组件主要实现

## 使用示例
```tsx
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

// 多选示例
const App2 = () => {
  const [value, setValue] = useState<string[]>([]);

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

## 特性
- 支持单选和多选（multiple）
- 支持自定义选项（items）
- 支持禁用状态（disabled）
- 支持值改变回调（onChange）
- 支持显示选中值
