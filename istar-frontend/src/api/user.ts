import request from '@/core/request';

export const getUserInfo = async () => request({
  url: '/user/userinfo',
});
