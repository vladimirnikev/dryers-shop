import { ICartItem } from './cart-item.interface';

export interface ICart {
  totalSum: number;
  itemRecords: ICartItem[];
}
