import { defineMock } from 'rspack-plugin-mock/helper';

export default defineMock([
  {
    url: '/api/login',
    delay: 2000,
    body: {
      code: 200,
      message: 'success',
      data: {
        token: '123456',
        userName: 'fairys',
        userAvatar: 'https://gravatar.com/userimage/233185585/f004e2e1534508a34caef161ef76d9f2.jpeg?size=256',
      },
    },
  },
  {
    url: '/api/auth',
    delay: 1000,
    body: {
      code: 200,
      message: 'success',
      data: {
        /**菜单权限*/
        menusPermissions: [],
        /**按钮权限*/
        btnsPermissions: [],
        /**忽略权限(忽略权限不会进行权限判断，不分按钮还是菜单,在判断时始终为true)*/
        ignorePermissions: [],
      },
    },
  },
]);
