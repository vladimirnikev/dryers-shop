import { Action, createReducer, on } from '@ngrx/store';
import { ICartState } from 'src/app/common/interfaces/cart-state.interface';
import * as cartActions from './cart.actions';

export const cartInitialState: ICartState = {
  currentCart: null,
  isLoading: false,
  error: '',
};

const reducer = createReducer(
  cartInitialState,
  on(cartActions.getCart, (state: ICartState) => ({ ...state, isLoading: true })),
  on(cartActions.getCartSuccess, (state: ICartState, { cart }) => ({
    ...state,
    currentCart: cart,
    isLoading: false,
  })),
  on(cartActions.getCartFailed, (state: ICartState, { error }) => ({
    ...state,
    isLoading: false,
    error: error.message,
  })),

  on(cartActions.addProductToCart, (state: ICartState) => ({ ...state, isLoading: true })),
  on(cartActions.addProductToCartSuccess, (state: ICartState, { cart }) => ({
    ...state,
    currentCart: cart,
    isLoading: false,
  })),
  on(cartActions.addProductToCartFailed, (state: ICartState, { error }) => ({
    ...state,
    isLoading: false,
    error: error.message,
  })),

  on(cartActions.incrementProductCountInCart, (state: ICartState) => ({
    ...state,
    isLoading: true,
  })),
  on(cartActions.incrementProductCountInCartSuccess, (state: ICartState, { cart }) => ({
    ...state,
    currentCart: cart,
    isLoading: false,
  })),
  on(cartActions.incrementProductCountInCartFailed, (state: ICartState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),

  on(cartActions.decrementProductCountInCart, (state: ICartState) => ({
    ...state,
    isLoading: true,
  })),
  on(cartActions.decrementProductCountInCartSuccess, (state: ICartState, { cart }) => ({
    ...state,
    currentCart: cart,
    isLoading: false,
  })),
  on(cartActions.decrementProductCountInCartFailed, (state: ICartState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),

  on(cartActions.deleteProductFromCart, (state: ICartState) => ({ ...state, isLoading: true })),
  on(cartActions.deleteProductFromCartSuccess, (state: ICartState, { itemRecordId }) => {
    const itemRecordForDelete = state.currentCart.itemRecords.find(
      (item) => +item.id === +itemRecordId,
    );

    return {
      ...state,
      currentCart: {
        ...state.currentCart,
        itemRecords: [...state.currentCart.itemRecords.filter((item) => item.id !== itemRecordId)],
        totalSum:
          state.currentCart.totalSum - itemRecordForDelete.item.price * itemRecordForDelete.count,
      },
      isLoading: false,
    };
  }),
  on(cartActions.deleteProductFromCartFailed, (state: ICartState, { error }) => ({
    ...state,
    isLoading: false,
    error: error.message,
  })),

  on(cartActions.makeOrder, (state: ICartState) => ({
    ...state,
    isLoading: true,
  })),
  on(cartActions.makeOrderSuccess, (state: ICartState) => ({
    ...state,
    currentCart: null,
    isLoading: false,
  })),
  on(cartActions.makeOrderFailed, (state: ICartState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),

  on(cartActions.makeOrderInClick, (state: ICartState) => ({
    ...state,
    isLoading: true,
  })),
  on(cartActions.makeOrderInClickSuccess, (state: ICartState) => ({
    ...state,
    isLoading: false,
  })),
  on(cartActions.makeOrderInClickFailed, (state: ICartState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),
);

export function cartReducer(state: ICartState | undefined, action: Action) {
  return reducer(state, action);
}
