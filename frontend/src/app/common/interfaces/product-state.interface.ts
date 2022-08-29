import { IProduct } from './product.interface';
import { ISliderPriceFilter } from './slider-price-filter.interface';

export interface IProductState {
  products: IProduct[];
  totalCount: number;
  priceRange: ISliderPriceFilter;
  currentProduct: IProduct;
  viewedProducts: IProduct[];
  searchedProducts: IProduct[];
  isLoading: boolean;
  error: string;
}
