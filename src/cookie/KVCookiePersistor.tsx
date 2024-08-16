import AsyncStorage from '@react-native-async-storage/async-storage';
import {Cookie} from './cookie';
import CookieUtil from './CookieUtil';
import LogUtil from '../utils/LogUtil';

const KEY_COOKIE_KEYS = 'COOKIE_KIES';

class KVCookiePersistor {
  static async loadAll(): Promise<Cookie[]> {
    const cookies: Cookie[] = [];

    try {
      const keys = await AsyncStorage.getItem(KEY_COOKIE_KEYS);
      if (keys) {
        const keyArray = JSON.parse(keys);
        for (const key of keyArray) {
          const value = await AsyncStorage.getItem(key);
          if (value) {
            const cookie = CookieUtil.fromJSON(value);
            if (cookie) {
              cookies.push(cookie);
            }
          }
        }
      }
    } catch (error) {
      LogUtil.error('获取本地 cookie 失败');
    }
    return cookies;
  }

  static async saveAll(cookies: Cookie[]) {
    try {
      cookies.forEach(async cookie => {
        await AsyncStorage.setItem(
          CookieUtil.createCookieKey(cookie),
          JSON.stringify(cookie),
        );
      });
      const keys = await AsyncStorage.getItem(KEY_COOKIE_KEYS);
      if (keys) {
        const keyArray = JSON.parse(keys) as string[];
        cookies.forEach(cookie => {
          const key = CookieUtil.createCookieKey(cookie);
          if (keyArray.indexOf(key) < 0) {
            keyArray.push(key);
          }
        });
        AsyncStorage.setItem(KEY_COOKIE_KEYS, JSON.stringify(keyArray));
      }
    } catch (error) {
      LogUtil.error('保存 cookie 失败');
    }
  }

  static async removeAll(cookies: Cookie[]) {
    try {
      const keys = await AsyncStorage.getItem(KEY_COOKIE_KEYS);
      if (keys) {
        const keyArray = JSON.parse(keys) as string[];
        cookies.forEach(async cookie => {
          const key = CookieUtil.createCookieKey(cookie);
          await AsyncStorage.removeItem(key);
          const index = keyArray.indexOf(key);
          keyArray.splice(index, 1);
        });
        AsyncStorage.setItem(KEY_COOKIE_KEYS, JSON.stringify(keyArray));
      }
    } catch (error) {
      LogUtil.error('移除 cookie 失败');
    }
  }

  static async clear() {
    try {
      const keys = await AsyncStorage.getItem(KEY_COOKIE_KEYS);
      if (keys) {
        const keyArray = JSON.parse(keys) as string[];
        keyArray.forEach(async key => {
          await AsyncStorage.removeItem(key);
        });
        await AsyncStorage.removeItem(KEY_COOKIE_KEYS);
      }
    } catch (error) {
      LogUtil.error('移除 cookie 失败');
    }
  }
}

export default KVCookiePersistor;
