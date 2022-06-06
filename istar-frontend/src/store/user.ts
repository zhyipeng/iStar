import { UserInfo } from '@/core/interfaces';
import { ref } from 'vue';

function getUnknownUserInfo(): UserInfo {
  return {
    username: '',
    avatar: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    followers: 0,
    following: 0,
  };
}

const UserInfoCacheKey = 'iStarUserInfo';
const TokenCacheKey = 'iStarToken';

export default class UserStore {
  token: string = '';

  accessToken: string = '';

  userinfo = ref<UserInfo>(getUnknownUserInfo());

  constructor() {
    const tokenCache = localStorage.getItem(UserInfoCacheKey);
    if (tokenCache) {
      this.token = tokenCache;
    }
  }

  setToken(token: string, accessToken: string) {
    localStorage.setItem(UserInfoCacheKey, token);
    localStorage.setItem(TokenCacheKey, accessToken);
    this.token = token;
    this.accessToken = accessToken;
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
    this.accessToken = '';
    if (refresh) {
      window.location.reload();
    }
  }
}
