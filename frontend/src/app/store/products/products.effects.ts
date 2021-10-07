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
        ofType(getOneProduct),
        switchMap((action) =>
         this.productsService.getManyProducts().pipe(
                map((products) => getProductsSuccess({ products })),
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
                  //  switchMap((product) => [createProductSuccess({ product }), getProducts()]),
                  map((product) => createProductSuccess({ product })),
                    catchError((err) => of(createProductFailed(err)))
                )
            )
        )
    )

    updateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateProduct),
            switchMap((action) =>
             this.productsService.updateProduct(action.product, action.product.id).pipe(
                    map((product) => updateProductSuccess({ product })),
                    catchError((err) => of(updateProductFailed(err)))
                )
            )
        )
    )

    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteProduct),
            switchMap((action) =>
             this.productsService.deleteProduct(action.id).pipe(
                    map((product) => deleteProductSuccess({ id: action.id })),
                    catchError((err) => of(deleteProductFailed(err)))
                )
            )
        )
    )


    constructor(private actions$: Actions, private productsService: ProductsService) { }
}
