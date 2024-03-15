import { IsEmail, IsNotEmpty } from 'class-validator';

import { IsPassword } from '../../decorators/validations.decorator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name should not be empty.' })
  lastName: string;

  @IsEmail({}, { message: 'Please enter a valid email.' })
  email: string;

  @IsPassword()
  password: string;
}
