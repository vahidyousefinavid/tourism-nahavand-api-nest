import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsString, Validate } from "class-validator";
import { IsBankAccountNumber } from "src/common/validators/is-bank-account-number.validator";
import { IsGoogleMobileNumber } from "src/common/validators/is-google-mobile-number.validator";

export class CreateCustomerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty({ type: Date, format: 'date' })
    @Type(() => Date)
    @IsNotEmpty()
    @IsDate()
    dateOfBirth: Date;

    @ApiProperty()
    @Validate(IsGoogleMobileNumber)
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Validate(IsBankAccountNumber)
    bankAccountNumber: string;
}
