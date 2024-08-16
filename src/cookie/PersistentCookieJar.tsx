import {Cookie} from './cookie';
import CookieUtil from './CookieUtil';
import KVCookiePersister from './KVCookiePersistor';

class PersistentCookieJar {
  static saveFromResponse(cookies: Cookie[]) {
    KVCookiePersister.saveAll(
      PersistentCookieJar.filterPersistentCookies(cookies),
    );
  }

  static async loadForRequest(): Promise<Cookie[]> {
    const cookies = await KVCookiePersister.loadAll();

    return cookies.filter(cookie => {
      return !CookieUtil.isExpired(cookie);
    });
  }

  static clear() {
    KVCookiePersister.clear();
  }

  private static filterPersistentCookies(cookies: Cookie[]): Cookie[] {
    return cookies.filter(cookie => {
      return cookie.persistent;
    });
  }
}

export default PersistentCookieJar;
