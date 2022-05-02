import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { Registration } from '../../Registration';
import { UiService } from '../../services/ui.service';
import { Subscription, BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  // Setting up observable values to be passed and used in registration-table template async pipe
  subscription: Subscription;
  registrationsSubject$ = new BehaviorSubject<Registration[]>([]);
  registrations$ = this.registrationsSubject$.asObservable();
  triggerSubject$ = new BehaviorSubject(null);
  trigger$ = this.triggerSubject$.asObservable();
  allRegistrations$ = this.registrationService.getRegistrations();
  registrationsFilteredViaActivity$ = (activity: string) =>
    this.registrationService.getRegistrationsViaActivity(activity);
  constructor(
    private uiService: UiService,
    private registrationService: RegistrationService
  ) {
    // Filters the table records based on dropdown activity change
    this.subscription = this.uiService
      .onActivityChange()
      .subscribe((activity) =>
        activity == 'All'
          ? (this.registrations$ = this.allRegistrations$)
          : (this.registrations$ =
              this.registrationsFilteredViaActivity$(activity))
      );
  }

  ngOnInit(): void {
    this.registrations$ = this.allRegistrations$;
  }

  addNewRegistration(newRegistation: Registration) {
    const callResult = this.registrationService
      .addNewRegistration(newRegistation)
      .then((returnedResult) =>
        returnedResult
          ? this.registrationsSubject$.next([
              ...this.registrationsSubject$.value,
              returnedResult,
            ])
          : ''
      );
  }
}
