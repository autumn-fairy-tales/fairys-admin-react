import { routerDataInstance } from '@fairys/admin-tools-react';
import { NavLink } from 'react-router';

const MainIndex = () => {
  console.log(routerDataInstance);
  return (
    <div>
      <NavLink to="/">首页</NavLink>
      <NavLink to="/list">列表</NavLink>
      <NavLink to="/detail">详情</NavLink>
    </div>
  );
};

export default MainIndex;
