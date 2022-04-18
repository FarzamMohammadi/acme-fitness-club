import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Acme Fitness Club';
  showSignUp: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((toggleValue) => (this.showSignUp = toggleValue));
  }

  ngOnInit(): void {}

  toggleSignUpForm() {
    this.uiService.toggleSignUpForm();
  }
}
