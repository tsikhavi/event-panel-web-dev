import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'NullOrNumberInRangeValidator', async: false })
export class NullOrNumberInRangeValidator implements ValidatorConstraintInterface {
  validate(value: null | number, args: ValidationArguments) {
    const { min, max } = args.constraints[0];
    if (value === null) return true;
    return value >= min && value <= max;
  }

  defaultMessage(args: ValidationArguments) {
    const { min, max } = args.constraints[0];
    return `${args.property} must be null or number in the range from ${min} to ${max}`;
  }
}
