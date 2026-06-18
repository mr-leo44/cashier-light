import { IsString, IsNumber, IsEnum, IsUUID, Min } from 'class-validator';
import { Currency } from '@prisma/client';

export class CreateReceiptDto {
  @IsString()
  studentName: string;

  @IsUUID()
  feeTypeId: string;

  @IsEnum(Currency)
  currency: Currency;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  cashierName: string;

  @IsUUID()
  schoolYearId: string;
}
