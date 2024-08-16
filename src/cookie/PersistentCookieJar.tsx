import {Cookie} from './cookie';
import CookieUtil from './CookieUtil';
import KVCookiePersistor from './KVCookiePersistor';

class PersistenCookieJar {
  static saveFromResponse(url: URL, cookies: Cookie[]) {
    KVCookiePersistor.saveAll(
      PersistenCookieJar.filterPersistentCookies(cookies),
    );
  }

  static async loadForRequest(): Promise<Cookie[]> {
    const cookies = await KVCookiePersistor.loadAll();

    return cookies.filter(cookie => {
      return !CookieUtil.isExpired(cookie);
    });
  }

  static clear() {
    KVCookiePersistor.clear();
  }

  private static filterPersistentCookies(cookies: Cookie[]): Cookie[] {
    return cookies.filter(cookie => {
      return cookie.persistent;
    });
  }
}

export default PersistenCookieJar;
