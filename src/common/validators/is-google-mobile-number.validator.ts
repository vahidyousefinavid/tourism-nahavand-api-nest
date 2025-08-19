import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { PhoneNumberUtil, PhoneNumberType } from 'google-libphonenumber';

@ValidatorConstraint({ name: 'isGoogleMobileNumber', async: false })
export class IsGoogleMobileNumber implements ValidatorConstraintInterface {
  validate(phoneNumber: string, args: ValidationArguments) {
    try {
      const phoneUtil = PhoneNumberUtil.getInstance();
      const number = phoneUtil.parseAndKeepRawInput(phoneNumber, 'IR');

      return phoneUtil.isValidNumber(number) &&
             phoneUtil.getNumberType(number) === PhoneNumberType.MOBILE;  // اصلاح اینجا
    } catch {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return 'Phone number must be a valid mobile number';
  }
}
