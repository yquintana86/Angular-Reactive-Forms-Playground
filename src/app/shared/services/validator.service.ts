import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider(control: FormControl): ValidationErrors | null {

    const value = control.value.trim().toLowerCase();

    return value === 'strider' ? { noStrider: true } : null;

  }

  public isInvalidField(formGroup: FormGroup, field: string): boolean {
    return (formGroup.contains(field) &&
      formGroup.controls[field].errors &&
      formGroup.controls[field].touched) as boolean;
  }


  isFieldByIndexInvalid(formArray: FormArray, idx: number): boolean {
    return (formArray.controls &&
      formArray.controls.length >= idx + 1 &&
      formArray.controls[idx]!.errors &&
      formArray.controls[idx]!.touched) as boolean;
  }

  getFieldError(formGroup: FormGroup,field: string): string {

    if (!formGroup.contains(field) ||
        !formGroup.controls[field].errors)
    return '';

    const errors = formGroup.controls[field].errors!;
    for(const key of Object.keys(errors))
    {
      switch(key){
        case 'required':
           return `The ${field} is required`;

        case 'minlength':
          return `${field} has a min length of ${errors['minlength'].requiredLength } characters`;
      }
    }

    return '';
  }

  getErrorsByIndex(formArray: FormArray, idx: number) {

    if (idx < 0 || formArray.controls.length < idx + 1)
      return '';

    const control = formArray.at(idx);
    const errors = control.errors;
    const nameField = 'control';

    for (const key of Object.keys(errors!)) {
      switch (key) {
        case 'required':
          return `The ${nameField} is required`;
        case 'minlength':
          return `${nameField} has a min length of ${errors!['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  isFieldOneEqualFieldTwo(field1: string, field2: string)
  {
      return (formGroup: AbstractControl): ValidationErrors | null => {
        const firstValue = formGroup.get(field1)?.value;
        const secondValue = formGroup.get(field2)?.value;

        if(firstValue !== secondValue)
        {
          formGroup.get(field2)?.setErrors({notEquals: true});
          return { differents: true };
        }

        formGroup.get(field2)?.setErrors(null);
        return null;
      };
  }

}
