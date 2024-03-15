import { Expose, Transform } from 'class-transformer';

import { Source } from './source.dto';

export class EventDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  sources: Source[];

  @Expose()
  @Transform(({ obj }) => obj.workspace.id)
  workspaceId: string;
}
