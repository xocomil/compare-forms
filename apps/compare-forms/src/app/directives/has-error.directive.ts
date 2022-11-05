import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

@Directive({
  selector: '[compareFormsHasError]',
  standalone: true,
  providers: [
    { provide: NG_VALIDATORS, useExisting: HasErrorDirective, multi: true },
  ],
})
export class HasErrorDirective implements Validator {
  @Input('compareFormsHasError') errors: unknown[] | null | undefined;

  validate(control: AbstractControl): ValidationErrors | null {
    console.log('validating', this.errors, { ...control });

    return hasErrorValidator(this.errors)(control);
  }
}

export const hasErrorValidator =
  (errors: unknown[] | null | undefined): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    return errors?.length ? { hasErrors: { value: control.value } } : null;
  };
