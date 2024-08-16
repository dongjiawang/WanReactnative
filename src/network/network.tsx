import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import CookieUtil from '../cookie/CookieUtil';
import PersistedCookieJar from '../cookie/PersistentCookieJar';
import {BaseResponse} from './baseResponse';

interface HttpRequestConfig extends AxiosRequestConfig {
  showLoading?: boolean; //是否展示请求loading
}

class Network {
  private static instance: Network;

  config: HttpRequestConfig;
  instance: AxiosInstance;

  private constructor(options: HttpRequestConfig) {
    this.config = options;
    this.instance = axios.create(options);
  }

  async request<T = any>(config: AxiosRequestConfig): Promise<BaseResponse<T>> {
    const cookies = await PersistedCookieJar.loadForRequest();

    return new Promise<BaseResponse<T>>((resolve, reject) => {
      this.instance
        .request<any, AxiosResponse>({
          ...config,
          headers: {
            'Content-Type':
              config.method === 'POST'
                ? 'application/x-www-form-urlencoded'
                : "'application/json'",
            Cookie: CookieUtil.cookieHeader(cookies),
          },
        })
        .then(res => {
          const response = new BaseResponse<T>();
          if (res.status === 200) {
            const cookieString = res.headers['set-cookie']?.join('\r\n');
            if (cookieString) {
              PersistedCookieJar.saveFromResponse(
                CookieUtil.parseHttpRequestCookies(cookieString),
              );
            }

            const result = JSON.parse(res.data) as BaseResponse<T>;
            response.errorCode = result.errorCode;
            response.errorMsg = result.errorMsg;
            response.data = result.data;
            resolve(response);
          } else {
            response.errorCode = res.status;
            response.errorMsg = `HTTP ${res.status}, ${JSON.stringify(
              res.data,
            )}`;
            reject(response);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static shared(): Network {
    if (Network.instance === undefined) {
      Network.instance = new Network({timeout: 10 * 1000});
    }
    return Network.instance;
  }

  static clearCookie() {
    PersistedCookieJar.clear();
  }

  static get<T = any>(config: AxiosRequestConfig): Promise<BaseResponse<T>> {
    config.method = 'GET';
    return Network.shared().request(config);
  }

  static post<T = any>(config: AxiosRequestConfig): Promise<BaseResponse<T>> {
    config.method = 'POST';
    return Network.shared().request(config);
  }
}

export default Network;
