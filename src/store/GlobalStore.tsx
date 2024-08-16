import {makeAutoObservable} from 'mobx';

class GlobalStore {
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }
}

export default GlobalStore;
