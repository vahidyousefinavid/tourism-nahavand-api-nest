import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async onApplicationBootstrap() {
    const exists = await this.repo.findOne({ where: { username: 'admin' } });
    if (!exists) {
      const hash = await bcrypt.hash('admin123', 10);
      await this.repo.save({ username: 'admin', password: hash, role: 'admin' });
      console.log('✅ Default admin user created: admin / admin123');
    }
  }

  findByUsername(username: string): Promise<User | null> {
    return this.repo.findOne({ where: { username } });
  }
}
