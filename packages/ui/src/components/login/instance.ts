import { createContext, isValidElement, useContext, useEffect, useRef } from 'react';
import { proxy, ref, useSnapshot, snapshot } from 'valtio';

export type FairysRuleItemType = (value: any, formData: any) => Promise<React.ReactNode> | React.ReactNode;

interface FairysLoginPageFormState {
  /**所有表单项值*/
  formData: Record<string, any>;
  /**所有表单项错误信息*/
  errors: Record<string, React.ReactNode>;
}

class FairysLoginPageFormItemInstance {
  /**表单项名称*/
  name: string;
  /**表单项值*/
  value: any;
  /**表单项错误信息*/
  errors: React.ReactNode;
}

export interface UseFairysLoginPageFormItemInstanceProps {
  /**表单项名称*/
  name: string;
  /**表单项值属性名*/
  valuePropName?: string;
  /**表单项值格式化函数*/
  formatValue?: (value: any, form: FairysLoginPageFormInstance, event: any) => any;
}

export const useFairysLoginPageFormItemInstance = (props: UseFairysLoginPageFormItemInstanceProps) => {
  const { name, valuePropName = 'value', formatValue } = props;
  const formInstance = useFairysLoginPageFormInstanceContext();
  const snapshot = useSnapshot(formInstance.state);
  const itemInstance = useRef<FairysLoginPageFormItemInstance>(new FairysLoginPageFormItemInstance()).current;
  itemInstance.name = name;
  const errors = snapshot.errors?.[name];
  const value = snapshot.formData?.[name];
  itemInstance.value = value;
  itemInstance.errors = errors as React.ReactNode;

  const onChange = (event: any) => {
    let _value = event;
    if (event && event.target && typeof event.target === 'object' && valuePropName in event.target) {
      _value = event.target[valuePropName];
    }
    if (typeof formatValue === 'function') {
      _value = formatValue(_value, formInstance, event);
    }
    formInstance.onValueChange(name, _value);
  };

  useEffect(() => {
    const onMounted = formInstance.register(name, itemInstance);
    return () => {
      onMounted();
    };
  }, [name]);

  return { value, errors, itemInstance, formInstance, onChange };
};

export class FairysLoginPageFormInstance {
  /**所有表单项值*/
  state = proxy<FairysLoginPageFormState>({
    formData: {},
    errors: {},
  });
  /**所有表单项*/
  items: Map<string, FairysLoginPageFormItemInstance> = new Map([]);
  /**验证规则*/
  rules: Record<string, FairysRuleItemType> = {};
  /**注册表单项*/
  register = (name: string, item: FairysLoginPageFormItemInstance) => {
    this.items.set(name, item);
    return () => {
      this.items.delete(name);
    };
  };
  /**更新表单值*/
  updatedFormData = (value: Record<string, any>, isValidate?: boolean) => {
    if (!value) {
      return;
    }
    for (const key in value) {
      this.state.formData[key] = value[key];
    }
    if (isValidate) {
      try {
        this.validate(Object.keys(value), false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  /**更新错误信息*/
  updatedErrors = (value: Record<string, React.ReactNode>) => {
    for (const key in value) {
      if (isValidElement(value[key])) {
        this.state.errors[key] = ref(value[key]);
      } else {
        this.state.errors[key] = value[key];
      }
    }
  };
  /**验证表单*/
  validate = async (keys?: string[], isReturn: boolean = true) => {
    const errors: Record<string, React.ReactNode> = {};
    let isSuccess = true;
    for (const key of keys || this.items.keys()) {
      const rule = this.rules?.[key];
      errors[key] = '';
      if (typeof rule === 'function') {
        const error = await rule(this.state.formData[key], this.state.formData);
        if (error) {
          errors[key] = error;
          isSuccess = false;
        }
      }
    }
    this.updatedErrors(errors);
    if (isReturn) {
      if (!isSuccess) {
        return Promise.reject({
          value: snapshot(this.state.formData),
          errors,
        });
      }
      return Promise.resolve({
        value: snapshot(this.state.formData),
        errors,
      });
    }
  };
  /**值更新*/
  onValueChange = (name: string, value: any) => {
    this.updatedFormData({ [name]: value }, true);
  };
}

export const useFairysLoginPageFormInstance = (form?: FairysLoginPageFormInstance) => {
  const ref = useRef<FairysLoginPageFormInstance>();
  if (!ref.current) {
    if (form) {
      ref.current = form;
    } else {
      ref.current = new FairysLoginPageFormInstance();
    }
  }
  return ref.current;
};

export const FairysLoginPageFormInstanceContext = createContext<FairysLoginPageFormInstance>(
  new FairysLoginPageFormInstance(),
);
export const useFairysLoginPageFormInstanceContext = () => useContext(FairysLoginPageFormInstanceContext);
