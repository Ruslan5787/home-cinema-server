import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function MaxCurrentYear(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'MaxCurrentYear',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const currentYear = new Date().getFullYear();
          return typeof value === 'number' && value <= currentYear;
        },
        defaultMessage(args: ValidationArguments) {
          return `Год производства не может быть больше ${new Date().getFullYear()}.`;
        },
      },
    });
  };
}
