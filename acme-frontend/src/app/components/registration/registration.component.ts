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
  subscription: Subscription;

  // Setting up observable values to be passed and used in registration-table template async pipe
  registrationsSubject$ = new BehaviorSubject<Registration[]>([]);
  registrations$ = this.registrationsSubject$.asObservable();

  triggerSubject$ = new BehaviorSubject(null);
  trigger$ = this.triggerSubject$.asObservable();

  // Clears and then sets registrations observable to all registrations in DB to get latest records
  getRegistrations = () => {
    this.registrationsSubject$ = new BehaviorSubject<Registration[]>([]);
    this.registrations$ = this.registrationsSubject$.asObservable();
    this.triggerSubject$.next(null);
  };
  allRegistrations$ = this.registrationService.getRegistrations();
  combinedRegistrations$ = combineLatest([
    this.allRegistrations$,
    this.trigger$,
  ]).pipe(
    tap(([allRegistrations]) =>
      this.registrationsSubject$.next([
        ...this.registrationsSubject$.value,
        ...allRegistrations,
      ])
    )
  );

  // Returns observable object of all registrations filtered via passed activity
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
          ? this.getRegistrations()
          : (this.registrations$ =
              this.registrationsFilteredViaActivity$(activity))
      );
  }

  ngOnInit(): void {
    this.getRegistrations();
  }

  addNewRegistration(newRegistation: Registration) {
    // Makes call to backend to add new registration then appends it to registrationsSubject observable
    this.registrationService
      .addNewRegistration(newRegistation)
      .then((value) =>
        value
          ? this.registrationsSubject$.next([
              ...this.registrationsSubject$.value,
              value,
            ])
          : ''
      );
  }
}
