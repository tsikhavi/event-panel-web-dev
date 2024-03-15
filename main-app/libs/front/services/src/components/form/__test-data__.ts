import { IsString, MinLength } from 'class-validator';

export const errorMessage = 'Error Message';

export class TestDto {
  @IsString()
  @MinLength(3, { message: errorMessage })
  firstName: string;

  @IsString()
  lastName: string;
}

export const testForm: TestDto = {
  firstName: 'Rick',
  lastName: 'Sanchez',
};
