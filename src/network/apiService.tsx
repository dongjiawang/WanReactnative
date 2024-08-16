import {UserModel} from '../model/userModel';
import Network from './network';

const baseUrl = 'https://www.wanandroid.com';

function login(username: string, password: string) {
  return Network.post<UserModel>({
    url: baseUrl + '/user/login',
    params: {
      username: username,
      password: password,
    },
  });
}

function logout() {
  return Network.get<string>({
    url: baseUrl + '/user/logout/json',
  });
}

export default {login, logout};
