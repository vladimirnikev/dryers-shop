import { AppState } from './../app.state';
import { createSelector } from "@ngrx/store";
import { PruductState } from "./products.reducer";

export const selectFeature = (state: AppState) => state.product

export const selectProducts = createSelector(
  selectFeature,
  (state: PruductState) => state.products
)

export const selectCurrentProduct = createSelector(
  selectFeature,
  (state: PruductState) => state.currentProduct
)

export const selectProductById = (id: number) => createSelector(
  selectFeature,
  (state: PruductState) => state.products.find(item => item.id === id)
)

export const selectProductsTotalCount = createSelector(
  selectFeature,
  (state: PruductState) => state.totalCount
)

export const selectProductsLoadingStatus = createSelector(
  selectFeature,
  (state: PruductState) => state.isLoading
)
