import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validator.service';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public dynamicForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding ', Validators.required],
    ])
  });

  public addFavoriteGameControl = new FormControl('', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) { }

  get favoriteGames(): FormArray {
    return this.dynamicForm.get('favoriteGames') as FormArray;
  }

  isFieldByIndexInvalid(idx: number): boolean {
    return this.validatorService.isFieldByIndexInvalid(this.favoriteGames,idx);
  }

  isFieldByNameInvalid(field: string): boolean {
    return this.validatorService.isInvalidField(this.dynamicForm, field);
  }

  getErrorsByIndex(idx: number) {
   return this.validatorService.isFieldByIndexInvalid(this.favoriteGames,idx);
  }

  getErrorsByField(field: string) {
   return this.validatorService.getFieldError(this.dynamicForm,field);
  }

addFavoriteGame(): void {

  debugger;
    if (this.addFavoriteGameControl.invalid)
      return;

    const game: string = this.addFavoriteGameControl!.value!;

    if(this.favoriteGames.get(game))
    {
      this.addFavoriteGameControl.reset();
      return;
    }

    // this.favoriteGames.push( new FormControl(
    //   game,[Validators.required, Validators.minLength(3)]
    // ));

    this.favoriteGames.push(this.fb.control(
      game,[Validators.required, Validators.minLength(3)]
    ));

    //(this.dynamicForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.addFavoriteGameControl.reset();
  }



  deleteFavoriteByIndex(index: number): void {
    if (index < 0 || this.favoriteGames.length < index + 1)
      return;
    console.log(index);
    this.favoriteGames.removeAt(index);

  }

  onSubmit(): void {
    if (this.dynamicForm.invalid) {
      this.dynamicForm.markAllAsTouched();
      return;
    }

    console.log(this.dynamicForm.value);
  }
}
