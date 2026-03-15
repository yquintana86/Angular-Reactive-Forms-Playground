import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validator.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ' '
})
export class RegisterPageComponent {


  public registerForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3), Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]],
    email: ['',[Validators.required, Validators.pattern(this.validatorService.emailPattern)],[this.emailValidator]],
    userName: ['',[Validators.required, this.validatorService.cantBeStrider]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    confirmPassword: ['',[Validators.required]]
  }, {
  validators: [
    this.validatorService.isFieldOneEqualFieldTwo('password','confirmPassword')
  ]
});

  constructor(
    private fb: FormBuilder,
    private validatorService:ValidatorService,
    private emailValidator: EmailValidator
  )
  {}

  isInvalidField(field:string): boolean {
    return this.validatorService.isInvalidField(this.registerForm,field);
  }

  onSubmit(): void{
    if(this.registerForm.valid)
    {
      console.log(this.registerForm.value);
      this.registerForm.reset();
      return;
    }

    this.registerForm.markAllAsTouched();
  }
}
