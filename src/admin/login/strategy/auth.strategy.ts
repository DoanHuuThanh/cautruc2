import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginService } from '../login.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private loginService: LoginService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    
    const admin = await this.loginService.validateUser(username, password);    
    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}
