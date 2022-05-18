import { ref } from 'vue';
import { Repo, Tag } from '@/core/interfaces';
import { SortTypeChar, SortTypeStar, SortTypeTime } from '@/core/consts';

export default class RepoStore {
  readonly repos = ref<Array<Repo>>([]);

  readonly filterTag = ref<string | null>(null);

  readonly filterLang = ref<string | null>(null);

  readonly filterUnTagged = ref(false);

  readonly sortBy = ref(0);

  readonly selected = ref<Repo | null>(null);

  readonly tags = ref<Array<Tag>>([]);

  readonly repoTags = ref<{[index: string]: string[]}>({});

  filterBy(tag: string = '', lang: string = '', untagged: boolean = false) {
    this.filterTag.value = tag === '' ? null : tag;
    this.filterLang.value = lang === '' ? null : lang;
    this.filterUnTagged.value = untagged;
  }

  sort(by: number) {
    this.sortBy.value = by;
  }

  setRepos(repos: Array<Repo>) {
    this.repos.value = repos;
  }

  getRepos(): Array<Repo> {
    return this.repos.value.filter((item) => {
      if (this.filterLang.value && item.language !== this.filterLang.value) {
        return false;
      }
      const tags = this.getRepoTag(item.id);
      if (this.filterTag.value && tags.indexOf(this.filterTag.value) === -1) {
        return false;
      }
      if (this.filterUnTagged.value && tags.length !== 0) {
        return false;
      }
      return true;
    }).sort((itemA, itemB) => {
      switch (this.sortBy.value) {
        case SortTypeTime:
          return itemA.updated_at < itemB.updated_at ? 1 : -1;
        case SortTypeStar:
          return itemA.stargazers_count < itemB.stargazers_count ? 1 : -1;
        case SortTypeChar:
          return itemA.name > itemB.name ? 1 : -1;
        default:
          return itemA.updated_at < itemB.updated_at ? 1 : -1;
      }
    });
  }

  setTags(tags: Array<Tag>) {
    this.tags.value = tags;
  }

  addTag(tag: string) {
    this.tags.value.push({ tag, repo_count: 0 });
  }

  setRepoTags(data: {[index:string]: string[]}) {
    this.repoTags.value = data;
  }

  setRepoTag(repoId: number, tags: string[]) {
    const org = this.repoTags.value[String(repoId)] || [];
    this.repoTags.value[String(repoId)] = tags;
    const orgSet = new Set(org);
    const newSet = new Set(tags);
    // eslint-disable-next-line no-restricted-syntax
    for (const t of this.tags.value) {
      if (orgSet.has(t.tag)) {
        t.repo_count -= 1;
      }
      if (newSet.has(t.tag)) {
        t.repo_count += 1;
      }
    }

    const tagSet = new Set(this.tags.value.map((t) => t.tag));
    tags.forEach((t) => {
      if (!tagSet.has(t)) {
        this.tags.value.push({ tag: t, repo_count: 1 });
      }
    });
  }

  getRepoTag(repoId: number): string[] {
    const tags = this.repoTags.value[String(repoId)];
    if (tags) {
      return tags;
    }
    return [];
  }

  deleteTag(tag: string) {
    this.tags.value = this.tags.value.filter((t) => t.tag !== tag);
    const repoTags = this.repoTags.value;
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const repoId in repoTags) {
      repoTags[repoId] = repoTags[repoId].filter((t) => t !== tag);
    }
    this.repoTags.value = repoTags;
  }
}
