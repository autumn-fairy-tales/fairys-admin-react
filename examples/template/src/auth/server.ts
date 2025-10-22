import axios from 'axios';

const requestAuth = async () => {
  return axios.post('/api/auth', {}).then((res) => {
    return res.data;
  });
};

export const onLogin = async (params: any = {}) => {
  return axios.post('/api/login', params).then((res) => {
    return res.data;
  });
};

export const onGetAuth = async () => {
  return requestAuth();
};
