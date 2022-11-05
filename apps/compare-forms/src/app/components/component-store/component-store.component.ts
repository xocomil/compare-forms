import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LetModule } from '@ngrx/component';
import { ObjectToEntriesPipe } from '../template-driven/object-to-entries.pipe';
import { EmailFrequency } from './../../models/email-frequency';
import { FormStore } from './form.store';

@Component({
  selector: 'compare-forms-component-store',
  standalone: true,
  imports: [
    CommonModule,
    LetModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSelectModule,
    ObjectToEntriesPipe,
    MatButtonModule,
  ],
  templateUrl: './component-store.component.html',
  styleUrls: ['./component-store.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormStore],
})
export class ComponentStoreComponent {
  readonly vm$ = this._formStore.vm$;
  readonly emailFrequencies = EmailFrequency;

  constructor(private readonly _formStore: FormStore) {}

  emailChanged(email: string) {
    this._formStore.setFormState({ email });
  }

  agreedToEmails(agreedToEmails: boolean) {
    this._formStore.setAgreedToEmails(agreedToEmails);
  }

  emailFrequencyChanged(frequency: EmailFrequency) {
    this._formStore.setFormState({ emailFrequency: frequency });
  }

  save() {
    throw new Error('Method not implemented.');
  }

  resetForm() {
    this._formStore.resetForm();
  }
}
