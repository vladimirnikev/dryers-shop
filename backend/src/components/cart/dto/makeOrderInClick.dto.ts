import { IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class MakeOrderInClickDto {
  @IsString()
  readonly fullName: string;

  @IsNumber()
  @IsOptional()
  readonly productId: number;

  @IsString()
  @IsOptional()
  readonly message: string;

  @IsPhoneNumber('UA')
  readonly phone: string;

  @IsString()
  @IsOptional()
  readonly email: string;
}
