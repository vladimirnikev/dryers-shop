import { createReducer, on, Action } from '@ngrx/store';
import { IProductState } from 'src/app/common/interfaces/product-state.interface';
import {
  createProductSuccess,
  getProductsSuccess,
  updateProductSuccess,
  getOneProductSuccess,
  deleteProductSuccess,
  createProduct,
  createProductFailed,
  updateProduct,
  updateProductFailed,
  getProducts,
  getProductsFailed,
  getOneProduct,
  getOneProductFailed,
  deleteProduct,
  deleteProductFailed,
  deleteImage,
  deleteImageSuccess,
  changeManufacturerInLoadedProducts,
  deleteProductsWithDeletedManufacturer,
  changeColorInLoadedProducts,
  deleteColorFromProducts,
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

export const productsInitialState: IProductState = {
  products: [],
  totalCount: 0,
  priceRange: { min: 0, max: 0 },
  currentProduct: null,
  viewedProducts: [],
  searchedProducts: [],
  isLoading: false,
  error: '',
};

const reducer = createReducer(
  productsInitialState,
  on(createProduct, (state: IProductState) => ({ ...state, isLoading: true })),
  on(createProductSuccess, (state: IProductState, { product }) => ({
    ...state,
    products: [
      product,
      ...state.products.filter((product, idx) => idx !== state.products.length - 1),
    ],
    currentProduct: product,
    isLoading: false,
  })),
  on(createProductFailed, (state: IProductState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),

  on(updateProduct, (state: IProductState) => ({ ...state, isLoading: true })),
  on(updateProductSuccess, (state: IProductState, { product }) => ({
    ...state,
    products: [...state.products.map((item) => (item.id === product.id ? product : item))],
    currentProduct: product,
    isLoading: false,
  })),
  on(updateProductFailed, (state: IProductState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),

  on(getProducts, (state: IProductState) => ({ ...state, isLoading: true })),
  on(getProductsSuccess, (state: IProductState, { data, totalCount }) => {
    return {
      ...state,
      products: [...data],
      totalCount,
      isLoading: false,
    };
  }),
  on(getProductsFailed, (state: IProductState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),

  on(getOneProduct, (state: IProductState) => ({ ...state, isLoading: true })),
  on(getOneProductSuccess, (state: IProductState, { product }) => ({
    ...state,
    currentProduct: product,
    isLoading: false,
  })),
  on(getOneProductFailed, (state: IProductState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),

  on(deleteProduct, (state: IProductState) => ({ ...state, isLoading: true })),
  on(deleteProductSuccess, (state: IProductState, { id }) => ({
    ...state,
    products: [...state.products.filter((product) => product.id !== id)],
    currentProduct: null,
    isLoading: false,
  })),
  on(deleteProductFailed, (state: IProductState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),

  on(deleteImage, (state: IProductState) => ({ ...state, isLoading: true })),
  on(deleteImageSuccess, (state: IProductState, { productId, imageUrl }) => ({
    ...state,
    products: [
      ...state.products.map((product) =>
        product.id === productId
          ? { ...product, imageUrls: product.imageUrls.filter((url) => url !== imageUrl) }
          : product,
      ),
    ],
    isLoading: false,
  })),
  on(deleteProductFailed, (state: IProductState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),

  on(changeManufacturerInLoadedProducts, (state: IProductState, { manufacturer }) => ({
    ...state,
    products: [
      ...state.products.map((p) =>
        p.manufacturer?.id === manufacturer.id ? { ...p, manufacturer } : p,
      ),
    ],
  })),

  on(deleteProductsWithDeletedManufacturer, (state: IProductState, { manufacturerId }) => ({
    ...state,
    products: [...state.products.filter((p) => p.manufacturer?.id !== manufacturerId)],
  })),

  on(changeColorInLoadedProducts, (state: IProductState, { color }) => {
    return {
      ...state,
      products: [
        ...state.products.map((p) => ({
          ...p,
          colors: p.colors.map((c) => (c.id === color.id ? color : c)),
        })),
      ],
    };
  }),

  on(deleteColorFromProducts, (state: IProductState, { colorId }) => ({
    ...state,
    products: [
      ...state.products.map((p) => ({ ...p, colors: p.colors.filter((c) => c.id !== colorId) })),
    ],
  })),

  on(getProductsPriceRange, (state: IProductState) => ({ ...state, isLoading: true })),
  on(getProductsPriceRangeSuccess, (state: IProductState, { priceRange }) => ({
    ...state,
    priceRange,
    isLoading: false,
  })),
  on(getProductsPriceRangeFailed, (state: IProductState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),

  on(getViewedProducts, (state: IProductState) => ({ ...state, isLoading: true })),
  on(getViewedProductsSuccess, (state: IProductState, { products, currentProductId }) => ({
    ...state,
    viewedProducts: [...products.filter((product) => +product.id !== +currentProductId)],
    isLoading: false,
  })),
  on(getViewedProductsFailed, (state: IProductState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),

  on(getSimilarProductsByName, (state: IProductState) => ({ ...state, isLoading: true })),
  on(getSimilarProductsByNameSuccess, (state: IProductState, { products }) => ({
    ...state,
    searchedProducts: products,
    isLoading: false,
  })),
  on(getSimilarProductsByNameFailed, (state: IProductState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),
);

export function productReducer(state: IProductState | undefined, action: Action) {
  return reducer(state, action);
}
