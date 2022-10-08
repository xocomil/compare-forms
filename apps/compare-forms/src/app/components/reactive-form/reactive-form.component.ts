import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PushModule } from '@ngrx/component';
import { Subscription } from "rxjs";
import { EmailFormModel, emptyEmailForm } from '../../models/email-form.model';
import { EmailFrequency } from '../../models/email-frequency';
import { ObjectToEntriesPipe } from '../template-driven/object-to-entries.pipe';

@Component({
  selector: 'compare-forms-reactive-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    PushModule,
    ReactiveFormsModule,
    ObjectToEntriesPipe,
    MatButtonModule,
  ],
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormComponent implements OnInit, OnDestroy {
  protected formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    agreedToEmails: new FormControl(false),
    emailFrequency: new FormControl<EmailFrequency | null>(null, [
      Validators.required,
    ]),
  });
  protected emailFrequencies = EmailFrequency;

  protected readonly formValues$ = this.formGroup.valueChanges;

  readonly #subs = new Subscription();

  ngOnInit(): void {
    this.#subs.add(
      this.formGroup.valueChanges.subscribe((value) => {
        if(!value.agreedToEmails) {
          this.formGroup.controls.emailFrequency.reset(null, {onlySelf: true});
        }
      }));
  }

  ngOnDestroy(): void {
    this.#subs.unsubscribe();
  }

  resetForm(form: FormGroupDirective): void {
    form.resetForm(emptyEmailForm());
  }

  saveForm(form: FormGroupDirective): false | void {
    if (!this.formGroup.valid) {
      console.warn('There were issues saving the reactive form');

      alert(
        'Something is wrong with your form. Please fix the errors and try again.'
      );

      return false;
    }

    this.#reallySaveTheForm(this.#transformToEmailFormModel(this.formGroup));

    this.resetForm(form);
  }

  #reallySaveTheForm(model: EmailFormModel) {
    console.log('Reactive form saved!', model);

    window.alert(
      `Reactive form was saved with value: ${JSON.stringify(model)}`
    );
  }

  #transformToEmailFormModel(form: typeof this.formGroup): EmailFormModel {
    const { emailFrequency, email, agreedToEmails } = form.value;

    if (emailFrequency) {
      return {
        email: email ?? '',
        agreedToEmails: agreedToEmails ?? false,
        emailFrequency,
      };
    }

    return {
      email: email ?? '',
      agreedToEmails: agreedToEmails ?? false,
    };
  }
}
