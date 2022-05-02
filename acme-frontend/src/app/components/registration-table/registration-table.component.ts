import { Component, OnInit, Input } from '@angular/core';
import { Registration } from '../../Registration';

@Component({
  selector: 'app-registration-table',
  templateUrl: './registration-table.component.html',
  styleUrls: ['./registration-table.component.css'],
})
export class RegistrationTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'activity', 'startDate'];

  @Input() registrations: Registration[] | null;
  @Input() combinedRegistrations: any;

  constructor() {}

  ngOnInit(): void {}
}
