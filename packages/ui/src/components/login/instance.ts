import { createContext, isValidElement, useContext, useEffect, useRef } from 'react';
import { proxy, ref, useSnapshot } from 'valtio';

type RuleItemType = (value: any, formData: any) => Promise<React.ReactNode>;

interface LoginPageFormState {
  formData: Record<string, any>;
  errors: Record<string, React.ReactNode>;
}

class LoginPageFormItemInstance {
  name: string;
  value: any;
  errors: React.ReactNode;
}

export interface UseLoginPageFormItemInstanceProps {
  name: string;
  valuePropName?: string;
  formatValue?: (value: any, form: LoginPageFormInstance, event: any) => any;
}

export const useLoginPageFormItemInstance = (props: UseLoginPageFormItemInstanceProps) => {
  const { name, valuePropName = 'value', formatValue } = props;
  const formInstance = useLoginPageFormInstanceContext();
  const snapshot = useSnapshot(formInstance.state);
  const itemInstance = useRef<LoginPageFormItemInstance>(new LoginPageFormItemInstance()).current;
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

export class LoginPageFormInstance {
  /**所有表单项值*/
  state = proxy<LoginPageFormState>({
    formData: {},
    errors: {},
  });
  /**所有表单项*/
  items: Map<string, LoginPageFormItemInstance> = new Map([]);
  /**验证规则*/
  rules: Record<string, RuleItemType> = {};
  // 注册表单项
  register = (name: string, item: LoginPageFormItemInstance) => {
    this.items.set(name, item);
    return () => {
      this.items.delete(name);
    };
  };
  /**更新表单值*/
  updatedFormData = (value: Record<string, any>, isValidate?: boolean) => {
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
          value: this.state.formData,
          errors,
        });
      }
      return Promise.resolve({
        value: { ...this.state.formData },
        errors,
      });
    }
  };

  /**值更新*/
  onValueChange = (name: string, value: any) => {
    this.updatedFormData({ [name]: value }, true);
  };
}

export const useLoginPageFormInstance = (form?: LoginPageFormInstance) => {
  const ref = useRef<LoginPageFormInstance>();
  if (!ref.current) {
    if (form) {
      ref.current = form;
    } else {
      ref.current = new LoginPageFormInstance();
    }
  }
  return ref.current;
};

export const LoginPageFormInstanceContext = createContext<LoginPageFormInstance>(new LoginPageFormInstance());
export const useLoginPageFormInstanceContext = () => useContext(LoginPageFormInstanceContext);
