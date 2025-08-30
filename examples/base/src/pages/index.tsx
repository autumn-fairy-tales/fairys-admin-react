import { MainPage } from '@fairys/admin-tools-react';
import { NavLink } from 'react-router';
const MainIndex = () => {
  return (
    <MainPage>
      <input className="border border-gray-300 rounded-sm min-h-[32px] box-border p-2" placeholder="请输入" />
      <NavLink to="/">首页</NavLink>
      <NavLink to="/list">列表</NavLink>
      <NavLink to="/detail">详情</NavLink>
    </MainPage>
  );
};

export default MainIndex;
