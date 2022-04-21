import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationFormComponent } from './registration-form.component';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Customized test
  it('check form contorls of form', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const firstName: HTMLInputElement =
        fixture.nativeElement.querySelector('firstName');
      const lastName: HTMLInputElement =
        fixture.nativeElement.querySelector('lastName');
      const email: HTMLInputElement =
        fixture.nativeElement.querySelector('email');
      const yearsOfExperience: HTMLInputElement =
        fixture.nativeElement.querySelector('yearsOfExperience');
      const activity: HTMLInputElement =
        fixture.nativeElement.querySelector('activity');
      const comments: HTMLInputElement =
        fixture.nativeElement.querySelector('comments');

      firstName.value = 'Farzam';
      lastName.value = 'Mo';
      email.value = 'Farzam@gmail.com';
      yearsOfExperience.value = '2';
      activity.value = 'Swimming';
      comments.value = 'Fitness is fun.';

      firstName.dispatchEvent(new Event('input'));
      lastName.dispatchEvent(new Event('input'));
      email.dispatchEvent(new Event('input'));
      yearsOfExperience.dispatchEvent(new Event('input'));
      activity.dispatchEvent(new Event('input'));
      comments.dispatchEvent(new Event('textarea'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.firstName).toEqual(firstName.value);
        expect(component.lastName).toEqual(lastName.value);
        expect(component.email).toEqual(email.value);
        expect(component.yearsOfExperience).toEqual(yearsOfExperience.value);
        expect(component.comments).toEqual(comments.value);
      });
    });
  });

  it('should captialize all words', () => {
    const unfilteredSentence = 'lEtS Test thiS sentence';
    const filteredSentence = 'Lets Test This Sentence';
    fixture.detectChanges();
    expect(component.capitalizeFirstLetter(unfilteredSentence)).toEqual(
      filteredSentence
    );
  });
});
