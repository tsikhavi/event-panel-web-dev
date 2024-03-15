import { Expose, Transform } from 'class-transformer';

export class TransactionDto {
  @Expose()
  id: string;

  @Expose()
  totalPrice: number;

  @Expose()
  amountOfDays: null | number;

  @Expose()
  amountOfMembers: null | number;

  @Expose()
  createdAt: Date;

  @Expose()
  @Transform(({ obj }) => obj.workspace.id)
  workspaceId: string;
}
