import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "emailOrPhone", async: false })
class EmailOrPhoneValidator implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const { email, phoneNumber } = value;
        return !!email || !!phoneNumber;
    }

    defaultMessage(args: ValidationArguments) {
        return "Email or password is not specified!";
    }
}

export class LoginDto {
    @IsEmail()
    @IsOptional()
    email: string

    @IsPhoneNumber()
    @IsOptional()
    phoneNumber: string

    @IsString()
    @IsNotEmpty()
    password: string

    @Validate(EmailOrPhoneValidator, { message: "Email or password is not specified!" })
    validateEmailOrPhone() {
        return { email: this.email, phoneNumber: this.phoneNumber };
    }
}