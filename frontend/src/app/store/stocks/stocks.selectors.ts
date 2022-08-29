import { createSelector } from '@ngrx/store';
import { IStockState } from 'src/app/common/interfaces/stock.state.interface';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState) => state.stock;

export const selectStocks = createSelector(selectFeature, (state: IStockState) => state.stocks);

export const selectCurrentStock = createSelector(
  selectFeature,
  (state: IStockState) => state.currentStock,
);

export const selectLoadingStatus = createSelector(
  selectFeature,
  (state: IStockState) => state.isLoading,
);
