import { IStock } from './stock.interface';

export interface IStockState {
  stocks: IStock[];
  currentStock: IStock;
  isLoading: boolean;
  error: string;
}
