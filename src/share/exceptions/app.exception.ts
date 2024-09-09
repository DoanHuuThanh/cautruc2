import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../constains/error-code';

export class AppException extends HttpException {
  constructor(errorCode: ErrorCode) {
    super(errorCode.code, errorCode.status, {});
  }
}
