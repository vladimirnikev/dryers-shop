import { IsNumber } from 'class-validator';

export class AddItemToCartDto {
  @IsNumber()
  readonly item: number;
  @IsNumber()
  readonly count: number;
}
