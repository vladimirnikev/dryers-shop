import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  createProduct,
  createProductFailed,
  createProductSuccess,
  deleteProduct,
  updateProduct,
  updateProductSuccess,
  updateProductFailed,
  deleteProductSuccess,
  deleteProductFailed,
  getOneProduct,
  getOneProductSuccess,
  getOneProductFailed,
  getProducts,
  getProductsSuccess,
  getProductsFailed,
  deleteImage,
  deleteImageSuccess,
  deleteImageFailed,
  getProductsPriceRange,
  getProductsPriceRangeSuccess,
  getProductsPriceRangeFailed,
  getViewedProducts,
  getViewedProductsSuccess,
  getViewedProductsFailed,
  getSimilarProductsByName,
  getSimilarProductsByNameSuccess,
  getSimilarProductsByNameFailed,
} from './products.actions';

@Injectable()
export class ProductsEffects {
  getOneProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOneProduct),
      switchMap((action) =>
        this.productsService.getOneProduct(action.id).pipe(
          map((product) => getOneProductSuccess({ product })),
          catchError((err) => of(getOneProductFailed(err))),
        ),
      ),
    ),
  );

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProducts),
      switchMap(({ params }) =>
        this.productsService.getManyProducts(params).pipe(
          map(({ data, totalCount }) => getProductsSuccess({ data, totalCount })),
          catchError((err) => of(getProductsFailed(err))),
        ),
      ),
    ),
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProduct),
      switchMap(({ dto }) =>
        this.productsService.createProduct(dto).pipe(
          map((product) => {
            this.snackBar.open('Продукт создан', 'OK', {
              duration: 5000,
              panelClass: 'green-snackbar',
            });
            return createProductSuccess({ product });
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
            return of(createProductFailed(err));
          }),
        ),
      ),
    ),
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      switchMap(({ dto, id }) =>
        this.productsService.updateProduct(dto, id).pipe(
          map((product) => {
            this.snackBar.open('Продукт обновлен', 'OK', {
              duration: 5000,
              panelClass: 'green-snackbar',
            });
            return updateProductSuccess({ product });
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
            return of(updateProductFailed(err));
          }),
        ),
      ),
    ),
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      switchMap(({ id }) =>
        this.productsService.deleteProduct(id).pipe(
          map(() => {
            this.snackBar.open('Продукт удален', 'OK', {
              duration: 5000,
              panelClass: 'green-snackbar',
            });
            return deleteProductSuccess({ id });
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
            return of(deleteProductFailed(err));
          }),
        ),
      ),
    ),
  );

  deleteImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteImage),
      switchMap(({ productId, dto }) =>
        this.productsService.deleteImage(productId, dto).pipe(
          map(() => deleteImageSuccess({ productId, imageUrl: dto.imageUrl })),
          catchError((err) => of(deleteImageFailed(err))),
        ),
      ),
    ),
  );

  getProductsPriceRange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProductsPriceRange),
      switchMap(({ params }) =>
        this.productsService.getPriceRange(params).pipe(
          map((priceRange) => getProductsPriceRangeSuccess({ priceRange })),
          catchError((err) => of(getProductsPriceRangeFailed(err))),
        ),
      ),
    ),
  );

  getViewedProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getViewedProducts),
      switchMap(({ currentProductId }) =>
        this.productsService.getViewedProducts().pipe(
          map((products) => getViewedProductsSuccess({ products, currentProductId })),
          catchError((err) => of(getViewedProductsFailed(err))),
        ),
      ),
    ),
  );

  getSimilarProductsByName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSimilarProductsByName),
      switchMap(({ name }) =>
        this.productsService.getSimilarProductsByName(name).pipe(
          map(({ data }) => getSimilarProductsByNameSuccess({ products: data })),
          catchError((err) => of(getSimilarProductsByNameFailed(err))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
  ) {}
}
