import { Transform, TransformFnParams } from 'class-transformer';
import { IsString, IsUUID, Length } from 'class-validator';

export class CreateSourceDto {
  @IsString()
  @Length(3, 48)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;

  @IsUUID()
  workspaceId: string;
}
