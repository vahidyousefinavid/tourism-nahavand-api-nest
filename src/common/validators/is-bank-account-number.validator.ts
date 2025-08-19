import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'IsBankAccountNumber', async: false })
export class IsBankAccountNumber implements ValidatorConstraintInterface {
  validate(accountNumber: string, args: ValidationArguments) {
    const regex = /^[0-9]{10,24}$/;
    return typeof accountNumber === 'string' && regex.test(accountNumber);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Bank account number must contain only digits and be between 10 and 24 characters long';
  }
}
