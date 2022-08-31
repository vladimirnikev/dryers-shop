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

    if (deliveryType === 'POST') {
      isValid = isValidCity;

      if (postType === 'OFFICE') {
        isValid = isValidCity && isValidOffice;
      }

      if (postType === 'COURIER') {
        isValid = isValidCity && isValidCourierData;
      }
    }

    if (deliveryType === 'SHOP') {
      isValid = true;
    }

    return isValid ? null : { delivery: true };
  };
}
