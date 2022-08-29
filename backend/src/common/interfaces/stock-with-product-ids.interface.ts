import { StockEntity } from '@app/components/stock/entities/stock.entity';

export interface StockWithProductIds extends Omit<StockEntity, 'products'> {
  products: number[];
}
