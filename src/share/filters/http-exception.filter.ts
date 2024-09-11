import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppException } from '../exceptions/app.exception';
import { ResponseResult } from '../models/response-result';
import { ErrorCode } from '../constains/error-code';
import { StatusCode } from '../constains/status-code';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const rs = new ResponseResult<null>();
    let message = '';
    let statusCode = StatusCode.InternalServer;
    if (exception instanceof AppException) {
      const errorCode = exception.getResponse() as string;
      statusCode = ErrorCode[errorCode].code;
      message = ErrorCode[errorCode].msg;
    } else if (exception instanceof HttpException) {
      let statusCode = ErrorCode.INTERNAL_SERVER_ERROR.code;
      switch (exception.constructor) {
        case BadRequestException:
          statusCode = ErrorCode.BAD_REQUEST.code;
          break;
        case UnauthorizedException:
          statusCode = ErrorCode.UNAUTHORIZED.code;
          break;
        case ForbiddenException:
          statusCode = ErrorCode.FORBIDDEN.code;
          break;
        default:
          statusCode = ErrorCode.INTERNAL_SERVER_ERROR.code;
      }
      message = exception.message;
    } else {
      statusCode = ErrorCode.INTERNAL_SERVER_ERROR.status;
      message = exception.message;
    }

    rs.isSuccess = false;
    rs.statusCode = statusCode;
    rs.message = message;

    response.status(status).json(rs);
  }
}
