import { EmailFrequency } from './email-frequency';

export interface EmailFormModel {
  email: string;
  agreedToEmails: boolean;
  emailFrequency?: EmailFrequency;
}
