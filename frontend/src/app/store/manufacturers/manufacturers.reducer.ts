import { Action, createReducer, on } from '@ngrx/store';
import { IManufacturerState } from 'src/app/common/interfaces/manufacturer-state.interface';
import {
  createManufacturer,
  createManufacturerFailed,
  createManufacturerSuccess,
  deleteManufacturer,
  deleteManufacturerFailed,
  deleteManufacturerSuccess,
  getManufacturers,
  getManufacturersFailed,
  getManufacturersSuccess,
  updateManufacturer,
  updateManufacturerFailed,
  updateManufacturerSuccess,
} from './manufacturers.actions';

export const manufacturersInitialState: IManufacturerState = {
  manufacturers: [],
  isLoading: false,
  error: '',
};

const reducer = createReducer(
  manufacturersInitialState,
  on(getManufacturers, (state: IManufacturerState) => ({ ...state, isLoading: true })),
  on(getManufacturersSuccess, (state: IManufacturerState, { manufacturers }) => ({
    ...state,
    manufacturers,
    isLoading: false,
  })),
  on(getManufacturersFailed, (state: IManufacturerState, { error }) => ({
    ...state,
    isLoading: false,
    error: error.message,
  })),

  on(createManufacturer, (state: IManufacturerState) => ({ ...state, isLoading: true })),
  on(createManufacturerSuccess, (state: IManufacturerState, { manufacturer }) => ({
    ...state,
    manufacturers: [...state.manufacturers, manufacturer],
    isLoading: false,
  })),
  on(createManufacturerFailed, (state: IManufacturerState, { error }) => ({
    ...state,
    isLoading: false,
    error: error.message,
  })),

  on(updateManufacturer, (state: IManufacturerState) => ({ ...state, isLoading: true })),
  on(updateManufacturerSuccess, (state: IManufacturerState, { manufacturer }) => ({
    ...state,
    manufacturers: [
      ...state.manufacturers.map((m) => (m.id === manufacturer.id ? manufacturer : m)),
    ],
    isLoading: false,
  })),
  on(updateManufacturerFailed, (state: IManufacturerState, { error }) => ({
    ...state,
    isLoading: false,
    error: error.message,
  })),

  on(deleteManufacturer, (state: IManufacturerState) => ({ ...state, isLoading: true })),
  on(deleteManufacturerSuccess, (state: IManufacturerState, { id }) => ({
    ...state,
    manufacturers: [...state.manufacturers.filter((m) => m.id !== id)],
    isLoading: false,
  })),
  on(deleteManufacturerFailed, (state: IManufacturerState, { error }) => ({
    ...state,
    isLoading: false,
    error: error.message,
  })),
);

export function manufacturerReducer(state: IManufacturerState | undefined, action: Action) {
  return reducer(state, action);
}
