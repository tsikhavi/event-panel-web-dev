import { Expose } from 'class-transformer';

export class Source {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
