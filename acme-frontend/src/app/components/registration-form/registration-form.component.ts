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
    if (!this.email || !this.startDate || !this.activity) {
      alert('Please fill out the required fields!');
    }

    const newRegistration = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      startDate: this.startDate,
      yearsOfExperience: this.yearsOfExperience.toString(),
      activity: this.activity,
      comments: this.comments,
    };

    this.onSignUpFormSubmit.emit(newRegistration);
    signUpForm.reset();
  }
}
