import { ChangePasswordDto } from '@eventpanel/shared/dto/users/change-password.dto';
import { CheckEmailDto } from '@eventpanel/shared/dto/users/check-email.dto';
import { CreateUserDto } from '@eventpanel/shared/dto/users/create-user.dto';
import { SelfUserDto } from '@eventpanel/shared/dto/users/self-user.dto';
import { UpdateUserDto } from '@eventpanel/shared/dto/users/update-user.dto';

import { getJWTToken, getUUID } from '../test-utils/test-utils';

const email = 'test@email.com';
const lastName = 'Elon';

export const getSelfUserPros = (props: Partial<Omit<SelfUserDto, 'id'>> = {}): Omit<SelfUserDto, 'id'> => ({
  email,
  firstName: null,
  lastName: null,
  ...props,
});

export const getCreateUserProps = (props: Partial<CreateUserDto> = {}): CreateUserDto => ({
  lastName,
  email,
  password: 'password123',
  ...props,
});

export const getChangePasswordProps = (props: Partial<ChangePasswordDto> = {}): ChangePasswordDto => ({
  token: 'some token',
  password: 'password123',
  ...props,
});

export const getUpdateUserProps = (props: Partial<UpdateUserDto> = {}): UpdateUserDto => ({
  firstName: null,
  lastName: null,
  ...props,
});

export const getSignErrorCases: { case: string; props: CreateUserDto; error: string }[] = [
  {
    case: 'email is not an email',
    props: getCreateUserProps({ email: 'notEmail' }),
    error: 'email must be an email',
  },
  {
    case: 'email is undefined',
    props: getCreateUserProps({ email: undefined }),
    error: 'email must be an email',
  },
  {
    case: 'password is undefined',
    props: getCreateUserProps({ password: undefined }),
    error: 'password should be min 8 chars with letters & numbers',
  },
  {
    case: 'password have only letters',
    props: getCreateUserProps({ password: 'password without numbers' }),
    error: 'password should be min 8 chars with letters & numbers',
  },
  {
    case: 'password have only numbers',
    props: getCreateUserProps({ password: '123456789' }),
    error: 'password should be min 8 chars with letters & numbers',
  },
  {
    case: 'password length is less than 8 characters',
    props: getCreateUserProps({ password: 'no123' }),
    error: 'password should be min 8 chars with letters & numbers',
  },
];

export const getCheckEmailErrorCases: { case: string; props: CheckEmailDto; error: string }[] = [
  { case: 'is not an email', props: { email: 'notEmail' }, error: 'email must be an email' },
  { case: 'is not exists', props: { email: 'notExists@mail.com' }, error: 'user not found' },
];

export const getChangePasswordErrorCases: { case: string; props: ChangePasswordDto; error: string }[] = [
  {
    case: 'password have only letters',
    props: getChangePasswordProps({ password: 'password without numbers' }),
    error: 'password should be min 8 chars with letters & numbers',
  },
  {
    case: 'password have only numbers',
    props: getChangePasswordProps({ password: '123456789' }),
    error: 'password should be min 8 chars with letters & numbers',
  },
  {
    case: 'password length is less than 8 characters',
    props: getChangePasswordProps({ password: 'no123' }),
    error: 'password should be min 8 chars with letters & numbers',
  },
  {
    case: 'token is null',
    props: getChangePasswordProps({ token: null }),
    error: 'token must be a string',
  },
  {
    case: 'token is invalid',
    props: getChangePasswordProps(),
    error: 'token is invalid or has expired',
  },
  {
    case: 'token has expired',
    props: getChangePasswordProps({ token: getJWTToken({ id: getUUID() }, -1000) }),
    error: 'token is invalid or has expired',
  },
  {
    case: 'token has invalid userId',
    props: getChangePasswordProps({ token: getJWTToken({ id: getUUID() }, 1000) }),
    error: 'user not found',
  },
];

export const getUpdateSelfResultCases: {
  case: string;
  props: UpdateUserDto;
  result: Omit<SelfUserDto, 'id'>;
}[] = [
  {
    case: 'only userName provided',
    props: getUpdateUserProps({ firstName: 'Rick' }),
    result: getSelfUserPros({ firstName: 'Rick' }),
  },
  {
    case: 'only lastName provided',
    props: getUpdateUserProps({ lastName: 'Sanchez' }),
    result: getSelfUserPros({ lastName: 'Sanchez' }),
  },
  {
    case: 'firstName surrounded by spaces',
    props: getUpdateUserProps({ firstName: '   Rick   ' }),
    result: getSelfUserPros({ firstName: 'Rick' }),
  },
  {
    case: 'lastName surrounded by spaces',
    props: getUpdateUserProps({ lastName: '   Sanchez   ' }),
    result: getSelfUserPros({ lastName: 'Sanchez' }),
  },
];

export const getUpdateSelfErrorCases: { case: string; props: UpdateUserDto; error: string }[] = [
  {
    case: 'firstName is too short',
    props: getUpdateUserProps({ firstName: 'li' }),
    error: 'firstName must be longer than or equal to 3 characters',
  },
  {
    case: 'lastName is too short',
    props: getUpdateUserProps({ lastName: 'li' }),
    error: 'lastName must be longer than or equal to 3 characters',
  },
  {
    case: 'firstName is too long',
    props: getUpdateUserProps({ firstName: 'too long first name to check validation' }),
    error: 'firstName must be shorter than or equal to 24 characters',
  },
  {
    case: 'lastName is too long',
    props: getUpdateUserProps({ lastName: 'too long last name to check validation' }),
    error: 'lastName must be shorter than or equal to 24 characters',
  },
];
