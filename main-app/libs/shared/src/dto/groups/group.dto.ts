import { Expose, Transform } from 'class-transformer';

export class GroupDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @Transform(({ obj }) => obj.workspace.id)
  workspaceId: string;
}
