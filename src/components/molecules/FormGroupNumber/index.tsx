import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { DeepMap, FieldError, FieldPath, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

type FormGroupNumberProps = {
  label: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: FieldPath<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  errors: DeepMap<FieldValues, FieldError>;
  validation: RegisterOptions;

  // name: FieldPath<CategoryFormValues>;
  // register: UseFormRegister<CategoryFormValues>;
};

const FormGroupNumber = ({ label, id, name, register, errors, validation }: FormGroupNumberProps) => (
  <FormControl isInvalid={errors[name]}>
    <FormLabel htmlFor={id} fontSize="sm" fontWeight="md" color="gray.700">
      {label}
    </FormLabel>
    <NumberInput defaultValue={0} min={0} precision={2}>
      <NumberInputField id={id} {...register(name, validation)} focusBorderColor="brand.400" rounded="md" />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
    <FormErrorMessage>{errors[name] ? errors[name].message : null}</FormErrorMessage>
  </FormControl>
);

export default FormGroupNumber;
