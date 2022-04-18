import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showSignUpForm: boolean = false;
  private subject = new Subject<any>();

  constructor() {}

  toggleSignUpForm(): void {
    this.showSignUpForm = !this.showSignUpForm;
    this.subject.next(this.showSignUpForm);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
