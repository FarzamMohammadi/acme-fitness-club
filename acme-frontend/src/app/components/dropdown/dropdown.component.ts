import { Component, OnInit } from '@angular/core';
import { Registration } from '../../Registration';
import { RegistrationService } from '../../services/registration.service';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  filteredActivities: string[] = ['All'];
  subscription: Subscription;

  constructor(
    private registrationService: RegistrationService,
    private uiService: UiService
  ) {
    // Gets registrations and adds their activites to dropdown while preventing duplicate values
    this.registrationService
      .getRegistrations()
      .subscribe((registrations) =>
        registrations.map((registration) =>
          !this.filteredActivities.includes(registration.activity)
            ? this.filteredActivities.push(registration.activity)
            : ''
        )
      );
    // If new non-existing activity is added via the registration-from, it gets added to the current dropdown value while preventing duplicate values
    this.subscription = this.uiService
      .onDropDownActivityChange()
      .subscribe((newActivity) =>
        !this.filteredActivities.includes(newActivity)
          ? this.filteredActivities.push(newActivity)
          : ''
      );
  }

  ngOnInit(): void {}

  // Engages the ui service to filter the registration-table component by selected activity
  filterByActivity(activity: string) {
    this.uiService.fitlerFormByActivity(activity);
  }
}
