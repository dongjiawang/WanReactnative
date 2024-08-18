import {ArticleListModel} from '../model/articleModel';
import {UserModel} from '../model/userModel';
import {BaseResponse} from './baseResponse';
import Network from './network';

const baseUrl = 'https://www.wanandroid.com';

export function login(username: string, password: string) {
  return Network.post<UserModel>({
    url: baseUrl + '/user/login',
    params: {
      username: username,
      password: password,
    },
  });
}

export function logout() {
  return Network.get<string>({
    url: baseUrl + '/user/logout/json',
  });
}

export function getHotArticleList(
  page: number,
): Promise<BaseResponse<ArticleListModel>> {
  return Network.get<ArticleListModel>({
    url: baseUrl + `/article/list/${page}/json`,
  });
}
