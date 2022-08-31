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

export const selectCartProductsCount = createSelector(selectFeature, (state: ICartState) =>
  state.currentCart?.itemRecords.map((item) => item.count).reduce((prev, curr) => prev + curr, 0),
);

export const selectProductsInCardIds = createSelector(selectFeature, (state: ICartState) =>
  state.currentCart?.itemRecords.map((itemRecord) => itemRecord.item.id),
);

export const selectCartSum = createSelector(
  selectFeature,
  (state: ICartState) => state.currentCart?.totalSum,
);

export const selectItemRecords = createSelector(
  selectFeature,
  (state: ICartState) => state.currentCart?.itemRecords,
);
