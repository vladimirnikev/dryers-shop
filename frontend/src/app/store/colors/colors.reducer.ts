import { Action, createReducer, on } from '@ngrx/store';
import { IColorState } from 'src/app/common/interfaces/color-state.interface';
import {
  createColor,
  createColorFailed,
  createColorSuccess,
  deleteColor,
  deleteColorFailed,
  deleteColorSuccess,
  getColors,
  getColorsFailed,
  getColorsSuccess,
  updateColor,
  updateColorFailed,
  updateColorSuccess,
} from './colors.actions';

export const colorsInitialState: IColorState = {
  colors: [],
  isLoading: false,
  error: '',
};

const reducer = createReducer(
  colorsInitialState,
  on(getColors, (state: IColorState) => ({ ...state, isLoading: true })),
  on(getColorsSuccess, (state: IColorState, { colors }) => ({
    ...state,
    colors,
    isLoading: false,
  })),
  on(getColorsFailed, (state: IColorState, { error }) => ({
    ...state,
    isLoading: false,
    error: error.message,
  })),

  on(createColor, (state: IColorState) => ({ ...state, isLoading: true })),
  on(createColorSuccess, (state: IColorState, { color }) => ({
    ...state,
    colors: [...state.colors, color],
    isLoading: false,
  })),
  on(createColorFailed, (state: IColorState, { error }) => ({
    ...state,
    isLoading: false,
    error: error.message,
  })),

  on(updateColor, (state: IColorState) => ({ ...state, isLoading: true })),
  on(updateColorSuccess, (state: IColorState, { color }) => ({
    ...state,
    colors: [...state.colors.map((c) => (c.id === color.id ? color : c))],
    isLoading: false,
  })),
  on(updateColorFailed, (state: IColorState, { error }) => ({
    ...state,
    isLoading: false,
    error: error.message,
  })),

  on(deleteColor, (state: IColorState) => ({ ...state, isLoading: true })),
  on(deleteColorSuccess, (state: IColorState, { colorId }) => ({
    ...state,
    colors: [...state.colors.filter((c) => c.id !== colorId)],
    isLoading: false,
  })),
  on(deleteColorFailed, (state: IColorState, { error }) => ({
    ...state,
    isLoading: false,
    error: error.message,
  })),
);

export function colorReducer(state: IColorState | undefined, action: Action) {
  return reducer(state, action);
}
