import { IColor } from './color.interface';
import { IProduct } from './product.interface';

export interface ICartItem {
  item: IProduct;
  count: number;
  id: number;
  color: IColor;
}
