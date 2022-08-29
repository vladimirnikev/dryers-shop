import { ICartState } from '../common/interfaces/cart-state.interface';
import { IColorState } from '../common/interfaces/color-state.interface';
import { IManufacturerState } from '../common/interfaces/manufacturer-state.interface';
import { IProductState } from '../common/interfaces/product-state.interface';
import { IStockState } from '../common/interfaces/stock.state.interface';
import { IUserState } from '../common/interfaces/user-state.interface';

export interface AppState {
  product: IProductState;
  manufacturer: IManufacturerState;
  color: IColorState;
  user: IUserState;
  stock: IStockState;
  cart: ICartState;
}
