// src/types/express-session.d.ts
import 'express-session';
import { Admin } from 'src/share/entities/admin.entity';

declare module 'express-session' {
  interface Session {
    admin?: any;
  }
}