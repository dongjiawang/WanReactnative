import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import CookieUtil from '../cookie/CookieUtil';
import PersistedCookieJar from '../cookie/PersistentCookieJar';
import {BaseResponse} from './baseResponse';
import Toast from 'react-native-toast-message';

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

    try {
      const response = await this.instance.request<any, AxiosResponse>({
        ...config,
        headers: {
          'Content-Type':
            config.method === 'POST'
              ? 'application/x-www-form-urlencoded'
              : 'application/json',
          Cookie: CookieUtil.cookieHeader(cookies),
        },
      });

      if (response.status === 200) {
        const cookieString = response.headers['set-cookie']?.join('\r\n');
        if (cookieString) {
          PersistedCookieJar.saveFromResponse(
            CookieUtil.parseHttpRequestCookies(cookieString),
          );
        }

        const result = Network.safeJsonParse<BaseResponse<T>>(response.data);
        if (result) {
          return result;
        }
        return new BaseResponse<T>();
      } else {
        const errorResponse = new BaseResponse<T>();
        errorResponse.errorCode = response.status;
        errorResponse.errorMsg = `HTTP ${response.status}, ${JSON.stringify(
          response.data,
        )}`;
        Toast.show({
          type: 'error',
          text1: errorResponse.errorMsg,
          position: 'bottom',
        });
        throw errorResponse;
      }
    } catch (err) {
      if (err instanceof BaseResponse) {
        throw err;
      } else {
        const errorResponse = new BaseResponse<T>();
        errorResponse.errorCode = -1;
        errorResponse.errorMsg = (err as Error).message;

        const errs = errorResponse.errorMsg;
        Toast.show({
          type: 'info',
          text1: errs,
          position: 'bottom',
        });
        throw errorResponse;
      }
    }
  }

  static safeJsonParse<T>(json: any): T | null {
    try {
      return JSON.parse(JSON.stringify(json)) as T;
    } catch (error) {
      console.error('JSON parse error:', error);
      return null;
    }
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
    return Network.shared().request<T>(config);
  }

  static post<T = any>(config: AxiosRequestConfig): Promise<BaseResponse<T>> {
    config.method = 'POST';
    return Network.shared().request<T>(config);
  }
}

export default Network;
