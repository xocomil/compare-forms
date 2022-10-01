import { EmailFrequency } from './email-frequency';

export interface EmailFormModel {
  email: string;
  agreedToEmails: boolean;
  emailFrequency?: EmailFrequency;
}

export const emptyEmailForm = (): EmailFormModel => ({
  email: '',
  agreedToEmails: false,
});
