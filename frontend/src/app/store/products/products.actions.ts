import { IManufacturer } from './../../../common/interfaces/manufacturer.interface';
import { IProduct } from 'src/common/interfaces/product.interface';
import { createAction, props } from "@ngrx/store";
import { IColor } from 'src/common/interfaces/color.interface';

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

  DeleteImage = '[Products] Delete Image',
  DeleteImageSuccess = '[Products] Delete Image Success',
  DeleteImageFailed = '[Products] Delete Image Failed',

  AddProductItem = '[Products] Add Product',

  ChangeManufacturerInLoadedProducts = '[Products] Change Manufacturer In Loaded Products',

  DeleteProductsWithDeletedManufacturer = '[Products] Delete Products With Deleted Manufacterer',

  ChangeColorInLoadedProducts = '[Products] Change Color In Loaded Products',

  DeleteColorFromProducts = '[Products] Delete Color From Products'
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
  props<{ product: IProduct }>()
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
  props<{ dto: any, id: number }>()
)
export const updateProductSuccess = createAction(
  EItemsActions.UpdateProductSuccess,
  props<{ product: IProduct }>()
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
  props<{ id: number }>()
)
export const deleteProductSuccess = createAction(
  EItemsActions.DeleteProductSuccess,
  props<{ id: number }>()
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
  props<{ id: number }>()
)
export const getOneProductSuccess = createAction(
  EItemsActions.GetOneProductSuccess,
  props<{ product: IProduct }>()
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
  props<{ params: any }>()
)
export const getProductsSuccess = createAction(
  EItemsActions.GetProductsSuccess,
  props<{ data: IProduct[], totalCount: number }>()
)
export const getProductsFailed = createAction(
  EItemsActions.GetProductsFailed,
  props<{ error: Error }>()
)
// ------------------------
// DELETE IMAGE
// ------------------------
export const deleteImage = createAction(
  EItemsActions.DeleteImage,
  props<{ productId: number, dto: { imageUrl: string } }>()
)
export const deleteImageSuccess = createAction(
  EItemsActions.DeleteImageSuccess,
  props<{ productId: number, imageUrl: string }>()
)
export const deleteImageFailed = createAction(
  EItemsActions.DeleteImageFailed,
  props<{ error: Error }>()
)

export const addProductItem = createAction(
  EItemsActions.AddProductItem,
  props<{ product: any }>()
)

export const changeManufacturerInLoadedProducts = createAction(
  EItemsActions.ChangeManufacturerInLoadedProducts,
  props<{ manufacturer: IManufacturer }>()
)

export const deleteProductsWithDeletedManufacturer = createAction(
  EItemsActions.DeleteProductsWithDeletedManufacturer,
  props<{ manufacturerId: number }>()
)

export const changeColorInLoadedProducts = createAction(
  EItemsActions.ChangeColorInLoadedProducts,
  props<{ color: IColor }>()
)

export const deleteColorFromProducts = createAction(
  EItemsActions.DeleteColorFromProducts,
  props<{ colorId: number }>()
)



