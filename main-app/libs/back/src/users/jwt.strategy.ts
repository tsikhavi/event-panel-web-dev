import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private usersService: UsersService, private configService: ConfigService) {
    super({
      secretOrKey: configService.get('NX_JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate({ id }: { id: string }): Promise<User> {
    this.logger.verbose(`Validate JWT with: ${JSON.stringify({ id })}`);
    const user = await this.usersService.findOne({ id });

    if (!user) throw new UnauthorizedException();
    return user;
  }
}
