import { Transform, TransformFnParams } from 'class-transformer';
import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @Length(3, 48)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;

  @IsString()
  @IsOptional()
  @Length(0, 1000)
  @Transform(({ value }: TransformFnParams) => value?.trim() || '')
  description?: string;

  @IsUUID()
  workspaceId: string;
}
