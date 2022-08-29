import { createSelector } from '@ngrx/store';
import { IProductState } from 'src/app/common/interfaces/product-state.interface';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState) => state.product;

export const selectProducts = createSelector(
  selectFeature,
  (state: IProductState) => state.products,
);

export const selectCurrentProduct = createSelector(
  selectFeature,
  (state: IProductState) => state.currentProduct,
);

export const selectProductById = (id: number) =>
  createSelector(selectFeature, (state: IProductState) =>
    state.products.find((item) => item.id === id),
  );

export const selectProductsTotalCount = createSelector(
  selectFeature,
  (state: IProductState) => state.totalCount,
);

export const selectProductsLoadingStatus = createSelector(
  selectFeature,
  (state: IProductState) => state.isLoading,
);

export const selectProductsPriceRange = createSelector(
  selectFeature,
  (state: IProductState) => state.priceRange,
);

export const selectViewedProducts = createSelector(
  selectFeature,
  (state: IProductState) => state.viewedProducts,
);

export const selectSearchedProducts = createSelector(
  selectFeature,
  (state: IProductState) => state.searchedProducts,
);

export const selectIsLoading = createSelector(
  selectFeature,
  (state: IProductState) => state.isLoading,
);
