import { ColorState } from './colors.reducer';
import { createSelector } from '@ngrx/store';
import { AppState } from './../app.state';

export const selectFeature = (state: AppState) => state.color

export const selectAllColors = createSelector(
  selectFeature,
  (state: ColorState) => state.colors
)
