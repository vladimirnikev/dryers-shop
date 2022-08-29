import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {
  clearEmptyFilters(params) {
    const filteredParams = { ...params };
    Object.keys(filteredParams).forEach(
      (key) => !filteredParams[key] && filteredParams[key] !== false && delete filteredParams[key],
    );
    return filteredParams;
  }

  appendDataFromForm(dto, formData) {
    Object.keys(dto).forEach((key) => formData.append(key, dto[key]));
  }

  removeEmptyValuesInObject(obj: any) {
    const objectInside = Object.values(obj).find(
      (value) => typeof value === 'object' && !Array.isArray(value) && value !== null,
    );

    if (objectInside) {
      const clearObjectInside = this.removeEmptyValuesInObject(objectInside);
      const asArray = Object.entries(obj);
      const keyCleanedObject = asArray.find(
        // eslint-disable-next-line
        ([key, value]) => JSON.stringify(objectInside) === JSON.stringify(value),
      )[0];
      // eslint-disable-next-line
      const filtered = asArray.filter(([key, value]) => !!value);
      const objectWithOutEmptyValues = Object.fromEntries(filtered);

      if (Object.keys(clearObjectInside).length) {
        objectWithOutEmptyValues[keyCleanedObject] = clearObjectInside;
      } else {
        delete objectWithOutEmptyValues[keyCleanedObject];
      }
      return objectWithOutEmptyValues;
    }
    const asArray = Object.entries(obj);
    // eslint-disable-next-line
    const filtered = asArray.filter(([key, value]) => !!value);
    const objectWithOutEmptyValues = Object.fromEntries(filtered);
    return objectWithOutEmptyValues;
  }

  createFilterParamsFromForm(params) {
    const asArray = Object.entries(params)
      // eslint-disable-next-line
      .filter(([key, value]: any) => !!value || (Array.isArray(value) && !!value.length))
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, value.join(',')];
        }
        return [key, value];
      });
    return Object.fromEntries(asArray);
  }
}
