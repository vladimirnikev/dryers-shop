import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IManufacturer } from 'src/app/common/interfaces/manufacturer.interface';
import { HttpService } from './http.service';

@Injectable()
export class ManufacturersService {
  constructor(private httpService: HttpService) {}

  getManufacturers(): Observable<IManufacturer[]> {
    return this.httpService.get('manufacturers');
  }

  createManufacturer(dto: FormData): Observable<IManufacturer> {
    return this.httpService.post('manufacturers', dto);
  }

  updateManufacturer(dto: { name: string }, id: number): Observable<IManufacturer> {
    return this.httpService.put(`manufacturers/${id}`, dto);
  }

  deleteManufacturer(id) {
    return this.httpService.delete(`manufacturers/${id}`);
  }
}
