import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PushModule } from '@ngrx/component';
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
}
