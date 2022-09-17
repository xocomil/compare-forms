export const EmailFrequency = Object.freeze({
  daily: 'daily',
  weekly: 'weekly',
  monthly: 'monthly',
  yearly: 'yearly',
});

export type EmailFrequency = keyof typeof EmailFrequency;
