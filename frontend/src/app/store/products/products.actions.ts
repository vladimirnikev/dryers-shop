import { createAction, props } from "@ngrx/store";

export enum EItemsActions {
  CreateProduct = '[Products] Create Product',
  CreateProductSuccess = '[Products] Create Product Success',
  CreateProductFailed = '[Products] Create Product Failed',

  UpdateProduct = '[Products] Update Product',
  UpdateProductSuccess = '[Products] Update Product Success',
  UpdateProductFailed = '[Products] Update Product Failed',

  DeleteProduct = '[Products] Delete Product',
  DeleteProductSuccess = '[Products] Delete Product Success',
  DeleteProductFailed = '[Products] Delete Product Failed',

  GetOneProduct = '[Products] Get One Product',
  GetOneProductSuccess = '[Products] Get One Product Success',
  GetOneProductFailed = '[Products] Get One Product Failed',

  GetProducts = '[Products] Get Products',
  GetProductsSuccess = '[Products] Get Products Success',
  GetProductsFailed = '[Products] Get Products  Failed',
}
// ------------------------
// CREATE
// ------------------------
export const createProduct = createAction(
  EItemsActions.CreateProduct,
  props<{ dto: any }>()
)
export const createProductSuccess = createAction(
  EItemsActions.CreateProductSuccess,
  props<{ product: any }>()
)
export const createProductFailed = createAction(
  EItemsActions.CreateProductFailed,
  props<{ error: Error }>()
)
// ------------------------
// UPDATE
// ------------------------
export const updateProduct = createAction(
  EItemsActions.UpdateProduct,
  props<{ product: any }>()
)
export const updateProductSuccess = createAction(
  EItemsActions.UpdateProductSuccess,
  props<{ product: any }>()
)
export const updateProductFailed = createAction(
  EItemsActions.UpdateProductFailed,
  props<{ error: Error }>()
)
// ------------------------
// DELETE
// ------------------------
export const deleteProduct = createAction(
  EItemsActions.DeleteProduct,
  props<{ id: any }>()
)
export const deleteProductSuccess = createAction(
  EItemsActions.DeleteProductSuccess,
  props<{ id: any }>()
)
export const deleteProductFailed = createAction(
  EItemsActions.DeleteProductFailed,
  props<{ error: Error }>()
)
// ------------------------
// GET ONE
// ------------------------
export const getOneProduct = createAction(
  EItemsActions.GetOneProduct,
  props<{ id: any }>()
)
export const getOneProductSuccess = createAction(
  EItemsActions.GetOneProductSuccess,
  props<{ product: any }>()
)
export const getOneProductFailed = createAction(
  EItemsActions.GetOneProductFailed,
  props<{ error: Error }>()
)
// ------------------------
// GET MANY
// ------------------------
export const getProducts = createAction(
  EItemsActions.GetProducts,
  // props<{ item: any }>()
)
export const getProductsSuccess = createAction(
  EItemsActions.GetProductsSuccess,
  props<{ products: any }>()
)
export const getProductsFailed = createAction(
  EItemsActions.GetProductsFailed,
  props<{ error: Error }>()
)
