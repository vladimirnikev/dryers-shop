import { IProduct } from './product.interface';

export interface ICartItem {
  item: IProduct;
  count: number;
  id: number;
}
