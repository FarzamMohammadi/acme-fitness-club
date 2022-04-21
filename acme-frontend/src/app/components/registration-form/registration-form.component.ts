import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Registration } from '../../Registration';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  startDate: Date;
  yearsOfExperience: string;
  activity: string;
  comments: string;
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

  ngOnInit(): void {}

  onSubmit(signUpForm: NgForm) {
    // Validation before form submission
    if (!this.email || !this.startDate || !this.activity || !this.firstName) {
      alert('Please fill out the required fields');
    } else if (
      !this.availableActivities.includes(
        this.capitalizeFirstLetter(this.activity)
      )
    ) {
      alert('Please select one of the offered activities');
    } else {
      const newRegistration = {
        firstName: this.firstName || '',
        lastName: this.lastName || '',
        email: this.email,
        startDate: this.startDate,
        yearsOfExperience: this.yearsOfExperience
          ? this.yearsOfExperience.toString()
          : '',
        activity: this.capitalizeFirstLetter(this.activity),
        comments: this.comments || '',
      };
      // New registration object is emitted to be added to database
      this.onSignUpFormSubmit.emit(newRegistration);
      // Sends activity of new databse record to be added to dropdown component for filtering
      this.uiService.addNewDropDownActivity(
        this.capitalizeFirstLetter(this.activity)
      );
      signUpForm.reset();
    }
  }

  capitalizeFirstLetter(activity: string) {
    const words = activity.toLowerCase().split(' ');

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    let filteredActivity = words.join(' ');
    return filteredActivity;
  }
}
