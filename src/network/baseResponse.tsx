export class BaseResponse<T> {
  errorCode: number = 0;
  errorMsg: string = '';
  data?: T = undefined;

  isSuccess(): boolean {
    return this.errorCode === 0;
  }

  isSuccessWithData(): boolean {
    return this.errorCode === 0 && this.data !== undefined;
  }

  getDataOrThrow(): T {
    return this.data!;
  }
}
