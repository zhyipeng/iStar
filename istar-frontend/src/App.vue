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
import contextMenu from '@/core/context_menu';
import { getAllTags, getRepoTags } from '@/api/tag';
import { Signal, signalDispatcher } from '@/core/signals';
import { ElLoading } from 'element-plus';
import axios from 'axios';

const selectedRepo = computed(() => store.repo.selected.value);

const hideMenu = () => { contextMenu.hide(); };

const fetchUserinfo = async () => {
  const data: any = await getUserInfo();
  store.user.setUserInfo(data);
};

const fetchRepo = async () => {
  let page = 1;
  let starred = [] as any[];
  try {
    while (page < 10) {
      // eslint-disable-next-line no-await-in-loop
      const { data } = await axios.get(
        `https://api.github.com/users/${store.user.userinfo.value.username}/starred?per_page=100&page=${page}`,
        {
          headers: {
            accept: 'application/vnd.github.v3+json',
            Authorization: `token ${store.user.accessToken}`,
          },
        },
      );
      starred = starred.concat(data);
      if (!data || data.length < 100) {
        break;
      }
      page += 1;
    }

    store.repo.setRepos(starred);
  } catch (e) {
    console.error(e);
  }
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
    await fetchUserinfo();
    await Promise.all([fetchRepo(), fetchTags(), fetchRepoTags()]);
  } finally {
    loading.close();
  }
};

signalDispatcher.register(Signal.Sync, fetchAll);

onMounted(async () => {
  const sign = getQueryParam('sign');
  const token = getQueryParam('token');
  if (sign) {
    store.user.setToken(sign, token);
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
