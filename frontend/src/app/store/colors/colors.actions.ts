import { props, createAction } from '@ngrx/store';
import { IColor } from 'src/app/common/interfaces/color.interface';

export enum EColorsActions {
  GetColors = '[Colors] Get Colors',
  GetColorsSuccess = '[Colors] Get Colors Success',
  GetColorsFailed = '[Colors] Get Colors Failed',

  CreateColor = '[Colors] Create Color',
  CreateColorSuccess = '[Colors] Create Color Success',
  CreateColorFailed = '[Colors] Create Color Failed',

  UpdateColor = '[Colors] Update Color',
  UpdateColorSuccess = '[Colors] Update Color Success',
  UpdateColorFailed = '[Colors] Update Color Failed',

  DeleteColor = '[Colors] Delete Color',
  DeleteColorSuccess = '[Colors] Delete Color Success',
  DeleteColorFailed = '[Colors] Delete Color Failed',
}

export const getColors = createAction(EColorsActions.GetColors);
export const getColorsSuccess = createAction(
  EColorsActions.GetColorsSuccess,
  props<{ colors: IColor[] }>(),
);
export const getColorsFailed = createAction(
  EColorsActions.GetColorsFailed,
  props<{ error: Error }>(),
);

export const createColor = createAction(EColorsActions.CreateColor, props<{ dto: any }>());
export const createColorSuccess = createAction(
  EColorsActions.CreateColorSuccess,
  props<{ color: IColor }>(),
);
export const createColorFailed = createAction(
  EColorsActions.CreateColorFailed,
  props<{ error: Error }>(),
);

export const updateColor = createAction(
  EColorsActions.UpdateColor,
  props<{ dto: any; id: number }>(),
);
export const updateColorSuccess = createAction(
  EColorsActions.UpdateColorSuccess,
  props<{ color: IColor }>(),
);
export const updateColorFailed = createAction(
  EColorsActions.UpdateColorFailed,
  props<{ error: Error }>(),
);

export const deleteColor = createAction(EColorsActions.DeleteColor, props<{ colorId: number }>());
export const deleteColorSuccess = createAction(
  EColorsActions.DeleteColorSuccess,
  props<{ colorId: number }>(),
);
export const deleteColorFailed = createAction(
  EColorsActions.DeleteColorFailed,
  props<{ error: Error }>(),
);
