import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { StocksService } from 'src/app/shared/services/stocks.service';
import * as stockActions from './stocks.actions';

@Injectable()
export class StocksEffects {
  getStocks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stockActions.getStocks),
      switchMap(() =>
        this.stocksService.getStocks().pipe(
          map((stocks) => stockActions.getStocksSuccess({ stocks })),
          catchError((err) => of(stockActions.getStocksFailed(err))),
        ),
      ),
    ),
  );

  getOneStock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stockActions.getOneStock),
      switchMap(({ id }) =>
        this.stocksService.getOneStock(id).pipe(
          map((stock) => stockActions.getOneStockSuccess({ stock })),
          catchError((err) => of(stockActions.getOneStockFailed(err))),
        ),
      ),
    ),
  );

  createStock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stockActions.createStock),
      switchMap(({ dto }) =>
        this.stocksService.createStock(dto).pipe(
          map((stock) => {
            this.snackBar.open('Акция создана', 'OK', {
              duration: 5000,
              panelClass: 'green-snackbar',
            });
            return stockActions.createStockSuccess({ stock });
          }),
          catchError((err) => {
            this.snackBar.open(
              `Error ${err.error.statusCode}, ${err.error.message}`,
              'Попробуйте еще!',
              {
                duration: 5000,
                panelClass: 'red-snackbar',
              },
            );
            return of(stockActions.createStockFailed(err));
          }),
        ),
      ),
    ),
  );

  updateStock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stockActions.updateStock),
      switchMap(({ id, dto }) =>
        this.stocksService.updateStock(dto, id).pipe(
          map((stock) => {
            this.snackBar.open('Акция обновлена', 'OK', {
              duration: 5000,
              panelClass: 'green-snackbar',
            });
            return stockActions.updateStockSuccess({ stock });
          }),
          catchError((err) => {
            this.snackBar.open(
              `Error ${err.error.statusCode}, ${err.error.message}`,
              'Попробуйте еще!',
              {
                duration: 5000,
                panelClass: 'red-snackbar',
              },
            );
            return of(stockActions.updateStockFailed(err));
          }),
        ),
      ),
    ),
  );

  deleteStock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stockActions.deleteStock),
      switchMap(({ id }) =>
        this.stocksService.deleteStock(id).pipe(
          map((stock) => {
            this.snackBar.open('Акция удалена', 'OK', {
              duration: 5000,
              panelClass: 'green-snackbar',
            });
            return stockActions.deleteStockSuccess({ stock });
          }),
          catchError((err) => {
            this.snackBar.open(
              `Error ${err.error.statusCode}, ${err.error.message}`,
              'Попробуйте еще!',
              {
                duration: 5000,
                panelClass: 'red-snackbar',
              },
            );
            return of(stockActions.deleteStockFailed(err));
          }),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private stocksService: StocksService,
    private snackBar: MatSnackBar,
  ) {}
}
