import { ESortDirection } from "../enums/sort.enum";
import { IColor } from "./color.interface";
import { IManufacturer } from "./manufacturer.interface";

export interface IProduct {
  id: number
  name: string
  availability: boolean
  manufacturer: IManufacturer
  colors: IColor[]
  description: string
  images: string[]
  power: number
  price: number
  imageUrls: string[]
}

export interface IUpdateProduct {
  name?: string
  availability?: boolean
  batch?: string
  color?: string[]
  description?: string
  images?: string[]
  power?: number
  price?: number
}

export interface IProductQueryFilters {
  name?: string
  availability?: string
  batch?: string
  price?: string
  colors?: string
}

export interface IProductQuerySort {
  sortBy?: string
  sortDirection?: ESortDirection
}

export interface IProductQuery extends IProductQueryFilters, IProductQuerySort {
  limit?: number
  offset?: number
}
