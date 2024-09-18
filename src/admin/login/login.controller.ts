import { Controller, Get, Post, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { Admin } from 'src/share/entities/admin.entity';
import { ResponseResult } from 'src/share/models/response-result';
import { AdminGuard } from './guard';
interface RequestAdmin extends Request {
  user: Admin;
}

@Controller('admin/login')
export class LoginController {
  constructor() {}

  @Get()
  @UseGuards(AdminGuard)
  @Render('admin/login/admin-login')
  getLogin() {}

  @Post()
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: RequestAdmin, @Res() res: Response) {
    const result = new ResponseResult();

    if (req.user) {
      if (req.body.remember) {
        res.cookie('admin', req.user, { maxAge: 315576000000, httpOnly: true });
      }
      req.session.admin = req.user;

      result.statusCode = 200;
      result.data = req.user;
    } else {
      result.statusCode = 400;
      result.data = null;
    }

    return res.json(result);
  }
}
