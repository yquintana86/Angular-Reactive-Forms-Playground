import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validator.service';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent {


  public basicForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)], []],
    price: [0, [Validators.required, Validators.min(0)], []],
    inStorage: [0, [Validators.required, Validators.min(0)], []]
  });

  constructor(
    private fb: FormBuilder,
    private validatorService:ValidatorService
  )
  { }

  isInvalidField(field: string): boolean | null {
    return this.validatorService.isInvalidField(this.basicForm,field);
  }


  getFieldError(field: string): string {
    return this.validatorService.getFieldError(this.basicForm, field);
  }

  onSave(): void {
    if (this.basicForm.valid) {
      console.log(this.basicForm.value);
    }
    else
      this.basicForm.markAllAsTouched();
  }



}
