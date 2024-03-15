import { CreateUserDto } from '@eventpanel/shared/dto/users/create-user.dto';
import { UpdateUserDto } from '@eventpanel/shared/dto/users/update-user.dto';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async getHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async create({ email, password, lastName }: CreateUserDto): Promise<User> {
    try {
      const hash = await this.getHash(password);
      const user = await this.repo.create({ email, hash, lastName });

      return await this.repo.save(user);
    } catch (error: any) {
      if (error?.errno === 19) throw new ConflictException('user already exists');

      throw new BadRequestException(error);
    }
  }

  async findOne(args: { id?: string; email?: string }): Promise<User> {
    const user = await this.repo.findOneBy({ ...args });

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async update(id: string, attrs: UpdateUserDto): Promise<User> {
    const user = await this.findOne({ id });
    Object.assign(user, attrs);

    return await this.repo.save(user);
  }

  async changePassword(id: string, password: string): Promise<User> {
    const hash = await this.getHash(password);
    const user = await this.findOne({ id });
    Object.assign(user, { hash });

    return await this.repo.save(user);
  }
}
