import { Component, OnInit, Input } from '@angular/core';
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
    this.registrationService
      .getRegistrations()
      .subscribe((registrations) =>
        registrations.map((registration) =>
          !this.filteredActivities.includes(registration.activity)
            ? this.filteredActivities.push(registration.activity)
            : ''
        )
      );
  }

  ngOnInit(): void {}

  filterByActivity(activity: string) {
    this.uiService.fitlerFormByActivity(activity);
  }
}
