import { IsNotEmpty, IsDateString, IsString, IsNumber } from 'class-validator';

export class Expense {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  vat: number;

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @IsNotEmpty()
  @IsString()
  catUid: string;

  @IsNotEmpty()
  @IsString()
  currencyUid: string;

  @IsNotEmpty()
  @IsString()
  vatRateUid: string;
}
