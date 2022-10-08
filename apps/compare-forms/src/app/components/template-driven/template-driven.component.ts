import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { EmailFormModel, emptyEmailForm } from '../../models/email-form.model';
import { EmailFrequency } from '../../models/email-frequency';
import { ObjectToEntriesPipe } from './object-to-entries.pipe';

@Component({
  selector: 'compare-forms-template-driven',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    ObjectToEntriesPipe,
    MatButtonModule,
  ],
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TemplateDrivenComponent implements OnInit, OnDestroy {
  protected vm: EmailFormModel = emptyEmailForm();
  protected emailFrequencies = EmailFrequency;
  @ViewChild('form', { static: true }) form!: NgForm;

  readonly #subs = new Subscription();

  ngOnInit(): void {
    this.#subs.add(
      this.form.valueChanges?.subscribe((changes: EmailFormModel) => {
        if (!changes.agreedToEmails) {
          this.vm.emailFrequency = undefined;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.#subs.unsubscribe();
  }

  resetForm(): void {
    this.form.resetForm();

    this.vm = emptyEmailForm();
  }

  saveForm(): void {
    if (!this.form.valid) {
      console.warn('There were issues with the template driven form');

      alert(`There are issues with your form. Please fix them and try again.`);

      return;
    }

    console.log('Template form saved!', this.vm);

    window.alert(
      `Template form was saved with value: ${JSON.stringify(this.vm)}`
    );

    this.resetForm();
  }
}
