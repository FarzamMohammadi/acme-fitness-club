import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Registration } from '../../Registration';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  signUpForm: FormGroup;
  availableActivities: string[] = [
    'Aerobics',
    'Stationary Cycling',
    'Dancing',
    'Martial Arts',
    'Swimming',
    'Weightlifting',
    'Yoga',
  ];
  showSignUpForm: boolean;
  subscription: Subscription;

  @Output() onSignUpFormSubmit: EventEmitter<Registration> = new EventEmitter();

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((toggleValue) => (this.showSignUpForm = toggleValue));
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(),
      email: new FormControl(null, [Validators.required, Validators.email]),
      startDate: new FormControl(null, Validators.required),
      yearsOfExperience: new FormControl(),
      activity: new FormControl(null, Validators.required),
      comments: new FormControl(),
    });
  }

  onSubmit() {
    const newRegistration = {
      firstName: this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName || '',
      email: this.signUpForm.value.email,
      startDate: this.signUpForm.value.startDate,
      yearsOfExperience: this.signUpForm.value.yearsOfExperience
        ? this.signUpForm.value.yearsOfExperience.toString()
        : '',
      activity: this.signUpForm.value.activity,
      comments: this.signUpForm.value.comments || '',
    };
    // New registration object is emitted to be added to database
    this.onSignUpFormSubmit.emit(newRegistration);
    // Sends activity of new databse record to be added to dropdown component for filtering
    this.uiService.addNewDropDownActivity(newRegistration.activity);
    this.signUpForm.reset();
  }

  get firstName() {
    return this.signUpForm.get('firstName');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get startDate() {
    return this.signUpForm.get('startDate');
  }
  get activity() {
    return this.signUpForm.get('activity');
  }
}
