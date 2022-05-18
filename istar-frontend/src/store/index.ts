import UserStore from '@/store/user';
import RepoStore from '@/store/repo';

class Store {
  readonly user: UserStore = new UserStore();

  readonly repo: RepoStore = new RepoStore();
}

const store = new Store();
export default store;
