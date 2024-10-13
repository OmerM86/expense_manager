import { Type } from 'class-transformer';
import { IsDecimal, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ExpenseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDecimal()
  @IsNotEmpty()
  amount: number;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  cid: number;
}
