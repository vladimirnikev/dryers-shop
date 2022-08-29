import { createSelector } from '@ngrx/store';
import { IColorState } from 'src/app/common/interfaces/color-state.interface';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState) => state.color;

export const selectAllColors = createSelector(selectFeature, (state: IColorState) => state.colors);
