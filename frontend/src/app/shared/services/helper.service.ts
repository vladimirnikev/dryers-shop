import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  constructor() { }

  clearEmptyFilters(params) {
    Object.keys(params).forEach(key => !params[key] && params[key] !== false && delete params[key])
    return params
  }

  appendDataFromForm(dto, formData) {
    Object.keys(dto).forEach(key => formData.append(key, dto[key]))
  }
}
