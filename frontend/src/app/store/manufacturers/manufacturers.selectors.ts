import { createSelector } from '@ngrx/store';
import { IManufacturerState } from 'src/app/common/interfaces/manufacturer-state.interface';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState) => state.manufacturer;

export const selectAllManufacturers = createSelector(
  selectFeature,
  (state: IManufacturerState) => state.manufacturers,
);
