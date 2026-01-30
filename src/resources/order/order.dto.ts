import {
  IsMongoId,
  IsNumber,
  IsEmail,
  Min,
  Max,
  IsNotEmpty,
} from "class-validator";

export class CreateOrderDto {
  @IsMongoId({ message: "Invalid Product ID" })
  @IsNotEmpty()
  productId: string;

  @IsEmail()
  @IsNotEmpty()
  customerEmail: string;
  @IsNumber()
  @Min(0)
  downPayment: number;

  @IsNumber()
  @Min(1)
  @Max(12, { message: "Tenure cannot exceed 12 months" })
  tenureMonths: number;
}
