import { createAction, props } from '@ngrx/store';
import { ICart } from 'src/app/common/interfaces/cart.interface';

export enum ECartActions {
  GetCart = '[Cart] Get Cart',
  GetCartSuccess = '[Cart] Get Cart Success',
  GetCartFailed = '[Cart] Get Cart Failed',

  AddProductToCart = '[Cart] Add Product To Cart',
  AddProductToCartSuccess = '[Cart] Add Product To Cart Success',
  AddProductToCartFailed = '[Cart] Add Product To Cart Failed',

  IncrementProductCountInCart = '[Cart] Increment Product Count In Cart',
  IncrementProductCountInCartSuccess = '[Cart] Increment Product Count In Cart Success',
  IncrementProductCountInCartFailed = '[Cart] Increment Product Count In Cart Failed',

  DecrementProductCountInCart = '[Cart] Decrement Product Count In Cart',
  DecrementProductCountInCartSuccess = '[Cart] Decrement Product Count In Cart Success',
  DecrementProductCountInCartFailed = '[Cart] Decrement Product Count In Cart Failed',

  DeleteProductFromCart = '[Cart] Delete Product From Cart',
  DeleteProductFromCartSuccess = '[Cart] Delete Product From Cart Success',
  DeleteProductFromCartFailed = '[Cart] Delete Product From Cart Failed',
}

export const getCart = createAction(ECartActions.GetCart);
export const getCartSuccess = createAction(ECartActions.GetCartSuccess, props<{ cart: ICart }>());
export const getCartFailed = createAction(ECartActions.GetCartFailed, props<{ error: Error }>());

export const addProductToCart = createAction(
  ECartActions.AddProductToCart,
  props<{ item: number; count: number }>(),
);
export const addProductToCartSuccess = createAction(
  ECartActions.AddProductToCartSuccess,
  props<{ cart: ICart }>(),
);
export const addProductToCartFailed = createAction(
  ECartActions.AddProductToCartFailed,
  props<{ error: Error }>(),
);

export const incrementProductCountInCart = createAction(
  ECartActions.IncrementProductCountInCart,
  props<{ itemRecordId: number }>(),
);
export const incrementProductCountInCartSuccess = createAction(
  ECartActions.IncrementProductCountInCartSuccess,
  props<{ cart: ICart }>(),
);
export const incrementProductCountInCartFailed = createAction(
  ECartActions.IncrementProductCountInCartFailed,
  props<{ error: Error }>(),
);

export const decrementProductCountInCart = createAction(
  ECartActions.DecrementProductCountInCart,
  props<{ itemRecordId: number }>(),
);
export const decrementProductCountInCartSuccess = createAction(
  ECartActions.DecrementProductCountInCartSuccess,
  props<{ cart: ICart }>(),
);
export const decrementProductCountInCartFailed = createAction(
  ECartActions.DecrementProductCountInCartFailed,
  props<{ error: Error }>(),
);

export const deleteProductFromCart = createAction(
  ECartActions.DeleteProductFromCart,
  props<{ itemRecordId: number }>(),
);
export const deleteProductFromCartSuccess = createAction(
  ECartActions.DeleteProductFromCartSuccess,
  props<{ itemRecordId: number }>(),
);
export const deleteProductFromCartFailed = createAction(
  ECartActions.DeleteProductFromCartFailed,
  props<{ error: Error }>(),
);
