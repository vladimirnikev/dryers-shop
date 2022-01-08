import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/common/interfaces/product.interface';
import { IColor } from 'src/common/interfaces/color.interface';


@Injectable()
export class ProductsService {

  constructor(
    private httpService: HttpService
  ) { }
  getOneProduct(id: number): Observable<IProduct> {
    return this.httpService.get(`products/${id}`)
  }

  getManyProducts(
    params
  ): Observable<{ data: IProduct[], totalCount: number }> {
    return this.httpService.get(`products`, { params })
  }

  createProduct(formData: FormData): Observable<IProduct> {
    return this.httpService.post('products', formData)
  }

  updateProduct(formData: any, id: number): Observable<IProduct> {
    return this.httpService.put(`products/${id}`, formData)
  }

  deleteProduct(id: number) {
    return this.httpService.delete(`products/${id}`)
  }

  deleteImage(id: number, data: { imageUrl: string }) {
    return this.httpService.put(`products/${id}/image`, data)
  }
}
