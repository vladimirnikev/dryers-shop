import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  clearEmptyFilters(params) {
    Object.keys(params).forEach(key => !params[key] && params[key] !== false && delete params[key])
    return params
  }
}
