import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/common/interfaces/product.interface';


@Injectable()
export class ProductsService {

  constructor(
    private httpService: HttpService
  ) { }
  getOneProduct(id: number): Observable<IProduct> {
    return this.httpService.get(`products/${id}`)
  }

  getManyProducts(
    params // type
  ): Observable<{ data: IProduct[], totalCount: number }> {
    return this.httpService.get(`products`, { params })
  }

  createProduct(data: any): Observable<IProduct> {
    return this.httpService.post('products', data)
  }

  updateProduct(data: any, id: number): Observable<IProduct> {
    return this.httpService.put(`products/${id}`, data)
  }

  deleteProduct(id: number) {
    return this.httpService.delete(`products/${id}`)
  }

  uploadImage(formData) {
    return this.httpService.post('products/upload', formData)
  }
}
