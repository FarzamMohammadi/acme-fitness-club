import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showSignUpForm: boolean = false;
  private selectedActivity: string;

  private signUpFormSubject = new Subject<any>();
  private selectedActivitySubject = new BehaviorSubject<string>('all');

  constructor() {}

  toggleSignUpForm(): void {
    this.showSignUpForm = !this.showSignUpForm;
    this.signUpFormSubject.next(this.showSignUpForm);
  }

  onToggle(): Observable<any> {
    return this.signUpFormSubject.asObservable();
  }

  fitlerFormByActivity(activity: string): void {
    this.selectedActivity = activity;
    this.selectedActivitySubject.next(this.selectedActivity);
  }

  onActivityChange(): Observable<any> {
    return this.selectedActivitySubject.asObservable();
  }
}
