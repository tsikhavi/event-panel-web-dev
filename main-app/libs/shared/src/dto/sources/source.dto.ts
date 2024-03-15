import { Expose, Transform } from 'class-transformer';

export class SourceDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj }) => obj.workspace.id)
  workspaceId: string;
}
