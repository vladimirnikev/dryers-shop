import { IManufacturer } from './manufacturer.interface';

export interface IManufacturerState {
  manufacturers: IManufacturer[];
  isLoading: boolean;
  error: string;
}
