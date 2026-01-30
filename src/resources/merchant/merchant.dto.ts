import { IsString, IsEmail, MinLength, IsNotEmpty } from "class-validator";

export class CreateMerchantDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: "Business name must be at least 3 characters long" })
  businessName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;
}

export class LoginMerchantDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;
}
