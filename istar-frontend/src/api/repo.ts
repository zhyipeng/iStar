import request from '@/core/request';

export const getStarred = async () => request({
  url: '/repo/starred',
});
