import { props } from '@ngrx/store';
import { createAction } from '@ngrx/store';
import { IManufacturer } from 'src/common/interfaces/manufacturer.interface';

export enum EManufacturersActions {
  GetManufacturers = '[Manufacturers] Get Manufacturers',
  GetManufacturersSuccess = '[Manufacturers] Get Manufacturers Success',
  GetManufacturersFailed = '[Manufacturers] Get Manufacturers Failed',

  CreateManufacturer = '[Manufacturers] Create Manufacturer',
  CreateManufacturerSuccess = '[Manufacturers] Create Manufacturer Success',
  CreateManufacturerFailed = '[Manufacturers] Create Manufacturer Failed',

  UpdateManufacturer = '[Manufacturers] Update Manufacturer',
  UpdateManufacturerSuccess = '[Manufacturers] Update Manufacturer Success',
  UpdateManufacturerFailed = '[Manufacturers] Update Manufacturer Failed',

  DeleteManufacturer = '[Manufacturers] Delete Manufacturer',
  DeleteManufacturerSuccess = '[Manufacturers] Delete Manufacturer Success',
  DeleteManufacturerFailed = '[Manufacturers] Delete Manufacturer Failed',
}
// ------------------------
// GET
// ------------------------
export const getManufacturers = createAction(
  EManufacturersActions.GetManufacturers
)
export const getManufacturersSuccess = createAction(
  EManufacturersActions.GetManufacturersSuccess,
  props<{ manufacturers: IManufacturer[] }>()
)
export const getManufacturersFailed = createAction(
  EManufacturersActions.GetManufacturersFailed,
  props<{ error: Error }>()
)
// ------------------------
// Create
// ------------------------
export const createManufacturer = createAction(
  EManufacturersActions.CreateManufacturer,
  props<{ dto: any }>()
)
export const createManufacturerSuccess = createAction(
  EManufacturersActions.CreateManufacturerSuccess,
  props<{ manufacturer: IManufacturer }>()
)
export const createManufacturerFailed = createAction(
  EManufacturersActions.CreateManufacturerFailed,
  props<{ error: Error }>()
)
// ------------------------
// Update
// ------------------------
export const updateManufacturer = createAction(
  EManufacturersActions.UpdateManufacturer,
  props<{ dto: any, id: number }>()
)
export const updateManufacturerSuccess = createAction(
  EManufacturersActions.UpdateManufacturerSuccess,
  props<{ manufacturer: IManufacturer }>()
)
export const updateManufacturerFailed = createAction(
  EManufacturersActions.UpdateManufacturerFailed,
  props<{ error: Error }>()
)
// ------------------------
// Delete
// ------------------------
export const deleteManufacturer = createAction(
  EManufacturersActions.DeleteManufacturer,
  props<{ id: number }>()
)
export const deleteManufacturerSuccess = createAction(
  EManufacturersActions.DeleteManufacturerSuccess,
  props<{ id: number }>()
)
export const deleteManufacturerFailed = createAction(
  EManufacturersActions.DeleteManufacturerFailed,
  props<{ error: Error }>()
)
