import { Action, createReducer, on } from '@ngrx/store';
import { IManufacturer } from "src/common/interfaces/manufacturer.interface";
import { createManufacturer, createManufacturerFailed, createManufacturerSuccess, deleteManufacturer, deleteManufacturerFailed, deleteManufacturerSuccess, getManufacturers, getManufacturersFailed, getManufacturersSuccess, updateManufacturer, updateManufacturerFailed, updateManufacturerSuccess } from './manufacturers.actions';

export interface ManufacturerState {
  manufacturers: IManufacturer[]
  isLoading: boolean
  error: string
}
export const manufacturersInitialState: ManufacturerState = {
  manufacturers: [],
  isLoading: false,
  error: ''
};

const reducer = createReducer(
  manufacturersInitialState,
  on(getManufacturers, (state: ManufacturerState) => ({ ...state, isLoading: true })),
  on(getManufacturersSuccess, (state: ManufacturerState, { manufacturers }) => ({ ...state, manufacturers, isLoading: false })),
  on(getManufacturersFailed, (state: ManufacturerState, { error }) => ({ ...state, isLoading: false, error: error.message })),

  on(createManufacturer, (state: ManufacturerState) => ({ ...state, isLoading: true })),
  on(createManufacturerSuccess, (state: ManufacturerState, { manufacturer }) => ({
    ...state,
    manufacturers: [...state.manufacturers, manufacturer],
    isLoading: false
  })),
  on(createManufacturerFailed, (state: ManufacturerState, { error }) => ({ ...state, isLoading: false, error: error.message })),

  on(updateManufacturer, (state: ManufacturerState) => ({ ...state, isLoading: true })),
  on(updateManufacturerSuccess, (state: ManufacturerState, { manufacturer }) => ({
    ...state,
    manufacturers: [
      ...state.manufacturers.map(m => m.id === manufacturer.id ? manufacturer : m)
    ],
    isLoading: false
  })),
  on(updateManufacturerFailed, (state: ManufacturerState, { error }) => ({ ...state, isLoading: false, error: error.message })),

  on(deleteManufacturer, (state: ManufacturerState) => ({ ...state, isLoading: true })),
  on(deleteManufacturerSuccess, (state: ManufacturerState, { id }) => ({
    ...state,
    manufacturers: [...state.manufacturers.filter(m => m.id !== id)],
    isLoading: false
  })),
  on(deleteManufacturerFailed, (state: ManufacturerState, { error }) => ({ ...state, isLoading: false, error: error.message })),
)

export function manufacturerReducer(state: ManufacturerState | undefined, action: Action) {
  return reducer(state, action);
}
