import { Transform, TransformFnParams } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class UpdateWorkspaceDto {
  @IsString()
  @Length(3, 48)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;
}
