import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createDeliveryValidator(): ValidatorFn {
  return (form: FormGroup): ValidationErrors | null => {
    let isValid;
    const deliveryType = form.value?.deliveryType;
    const postType = form.value?.postType;
    const isValidCity = !!form.value?.address?.city;
    const isValidOffice = !!form.value?.address?.office;
    const isValidStreet = !!form.value?.address?.courier?.street;
    const isValidHouseNumber = !!form.value?.address?.courier?.houseNumber;
    const isValidCourierData = isValidStreet && isValidHouseNumber;

    if (deliveryType === 'post') {
      isValid = isValidCity;

      if (postType === 'office') {
        isValid = isValidCity && isValidOffice;
      }

      if (postType === 'courier') {
        isValid = isValidCity && isValidCourierData;
      }
    }

    if (deliveryType === 'shop') {
      isValid = true;
    }

    return isValid ? null : { delivery: true };
  };
}
