import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidator implements AsyncValidator {

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;
    const httpCallObservable = new Observable<ValidationErrors | null>((subscriber) => {
        console.log(email);
        if(email === 'yoelqc86@gmail.com'){
          subscriber.next({emailTaken:true});
          subscriber.complete();  //Once the subscriber its completed, it doesn't emit any more values
          //return;               // That's why this return isn't need it
        }

        subscriber.next(null);
    });
    return httpCallObservable;
  }
}
