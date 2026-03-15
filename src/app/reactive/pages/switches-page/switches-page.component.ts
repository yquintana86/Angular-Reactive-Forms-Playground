import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validator.service';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termAndConditions: [false, Validators.requiredTrue]
  })

  public person = {
    gender: 'F',
    wantNotifications:true,
  };

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) { }

  isInvalidField(field: string){
    return this.validatorService.isInvalidField(this.myForm,field);
  }

  onSave(): void{
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    const {termAndConditions, ...newPerson} = this.myForm.value;
    this.person = newPerson;

    console.log(this.myForm.value);
  }
}
