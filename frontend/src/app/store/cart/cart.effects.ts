import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CartService } from 'src/app/shared/services/cart.service';
import * as cartActions from './cart.actions';

@Injectable()
export class CartEffects {
  getCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.getCart),
      switchMap(() =>
        this.cartService.getCurrentUserCart().pipe(
          map((cart) => cartActions.getCartSuccess({ cart })),
          catchError((error) => of(cartActions.getCartFailed(error))),
        ),
      ),
    ),
  );

  addProductToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.addProductToCart),
      switchMap(({ item, count }) =>
        this.cartService.addItemToCart(item, count).pipe(
          map((cart) => cartActions.addProductToCartSuccess({ cart })),
          catchError((error) => of(cartActions.addProductToCartFailed(error))),
        ),
      ),
    ),
  );

  incrementProductCountInCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.incrementProductCountInCart),
      switchMap(({ itemRecordId }) =>
        this.cartService.incrementProductCountInCart(itemRecordId).pipe(
          map((cart) => cartActions.incrementProductCountInCartSuccess({ cart })),
          catchError((error) => of(cartActions.incrementProductCountInCartFailed({ error }))),
        ),
      ),
    ),
  );

  decrementProductCountInCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.decrementProductCountInCart),
      switchMap(({ itemRecordId }) =>
        this.cartService.decrementProductCountInCart(itemRecordId).pipe(
          map((cart) => cartActions.decrementProductCountInCartSuccess({ cart })),
          catchError((error) => of(cartActions.decrementProductCountInCartFailed({ error }))),
        ),
      ),
    ),
  );

  deleteProductFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.deleteProductFromCart),
      switchMap(({ itemRecordId }) =>
        this.cartService.deleteProductFromCart(itemRecordId).pipe(
          map(() => cartActions.deleteProductFromCartSuccess({ itemRecordId })),
          catchError((error) => of(cartActions.deleteProductFromCartFailed(error))),
        ),
      ),
    ),
  );

  makeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.makeOrder),
      switchMap(({ data }) =>
        this.cartService.makeOrder(data).pipe(
          map(() => cartActions.makeOrderSuccess()),
          catchError((error) => of(cartActions.makeOrderFailed(error))),
        ),
      ),
    ),
  );

  makeOrderInClick$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.makeOrderInClick),
      switchMap(({ data }) =>
        this.cartService.makeOrderInClick(data).pipe(
          map(() => cartActions.makeOrderInClickSuccess()),
          catchError((error) => of(cartActions.makeOrderInClickFailed(error))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private cartService: CartService) {}
}
