import { ColorState } from './colors/colors.reducer';
import { ManufacturerState } from "./manufacturers/manufacturers.reducer";
import { PruductState } from "./products/products.reducer";

export interface AppState {
  product: PruductState,
  manufacturer: ManufacturerState,
  color: ColorState
}
