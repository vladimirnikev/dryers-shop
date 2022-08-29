import { ICart } from './cart.interface';

export interface ICartState {
  currentCart: ICart;
  isLoading: boolean;
  loadingCartItemsIds: number[];
  error: string;
}
