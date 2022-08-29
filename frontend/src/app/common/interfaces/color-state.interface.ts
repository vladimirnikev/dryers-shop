import { IColor } from './color.interface';

export interface IColorState {
  colors: IColor[];
  isLoading: boolean;
  error: string;
}
