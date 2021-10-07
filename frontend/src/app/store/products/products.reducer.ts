import { createReducer, on, Action } from '@ngrx/store';
import { createProductSuccess, getProductsSuccess, updateProductSuccess, getOneProductSuccess, deleteProductSuccess } from './products.actions';

interface State {
    products: any
    currentProduct: any
}
export const productsInitialState: State = {
  products: [],
  currentProduct: null
};

const reducer = createReducer(
  productsInitialState,
    on(createProductSuccess, (state: State, { product }) => ({ ...state, currentProduct: product })),
    on(updateProductSuccess, (state: State, { product }) => ({ ...state, currentProduct: product })),
    on(getOneProductSuccess, (state: State, { product }) => ({ ...state, currentProduct: product })),
    on(getProductsSuccess, (state: State, { products }) => ({ ...state, products })),
    on(deleteProductSuccess, (state: State, { id }) => ({
      ...state,
      products: [
        ...state.products.filter(product => product.id !== id)
      ],
      currentProduct: null
    }))
);

export function productsReducer(state: State | undefined, action: Action) {
    return reducer(state, action);
}
