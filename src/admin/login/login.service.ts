import { Inject, Injectable } from '@nestjs/common';
import { Admin } from 'src/share/entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {
  constructor(
    @Inject('ADMIN_REPOSITORY')
    private adminRepository: Repository<Admin>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const admin = await this.adminRepository.findOne({
      where: { username },
    });
  
    if (admin && admin.password === password) {
      const { password, ...result } = admin;
      return result;
    }
  
    return null;
  }
}
