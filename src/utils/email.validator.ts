import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
  ValidationArguments as ClassValidatorValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isRFC5321Email', async: false })
export class IsRFC5321EmailConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ClassValidatorValidationArguments) {
    const rfc5321Pattern = /^[\w.%+-]+@([\w-]+\.)+[\w]{2,4}$/i;
    return rfc5321Pattern.test(value);
  }

  defaultMessage(args: ClassValidatorValidationArguments) {
    return 'Invalid RFC 5321 email address';
  }
}

export function IsRFC5321Email(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRFC5321EmailConstraint,
    });
  };
}
