import { IsString } from 'class-validator';

import { IsPassword } from '../../decorators/validations.decorator';

export class ChangePasswordDto {
  @IsString()
  token: string;

  @IsPassword()
  password: string;
}

export class ChangePasswordNoTokenDto {
  @IsPassword()
  password: string;
}
