import request from '@/core/request';

export const getAllTags = async () => request({
  url: '/tag/',
});

export const createTag = async (tag: string) => request({
  url: '/tag/',
  data: { tag },
  method: 'POST',
});

export const setTag = async (tags: string[], repos: number[]) => request({
  url: '/tag/set_tag',
  method: 'POST',
  data: { tags, repos },
});

export const getRepoTags = async () => request({
  url: '/tag/get_repo_tags',
});

export const deleteTag = async (tag: string) => request({
  url: '/tag/',
  data: { tag },
  method: 'DELETE',
});
