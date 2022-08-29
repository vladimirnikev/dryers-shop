import { Action, createReducer, on } from '@ngrx/store';
import { IStockState } from 'src/app/common/interfaces/stock.state.interface';
import * as stockActions from './stocks.actions';

export const stocksInitialState: IStockState = {
  stocks: [],
  currentStock: null,
  isLoading: false,
  error: null,
};

const reducer = createReducer(
  stocksInitialState,
  on(stockActions.getStocks, (state: IStockState) => ({ ...state, isLoading: true })),
  on(stockActions.getStocksSuccess, (state: IStockState, { stocks }) => ({
    ...state,
    stocks: [...stocks],
    isLoading: false,
  })),
  on(stockActions.getOneStockFailed, (state: IStockState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),

  on(stockActions.getOneStock, (state: IStockState) => ({ ...state, isLoading: true })),
  on(stockActions.getOneStockSuccess, (state: IStockState, { stock }) => ({
    ...state,
    currentStock: stock,
    isLoading: false,
  })),
  on(stockActions.getOneStockFailed, (state: IStockState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),

  on(stockActions.createStock, (state: IStockState) => ({ ...state, isLoading: true })),
  on(stockActions.createStockSuccess, (state: IStockState, { stock }) => ({
    ...state,
    stocks: [...state.stocks, stock],
    isLoading: false,
  })),
  on(stockActions.createStockFailed, (state: IStockState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),

  on(stockActions.updateStock, (state: IStockState) => ({ ...state, isLoading: true })),
  on(stockActions.updateStockSuccess, (state: IStockState, { stock }) => ({
    ...state,
    stocks: [...state.stocks.filter((item) => item.id !== stock.id), stock],
    isLoading: false,
  })),
  on(stockActions.updateStockFailed, (state: IStockState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),

  on(stockActions.deleteStock, (state: IStockState) => ({ ...state, isLoading: true })),
  on(stockActions.deleteStockSuccess, (state: IStockState, { stock }) => ({
    ...state,
    stocks: [...state.stocks.filter((item) => item.id !== stock.id)],
    isLoading: false,
  })),
  on(stockActions.deleteStockFailed, (state: IStockState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),
);

export function stockReducer(state: IStockState | undefined, action: Action) {
  return reducer(state, action);
}
