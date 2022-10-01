import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PushModule } from '@ngrx/component';
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
export class ReactiveFormComponent {
  protected formGroup = new FormGroup({
    email: new FormControl(''),
    agreedToEmails: new FormControl(false),
    emailFrequency: new FormControl<EmailFrequency | null>(null),
  });
  protected emailFrequencies = EmailFrequency;

  protected readonly formValues$ = this.formGroup.valueChanges;

  resetForm(): void {
    this.formGroup.reset(emptyEmailForm());
  }

  saveForm(): void {
    this.#reallySaveTheForm(this.#transformToEmailFormModel(this.formGroup));
  }

  #reallySaveTheForm(model: EmailFormModel) {
    console.log('Reactive form saved!', model);

    window.alert(
      `Reactive form was saved with value: ${JSON.stringify(model)}`
    );

    this.resetForm();
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
