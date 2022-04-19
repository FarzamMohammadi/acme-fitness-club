import { Component, OnInit, Input } from '@angular/core';
import { Registration } from '../../Registration';

@Component({
  selector: 'app-registration-table',
  templateUrl: './registration-table.component.html',
  styleUrls: ['./registration-table.component.css'],
})
export class RegistrationTableComponent implements OnInit {
  @Input() registrations: Registration[] = [];
  displayedColumns: string[] = [
    'demo-id',
    'demo-firstName',
    'demo-activity',
    'demo-startDate',
  ];

  constructor() {}

  ngOnInit(): void {}
}
