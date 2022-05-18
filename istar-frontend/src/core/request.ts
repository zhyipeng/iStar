import axios from 'axios';
import config from '@/core/config';
import store from '@/store';
import { ElMessage } from 'element-plus';

const service = axios.create({
  baseURL: config.baseURL,
});

service.interceptors.request.use((conf) => {
  const { token } = store.user;
  if (token) {
    // eslint-disable-next-line no-param-reassign
    conf.headers!['x-token'] = token;
  }
  return conf;
});

service.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      store.user.clearUserInfo();
    }
    return response.data;
  },
  (error) => {
    ElMessage.error(`请求异常, 请稍后重试: ${error}`);
    return Promise.reject(error);
  },
);

export default service;
