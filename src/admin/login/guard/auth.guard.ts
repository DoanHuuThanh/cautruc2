// src/auth/admin.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request, Response } from 'express';

interface RequestAdmin extends Request {
  admin: any;
}

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request: RequestAdmin = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    
    let admin = request.session.admin;
    if (!admin) {
      admin = request.cookies?.admin;
    }

    if (admin && request.path === '/admin/login') {
      response.redirect('/admin/post-content');
      return false;
    }

    if (admin) {
      request.admin = admin;
      return true;
    }

    response.redirect('/admin/login'); 
    return false;
  }
}
