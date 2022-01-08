import { IProduct } from './../../../common/interfaces/product.interface';
import { createReducer, on, Action } from '@ngrx/store';
import { createProductSuccess, getProductsSuccess, updateProductSuccess, getOneProductSuccess, deleteProductSuccess, createProduct, createProductFailed, updateProduct, updateProductFailed, getProducts, getProductsFailed, getOneProduct, getOneProductFailed, deleteProduct, deleteProductFailed, deleteImage, deleteImageSuccess, changeManufacturerInLoadedProducts, deleteProductsWithDeletedManufacturer, changeColorInLoadedProducts, deleteColorFromProducts } from './products.actions';

export interface PruductState {
  products: IProduct[]
  totalCount: number
  currentProduct: IProduct
  isLoading: boolean
  error: string
}
export const productsInitialState: PruductState = {
  products: [],
  totalCount: 0,
  currentProduct: null,
  isLoading: false,
  error: ''
};

const reducer = createReducer(
  productsInitialState,
  on(createProduct, (state: PruductState) => ({ ...state, isLoading: true })),
  on(createProductSuccess, (state: PruductState, { product }) => ({
    ...state,
    products: [
      product,
      ...state.products.filter((product, idx) => idx !== (state.products.length - 1))
    ],
    currentProduct: product,
    isLoading: false
  })),
  on(createProductFailed, (state: PruductState, { error }) => ({ ...state, error: error.message, isLoading: false })),

  on(updateProduct, (state: PruductState) => ({ ...state, isLoading: true })),
  on(updateProductSuccess, (state: PruductState, { product }) => ({
    ...state,
    products: [...state.products.map(item => item.id === product.id ? product : item)],
    currentProduct: product,
    isLoading: false
  })),
  on(updateProductFailed, (state: PruductState, { error }) => ({ ...state, error: error.message, isLoading: false })),

  on(getProducts, (state: PruductState) => ({ ...state, isLoading: true })),
  on(getProductsSuccess, (state: PruductState, { data, totalCount }) => {
    console.log(data)
    return {
      ...state,
      products: [...data],
      totalCount,
      isLoading: false
    }
  }),
  on(getProductsFailed, (state: PruductState, { error }) => ({ ...state, error: error.message, isLoading: false })),

  on(getOneProduct, (state: PruductState) => ({ ...state, isLoading: true })),
  on(getOneProductSuccess, (state: PruductState, { product }) => ({ ...state, currentProduct: product, isLoading: false })),
  on(getOneProductFailed, (state: PruductState, { error }) => ({ ...state, error: error.message, isLoading: false })),

  on(deleteProduct, (state: PruductState) => ({ ...state, isLoading: true })),
  on(deleteProductSuccess, (state: PruductState, { id }) => ({
    ...state,
    products: [
      ...state.products.filter(product => product.id !== id)
    ],
    currentProduct: null,
    isLoading: false
  })),
  on(deleteProductFailed, (state: PruductState, { error }) => ({ ...state, error: error.message, isLoading: false })),

  on(deleteImage, (state: PruductState) => ({ ...state, isLoading: true })),
  on(deleteImageSuccess, (state: PruductState, { productId, imageUrl }) => ({
    ...state,
    products: [
      ...state.products.map(product =>
        product.id === productId
          ? { ...product, imageUrls: product.imageUrls.filter(url => url !== imageUrl) }
          : product)
    ],
    isLoading: false
  })),
  on(deleteProductFailed, (state: PruductState, { error }) => ({ ...state, error: error.message, isLoading: false })),

  on(changeManufacturerInLoadedProducts, (state: PruductState, { manufacturer }) => ({
    ...state,
    products: [
      ...state.products.map(p => p.manufacturer?.id === manufacturer.id
        ? { ...p, manufacturer }
        : p)
    ]
  })
  ),

  on(deleteProductsWithDeletedManufacturer, (state: PruductState, { manufacturerId }) => ({
    ...state,
    products: [
      ...state.products.filter(p => p.manufacturer?.id !== manufacturerId)
    ]
  })),

  on(changeColorInLoadedProducts, (state: PruductState, { color }) => {
    console.log(color)
    return {
      ...state,
      products: [
        ...state.products.map(p => ({ ...p, colors: p.colors.map(c => c.id === color.id ? color : c) }))
      ]
    }
  }),

  on(deleteColorFromProducts, (state: PruductState, { colorId }) => ({
    ...state,
    products: [
      ...state.products.map(p => ({ ...p, colors: p.colors.filter(c => c.id !== colorId) }))
    ]
  })),
)

export function productReducer(state: PruductState | undefined, action: Action) {
  return reducer(state, action);
}
