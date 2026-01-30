import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsBoolean,
  ValidateNested,
  IsOptional,
  Max,
} from "class-validator";
import { Type } from "class-transformer";

class CreditConfigDto {
  @IsBoolean()
  enabled: boolean;

  @IsNumber()
  @Min(0)
  @Max(80, { message: "Down payment cannot be more than 80%" })
  minDownPayment: number; // e.g. 20 for 20%

  @IsNumber()
  @Min(0)
  interestRate: number; // e.g. 2.5 for 2.5% per month
}

// 2. The Main Create DTO
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @Min(1, { message: "Price must be greater than 0" })
  price: number; // Stored in Kobo

  @IsNumber()
  @Min(0)
  stock: number;

  @ValidateNested()
  @Type(() => CreditConfigDto)
  creditConfig: CreditConfigDto;
}
