import { Transform, TransformFnParams } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @Length(3, 48)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;

  @IsString()
  @IsOptional()
  @Length(0, 1000)
  @Transform(({ value }: TransformFnParams) => value?.trim() || '')
  description?: string;
}
