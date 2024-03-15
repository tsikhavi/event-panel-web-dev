import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID, Max, Min, Validate } from 'class-validator';

import { NotNullTogatherValidator } from '../../core/validators/not-null-togather.validator';
import { NullOrNumberInRangeValidator } from '../../core/validators/null-or-number-in-range.validator';

export class CreateTransactionDto {
  @Min(9)
  @Max(99999)
  @IsNumber()
  @ApiProperty({ type: Number })
  totalPrice: number;

  @Validate(NotNullTogatherValidator, ['amountOfMembers'])
  @Validate(NullOrNumberInRangeValidator, [{ min: 30, max: 365 }])
  @ApiProperty({ nullable: true, type: Number })
  amountOfDays: null | number;

  @Validate(NotNullTogatherValidator, ['amountOfDays'])
  @Validate(NullOrNumberInRangeValidator, [{ min: 1, max: 1000 }])
  @ApiProperty({ nullable: true, type: Number })
  amountOfMembers: null | number;

  @IsUUID()
  @ApiProperty({ type: String })
  workspaceId: string;
}
