import { ESortDirection } from '../enums/sort.enum';
import { IColor } from './color.interface';
import { IManufacturer } from './manufacturer.interface';

export interface IProduct {
  id: number;
  name: string;
  nameUa: string;
  availability: boolean;
  manufacturer: IManufacturer;
  colors: IColor[];
  description: string;
  descriptionUa: string;
  category: string;
  code: string;
  power: number;
  price: number;
  oldPrice: number;
  imageUrls: string[];
  mainImg: string;
}

export interface IUpdateProduct {
  name?: string;
  nameUa?: string;
  availability?: boolean;
  color?: string[];
  description?: string;
  descriptionUa?: string;
  images?: string[];
  power?: number;
  price?: number;
  mainImg: string;
}

export interface IProductQueryFilters {
  name?: string;
  availability?: string;
  price?: string;
  colors?: string;
}

export interface IProductQuerySort {
  sortBy?: string;
  sortDirection?: ESortDirection;
}

export interface IProductQuery extends IProductQueryFilters, IProductQuerySort {
  limit?: number;
  offset?: number;
}
