import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EmailFormModel } from '../../models/email-form.model';
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
  ],
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TemplateDrivenComponent {
  protected vm: EmailFormModel = {
    email: '',
    agreedToEmails: false,
  };
  protected emailFrequencies = EmailFrequency;
}
