import { CreateTransactionDto } from '@eventpanel/back/transactions/dto/create-transaction.dto';
import { TransactionDto } from '@eventpanel/back/transactions/dto/transaction.dto';

import { getUUID } from '../test-utils/test-utils';

export const getCreateTransactionProps = (props: Partial<CreateTransactionDto> = {}): CreateTransactionDto => ({
  totalPrice: 90,
  amountOfDays: 30,
  amountOfMembers: 9,
  workspaceId: getUUID(),
  ...props,
});

export const getTransactionProps = (
  props: Partial<Omit<TransactionDto, 'id'>> = {}
): Omit<TransactionDto, 'id' | 'workspaceId' | 'createdAt'> => ({
  totalPrice: 90,
  amountOfDays: 30,
  amountOfMembers: 9,
  ...props,
});

export const getCreateTransactionResultCases: {
  case: string;
  props: CreateTransactionDto;
  result: Omit<TransactionDto, 'id' | 'workspaceId' | 'createdAt'>;
}[] = [
  {
    case: 'default body provided',
    props: getCreateTransactionProps(),
    result: getTransactionProps(),
  },
  {
    case: 'amountOfDays is null',
    props: getCreateTransactionProps({ amountOfDays: null }),
    result: getTransactionProps({ amountOfDays: null }),
  },
  {
    case: 'amountOfMembers is null',
    props: getCreateTransactionProps({ amountOfMembers: null }),
    result: getTransactionProps({ amountOfMembers: null }),
  },
];

export const getCreateTransactionErrorCases: { case: string; props: CreateTransactionDto; error: string }[] = [
  {
    case: 'totalPrice is null',
    props: getCreateTransactionProps({ totalPrice: null }),
    error: 'totalPrice must be a number conforming to the specified constraints',
  },
  {
    case: 'totalPrice is 1',
    props: getCreateTransactionProps({ totalPrice: 1 }),
    error: 'totalPrice must not be less than 9',
  },
  {
    case: 'totalPrice is 100000',
    props: getCreateTransactionProps({ totalPrice: 100000 }),
    error: 'totalPrice must not be greater than 99999',
  },
  {
    case: 'amountOfDays is 1',
    props: getCreateTransactionProps({ amountOfDays: 1 }),
    error: 'amountOfDays must be null or number in the range from 30 to 365',
  },
  {
    case: 'amountOfDays is 1000',
    props: getCreateTransactionProps({ amountOfDays: 1000 }),
    error: 'amountOfDays must be null or number in the range from 30 to 365',
  },
  {
    case: 'amountOfMembers is 0',
    props: getCreateTransactionProps({ amountOfMembers: 0 }),
    error: 'amountOfMembers must be null or number in the range from 1 to 1000',
  },
  {
    case: 'amountOfMembers is 10000',
    props: getCreateTransactionProps({ amountOfMembers: 10000 }),
    error: 'amountOfMembers must be null or number in the range from 1 to 1000',
  },
  {
    case: 'amountOfDays is null & amountOfMembers is null',
    props: getCreateTransactionProps({ amountOfDays: null, amountOfMembers: null }),
    error: 'amountOfMembers & amountOfDays must not be null together',
  },
  {
    case: 'workspaceId is null',
    props: getCreateTransactionProps({ workspaceId: null }),
    error: 'workspaceId must be a UUID',
  },
  {
    case: 'workspaceId is 123',
    props: getCreateTransactionProps({ workspaceId: '123' }),
    error: 'workspaceId must be a UUID',
  },
  {
    case: 'workspaceId not of UUID format',
    props: getCreateTransactionProps({ workspaceId: 'not-uuid' }),
    error: 'workspaceId must be a UUID',
  },
  {
    case: 'workspaceId is random UUID',
    props: getCreateTransactionProps({ workspaceId: getUUID() }),
    error: 'workspace not found',
  },
];
