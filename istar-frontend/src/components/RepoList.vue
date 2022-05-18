<template>
  <div class="container">
    <div class="sort-btn-group">
      <el-icon
        class="sort-btn"
        :class="{'active-btn': isActive(0)}"
        :size="25"
        @click="sortBy(0)"
      >
        <Timer/>
      </el-icon>
      <el-icon
        class="sort-btn"
        :class="{'active-btn': isActive(1)}"
        :size="25"
        @click="sortBy(1)"
      >
        <Star/>
      </el-icon>
      <el-icon
        class="sort-btn"
        :class="{'active-btn': isActive(2)}"
        :size="25"
        @click="sortBy(2)"
      >
        <Sort/>
      </el-icon>
    </div>

    <ul class="repo-list">
      <li
        class="repo-list-item"
        :class="{'active-item': isActiveItem(item)}"
        v-for="item in repoItems"
        :key="item.id"
        @click="selectRepo(item)"
        @contextmenu="showMenu(item, $event)"
      >
        <repo-item :repo="item"></repo-item>
      </li>
    </ul>

    <el-dialog v-model="showAddTagDialog" :title="selectedRepo ? selectedRepo.name : ''">
      <el-form>
        <el-form-item>
          <el-select v-model="repoTags" multiple allow-create filterable style="width: 100%;">
            <el-option
              v-for="tag in store.repo.tags.value"
              :key="tag.tag"
              :label="tag.tag"
              :value="tag.tag"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div style="display: flex; justify-content: flex-end; width: 100%;">
            <el-button type="primary" @click="confirmSetTag">确定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import RepoItem from '@/components/RepoItem.vue';
import { Sort, Star, Timer } from '@element-plus/icons-vue';
import { computed, ref } from 'vue';
import store from '@/store';
import type { Repo } from '@/core/interfaces';
import contextMenu from '@/core/context_menu';
import { Signal, signalDispatcher } from '@/core/signals';
import { setTag } from '@/api/tag';
import { ElMessage } from 'element-plus';

const repoItems = computed(() => store.repo.getRepos());

const sortBy = (by: number) => {
  store.repo.sort(by);
};

const isActive = (by: number) => store.repo.sortBy.value === by;

const isActiveItem = (
  item: Repo,
) => store.repo.selected.value && store.repo.selected.value.id === item.id;

const selectRepo = (repo: Repo) => {
  console.log(repo);
  store.repo.selected.value = repo;
};

const showMenu = (repo: Repo, e: MouseEvent) => {
  e.preventDefault();
  contextMenu.show(repo, e);
};

const showAddTagDialog = ref(false);
const selectedRepo = ref<Repo | null>(null);

const repoTags = ref<string[]>([]);

const showAddTag = async (repo: Repo) => {
  selectedRepo.value = repo;
  repoTags.value = store.repo.getRepoTag(repo.id);
  showAddTagDialog.value = true;
};

const confirmSetTag = async () => {
  if (!selectedRepo.value) {
    return;
  }
  try {
    await setTag(repoTags.value, [selectedRepo.value.id]);
    showAddTagDialog.value = false;
    store.repo.setRepoTag(selectedRepo.value.id, repoTags.value);
  } catch (e) {
    ElMessage.error(String(e));
  }
};

signalDispatcher.register(Signal.AddTag, showAddTag);
</script>

<style scoped lang="scss">
.repo-list {
  list-style: none;
  padding: 0;
  overflow: auto;
}

.container {
  position: relative;
}

.sort-btn-group {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 10px;
  position: sticky;
  top: 0;
  background-color: #fff;

  .sort-btn {
    color: #999;
    margin: 0 20px;
    cursor: pointer;
  }

  .active-btn {
    color: #5c5cec;
  }
}

.repo-list-item {
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
}

.active-item {
  background-color: #eee;
}
</style>
