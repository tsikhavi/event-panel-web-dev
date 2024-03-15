import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPassword(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(password: string): boolean {
          const regex = /^.{8,}$/;
          return regex.test(password);
        },
        defaultMessage(): string {
          return 'Use 8 characters or more for your password.';
        },
      },
    });
  };
}
