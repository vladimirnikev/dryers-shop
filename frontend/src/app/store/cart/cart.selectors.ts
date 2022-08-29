import { createSelector } from '@ngrx/store';
import { ICartState } from 'src/app/common/interfaces/cart-state.interface';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState) => state.cart;

export const selectCurrentCart = createSelector(
  selectFeature,
  (state: ICartState) => state.currentCart,
);

export const selectIsLoading = createSelector(
  selectFeature,
  (state: ICartState) => state.isLoading,
);
