import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { LocalStrategy } from './strategy';
import { adminProviders } from 'src/share/providers/admin.provider';

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [LoginService, LocalStrategy, ...adminProviders],
})
export class LoginModule {}
