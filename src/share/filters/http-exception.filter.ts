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
import { ErrorResponse } from '../dto/error-response.dto';
import { AppException } from '../exceptions/app.exception';
import { ErrorCodes } from '../constains/error-code';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    if (exception instanceof AppException) {
      const errorCode = exception.getResponse() as string;
      const errorResponse: ErrorResponse = {
        code: ErrorCodes[errorCode].code,
        message: ErrorCodes[errorCode].msg,
        timestamp: new Date().toISOString(),
        path: request.url,
      };
      response.status(status).json(errorResponse);
    } else if (exception instanceof HttpException) {
      let code = ErrorCodes.INTERNAL_SERVER_ERROR.code;
      switch (exception.constructor) {
        case BadRequestException:
          code = ErrorCodes.BAD_REQUEST.code;
          break;
        case UnauthorizedException:
          code = ErrorCodes.UNAUTHORIZED.code;
          break;
        case ForbiddenException:
          code = ErrorCodes.FORBIDDEN.code;
          break;
        default:
          code = ErrorCodes.INTERNAL_SERVER_ERROR.code;
      }
      const errorResponse: ErrorResponse = {
        code: code,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      };
      response.status(status).json(errorResponse);
    } else {
      const errorResponse: ErrorResponse = {
        code: ErrorCodes.INTERNAL_SERVER_ERROR.code,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      };
      response.status(status).json(errorResponse);
    }
  }
}
