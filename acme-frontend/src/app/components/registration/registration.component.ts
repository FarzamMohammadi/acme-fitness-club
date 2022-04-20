import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { Registration } from '../../Registration';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrations: Registration[] = [];

  constructor(private registrationService: RegistrationService) {
    this.registrationService
      .getRegistrations()
      .subscribe((registrations) => (this.registrations = registrations));
  }

  ngOnInit(): void {}

  addNewRegistration(newRegistation: Registration) {
    this.registrationService
      .addNewRegistration(newRegistation)
      .subscribe(
        (registration) =>
          (this.registrations = this.registrations.concat(registration))
      );
  }
}
