<template>
  <div class="main-container" @click="hideMenu">
    <left-side class="left-side"></left-side>
    <repo-list class="repo-list"></repo-list>
    <detail-view :repo="selectedRepo" class="detail"></detail-view>
  </div>
</template>

<script setup lang="ts">
import LeftSide from '@/components/LeftSide.vue';
import DetailView from '@/components/DetailView.vue';
import RepoList from '@/components/RepoList.vue';
import { computed, onMounted } from 'vue';
import { getQueryParam } from '@/utils';
import store from '@/store';
import { getUserInfo } from '@/api/user';
import { getStarred } from '@/api/repo';
import contextMenu from '@/core/context_menu';
import { getAllTags, getRepoTags } from '@/api/tag';
import { Signal, signalDispatcher } from '@/core/signals';
import { ElLoading } from 'element-plus';

const selectedRepo = computed(() => store.repo.selected.value);

const hideMenu = () => { contextMenu.hide(); };

const fetchUserinfo = async () => {
  const data: any = await getUserInfo();
  store.user.setUserInfo(data);
};

const fetchRepo = async () => {
  const repo: any = await getStarred();
  store.repo.setRepos(repo);
};

const fetchTags = async () => {
  const tags: any = await getAllTags();
  store.repo.setTags(tags);
};

const fetchRepoTags = async () => {
  const data: any = await getRepoTags();
  store.repo.setRepoTags(data);
};

const fetchAll = async () => {
  const loading = ElLoading.service();
  try {
    await Promise.all([fetchUserinfo(), fetchRepo(), fetchTags(), fetchRepoTags()]);
  } finally {
    loading.close();
  }
};

signalDispatcher.register(Signal.Sync, fetchAll);

onMounted(async () => {
  const sign = getQueryParam('sign');
  if (sign) {
    store.user.setToken(sign);
    window.location.href = '/';
  } else if (store.user.isLogin()) {
    await fetchAll();
  }
});
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
  padding: 0;
  margin: 0;
}

.context-menu {
  list-style: none;
  background-color: #fff;
  padding: 0;
  color: #555;
  font-size: 0.8rem;

  li {
    padding: 10px 20px;
    border: 1px solid #eee;
    cursor: pointer;

    &:hover {
      background-color: #eee;
    }
  }
}
</style>

<style lang="scss" scoped>
.main-container {
  display: flex;
  height: 100%;

  .left-side {
    width: 200px;
    background-color: #eee;
  }

  .repo-list {
    border-right: 1px solid #ccc;
    width: 30%;
  }

  .detail {
    width: calc(70% - 200px);
  }
}
</style>
