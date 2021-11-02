import { IProduct } from './../../../common/interfaces/product.interface';
// import { IProduct } from 'src/app/modules/admin/components/items-page/items-page.component';
import { createReducer, on, Action } from '@ngrx/store';
import { createProductSuccess, getProductsSuccess, updateProductSuccess, getOneProductSuccess, deleteProductSuccess, createProduct, createProductFailed, updateProduct, updateProductFailed, getProducts, getProductsFailed, getOneProduct, getOneProductFailed, deleteProduct, deleteProductFailed } from './products.actions';

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
  on(createProductSuccess, (state: PruductState, { product }) => ({ ...state, currentProduct: product, isLoading: false })),
  on(createProductFailed, (state: PruductState, { error }) => ({ ...state, error: error.message, isLoading: false })),
  // ------------------------------------------------------------
  on(updateProduct, (state: PruductState) => ({ ...state, isLoading: true })),
  on(updateProductSuccess, (state: PruductState, { product }) => ({
    ...state,
    products: [...state.products.map(item => item.id === product.id ? product : item)],
    currentProduct: product,
    isLoading: false
  })),
  on(updateProductFailed, (state: PruductState, { error }) => ({ ...state, error: error.message, isLoading: false })),
  // ------------------------------------------------------------
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
  // ------------------------------------------------------------
  on(getOneProduct, (state: PruductState) => ({ ...state, isLoading: true })),
  on(getOneProductSuccess, (state: PruductState, { product }) => ({ ...state, currentProduct: product, isLoading: false })),
  on(getOneProductFailed, (state: PruductState, { error }) => ({ ...state, error: error.message, isLoading: false })),
  // ------------------------------------------------------------
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
  // ------------------------------------------------------------
);

export function productReducer(state: PruductState | undefined, action: Action) {
  return reducer(state, action);
}
