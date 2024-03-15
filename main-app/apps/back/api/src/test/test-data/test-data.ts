import { getUUID } from '../test-utils/test-utils';

export const getFindByIdErrorCases: { case: string; id: string; error: string; code: number }[] = [
  {
    case: 'id is null',
    id: null,
    error: 'Validation failed (uuid is expected)',
    code: 400,
  },
  {
    case: 'id is 123',
    id: '123',
    error: 'Validation failed (uuid is expected)',
    code: 400,
  },
  {
    case: 'id not of UUID format',
    id: 'not-uuid',
    error: 'Validation failed (uuid is expected)',
    code: 400,
  },
  {
    case: 'id is random UUID',
    id: getUUID(),
    error: 'not found',
    code: 404,
  },
];
