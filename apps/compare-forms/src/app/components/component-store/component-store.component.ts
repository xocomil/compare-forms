import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LetModule, PushModule } from '@ngrx/component';
import { Subscription } from 'rxjs';
import { HasErrorDirective } from '../../directives/has-error.directive';
import { ObjectToEntriesPipe } from '../template-driven/object-to-entries.pipe';
import { EmailFrequency } from './../../models/email-frequency';
import { FormStore } from './form.store';

@Component({
  selector: 'compare-forms-component-store',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HasErrorDirective,
    LetModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    ObjectToEntriesPipe,
    PushModule,
  ],
  templateUrl: './component-store.component.html',
  styleUrls: ['./component-store.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormStore],
})
export class ComponentStoreComponent implements OnInit, OnDestroy {
  readonly vm$ = this._formStore.vm$;
  readonly emailFrequencies = EmailFrequency;
  @ViewChild('form') form!: NgForm;

  readonly #subs = new Subscription();

  constructor(private readonly _formStore: FormStore) {}

  ngOnInit(): void {
    this.#subs.add(
      this.vm$.subscribe({
        next: (vm) => {
          if (!this.form) {
            console.warn('no form found');
            return;
          }

          this.form.controls['email'].setErrors(
            vm.errors?.email?.length ? { email: true } : null
          );
          this.form.controls['email'].markAsTouched();
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.#subs.unsubscribe();
  }

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
