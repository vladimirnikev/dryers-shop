import { createProduct, createProductFailed, createProductSuccess, deleteProduct, updateProduct, updateProductSuccess, updateProductFailed, deleteProductSuccess, deleteProductFailed, getOneProduct, getOneProductSuccess, getOneProductFailed, getProducts, getProductsSuccess, getProductsFailed } from './products.actions';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';

@Injectable()
export class ProductsEffects {
  getOneProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOneProduct),
      switchMap((action) =>
        this.productsService.getOneProduct(action.id).pipe(
          map((product) => getOneProductSuccess({ product })),
          catchError((err) => of(getOneProductFailed(err)))
        )
      )
    )
  )

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProducts),
      switchMap(({ params }) =>
        this.productsService.getManyProducts(params).pipe(
          map(({ data, totalCount }) => getProductsSuccess({ data, totalCount })),
          catchError((err) => of(getProductsFailed(err)))
        )
      )
    )
  )

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProduct),
      switchMap((action) =>
        this.productsService.createProduct(action.dto).pipe(
          map((product) => {
            console.log(action.files)
            this.productsService.uploadImage(action.files)
            return createProductSuccess({ product })
          }),
          catchError((err) => of(createProductFailed(err)))
        )
      )
    )
  )

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      switchMap(({ dto, id }) =>
        this.productsService.updateProduct(dto, id).pipe(
          map((product) => updateProductSuccess({ product })),
          catchError((err) => of(updateProductFailed(err)))
        )
      )
    )
  )

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      switchMap(({ id }) =>
        this.productsService.deleteProduct(id).pipe(
          map((product) => deleteProductSuccess({ id })),
          catchError((err) => of(deleteProductFailed(err)))
        )
      )
    )
  )


  constructor(private actions$: Actions, private productsService: ProductsService) { }
}
