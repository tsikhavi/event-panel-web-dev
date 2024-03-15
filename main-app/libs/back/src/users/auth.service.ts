import { ChangePasswordDto } from '@eventpanel/shared/dto/users/change-password.dto';
import { CheckEmailDto } from '@eventpanel/shared/dto/users/check-email.dto';
import { CreateUserDto } from '@eventpanel/shared/dto/users/create-user.dto';
import { SignInUserDto } from '@eventpanel/shared/dto/users/signin-user.dto';
import { TokenUserDto } from '@eventpanel/shared/dto/users/token-user.dto';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  getToken(id: string): string {
    return this.jwtService.sign({ id });
  }

  getIdFromToken(token: string): null | string {
    const result = this.jwtService.decode(token, { complete: true }) as null | { payload: { id: string; exp: number } };
    const currentTime = Date.now() / 1000;

    if (result && result.payload.exp > currentTime) return result.payload.id;

    return null;
  }

  async signUp(createUser: CreateUserDto): Promise<TokenUserDto> {
    const user = await this.usersService.create(createUser);
    const accessToken = this.getToken(user.id);

    return { ...user, accessToken };
  }

  async signIn({ email, password }: SignInUserDto): Promise<TokenUserDto> {
    try {
      const user = await this.usersService.findOne({ email });
      const isPasswordValid = await bcrypt.compare(password, user.hash);

      if (isPasswordValid) {
        const accessToken = this.getToken(user.id);
        return { ...user, accessToken };
      }
    } catch {
      throw new UnauthorizedException('Incorrect email or password.');
    }
    throw new UnauthorizedException('Incorrect email or password.');
  }

  async checkEmail({ email }: CheckEmailDto): Promise<{ token: string }> {
    const user = await this.usersService.findOne({ email });
    const token = this.getToken(user.id);
    //TODO The e-mail with token to reset password should be send here
    return { token };
  }

  async changePassword({ token, password }: ChangePasswordDto): Promise<TokenUserDto> {
    const userId = this.getIdFromToken(token);

    if (!userId) throw new BadRequestException('token is invalid or has expired');

    const user = await this.usersService.changePassword(userId, password);
    const accessToken = this.getToken(userId);

    return { ...user, accessToken };
  }
}
