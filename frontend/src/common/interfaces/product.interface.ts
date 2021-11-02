import { ESortDirection } from "../enums/sort.enum";

export interface IProduct {
  id: number
  name: string
  availability: boolean
  batch: string
  color: string[]
  description: string
  images: string[]
  power: number
  price: number
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
