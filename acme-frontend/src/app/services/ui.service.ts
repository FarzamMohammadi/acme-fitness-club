import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showSignUpForm: boolean = false;
  private selectedActivity: string;
  private newActivity: string = '';

  private signUpFormSubject = new Subject<any>();
  private selectedActivitySubject = new BehaviorSubject<string>('all');
  private newDropDownActivitySubject = new Subject<string>();

  constructor() {}

  // Used for the button component to show/hide registration-form
  toggleSignUpForm(): void {
    this.showSignUpForm = !this.showSignUpForm;
    this.signUpFormSubject.next(this.showSignUpForm);
  }
  onToggle(): Observable<any> {
    return this.signUpFormSubject.asObservable();
  }

  // Used for filtering the registration-table based on selected dropwdown value
  fitlerFormByActivity(activity: string): void {
    this.selectedActivity = activity;
    this.selectedActivitySubject.next(this.selectedActivity);
  }
  onActivityChange(): Observable<any> {
    return this.selectedActivitySubject.asObservable();
  }

  // Used for adding new acitivity to existing dropwdown values in case activity does now already exist
  addNewDropDownActivity(activity: string): void {
    this.newActivity = activity;
    this.newDropDownActivitySubject.next(this.newActivity);
  }
  onDropDownActivityChange(): Observable<any> {
    return this.newDropDownActivitySubject.asObservable();
  }
}
