import { createSelector } from '@ngrx/store';
import { AppState } from './../app.state';
import { ManufacturerState } from './manufacturers.reducer';
export const selectFeature = (state: AppState) => state.manufacturer

export const selectAllManufacturers = createSelector(
  selectFeature,
  (state: ManufacturerState) => state.manufacturers
)
