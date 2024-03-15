import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Length(3, 24)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiPropertyOptional({ type: String })
  firstName: string;

  @IsString()
  @IsOptional()
  @Length(3, 24)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiPropertyOptional({ type: String })
  lastName: string;
}
