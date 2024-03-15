import { workspace } from '../../__test-data__/workspaces.test-data';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Transaction } from '../entities/transaction.entity';

export const workspaceId = 'workspace-id-123';

export const transaction: Transaction = {
  workspace,
  id: 'transaction-id-123',
  totalPrice: 180,
  amountOfDays: 60,
  amountOfMembers: 9,
  createdAt: new Date(),
};

export const transactionsList: Transaction[] = [
  {
    workspace,
    id: 'transaction-id-123',
    totalPrice: 90,
    amountOfDays: 30,
    amountOfMembers: 9,
    createdAt: new Date(),
  },
  {
    workspace,
    id: 'transaction-id-456',
    totalPrice: 180,
    amountOfDays: 60,
    amountOfMembers: 9,
    createdAt: new Date(),
  },
];

export const createTransaction: CreateTransactionDto = {
  totalPrice: 180,
  amountOfDays: 60,
  amountOfMembers: 9,
  workspaceId: 'workspace-id-123',
};
