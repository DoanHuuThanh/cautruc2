import { StatusCode } from '../constains/status-code';

export class ResponseResult<T> {
  // Mã code trả về
  statusCode: StatusCode;

  // message lỗi
  message: string;

  // Có thành công không
  isSuccess: boolean;

  // Dữ liệu trả về
  data: T;
}
