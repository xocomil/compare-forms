import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import produce from 'immer';
import { Observable, tap, withLatestFrom } from 'rxjs';
import { EmailFormModel } from '../../models/email-form.model';

interface FormState extends EmailFormModel {
  errors?: Partial<Record<keyof EmailFormModel, string[]>>;
}

const initialState: FormState = Object.freeze({
  email: '',
  agreedToEmails: false,
});

@Injectable()
export class FormStore extends ComponentStore<FormState> {
  readonly vm$ = this.select((state) => state);

  constructor() {
    super(initialState);
  }

  readonly setFormState = this.effect(
    (
      formState$: Observable<
        Partial<Omit<FormState, 'agreedToEmails' | 'errors'>>
      >
    ) =>
      formState$.pipe(
        tap((formState) => {
          this.#setFormState(formState);
          this.#validateForm();
        })
      )
  );

  readonly #setFormState = this.updater(
    (state, formState: Partial<Omit<FormState, 'agreedToEmails' | 'errors'>>) =>
      produce(state, (draft) => {
        return { ...draft, ...formState };
      })
  );

  readonly #validateForm = this.effect((validate$: Observable<void>) =>
    validate$.pipe(
      withLatestFrom(this.vm$),
      tap(([, { email, agreedToEmails, emailFrequency }]) => {
        if (!email) {
          this.#addError({ key: 'email', error: 'Email is required' });
        }
        if (email.indexOf('@') <= 0 || email.indexOf('.') <= 0) {
          this.#addError({
            key: 'email',
            error: 'Valid email addresses look like test@test.com.',
          });
        }
      })
    )
  );

  readonly #addError = this.updater(
    (state, error: { key: keyof EmailFormModel; error: string }) =>
      produce(state, (draft) => {
        const errors = state.errors ?? {};
        const theseErrors = errors[error.key] ?? [];

        draft.errors = {
          ...errors,
          [error.key]: [...theseErrors, error.error],
        };
      })
  );

  readonly setAgreedToEmails = this.updater((state, agreedToEmails: boolean) =>
    produce(state, (draft) => {
      draft.agreedToEmails = agreedToEmails;

      if (!agreedToEmails) {
        draft.emailFrequency = undefined;
      }
    })
  );

  readonly resetForm = this.effect((reset$: Observable<void>) =>
    reset$.pipe(
      tap(() => {
        this.#resetForm();
      })
    )
  );

  readonly #resetForm = this.updater((state) =>
    produce(state, () => initialState)
  );
}
