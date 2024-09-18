import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

interface RequestUser extends Request {
    admin: any
}

export const GetAdmin = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const request:RequestUser = context.switchToHttp().getRequest();
    const admin = request.admin;

    return key ? admin?.[key] : admin;
  },
);