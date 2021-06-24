import { FormControl, Checkbox, FormErrorMessage } from '@chakra-ui/react';
import { requiredErrorMessage } from 'others/form-default-errors';
import { FieldError } from 'react-hook-form';

type FormGroupCheckboxProps = {
  label: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  error?: FieldError;
};

function FormGroupCheckbox({ label, onChange, error }: FormGroupCheckboxProps) {
  return (
    <FormControl isInvalid={!!error}>
      <Checkbox fontSize="sm" fontWeight="md" color="gray.700" onChange={onChange}>
        {label}
      </Checkbox>
      <FormErrorMessage>{error ? requiredErrorMessage : null}</FormErrorMessage>
    </FormControl>
  );
}
export default FormGroupCheckbox;
