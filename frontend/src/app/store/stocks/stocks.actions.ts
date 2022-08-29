import { createAction, props } from '@ngrx/store';
import { IStock } from 'src/app/common/interfaces/stock.interface';

export enum EStocksActions {
  CreateStock = '[Stocks] Create Stock',
  CreateStockSuccess = '[Stocks] Create Stock Success',
  CreateStockFailed = '[Stocks] Create Stock Failed',

  UpdateStock = '[Stocks] Update Stock',
  UpdateStockSuccess = '[Stocks] Update Stock Success',
  UpdateStockFailed = '[Stocks] Update Stock Failed',

  GetOneStock = '[Stocks] Get One Stock',
  GetOneStockSuccess = '[Stocks] Get One Stock Success',
  GetOneStockFailed = '[Stocks] Get One Stock Failed',

  GetStocks = '[Stocks] Get Stocks',
  GetStocksSuccess = '[Stocks] Get Stocks Success',
  GetStocksFailed = '[Stocks] Get Stocks Failed',

  DeleteStock = '[Stocks] Delete Stock',
  DeleteStockSuccess = '[Stocks] Delete Stock Success',
  DeleteStockFailed = '[Stocks] Delete Stock Failed',
}

export const createStock = createAction(EStocksActions.CreateStock, props<{ dto: any }>());
export const createStockSuccess = createAction(
  EStocksActions.CreateStockSuccess,
  props<{ stock: IStock }>(),
);
export const createStockFailed = createAction(
  EStocksActions.CreateStockFailed,
  props<{ error: Error }>(),
);

export const updateStock = createAction(
  EStocksActions.UpdateStock,
  props<{ id: number; dto: any }>(),
);
export const updateStockSuccess = createAction(
  EStocksActions.UpdateStockSuccess,
  props<{ stock: IStock }>(),
);
export const updateStockFailed = createAction(
  EStocksActions.UpdateStockFailed,
  props<{ error: Error }>(),
);

export const getOneStock = createAction(EStocksActions.GetOneStock, props<{ id: number }>());
export const getOneStockSuccess = createAction(
  EStocksActions.GetOneStockSuccess,
  props<{ stock: IStock }>(),
);
export const getOneStockFailed = createAction(
  EStocksActions.GetOneStockFailed,
  props<{ error: Error }>(),
);

export const getStocks = createAction(EStocksActions.GetStocks, props<{ params?: any }>());
export const getStocksSuccess = createAction(
  EStocksActions.GetStocksSuccess,
  props<{ stocks: IStock[] }>(),
);
export const getStocksFailed = createAction(
  EStocksActions.GetStocksFailed,
  props<{ error: Error }>(),
);

export const deleteStock = createAction(EStocksActions.DeleteStock, props<{ id: number }>());
export const deleteStockSuccess = createAction(
  EStocksActions.DeleteStockSuccess,
  props<{ stock: IStock }>(),
);
export const deleteStockFailed = createAction(
  EStocksActions.DeleteStockFailed,
  props<{ error: Error }>(),
);
