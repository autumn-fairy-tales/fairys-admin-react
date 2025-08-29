import { useState } from 'react';
import { onLogin } from './utils';
import { EnterLoading } from '@fairys/admin-tools-react';
interface LoginProps {
  onLogin: () => void;
}

export const Login = (props: LoginProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    setLoading(true);
    onLogin()
      .then(() => {
        console.log('登录成功');
        props.onLogin();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      {loading && <EnterLoading tips="登录中" />}
      <button className="dark:text-gray-50" onClick={onClick} disabled={loading}>
        登录
      </button>
    </div>
  );
};
