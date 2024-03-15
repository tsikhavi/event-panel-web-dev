import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'NotNullTogatherValidator', async: false })
export class NotNullTogatherValidator implements ValidatorConstraintInterface {
  validate(value: null | number, args: ValidationArguments) {
    const otherFieldValue = (args.object as never)[args.constraints[0]];
    return value !== null || otherFieldValue !== null;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} & ${args.constraints[0]} must not be null together`;
  }
}
