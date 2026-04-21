import { IsEmail, IsNumber } from 'class-validator';

export class PaymentsCreateChargeDto {
  @IsEmail()
  email: string;

  @IsNumber()
  amount: number;
}
