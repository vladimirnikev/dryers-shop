import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IManufacturer } from 'src/common/interfaces/manufacturer.interface';

@Injectable()
export class ManufacturersService {

  constructor(
    private httpService: HttpService
  ) { }

  getManufacturers(): Observable<IManufacturer[]> {
    return this.httpService.get('manufacturers')
  }

  createManufacturer(dto: { name: string }): Observable<IManufacturer> {
    return this.httpService.post('manufacturers', dto)
  }

  updateManufacturer(dto: { name: string }, id: number): Observable<IManufacturer> {
    return this.httpService.put(`manufacturers/${id}`, dto)
  }

  deleteManufacturer(id) {
    return this.httpService.delete(`manufacturers/${id}`)
  }
}
