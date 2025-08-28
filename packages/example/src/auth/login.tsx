import { useState } from 'react';
import { onLogin } from './utils';

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
      {loading && <div>加载中...</div>}
      <button onClick={onClick} disabled={loading}>
        登录
      </button>
    </div>
  );
};
