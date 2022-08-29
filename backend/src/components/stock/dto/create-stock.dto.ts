import { IsBoolean, IsString } from 'class-validator';

export class CreateStockDto {
  @IsString()
  name: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  products: string;
}
