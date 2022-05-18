<template>
  <div class="container">
    <img class="avatar" :src="user.avatar" alt="avatar" @click="login">
    <div class="static-box">
      <div class="static-item">
        <span class="static-num">{{ starredCount }}</span>
        <span class="static-name">Starred</span>
      </div>
      <div class="static-item">
        <span class="static-num">{{ user.followers }}</span>
        <span class="static-name">Followers</span>
      </div>
      <div class="static-item">
        <span class="static-num">{{ user.following }}</span>
        <span class="static-name">Following</span>
      </div>
      <div class="static-item">
        <span class="static-num"><el-icon><Folder/></el-icon></span>
        <span class="static-name">Manage</span>
      </div>
      <div class="static-item">
        <span class="static-num"><el-icon><TopRight/></el-icon></span>
        <span class="static-name">Trending</span>
      </div>
      <div class="static-item">
        <span class="static-num"><el-icon><Search/></el-icon></span>
        <span class="static-name">Search</span>
      </div>
    </div>

    <el-menu
      class="menu-box"
      background-color="#eee"
      default-active="all_repo"
      text-color="#555"
      @select="onMenuSelected"
    >
      <el-menu-item index="all_repo">All Repo</el-menu-item>
      <el-menu-item index="untagged_repo">Untagged Repo</el-menu-item>
      <el-sub-menu index="tag">
        <template #title>Tag</template>
        <el-menu-item
          v-for="tag in tags"
          :index="`tag-${tag.tag}`"
          :key="tag.tag"
          @contextmenu="doDeleteTag($event, tag)"
        >
          <template #title>
            <span class="menu-item-box">
              <span>{{ tag.tag }}</span>
              <span class="count-item">{{ tag.repo_count }}</span>
            </span>
          </template>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="language">
        <template #title>Language</template>
        <el-menu-item
          v-for="item in languages"
          :index="`lang-${item.lang}`"
          :key="item.lang"
        >
          <template #title>
            <span class="menu-item-box">
              <span>{{ item.lang }}</span>
              <span class="count-item">{{ item.count }}</span>
            </span>
          </template>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>

    <div class="footer">
      <el-icon class="btn" @click="addTag"><Plus /></el-icon>
      <el-icon class="btn" @click="syncData"><Refresh /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Folder, TopRight, Search, Plus, Refresh,
} from '@element-plus/icons-vue';
import store from '@/store';
import { computed } from 'vue';
import config from '@/core/config';
import { ElMessage, ElMessageBox } from 'element-plus';
import { createTag, deleteTag } from '@/api/tag';
import type { Tag } from '@/core/interfaces';
import { Signal, signalDispatcher } from '@/core/signals';

const user = computed(() => store.user.userinfo.value);

const starredCount = computed(() => store.repo.repos.value.length);

const languages = computed(() => {
  const allLanguages: {[index:string]: number} = {};
  store.repo.repos.value.forEach((repo) => {
    if (repo.language) {
      if (!allLanguages[repo.language]) {
        allLanguages[repo.language] = 0;
      }
      allLanguages[repo.language] += 1;
    }
  });
  const ret: Array<{lang: string, count: number}> = [];
  Object.keys(allLanguages).forEach((k) => { ret.push({ lang: k, count: allLanguages[k] }); });
  return ret.sort((itemA, itemB) => (itemA.count < itemB.count ? 1 : -1));
});

const tags = computed(() => store.repo.tags.value);

const login = () => {
  if (store.user.isLogin()) {
    return;
  }
  store.user.clearUserInfo(false);
  window.location.href = config.getUrl('/oauth/authorize');
};

const onMenuSelected = async (index: string) => {
  switch (index) {
    case 'all_repo':
      store.repo.filterBy();
      break;
    case 'untagged_repo':
      store.repo.filterBy('', '', true);
      break;
    default:
      if (index.startsWith('lang-')) {
        store.repo.filterBy('', index.slice(5));
      } else if (index.startsWith('tag-')) {
        store.repo.filterBy(index.slice(4));
      } else {
        store.repo.filterBy();
      }
  }
};

const addTag = async () => {
  try {
    const { value } = await ElMessageBox.prompt('新增标签', {
      cancelButtonText: '取消',
      confirmButtonText: '提交',
    });
    if (store.repo.tags.value.findIndex((it) => it.tag === value) !== -1) {
      ElMessage.warning('已存在的标签名');
      return;
    }
    await createTag(value);
    store.repo.addTag(value);
  } catch (e) {
    if (String(e) !== 'cancel') {
      ElMessage.error(String(e));
    }
  }
};

const doDeleteTag = async (event: PointerEvent, tag: Tag) => {
  event.preventDefault();

  try {
    if (tag.repo_count > 0) {
      await ElMessageBox.confirm(`标签${tag.tag}仍在使用中, 是否继续删除? `, {
        confirmButtonText: '是',
        cancelButtonText: '否',
      });
    }
    await deleteTag(tag.tag);
    store.repo.deleteTag(tag.tag);
  } catch (e) {
    if (String(e) !== 'cancel') {
      ElMessage.error(String(e));
    }
  }
};

const syncData = () => signalDispatcher.send(Signal.Sync);
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  margin-top: 25px;
  width: 80px;
  border-radius: 5px;
  cursor: pointer;
}

.static-box {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(2, 50%);
  color: #555;

  .static-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;

    .static-num {
      font-weight: bolder;
    }

    .static-name {
      font-size: 0.8rem;
      margin: 5px 5px 0;
    }
  }
}

.menu-box {
  width: 100%;
  margin-top: 30px;
  flex-grow: 2;
  overflow: scroll;

  .menu-item-box {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .count-item {
      color: #999;
    }
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0 20px;
  width: calc(100% - 40px);

  .btn {
    color: #999;
    cursor: pointer;

    &:hover {
      color: #ccc;
    }
  }
}
</style>
