import { Component, OnInit, Input } from '@angular/core';
import { Registration } from '../../Registration';
import { UiService } from '../../services/ui.service';
import { RegistrationService } from '../../services/registration.service';
import { Subscription, Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-registration-table',
  templateUrl: './registration-table.component.html',
  styleUrls: ['./registration-table.component.css'],
})
export class RegistrationTableComponent implements OnInit {
  unfilteredRegistrations: Registration[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'activity', 'startDate'];

  @Input() registrations: Registration[] | null;
  @Input() combinedRegistrations: any;

  constructor() {}

  ngOnInit(): void {}
}
