import { IsEmail } from 'class-validator';

export class CheckEmailDto {
  @IsEmail({}, { message: 'Please enter a valid email.' })
  email: string;
}
