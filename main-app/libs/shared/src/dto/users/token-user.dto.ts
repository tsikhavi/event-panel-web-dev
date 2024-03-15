import { Expose } from 'class-transformer';

export class TokenUserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  firstName: null | string;

  @Expose()
  lastName: null | string;

  @Expose()
  accessToken: string;
}
