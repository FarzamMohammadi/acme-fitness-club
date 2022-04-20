import { Component, OnInit, Input } from '@angular/core';
import { Registration } from '../../Registration';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration-table',
  templateUrl: './registration-table.component.html',
  styleUrls: ['./registration-table.component.css'],
})
export class RegistrationTableComponent implements OnInit {
  unfilteredRegistrations: Registration[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'activity', 'startDate'];
  subscription: Subscription;
  registrationsToShow: Registration[] = [];

  @Input() set registrations(registrations: Registration[]) {
    this.unfilteredRegistrations = registrations;
    this.registrationsToShow = registrations;
  }

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onActivityChange()
      .subscribe((activity) =>
        activity == 'All'
          ? (this.registrationsToShow = this.unfilteredRegistrations)
          : (this.registrationsToShow = this.unfilteredRegistrations.filter(
              (registration) => registration.activity.includes(activity)
            ))
      );
  }

  ngOnInit(): void {}
}
