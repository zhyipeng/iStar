<template>
  <div class="repo-item">
    <div class="info">
      <img class="avatar" :src="avatar" alt="avatar">
      <span class="repo-name">{{ repo.name }}</span>
    </div>
    <p class="description">
      {{ repo.description }}
    </p>
    <div class="footer">
      <span class="language">
        <span>{{ repo.language }}</span>
        <el-tag class="tag" v-for="t in tags" :key="t">{{ t }}</el-tag>
      </span>
      <span class="star">
        ⭐️ {{ repo.stargazers_count }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Repo } from '@/core/interfaces';
import { computed } from 'vue';
import store from '@/store';

const props = defineProps<{
  repo: Repo
}>();

const avatar = computed(() => {
  if (props.repo.owner) {
    return props.repo.owner.avatar_url;
  }
  return '';
});

const tags = computed(() => {
  const ret = store.repo.repoTags.value[String(props.repo.id)];
  if (!ret) {
    return [];
  }
  return ret;
});
</script>

<style scoped lang="scss">
.repo-item {
  border-bottom: 1px solid #eee;
  height: 125px;
  padding-left: 15px;
  color: #555;
  display: flex;
  flex-direction: column;
}

.info {
  margin-top: 10px;
  display: flex;
  align-items: center;

  .avatar {
    width: 20px;
    border-radius: 50%;
  }

  .repo-name {
    margin-left: 5px;
    font-weight: bolder;
  }
}

.description {
  font-size: 0.8rem;
  flex-grow: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  padding-right: 20px;
}

.footer {
  margin-bottom: 10px;
  color: #aaa;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
}

.tag {
  margin-left: 5px;
}
</style>
