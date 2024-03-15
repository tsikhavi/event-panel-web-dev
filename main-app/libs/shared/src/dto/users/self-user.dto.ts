import { Expose } from 'class-transformer';

export class SelfUserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  firstName: null | string;

  @Expose()
  lastName: null | string;
}
