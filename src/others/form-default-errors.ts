export const requiredErrorMessage = 'To pole jest wymagane';
export const invalidEmailErrorMessage = 'Adres e-mail jest niepoprawny';
export const invalidPasswordErrorMessage =
  'Hasło musi zawierać co najmniej jedną duża literę, jedną mała literę oraz jedną cyfrę';
export const minLengthErrorMessage = (minLength: number) => `Minimalna ilość znaków wynosi ${minLength}`;

export const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const passwordPattern = /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/;
