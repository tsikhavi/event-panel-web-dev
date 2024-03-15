import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User } from '../entities/user.entity';

export const GetSelf = createParamDecorator((_, ctx: ExecutionContext): User => {
  const rec = ctx.switchToHttp().getRequest();
  return rec.user;
});
