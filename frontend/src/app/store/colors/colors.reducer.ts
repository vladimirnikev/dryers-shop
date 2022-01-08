import { Action, createReducer, on } from '@ngrx/store';
import { IColor } from 'src/common/interfaces/color.interface';
import { createColor, createColorFailed, createColorSuccess, deleteColor, deleteColorFailed, deleteColorSuccess, getColors, getColorsFailed, getColorsSuccess, updateColor, updateColorFailed, updateColorSuccess } from './colors.actions';

export interface ColorState {
  colors: IColor[]
  isLoading: boolean
  error: string
}
export const manufacturersInitialState: ColorState = {
  colors: [],
  isLoading: false,
  error: ''
};

const reducer = createReducer(
  manufacturersInitialState,
  on(getColors, (state: ColorState) => ({ ...state, isLoading: true })),
  on(getColorsSuccess, (state: ColorState, { colors }) => ({ ...state, colors, isLoading: false })),
  on(getColorsFailed, (state: ColorState, { error }) => ({ ...state, isLoading: false, error: error.message })),

  on(createColor, (state: ColorState) => ({ ...state, isLoading: true })),
  on(createColorSuccess, (state: ColorState, { color }) => ({
    ...state,
    colors: [...state.colors, color],
    isLoading: false
  })),
  on(createColorFailed, (state: ColorState, { error }) => ({ ...state, isLoading: false, error: error.message })),

  on(updateColor, (state: ColorState) => ({ ...state, isLoading: true })),
  on(updateColorSuccess, (state: ColorState, { color }) => ({
    ...state,
    colors: [
      ...state.colors.map(c => c.id === color.id ? color : c)
    ],
    isLoading: false
  })),
  on(updateColorFailed, (state: ColorState, { error }) => ({ ...state, isLoading: false, error: error.message })),

  on(deleteColor, (state: ColorState) => ({ ...state, isLoading: true })),
  on(deleteColorSuccess, (state: ColorState, { colorId }) => ({
    ...state,
    colors: [...state.colors.filter(c => c.id !== colorId)],
    isLoading: false
  })),
  on(deleteColorFailed, (state: ColorState, { error }) => ({ ...state, isLoading: false, error: error.message })),
)

export function colorReducer(state: ColorState | undefined, action: Action) {
  return reducer(state, action);
}
