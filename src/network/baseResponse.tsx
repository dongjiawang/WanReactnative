export class BaseResponse<T> {
  errorCode: number = 0;
  errorMsg: string = '';
  data?: T = undefined;
}
