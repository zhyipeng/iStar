import { UserInfo } from '@/core/interfaces';
import { ref } from 'vue';

function getUnknownUserInfo(): UserInfo {
  return {
    avatar: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    followers: 0,
    following: 0,
  };
}

const UserInfoCacheKey = 'iStarUserInfo';

export default class UserStore {
  token: string = '';

  userinfo = ref<UserInfo>(getUnknownUserInfo());

  constructor() {
    const tokenCache = localStorage.getItem(UserInfoCacheKey);
    if (tokenCache) {
      this.token = tokenCache;
    }
  }

  setToken(token: string) {
    localStorage.setItem(UserInfoCacheKey, token);
    this.token = token;
  }

  setUserInfo(info: UserInfo) {
    this.userinfo.value = info;
  }

  isLogin(): boolean {
    return this.token !== '';
  }

  clearUserInfo(refresh: boolean = true) {
    this.userinfo.value = getUnknownUserInfo();
    this.token = '';
    if (refresh) {
      window.location.reload();
    }
  }
}
