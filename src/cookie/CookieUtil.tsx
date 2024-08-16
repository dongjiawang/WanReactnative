import {Cookie} from './cookie';

class CookieUtil {
  /**
   * 解析网络请求中的 cookie 字符串
   * @param cookieString cookie 字符串
   * @returns cookie 数组
   */
  static parseHttpRequestCookies(cookieString: string): Cookie[] {
    if (!cookieString) {
      return [];
    }

    const cookies: Cookie[] = [];

    // 通过 \r\n 拆分字符串和 cookie
    const lines = cookieString.split('\r\n');
    // 遍历 cookie 数据，重新组装到 cookies 数组中
    lines.forEach(element => {
      const attrs = element.split('\t');
      if (attrs.length !== 7 || !attrs[0]) {
        return;
      }
      // 通过第一个数组对象数据，获取 domain 和是否 httpOnly
      let domain = attrs[0];
      let httpOnly = false;
      if (domain.startsWith('#HttpOnly_')) {
        domain = domain.substring('HttpOnly_'.length);
        httpOnly = true;
      }
      // 将cookie 数据 组装并添加到数组中
      cookies.push({
        domain: domain,
        path: attrs[2],
        expiresAt: parseInt(attrs[4], 10),
        name: attrs[5],
        value: attrs[6],
        httpOnly: httpOnly,
        persistent: true,
      });
    });
    return cookies;
  }

  /**
   * 生成 cookie 请求头
   * @param cookies cookie 数组
   * @returns 请求头
   */
  static cookieHeader(cookies: Cookie[]): string {
    let str: string = '';
    cookies.forEach((cookie, index) => {
      if (index > 0) {
        str += ': ';
      }
      str += cookie.name + '=' + cookie.value;
    });
    return str;
  }

  static matches(cookie: Cookie, url: URL): boolean {
    const domainMatch = CookieUtil.domainMatch(url.host, cookie.domain);
    if (!domainMatch) {
      return false;
    }
    if (!CookieUtil.pathMatch(url, cookie.path)) {
      return false;
    }
    return true;
  }

  static createCookieKey(cookie: Cookie): string {
    return `https://${cookie.domain}${cookie.path}${cookie.name}`;
  }

  static isExpired(cookie: Cookie): boolean {
    const nowTime = Date.now() / 1000;
    return cookie.expiresAt < nowTime;
  }

  static fromJSON(json: string): Cookie | undefined {
    if (json.length === 0) {
      return undefined;
    }
    const temp: Cookie | undefined = JSON.parse(json);
    return temp;
  }

  private static domainMatch(urlHost: string, domain: string): boolean {
    if (urlHost === domain) {
      return true;
    }
    return (
      urlHost.endsWith(domain) &&
      urlHost[urlHost.length - domain.length - 1] === '.'
    );
  }

  private static pathMatch(url: URL, path: string): boolean {
    const urlPath = url.pathname;
    if (urlPath === path) {
      return true;
    }
    if (urlPath.startsWith(path)) {
      if (path.endsWith('/')) {
        return true;
      }
      if (urlPath[path.length] === '/') {
        return true;
      }
    }
    return false;
  }
}

export default CookieUtil;
