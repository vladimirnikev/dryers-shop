import { changeColorInLoadedProducts, deleteColorFromProducts, } from './../products/products.actions';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { createColor, createColorFailed, createColorSuccess, deleteColor, getColors, getColorsFailed, getColorsSuccess, updateColor, updateColorFailed, updateColorSuccess, deleteColorSuccess, deleteColorFailed } from './colors.actions';
import { ColorsService } from 'src/app/shared/services/colors.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ColorsEffects {
  getColors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getColors),
      switchMap(() =>
        this.colorService.getColors().pipe(
          map((colors) => getColorsSuccess({ colors })),
          catchError((error) => of(getColorsFailed(error)))
        )
      )
    )
  )

  createColor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createColor),
      switchMap(({ dto }) =>
        this.colorService.createColor(dto).pipe(
          map((color) => {
            this.snackBar.open('Цвет создан', 'ОК', {
              duration: 5000,
              panelClass: 'green-snackbar'
            })
            return createColorSuccess({ color })
          }),
          catchError((error) => {
            this.snackBar.open(`Error ${error.error.statusCode}, ${error.error.message}`, 'Попробуйте еще!', {
              duration: 5000,
              panelClass: 'red-snackbar'
            })
            return of(createColorFailed(error))
          })
        )
      )
    )
  )

  updateColor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateColor),
      switchMap(({ dto, id }) =>
        this.colorService.updateColor(dto, id).pipe(
          map((color) => {
            this.store.dispatch(changeColorInLoadedProducts({ color }))
            this.snackBar.open('Цвет обновлен', 'ОК', {
              duration: 5000,
              panelClass: 'green-snackbar'
            })
            return updateColorSuccess({ color })
          }),
          catchError((error) => {
            this.snackBar.open(`Error ${error.error.statusCode}, ${error.error.message}`, 'Попробуйте еще!', {
              duration: 5000,
              panelClass: 'red-snackbar'
            })
            return of(updateColorFailed(error))
          })
        )
      )
    )
  )

  deleteColor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteColor),
      switchMap(({ colorId }) =>
        this.colorService.deleteColor(colorId).pipe(
          map(() => {
            this.store.dispatch(deleteColorFromProducts({ colorId }))
            this.snackBar.open('Цвет удален', 'ОК', {
              duration: 5000,
              panelClass: 'green-snackbar'
            })
            return deleteColorSuccess({ colorId })
          }),
          catchError((error) => {
            this.snackBar.open(`Error ${error.error.statusCode}, ${error.error.message}`, 'Попробуйте еще!', {
              duration: 5000,
              panelClass: 'red-snackbar'
            })
            return of(deleteColorFailed(error))
          })
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private colorService: ColorsService,
    private store: Store,
    private snackBar: MatSnackBar
  ) { }
}
