import { DeepMap, FieldError, FieldValues, RegisterOptions } from 'react-hook-form';

export type FormGroupProps = {
  label: string;
  id: string;
  errors: DeepMap<FieldValues, FieldError>;
  validation: RegisterOptions;
};
