import { ICart } from './cart.interface';

export interface ICartState {
  currentCart: ICart;
  isLoading: boolean;
  error: string;
}
