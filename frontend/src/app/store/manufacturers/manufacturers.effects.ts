import { changeManufacturerInLoadedProducts, deleteProductsWithDeletedManufacturer } from './../products/products.actions';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { ManufacturersService } from "src/app/shared/services/manufacturers.service";
import { getManufacturers, getManufacturersSuccess, getManufacturersFailed, createManufacturer, createManufacturerSuccess, createManufacturerFailed, updateManufacturer, updateManufacturerSuccess, updateManufacturerFailed, deleteManufacturer, deleteManufacturerSuccess, deleteManufacturerFailed } from './manufacturers.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ManufacturersEffects {
  getManufacturers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getManufacturers),
      switchMap(() =>
        this.manufacturersService.getManufacturers().pipe(
          map((manufacturers) => getManufacturersSuccess({ manufacturers })),
          catchError((error) => of(getManufacturersFailed(error)))
        )
      )
    )
  )

  createManufacturer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createManufacturer),
      switchMap(({ dto }) =>
        this.manufacturersService.createManufacturer(dto).pipe(
          map((manufacturer) => {
            this.snackBar.open('Производитель создан', 'ОК', {
              duration: 5000,
              panelClass: 'green-snackbar'
            })
            return createManufacturerSuccess({ manufacturer })
          }),
          catchError((error) => {
            this.snackBar.open(`Error ${error.error.statusCode}, ${error.error.message}`, 'Попробуйте еще!', {
              duration: 5000,
              panelClass: 'red-snackbar'
            })
            return of(createManufacturerFailed(error))
          })
        )
      )
    )
  )

  updateManufacturer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateManufacturer),
      switchMap(({ dto, id }) =>
        this.manufacturersService.updateManufacturer(dto, id).pipe(
          map((manufacturer) => {
            this.store.dispatch(changeManufacturerInLoadedProducts({ manufacturer }))
            this.snackBar.open('Производитель обновлен', 'ОК', {
              duration: 5000,
              panelClass: 'green-snackbar'
            })
            return updateManufacturerSuccess({ manufacturer })
          }),
          catchError((error) => {
            this.snackBar.open(`Error ${error.error.statusCode}, ${error.error.message}`, 'Попробуйте еще!', {
              duration: 5000,
              panelClass: 'red-snackbar'
            })
            return of(updateManufacturerFailed(error))
          })
        )
      )
    )
  )

  deleteManufacturer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteManufacturer),
      switchMap(({ id }) =>
        this.manufacturersService.deleteManufacturer(id).pipe(
          map(() => {
            this.store.dispatch(deleteProductsWithDeletedManufacturer({ manufacturerId: id }))
            this.snackBar.open('Производитель удален', 'ОК', {
              duration: 5000,
              panelClass: 'green-snackbar'
            })
            return deleteManufacturerSuccess({ id })
          }),
          catchError((error) => {
            this.snackBar.open(`Error ${error.error.statusCode}, ${error.error.message}`, 'Попробуйте еще!', {
              duration: 5000,
              panelClass: 'red-snackbar'
            })
            return of(deleteManufacturerFailed(error))
          })
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private manufacturersService: ManufacturersService,
    private store: Store,
    private snackBar: MatSnackBar
  ) { }
}
